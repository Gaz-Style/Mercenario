export interface MercenarioKnowledgeChunk {
  id: string;
  category: 'identidad' | 'sistemas_360' | 'growth360' | 'tiempos_precios' | 'integraciones' | 'diagnostico';
  title: string;
  keywords: string[];
  content: string;
  metadata?: Record<string, any>;
}

export const MERCENARIO_KNOWLEDGE_CORPUS: MercenarioKnowledgeChunk[] = [
  {
    id: 'mercenario-01-identidad',
    category: 'identidad',
    title: 'Qué es Mercenario IOS y Filosofía Operativa',
    keywords: ['mercenario', 'que es', 'quienes somos', 'sistema operativo', 'ios', 'automatizacion', 'empresa', 'operacion', 'software'],
    content: `Mercenario IOS es un sistema operativo comercial y de gestión para pequeñas y medianas empresas en Chile. No vendemos páginas web abandonadas ni software aislado; conectamos toda la operación del negocio: Web de alta velocidad en Next.js, Asistente Virtual con IA en WhatsApp Oficial, pasarelas de pago, POS de mostrador sincronizado y CRM comercial.`,
    metadata: { source: 'mercenario.cl' }
  },
  {
    id: 'mercenario-02-ecommerce-360',
    category: 'sistemas_360',
    title: 'Sistema E-Commerce 360 (Retail, Moda y Marcas Físicas)',
    keywords: ['ecommerce', 'e-commerce', 'tienda online', 'retail', 'moda', 'ropa', 'pos', 'inventario', 'weke', 'productos'],
    content: `El Sistema E-Commerce 360 (demostrado en producción en el caso WEKE Studio) incluye: Tienda online autoadministrable en Next.js con carga en menos de 0.8s, Vendedor con Inteligencia Artificial en WhatsApp que asesora y envía links de pago 24/7, pasarela Webpay Plus y Mercado Pago, y Punto de Venta (POS) en mostrador que descuenta el stock web en tiempo real sin descuadres.`,
    metadata: { vertical: 'retail' }
  },
  {
    id: 'mercenario-03-clinica-salud-360',
    category: 'sistemas_360',
    title: 'Sistema Clínica & Salud 360 (Estética, Dental y Centros Médicos)',
    keywords: ['clinica', 'salud', 'medico', 'estetica', 'dental', 'spa', 'agenda', 'agendamiento', 'horas', 'recordatorio', 'inasistencias', 'no-show', 'box'],
    content: `El Sistema Clínica & Salud 360 resuelve el principal dolor de las consultas médicas y centros estéticos: las inasistencias (no-shows) y las recepciones saturadas. Incluye: Agenda online con selección de especialista y box, Recepcionista IA en WhatsApp 24/7 que responde preparaciones y agenda horas, cobro de abonos previos con Webpay y protocolo automático de recordatorios por WhatsApp 24h y 2h antes que reduce inasistencias en más del 80%.`,
    metadata: { vertical: 'salud' }
  },
  {
    id: 'mercenario-04-servicios-b2b-360',
    category: 'sistemas_360',
    title: 'Sistema Servicios & B2B 360 (Consultoras, Ingeniería y Empresas)',
    keywords: ['b2b', 'servicios', 'consultoria', 'ingenieria', 'cotizacion', 'cotizador', 'leads', 'prospectos', 'crm', 'reuniones', 'facturacion', 'sii'],
    content: `El Sistema Servicios B2B 360 está diseñado para empresas que venden servicios de alto valor. Incluye: Web corporativa de autoridad con cotizador dinámico, Asistente en WhatsApp que califica el presupuesto y urgencia del lead antes de derivarlo al equipo directivo, sincronización automática de reuniones en Google Meet / Outlook y pipeline CRM para seguimiento de cotizaciones.`,
    metadata: { vertical: 'b2b' }
  },
  {
    id: 'mercenario-05-tiempos-precios',
    category: 'tiempos_precios',
    title: 'Tiempos de Entrega e Inversión (Llave en Mano)',
    keywords: ['cuanto vale', 'precio', 'costo', 'valor', 'cuanto tarda', 'tiempo', 'dias', 'plazo', 'mensualidad', 'mantenimiento', 'planes'],
    content: `Los sistemas de Mercenario se entregan 100% operativos en un plazo de 14 a 21 días hábiles con garantía y capacitación presencial/virtual al equipo. El modelo de negocio se divide en: 1) Setup inicial llave en mano (desde $1.200.000 CLP según la vertical y módulos requeridos) y 2) Membresía operativa mensual desde 2,5 UF/mes que incluye hosting cloud, WhatsApp Cloud API oficial, consumo de tokens de IA y soporte continuo.`,
    metadata: { guarantee: '14-21 días' }
  },
  {
    id: 'mercenario-06-integraciones',
    category: 'integraciones',
    title: 'Conectividad e Integraciones Oficiales en Chile',
    keywords: ['integraciones', 'webpay', 'transbank', 'mercado pago', 'sii', 'boleta', 'meta', 'whatsapp api', 'google', 'outlook', 'facturacion', 'shipit', 'starken', 'chilexpress', 'couriers', 'retiro en tienda', 'envios'],
    content: `Mercenario no requiere que la empresa cambie sus bancos ni sus operadores logísticos. Nos integramos de forma nativa con: Transbank Webpay Plus (débito, crédito y Redcompra), Mercado Pago Chile, Boleta y Factura Electrónica SII, API Oficial de Meta Cloud WhatsApp, Couriers en tiempo real vía Shipit (Starken, Chilexpress, Blue Express) y Retiro en Tienda física configurable, además de calendarios corporativos de Google y Microsoft Outlook.`,
    metadata: { country: 'Chile' }
  },
  {
    id: 'mercenario-07-diagnostico',
    category: 'diagnostico',
    title: 'Cómo Iniciar y Proceso de Diagnóstico Gratuito',
    keywords: ['empezar', 'iniciar', 'diagnostico', 'reunion', 'agendar', 'contacto', 'como funciona', 'pasos'],
    content: `El proceso comienza con un Diagnóstico Operativo gratuito de 30 minutos donde analizamos los cuellos de botella del negocio (ventas perdidas fuera de horario, inventarios desfasados o inasistencias). Luego presentamos una arquitectura llave en mano a medida y el cronograma de 14 días. Para agendar, el cliente puede escribir directamente a WhatsApp o completar el formulario en mercenario.cl/#contacto.`,
    metadata: { cta: 'agendar reunion' }
  }
];
