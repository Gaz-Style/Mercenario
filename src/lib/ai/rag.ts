import { WEKE_KNOWLEDGE_CORPUS, KnowledgeChunk } from './weke-knowledge-base';
import { MERCENARIO_KNOWLEDGE_CORPUS, MercenarioKnowledgeChunk } from './mercenario-knowledge-base';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Normalizar texto para búsqueda fonética/lexical en español (quitar tildes, símbolos)
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .trim();
}

export type BotVertical = 'weke' | 'mercenario';

export interface RACRetrievalResult {
  context: string;
  matchedChunks: (KnowledgeChunk | MercenarioKnowledgeChunk)[];
  categories: string[];
  vertical: BotVertical;
}

/**
 * Clasificador inteligente de intención / vertical
 * Detecta si el usuario está consultando sobre WEKE (moda, ropa técnica, montaña)
 * o sobre MERCENARIO (sistemas B2B, software, clínicas, automatización, Webpay).
 */
export function detectVertical(query: string, explicitHint?: string): BotVertical {
  if (explicitHint === 'mercenario' || explicitHint === 'b2b' || explicitHint === 'growth360' || explicitHint === 'salud') {
    return 'mercenario';
  }
  if (explicitHint === 'weke' || explicitHint === 'retail' || explicitHint === 'moda') {
    return 'weke';
  }

  const normalized = normalizeText(query);

  // Palabras clave inequívocas de Mercenario / Sistemas B2B
  const mercenarioTriggers = [
    'mercenario', 'growth', 'growth360', 'sistema', 'sistemas', 'software',
    'llave en mano', 'clinica', 'medico', 'estetica', 'dental', 'agenda',
    'agendamiento', 'horas', 'box', 'no show', 'inasistencia', 'b2b',
    'cotizacion', 'cotizador', 'crm', 'erp', 'api', 'webpay', 'pos mostrador',
    'facturacion', 'sii', 'cuanto vale implementar', 'precio del sistema',
    'automatizacion', 'automatizacion operativa', 'operativa', 'operacion', 'empresa', 'diagnostico operativo', 'reunion tecnica'
  ];

  // Palabras clave inequívocas de WEKE / Moda & Ropa Técnica
  const wekeTriggers = [
    'weke', 'chaqueta', 'parka', 'pantalon', 'poleron', 'polar', 'talla',
    'calce', 'estatura', 'peso', 'outdoor', 'trekking', 'montana', 'guanaco',
    'vidalina', 'taller', 'gredos', 'las condes', 'cero residuo', 'upcycling',
    'carpa', 'inclusiv', 'adaptad', 'despacho', 'envio', 'comunidad', 'boletin'
  ];

  const mercenarioScore = mercenarioTriggers.filter(kw => normalized.includes(kw)).length;
  const wekeScore = wekeTriggers.filter(kw => normalized.includes(kw)).length;

  // Si hay más palabras de WEKE, asignar WEKE
  if (wekeScore > mercenarioScore) return 'weke';
  if (mercenarioScore > wekeScore) return 'mercenario';

  // Si contiene mención expresa de WEKE
  if (normalized.includes('weke')) return 'weke';

  // Por defecto, Mercenario es el sistema operativo B2B principal
  return 'mercenario';
}

/**
 * Motor RAC (Retrieval-Augmented Context / RAG) Multi-Vertical.
 * Recupera dinámicamente el contexto según la vertical detectada (WEKE vs MERCENARIO).
 */
