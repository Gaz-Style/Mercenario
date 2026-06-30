import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Mercenario IOS | Una nueva forma de operar pequeñas empresas",
  description: "Mercenario conecta toda la operación para que tu empresa funcione como una sola. Agenda, facturación, pagos, CRM, ERP y más en una operación conectada.",
  keywords: ["operación conectada", "SaaS", "automatización de empresas", "Mercenario IOS", "sistema operativo empresarial", "ERP", "CRM"],
  openGraph: {
    title: "Mercenario IOS | Operación Conectada",
    description: "Una nueva forma de operar pequeñas empresas. Conectamos todas las herramientas para que funcionen como una sola.",
    url: "https://mercenario.io",
    siteName: "Mercenario",
    images: [
      {
        url: "/imagenes/socialmotors_preview.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_CL",
    type: "website",
  },
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
