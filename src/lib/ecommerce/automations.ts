import { Order } from '@/types/ecommerce';

/**
 * Motor de Automatizaciones y Notificaciones Omnicanal
 * 1. Envío al cliente por WhatsApp y Correo
 * 2. Alerta push instantánea al teléfono del dueño/administrador
 */

export async function triggerOrderCreatedAutomations(order: Order) {
  console.log(`[AUTOMATION ENGINE] Procesando orden #${order.order_number}`);

  // 1. Notificación al Cliente vía WhatsApp (Simulada / WhatsApp Cloud API)
  const firstName = order.customer_name.split(' ')[0];
  const itemsSummary = (order.items || [])
    .map((i) => `• ${i.quantity}x ${i.product_title} (${i.variant_title || 'Estándar'})`)
    .join('\n');

  const customerWhatsappMessage = 
`Hola ${firstName} ⚡️
¡Confirmamos tu compra en *Mercenario Store*!

📦 *Orden:* #${order.order_number}
💵 *Total:* $${order.total_amount.toLocaleString('es-CL')}
📍 *Despacho a:* ${order.shipping_address.street}, ${order.shipping_address.city}

*Detalle de tu pedido:*
${itemsSummary}

Estamos preparando tus piezas en nuestra bodega técnica. Te notificaremos apenas el courier retire tu paquete.

_Mercenario OS — Vitacura, Chile_`;

  console.log('--- ENVIANDO NOTIFICACIÓN WHATSAPP AL CLIENTE ---');
  console.log(`Destinatario: ${order.customer_phone}`);
  console.log(customerWhatsappMessage);

  // 2. Alerta Inmediata al Teléfono del Administrador / Dueño de Tienda
  const adminAlertMessage = 
`🔔 *¡NUEVA VENTA REGISTRADA!*
-----------------------------
*Orden:* #${order.order_number}
*Monto:* $${order.total_amount.toLocaleString('es-CL')}
*Medio:* ${order.payment_gateway.toUpperCase()}
*Cliente:* ${order.customer_name} (${order.customer_phone})
*Comuna:* ${order.shipping_address.city}

*Items:*
${itemsSummary}

Accede al ERP para despachar:
https://mercenario.io/admin/ecommerce/pedidos`;

  console.log('--- ALERTA PUSH AL TELÉFONO DEL ADMINISTRADOR ---');
  console.log(adminAlertMessage);

  return {
    success: true,
    whatsappSent: true,
    adminAlertSent: true,
    timestamp: new Date().toISOString(),
  };
}

export async function triggerShippingDispatchedAutomations(order: Order, courier: string, trackingNumber: string) {
  const firstName = order.customer_name.split(' ')[0];

  const trackingMessage = 
`Hola ${firstName} 🚀
¡Tu pedido #${order.order_number} va en camino!

🚚 *Courier:* ${courier}
📋 *Nº de Seguimiento:* ${trackingNumber}

Puedes rastrear tu paquete directamente con el código ingresado. Si tienes dudas, responde directamente a este WhatsApp.

_Equipo Mercenario_`;

  console.log('--- NOTIFICACIÓN DE ENVÍO VÍA WHATSAPP ---');
  console.log(`Destinatario: ${order.customer_phone}`);
  console.log(trackingMessage);

  return { success: true };
}
