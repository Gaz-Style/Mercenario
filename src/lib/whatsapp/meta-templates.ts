import { createClient } from '@supabase/supabase-js';

export interface MetaTemplateSpec {
  name: string;
  category: 'UTILITY' | 'MARKETING' | 'AUTHENTICATION';
  language: string;
  header?: string;
  body: string;
  footer?: string;
  buttons?: Array<{
    type: 'PHONE_NUMBER' | 'URL' | 'QUICK_REPLY';
    text: string;
    value?: string;
  }>;
  sampleVariables: string[];
}

/**
 * Catálogo de Plantillas Oficiales de Meta WhatsApp Cloud API para WEKE
 */
export const WEKE_META_TEMPLATES: Record<string, MetaTemplateSpec> = {
  // ── Plantilla de Derivación a Asistencia Humana ────────────────────────────
  asistencia_humana_weke: {
    name: 'asistencia_humana_weke',
    category: 'UTILITY',
    language: 'es',
    header: 'Atención Personalizada WEKE',
    body: 'Estimado/a {{1}}, hemos transferido su solicitud a un asesor de nuestro taller en Las Condes. Un especialista de nuestro equipo se comunicará con usted a la brevedad para asistirle con su consulta sobre {{2}}.\n\nHorario de atención: Lunes a Viernes de 9:00 a 18:00 hrs.',
    footer: 'WEKE • Confección Técnica & Sustentable (Gredos 7952, Las Condes)',
    buttons: [
      {
        type: 'PHONE_NUMBER',
        text: 'Llamar al Taller',
        value: '+56998785258',
      },
      {
        type: 'URL',
        text: 'Ver Catálogo',
        value: 'https://www.weke.cl/tienda',
      },
    ],
    sampleVariables: ['Carlos', 'asesoría de tallas y chaquetas 3 capas'],
  },

  // ── Plantilla de Alerta al Operador / Administrador ────────────────────────
  alerta_operador_humano: {
    name: 'alerta_operador_humano',
    category: 'UTILITY',
    language: 'es',
    header: '⚠️ Solicitud de Asistencia Humana',
    body: 'Atención equipo WEKE: El cliente {{1}} (teléfono: {{2}}) ha solicitado atención humana con respecto a: {{3}}.\n\nPor favor ingresar al panel administrativo para tomar el control de la conversación.',
    footer: 'Mercenario OS • Notificaciones en Tiempo Real',
    buttons: [
      {
        type: 'URL',
        text: 'Abrir Chat en Admin',
        value: 'https://mercenario.cl/admin/asistente',
      },
    ],
    sampleVariables: ['Camila Sepúlveda', '+56 9 8402 1940', 'consulta sobre reparación de cierre en chaqueta'],
  },
};

/**
 * Envía la plantilla oficial de Meta WhatsApp Cloud API para asistencia humana.
 * Si la plantilla aún está pendiente de aprobación en Meta Business Manager,
 * realiza un fallback inteligente enviando el texto estructurado para no dejar al cliente sin respuesta.
 */
export async function sendHumanHandoffMetaTemplate(params: {
  chatId: string;
  customerPhone: string;
  customerName?: string;
  reason?: string;
}): Promise<{ success: boolean; mode: 'template' | 'text_fallback' | 'simulated'; error?: string }> {
  const { chatId, customerPhone, customerName = 'cliente', reason = 'su consulta' } = params;

  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const cleanPhone = customerPhone.replace(/\D/g, '');
  const templateSpec = WEKE_META_TEMPLATES.asistencia_humana_weke;

  const fallbackBody = `Estimado/a ${customerName}, hemos transferido su solicitud a un asesor de nuestro taller en Las Condes. Un especialista de nuestro equipo se comunicará con usted a la brevedad para asistirle con su consulta sobre ${reason}.\n\nHorario de atención: Lunes a Viernes de 9:00 a 18:00 hrs.\n\n— WEKE • Confección Técnica & Sustentable (Gredos 7952, Las Condes)`;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let supabase: any = null;
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }

  // 1. Si no hay credenciales de Meta configuradas, registramos simulación en Supabase
  if (!token || !phoneId) {
    if (supabase) {
      await supabase.from('crm_whatsapp_messages').insert([
        {
          chat_id: chatId,
          sender_type: 'bot',
          message_type: 'text',
          content: fallbackBody,
          metadata: {
            is_template: true,
            template_name: templateSpec.name,
            status: 'simulated_no_meta_token',
          },
        },
      ]);
      await supabase
        .from('crm_whatsapp_chats')
        .update({ session_status: 'human_handoff', last_interaction: new Date().toISOString() })
        .eq('id', chatId);
    }
    return { success: true, mode: 'simulated' };
  }

  // 2. Intentar enviar la plantilla oficial vía Meta Cloud API
  try {
    const metaResponse = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanPhone,
        type: 'template',
        template: {
          name: templateSpec.name,
          language: { code: templateSpec.language },
          components: [
            {
              type: 'body',
              parameters: [
                { type: 'text', text: customerName },
                { type: 'text', text: reason },
              ],
            },
          ],
        },
      }),
    });

    const metaData = await metaResponse.json();

    if (metaResponse.ok && metaData.messages) {
      // Guardar en Supabase
      if (supabase) {
        await supabase.from('crm_whatsapp_messages').insert([
          {
            chat_id: chatId,
            sender_type: 'bot',
            message_type: 'text',
            content: `[Plantilla Meta: ${templateSpec.name}]\n${fallbackBody}`,
            metadata: {
              is_template: true,
              template_name: templateSpec.name,
              meta_message_id: metaData.messages[0]?.id,
            },
          },
        ]);
        await supabase
          .from('crm_whatsapp_chats')
          .update({ session_status: 'human_handoff', last_interaction: new Date().toISOString() })
          .eq('id', chatId);
      }
      return { success: true, mode: 'template' };
    }

    // 3. Si la plantilla no está aprobada aún en Meta (error 132001 o similar), enviar texto de respaldo
    console.warn('Plantilla Meta no aprobada o error en Meta API, enviando texto de respaldo...', metaData);

    const textResponse = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: cleanPhone,
        type: 'text',
        text: { body: fallbackBody },
      }),
    });

    if (textResponse.ok) {
      if (supabase) {
        await supabase.from('crm_whatsapp_messages').insert([
          {
            chat_id: chatId,
            sender_type: 'bot',
            message_type: 'text',
            content: fallbackBody,
            metadata: {
              is_template_fallback: true,
              template_name: templateSpec.name,
            },
          },
        ]);
        await supabase
          .from('crm_whatsapp_chats')
          .update({ session_status: 'human_handoff', last_interaction: new Date().toISOString() })
          .eq('id', chatId);
      }
      return { success: true, mode: 'text_fallback' };
    }

    return { success: false, mode: 'text_fallback', error: 'No se pudo enviar por Meta API' };
  } catch (err: any) {
    console.error('Error enviando plantilla Meta:', err);
    return { success: false, mode: 'text_fallback', error: err.message };
  }
}
