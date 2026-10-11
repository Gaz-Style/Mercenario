import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Growth 360 | Ecosistema Digital Todo en Uno - Ventas con IA en Chile",
  description: "Convierte visitas en ventas 24/7. Asistente IA en WhatsApp, sitio web Next.js ultra rápido, pagos automáticos Webpay/Mercado Pago, Meta CAPI y POS sincronizado para negocios en Chile.",
  keywords: [
    "growth 360",
    "asistente virtual whatsapp chile",
    "ia ventas whatsapp",
    "automatizacion pymes chile",
    "webpay plus integracion",
    "mercado pago chile checkout",
    "meta conversions api capi",
    "pos cuadratura de caja",
    "sistema todo en uno pyme",
    "agencia digital santiago",
  ],
  alternates: {
    canonical: "https://www.mercenario.cl/growth360",
  },
  openGraph: {
    title: "Growth 360 | Ecosistema Digital Todo en Uno - Mercenario",
    description: "Deja de perder clientes por demoras. Asistente IA 24/7 en WhatsApp, web de alta velocidad, pagos online y caja POS sincronizada en 30 segundos.",
    url: "https://www.mercenario.cl/growth360",
    siteName: "Mercenario",
    images: [
      {
        url: "/images/mod1_whatsapp.png",
        width: 1200,
        height: 630,
        alt: "Ecosistema Digital Growth 360",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth 360 | Ecosistema Digital Todo en Uno",
    description: "Vende en piloto automático 24/7 con Inteligencia Artificial en WhatsApp, Web Next.js y Webpay.",
    images: ["/images/mod1_whatsapp.png"],
  },
};

const growth360JsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      "@id": "https://www.mercenario.cl/growth360/#product",
      "name": "Ecosistema Digital Growth 360",
      "image": "https://www.mercenario.cl/images/mod1_whatsapp.png",
      "description": "Solución llave en mano para digitalizar y automatizar ventas de pymes en Chile: Asistente IA en WhatsApp 24/7, Sitio Web Next.js, Pagos Webpay/Mercado Pago, Meta CAPI y POS en tienda.",
      "brand": {
        "@type": "Brand",
        "name": "Mercenario"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Growth 360 Starter",
          "price": "890000",
          "priceCurrency": "CLP",
          "availability": "https://schema.org/InStock",
          "url": "https://www.mercenario.cl/growth360"
        },
        {
          "@type": "Offer",
          "name": "Growth 360 Pro",
          "price": "1890000",
          "priceCurrency": "CLP",
          "availability": "https://schema.org/InStock",
          "url": "https://www.mercenario.cl/growth360"
        },
        {
          "@type": "Offer",
          "name": "Growth 360 Enterprise",
          "price": "3490000",
          "priceCurrency": "CLP",
          "availability": "https://schema.org/InStock",
          "url": "https://www.mercenario.cl/growth360"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.mercenario.cl/growth360/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Por qué las pequeñas empresas pierden ventas en WhatsApp?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Más del 60% de los clientes potenciales escriben fuera de horario comercial o durante los fines de semana. Si un negocio tarda más de 5 a 10 minutos en responder, el prospecto contacta y compra a un competidor. Growth 360 responde y califica con IA en menos de 5 segundos las 24 horas del día."
          }
        },
        {
          "@type": "Question",
          "name": "¿Tengo que cambiar mi número de WhatsApp o software existente?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Mercenario integra el Asistente de IA directamente sobre tu número actual a través de la API Oficial de Meta Cloud WhatsApp sin interrumpir tus operaciones ni perder conversaciones previas."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué pasarelas de pago se pueden integrar en Chile?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Integramos Transbank Webpay Plus (Débito, Crédito, Redcompra) y Mercado Pago Chile, facilitando el cobro de anticipos o venta directa con confirmación instantánea y emisión de boleta electrónica SII."
          }
        },
        {
          "@type": "Question",
          "name": "¿Cuánto tarda la entrega e instalación de Growth 360?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El tiempo de desarrollo e integración completa es de 14 a 21 días hábiles, entregando el sistema 100% operativo y capacitando a tu equipo de trabajo."
          }
        }
      ]
    }
  ]
};

export default function Growth360Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(growth360JsonLd) }}
      />
      {children}
    </>
  );
}
