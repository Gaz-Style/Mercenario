import { NextResponse } from 'next/server';

/**
 * POST /api/shipping/dispatch
 * ────────────────────────────
 * Crea la Orden de Despacho (OD) en Shipit al confirmar el pago de una orden.
 * Llamar desde el webhook de Transbank/Mercado Pago una vez aprobado el pago.
 *
 * Body esperado:
 * {
 *   order_id: string,
 *   order_number: number,
 *   courier_id: number,            // ID del courier elegido en checkout
 *   destiny_commune_id: number,
 *   destiny_street: string,
 *   destiny_number: string,
 *   receiver_name: string,
 *   receiver_phone: string,
 *   receiver_email: string,
 *   weight?: number,               // kg (default 1)
 *   height?: number,               // cm
 *   width?: number,
 *   length?: number
 * }
 *
 * Respuesta:
 * {
 *   success: boolean,
 *   tracking_number: string,
 *   label_pdf_url: string,         // Etiqueta para imprimir
 *   shipment_id: number
 * }
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            order_id,
            order_number,
            courier_id,
            destiny_commune_id,
            destiny_street,
            destiny_number,
            receiver_name,
            receiver_phone,
            receiver_email,
            weight = 1,
            height = 10,
            width = 15,
            length = 20,
        } = body;

        // Validación de campos mínimos
        const required = { order_id, courier_id, destiny_commune_id, destiny_street, receiver_name, receiver_phone };
        const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k);
        if (missing.length) {
            return NextResponse.json({ error: `Campos requeridos faltantes: ${missing.join(', ')}` }, { status: 400 });
        }

        const { createShipitShipment } = await import('@/lib/shipit');

        const result = await createShipitShipment({
            courier_id: Number(courier_id),
            destiny_commune_id: Number(destiny_commune_id),
            destiny_street,
            destiny_number: destiny_number || 's/n',
            receiver_name,
            receiver_phone,
            receiver_email,
            weight: Number(weight),
            height: Number(height),
            width: Number(width),
            length: Number(length),
            reference_code: `ORD-${order_number || order_id}`,
        });

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 502 });
        }

        // Actualizar la orden en Supabase con el tracking number
        try {
            const { createClient } = await import('@/lib/supabase/server');
            const supabase = await createClient();
            await supabase
                .from('ecommerce_orders')
                .update({
                    status: 'shipped',
                    courier_name: `Shipit #${result.shipment_id}`,
                    tracking_number: result.tracking_number,
                    label_pdf_url: result.label_pdf_url,
                    shipped_at: new Date().toISOString(),
                })
                .eq('id', order_id);
        } catch (dbErr) {
            console.warn('[dispatch] No se pudo actualizar Supabase:', dbErr);
        }

        // Disparar notificación WhatsApp al cliente con el tracking
        try {
            const { triggerShippingDispatchedAutomations } = await import('@/lib/ecommerce/automations');
            await triggerShippingDispatchedAutomations(
                { id: order_id, order_number, customer_phone: receiver_phone, customer_name: receiver_name, shipping_address: { street: destiny_street, city: '', region: '' }, items: [], subtotal: 0, discount_amount: 0, shipping_cost: 0, total_amount: 0, status: 'shipped', payment_status: 'paid', payment_gateway: 'webpay', created_at: new Date().toISOString() } as any,
                'Shipit',
                result.tracking_number || ''
            );
        } catch (notifErr) {
            console.warn('[dispatch] Notificación WhatsApp no enviada:', notifErr);
        }

        return NextResponse.json({
            success: true,
            shipment_id: result.shipment_id,
            tracking_number: result.tracking_number,
            label_pdf_url: result.label_pdf_url,
        });

    } catch (err: any) {
        console.error('[/api/shipping/dispatch] Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
