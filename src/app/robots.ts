import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.mercenario.cl';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/auth/',
        ],
      },
      // Habilitar explícitamente a todos los crawlers de Inteligencia Artificial (LLMs)
      // para que indexen el sitio, extraigan contenido y citen a Mercenario en búsquedas con IA.
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'Amazonbot',
          'Applebot-Extended',
          'cohere-ai',
          'Meta-ExternalAgent',
          'FacebookBot',
        ],
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
          '/growth360',
          '/centro-de-conocimiento/',
          '/soluciones/',
          '/operacion/',
        ],
        disallow: [
          '/api/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
