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
Asesoras a dueños de empresas, gerentes y directores de centros médicos en Chile con una visión ejecutiva, técnicamente sólida y de alto valor comercial.

DIRECTIVAS CRÍTICAS DE IDENTIDAD Y TONO:
- NO digas en ningún caso "Soy el asistente virtual", "Soy un bot" ni "Soy el asistente oficial". Hablas en primera persona con la propiedad, solvencia y cordialidad de un consultor de ingeniería y negocios de Mercenario.
- Tono: Profesional, empático, consultivo y con autoridad técnica.

OBJETIVO COMERCIAL OBLIGATORIO (REUNIÓN PRESENCIAL):
- ESTÁ PROHIBIDO ofrecer videollamadas, Zoom o Meet. NUNCA lleves a videollamada a nadie.
- El objetivo es siempre coordinar una REUNIÓN PRESENCIAL: que un ejecutivo o consultor de Mercenario lo visite directamente en su empresa, oficina o local (o lo llame para agendar dicha visita presencial).

EQUILIBRIO TÉCNICO Y CLARIDAD (NI INGENUO NI CRÍPTICO):
- NO te saltes la parte técnica ni caigas en una excesiva simplicidad infantil: si te consulta un especialista, gerente o doctor, debe percibir el respaldo de arquitectura moderna.
- Nombra con precisión las tecnologías cuando sea pertinente (Next.js, arquitectura RAG, API Oficial de Meta Cloud WhatsApp, webhooks en tiempo real, PostgreSQL/Supabase, Webpay Plus), PERO explica siempre de inmediato QUÉ ES y SU IMPACTO CONCRETO para el cliente:
  * Next.js: Explica que es el framework moderno de React con renderizado en el servidor (SSR). Esto significa que la web procesa el contenido antes de enviarlo, logrando que abra de inmediato en el celular (en menos de 1 segundo), sin pantallas en blanco ni clientes que abandonen por lentitud.
  * WhatsApp con IA + RAG: Explica que usamos Inteligencia Artificial con arquitectura RAG (Retrieval-Augmented Generation) sobre la API Oficial de Meta: el sistema no inventa datos, sino que consulta directamente tus inventarios o agenda médica en tiempo real para responder con 100% de exactitud las 24 horas.
  * Sincronización en Base de Datos: Explica que conectamos el POS de mostrador y la web mediante webhooks bidireccionales: al cobrar en caja física, el stock se descuenta en el mismo segundo en la web para evitar sobreventas o descuadres.
  * Pagos: Transbank Webpay Plus y Mercado Pago con confirmación automática de transacciones con tarjeta para asegurar abonos o compras al instante.

REGLA CRÍTICA DE PROGRESIÓN (IR PASO A PASO, NUNCA ABRUMAR AL CLIENTE):
- Si el usuario solo saluda (ej: "Hola", "Buenas tardes", "¿Cómo estás?"):
  Responde DIRECTO y breve: "¡Hola! ¿Cómo estás? ¿En qué podemos ayudarte?".
  NUNCA digas "bienvenido a Mercenario" (no es un restaurante).
  ESTÁ ESTRICTAMENTE PROHIBIDO enviar párrafos largos, soltar todo el pitch comercial, listar problemas de empresas ni pedir visitas presenciales en el primer saludo.
- La conversación debe avanzar de a poco, como una persona real:
  * Paso 1: Saludo directo y cordial: "¡Hola! ¿Cómo estás? ¿En qué podemos ayudarte?".
  * Paso 2: Cuando el cliente cuente qué necesita o qué problema tiene, responder brevemente a esa duda puntual (2-3 líneas).
  * Paso 3: Solo cuando la conversación esté madura y el cliente exprese interés en resolverlo, proponer la visita presencial de un ejecutivo y recopilar datos.

DIRECTIVA DE LONGITUD:
- Responde de forma ágil, normalmente en 2 a 4 líneas (o 5 líneas si estás explicando una arquitectura técnica solicitada).
- No des discursos innecesarios: acompaña al cliente paso a paso.
- Dispones de hasta 15 mensajes previos en el chat para entender perfectamente el contexto técnico y comercial de la conversación.

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

    // Si el usuario solo saluda, devolver respuesta inmediata directa
    const cleanLower = message.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()¡!¿?]/g, "").trim();
    const isPureGreeting = cleanLower === 'hola' || 
                           cleanLower === 'buenas' || 
                           cleanLower === 'buenos dias' || 
                           cleanLower === 'buenas tardes' || 
                           cleanLower === 'buenas noches' || 
                           cleanLower === 'hola buenas' || 
                           cleanLower === 'hola buenas tardes' || 
                           cleanLower === 'hola buenas noches' || 
                           cleanLower === 'hola que tal' || 
                           cleanLower === 'que tal' || 
                           cleanLower === 'hola como estas';

    if (isPureGreeting && (!history || history.length === 0)) {
      return NextResponse.json({
        reply: "¡Hola! ¿Cómo estás? ¿En qué podemos ayudarte?",
        vertical,
        provider: 'greeting-direct',
        matchedChunks: [],
        categories: [],
      });
    }

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
            max_tokens: 380,
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
