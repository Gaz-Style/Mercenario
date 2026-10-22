import { createClient } from '@supabase/supabase-js';

export {
  OFFICIAL_META_TEMPLATES,
  buildMetaTemplatePayload,
  type MetaTemplateSpec,
  type MetaTemplateButton,
} from './meta-templates-catalog';
import { OFFICIAL_META_TEMPLATES } from './meta-templates-catalog';

// Alias de retrocompatibilidad
export const WEKE_META_TEMPLATES = OFFICIAL_META_TEMPLATES;

/**
 * Función Maestra para despachar cualquier Plantilla Oficial de Meta WhatsApp Cloud API
 * con soporte de Variables dinámicas, Fallback inteligente a texto y registro en Supabase.
 */
export async function sendOfficialMetaTemplate(params: {
  templateKey: keyof typeof OFFICIAL_META_TEMPLATES;
  recipientPhone: string;
  variables: string[];
  chatId?: string;
}): Promise<{
  success: boolean;
  mode: 'template' | 'text_fallback' | 'simulated';
  templateName: string;
  messageId?: string;
  error?: string;
}> {
  const { templateKey, recipientPhone, variables, chatId } = params;
  const templateSpec = OFFICIAL_META_TEMPLATES[templateKey];

  if (!templateSpec) {
    return {
      success: false,
      mode: 'simulated',
      templateName: String(templateKey),
      error: `Plantilla '${String(templateKey)}' no existe en el catálogo`,
    };
  }

  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const cleanPhone = recipientPhone.replace(/\D/g, '');

  // Reemplazar variables {{1}}, {{2}}, etc. en el cuerpo para el fallback
  let compiledBody = templateSpec.body;
  variables.forEach((val, idx) => {
    compiledBody = compiledBody.replace(new RegExp(`\\{\\{${idx + 1}\\}\\}`, 'g'), val);
  });

  const fullFallbackText = `${templateSpec.header ? `*${templateSpec.header}*\n\n` : ''}${compiledBody}${templateSpec.footer ? `\n\n_${templateSpec.footer}_` : ''}`;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let supabase: any = null;
  if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }

  // 1. Simulación cuando no hay credenciales de Meta Cloud configuradas
  if (!token || !phoneId) {
    if (supabase && chatId) {
      await supabase.from('crm_whatsapp_messages').insert([
        {
          chat_id: chatId,
          sender_type: 'bot',
          message_type: 'text',
          content: fullFallbackText,
          metadata: {
            is_template: true,
            template_name: templateSpec.name,
            variables,
            status: 'simulated_no_meta_token',
          },
        },
      ]);
    }
    return { success: true, mode: 'simulated', templateName: templateSpec.name };
  }

  // 2. Envío de plantilla oficial homologada a través de Meta Graph API
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
              parameters: variables.map((val) => ({ type: 'text', text: val })),
            },
          ],
        },
      }),
    });

    const metaData = await metaResponse.json();

    if (metaResponse.ok && metaData.messages) {
      const msgId = metaData.messages[0]?.id;
      if (supabase && chatId) {
        await supabase.from('crm_whatsapp_messages').insert([
          {
            chat_id: chatId,
            sender_type: 'bot',
            message_type: 'text',
            content: `[Plantilla Meta Homologada: ${templateSpec.name}]\n${fullFallbackText}`,
            metadata: {
              is_template: true,
              template_name: templateSpec.name,
              meta_message_id: msgId,
              variables,
            },
          },
        ]);
      }
      return { success: true, mode: 'template', templateName: templateSpec.name, messageId: msgId };
    }

    // 3. Fallback a texto en caso de que la plantilla esté pendiente de revisión en Meta
    console.warn(`Plantilla Meta '${templateSpec.name}' no disponible aún en Meta Business Manager. Enviando texto de respaldo...`, metaData);

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
        text: { body: fullFallbackText },
      }),
    });

    if (textResponse.ok) {
      if (supabase && chatId) {
        await supabase.from('crm_whatsapp_messages').insert([
          {
            chat_id: chatId,
            sender_type: 'bot',
            message_type: 'text',
            content: fullFallbackText,
            metadata: {
              is_template_fallback: true,
              template_name: templateSpec.name,
              variables,
            },
          },
        ]);
      }
      return { success: true, mode: 'text_fallback', templateName: templateSpec.name };
    }

    return {
      success: false,
      mode: 'text_fallback',
      templateName: templateSpec.name,
      error: metaData.error?.message || 'Error en Meta Graph API',
    };
  } catch (err: any) {
    console.error('Excepción enviando plantilla Meta:', err);
    return {
      success: false,
      mode: 'text_fallback',
      templateName: templateSpec.name,
      error: err.message,
    };
  }
}

/**
 * Función de derivación humana específica (compatibilidad)
 */
export async function sendHumanHandoffMetaTemplate(params: {
  chatId: string;
  customerPhone: string;
  customerName?: string;
  reason?: string;
}) {
  return sendOfficialMetaTemplate({
    templateKey: 'asistencia_humana_weke',
    recipientPhone: params.customerPhone,
    variables: [params.customerName || 'cliente', params.reason || 'su consulta'],
    chatId: params.chatId,
  });
}
