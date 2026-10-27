"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  Calendar,
  CreditCard,
  FileCheck2,
  Smartphone,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building2,
  HeartHandshake,
  TrendingUp,
  HelpCircle,
  Phone,
  ChevronRight,
  Check,
  Coffee,
  Bell,
  Layers,
  Search,
  Target,
  MapPin,
  Bot,
  BarChart3,
  AlertTriangle,
  Gauge,
  Zap,
  Globe,
  ExternalLink,
  Menu,
  X,
  FileDown,
} from "lucide-react";

export default function PropuestaCentroLaDehesaPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [auditTab, setAuditTab] = useState<number>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const pillars = [
    {
      id: "agendamiento",
      tabLabel: "Asistente Virtual",
      tag: "Pilar 1 • Coordinación 24/7",
      title: "Asistente Virtual y Agendamiento Inteligente",
      subtitle:
        "Las familias coordinan y resuelven sus dudas en el minuto exacto en que lo necesitan, sin sobrecargar a recepción.",
      image: "/images/propuesta-dehesa/agendamiento-inteligente.jpg",
      badge: "Cero esperas para los padres",
      points: [
        "Atención cálida por WhatsApp a deshoras (noches y fines de semana cuando los padres tienen tiempo).",
        "Califica con delicadeza la necesidad: fonoaudiología, psicología, terapia ocupacional o talleres.",
        "Cruza disponibilidad de especialistas y salas en La Dehesa o San Carlos de Apoquindo al instante.",
        "Agenda automáticamente la 'Cita de Orientación Gratuita' sin intervención manual de secretaría.",
      ],
      impact: "70% de reducción en tiempo administrativo de coordinación.",
    },
    {
      id: "pagos",
      tabLabel: "Pagos en Línea",
      tag: "Pilar 2 • Finanzas sin Fricción",
      title: "Pagos en Línea y Reembolso Automático Isapre",
      subtitle:
        "El pago deja de ser una conversación incómoda de comprobantes por WhatsApp y se convierte en un clic seguro.",
      image: "/images/propuesta-dehesa/pagos-reembolso-isapre.jpg",
      badge: "Boleta médica instantánea",
      points: [
        "Enlace de pago seguro (Webpay / Tarjetas) enviado automáticamente al confirmar la sesión o taller.",
        "Emisión instantánea de la boleta electrónica con código de prestación para reembolso Isapre de hasta 90%.",
        "El apoderado descarga su boleta en un clic sin tener que solicitarla a fin de mes.",
        "Conciliación bancaria en tiempo real: nunca más buscar transferencias en la cartola.",
      ],
      impact: "Cero horas perdidas cuadrando comprobantes y emitiendo boletas manuales.",
    },
    {
      id: "movil",
      tabLabel: "El Centro en la Palma de la Mano",
      tag: "Pilar 3 • Control en Vivo",
      title: "El Centro en la Palma de la Mano",
      subtitle:
        "Saber con exactitud qué ocurre en ambas sedes desde el smartphone, con una pantalla limpia y sin tecnicismos.",
      image: "/images/propuesta-dehesa/centro-en-la-mano.jpg",
      badge: "Dirección en tiempo real",
      points: [
        "Monitoreo en vivo de ocupación de las 8 salas terapéuticas en La Dehesa y San Carlos.",
        "Registro de pacientes que iniciaron con orientación gratuita y cuántos pasaron a tratamiento.",
        "Alertas preventivas de huecos en agenda para reasignar pacientes de lista de espera.",
        "Indicadores financieros diarios y mensuales consolidados en un solo lugar.",
      ],
      impact: "Paz mental para los directores: visión total de ambas sedes sin tener que llamar a recepción.",
    },
    {
      id: "comisiones",
      tabLabel: "Liquidaciones",
      tag: "Pilar 4 • Confianza Clínica",
      title: "Liquidaciones y Comisiones por Profesional",
      subtitle:
        "Cálculo automático de honorarios a fin de mes. Transparencia absoluta para el equipo de especialistas.",
      image: "/images/propuesta-dehesa/comisiones-profesionales.jpg",
      badge: "Cero planillas manuales",
      points: [
        "Cálculo por sesión realizada distinguiendo tarifas AM ($42.000), convenios y talleres grupales.",
        "Cada terapeuta puede ver en su propio móvil su historial de sesiones y su monto a liquidar.",
        "Cierre de mes en 30 segundos, eliminando errores humanos y malentendidos en honorarios.",
        "Reportes claros para administración listos para pago bancario y retención correspondiente.",
      ],
      impact: "El cálculo de fin de mes pasa de 4 días de trabajo a 1 solo clic.",
    },
    {
      id: "seo-atribucion",
      tabLabel: "SEO, Geo-LLM & Rastreo",
      tag: "Pilar 5 • Captación Inteligente & Trazabilidad",
      title: "Posicionamiento Local, Geo-LLM y Rastreo de Leads",
      subtitle:
        "Aparecer recomendados en Google y en respuestas de Inteligencia Artificial (ChatGPT/Gemini), sabiendo con exactitud matemática de qué canal o anuncio vino cada nueva familia.",
      image: "/images/propuesta-dehesa/seo-geollm-atribucion.jpg",
      badge: "Trazabilidad & Visibilidad 360°",
      points: [
        "Posicionamiento Geo-Local: Liderar búsquedas en Google Maps y Google Search para Lo Barnechea y Las Condes (fonoaudiología, terapia ocupacional, evaluación ADOS-2).",
        "Optimización Geo-LLM (IA Generativa): Cuando los padres preguntan a ChatGPT o Gemini por los mejores centros infantiles en el sector oriente, Centro La Dehesa aparece recomendado con autoridad clínica.",
        "Rastreo de Extremo a Extremo: Cada mensaje de WhatsApp, clic o agendamiento registra su origen exacto (Google Ads, Instagram, búsqueda orgánica o recomendación).",
        "Cero inversión a ciegas: La dirección sabe con exactitud cuánto costó atraer a cada nueva familia y qué canales generan pacientes que inician tratamiento continuo.",
      ],
      impact: "100% de visibilidad en el retorno de inversión publicitaria y dominio de búsquedas locales en Lo Barnechea y San Carlos.",
    },
  ];

  const comparativeRows = [
    {
      aspect: "Atención de nuevas familias",
      before:
        "Una mamá escribe un domingo por WhatsApp; debe esperar al lunes por la mañana para que secretaría revise agendas.",
      after:
        "El asistente virtual responde en 15 segundos con empatía, aclara dudas y deja agendada la orientación en la sede deseada.",
    },
    {
      aspect: "Cobro y boleta de Isapre",
      before:
        "Se solicita transferencia, el apoderado envía foto de comprobante, se verifica en el banco y se emite la boleta manualmente días después.",
      after:
        "Pago seguro en 1 clic; la boleta con código médico para el reembolso del 90% se entrega de forma automática e inmediata.",
    },
    {
      aspect: "Inasistencias y salas vacías",
      before:
        "Una familia avisa con 20 minutos de anticipación que no alcanzará a llegar. La sala y el terapeuta quedan sin actividad.",
      after:
        "Recordatorios interactivos previos; si alguien avisa que no podrá asistir, el sistema notifica de inmediato a la lista de espera.",
    },
    {
      aspect: "Liquidación a terapeutas",
      before:
        "A fin de mes se revisan calendarios dispersos, cruces de sesiones AM y talleres en hojas de cálculo con riesgo de error.",
      after:
        "Liquidación matemática y transparente generada en tiempo real. Cada profesional revisa su resumen desde su teléfono.",
    },
    {
      aspect: "Control de las dos sedes",
      before:
        "La dirección debe llamar por teléfono o consultar múltiples planillas para saber si hay disponibilidad en San Carlos o La Dehesa.",
      after:
        "Tablero móvil unificado con ocupación de salas, pacientes del día y flujo financiero accesible desde cualquier lugar.",
    },
    {
      aspect: "Captación, SEO & Rastreo de Inversión",
      before:
        "Se invierte en anuncios o se espera a que busquen en Google sin saber qué campaña funcionó, con un blog abandonado y sin presencia en búsquedas con IA.",
      after:
        "Posicionamiento líder en Google y ChatGPT/Gemini para Las Condes y La Dehesa. Rastreo del 100% de los leads desde el primer clic hasta la sesión atendida.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      {/* Top Notification Bar */}
      <div className="bg-emerald-950 text-emerald-200 px-4 py-2.5 text-center text-xs md:text-sm font-medium border-b border-emerald-900/50 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>
          Propuesta Exclusiva de Evolución Operativa para{" "}
          <strong className="text-white font-semibold">Centro La Dehesa</strong> (Sedes La Dehesa & San Carlos de Apoquindo)
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold tracking-wider text-xs sm:text-sm shadow-sm">
              M
            </div>
            <div>
              <span className="font-semibold text-slate-900 tracking-tight text-xs sm:text-sm block">
                Mercenario
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 block leading-tight">
                Diseño & Evolución Operativa
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6 text-sm text-slate-600 font-medium">
            <a href="#pilares" className="hover:text-slate-900 transition-colors">
              Puntos de Mejora
            </a>
            <a href="#comparativa" className="hover:text-slate-900 transition-colors">
              Antes vs. Después
            </a>
            <a href="#auditoria" className="text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/80 hover:bg-emerald-100 transition flex items-center gap-1.5 text-xs">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Auditoría & Tráfico</span>
            </a>
            <a href="#beneficios" className="hover:text-slate-900 transition-colors">
              Beneficio por Actor
            </a>
            <a href="#faq" className="hover:text-slate-900 transition-colors">
              Preguntas Frecuentes
            </a>
          </div>

          {/* Actions: CTA + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/Informe-Evolucion-Operativa-Centro-La-Dehesa.pdf"
              download="Informe-Evolucion-Operativa-Centro-La-Dehesa.pdf"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              <FileDown className="w-3.5 h-3.5 text-emerald-600" />
              <span>PDF</span>
            </a>

            <a
              href="#contacto"
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm"
            >
              <span className="hidden sm:inline">Agendar Diagnóstico (20 min)</span>
              <span className="sm:hidden">Diagnóstico 20m</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition border border-slate-200"
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/98 px-4 py-4 space-y-2.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <a
              href="#auditoria"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-900 font-semibold text-xs border border-emerald-200/80"
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Auditoría & Tráfico (centroladehesa.com)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-600" />
            </a>

            <a
              href="#pilares"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-xs"
            >
              <span>Los 5 Pilares de Evolución</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="#comparativa"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-xs"
            >
              <span>Antes vs. Después</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="#beneficios"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-xs"
            >
              <span>Beneficios por Actor</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-xs"
            >
              <span>Preguntas Frecuentes</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="/Informe-Evolucion-Operativa-Centro-La-Dehesa.pdf"
                download="Informe-Evolucion-Operativa-Centro-La-Dehesa.pdf"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 transition"
              >
                <FileDown className="w-4 h-4 text-emerald-600" />
                <span>Descargar Informe Técnico en PDF</span>
              </a>

              <a
                href="#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-950 hover:bg-slate-800 transition"
              >
                <span>Agendar Diagnóstico Operativo (20 min)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section (Optimizado Mobile & Desktop) */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 md:pt-14 md:pb-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Columna Izquierda: Copywriting conciso & CTAs */}
            <div className="lg:col-span-6 text-left">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-[11px] sm:text-xs font-semibold mb-3 sm:mb-4 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="truncate">Auditoría & Evolución Operativa</span>
                <span className="text-emerald-300">•</span>
                <span className="text-emerald-700 font-medium">Sedes La Dehesa & San Carlos</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.14] mb-3 sm:mb-4">
                Evolución Operativa para{" "}
                <span className="text-emerald-700 block sm:inline lg:block mt-0.5 sm:mt-1">Centro La Dehesa.</span>
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-5 sm:mb-6 max-w-xl">
                Arquitectura invisible para que agendar sesiones 24/7 por WhatsApp, cobrar con boleta médica para Isapre y liquidar honorarios a terapeutas tome segundos en sus dos sedes.
              </p>

              {/* Botones de acción (Full width en mobile para fácil tap táctil) */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                <a
                  href="#auditoria"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-slate-950 hover:bg-slate-800 transition shadow-md w-full sm:w-auto"
                >
                  <span>Ver Auditoría en Vivo</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#pilares"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition w-full sm:w-auto"
                >
                  <span>Explorar 5 Pilares</span>
                </a>
              </div>

              {/* Micro-Badges de Confianza al estilo Clinicafy */}
              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 text-[11px] sm:text-xs text-slate-600 font-medium pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>Sincronización 2 Sedes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>Reembolso Isapre 90%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />
                  <span>Liquidaciones en 30 seg</span>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta Fotográfica con Badges Flotantes Responsivos */}
            <div className="lg:col-span-6 relative mt-4 lg:mt-0">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100 group">
                <img
                  src="/images/propuesta-dehesa/hero-centro-dehesa.jpg"
                  alt="Operación Digital Centro La Dehesa"
                  className="w-full h-auto object-cover max-h-[340px] sm:max-h-[460px] group-hover:scale-102 transition-transform duration-500 ease-out"
                />

                {/* Badge Flotante 1: Agendamiento WhatsApp (adaptativo para mobile) */}
                <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-lg flex items-center gap-2 max-w-[65%] sm:max-w-[85%]">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold text-slate-900 leading-tight truncate">Agendamiento WhatsApp</div>
                    <div className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold truncate">● 24/7 sin esperas</div>
                  </div>
                </div>

                {/* Badge Flotante 2: Sedes Conectadas */}
                <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 bg-slate-900/90 backdrop-blur-md border border-white/10 text-white rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 shadow-md text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="hidden sm:inline">La Dehesa & San Carlos</span>
                  <span className="sm:hidden">2 Sedes</span>
                </div>

                {/* Badge Flotante 3: Boleta Médica Isapre */}
                <div className="absolute bottom-2.5 right-2.5 sm:bottom-3.5 sm:right-3.5 bg-slate-950/95 backdrop-blur-md border border-white/10 rounded-xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 shadow-2xl flex items-center gap-2 max-w-[80%] sm:max-w-[85%] text-white">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] sm:text-xs font-bold text-white leading-tight">Boleta Médica Isapre</div>
                    <div className="text-[9px] sm:text-[10px] text-emerald-400 font-medium">Reembolso hasta 90%</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Metrics Strip (2x2 en mobile, 4 en desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 max-w-6xl mx-auto mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-100 text-left">
            <div className="p-3 sm:p-3.5 bg-slate-50/90 rounded-xl border border-slate-100">
              <div className="text-lg sm:text-2xl font-bold text-slate-900">24/7</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-snug">
                Agendamiento continuo sin perder pacientes por chat
              </div>
            </div>
            <div className="p-3 sm:p-3.5 bg-slate-50/90 rounded-xl border border-slate-100">
              <div className="text-lg sm:text-2xl font-bold text-emerald-700">100%</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-snug">
                Boletas automáticas con código para reembolso Isapre
              </div>
            </div>
            <div className="p-3 sm:p-3.5 bg-slate-50/90 rounded-xl border border-slate-100">
              <div className="text-lg sm:text-2xl font-bold text-slate-900">30 seg</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-snug">
                Liquidación de honorarios a terapeutas sin Excel
              </div>
            </div>
            <div className="p-3 sm:p-3.5 bg-slate-50/90 rounded-xl border border-slate-100">
              <div className="text-lg sm:text-2xl font-bold text-emerald-700">2 Sedes</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 leading-snug">
                La Dehesa & San Carlos unificadas en tiempo real
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Pillars Section */}
      <section id="pilares" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-emerald-700 font-semibold text-xs uppercase tracking-wider block mb-2">
            Arquitectura de Operaciones Conectada
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-4">
            Cinco transformaciones visuales diseñadas para su centro
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Sin jerga técnica. Observe exactamente cómo experimentarán el sistema sus pacientes, sus terapeutas y el equipo de dirección.
          </p>
        </div>

        {/* Tab Selector (Scroll horizontal en mobile, centrado en desktop) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 sm:mb-10 sm:flex-wrap sm:justify-center no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {pillars.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveTab(idx)}
              className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 border whitespace-nowrap shrink-0 ${
                activeTab === idx
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-slate-200"
              }`}
            >
              {idx === 0 && <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />}
              {idx === 1 && <CreditCard className="w-3.5 h-3.5 text-emerald-400" />}
              {idx === 2 && <Smartphone className="w-3.5 h-3.5 text-emerald-400" />}
              {idx === 3 && <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />}
              {idx === 4 && <Target className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{p.tabLabel}</span>
              {activeTab === idx && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Selected Pillar Content Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 md:p-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Narrative & Bullets */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-100">
                  {pillars[activeTab].tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
                  {pillars[activeTab].title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
                  {pillars[activeTab].subtitle}
                </p>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3">
                {pillars[activeTab].points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 leading-normal">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>

              {/* Impact Banner */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />
                <div className="text-xs font-semibold text-slate-800">
                  <span className="text-emerald-700 font-bold block">Impacto en el centro:</span>
                  {pillars[activeTab].impact}
                </div>
              </div>
            </div>

            {/* Right Column: Explanatory Image & Visual */}
            <div className="lg:col-span-7">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shadow-md group">
                <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-slate-800 font-medium text-xs shadow-sm border border-slate-200/60 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>{pillars[activeTab].badge}</span>
                </div>
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={pillars[activeTab].image}
                    alt={pillars[activeTab].title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    priority
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-400 text-center mt-2 italic">
                Interfaz operativa a medida, simple y orientada a la calidez de Centro La Dehesa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of All 4 Solutions (Quick Overview) */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Los 5 engranajes que operan en segundo plano
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Todo conectado. La información ingresa una sola vez y viaja automáticamente a donde se necesita.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Asistente Virtual Empático
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Responde en WhatsApp con calidez pediátrica. Conoce los servicios de fonoaudiología, psicología, terapia ocupacional y talleres para guiar a la familia.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Agendamiento de Salas y Terapeutas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Asigna automáticamente las 8 salas de La Dehesa y los espacios de San Carlos sin cruces de horario ni sobrecarga de especialistas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Pagos en Línea y Boletas Médicas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Cobro seguro con Webpay y tarjetas. Genera inmediatamente la boleta electrónica con código de prestación para el reembolso del 90% en Isapres.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Notificaciones Preventivas de Asistencia
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Recordatorios inteligentes 48h y 24h antes. Si una familia cancela, se activa la lista de espera automática para que ninguna sala quede vacía.
              </p>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                Liquidación y Comisiones de Especialistas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Cálculo instantáneo por sesión ($42.000 AM, talleres o sesiones regulares). Transparencia total visible para cada profesional desde su teléfono.
              </p>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all hover:shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1.5">
                SEO Local, Geo-LLM & Rastreo de Leads
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dominio de búsquedas en Google y recomendaciones en IA (ChatGPT/Gemini) para Las Condes y Lo Barnechea. Trazabilidad de cada lead desde el primer clic hasta la consulta atendida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparative Table: Before vs After */}
      <section id="comparativa" className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-700 font-semibold text-xs uppercase tracking-wider block mb-2">
            El Impacto en el Día a Día
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-4">
            Cómo se siente el cambio operativo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            La diferencia entre la gestión manual y una operación fluida e integrada.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-200">
            {/* Header row (visible on md+) */}
            <div className="hidden md:grid md:grid-cols-12 bg-slate-100/80 px-4 py-3.5 text-xs font-semibold text-slate-700">
              <div className="col-span-3">MOMENTO DEL DÍA</div>
              <div className="col-span-4 text-rose-800">CÓMO ES HOY (MANUAL)</div>
              <div className="col-span-5 text-emerald-800">CON LA OPERACIÓN INTEGRADA</div>
            </div>

            {comparativeRows.map((row, i) => (
              <div key={i} className="flex flex-col md:grid md:grid-cols-12 p-4 sm:p-5 text-xs sm:text-sm gap-2 sm:gap-3 md:gap-4 items-start">
                <div className="w-full md:col-span-3 font-bold md:font-semibold text-slate-900 text-sm md:text-xs">
                  {row.aspect}
                </div>
                <div className="w-full md:col-span-4 text-slate-600 bg-rose-50/60 p-3 rounded-xl border border-rose-100/70 leading-relaxed">
                  <span className="text-[11px] font-bold text-rose-700 block mb-1 md:hidden">Fricción Actual (Manual):</span>
                  {row.before}
                </div>
                <div className="w-full md:col-span-5 text-slate-800 bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 leading-relaxed font-medium">
                  <span className="text-[11px] font-bold text-emerald-700 block mb-1 md:hidden">Operación Integrada:</span>
                  {row.after}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits for Each Stakeholder */}
      <section id="beneficios" className="py-16 bg-slate-100/70 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Beneficio tangible para cada persona del centro
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Cuando la operación está en orden, todos trabajan con mayor tranquilidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Familias */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Para las Familias</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Sienten un acompañamiento impecable desde el primer mensaje. La coordinación es inmediata, los recordatorios evitan olvidos y sus boletas para el reembolso Isapre del 90% se generan solas.
                </p>
              </div>
              <div className="text-xs font-semibold text-emerald-700 pt-3 border-t border-slate-100">
                Experiencia cálida y sin fricciones burocráticas.
              </div>
            </div>

            {/* Terapeutas */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Para los Terapeutas</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Llegan a atender sin preocuparse de cobros ni agendas desfasadas. Conocen su hoja de ruta diaria desde su celular y tienen certeza absoluta de sus comisiones y sesiones realizadas.
                </p>
              </div>
              <div className="text-xs font-semibold text-slate-800 pt-3 border-t border-slate-100">
                Enfoque 100% clínico y confianza total en sus honorarios.
              </div>
            </div>

            {/* Directores */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Para la Dirección</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Recuperan horas de vida y paz mental. Tienen visión en vivo de La Dehesa y San Carlos, menos inasistencias en salas y la libertad de abrir nuevas sedes sobre una base sólida.
                </p>
              </div>
              <div className="text-xs font-semibold text-emerald-800 pt-3 border-t border-slate-100">
                Control gerencial y tranquilidad de crecimiento.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Audit & Traffic Report Section */}
      <section id="auditoria" className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-3">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Auditoría Forense en Vivo • centroladehesa.com</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-4">
              Informe de Tráfico, Embudo y Salud Web Actual
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Analizamos a fondo el código fuente, la infraestructura de hosting, los píxeles publicitarios y la indexación en Google de su sitio web actual. Estos datos explican por qué hoy el centro depende casi exclusivamente de pagar anuncios para conseguir nuevas familias.
            </p>
          </div>

          {/* 4 Scorecards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Tráfico Total Estimado
                </span>
                <BarChart3 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">~1.200 – 3.100</div>
              <div className="text-xs text-slate-500 mt-1">visitas al mes (según pauta activa)</div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">
                  Dependencia de Pauta
                </span>
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-amber-900">75% – 80%</div>
              <div className="text-xs text-amber-700 mt-1">vienen de pagar Meta Ads y Google</div>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider">
                  Tráfico Orgánico (SEO)
                </span>
                <Search className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-rose-900">Solo 8% – 12%</div>
              <div className="text-xs text-rose-700 mt-1">búsquedas no pagas (desperdicio crítico)</div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Velocidad & Peso HTML
                </span>
                <Gauge className="w-4 h-4 text-slate-700" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">1.84s • 417 KB</div>
              <div className="text-xs text-slate-500 mt-1">HTML pesado y sin Edge Cache</div>
            </div>
          </div>

          {/* Visual Traffic Bar Breakdown */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  ¿De dónde vienen las visitas de Centro La Dehesa hoy?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  Desglose por canales según los píxeles y herramientas detectadas en el sitio:
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-800">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                Alerta: Riesgo de apagón publicitario
              </span>
            </div>

            {/* Stacked bar */}
            <div className="w-full h-7 rounded-xl overflow-hidden flex shadow-inner mb-4 bg-slate-200">
              <div
                style={{ width: "75%" }}
                className="bg-emerald-600 text-[11px] font-bold text-white flex items-center justify-center"
                title="Pauta Pagada Meta Ads / Google Ads: 75%"
              >
                Pauta Pagada 75%
              </div>
              <div
                style={{ width: "12%" }}
                className="bg-sky-600 text-[11px] font-bold text-white flex items-center justify-center"
                title="Google Maps / Local: 12%"
              >
                Maps 12%
              </div>
              <div
                style={{ width: "8%" }}
                className="bg-amber-500 text-[10px] font-bold text-white flex items-center justify-center"
                title="SEO Orgánico: 8%"
              >
                SEO 8%
              </div>
              <div
                style={{ width: "5%" }}
                className="bg-slate-700 text-[10px] font-bold text-white flex items-center justify-center"
                title="Directo: 5%"
              >
                5%
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-emerald-600 shrink-0" />
                <span className="text-slate-700">
                  <strong>Meta & Google Ads:</strong> ~900 – 2.200 visitas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-sky-600 shrink-0" />
                <span className="text-slate-700">
                  <strong>Google Maps / Local:</strong> ~150 – 400 visitas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-amber-500 shrink-0" />
                <span className="text-slate-700">
                  <strong>SEO Orgánico (Gratis):</strong> ~120 – 350 visitas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-slate-700 shrink-0" />
                <span className="text-slate-700">
                  <strong>Directo / Referidos:</strong> ~50 – 150 visitas
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Audit Tabs (Deep Dive) */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            {/* Audit tab headers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-600">
              <button
                onClick={() => setAuditTab(0)}
                className={`py-3.5 px-4 text-center transition flex items-center justify-center gap-2 border-b-2 ${
                  auditTab === 0
                    ? "border-emerald-600 text-slate-900 bg-white font-bold shadow-sm"
                    : "border-transparent hover:text-slate-900"
                }`}
              >
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>1. Análisis de Tráfico</span>
              </button>
              <button
                onClick={() => setAuditTab(1)}
                className={`py-3.5 px-4 text-center transition flex items-center justify-center gap-2 border-b-2 ${
                  auditTab === 1
                    ? "border-emerald-600 text-slate-900 bg-white font-bold shadow-sm"
                    : "border-transparent hover:text-slate-900"
                }`}
              >
                <Search className="w-4 h-4 text-emerald-600" />
                <span>2. SEO & Búsquedas IA</span>
              </button>
              <button
                onClick={() => setAuditTab(2)}
                className={`py-3.5 px-4 text-center transition flex items-center justify-center gap-2 border-b-2 ${
                  auditTab === 2
                    ? "border-emerald-600 text-slate-900 bg-white font-bold shadow-sm"
                    : "border-transparent hover:text-slate-900"
                }`}
              >
                <Target className="w-4 h-4 text-emerald-600" />
                <span>3. Embudo & Conversión</span>
              </button>
              <button
                onClick={() => setAuditTab(3)}
                className={`py-3.5 px-4 text-center transition flex items-center justify-center gap-2 border-b-2 ${
                  auditTab === 3
                    ? "border-emerald-600 text-slate-900 bg-white font-bold shadow-sm"
                    : "border-transparent hover:text-slate-900"
                }`}
              >
                <Gauge className="w-4 h-4 text-emerald-600" />
                <span>4. Hosting & Velocidad</span>
              </button>
            </div>

            {/* Audit tab content */}
            <div className="p-6 sm:p-8">
              {auditTab === 0 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      Diagnóstico de Tráfico: La Trampa de la Dependencia Publicitaria
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      El sitio cuenta con una configuración activa de **Meta Conversions API (ID 1689031162645744)** y la etiqueta **Google Ads AW-17688954370**. Esto confirma que el flujo de familias está alimentado artificialmente por pauta pagada.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-rose-50 border border-rose-200/80">
                      <span className="text-xs font-bold text-rose-800 block mb-1">
                        El Problema Financiero:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Si el centro decide pausar o recortar la inversión publicitaria en Instagram y Facebook, las visitas caen en picada. No existe un colchón orgánico que mantenga el flujo constante de nuevas consultas.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80">
                      <span className="text-xs font-bold text-emerald-800 block mb-1">
                        La Solución de Mercenario:
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        Construir presencia orgánica en Google y recomendaciones en IA para que familias de Lo Barnechea y Las Condes encuentren el centro de forma natural y gratuita todos los días del año.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {auditTab === 1 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      Auditoría SEO & Geo-LLM: Cero Captación de Síntomas y Título Crítico
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Revisamos la indexación del sitio en los motores de búsqueda y encontramos 3 brechas estructurales graves:
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-md bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        !
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm text-slate-900 block font-semibold">
                          Encabezado principal H1 de la portada: literal &quot;Inicio&quot;
                        </strong>
                        <span className="text-xs text-slate-600">
                          Google usa el H1 como la señal más importante de relevancia. Titular la web como &quot;Inicio&quot; en lugar de &quot;Centro de Neurodesarrollo y Terapias Infantiles en La Dehesa y Las Condes&quot; destruye su posicionamiento orgánico.
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-md bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        !
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm text-slate-900 block font-semibold">
                          Blog abandonado con el post original de WordPress (&quot;Hello World&quot;)
                        </strong>
                        <span className="text-xs text-slate-600">
                          Al inspeccionar el archivo <code className="text-emerald-700 bg-white px-1 py-0.5 rounded border border-slate-200">post-sitemap.xml</code>, el único post indexado es la entrada de prueba de WordPress. El centro tiene CERO artículos captando búsquedas de padres con dudas reales.
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                        !
                      </div>
                      <div>
                        <strong className="text-xs sm:text-sm text-slate-900 block font-semibold">
                          Ausencia de Schema MedicalBusiness y Optimización para Motores de IA
                        </strong>
                        <span className="text-xs text-slate-600">
                          El sitio tiene marcado genérico de página web. No especifica a los motores de IA (ChatGPT, Gemini, Perplexity) sus coordenadas geográficas, sedes ni catálogo clínico de fonoaudiología y terapia ocupacional.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {auditTab === 2 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      Fricción en el Embudo de Conversión (CRO) y Fuga de Leads
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Aunque el centro ofrece una excelente Cita de Orientación Gratuita, la experiencia de reserva sufre de 3 obstáculos técnicos:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 block mb-1">
                        Formulario en iFrame Externo
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        El formulario de agendamiento en <code className="text-[11px] bg-white px-1 rounded">/agenda/</code> proviene de un iFrame de GoHighLevel (<code className="text-[11px] bg-white px-1 rounded">api.leadconnectorhq.com</code>). En dispositivos Apple (iOS Safari), las políticas de cookies de terceros pueden bloquear la carga o la atribución publicitaria.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 block mb-1">
                        Botones con Ruta Errónea
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        En la portada, los botones de &quot;Agenda una hora&quot; redirigen al usuario hacia <code className="text-[11px] bg-white px-1 rounded">/servicios/</code> en vez de llevarlo directo al formulario. Cada clic adicional reduce entre un 15% y un 25% la conversión de pacientes calificados.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 block mb-1">
                        WhatsApp Sin Tracking
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Los enlaces hacia <code className="text-[11px] bg-white px-1 rounded">wa.me/...</code> no envían eventos de conversión de clic a Google Ads ni a Meta Pixel. Cuando una mamá decide escribir por WhatsApp en vez de rellenar el formulario, esa venta queda como &quot;ciega&quot;.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {auditTab === 3 && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      Infraestructura y Rendimiento: Sobrecarga de Plugins y Servidor Lento
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      El sitio está alojado en **Hostinger** sobre **WordPress con tema Astra**, pero acumula un exceso de extensiones que ralentizan la carga móvil en familias con celulares 4G/5G:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 block mb-1">
                        3 Extensiones de Elementor Simultáneas:
                      </span>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4 mt-2">
                        <li>Elementor Free + Pro Elements</li>
                        <li>Essential Addons for Elementor Lite</li>
                        <li>Royal Elementor Addons</li>
                      </ul>
                      <p className="text-[11px] text-slate-500 mt-2">
                        Esto genera más de 30 librerías JavaScript pesadas y un archivo HTML de 417 KB (lo recomendado es menos de 80 KB).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs font-bold text-slate-900 block mb-1">
                        Caché de Borde Inactiva:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2">
                        La cabecera del servidor reporta <code className="text-emerald-700 bg-white px-1 rounded">x-hcdn-cache-status: DYNAMIC</code>. Significa que el servidor de Hostinger procesa cada visita desde cero mediante PHP en lugar de entregar la web pre-renderizada en milisegundos.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom summary card */}
            <div className="p-5 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-xs sm:text-sm">
                  <span className="font-semibold block text-emerald-300">
                    Conclusión de la Auditoría:
                  </span>
                  Centro La Dehesa tiene un servicio de excelencia, pero su tecnología web actual desperdicia el 80% de su potencial orgánico y satura a su equipo administrativo.
                </div>
              </div>
              <a
                href="#contacto"
                className="whitespace-nowrap px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition"
              >
                Corregir esto en la reunión
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Preguntas frecuentes sobre la implementación
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Respuestas claras para tomar una decisión informada y sin riesgos.
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-white border border-slate-200">
            <h3 className="font-semibold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ¿Esto interrumpirá la atención diaria de los niños o la labor de secretaría?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
              En absoluto. La implementación se realiza en etapas progresivas en paralelo. Primero se conecta el asistente y el agendamiento asistido para aliviar a secretaría, y el equipo va adoptando las herramientas a su propio ritmo sin detener las consultas.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200">
            <h3 className="font-semibold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ¿El asistente virtual suena 'robótico' o frío con las mamás y papás?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
              No. El modelo se entrena específicamente con los principios de Centro La Dehesa: empatía, contención, vocabulario chileno respetuoso y conocimiento de cada especialidad. Si un caso requiere atención humana sensible, el asistente lo deriva inmediatamente con el resumen listo para la terapeuta o encargada.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200">
            <h3 className="font-semibold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ¿Las boletas emitidas son válidas para el reembolso del 90% en Isapres?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
              Sí. Se integran con el Servicio de Impuestos Internos (SII) bajo el formato de boleta electrónica médica con el detalle de prestación y el profesional a cargo, permitiendo que las familias suban el PDF a sus aplicaciones de Isapre (Colmena, Banmédica, Consalud, CruzBlanca, etc.) sin observaciones.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-slate-200">
            <h3 className="font-semibold text-slate-900 text-sm sm:text-base mb-1.5 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ¿Cómo se calculan las comisiones si tenemos tarifas AM y talleres?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
              El sistema parametriza las reglas comerciales del centro: valor promocional AM ($42.000), 10% de descuento por segunda especialidad o valores diferenciados por taller. Cada vez que se marca la sesión atendida, la comisión se calcula de forma automática y queda registrada en el perfil del terapeuta.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="contacto" className="py-16 md:py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold mb-6">
            <Coffee className="w-3.5 h-3.5 text-emerald-400" />
            <span>Próximo Paso • Sesión de Diagnóstico Operativo (20 minutos)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Demos el primer paso con una conversación tranquila
          </h2>

          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Revisemos juntos los cuellos de botella específicos que hoy consumen tiempo a su secretaría y terapeutas en La Dehesa y San Carlos. Sin costos, sin presiones técnicas y con un plan claro.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/56900000000?text=Hola,%20leí%20la%20propuesta%20de%20evolución%20operativa%20para%20Centro%20La%20Dehesa%20y%20me%20gustaría%20agendar%20una%20sesión%20de%20diagnóstico"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Coordinar Diagnóstico por WhatsApp</span>
            </a>
            <a
              href="/Informe-Evolucion-Operativa-Centro-La-Dehesa.pdf"
              download="Informe-Evolucion-Operativa-Centro-La-Dehesa.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-700 hover:border-emerald-500 transition shadow-sm cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Descargar Informe Escrito (PDF)</span>
            </a>
          </div>

          <div className="mt-8 text-xs text-slate-500">
            Confidencialidad garantizada • Preparado para la Dirección de Centro La Dehesa
          </div>
        </div>
      </section>

      {/* Clean Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Mercenario • Arquitectura y Evolución Operativa para Empresas.
          </div>
          <div className="flex items-center gap-6 text-slate-400">
            <span>Sede La Dehesa</span>
            <span>•</span>
            <span>Sede San Carlos de Apoquindo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
