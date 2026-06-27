'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getLeadsAction() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (error) {
        console.error('Error fetching leads:', error.message, '| Code:', error.code);
        return [];
    }
    return data || [];
}

export async function getMarketingTasks() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('marketing_tasks').select('*').order('created_at', { ascending: true });
    
    // Fallback: Si Supabase falla, devolvemos las 22 herramientas hardcodeadas para que la UI no quede vacía
    if (error || !data || data.length === 0) {
        if (error) console.error('Error fetching marketing tasks:', error.message, '| Code:', error.code);
        
        return [
            // PILAR 1: SEO & GEO
            { id: '1', title: 'Optimización de Metadatos B2B', description: 'Implementar el título premium y la meta descripción optimizada para Google.', category: 'SEO & GEO', status: 'completed', target_date: 'Logrado', impact: 'Alto' },
            { id: '2', title: 'Schema LocalBusiness Estructurado', description: 'Inyección de JSON-LD con coordenadas y servicios clave para IA.', category: 'SEO & GEO', status: 'completed', target_date: 'Logrado', impact: 'Alto' },
            { id: '3', title: 'Ficha de Google Business Profile', description: 'Modificar el nombre oficial y alinear la dirección física.', category: 'SEO & GEO', status: 'completed', target_date: 'Logrado', impact: 'Alto' },
            { id: '4', title: 'Campaña de Reseñas Automáticas', description: 'Flujo de envío automatizado utilizando el enlace de reseña directa.', category: 'SEO & GEO', status: 'in_progress', target_date: 'En Curso', impact: 'Alto' },
            { id: '5', title: 'Programmatic SEO de Nicho', description: 'Generación masiva de cientos de landing pages por industria B2B.', category: 'SEO & GEO', status: 'pending', target_date: 'Pendiente', impact: 'Alto' },
            
            // PILAR 2: Meta Ads
            { id: '6', title: 'Anuncios B2B en LinkedIn Ads', description: 'Pauta segmentada directa a dueños de clínicas y retail.', category: 'Meta Ads', status: 'in_progress', target_date: 'En Curso', impact: 'Alto' },
            { id: '7', title: 'Reels ASMR & Casos de Uso', description: 'Videos estéticos de 15 segundos mostrando la infraestructura en acción.', category: 'Meta Ads', status: 'in_progress', target_date: 'En Curso', impact: 'Medio' },
            { id: '8', title: 'Geofencing Ads en Polos Financieros', description: 'Configurar anuncios con radio ultra-acotado en El Golf y Nueva Las Condes.', category: 'Meta Ads', status: 'pending', target_date: 'Pendiente', impact: 'Alto' },
            { id: '9', title: 'Retargeting a Visitas Landing', description: 'Campañas de remarketing exclusivas para quienes iniciaron la auditoría.', category: 'Meta Ads', status: 'pending', target_date: 'Pendiente', impact: 'Alto' },
            { id: '10', title: 'Asistente de Contenido IA para Ads', description: 'Módulo interno para crear copys automáticos basados en métricas.', category: 'Meta Ads', status: 'pending', target_date: 'Pendiente', impact: 'Medio' },

            // PILAR 3: Influencer Loop
            { id: '11', title: 'Programa "Early Adopters VIP"', description: 'Identificar a 5 CEOs locales para darles acceso a costo cero a cambio de casos de éxito.', category: 'Influencer Loop', status: 'pending', target_date: 'Pendiente', impact: 'Alto' },
            { id: '12', title: 'Alianzas B2B con Consultoras', description: 'Asociarse con firmas contables para ofrecer Mercenario como solución ERP.', category: 'Influencer Loop', status: 'pending', target_date: 'Pendiente', impact: 'Alto' },
            { id: '13', title: 'Webinars con Referentes B2B', description: 'Organizar charlas online sobre infraestructura tecnológica con líderes de industria.', category: 'Influencer Loop', status: 'pending', target_date: 'Pendiente', impact: 'Medio' },
            { id: '14', title: 'UGC B2B (User Generated Content)', description: 'Capturar reacciones en vivo de gerentes al usar el dashboard de BI.', category: 'Influencer Loop', status: 'pending', target_date: 'Pendiente', impact: 'Alto' },

            // PILAR 4: Automatización CRM
            { id: '15', title: 'Flujos de Correo Enriquecidos (Drip)', description: 'Conectar formularios a Resend para correos hiper-personalizados por industria.', category: 'Automatización CRM', status: 'pending', target_date: 'Pendiente', impact: 'Alto' },
            { id: '16', title: 'Alerta WhatsApp Tiempo Real', description: 'Conectar el pipeline con alertas instantáneas al agendar una demo.', category: 'Automatización CRM', status: 'pending', target_date: 'Pendiente', impact: 'Alto' },
            { id: '17', title: 'Newsletter Editorial "Growth B2B"', description: 'Boletín automatizado con tácticas de escalamiento para prospectos.', category: 'Automatización CRM', status: 'pending', target_date: 'Pendiente', impact: 'Medio' },
            { id: '18', title: 'Reactivación de Leads Fríos', description: 'Cron job semanal para contactar a dueños que no respondieron en 30 días.', category: 'Automatización CRM', status: 'pending', target_date: 'Pendiente', impact: 'Medio' },

            // PILAR 5: Viral Loop
            { id: '19', title: 'Programa de Referidos B2B', description: 'Descuento cruzado: la empresa recomendada y la recomendadora ganan 2 meses gratis.', category: 'Viral Loop (Referidos)', status: 'pending', target_date: 'Pendiente', impact: 'Alto' },
            { id: '20', title: 'Tarjetas NFC de Bienvenida', description: 'Tarjetas metálicas inteligentes que las empresas pueden mostrar a sus socios.', category: 'Viral Loop (Referidos)', status: 'pending', target_date: 'Pendiente', impact: 'Medio' },
            { id: '21', title: 'Leaderboard de Adopción', description: 'Gamificación interna mostrando qué clientes tienen mejor uso del ecosistema.', category: 'Viral Loop (Referidos)', status: 'pending', target_date: 'Pendiente', impact: 'Bajo' },
            { id: '22', title: 'Sello "Powered by Mercenario"', description: 'Widget en las facturas y correos de las empresas clientes llevando a nuestra landing.', category: 'Viral Loop (Referidos)', status: 'pending', target_date: 'Pendiente', impact: 'Alto' },
        ];
    }
    
    return data;
}

export async function updateMarketingTaskStatus(id: string, newStatus: string, newDate: string) {
    const supabase = await createClient();
    const { error } = await supabase
        .from('marketing_tasks')
        .update({ status: newStatus, target_date: newDate })
        .eq('id', id);
    if (error) return { success: false, error: error.message };
    revalidatePath('/admin/marketing');
    return { success: true };
}
