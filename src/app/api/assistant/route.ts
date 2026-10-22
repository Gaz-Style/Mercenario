import { NextResponse } from 'next/server';
import { retrieveContext, detectVertical, BotVertical } from '@/lib/ai/rag';

/**
 * Plantilla de Prompt RAC para WEKE Studio (Moda, Outdoor & Sostenibilidad)
 */
function buildWekeSystemPrompt(retrievedContext: string, lang: string = 'es'): string {
  return `Eres el Asistente Virtual Oficial de WEKE (Ropa Técnica Sustentable e Inclusiva, fundada en 1985 en Chile).
Tu objetivo es responder consultas de clientes y expedicionarios con tono profesional, formal, sobrio y neutro.

REGLAS DE TONO Y ESTILO:
- Tono estrictamente neutro, respetuoso y profesional de atención al cliente.
- Prohibido utilizar expresiones coloquiales como "compañero", "compañero de ruta", "amigo" o modismos informales.
- Trata al usuario de manera cortés y sobria ("Estimado/a", "Hola", "Por supuesto", "Le comento que...").
- Responde de forma concisa y directa (2 a 3 oraciones como máximo).

DIRECTIVA RAC OBLIGATORIA:
Debes responder basándote EXCLUSIVAMENTE en el siguiente contexto recuperado de WEKE:

${retrievedContext || 'No se encontraron fragmentos específicos en la base de conocimiento para esta consulta.'}

PAUTAS ESPECÍFICAS DE WEKE:
1. Si consultan por el significado de la marca, menciona que WEKE significa "Guanaco" (símbolo andino de resistencia) y que operamos bajo filosofía Cero Residuo desde 1985.
2. Si consultan por tallas, solicita estatura y peso para orientar el calce adecuado (patronaje nacional chileno).
3. Si la información no está en el contexto, no inventes datos. Ofrece derivar la consulta con un asesor del taller en Gredos 7952, Las Condes.
4. Idioma requerido: ${lang}.`;
}

/**
 * Plantilla de Prompt RAC para Mercenario IOS (Sistemas Comerciales B2B, Software y Automatización)
 */
function buildMercenarioSystemPrompt(retrievedContext: string, lang: string = 'es'): string {
  return `Eres el Consultor y Asistente Virtual Oficial de Mercenario IOS (Sistemas Operativos Comerciales y Automatización para Pymes en Chile).
Tu objetivo es asesorar a dueños de negocio, directores y profesionales con un tono ejecutivo, directo, técnico y orientado a resultados comerciales.

REGLAS DE TONO Y ESTILO:
- Tono profesional, consultivo, seguro y formal B2B.
- Sin tecnicismos innecesarios; enfócate en el impacto de negocio: ahorro de tiempo, reducción de inasistencias y aumento de ventas 24/7.
- Respuestas directas, precisas y concisas (2 a 4 oraciones como máximo).

DIRECTIVA RAC OBLIGATORIA:
Debes responder basándote EXCLUSIVAMENTE en el siguiente contexto de Mercenario IOS:

${retrievedContext || 'No se encontraron fragmentos específicos en la base de conocimiento para esta consulta.'}

PAUTAS ESPECÍFICAS DE MERCENARIO:
1. Si consultan por soluciones, explica los Sistemas Llave en Mano:
   - E-Commerce 360 (Moda y Retail, probado en WEKE Studio: Web Next.js + WhatsApp IA + POS sincronizado).
   - Clínica & Salud 360 (Agenda online, recepcionista IA en WhatsApp y protocolo que reduce el no-show en más del 80%).
   - Servicios & B2B 360 (Web corporativa, calificador de prospectos IA y pipeline CRM).
2. Si consultan por plazos: La entrega e instalación es de 14 a 21 días hábiles llave en mano con capacitación incluida.
3. Si consultan por integraciones en Chile: Webpay Plus Transbank, Mercado Pago, Boleta Electrónica SII y Meta Cloud WhatsApp API Oficial.
4. Cierre comercial: Invita siempre al cliente a agendar un Diagnóstico Operativo gratuito de 30 minutos o escribir sus requerimientos para enviarle una propuesta formal.
5. Idioma requerido: ${lang}.`;
}

