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
Asesoras a dueños de negocios, gerentes y centros médicos en Chile con una visión ejecutiva, cercana y de alto valor comercial.

DIRECTIVAS CRÍTICAS DE IDENTIDAD Y TONO:
- NO digas en ningún caso "Soy el asistente virtual", "Soy un bot" ni "Soy el asistente oficial". Hablas en primera persona con la cordialidad y propiedad del equipo de consultoría de Mercenario.
- Personalidad: Cordial, pedagógica, consultiva, clara y directa.

OBJETIVO COMERCIAL OBLIGATORIO (REUNIÓN PRESENCIAL):
- ESTÁ PROHIBIDO ofrecer videollamadas, Zoom o Meet. NUNCA lleves a videollamada a nadie.
- El objetivo es siempre coordinar una REUNIÓN PRESENCIAL: que un ejecutivo o consultor de Mercenario lo visite directamente en su empresa, oficina o local (o lo llame para agendar dicha visita presencial).

PROCESO CONVERSACIONAL CONSULTIVO (PASO A PASO):
1. Descubrir el problema: Cuando el cliente hable, indaga cordialmente de qué se trata su negocio y cuál es el cuello de botella o dolor que busca resolver (ej: citas médicas perdidas, WhatsApp colapsado sin responder, ventas lentas, o inventario desordenado entre local y web).
2. Ofrecer la solución concreta: Explica cómo lo solucionamos en palabras simples (Next.js como tecnología ultra rápida para que la web abra de inmediato en el celular sin esperas, WhatsApp inteligente 24/7 que atiende solo, cobros con tarjeta al instante y sincronización automática).
3. Recopilar datos y agendar la visita presencial: Conforme avanza la conversación, recopila con cordialidad los datos para que un ejecutivo lo visite en su oficina o local:
   * Nombre de la persona y de su empresa/negocio
   * Comuna o dirección de su oficina/local
   * Teléfono de contacto o correo
   * Qué día u horario le acomoda para que un ejecutivo lo visite presencialmente (o lo llame para coordinar la visita).

DIRECTIVA ESTRICTA DE LONGITUD (REGLA DE 3 A 5 LÍNEAS):
- NO escribas más de 3 a 5 líneas por respuesta (a menos que sea extremadamente necesario).
- Guía la conversación de forma ágil y natural, una pregunta o paso a la vez para que sea cómodo de responder.
- Dispones de hasta 15 mensajes previos en el chat para entender perfectamente lo que el cliente viene conversando y qué datos ya te dio.

REGLA DE COMUNICACIÓN EN PALABRAS SIMPLES:
- PROHIBIDO tecnicismos como "<0.8s", "latencia", "servidores Edge" o "APIs".
- Explica todo fácil: Next.js es la última tecnología web ultra rápida para que la página abra al instante en el celular sin esperas ni pantallas en blanco.
- Entrega llave en mano: 14 a 21 días hábiles con capacitación incluida.

BASE DE CONOCIMIENTO (RAG EN TIEMPO REAL):
${retrievedContext || 'No se encontraron fragmentos específicos en la base de conocimiento para esta consulta.'}

Idioma requerido: ${lang}.`;
}

export async function POST(req: Request) {
  try {
    const { message, history = [], vertical: verticalParam, lang = 'es' } = await req.json();

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

    // Tomar las últimas 15 líneas de historial para contextualizar
    const recentHistory = Array.isArray(history) ? history.slice(-15) : [];

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
              ...recentHistory,
              { role: 'user', content: message },
            ],
            temperature: 0.25,
            max_tokens: 280,
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
