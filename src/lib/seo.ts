'use server';

export const defaultSEO = {
    title: 'Mercenario OS — Sistema Operativo B2B para Empresas',
    description: 'La plataforma SaaS que centraliza CRM, ERP, POS, BI y automatización con IA para escalar tu operación comercial.',
    url: 'https://mercenario.io',
    image: '/og-image.png',
};

export function generateStructuredData() {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Mercenario OS",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "description": defaultSEO.description,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "CLP"
        },
        "creator": {
            "@type": "Organization",
            "name": "Mercenario",
            "url": "https://mercenario.io"
        }
    });
}
