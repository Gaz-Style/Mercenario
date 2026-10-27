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
    title: 'Qué es Mercenario y Filosofía Operativa',
    keywords: ['mercenario', 'que es', 'quienes somos', 'sistema operativo', 'ios', 'automatizacion', 'empresa', 'operacion', 'software'],
    content: `Mercenario (https://mercenario.cl) es una firma de arquitectura de software y automatización comercial para pequeñas y medianas empresas en Chile. No entregamos páginas web lentas ni software aislado que nadie usa; conectamos toda la operación del negocio en un solo lugar fácil de usar: Web con Next.js (la última tecnología web ultra rápida del mercado para que tu página abra al instante en el celular sin esperas), WhatsApp inteligente que atiende solo día y noche 24/7, cobros con tarjeta al segundo, caja física sincronizada y panel de clientes.`,
    metadata: { source: 'mercenario.cl' }
  },
  {
    id: 'mercenario-02-ecommerce-360',
    category: 'sistemas_360',
    title: 'Sistema E-Commerce 360 (Retail, Moda y Marcas Físicas)',
    keywords: ['ecommerce', 'e-commerce', 'tienda online', 'retail', 'moda', 'ropa', 'pos', 'inventario', 'productos'],
    content: `El Sistema E-Commerce 360 une tu tienda física con tus ventas online para que nunca se desajuste el stock: Tienda online moderna con Next.js (la última tecnología web ultra rápida para que tu cliente compre en el celular de inmediato sin que se pegue la página), WhatsApp inteligente que asesora y envía links para pagar con tarjeta las 24 horas, pasarela Webpay Plus y Mercado Pago, y Punto de Venta (POS) en caja que descuenta el stock web en tiempo real sin descuadres.`,
    metadata: { vertical: 'retail' }
  },
  {
    id: 'mercenario-03-clinica-salud-360',
    category: 'sistemas_360',
    title: 'Sistema Clínica & Salud 360 // Clinicafy (Estética, Dental y Centros Médicos)',
    keywords: ['clinica', 'clinicafy', 'salud', 'medico', 'estetica', 'dental', 'spa', 'agenda', 'agendamiento', 'horas', 'recordatorio', 'inasistencias', 'no-show', 'box', 'honorarios', 'isapre'],
    content: `El Sistema Clínica & Salud 360 se materializa en nuestra plataforma Clinicafy (demo en vivo: https://clinicafy-beige.vercel.app/). Resuelve el mayor dolor de las consultas médicas y centros de salud: las inasistencias y las recepcionistas colapsadas contestando teléfonos. Incluye: Agenda online con Next.js ultra rápida con selección de especialista y sala, WhatsApp inteligente 24/7 que responde dudas y agenda horas solo, cobro de abonos con tarjeta bancaria para asegurar el cupo, y recordatorios automáticos por WhatsApp que reducen las inasistencias en más del 80%.`,
    metadata: { vertical: 'salud', demoUrl: 'https://clinicafy-beige.vercel.app/' }
  },
  {
    id: 'mercenario-04-servicios-b2b-360',
    category: 'sistemas_360',
    title: 'Sistema Servicios & B2B 360 (Consultoras, Ingeniería y Empresas)',
    keywords: ['b2b', 'servicios', 'consultoria', 'ingenieria', 'cotizacion', 'cotizador', 'leads', 'prospectos', 'crm', 'reuniones', 'facturacion', 'sii'],
    content: `El Sistema Servicios B2B 360 está diseñado para empresas que venden servicios profesionales. Incluye: Web corporativa con Next.js de última tecnología ultra rápida para transmitir máxima confianza, WhatsApp inteligente que filtra y califica al cliente antes de pasárselo al dueño o vendedor, agendamiento automático de videollamadas en Google Meet y seguimiento comercial ordenado.`,
    metadata: { vertical: 'b2b' }
  },
  {
    id: 'mercenario-05-tiempos-precios',
    category: 'tiempos_precios',
    title: 'Tiempos de Entrega e Inversión (Llave en Mano)',
    keywords: ['cuanto vale', 'precio', 'costo', 'valor', 'cuanto tarda', 'tiempo', 'dias', 'plazo', 'mensualidad', 'mantenimiento', 'planes'],
    content: `Los sistemas de Mercenario se entregan 100% listos y funcionando en un plazo de 14 a 21 días hábiles con capacitación presencial o virtual para todo tu equipo. El modelo se divide en: 1) Instalación inicial llave en mano (desde $1.200.000 CLP según lo que necesite tu empresa) y 2) Membresía mensual desde 2,5 UF/mes que incluye servidores rápidos, WhatsApp oficial, mantenimiento y soporte técnico continuo.`,
    metadata: { guarantee: '14-21 días' }
  },
  {
    id: 'mercenario-06-integraciones',
    category: 'integraciones',
    title: 'Conectividad e Integraciones Oficiales en Chile',
    keywords: ['integraciones', 'webpay', 'transbank', 'mercado pago', 'sii', 'boleta', 'meta', 'whatsapp api', 'google', 'outlook', 'facturacion', 'shipit', 'starken', 'chilexpress', 'couriers', 'retiro en tienda', 'envios'],
    content: `Mercenario se conecta con lo que ya usas en Chile sin que tengas que cambiar tus bancos ni tus couriers: Transbank Webpay Plus (débito, crédito y Redcompra), Mercado Pago Chile, Boleta y Factura Electrónica SII, WhatsApp oficial, Couriers para despacho (Starken, Chilexpress, Blue Express) y calendarios de Google y Outlook.`,
    metadata: { country: 'Chile' }
  },
  {
    id: 'mercenario-07-diagnostico',
    category: 'diagnostico',
    title: 'Cómo Iniciar y Proceso de Diagnóstico Gratuito',
    keywords: ['empezar', 'iniciar', 'diagnostico', 'reunion', 'agendar', 'contacto', 'como funciona', 'pasos'],
    content: `El proceso comienza con un Diagnóstico Operativo gratuito de 30 minutos donde conversamos sobre los cuellos de botella de tu negocio (horas médicas perdidas, ventas que se enfrían por responder tarde o inventario desordenado). Luego te mostramos una solución a tu medida y el plan de entrega en 14 a 21 días. Puedes agendar directamente por WhatsApp o en mercenario.cl/#contacto.`,
    metadata: { cta: 'agendar reunion' }
  }
];
