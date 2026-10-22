export interface MetaTemplateButton {
  type: 'PHONE_NUMBER' | 'URL' | 'QUICK_REPLY';
  text: string;
  value?: string;
}

export interface MetaTemplateSpec {
  name: string;
  title: string;
  category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION';
  language: string;
  header?: string;
  body: string;
  footer?: string;
  buttons?: MetaTemplateButton[];
  sampleVariables: string[];
  description: string;
}

/**
 * Catálogo Oficial Completo de Plantillas Homologadas de Meta WhatsApp Cloud API
 * para el Ecosistema Mercenario & WEKE Studio
 */
export const OFFICIAL_META_TEMPLATES: Record<string, MetaTemplateSpec> = {
  // 1. DERIVACIÓN A ASESOR HUMANO (Handoff Oficial)
  asistencia_humana_weke: {
    name: 'asistencia_humana_weke',
    title: 'Derivación a Asistencia Humana (Handoff)',
    category: 'UTILITY',
    language: 'es',
    header: 'Atención Personalizada WEKE',
    body: 'Estimado/a {{1}}, hemos transferido su solicitud a un asesor humano de nuestro equipo. Un especialista se comunicará con usted a la brevedad para asistirle con su consulta sobre {{2}}.\n\nHorario de atención: Lunes a Viernes de 9:00 a 18:00 hrs.',
    footer: 'Mercenario • Atención Omnicanal Conectada',
    buttons: [
      {
        type: 'PHONE_NUMBER',
        text: 'Llamar a Soporte',
        value: '+56957958467',
      },
      {
        type: 'URL',
        text: 'Ver Catálogo Web',
        value: 'https://mercenario.cl/tienda',
      },
    ],
    sampleVariables: ['Carlos', 'asesoría de tallas y chaquetas 3 capas'],
    description: 'Se dispara cuando el cliente solicita un humano o la IA detecta una negociación compleja.',
  },

  // 2. RECUPERADOR DE CARRITOS Y RESERVAS CAÍDAS (Cron a 20 min)
  recuperacion_carrito_abandonado: {
    name: 'recuperacion_carrito_abandonado',
    title: 'Recuperador de Carritos / Reservas Caídas',
    category: 'MARKETING',
    language: 'es',
    header: 'Tu pedido quedó pendiente',
    body: '¡Hola {{1}}! Notamos que dejaste tu selección de {{2}} pendiente en nuestra web.\n\n¿Tuviste algún inconveniente con el banco o necesitas ayuda para concretar tu pedido? Tus artículos están reservados temporalmente.',
    footer: 'Mercenario OS • Fricción Cero en Pagos',
    buttons: [
      {
        type: 'URL',
        text: 'Retomar Compra',
        value: 'https://mercenario.cl/tienda/checkout',
      },
      {
        type: 'QUICK_REPLY',
        text: 'Necesito Asistencia',
      },
    ],
    sampleVariables: ['Valentina', 'Chaqueta Alpina Impermeable Pro (Talla M)'],
    description: 'Cron Job lo envía automáticamente 20 minutos después de abandonar el checkout. Rescata hasta el 30% de compras caídas.',
  },

  // 3. CONFIRMACIÓN TRANSACCIONAL DE PAGO / RESERVA (Inmediata)
  confirmacion_pedido_reserva: {
    name: 'confirmacion_pedido_reserva',
    title: 'Confirmación Transaccional de Orden / Cita',
    category: 'UTILITY',
    language: 'es',
    header: '✅ Pago Confirmado con Éxito',
    body: '¡Hola {{1}}! Hemos recibido tu pago por un monto de {{2}} correspondiente a tu orden #{{3}}.\n\nYa comenzamos a preparar tu solicitud. Puedes revisar el detalle y descargar tu comprobante en el enlace oficial.',
    footer: 'Transbank Webpay Plus • Conciliación Automática',
    buttons: [
      {
        type: 'URL',
        text: 'Ver Comprobante',
        value: 'https://mercenario.cl/tienda/orden-confirmada',
      },
    ],
    sampleVariables: ['Rodrigo Morales', '$89.900 CLP', 'ORD-2026-9481'],
    description: 'Se envía inmediatamente tras procesarse el Webpay Plus. Entrega tranquilidad instantánea al cliente.',
  },

  // 4. RECORDATORIO DE CITA / LOGÍSTICA ANTI NO-SHOW (24h Antes)
  recordatorio_cita_24h: {
    name: 'recordatorio_cita_24h',
    title: 'Recordatorio Anti-Inasistencia (24h Antes)',
    category: 'UTILITY',
    language: 'es',
    header: 'Recordatorio de Cita Programada',
    body: 'Hola {{1}}, te recordamos tu cita programada para mañana a las {{2}} con el especialista {{3}}.\n\nIndicaciones importantes: {{4}}.\n\nPor favor confirma tu asistencia tocando uno de los botones inferiores.',
    footer: 'Clínica & Salud • Agenda Sincronizada',
    buttons: [
      {
        type: 'QUICK_REPLY',
        text: 'Confirmar Asistencia',
      },
      {
        type: 'QUICK_REPLY',
        text: 'Reagendar Cita',
      },
    ],
    sampleVariables: ['Andrea González', '11:30 hrs', 'Dra. Silva (Box 3)', 'Recuerde asistir en ayunas de 8 horas'],
    description: 'Disparado por Cron Job 24 horas antes. Reduce el ausentismo (No-Show) a menos del 4%.',
  },

  // 5. ALERTA PRIVADA DE VENTA AL CELULAR DEL DUEÑO / ADMIN
  alerta_nueva_venta_admin: {
    name: 'alerta_nueva_venta_admin',
    title: 'Alerta de Cierre de Venta (Al Dueño)',
    category: 'UTILITY',
    language: 'es',
    header: '💰 NUEVA VENTA CONFIRMADA',
    body: 'Atención: Se acaba de procesar un nuevo cobro en la plataforma.\n\n• Cliente: {{1}}\n• Teléfono: {{2}}\n• Ítem/Servicio: {{3}}\n• Monto Recaudado: {{4}}\n• Pasarela: Webpay Plus Transbank\n\nEl stock ha sido descontado automáticamente del ERP.',
    footer: 'Mercenario IOS • Notificación Interna',
    buttons: [
      {
        type: 'URL',
        text: 'Abrir Panel ERP',
        value: 'https://mercenario.cl/admin/ecommerce/pedidos',
      },
    ],
    sampleVariables: ['Juan Pérez', '+56 9 1234 5678', 'Chaqueta Alpina Pro Talla L', '$89.900 CLP'],
    description: 'Enviada al WhatsApp privado del dueño o gerente en el segundo exacto que entra un pago.',
  },

  // 6. ALERTA DE LEAD CALIENTE DE ALTO VALOR (Equipo Comercial)
  alerta_lead_caliente_admin: {
    name: 'alerta_lead_caliente_admin',
    title: 'Alerta de Lead Caliente (Equipo Comercial)',
    category: 'UTILITY',
    language: 'es',
    header: '🔥 NUEVO LEAD CALIFICADO',
    body: 'Equipo Comercial: Un prospecto de alto valor acaba de solicitar cotización.\n\n• Prospecto: {{1}}\n• Teléfono: {{2}}\n• Presupuesto/Servicio: {{3}}\n• Requerimiento: {{4}}\n\nPor favor tomar el chat desde la consola LiveChat.',
    footer: 'Mercenario B2B • Scoring Automático',
    buttons: [
      {
        type: 'URL',
        text: 'Tomar Chat en LiveChat',
        value: 'https://mercenario.cl/admin/asistente',
      },
    ],
    sampleVariables: ['Constructora Andes', '+56 9 8765 4321', 'Ecosistema Completo ($2.2M)', 'Implementación llave en mano para 3 sucursales'],
    description: 'Dispara alerta a los ejecutivos de venta cuando entra un lead con scoring de alto ticket.',
  },

  // 7. FEEDBACK Y RESEÑAS POST-ATENCIÓN (NPS 48h)
  encuesta_satisfaccion_nps: {
    name: 'encuesta_satisfaccion_nps',
    title: 'Encuesta de Satisfacción & Reseña Google 5★',
    category: 'UTILITY',
    language: 'es',
    header: '¿Cómo fue tu experiencia?',
    body: '¡Hola {{1}}! Esperamos que hayas disfrutado tu experiencia con {{2}}.\n\nTu opinión es fundamental para nosotros. ¿Podrías regalarnos 30 segundos para evaluar nuestro servicio y dejarnos una reseña en Google?',
    footer: 'Mercenario • Fidelización Continua',
    buttons: [
      {
        type: 'URL',
        text: 'Calificar en Google Maps',
        value: 'https://g.page/r/mercenario/review',
      },
      {
        type: 'QUICK_REPLY',
        text: 'Dejar Comentario Interno',
      },
    ],
    sampleVariables: ['Matías Silva', 'la atención médica de ayer'],
    description: 'Enviada automáticamente 48 horas post-servicio para nutrir perfiles de Google con 5 estrellas.',
  },

  // 8. ALERTA INTERNA DE HANDOFF AL OPERADOR
  alerta_operador_humano: {
    name: 'alerta_operador_humano',
    title: 'Notificación de Handoff a Asesores Internos',
    category: 'UTILITY',
    language: 'es',
    header: '⚠️ Solicitud de Asistencia Humana',
    body: 'Atención equipo: El cliente {{1}} (teléfono: {{2}}) ha solicitado atención humana con respecto a: {{3}}.\n\nPor favor ingresar al panel administrativo para tomar el control de la conversación.',
    footer: 'Mercenario OS • LiveChat Unificado',
    buttons: [
      {
        type: 'URL',
        text: 'Abrir Chat en Admin',
        value: 'https://mercenario.cl/admin/asistente',
      },
    ],
    sampleVariables: ['Camila Sepúlveda', '+56 9 8402 1940', 'consulta sobre reparación de cierre en chaqueta'],
    description: 'Avisa internamente al equipo cuando el bot se silencia.',
  },
};