export async function retrieveContext(
  query: string,
  topK: number = 3,
  verticalHint?: string
): Promise<RACRetrievalResult> {
  if (!query || typeof query !== 'string' || !query.trim()) {
    return {
      context: '',
      matchedChunks: [],
      categories: [],
      vertical: 'weke',
    };
  }

  const vertical = detectVertical(query, verticalHint);
  const normalizedQuery = normalizeText(query);
  const queryTokens = normalizedQuery.split(/\s+/).filter((t) => t.length > 2);

  // ── CASO A: VERTICAL MERCENARIO (Sistemas B2B, Software, Clínicas, Growth 360) ──
  if (vertical === 'mercenario') {
    const scoredChunks = MERCENARIO_KNOWLEDGE_CORPUS.map((chunk) => {
      let score = 0;
      const normalizedTitle = normalizeText(chunk.title);
      const normalizedContent = normalizeText(chunk.content);
      const normalizedKeywords = (chunk.keywords || []).map(normalizeText);

      if (normalizedContent.includes(normalizedQuery)) score += 30;
      if (normalizedTitle.includes(normalizedQuery)) score += 40;

      for (const token of queryTokens) {
        if (normalizedTitle.includes(token)) score += 8;
        if (normalizedKeywords.some((kw) => kw.includes(token) || token.includes(kw))) score += 6;
        if (normalizedContent.includes(token)) score += 3;
      }

      // Boosting temático
      if ((normalizedQuery.includes('clinica') || normalizedQuery.includes('agenda') || normalizedQuery.includes('inasistencia')) && chunk.id === 'mercenario-03-clinica-salud-360') {
        score += 35;
      }
      if ((normalizedQuery.includes('ecommerce') || normalizedQuery.includes('tienda') || normalizedQuery.includes('pos')) && chunk.id === 'mercenario-02-ecommerce-360') {
        score += 35;
      }
      if ((normalizedQuery.includes('b2b') || normalizedQuery.includes('cotiz') || normalizedQuery.includes('servicio')) && chunk.id === 'mercenario-04-servicios-b2b-360') {
        score += 35;
      }
      if ((normalizedQuery.includes('precio') || normalizedQuery.includes('costo') || normalizedQuery.includes('cuanto') || normalizedQuery.includes('tiempo') || normalizedQuery.includes('dia')) && chunk.id === 'mercenario-05-tiempos-precios') {
        score += 35;
      }

      return { chunk, score };
    });

    const topMatches = scoredChunks
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map((item) => item.chunk);

    const finalMatches = topMatches.length > 0 ? topMatches : MERCENARIO_KNOWLEDGE_CORPUS.slice(0, 2);

    const formattedContext = finalMatches
      .map((c, idx) => `[DOCUMENTO B2B ${idx + 1}: ${c.title}]\n${c.content}`)
      .join('\n\n');

    return {
      context: formattedContext,
      matchedChunks: finalMatches,
      categories: Array.from(new Set(finalMatches.map((c) => c.category))),
      vertical: 'mercenario',
    };
  }

  // ── CASO B: VERTICAL WEKE (Moda, Outdoor, Sostenibilidad, Catálogo) ──────────
  let dbChunks: KnowledgeChunk[] = [];
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      const supabase = createSupabaseClient(url, key);
      const { data, error } = await supabase
        .from('bot_knowledge_base')
        .select('*')
        .limit(20);

      if (!error && Array.isArray(data) && data.length > 0) {
        dbChunks = data.map((d: any) => ({
          id: d.id,
          category: d.category,
          title: d.title || d.category,
          keywords: d.keywords || [],
          content: d.content,
          metadata: d.metadata || {},
        }));
      }
    }
  } catch (err) {
    // Fallback a memoria
  }

  const allChunks = [...WEKE_KNOWLEDGE_CORPUS];
  for (const dbChunk of dbChunks) {
    if (!allChunks.some((c) => c.id === dbChunk.id)) {
      allChunks.push(dbChunk);
    }
  }

  const scoredChunks = allChunks.map((chunk) => {
    let score = 0;
    const normalizedTitle = normalizeText(chunk.title);
    const normalizedContent = normalizeText(chunk.content);
    const normalizedKeywords = (chunk.keywords || []).map(normalizeText);

    if (normalizedContent.includes(normalizedQuery)) score += 30;
    if (normalizedTitle.includes(normalizedQuery)) score += 40;

    for (const token of queryTokens) {
      if (normalizedTitle.includes(token)) score += 8;
      if (normalizedKeywords.some((kw) => kw.includes(token) || token.includes(kw))) score += 6;
      if (normalizedContent.includes(token)) score += 3;
    }

    if ((normalizedQuery.includes('nombre') || normalizedQuery.includes('significa') || normalizedQuery.includes('origen')) && chunk.category === 'origen_nombre') {
      score += 25;
    }
    if ((normalizedQuery.includes('inclusiv') || normalizedQuery.includes('adaptad') || normalizedQuery.includes('discapacidad')) && chunk.category === 'inclusivo') {
      score += 25;
    }
    if ((normalizedQuery.includes('sustentab') || normalizedQuery.includes('recicla') || normalizedQuery.includes('cero residuo')) && chunk.category === 'sustentabilidad') {
      score += 25;
    }
    if ((normalizedQuery.includes('capa') || normalizedQuery.includes('primera') || normalizedQuery.includes('segunda') || normalizedQuery.includes('tercera') || normalizedQuery.includes('chaqueta')) && chunk.category === 'sistema_capas') {
      score += 25;
    }

    return { chunk, score };
  });

  const topMatches = scoredChunks
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((item) => item.chunk);

  const finalMatches = topMatches.length > 0 ? topMatches : WEKE_KNOWLEDGE_CORPUS.slice(0, 2);

  const formattedContext = finalMatches
    .map((c, idx) => `[DOCUMENTO WEKE ${idx + 1}: ${c.title}]\n${c.content}`)
    .join('\n\n');

  return {
    context: formattedContext,
    matchedChunks: finalMatches,
    categories: Array.from(new Set(finalMatches.map((c) => c.category))),
    vertical: 'weke',
  };
}
