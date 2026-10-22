import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mercenario.cl"),
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Mercenario",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  title: {
    default: "Mercenario IOS | Una nueva forma de operar pequeñas empresas",
    template: "%s | Mercenario",
  },
  description: "Mercenario conecta toda la operación de tu negocio: Asistentes de IA en WhatsApp 24/7, desarrollo web de alta velocidad, pagos en línea Webpay/Mercado Pago, Meta CAPI y conciliación POS en Chile.",
  keywords: [
    "operación conectada",
    "automatización pymes chile",
    "asistente ia whatsapp",
    "desarrollo web nextjs chile",
    "webpay plus integracion",
    "mercado pago chile",
    "meta capi server side",
    "punto de venta pos chile",
    "erp crm chile",
    "growth 360",
    "agencia digital santiago",
    "facturación electrónica sii",
    "mercenario ios",
  ],
  authors: [{ name: "Mercenario", url: "https://www.mercenario.cl" }],
  creator: "Mercenario",
  publisher: "Mercenario",
  alternates: {
    canonical: "https://www.mercenario.cl",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Mercenario | Ecosistema Digital & Operación Conectada",
    description: "Conecta tu negocio en una sola operación: Ventas con IA en WhatsApp 24/7, Web Next.js, Webpay, Meta CAPI y POS sincronizado.",
    url: "https://www.mercenario.cl",
    siteName: "Mercenario",
    images: [
      {
        url: "/imagenes/mercenario_preview.png",
        width: 1200,
        height: 630,
        alt: "Mercenario Ecosistema Digital",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mercenario | Ecosistema Digital & Operación Conectada",
    description: "Ventas automáticas 24/7 con Inteligencia Artificial en WhatsApp, Web Next.js ultra-rápida y cobros Webpay en Chile.",
    images: ["/imagenes/mercenario_preview.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.mercenario.cl/#organization",
      "name": "Mercenario",
      "url": "https://www.mercenario.cl",
      "logo": "https://www.mercenario.cl/imagenes/mercenario_preview.png",
      "description": "Ecosistema digital y tecnología operativa para empresas y pymes en Chile. Automatización con IA en WhatsApp, desarrollo web Next.js, pasarelas de pago Webpay/Mercado Pago y conciliación POS/ERP.",
      "telephone": "+56957958467",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CL",
        "addressLocality": "Santiago",
        "addressRegion": "Región Metropolitana"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+56957958467",
          "contactType": "sales",
          "areaServed": "CL",
          "availableLanguage": ["Spanish"]
        }
      ],
      "sameAs": [
        "https://www.mercenario.cl",
        "https://wa.me/56957958467"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.mercenario.cl/#website",
      "url": "https://www.mercenario.cl",
      "name": "Mercenario",
      "publisher": {
        "@id": "https://www.mercenario.cl/#organization"
      },
      "inLanguage": "es-CL"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Mercenario IOS & Growth 360",
      "operatingSystem": "Cloud, Web, WhatsApp, iOS, Android",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "CLP",
        "lowPrice": "890000",
        "highPrice": "3490000"
      },
      "description": "Automatización integral de ventas con IA en WhatsApp, Web Next.js, pagos Webpay y conciliación POS en Chile."
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="geo.region" content="CL" />
        <meta name="geo.placename" content="Santiago, Chile" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
