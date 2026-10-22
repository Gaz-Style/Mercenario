'use server';

import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createAdminClient(url, key);
}

// ── 1. Obtener Lista de Chats desde Supabase en Tiempo Real ─────────────────
export async function getWhatsAppChatsAction(): Promise<any[]> {
  const admin = getAdminClient();
  if (!admin) return [];

  try {
    const { data: dbChats, error } = await admin
      .from('crm_whatsapp_chats')
      .select('*')
      .order('last_interaction', { ascending: false });

    if (error) {
      console.error('Error consultando crm_whatsapp_chats en Supabase:', error);
      return [];
    }

    if (!dbChats || dbChats.length === 0) {
      return [];
    }

    // Obtener el último mensaje de cada chat desde crm_whatsapp_messages
    const chatIds = dbChats.map((c) => c.id);
    const { data: messages } = await admin
      .from('crm_whatsapp_messages')
      .select('*')
      .in('chat_id', chatIds)
      .order('created_at', { ascending: false });

    const result = dbChats.map((chat: any) => {
      const lastMsg = (messages || []).find((m: any) => m.chat_id === chat.id);
      const phone = chat.phone_number || '';
      const fallbackName = phone ? `Cliente ${phone.slice(-4)}` : 'Cliente';

      return {
        id: chat.id,
        phone_number: phone,
        customer_id: chat.customer_id || null,
        session_status: chat.session_status || 'bot',
        lead_score: chat.lead_score || 0,
        vertical: chat.vertical || 'retail',
        last_message: lastMsg?.content || 'Conversación activa',
        last_message_at: chat.last_interaction || chat.created_at || new Date().toISOString(),
        customers: {
          id: chat.customer_id || chat.id,
          full_name: chat.context?.customer_name || fallbackName,
          phone: phone,
          email: chat.context?.customer_email || 'Sin correo registrado',
          total_orders: chat.context?.orders_count || 1,
          total_spent: chat.context?.total_spent || 89900,
          city: chat.context?.city || 'Santiago, Chile',
          preferred_size: chat.context?.preferred_size || 'Talla M',
          interest: chat.vertical === 'viajes' ? 'Expediciones & Montaña' : 'Ropa Técnica & Chaquetas',
        },
      };
    });

    return JSON.parse(JSON.stringify(result));
  } catch (err) {
    console.error('Error en getWhatsAppChatsAction:', err);
    return [];
  }
}

// ── 2. Obtener Historial de Mensajes de un Chat ───────────────────────────────
export async function getWhatsAppMessagesAction(chatId: string): Promise<any[]> {
  const admin = getAdminClient();
  if (!admin) return [];

  try {
    const { data: dbMsgs, error } = await admin
      .from('crm_whatsapp_messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error leyendo mensajes de Supabase:', error);
      return [];
    }

    return dbMsgs || [];
  } catch (err) {
    console.error('Error en getWhatsAppMessagesAction:', err);
    return [];
  }
}

// ── 3. Enviar Mensaje desde el Panel (Operador Humano) ─────────────────────────
export async function sendWhatsAppMessageAction(chatId: string, content: string) {
  const admin = getAdminClient();
  if (!admin) return { success: false, error: 'Sin conexión a Supabase' };

  try {
    // 1. Insertar mensaje en crm_whatsapp_messages
    const { error: insertErr } = await admin.from('crm_whatsapp_messages').insert([
      {
        id: crypto.randomUUID(),
        chat_id: chatId,
        sender_type: 'human',
        message_type: 'text',
        content: content.trim(),
      },
    ]);

    if (insertErr) {
      console.error('Error insertando mensaje en Supabase:', insertErr);
      return { success: false, error: insertErr.message };
    }

    // 2. Actualizar estado a human_handoff y actualizar last_interaction
    await admin
      .from('crm_whatsapp_chats')
      .update({
        session_status: 'human_handoff',
        last_interaction: new Date().toISOString(),
      })
      .eq('id', chatId);

    // 3. Si están configuradas las credenciales oficiales de Meta WhatsApp Cloud API:
    const token = process.env.WHATSAPP_API_TOKEN;
    const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (token && phoneId) {
      const { data: chat } = await admin
        .from('crm_whatsapp_chats')
        .select('phone_number')
        .eq('id', chatId)
        .single();

      if (chat?.phone_number) {
        const cleanPhone = chat.phone_number.replace(/\D/g, '');
        await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: cleanPhone,
            type: 'text',
            text: { body: content },
          }),
        });
      }
    }

    return { success: true };
  } catch (err: any) {
    console.error('Error en sendWhatsAppMessageAction:', err);
    return { success: false, error: err.message };
  }
}

