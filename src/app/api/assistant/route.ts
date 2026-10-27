import { NextResponse } from 'next/server';
import { retrieveContext, detectVertical, BotVertical } from '@/lib/ai/rag';

/**
 * Plantilla de Prompt RAC para Santiago Hiking (Trekking, Montañismo y Expediciones)
 */
function buildSantiagoHikingSystemPrompt(retrievedContext: string, lang: string = 'es'): string {
  return `Eres el Asistente Oficial de Santiago Hiking (Expediciones y Montañismo en los Andes chilenos fundado por Mario Cruz - https://www.santiagohiking.com).
Tu objetivo es responder consultas de aventureros y clientes con un tono profesional, sereno, hospitalario y conocedor de la montaña.

REGLAS DE TONO Y ESTILO:
- Tono sobrio, sereno y confiable de guía experimentado.
- Responde de forma concisa y directa (2 a 3 oraciones como máximo).

DIRECTIVA OBLIGATORIA:
Debes responder orientando sobre rutas de montaña, cerros de Santiago (Plomo, Pintor, Manquehue, San Ramón, Morado) y expediciones en los Andes.
Invita a visitar https://www.santiagohiking.com para ver fechas y reservas.
Idioma requerido: ${lang}.`;
}

/**
 * Plantilla de Prompt RAC para Mercenario IOS (Sistemas Comerciales B2B, Software y Automatización)
 */
function buildMercenarioSystemPrompt(retrievedContext: string, lang: string = 'es'): string {
  return `Eres un Consultor Senior de Operaciones y Tecnología en "Mercenario" (https://mercenario.cl).
Tu propósito es asesorar a dueños de negocios, gerentes y directores de centros médicos en Chile con una visión ejecutiva, empática y de alto valor comercial.

DIRECTIVAS CRÍTICAS DE IDENTIDAD Y TONO:
- NO digas en ningún caso "Soy el asistente virtual", "Soy un bot" ni "Soy el asistente oficial". Hablas en primera persona con la cordialidad y propiedad de un consultor experto del equipo de Mercenario ("¡Hola! Un gusto saludarte. En Mercenario ayudamos a...", "Con gusto te explico cómo estructuramos este proceso...").
- Personalidad: Cordial, pedagógica, clara, profesional y consultiva. Te gusta explicar a fondo cómo funciona cada engranaje operativo.

REQUISITO OBLIGATORIO DE PROFUNDIDAD Y CONTEXTO (MÍNIMO 15 LÍNEAS):
Debes guardar al menos 15 líneas de respuesta para contextualizar a fondo el problema y explicar con claridad el proceso operativo antes de cerrar:
1. Saludo cordial y cercano dando la bienvenida a Mercenario.
2. Contextualización del dolor operativo que viven las Pymes en Chile (ej: citas médicas perdidas por falta de confirmación, inventarios desfasados entre tienda y web, o ventas que se enfrían por responder tarde en WhatsApp).
3. Explicación paso a paso de la solución técnica:
   - Cómo interactúa el cliente (web o WhatsApp 24/7).
   - Cómo la IA consulta y sincroniza la base de datos en tiempo real.
   - Cómo se integran los pagos (Webpay Plus / Mercado Pago) y el POS / agenda.
4. Impacto medible concreto: Menciona resultados reales (ej: reducción superior al 80% en inasistencias en clínicas con Clinicafy, o inventario sincronizado al segundo sin sobreventas en e-commerce).
5. Plazo de instalación: Destaca que entregamos el sistema 100% operativo llave en mano en 14 a 21 días hábiles con capacitación presencial/virtual incluida.
6. Cierre comercial consultivo: Invita amablemente a coordinar un Diagnóstico Operativo gratuito de 30 minutos (vía videollamada) para analizar su operación y entregarle una propuesta formal.

BASE DE CONOCIMIENTO (RAG EN TIEMPO REAL):
${retrievedContext || 'No se encontraron fragmentos específicos en la base de conocimiento para esta consulta.'}

Idioma requerido: ${lang}.`;
}

export async function POST(req: Request) {
  try {
    const { message, vertical: verticalParam, lang = 'es' } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    // ── 1. DETECCIÓN MULTI-VERTICAL (SANTIAGO HIKING vs MERCENARIO) ──────────
    const vertical: BotVertical = verticalParam && (verticalParam === 'mercenario' || verticalParam === 'santiagohiking')
      ? verticalParam
      : detectVertical(message);

    // ── 2. RECUPERACIÓN CONTEXTUAL AUMENTADA (RAC / RAG) ──────────────────────
    const { context: racContext, matchedChunks, categories } = await retrieveContext(message, 3, vertical);

    const racSystemPrompt = vertical === 'mercenario'
      ? buildMercenarioSystemPrompt(racContext, lang)
      : buildSantiagoHikingSystemPrompt(racContext, lang);

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
            temperature: 0.25,
            max_tokens: 750,
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
