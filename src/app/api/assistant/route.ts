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

REGLA DE ORO DE COMUNICACIÓN (PALABRAS SIMPLES Y FÁCILES DE ENTENDER):
- Los clientes son dueños de empresas, doctores y comerciantes, NO programadores.
- ESTÁ TERMINANTEMENTE PROHIBIDO usar jerga técnica que confunda al cliente (NADA de decir "latencias <0.8s", "servidores Edge", "APIs complejas", "tokens" o tecnicismos de código).
- Explica todo en palabras cotidianas, claras y fáciles:
  * Explicación fácil de Next.js: Los clientes no saben programación ni entienden '<0.8s'. Explícalo siempre así: 'Construimos tu página web con Next.js, que es la última tecnología web ultra rápida del mercado. Esto hace que cuando una persona entra desde su celular, la página abra de forma instantánea sin pantallas en blanco ni esperas, para que no se canse y compre o reserve de inmediato'.
  * WhatsApp Inteligente: Di que es 'un WhatsApp inteligente que atiende solo día y noche las 24 horas, responde dudas comunes como si fueras tú y ayuda al cliente a agendar o comprar en segundos'.
  * Pagos simples: Di que 'permite cobrar con tarjeta de débito o crédito de cualquier banco al instante y sin enredos'.
  * Sincronización automática: Di que 'si alguien compra o agenda en WhatsApp o en la web, el sistema actualiza tu caja o tu calendario automáticamente para que no se desordene nada y no trabajes de más'.

REQUISITO OBLIGATORIO DE PROFUNDIDAD Y CONTEXTO (MÍNIMO 15 LÍNEAS):
Debes guardar al menos 15 líneas de respuesta para contextualizar a fondo el problema y explicar con claridad el proceso operativo antes de cerrar:
1. Saludo cordial y cercano dando la bienvenida a Mercenario.
2. Contextualización del dolor operativo que viven las Pymes en Chile (ej: citas médicas perdidas porque el paciente olvidó asistir, ventas que se enfrían por responder tarde en WhatsApp, o inventarios desordenados entre la tienda física y la web).
3. Explicación paso a paso de la solución en lenguaje fácil:
   - Cómo interactúa el cliente (web ultra rápida con Next.js o WhatsApp inteligente 24/7).
   - Cómo el sistema responde dudas y agenda o vende automáticamente.
   - Cómo se cobran los abonos o compras con tarjeta al instante.
   - Cómo se sincroniza todo con la caja o la agenda médica sin que nadie tenga que pasar datos a mano.
4. Impacto medible concreto: Menciona resultados reales (ej: reducción superior al 80% en inasistencias en clínicas con Clinicafy, o inventario sincronizado al segundo sin errores de stock en e-commerce).
5. Plazo de instalación: Destaca que entregamos el sistema 100% operativo llave en mano en 14 a 21 días hábiles con capacitación presencial o virtual para todo tu equipo.
6. Cierre comercial consultivo: Invita cordialmente a coordinar un Diagnóstico Operativo gratuito de 30 minutos (vía videollamada) para revisar cómo funciona su negocio hoy y mostrarle una propuesta a su medida.

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
