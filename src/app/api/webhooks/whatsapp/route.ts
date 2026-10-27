import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// 1. Verificación inicial de Webhook ante Meta (Handshake GET)
export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  const expectedToken = process.env.WHATSAPP_VERIFY_TOKEN || 'gazstyle_wa_verify_2026';

  if (mode === 'subscribe' && token === expectedToken) {
    console.log('✅ Webhook verificado exitosamente ante Meta Cloud API');
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

// 2. Procesamiento de Mensajes Entrantes de Clientes (POST)
export async function POST(req: Request) {
  try {
    const supabase = getSupabaseClient();
    const body = await req.json();

    if (body.object === 'whatsapp_business_account') {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          const value = change.value;
          const message = value.messages?.[0];

          if (!message) continue;

          const rawPhone = value.contacts?.[0]?.wa_id || message.from;
          const phoneNumber = rawPhone.startsWith('+') ? rawPhone : `+${rawPhone}`;
          const contactName = value.contacts?.[0]?.profile?.name || 'Cliente';
          const content = message.type === 'text' ? message.text.body : '[Archivo adjunto / multimedia]';

          // 1. Buscar o Crear la Conversación en Supabase
          let { data: chatData } = await supabase
            .from('crm_whatsapp_chats')
            .select('*')
            .eq('phone_number', phoneNumber)
            .maybeSingle();

          const initialVertical = 'general';

          if (!chatData) {
            const { data: newChat } = await supabase
              .from('crm_whatsapp_chats')
              .insert([
                {
                  phone_number: phoneNumber,
                  session_status: 'bot',
                  vertical: initialVertical,
                  last_interaction: new Date().toISOString(),
                  context: { customer_name: contactName },
                },
              ])
              .select()
              .single();

            chatData = newChat;
          } else if (chatData.vertical !== 'general') {
            chatData.vertical = 'general';
            await supabase.from('crm_whatsapp_chats').update({ vertical: 'general' }).eq('id', chatData.id);
          }

          if (chatData) {
            // 2. Insertar Mensaje del Cliente
            await supabase.from('crm_whatsapp_messages').insert([
              {
                chat_id: chatData.id,
                sender_type: 'customer',
                message_type: 'text',
                content,
              },
            ]);

            // 3. Si la sesión está en modo 'bot', generar respuesta automática con el motor RAC o derivar a humano
            if (chatData.session_status === 'bot') {
              const lowerContent = content.toLowerCase();
              const isHumanRequest = [
                'humano',
                'persona',
                'asesor',
                'operador',
                'ejecutivo',
                'hablar con alguien',
                'atencion humana',
                'ayuda humana',
              ].some((w) => lowerContent.includes(w));

              if (isHumanRequest) {
                // Derivación oficial con Plantilla Meta de Asistencia Humana
                try {
                  const { sendHumanHandoffMetaTemplate } = await import('@/lib/whatsapp/meta-templates');
                  await sendHumanHandoffMetaTemplate({
                    chatId: chatData.id,
                    customerPhone: phoneNumber,
                    customerName: 'Estimado/a cliente',
                    reason: content,
                  });

                  // Alerta al teléfono del operador / administrador si está configurado
                  const adminPhone = process.env.ADMIN_NOTIFICATION_PHONE;
                  const token = process.env.WHATSAPP_API_TOKEN;
                  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

                  if (adminPhone && token && phoneId) {
                    const cleanAdmin = adminPhone.replace(/\D/g, '');
                    const brandLabel = chatData.vertical === 'b2b' ? 'MERCENARIO B2B' : 'WEKE STUDIO';
                    await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        messaging_product: 'whatsapp',
                        to: cleanAdmin,
                        type: 'text',
                        text: {
                          body: `⚠️ ALERTA [${brandLabel}]: El cliente ${phoneNumber} ha solicitado asistencia humana.\nMensaje: "${content}"\nPanel Admin: https://mercenario.cl/admin/asistente`,
                        },
                      }),
                    });
                  }
                } catch (handoffErr) {
                  console.error('Error en derivación a humano:', handoffErr);
                }
              } else {
                // Flujo estándar RAC con enrutamiento de vertical (Mercenario vs WEKE)
                const token = process.env.WHATSAPP_API_TOKEN;
                const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

                if (token && phoneId) {
                  try {
                    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
                    const targetVertical = chatData.vertical === 'retail' ? 'weke' : 'mercenario';

                    const aiRes = await fetch(`${baseUrl}/api/assistant`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ message: content, vertical: targetVertical }),
                    });

                    let replyText = '';
                    if (aiRes.ok) {
                      const aiData = await aiRes.json();
                      replyText = aiData.reply;

                      // Si el detector identificó un cambio de vertical, sincronizar en el chat
                      if (aiData.vertical && (aiData.vertical === 'weke' ? 'retail' : 'general') !== chatData.vertical) {
                        const newVert = aiData.vertical === 'weke' ? 'retail' : 'general';
                        await supabase.from('crm_whatsapp_chats').update({ vertical: newVert }).eq('id', chatData.id);
                      }
                    }

                    if (!replyText) {
                      replyText = chatData.vertical === 'retail'
                        ? 'Estimado/a cliente, en WEKE confeccionamos indumentaria técnica sustentable e inclusiva. ¿En qué podemos orientarle hoy?'
                        : 'Hola. En Mercenario conectamos la operación comercial de su empresa (Web, WhatsApp IA, Pagos y POS). ¿Qué desafío busca automatizar?';
                    }

                    if (replyText) {
                      // Guardar respuesta de la IA en la BD
                      await supabase.from('crm_whatsapp_messages').insert([
                        {
                          chat_id: chatData.id,
                          sender_type: 'bot',
                          message_type: 'text',
                          content: replyText,
                        },
                      ]);

                      // Enviar respuesta por WhatsApp vía Meta Cloud API
                      const cleanPhone = phoneNumber.replace(/\D/g, '');
                      await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                          messaging_product: 'whatsapp',
                          to: cleanPhone,
                          type: 'text',
                          text: { body: replyText },
                        }),
                      });
                    }
                  } catch (aiErr) {
                    console.error('Error generando respuesta RAC en Webhook:', aiErr);
                  }
                }
              }
            }

            // Actualizar última interacción
            await supabase
              .from('crm_whatsapp_chats')
              .update({ last_interaction: new Date().toISOString() })
              .eq('id', chatData.id);
          }
        }
      }
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error: any) {
    console.error('Error en Webhook WhatsApp:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
