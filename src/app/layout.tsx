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
  title: "Mercenario | Operaciones Tácticas de Growth & Automatización",
  description: "Automatizamos tu crecimiento con pautas de respuesta directa, embudos de conversión y arquitectura SaaS. Ejecución táctica 360 para escalar ventas.",
  keywords: ["marketing digital", "automatización de ventas", "SaaS", "growth hacking", "pauta digital", "Mercenario"],
  openGraph: {
    title: "Mercenario | Operaciones Tácticas de Growth",
    description: "Diseñamos y escalamos toda tu cadena de ventas con arquitectura técnica.",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