// ── 4. Toggle Bot (Activar IA / Modo Humano) ─────────────────────────────────
export async function toggleBotSessionAction(chatId: string, enableBot: boolean) {
  const admin = getAdminClient();
  if (!admin) return { success: false };

  const newStatus = enableBot ? 'bot' : 'human_handoff';
  try {
    await admin
      .from('crm_whatsapp_chats')
      .update({
        session_status: newStatus,
        last_interaction: new Date().toISOString(),
      })
      .eq('id', chatId);

    return { success: true, status: newStatus };
  } catch (err) {
    console.error('Error actualizando sesión en Supabase:', err);
    return { success: false };
  }
}

// ── 5. Iniciar Nuevo Chat en Supabase ─────────────────────────────────────────
export async function createOrStartChatAction(phone: string) {
  const admin = getAdminClient();
  if (!admin) return { success: false, error: 'Sin conexión a Supabase' };

  const cleanPhone = phone.trim();
  const formattedPhone = cleanPhone.startsWith('+') ? cleanPhone : `+56 ${cleanPhone}`;

  try {
    // Verificar si ya existe
    const { data: existing } = await admin
      .from('crm_whatsapp_chats')
      .select('*')
      .eq('phone_number', formattedPhone)
      .maybeSingle();

    if (existing) {
      return { success: true, chat: existing };
    }

    const newChatId = crypto.randomUUID();
    const { data: created, error } = await admin
      .from('crm_whatsapp_chats')
      .insert([
        {
          id: newChatId,
          phone_number: formattedPhone,
          session_status: 'bot',
          lead_score: 50,
          vertical: 'retail',
          context: {
            customer_name: `Contacto ${formattedPhone.slice(-4)}`,
            city: 'Santiago, Chile',
          },
        },
      ])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    // Insertar mensaje inicial de saludo del asistente
    await admin.from('crm_whatsapp_messages').insert([
      {
        id: crypto.randomUUID(),
        chat_id: newChatId,
        sender_type: 'bot',
        message_type: 'text',
        content: '¡Hola! Bienvenido a WEKE Studio. Soy el asistente virtual oficial. ¿En qué te podemos ayudar hoy?',
      },
    ]);

    return {
      success: true,
      chat: {
        ...created,
        last_message: '¡Hola! Bienvenido a WEKE Studio...',
        customers: {
          id: newChatId,
          full_name: `Contacto ${formattedPhone.slice(-4)}`,
          phone: formattedPhone,
          email: 'Sin correo registrado',
          city: 'Santiago, Chile',
          preferred_size: 'Talla M',
          interest: 'Ropa Técnica',
        },
      },
    };
  } catch (err: any) {
    console.error('Error en createOrStartChatAction:', err);
    return { success: false, error: err.message };
  }
}

// ── 6. Probar Simulador de IA en Tiempo Real con RAC ───────────────────────
export async function testAIAssistantAction(userMessage: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/assistant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        reply: data.reply,
        provider: data.provider,
        status: data.status,
        rac: data.rac,
      };
    }
  } catch (err) {
    console.warn('Error probando asistente API vía fetch:', err);
  }

  return {
    success: true,
    reply: '¡Hola! Soy el Asistente Virtual de WEKE 🏔️. Confeccionamos indumentaria técnica sustentable e inclusiva en Chile desde 1985.',
    provider: 'weke_fallback_simulator',
    rac: {
      sources: [{ id: 'weke-corpus', title: 'Base de Conocimiento WEKE (RAC)', category: 'general' }],
      categories: ['general'],
    },
  };
}

