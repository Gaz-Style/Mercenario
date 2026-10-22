'use server';

import { createClient as createAdminClient } from '@supabase/supabase-js';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createAdminClient(url, key);
}

// ── 1. Obtener Lista de Chats ───────────────────────────────────────────────
export async function getWhatsAppChatsAction(): Promise<any[]> {
  const admin = getAdminClient();
  if (!admin) return [];

  try {
    const { data: dbChats, error } = await admin
      .from('crm_whatsapp_chats')
      .select('*')
      .order('last_interaction', { ascending: false });

    if (error || !dbChats) return [];

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
        last_message: lastMsg?.content || 'Conversación iniciada',
        last_message_at: chat.last_interaction || chat.created_at || new Date().toISOString(),
        customers: {
          id: chat.customer_id || chat.id,
          full_name: chat.context?.customer_name || fallbackName,
          phone: phone,
          email: chat.context?.customer_email || 'Sin correo registrado',
          city: chat.context?.city || 'Santiago, Chile',
          total_orders: chat.context?.orders_count || 1,
          total_spent: chat.context?.total_spent || 89900,
          preferred_size: chat.context?.preferred_size || 'Talla L',
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

// ── 2. Obtener Historial de Mensajes de un Chat ──────────────────────────────
export async function getWhatsAppMessagesAction(chatId: string): Promise<any[]> {
  const admin = getAdminClient();
  if (!admin) return [];

  try {
    const { data: dbMsgs, error } = await admin
      .from('crm_whatsapp_messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    if (error) return [];
    return dbMsgs || [];
  } catch (err) {
    console.error('Error en getWhatsAppMessagesAction:', err);
    return [];
  }
}

// ── 3. Enviar Mensaje desde el Panel (Operador Humano) ───────────────────────
export async function sendWhatsAppMessageAction(chatId: string, content: string) {
  const admin = getAdminClient();
  if (!admin) return { success: false, error: 'Sin conexión a Supabase' };

  try {
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
      return { success: false, error: insertErr.message };
    }

    await admin
      .from('crm_whatsapp_chats')
      .update({
        session_status: 'human_handoff',
        last_interaction: new Date().toISOString(),
      })
      .eq('id', chatId);

    // Si están configuradas las credenciales de Meta API
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
        }).catch(() => {});
      }
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ── 4. Toggle Bot (IA vs Control Humano) ─────────────────────────────────────
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
    return { success: false };
  }
}

// ── 5. Iniciar o Crear Nuevo Chat ───────────────────────────────────────────
export async function createOrStartChatAction(phone: string) {
  const admin = getAdminClient();
  if (!admin) return { success: false, error: 'Sin conexión a Supabase' };

  const cleanDigits = phone.replace(/\D/g, '');
  const formattedPhone = cleanDigits.startsWith('56') ? `+${cleanDigits}` : `+56${cleanDigits}`;

  try {
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
            customer_name: `Cliente ${formattedPhone.slice(-4)}`,
            city: 'Santiago, Chile',
          },
        },
      ])
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    await admin.from('crm_whatsapp_messages').insert([
      {
        id: crypto.randomUUID(),
        chat_id: newChatId,
        sender_type: 'bot',
        message_type: 'text',
        content: '¡Hola! Bienvenido a WEKE Studio. Soy tu asistente virtual oficial. ¿En qué prenda o consulta podemos ayudarte hoy?',
      },
    ]);

    return { success: true, chat: created };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// ── 6. Simular Mensaje de Cliente y Respuesta Inmediata del Asistente ───────
export async function simulateCustomerMessageAction(chatId: string, customerMessage: string) {
  const admin = getAdminClient();
  if (!admin) return { success: false, error: 'Sin conexión a Supabase' };

  try {
    // 1. Insertar mensaje como cliente
    await admin.from('crm_whatsapp_messages').insert([
      {
        id: crypto.randomUUID(),
        chat_id: chatId,
        sender_type: 'customer',
        message_type: 'text',
        content: customerMessage.trim(),
      },
    ]);

    // 2. Verificar estado del chat
    const { data: chat } = await admin
      .from('crm_whatsapp_chats')
      .select('session_status, vertical')
      .eq('id', chatId)
      .single();

    // 3. Si la sesión está en modo 'bot', generar respuesta inteligente con el motor RAC
    if (chat?.session_status === 'bot') {
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      const targetVertical = chat.vertical === 'b2b' ? 'mercenario' : 'weke';
      let botReply = '';

      try {
        const aiRes = await fetch(`${baseUrl}/api/assistant`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: customerMessage.trim(), vertical: targetVertical }),
        });

        if (aiRes.ok) {
          const aiData = await aiRes.json();
          botReply = aiData.reply;
        }
      } catch (e) {
        console.warn('Error llamando /api/assistant:', e);
      }

      if (!botReply) {
        botReply = targetVertical === 'mercenario'
          ? 'Hola. En Mercenario conectamos la operación completa de su empresa en 14 días. ¿Qué proceso desea automatizar?'
          : 'Estimado/a cliente, en WEKE confeccionamos indumentaria técnica sustentable e inclusiva. ¿En qué podemos orientarle hoy?';
      }

      // Guardar respuesta del bot
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

    // 4. Actualizar timestamp de interacción
    await admin
      .from('crm_whatsapp_chats')
      .update({ last_interaction: new Date().toISOString() })
      .eq('id', chatId);

    // 5. Retornar mensajes actualizados
    const { data: updatedMsgs } = await admin
      .from('crm_whatsapp_messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', { ascending: true });

    return { success: true, messages: updatedMsgs || [] };
  } catch (err: any) {
    console.error('Error en simulateCustomerMessageAction:', err);
    return { success: false, error: err.message };
  }
}

