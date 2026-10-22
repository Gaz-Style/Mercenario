export interface KnowledgeChunk {
  id: string;
  category: 'origen_nombre' | 'historia' | 'sustentabilidad' | 'inclusivo' | 'sistema_capas' | 'accesorios' | 'taller_contacto' | 'politicas' | 'comunidad';
  title: string;
  keywords: string[];
  content: string;
  metadata?: Record<string, any>;
}

export const WEKE_KNOWLEDGE_CORPUS: KnowledgeChunk[] = [
  {
    id: 'weke-01-nombre-guanaco',
    category: 'origen_nombre',
    title: 'Significado de WEKE y el Guanaco Andino',
    keywords: ['weke', 'nombre', 'significa', 'origen', 'guanaco', 'camélido', 'resistencia', 'andino', 'cordillera', 'por que se llama'],
    content: `En lengua originaria andina, WEKE significa "Guanaco". El guanaco es el animal autóctono y sagrado de los Andes que simboliza resistencia extrema al clima riguroso, capacidad de adaptación a amplitudes térmicas severas y paso noble que no erosiona el suelo. Inspirados en el guanaco, confeccionamos ropa técnica que resiste la montaña sin destruir el medio ambiente.`,
    metadata: { source: 'weke-vestir-con-estilo.netlify.app' }
  },
  {
    id: 'weke-02-historia-vidalina',
    category: 'historia',
    title: 'Historia de la Marca y Fundación en 1985',
    keywords: ['historia', 'fundacion', 'fundadora', 'vidalina', 'diaz', '1985', 'anos', 'trayectoria', 'quienes somos', 'origen marca'],
    content: `WEKE fue fundada en 1985 por Vidalina Díaz en Santiago de Chile. Con más de 40 años de trayectoria ininterrumpida, nació para equipar a los expedicionarios de alta y media montaña chilenos con prendas de confección local que no fallaran en situaciones extremas, bajo el lema: "La montaña es para todos, WEKE también".`,
    metadata: { founder: 'Vidalina Díaz', year: 1985 }
  },
  {
    id: 'weke-03-taller-las-condes',
    category: 'taller_contacto',
    title: 'Taller Central, Ubicación y Canales de Atención',
    keywords: ['taller', 'donde', 'ubicacion', 'direccion', 'las condes', 'gredos', 'horario', 'telefono', 'contacto', 'whatsapp', 'visita', 'instagram', 'redes', 'rrss'],
    content: `El taller central de diseño y confección de WEKE está ubicado en Gredos 7952, comuna de Las Condes, Santiago de Chile. El horario de atención es de Lunes a Viernes de 9:00 a 18:00 hrs. Los canales oficiales son: Instagram oficial @wekeoutdoor_ (https://www.instagram.com/wekeoutdoor_), WhatsApp del asistente virtual +56 9 5795 8467 y correo contacto@wekeoutdoor.cl.`,
    metadata: { address: 'Gredos 7952, Las Condes', phone: '+56957958467', instagram: '@wekeoutdoor_' }
  },
  {
    id: 'weke-04-sustentabilidad-cero-residuo',
    category: 'sustentabilidad',
    title: 'Filosofía Cero Residuo y Upcycling Textil',
    keywords: ['sustentabilidad', 'cero residuo', 'residuo', 'reciclaje', 'upcycling', 'carpas', 'ecologia', 'medio ambiente', 'desechable', 'bolsas'],
    content: `Desde 1985, WEKE opera bajo el principio de "Cero Residuo" para evitar la confección desechable (fast-fashion). Reutilizamos lonas de carpas de expedición dadas de baja y retazos técnicos de alta densidad para fabricar mochilas, bananos, mitones y refuerzos. Además, todas las prendas se entregan en bolsas técnicas reutilizables con un segundo uso funcional para campamento.`,
    metadata: { principle: 'Zero Waste Outdoor' }
  },
  {
    id: 'weke-05-servicio-reparacion-garantia',
    category: 'sustentabilidad',
    title: 'Servicio de Reparación de Equipos y Garantía',
    keywords: ['reparacion', 'reparaciones', 'compostura', 'arreglo', 'cierres', 'garantia', 'postventa', 'durabilidad', 'vida util'],
    content: `Ofrecemos servicio especializado de reparación y compostura técnica de cierres, rasgaduras y membranas de prendas y carpas de cualquier marca de montaña. Creemos que la prenda más sustentable es la que ya existe y se repara para seguir en uso. Ofrecemos garantía de por vida en confección y costuras.`,
    metadata: { service: 'Reparaciones Outdoor' }
  },
  {
    id: 'weke-06-linea-inclusiva',
    category: 'inclusivo',
    title: 'Línea Inclusiva y Ropa de Montaña Adaptada',
    keywords: ['inclusivo', 'inclusiva', 'adaptada', 'adaptado', 'discapacidad', 'movilidad reducida', 'silla de ruedas', 'etiquetas', 'costuras', 'cierres', 'sensorial', 'sensibilidad'],
    content: `WEKE es pionera en Chile en ropa técnica inclusiva y adaptada bajo el lema "La montaña no discrimina; el vestuario tampoco debe hacerlo". Características técnicas: 1) Sin etiquetas interiores para evitar molestias sensoriales; 2) Costuras planas (flatlock) que no rozan; 3) Cierres frontales con tiradores extendidos para personas con movilidad reducida o usando guantes; 4) Pantalones con apertura lateral y cintura elástica para vestir de forma autónoma.`,
    metadata: { collection: 'Línea Inclusiva WEKE' }
  },
  {
    id: 'weke-07-sistema-primera-capa',
    category: 'sistema_capas',
    title: 'Sistema Primera Capa (Térmica y Segunda Piel)',
    keywords: ['primera capa', 'termica', 'ropa termica', 'segunda piel', 'evernia', 'xantoria', 'aspillaga', 'sora', 'calza', 'camiseta', 'humedad'],
    content: `La Primera Capa WEKE actúa como segunda piel en contacto directo con el cuerpo. Su función es expulsar la humedad y transpiración hacia afuera mientras retiene el calor basal. Modelos insignia: Calza y Camiseta técnica Evernia (Base y Top), Xantoria (Base y Top), Camisas técnicas Aspillaga y Poleras técnicas Sora. Precios desde $34.990 CLP.`,
    metadata: { layer: 1 }
  },
  {
    id: 'weke-08-sistema-segunda-capa',
    category: 'sistema_capas',
    title: 'Sistema Segunda Capa (Aislamiento en Polar Reciclado)',
    keywords: ['segunda capa', 'polar', 'aislamiento', 'abrigo', 'adesmia', 'berberis', 'chilca', 'maqui', 'corcolen', 'poleron', 'pantalon'],
    content: `La Segunda Capa WEKE brinda aislamiento térmico sin peso excesivo, confeccionada con polar reciclado técnico de interior afelpado. Retiene el calor generado por el cuerpo en media montaña o uso urbano. Modelos insignia: Polerones térmicos Adesmia (Crudo, Naranjo, Verde), Polerón técnico con gorro Berberis, Pantalones térmicos Chilca y Maqui, Polerón Corcolén. Precios desde $39.990 CLP.`,
    metadata: { layer: 2 }
  },
  {
    id: 'weke-09-sistema-tercera-capa-chaquetas',
    category: 'sistema_capas',
    title: 'Sistema Tercera Capa (Chaquetas Shell y Flora Andina)',
    keywords: ['tercera capa', 'chaqueta', 'chaquetas', 'parka', 'cortaviento', 'impermeable', 'shell', 'andes gore', 'acacio', 'belloto', 'chanar', 'cipres', 'notro', 'pircun', 'ulmo', 'peumo', 'tiaca'],
    content: `La Tercera Capa WEKE protege de la intemperie: viento blanco, lluvia, nieve y abrasión de rocas. Confeccionadas con membranas impermeables y costuras termoselladas, bautizadas con nombres de flora nativa chilena: Chaquetas Chañar, Acacio, Belloto, Ciprés, Notro, Pircún, Guindo, Manzano, Meli, Patagua, Temu, Ulmo (desde $59.990 CLP) y buzos completos Peumo y Tiaca. Pieza cumbre: Chaqueta Andes Gore 3 capas 20.000mm ($189.900 CLP).`,
    metadata: { layer: 3 }
  },
  {
    id: 'weke-10-accesorios-mochilas',
    category: 'accesorios',
    title: 'Accesorios Outdoor, Mochilas y Sacos de Dormir',
    keywords: ['mochila', 'mochilas', 'quintral', 'huingan', 'banano', 'lahuen', 'mitones', 'chagual', 'gorro', 'liuto', 'llaretilla', 'michay', 'trique', 'polainas', 'drosera', 'saco dormir', 'philesia'],
    content: `Línea de accesorios técnicos WEKE: Mochila M30 Quintral (30L - $34.990), Mochila de expedición M70 Huingan (70L con soporte lumbar - $44.990), Banano técnico Lahuén ($19.990), Mitones térmicos Chagual ($11.990), Gorros térmicos Liuto, Llaretilla, Michay y Trique ($9.990), Polainas Drosera ($13.990) y Saco de dormir técnico Philesia ($39.990). Fabricados con telas de alta densidad y retazos reciclados.`,
    metadata: { collection: 'Accesorios' }
  },
  {
    id: 'weke-11-linea-infantil',
    category: 'accesorios',
    title: 'Línea Infantil Outdoor para Niños',
    keywords: ['infantil', 'ninos', 'polera ninos', 'poleron ninos', 'iquide', 'pinque', 'quilquil', 'isla', 'tallas infantiles'],
    content: `Línea Infantil WEKE para formar a las nuevas generaciones en la naturaleza: Poleras de manga corta livianas y polerones deportivos térmicos en tela respirable. Modelos: Iquide, Pinque, Quilquil e Isla. Precio: $29.990 CLP.`,
    metadata: { collection: 'Línea Infantil' }
  },
  {
    id: 'weke-12-politicas-despachos-pagos-tallas',
    category: 'politicas',
    title: 'Políticas de Despacho, Pagos, Cambios y Tallas Chilenas',
    keywords: ['despacho', 'envio', 'costo envio', 'gratis', 'chilexpress', 'starken', 'cuanto tarda', 'santiago', 'regiones', 'pagos', 'webpay', 'transferencia', 'descuento', 'talla', 'tallas', 'cambio'],
    content: `Políticas WEKE: 1) Despacho GRATIS en compras sobre $100.000 CLP. Tiempos de entrega: 24h a 48h hábiles en Santiago, y 48h a 72h hábiles a regiones con seguimiento en línea (Chilexpress/Starken). 2) Medios de Pago: Webpay Plus (Débito y Crédito) y Transferencia Bancaria Directa (con 5% de descuento inmediato). 3) Tallas: Confeccionadas con patronaje chileno (S a XL, infantil y cortes adaptados). Si indicas estatura y peso te recomendamos la talla exacta. Cambios de talla sin costo durante 30 días.`,
    metadata: { shipping_free_threshold: 100000, exchange_days: 30 }
  },
  {
    id: 'weke-13-comunidad-boletin-novedades',
    category: 'comunidad',
    title: 'Comunidad WEKE, Boletín de Novedades y Salidas de Montaña',
    keywords: ['comunidad', 'boletin', 'newsletter', 'novedades', 'suscribirme', 'club', 'eventos', 'salidas', 'trekking inclusivo', 'talleres', 'reparacion', 'cupon', 'descuento'],
    content: `La Comunidad WEKE reúne a expedicionarios, senderistas y amantes de los Andes. A través de la página /tienda/comunidad, los clientes pueden suscribirse al Boletín de Novedades (Bitácora Andina) para recibir guías de rutas cordilleranas, convocatorias a trekkings inclusivos y clínicas de compostura en nuestro taller de Las Condes (Gredos 7952). Al unirse reciben además un 10% de descuento de bienvenida con el cupón COMUNIDAD-WEKE-10.`,
    metadata: { page: '/tienda/comunidad', coupon: 'COMUNIDAD-WEKE-10' }
  }
];
