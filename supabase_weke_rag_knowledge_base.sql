-- =======================================================================================
-- INFRAESTRUCTURA RAC / RAG (BASE DE CONOCIMIENTO DINÁMICA WEKE STUDIO)
-- =======================================================================================

-- 1. Tabla de Base de Conocimiento para el Bot RAC
CREATE TABLE IF NOT EXISTS public.bot_knowledge_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    keywords TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Índices para acelerar búsquedas
CREATE INDEX IF NOT EXISTS idx_bot_knowledge_category ON public.bot_knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_bot_knowledge_title ON public.bot_knowledge_base(title);

-- 3. Habilitar RLS permisiva para lectura del bot
ALTER TABLE public.bot_knowledge_base ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir lectura en bot_knowledge_base" ON public.bot_knowledge_base;
CREATE POLICY "Permitir lectura en bot_knowledge_base" ON public.bot_knowledge_base
FOR ALL USING (true) WITH CHECK (true);

-- 4. Inserción de Chunks de Conocimiento de Marca WEKE
INSERT INTO public.bot_knowledge_base (id, category, title, content, keywords, metadata) VALUES
(
    '00000000-0000-0000-0000-000000000001',
    'origen_nombre',
    'Significado de WEKE y el Guanaco Andino',
    'En lengua originaria andina, WEKE significa "Guanaco". El guanaco es el animal autóctono y sagrado de los Andes que simboliza resistencia extrema al clima riguroso, capacidad de adaptación a amplitudes térmicas severas y paso noble que no erosiona el suelo. Inspirados en el guanaco, confeccionamos ropa técnica que resiste la montaña sin destruir el medio ambiente.',
    ARRAY['weke', 'nombre', 'significa', 'origen', 'guanaco', 'camélido', 'resistencia', 'andino', 'cordillera'],
    '{"source": "weke-vestir-con-estilo.netlify.app"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000002',
    'historia',
    'Historia de la Marca y Fundación en 1985',
    'WEKE fue fundada en 1985 por Vidalina Díaz en Santiago de Chile. Con más de 40 años de trayectoria ininterrumpida, nació para equipar a los expedicionarios de alta y media montaña chilenos con prendas de confección local que no fallaran en situaciones extremas, bajo el lema: "La montaña es para todos, WEKE también".',
    ARRAY['historia', 'fundacion', 'fundadora', 'vidalina', 'diaz', '1985', 'quienes somos', 'origen'],
    '{"founder": "Vidalina Díaz", "year": 1985}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000003',
    'taller_contacto',
    'Taller Central, Ubicación y Canales de Atención',
    'El taller central de diseño y confección de WEKE está ubicado en Gredos 7952, comuna de Las Condes, Santiago de Chile. El horario de atención es de Lunes a Viernes de 9:00 a 18:00 hrs. Los canales oficiales son: Instagram oficial @wekeoutdoor_ (https://www.instagram.com/wekeoutdoor_), WhatsApp del asistente virtual +56 9 5795 8467 y correo contacto@wekeoutdoor.cl.',
    ARRAY['taller', 'donde', 'ubicacion', 'direccion', 'las condes', 'gredos', 'horario', 'telefono', 'contacto', 'whatsapp', 'instagram', 'redes', 'rrss'],
    '{"address": "Gredos 7952, Las Condes", "phone": "+56957958467", "instagram": "@wekeoutdoor_"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000004',
    'sustentabilidad',
    'Filosofía Cero Residuo y Upcycling Textil',
    'Desde 1985, WEKE opera bajo el principio de "Cero Residuo" para evitar la confección desechable (fast-fashion). Reutilizamos lonas de carpas de expedición dadas de baja y retazos técnicos de alta densidad para fabricar mochilas, bananos, mitones y refuerzos. Además, todas las prendas se entregan en bolsas técnicas reutilizables con un segundo uso funcional para campamento.',
    ARRAY['sustentabilidad', 'cero residuo', 'residuo', 'reciclaje', 'upcycling', 'carpas', 'ecologia', 'medio ambiente'],
    '{"principle": "Zero Waste Outdoor"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000005',
    'sustentabilidad',
    'Servicio de Reparación de Equipos y Garantía',
    'Ofrecemos servicio especializado de reparación y compostura técnica de cierres, rasgaduras y membranas de prendas y carpas de cualquier marca de montaña. Creemos que la prenda más sustentable es la que ya existe y se repara para seguir en uso. Ofrecemos garantía de por vida en confección y costuras.',
    ARRAY['reparacion', 'reparaciones', 'compostura', 'arreglo', 'cierres', 'garantia', 'postventa', 'durabilidad'],
    '{"service": "Reparaciones Outdoor"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000006',
    'inclusivo',
    'Línea Inclusiva y Ropa de Montaña Adaptada',
    'WEKE es pionera en Chile en ropa técnica inclusiva y adaptada bajo el lema "La montaña no discrimina; el vestuario tampoco debe hacerlo". Características técnicas: 1) Sin etiquetas interiores para evitar molestias sensoriales; 2) Costuras planas (flatlock) que no rozan; 3) Cierres frontales con tiradores extendidos para personas con movilidad reducida o usando guantes; 4) Pantalones con apertura lateral y cintura elástica para vestir de forma autónoma.',
    ARRAY['inclusivo', 'inclusiva', 'adaptada', 'adaptado', 'discapacidad', 'movilidad reducida', 'silla de ruedas', 'etiquetas', 'costuras', 'cierres', 'sensorial'],
    '{"collection": "Línea Inclusiva WEKE"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000007',
    'sistema_capas',
    'Sistema Primera Capa (Térmica y Segunda Piel)',
    'La Primera Capa WEKE actúa como segunda piel en contacto directo con el cuerpo. Su función es expulsar la humedad y transpiración hacia afuera mientras retiene el calor basal. Modelos insignia: Calza y Camiseta técnica Evernia (Base y Top), Xantoria (Base y Top), Camisas técnicas Aspillaga y Poleras técnicas Sora. Precios desde $34.990 CLP.',
    ARRAY['primera capa', 'termica', 'ropa termica', 'segunda piel', 'evernia', 'xantoria', 'aspillaga', 'sora', 'calza', 'camiseta'],
    '{"layer": 1}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000008',
    'sistema_capas',
    'Sistema Segunda Capa (Aislamiento en Polar Reciclado)',
    'La Segunda Capa WEKE brinda aislamiento térmico sin peso excesivo, confeccionada con polar reciclado técnico de interior afelpado. Retiene el calor generado por el cuerpo en media montaña o uso urbano. Modelos insignia: Polerones térmicos Adesmia (Crudo, Naranjo, Verde), Polerón técnico con gorro Berberis, Pantalones térmicos Chilca y Maqui, Polerón Corcolén. Precios desde $39.990 CLP.',
    ARRAY['segunda capa', 'polar', 'aislamiento', 'abrigo', 'adesmia', 'berberis', 'chilca', 'maqui', 'corcolen'],
    '{"layer": 2}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000009',
    'sistema_capas',
    'Sistema Tercera Capa (Chaquetas Shell y Flora Andina)',
    'La Tercera Capa WEKE protege de la intemperie: viento blanco, lluvia, nieve y abrasión de rocas. Confeccionadas con membranas impermeables y costuras termoselladas, bautizadas con nombres de flora nativa chilena: Chaquetas Chañar, Acacio, Belloto, Ciprés, Notro, Pircún, Guindo, Manzano, Meli, Patagua, Temu, Ulmo (desde $59.990 CLP) y buzos completos Peumo y Tiaca. Pieza cumbre: Chaqueta Andes Gore 3 capas 20.000mm ($189.900 CLP).',
    ARRAY['tercera capa', 'chaqueta', 'chaquetas', 'parka', 'cortaviento', 'impermeable', 'shell', 'andes gore', 'acacio', 'belloto', 'chanar', 'cipres', 'notro', 'pircun', 'ulmo'],
    '{"layer": 3}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000010',
    'accesorios',
    'Accesorios Outdoor, Mochilas y Sacos de Dormir',
    'Línea de accesorios técnicos WEKE: Mochila M30 Quintral (30L - $34.990), Mochila de expedición M70 Huingan (70L con soporte lumbar - $44.990), Banano técnico Lahuén ($19.990), Mitones térmicos Chagual ($11.990), Gorros térmicos Liuto, Llaretilla, Michay y Trique ($9.990), Polainas Drosera ($13.990) y Saco de dormir técnico Philesia ($39.990). Fabricados con telas de alta densidad y retazos reciclados.',
    ARRAY['mochila', 'mochilas', 'quintral', 'huingan', 'banano', 'lahuen', 'mitones', 'chagual', 'gorro', 'polainas', 'saco dormir'],
    '{"collection": "Accesorios"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000011',
    'accesorios',
    'Línea Infantil Outdoor para Niños',
    'Línea Infantil WEKE para formar a las nuevas generaciones en la naturaleza: Poleras de manga corta livianas y polerones deportivos térmicos en tela respirable. Modelos: Iquide, Pinque, Quilquil e Isla. Precio: $29.990 CLP.',
    ARRAY['infantil', 'ninos', 'polera ninos', 'poleron ninos', 'iquide', 'pinque', 'quilquil', 'isla'],
    '{"collection": "Línea Infantil"}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000012',
    'politicas',
    'Políticas de Despacho, Pagos, Cambios y Tallas Chilenas',
    'Políticas WEKE: 1) Despacho GRATIS en compras sobre $100.000 CLP. Tiempos de entrega: 24h a 48h hábiles en Santiago, y 48h a 72h hábiles a regiones con seguimiento en línea (Chilexpress/Starken). 2) Medios de Pago: Webpay Plus (Débito y Crédito) y Transferencia Bancaria Directa (con 5% de descuento inmediato). 3) Tallas: Confeccionadas con patronaje chileno (S a XL, infantil y cortes adaptados). Si indicas estatura y peso te recomendamos la talla exacta. Cambios de talla sin costo durante 30 días.',
    ARRAY['despacho', 'envio', 'costo envio', 'gratis', 'chilexpress', 'starken', 'pagos', 'webpay', 'transferencia', 'descuento', 'talla', 'tallas', 'cambio'],
    '{"shipping_free_threshold": 100000, "exchange_days": 30}'::jsonb
),
(
    '00000000-0000-0000-0000-000000000013',
    'comunidad',
    'Comunidad WEKE, Boletín de Novedades y Salidas de Montaña',
    'La Comunidad WEKE reúne a exploradores, senderistas y defensores de los Andes. En la página /tienda/comunidad, los clientes pueden suscribirse al Boletín de Novedades (Bitácora Andina) para recibir guías de rutas cordilleranas, convocatorias a trekkings inclusivos y clínicas de compostura en nuestro taller de Las Condes (Gredos 7952). Al unirse reciben un 10% de descuento de bienvenida con el cupón COMUNIDAD-WEKE-10.',
    ARRAY['comunidad', 'boletin', 'newsletter', 'novedades', 'suscribirme', 'club', 'eventos', 'salidas', 'trekking inclusivo', 'talleres', 'reparacion', 'cupon', 'descuento'],
    '{"page": "/tienda/comunidad", "coupon": "COMUNIDAD-WEKE-10"}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
    category = EXCLUDED.category,
    title = EXCLUDED.title,
    content = EXCLUDED.content,
    keywords = EXCLUDED.keywords,
    metadata = EXCLUDED.metadata;

-- 5. Tabla de Suscriptores del Boletín (Comunidad WEKE)
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    interests TEXT[] DEFAULT '{}',
    source TEXT DEFAULT 'web_comunidad_weke',
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Permitir suscripciones newsletter" ON public.newsletter_subscribers;
CREATE POLICY "Permitir suscripciones newsletter" ON public.newsletter_subscribers
FOR ALL USING (true) WITH CHECK (true);

