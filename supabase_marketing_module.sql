-- ========================================================
-- SISTEMA DE MARKETING & POSICIONAMIENTO - MERCENARIO OS
-- ========================================================

-- 1. Eliminar la tabla si existe para reiniciar los datos limpios
DROP TABLE IF EXISTS public.marketing_tasks;

-- 2. Crear tabla de tareas de marketing (Las 22 herramientas B2B)
CREATE TABLE public.marketing_tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('SEO & GEO', 'Meta Ads', 'Influencer Loop', 'Automatización CRM', 'Viral Loop (Referidos)')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('completed', 'in_progress', 'pending')),
    target_date TEXT NOT NULL,
    impact TEXT NOT NULL CHECK (impact IN ('Alto', 'Medio', 'Bajo')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Habilitar RLS
ALTER TABLE public.marketing_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on marketing_tasks"
    ON public.marketing_tasks
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 4. Poblar datos iniciales reales (El Checklist de 22 Herramientas)
INSERT INTO public.marketing_tasks (title, description, category, status, target_date, impact) VALUES
-- PILAR 1: SEO & GEO
('Optimización de Metadatos B2B', 'Implementar el título premium y la meta descripción optimizada para Google.', 'SEO & GEO', 'completed', 'Logrado', 'Alto'),
('Schema LocalBusiness Estructurado', 'Inyección de JSON-LD con coordenadas y servicios clave para IA.', 'SEO & GEO', 'completed', 'Logrado', 'Alto'),
('Ficha de Google Business Profile', 'Modificar el nombre oficial y alinear la dirección física.', 'SEO & GEO', 'completed', 'Logrado', 'Alto'),
('Campaña de Reseñas Automáticas', 'Flujo de envío automatizado utilizando el enlace de reseña directa.', 'SEO & GEO', 'in_progress', 'En Curso', 'Alto'),
('Programmatic SEO de Nicho', 'Generación masiva de cientos de landing pages por industria B2B.', 'SEO & GEO', 'pending', 'Pendiente', 'Alto'),

-- PILAR 2: Meta Ads
('Anuncios B2B en LinkedIn Ads', 'Pauta segmentada directa a dueños de clínicas y retail.', 'Meta Ads', 'in_progress', 'En Curso', 'Alto'),
('Reels ASMR & Casos de Uso', 'Videos estéticos de 15 segundos mostrando la infraestructura en acción.', 'Meta Ads', 'in_progress', 'En Curso', 'Medio'),
('Geofencing Ads en Polos Financieros', 'Configurar anuncios con radio ultra-acotado en El Golf y Nueva Las Condes.', 'Meta Ads', 'pending', 'Pendiente', 'Alto'),
('Retargeting a Visitas Landing', 'Campañas de remarketing exclusivas para quienes iniciaron la auditoría.', 'Meta Ads', 'pending', 'Pendiente', 'Alto'),
('Asistente de Contenido IA para Ads', 'Módulo interno para crear copys automáticos basados en métricas.', 'Meta Ads', 'pending', 'Pendiente', 'Medio'),

-- PILAR 3: Influencer Loop
('Programa "Early Adopters VIP"', 'Identificar a 5 CEOs locales para darles acceso a costo cero a cambio de casos de éxito.', 'Influencer Loop', 'pending', 'Pendiente', 'Alto'),
('Alianzas B2B con Consultoras', 'Asociarse con firmas contables para ofrecer Mercenario como solución ERP.', 'Influencer Loop', 'pending', 'Pendiente', 'Alto'),
('Webinars con Referentes B2B', 'Organizar charlas online sobre infraestructura tecnológica con líderes de industria.', 'Influencer Loop', 'pending', 'Pendiente', 'Medio'),
('UGC B2B (User Generated Content)', 'Capturar reacciones en vivo de gerentes al usar el dashboard de BI.', 'Influencer Loop', 'pending', 'Pendiente', 'Alto'),

-- PILAR 4: Automatización CRM
('Flujos de Correo Enriquecidos (Drip)', 'Conectar formularios a Resend para correos hiper-personalizados por industria.', 'Automatización CRM', 'pending', 'Pendiente', 'Alto'),
('Alerta WhatsApp Tiempo Real', 'Conectar el pipeline con alertas instantáneas al agendar una demo.', 'Automatización CRM', 'pending', 'Pendiente', 'Alto'),
('Newsletter Editorial "Growth B2B"', 'Boletín automatizado con tácticas de escalamiento para prospectos.', 'Automatización CRM', 'pending', 'Pendiente', 'Medio'),
('Reactivación de Leads Fríos', 'Cron job semanal para contactar a dueños que no respondieron en 30 días.', 'Automatización CRM', 'pending', 'Pendiente', 'Medio'),

-- PILAR 5: Viral Loop
('Programa de Referidos B2B', 'Descuento cruzado: la empresa recomendada y la recomendadora ganan 2 meses gratis.', 'Viral Loop (Referidos)', 'pending', 'Pendiente', 'Alto'),
('Tarjetas NFC de Bienvenida', 'Tarjetas metálicas inteligentes que las empresas pueden mostrar a sus socios.', 'Viral Loop (Referidos)', 'pending', 'Pendiente', 'Medio'),
('Leaderboard de Adopción', 'Gamificación interna mostrando qué clientes tienen mejor uso del ecosistema.', 'Viral Loop (Referidos)', 'pending', 'Pendiente', 'Bajo'),
('Sello "Powered by Mercenario"', 'Widget en las facturas y correos de las empresas clientes llevando a nuestra landing.', 'Viral Loop (Referidos)', 'pending', 'Pendiente', 'Alto');