export async function POST(req: Request) {
  try {
    const { message, vertical: verticalParam, lang = 'es' } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    // ── 1. DETECCIÓN MULTI-VERTICAL (WEKE vs MERCENARIO) ─────────────────────
    const vertical: BotVertical = verticalParam && (verticalParam === 'mercenario' || verticalParam === 'weke')
      ? verticalParam
      : detectVertical(message);

    // ── 2. RECUPERACIÓN CONTEXTUAL AUMENTADA (RAC / RAG) ──────────────────────
    const { context: racContext, matchedChunks, categories } = await retrieveContext(message, 3, vertical);

    const racSystemPrompt = vertical === 'mercenario'
      ? buildMercenarioSystemPrompt(racContext, lang)
      : buildWekeSystemPrompt(racContext, lang);

    const deepseekKey = process.env.DEEPSEEK_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // ── 3. LLM VÍA DEEPSEEK + RAC ──────────────────────────────────────────
    if (deepseekKey) {
      try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${deepseekKey}`,
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: racSystemPrompt },
              { role: 'user', content: message },
            ],
            temperature: 0.2, // Temperatura baja para apego estricto a la base de conocimiento
            max_tokens: 350,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              vertical,
              provider: 'deepseek-rac',
              matchedChunks: matchedChunks.map((c) => ({ id: c.id, title: c.title, category: c.category })),
              categories,
            });
          }
        }
      } catch (deepseekErr) {
        console.warn('Fallo DeepSeek, intentando fallback de IA:', deepseekErr);
      }
    }

    // ── 4. FALLBACK OPENAI ──────────────────────────────────────────────────
    if (openAiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: racSystemPrompt },
              { role: 'user', content: message },
            ],
            temperature: 0.2,
            max_tokens: 350,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return NextResponse.json({
              reply,
              vertical,
              provider: 'openai-rac',
              matchedChunks: matchedChunks.map((c) => ({ id: c.id, title: c.title, category: c.category })),
              categories,
            });
          }
        }
      } catch (openAiErr) {
        console.warn('Fallo OpenAI fallback:', openAiErr);
      }
    }

    // ── 5. RESPUESTA RAC DIRECTA (Sin LLM externo) ──────────────────────────
    if (matchedChunks.length > 0) {
      if (vertical === 'mercenario') {
        const primary = matchedChunks[0];
        return NextResponse.json({
          reply: `Hola. En Mercenario IOS le informamos: ${primary.content} Si desea una propuesta formal o un diagnóstico de 30 minutos sin costo, puede indicarnos su empresa y requerimientos.`,
          vertical: 'mercenario',
          provider: 'rac-direct-knowledge',
          matchedChunks: matchedChunks.map((c) => ({ id: c.id, title: c.title, category: c.category })),
          categories,
        });
      } else {
        const primary = matchedChunks[0];
        return NextResponse.json({
          reply: `Estimado/a cliente, según nuestra base de conocimiento oficial de WEKE: ${primary.content} Si requiere mayor detalle, con gusto le derivamos con nuestro taller en Las Condes.`,
          vertical: 'weke',
          provider: 'rac-direct-knowledge',
          matchedChunks: matchedChunks.map((c) => ({ id: c.id, title: c.title, category: c.category })),
          categories,
        });
      }
    }

    // Fallback general neutro según vertical
    const defaultReply = vertical === 'mercenario'
      ? 'Hola. En Mercenario conectamos la operación completa de su empresa en 14 días (Web Next.js, WhatsApp IA, Pagos y POS). ¿Qué tipo de negocio tiene o qué proceso desea automatizar?'
      : 'Estimado/a cliente, en WEKE confeccionamos indumentaria técnica sustentable e inclusiva desde 1985. ¿En qué podemos orientarle hoy sobre prendas, tallas o despachos?';

    return NextResponse.json({
      reply: defaultReply,
      vertical,
      provider: 'fallback-neutro',
      matchedChunks: [],
      categories: [],
    });
  } catch (error: any) {
    console.error('Error en API Assistant RAC:', error);
    return NextResponse.json(
      { error: 'Error interno en el asistente virtual RAC', details: error?.message },
      { status: 500 }
    );
  }
}