/**
 * Genera el payload JSON oficial homologado para crear la plantilla en Meta WhatsApp Cloud API
 * POST https://graph.facebook.com/v21.0/{waba_id}/message_templates
 */
export function buildMetaTemplatePayload(spec: MetaTemplateSpec) {
  const components: any[] = [];

  if (spec.header) {
    components.push({
      type: 'HEADER',
      format: 'TEXT',
      text: spec.header,
    });
  }

  const bodyComponent: any = {
    type: 'BODY',
    text: spec.body,
  };

  if (spec.sampleVariables && spec.sampleVariables.length > 0) {
    bodyComponent.example = {
      body_text: [spec.sampleVariables],
    };
  }
  components.push(bodyComponent);

  if (spec.footer) {
    components.push({
      type: 'FOOTER',
      text: spec.footer,
    });
  }

  if (spec.buttons && spec.buttons.length > 0) {
    components.push({
      type: 'BUTTONS',
      buttons: spec.buttons.map((b) => {
        if (b.type === 'PHONE_NUMBER') {
          return {
            type: 'PHONE_NUMBER',
            text: b.text,
            phone_number: b.value || '+56957958467',
          };
        }
        if (b.type === 'URL') {
          return {
            type: 'URL',
            text: b.text,
            url: b.value || 'https://mercenario.cl',
          };
        }
        return {
          type: 'QUICK_REPLY',
          text: b.text,
        };
      }),
    });
  }

  return {
    name: spec.name,
    category: spec.category,
    language: spec.language,
    components,
  };
}
