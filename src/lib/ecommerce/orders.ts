'use server';

import { createClient } from '@/lib/supabase/server';
import { Order, Customer } from '@/types/ecommerce';
import { INITIAL_ORDERS, INITIAL_CUSTOMERS } from './data';
import { triggerOrderCreatedAutomations, triggerShippingDispatchedAutomations } from './automations';

// Memoria compartida en runtime para pruebas inmediatas si Supabase aún no tiene las tablas creadas
let inMemoryOrders: Order[] = [...INITIAL_ORDERS];
let inMemoryCustomers: Customer[] = [...INITIAL_CUSTOMERS];

export async function createOrder(payload: {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  rut_dni?: string;
  shipping_address: {
    street: string;
    city: string;
    region: string;
    notes?: string;
  };
  items: Array<{
    product_id: string;
    variant_id?: string;
    product_title: string;
    variant_title?: string;
    sku: string;
    image?: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  subtotal: number;
  discount_amount: number;
  shipping_cost: number;
  total_amount: number;
  payment_gateway: 'webpay' | 'mercadopago' | 'transferencia';
}): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    const supabase = await createClient();

    // 1. Intentar registrar o actualizar cliente en CRM
    let customerId: string | undefined = undefined;
    try {
      const { data: customerRecord } = await supabase
        .from('ecommerce_customers')
        .upsert(
          {
            full_name: payload.customer_name,
            email: payload.customer_email,
            phone: payload.customer_phone,
            rut_dni: payload.rut_dni || null,
          },
          { onConflict: 'email' }
        )
        .select('id')
        .maybeSingle();

      if (customerRecord) {
        customerId = customerRecord.id;
      }
    } catch (e) {
      console.warn('Could not upsert into ecommerce_customers, fallback to in-memory', e);
    }

    // 2. Intentar guardar en Supabase ecommerce_orders
    const nextOrderNumber = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      order_number: nextOrderNumber,
      customer_id: customerId || `c-${Date.now()}`,
      customer_name: payload.customer_name,
      customer_email: payload.customer_email,
      customer_phone: payload.customer_phone,
      status: 'paid', // Simulado pago aprobado
      payment_status: 'paid',
      payment_gateway: payload.payment_gateway,
      subtotal: payload.subtotal,
      discount_amount: payload.discount_amount,
      shipping_cost: payload.shipping_cost,
      total_amount: payload.total_amount,
      shipping_address: payload.shipping_address,
      items: payload.items,
      paid_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    try {
      const { data: insertedOrder, error: orderErr } = await supabase
        .from('ecommerce_orders')
        .insert({
          customer_name: payload.customer_name,
          customer_email: payload.customer_email,
          customer_phone: payload.customer_phone,
          status: 'paid',
          payment_status: 'paid',
          payment_gateway: payload.payment_gateway,
          subtotal: payload.subtotal,
          discount_amount: payload.discount_amount,
          shipping_cost: payload.shipping_cost,
          total_amount: payload.total_amount,
          shipping_address: payload.shipping_address,
          paid_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (insertedOrder) {
        newOrder.id = insertedOrder.id;
        newOrder.order_number = insertedOrder.order_number;
      }
    } catch (e) {
      console.warn('Could not insert in Supabase ecommerce_orders, keeping in-memory object', e);
    }

    // Guardar en runtime
    inMemoryOrders.unshift(newOrder);

    // Actualizar CRM en memoria
    const existingCrm = inMemoryCustomers.find((c) => c.email === payload.customer_email);
    if (existingCrm) {
      existingCrm.total_spent += payload.total_amount;
      existingCrm.orders_count += 1;
      existingCrm.last_order_at = new Date().toISOString();
      if (existingCrm.orders_count >= 3) existingCrm.segment = 'vip';
    } else {
      inMemoryCustomers.unshift({
        id: newOrder.customer_id!,
        rut_dni: payload.rut_dni,
        full_name: payload.customer_name,
        email: payload.customer_email,
        phone: payload.customer_phone,
        address: `${payload.shipping_address.street}, ${payload.shipping_address.city}`,
        city: payload.shipping_address.city,
        region: payload.shipping_address.region,
        total_spent: payload.total_amount,
        orders_count: 1,
        segment: 'new',
        last_order_at: new Date().toISOString(),
      });
    }

    // 3. Disparar Motor de Automatizaciones (WhatsApp + Alerta Admin)
    await triggerOrderCreatedAutomations(newOrder);

    return { success: true, order: newOrder };
  } catch (err: any) {
    console.error('Error in createOrder:', err);
    return { success: false, error: err.message || 'Error al procesar orden' };
  }
}

export async function getOrders(): Promise<Order[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('ecommerce_orders')
      .select('*, items:ecommerce_order_items(*)')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (e) {
    // ignore, return in-memory
  }
  return inMemoryOrders;
}

export async function updateOrderStatus(
  orderId: string,
  status: Order['status'],
  courier?: string,
  trackingNumber?: string
): Promise<{ success: boolean }> {
  try {
    const order = inMemoryOrders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      if (courier) order.courier_name = courier;
      if (trackingNumber) order.tracking_number = trackingNumber;
      if (status === 'shipped') {
        order.dispatched_at = new Date().toISOString();
        if (courier && trackingNumber) {
          await triggerShippingDispatchedAutomations(order, courier, trackingNumber);
        }
      }
    }

    const supabase = await createClient();
    await supabase
      .from('ecommerce_orders')
      .update({
        status,
        courier_name: courier,
        tracking_number: trackingNumber,
        dispatched_at: status === 'shipped' ? new Date().toISOString() : null,
      })
      .eq('id', orderId);

    return { success: true };
  } catch (e) {
    console.warn('Failed to update Supabase, updated in-memory', e);
    return { success: true };
  }
}

export async function getCustomers(): Promise<Customer[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('ecommerce_customers')
      .select('*')
      .order('total_spent', { ascending: false });

    if (!error && data && data.length > 0) {
      return data;
    }
  } catch (e) {
    // fallback
  }
  return inMemoryCustomers;
}