// ── 7. Simular Mensaje Entrante de Cliente y Respuesta de IA ───────────────
export async function simulateCustomerMessageAction(chatId: string, customerMessage: string) {
  const admin = getAdminClient();
  if (!admin) return { success: false, error: 'Sin conexión a Supabase' };

  try {
    // 1. Insertar mensaje como cliente
    const customerMsgId = crypto.randomUUID();
    await admin.from('crm_whatsapp_messages').insert([
      {
        id: customerMsgId,
        chat_id: chatId,
        sender_type: 'customer',
        message_type: 'text',
        content: customerMessage.trim(),
      },
    ]);

    // 2. Si la sesión está en modo bot, generar respuesta automática con la IA
    const { data: chat } = await admin
      .from('crm_whatsapp_chats')
      .select('session_status')
      .eq('id', chatId)
      .single();

    let botReply = '';
    if (chat?.session_status === 'bot') {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      try {
        const aiRes = await fetch(`${baseUrl}/api/assistant`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: customerMessage.trim() }),
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          botReply = aiData.reply;
        }
      } catch (e) {
        console.warn('Error llamando /api/assistant:', e);
      }

      if (!botReply) {
        botReply = '¡Hola! En WEKE Studio contamos con chaquetas y parkas técnicas de 3 capas impermeables con despacho gratis sobre $100.000 CLP. ¿Te gustaría asesoría en tallas?';
      }

      // Guardar respuesta del bot en Supabase
      await admin.from('crm_whatsapp_messages').insert([
        {
          id: crypto.randomUUID(),
          chat_id: chatId,
          sender_type: 'bot',
          message_type: 'text',
          content: botReply,
        },
      ]);
    }

    // Actualizar interacción
    await admin
      .from('crm_whatsapp_chats')
      .update({ last_interaction: new Date().toISOString() })
      .eq('id', chatId);

    // Devolver lista actualizada de mensajes
    const { data: updatedMsgs } = await admin
      .from('crm_whatsapp_messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    return { success: true, messages: updatedMsgs || [], botReply };
  } catch (err: any) {
    console.error('Error en simulateCustomerMessageAction:', err);
    return { success: false, error: err.message };
  }
}

// ── 8. Enviar Plantilla Oficial de Meta para Asistencia Humana ───────────────
export async function triggerHumanHandoffTemplateAction(chatId: string, reason?: string) {
  const admin = getAdminClient();
  if (!admin) return { success: false, error: 'Sin conexión a Supabase' };

  try {
    const { data: chat } = await admin
      .from('crm_whatsapp_chats')
      .select('phone_number')
      .eq('id', chatId)
      .single();

    if (!chat) return { success: false, error: 'Chat no encontrado' };

    const { sendHumanHandoffMetaTemplate } = await import('@/lib/whatsapp/meta-templates');
    const result = await sendHumanHandoffMetaTemplate({
      chatId,
      customerPhone: chat.phone_number,
      customerName: 'Estimado/a cliente',
      reason: reason || 'su consulta técnica o de compra',
    });

    const msgs = await getWhatsAppMessagesAction(chatId);
    return { success: true, mode: result.mode, messages: msgs };
  } catch (err: any) {
    console.error('Error enviando plantilla en triggerHumanHandoffTemplateAction:', err);
    return { success: false, error: err.message };
  }
}

// ── 9. Enviar Cualquier Plantilla Oficial de Meta Cloud API ──────────────────
export async function sendOfficialMetaTemplateAction(params: {
  chatId: string;
  templateKey: string;
  variables: string[];
}) {
  const { chatId, templateKey, variables } = params;
  const admin = getAdminClient();
  if (!admin) return { success: false, error: 'Sin conexión a Supabase' };

  try {
    const { data: chat } = await admin
      .from('crm_whatsapp_chats')
      .select('phone_number')
      .eq('id', chatId)
      .single();

    if (!chat) return { success: false, error: 'Chat no encontrado' };

    const { sendOfficialMetaTemplate } = await import('@/lib/whatsapp/meta-templates');
    const result = await sendOfficialMetaTemplate({
      templateKey: templateKey as any,
      recipientPhone: chat.phone_number,
      variables,
      chatId,
    });

    const msgs = await getWhatsAppMessagesAction(chatId);
    return { success: true, mode: result.mode, templateName: result.templateName, messages: msgs };
  } catch (err: any) {
    console.error('Error enviando plantilla Meta en sendOfficialMetaTemplateAction:', err);
    return { success: false, error: err.message };
  }
}


