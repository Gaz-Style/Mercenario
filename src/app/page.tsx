"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
    ArrowRight,
    ArrowUpRight,
    ChevronDown,
    Menu,
    X,
    Check,
    Clock,
    ShieldCheck,
    CreditCard,
    Smartphone,
    Layers,
    RefreshCw,
    Globe,
    Cpu,
    Workflow,
    BarChart3,
    Terminal,
    ShoppingCart,
    MessageSquare,
    Zap,
    CheckCircle2
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import HeroV2 from "@/components/HeroV2";

export default function Home() {
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        phone: "",
        system: "Paquete Fundador (Arquitectura Completa: $1.8M - $2.2M CLP)", 
        challenge: "", 
        _honeypot: "" 
    });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData._honeypot) {
            setFormStatus("success");
            setFormData({ name: "", email: "", phone: "", system: "Paquete Fundador", challenge: "", _honeypot: "" });
            setTimeout(() => setFormStatus("idle"), 5000);
            return;
        }

        setFormStatus("loading");
        const { error } = await supabase
            .from("leads")
            .insert([{ 
                full_name: formData.name, 
                email: formData.email, 
                phone: formData.phone,
                challenge: `[Opción: ${formData.system}] [Tel: ${formData.phone}] ${formData.challenge}`, 
                budget: formData.system 
            }]);

        if (error) {
            console.error("Error guardando lead:", error);
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 4000);
        } else {
            setFormStatus("success");
            setFormData({ name: "", email: "", phone: "", system: "Paquete Fundador", challenge: "", _honeypot: "" });
            setTimeout(() => setFormStatus("idle"), 5000);
        }
    };

    const handleSelectSystemForQuote = (sysName: string) => {
        setFormData(prev => ({ ...prev, system: sysName }));
        const element = document.getElementById("contacto");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const WHATSAPP_NUM = "56957958467";

    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            
            {/* ─── HEADER ─── */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/90 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center relative z-50">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-2 h-2 bg-red-600 rounded-full group-hover:scale-125 transition-transform" />
                            <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase flex items-center gap-1.5 sm:gap-2">
                                MERCENARIO <span className="hidden sm:inline text-neutral-200">|</span> <span className="hidden sm:inline text-neutral-500 font-medium">SISTEMAS OPERATIVOS</span>
                            </span>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase select-none">
                            <a href="#arquitectura" className="hover:text-black transition-colors py-2 font-bold text-neutral-800">
                                Arquitectura
                            </a>
                            <a href="#sandbox" className="hover:text-black transition-colors py-2 text-neutral-800">
                                Sandbox en Vivo
                            </a>
                            <a href="#tarifario" className="hover:text-black transition-colors py-2 text-black font-bold">
                                Tarifario CLP
                            </a>
                            <Link href="/tienda" className="hover:text-black transition-colors py-2 text-neutral-500">
                                Tienda WEKE
                            </Link>
                            <div 
                                className="relative cursor-pointer py-2 hover:text-black transition-colors flex items-center gap-1"
                                onMouseEnter={() => setIsResourcesOpen(true)}
                                onMouseLeave={() => setIsResourcesOpen(false)}
                            >
                                <span>Recursos</span>
                                <ChevronDown className="w-3 h-3 text-neutral-400" />
                                
                                <AnimatePresence>
                                    {isResourcesOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            className="absolute top-full left-0 w-64 bg-white border border-neutral-100 rounded-xl shadow-lg p-3 flex flex-col space-y-1.5 normal-case"
                                        >
                                            <Link href="/centro-de-conocimiento/que-es-un-erp" className="text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 px-2.5 py-1.5 rounded-md transition-colors font-normal">
                                                ¿Qué es un ERP y cuándo se necesita?
                                            </Link>
                                            <Link href="/centro-de-conocimiento/que-es-un-crm" className="text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 px-2.5 py-1.5 rounded-md transition-colors font-normal">
                                                ¿Cómo un CRM evita perder clientes?
                                            </Link>
                                            <Link href="/centro-de-conocimiento/que-es-una-api" className="text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 px-2.5 py-1.5 rounded-md transition-colors font-normal">
                                                ¿Qué es una API y cómo conecta tu negocio?
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </nav>
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        <a 
                            href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quisiera%20conversar%20sobre%20la%20arquitectura%20operativa%20Mercenario`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors"
                        >
                            WhatsApp Directo
                        </a>
                        <a 
                            href="#contacto" 
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[11px] font-semibold tracking-wider uppercase rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
                        >
                            <span>Cotizar Sistema</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-neutral-600 hover:text-black focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Menú Móvil */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white border-b border-neutral-100 px-6 py-8 flex flex-col gap-6"
                        >
                            <div className="flex flex-col gap-4">
                                <a 
                                    href="#arquitectura" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-black"
                                >
                                    Arquitectura del Sistema
                                </a>
                                <a 
                                    href="#sandbox" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-black"
                                >
                                    Entorno Sandbox en Vivo
                                </a>
                                <a 
                                    href="#tarifario" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-black"
                                >
                                    Tarifario &amp; Precios CLP
                                </a>
                                <Link 
                                    href="/tienda" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-neutral-600"
                                >
                                    Tienda Sandbox (WEKE)
                                </Link>
                            </div>

                            <div className="pt-6 border-t border-neutral-100 flex flex-col gap-3">
                                <a 
                                    href="#contacto" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-4 bg-black text-white text-center text-xs font-semibold tracking-widest uppercase rounded-full"
                                >
                                    Cotizar Sistema Operativo
                                </a>
                                <a 
                                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quisiera%20conversar%20sobre%20el%20sistema%20operativo%20para%20mi%20empresa`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3.5 border border-neutral-200 text-black text-center text-xs font-semibold tracking-widest uppercase rounded-full"
                                >
                                    Hablar por WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <main className="w-full flex flex-col items-center">
                
                {/* ─── HERO CINEMATOGRÁFICO SCRUB / CLEAN MOBILE ─── */}
                <HeroV2 />

                {/* ─── SECCIÓN: ARQUITECTURA DEL SISTEMA ─── */}
                <section id="arquitectura" className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 space-y-16 sm:space-y-24 border-t border-neutral-100">
                    
                    {/* Header de la Arquitectura */}
                    <div className="space-y-4 max-w-3xl">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">
                            INGENIERÍA OPERATIVA · 5 CAPAS INTEGRADAS
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                            La Arquitectura de un Sistema Comercial Moderno.
                        </h2>
                        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                            No construimos páginas web decorativas. Diseñamos e implementamos la infraestructura tecnológica que conecta tus ventas, tus cobros, tu atención al cliente y tu inventario en un único circuito operativo.
                        </p>
                    </div>

                    {/* ── 01. EL FRONT-END ── */}
                    <div className="border border-neutral-200 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
                        <div className="space-y-3 pb-6 border-b border-neutral-100">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-black text-white text-[10px] font-mono uppercase rounded-md font-bold tracking-wider">
                                    CAPA 01
                                </span>
                                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
                                    CENTRO DE OPERACIONES
                                </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                01. EL FRONT-END: La Fachada Transaccional y Centro de Operaciones
                            </h3>
                            <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-3xl">
                                El punto de entrada para el cliente y la matriz de control para la empresa. No es una página estática: es un software de gestión (ERP/CRM) disfrazado de sitio web de alta conversión.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Globe className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Sitio Web / E-Commerce a Medida</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Arquitectura de alta velocidad alojada en servidores <em>serverless</em>. Diseñada para capturar leads, vender productos físicos o agendar servicios sin fricción y con carga inferior a 0.8s.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <CreditCard className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Checkout y Pasarela Integrada</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Conexiones directas a Transbank Webpay Plus y Mercado Pago. El cliente paga dentro del sitio, el dinero entra directo a la cuenta de la empresa y la base de datos se actualiza al instante.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Layers className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>CRM (Gestor de Clientes) Invisible</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Cada usuario que cotiza, inicia un pago o consulta por chat genera automáticamente una ficha de cliente. Se elimina la pérdida de contactos y el desorden de las planillas Excel.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Terminal className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>ERP y Control de Inventario/Agenda</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Panel administrativo privado donde se visualiza el stock en vivo o la disponibilidad de los especialistas. Si se vende el último cupo en la web, el sistema bloquea automáticamente esa fecha en todos los canales.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── 02. EL CEREBRO ── */}
                    <div className="border border-neutral-200 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
                        <div className="space-y-3 pb-6 border-b border-neutral-100">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-black text-white text-[10px] font-mono uppercase rounded-md font-bold tracking-wider">
                                    CAPA 02
                                </span>
                                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
                                    ATENCIÓN &amp; RAG EN TIEMPO REAL
                                </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                02. EL CEREBRO: Inteligencia Artificial Omnicanal (Prompt + RAG)
                            </h3>
                            <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-3xl">
                                El motor que reemplaza a un equipo de atención al cliente tradicional, operando 24/7 en WhatsApp, Instagram, Facebook Messenger y el sitio web.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <MessageSquare className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Identidad de Marca (El Prompt)</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    El asistente asume el tono exacto de la empresa (formal para clínicas, dinámico para retail). Detecta el idioma del cliente y responde con máxima concisión, diseñado para lectura rápida en móviles.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Cpu className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Fuente de Verdad en Tiempo Real (Sistema RAG)</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    La IA consulta la base de datos milisegundos antes de responder. Lee el catálogo, el stock y los precios vigentes. Tiene estrictamente prohibido inventar información o calcular tarifas por su cuenta.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Zap className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Protocolo de Derivación (Handoff)</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Si un prospecto es de alto valor o el cliente exige hablar con un humano, el bot pausa su ejecución, avisa al cliente y envía una alerta inmediata al equipo de ventas.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Smartphone className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Panel LiveChat Unificado</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    El equipo humano supervisa todos los canales desde una sola pantalla, con la capacidad de intervenir, pausar al bot con un clic y cerrar ventas complejas en vivo.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── 03. EL MOTOR LOGÍSTICO ── */}
                    <div className="border border-neutral-200 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
                        <div className="space-y-3 pb-6 border-b border-neutral-100">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-black text-white text-[10px] font-mono uppercase rounded-md font-bold tracking-wider">
                                    CAPA 03
                                </span>
                                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
                                    AUTOMATIZACIÓN &amp; NOTIFICACIONES
                                </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                03. EL MOTOR LOGÍSTICO: Automatizaciones y Notificaciones 360°
                            </h3>
                            <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-3xl">
                                El sistema que persigue ventas caídas y asegura la asistencia de los clientes conectando webhooks, bases de datos y APIs de mensajería (WhatsApp Cloud y SMTP).
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <ShoppingCart className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Recuperación de Carritos y Reservas</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Un monitor en segundo plano detecta usuarios que abandonaron el proceso de pago. A los 20 minutos, despacha un mensaje automático por WhatsApp ofreciendo asistencia o un link directo para finalizar la compra.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Workflow className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Alertas Internas de Venta</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Cada vez que ingresa un pago exitoso, el dueño o el gerente comercial recibe una notificación inmediata en su WhatsApp privado con el monto, nombre del cliente y servicio adquirido.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Clock className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Confirmaciones y Vouchers (Email SMTP)</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Emisión instantánea de boletas, comprobantes PDF, tickets con códigos QR o manuales de preparación directamente a la bandeja de entrada del cliente.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Recordatorios Logísticos y Anti No-Show</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    24 horas antes de una cita médica, un vuelo o un despacho, el sistema envía un recordatorio automático por WhatsApp con la geolocalización, checklist de preparación y un botón para confirmar asistencia.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── 04. LA INFRAESTRUCTURA GROWTH ── */}
                    <div className="border border-neutral-200 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm">
                        <div className="space-y-3 pb-6 border-b border-neutral-100">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-black text-white text-[10px] font-mono uppercase rounded-md font-bold tracking-wider">
                                    CAPA 04
                                </span>
                                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
                                    DATOS, ATRIBUCIÓN &amp; POSICIONAMIENTO
                                </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
                                04. LA INFRAESTRUCTURA GROWTH: Atribución, Datos y Posicionamiento
                            </h3>
                            <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-3xl">
                                El ecosistema de marketing integrado desde el código base para optimizar la inversión publicitaria y el posicionamiento orgánico de tu negocio.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <BarChart3 className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Píxeles y Conversions API (CAPI)</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Conexión directa del servidor a Meta y TikTok. Los eventos de compra se envían burlando los bloqueadores de anuncios (ad-blockers) y las restricciones de iOS, garantizando que el algoritmo optimice la pauta con datos 100% reales.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Globe className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>Analítica Web y Mapas de Calor</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Integración de Google Analytics 4 para el rastreo del embudo y Microsoft Clarity para grabar sesiones de usuarios, detectando exactamente dónde hacen clic y por qué abandonan el sitio.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Workflow className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>SEO Programático</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Generación de URLs dinámicas a gran escala para capturar búsquedas hiperespecíficas en Google (ej. servicios por comuna o combinaciones de productos).
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5">
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Cpu className="w-4 h-4 text-neutral-700 shrink-0" />
                                    <span>GEO (Generative Engine Optimization)</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Implementación de protocolos técnicos (<code className="font-mono text-[11px] bg-neutral-200 px-1 py-0.5 rounded">llms.txt</code>) en la raíz del servidor para que motores como ChatGPT, Claude y Perplexity indexen a la empresa y la recomienden directamente a sus usuarios.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── 05. LA DEMOSTRACIÓN: EL ENTORNO SANDBOX ─── */}
                <section id="sandbox" className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 border-t border-neutral-100">
                    <div className="border-2 border-neutral-900 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 space-y-8 shadow-xl relative overflow-hidden">
                        <div className="hidden sm:block absolute top-0 right-0 bg-neutral-900 text-white text-[10px] font-mono uppercase px-4 py-1.5 rounded-bl-xl font-bold tracking-widest">
                            ENTORNO EN VIVO
                        </div>

                        <div className="space-y-4 max-w-3xl">
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-black text-white text-[10px] font-mono uppercase rounded-md font-bold tracking-wider">
                                    CAPA 05
                                </span>
                                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
                                    BANCO DE PRUEBAS
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                                05. LA DEMOSTRACIÓN: El Entorno Sandbox
                            </h2>
                            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                                Un entorno en vivo donde el cliente corporativo experimenta la tecnología antes de firmar. Para comprobar la arquitectura en condiciones reales, Mercenario opera la marca técnica <strong>WEKE Studio</strong> como banco de pruebas sandbox en producción continua.
                            </p>
                        </div>

                        {/* LAS 3 PRUEBAS SANDBOX */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                            {/* PRUEBA 1 */}
                            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between space-y-6 hover:border-black transition-colors">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">TEST 01 // CHECKOUT</span>
                                        <span className="text-[9px] font-mono bg-neutral-200 px-2 py-0.5 rounded text-neutral-700 font-bold">0.8s Carga</span>
                                    </div>
                                    <h3 className="text-base font-bold text-neutral-900">Simulación Transaccional</h3>
                                    <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                        Ingresa al enlace de prueba, selecciona una prenda técnica de montaña en el catálogo interactivo y ejecuta el checkout en vivo.
                                    </p>
                                </div>
                                <Link
                                    href="/tienda"
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-black text-white text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors font-bold text-center"
                                >
                                    <ShoppingCart className="w-3.5 h-3.5" />
                                    <span>Abrir Tienda Sandbox</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            {/* PRUEBA 2 */}
                            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between space-y-6 hover:border-black transition-colors">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">TEST 02 // MENSAJERÍA</span>
                                        <span className="text-[9px] font-mono bg-neutral-200 px-2 py-0.5 rounded text-neutral-700 font-bold">RAG Vivo</span>
                                    </div>
                                    <h3 className="text-base font-bold text-neutral-900">Validación Omnicanal</h3>
                                    <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                        Escribe al WhatsApp para consultar tallas o precios. Comprueba cómo responde leyendo la base de datos viva y recibe la confirmación en tu propio celular.
                                    </p>
                                </div>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quisiera%20consultar%20el%20stock%20y%20tallas%20de%20la%20Chaqueta%20Alpina`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 hover:border-black bg-white text-black text-xs font-mono uppercase tracking-wider rounded-xl transition-colors font-bold text-center"
                                >
                                    <Smartphone className="w-3.5 h-3.5" />
                                    <span>Probar Asistente RAG</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                            </div>

                            {/* PRUEBA 3 */}
                            <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col justify-between space-y-6 hover:border-black transition-colors">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-mono text-neutral-400 uppercase font-bold">TEST 03 // MATRIZ ERP</span>
                                        <span className="text-[9px] font-mono bg-neutral-200 px-2 py-0.5 rounded text-neutral-700 font-bold">Consola Central</span>
                                    </div>
                                    <h3 className="text-base font-bold text-neutral-900">Acceso al Backend</h3>
                                    <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                        Visualización de la consola de base de datos y el panel LiveChat actualizándose sin recargar la página, comprobando la robustez de la arquitectura.
                                    </p>
                                </div>
                                <Link
                                    href="/admin"
                                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-neutral-300 hover:border-black bg-white text-black text-xs font-mono uppercase tracking-wider rounded-xl transition-colors font-bold text-center"
                                >
                                    <Terminal className="w-3.5 h-3.5" />
                                    <span>Ver Consola ERP</span>
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>

                        {/* CTA Sandbox */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-100">
                            <button
                                onClick={() => handleSelectSystemForQuote("Ecosistema Completo (Paquete Fundador: $1.8M - $2.2M CLP)")}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black text-white text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors font-bold"
                            >
                                <span>Implementar esta arquitectura en mi empresa</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* ─── TARIFARIO ─── */}
                <section id="tarifario" className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 space-y-8 sm:space-y-12 border-t border-neutral-100">
                    <div className="space-y-3 sm:space-y-4 max-w-3xl">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">
                            TARIFARIO TRANSPARENTE · SETUP ÚNICO + FEE MENSUAL
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                            Tarifario Modular sin letra chica.
                        </h2>
                        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                            Implementa módulos individuales o activa el <strong className="text-neutral-900 font-semibold">Paquete Fundador</strong> con el ecosistema completo a precio de descuento por empaquetado.
                        </p>
                    </div>

                    {/* TABLA MODULAR */}
                    <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                        <div className="bg-neutral-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                                    SETUP / PAGO ÚNICO POR IMPLEMENTACIÓN
                                </span>
                                <h3 className="text-sm sm:text-base font-bold">Desglose Modular de Infraestructura</h3>
                            </div>
                            <span className="text-xs font-mono bg-neutral-800 px-3 py-1 rounded-full text-neutral-300 font-bold">
                                Valores en CLP (+IVA)
                            </span>
                        </div>

                        <div className="divide-y divide-neutral-200">
                            {[
                                {
                                    num: "01",
                                    title: "Plataforma Web + Pasarela Webpay + ERP/CRM",
                                    desc: "Sitio web a medida en Next.js serverless que procesa pagos automáticamente y guarda cada cliente en un CRM interno. Control total de inventario y ventas.",
                                    price: "$750.000 – $1.200.000"
                                },
                                {
                                    num: "02",
                                    title: "Asistente Omnicanal RAG + Panel LiveChat Unificado",
                                    desc: "Atiende WhatsApp, Instagram y web 24/7. Conectado a la base de datos viva sin inventar precios. Incluye derivación a humano y panel centralizado.",
                                    price: "$500.000 – $850.000"
                                },
                                {
                                    num: "03",
                                    title: "Motor de Agendamiento + CRM Anti No-Show",
                                    desc: "Agenda sincronizada con bloqueo de horas, cobro de abono previo con Webpay y recordatorios automáticos por WhatsApp 24h antes.",
                                    price: "$350.000 – $600.000"
                                },
                                {
                                    num: "04",
                                    title: "Notificaciones 360° (WhatsApp Cloud API + SMTP)",
                                    desc: "Recuperación de carritos abandonados a los 20 min, alertas inmediatas de venta al celular del dueño y vouchers PDF con QR por correo.",
                                    price: "$350.000 – $550.000"
                                },
                                {
                                    num: "05",
                                    title: "Infraestructura Growth (CAPI, GA4, Clarity & GEO llms.txt)",
                                    desc: "Meta CAPI server-side antibloqueadores, mapas de calor Clarity, SEO programático y protocolo GEO para indexación en ChatGPT y Claude.",
                                    price: "$400.000 – $700.000"
                                },
                            ].map((m) => (
                                <div key={m.num} className="p-5 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6 hover:bg-neutral-50/60 transition-colors">
                                    <div className="space-y-2 max-w-2xl">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-neutral-900 shrink-0" />
                                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                                                Capa {m.num}
                                            </span>
                                        </div>
                                        <h4 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug">{m.title}</h4>
                                        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                                            <em>{m.desc}</em>
                                        </p>
                                    </div>
                                    <div className="text-left md:text-right shrink-0 bg-neutral-50 md:bg-transparent p-3 sm:p-4 md:p-0 rounded-xl w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end gap-2">
                                        <span className="text-[10px] font-mono text-neutral-400 uppercase">Inversión Setup · Pago único</span>
                                        <span className="text-base sm:text-lg md:text-xl font-mono font-bold text-neutral-900 block whitespace-nowrap">{m.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-neutral-100 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-3 border-t border-neutral-300">
                            <div>
                                <span className="text-[11px] sm:text-xs font-mono text-neutral-500 uppercase block">
                                    Total contratado por módulos sueltos:
                                </span>
                                <span className="text-lg sm:text-2xl font-mono font-bold text-neutral-900 line-through decoration-red-500 decoration-2">
                                    $2.350.000 – $3.900.000 CLP
                                </span>
                            </div>
                            <span className="text-xs text-neutral-600 font-light">
                                Comprar la tecnología suelta resulta más costoso e ineficiente.
                            </span>
                        </div>
                    </div>

                    {/* PAQUETE FUNDADOR */}
                    <div className="border-2 border-neutral-900 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl space-y-6 sm:space-y-8 relative overflow-hidden">
                        <div className="hidden sm:block absolute top-0 right-0 bg-neutral-900 text-white text-[10px] font-mono uppercase px-4 py-1.5 rounded-bl-xl font-bold tracking-widest">
                            OPCIÓN RECOMENDADA · AHORRO HASTA 40%
                        </div>

                        <div className="space-y-3 sm:space-y-4 max-w-3xl">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-600 font-bold block">
                                EL PAQUETE FUNDADOR · ARQUITECTURA COMPLETA
                            </span>
                            <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                                Todo el sistema en un solo Setup.
                            </h3>
                            <p className="text-xs sm:text-base text-neutral-700 leading-relaxed font-light">
                                Al contratar la implementación total del ecosistema Mercenario en un solo proyecto, el setup se empaqueta con un descuento directo de hasta <strong className="font-semibold text-neutral-900">$1.700.000 CLP</strong>.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center p-4 sm:p-6 bg-neutral-50 rounded-2xl border border-neutral-200 shadow-sm">
                            <div className="md:col-span-7 space-y-2">
                                <span className="text-[10px] sm:text-xs font-mono text-neutral-600 font-bold uppercase">
                                    5 CAPAS INTEGRADAS · SETUP TOTAL
                                </span>
                                <div className="text-2xl sm:text-4xl md:text-5xl font-mono font-black text-neutral-900 tracking-tight leading-none py-1">
                                    $1.800.000 <span className="text-base sm:text-lg text-neutral-400 font-normal">–</span> $2.200.000 <span className="text-xs font-sans text-neutral-500 font-normal">CLP</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light">
                                    Entrega 100% operativa en 14 a 21 días hábiles con garantía de funcionamiento.
                                </p>
                            </div>

                            <div className="md:col-span-5 flex flex-col gap-2.5 sm:gap-3 w-full">
                                <button
                                    onClick={() => handleSelectSystemForQuote("Ecosistema Completo (Paquete Fundador: $1.8M - $2.2M CLP)")}
                                    className="w-full px-5 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider rounded-xl transition-all font-bold text-center shadow-md flex items-center justify-center gap-2"
                                >
                                    <span>Postular al Paquete Fundador</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20me%20interesa%20conversar%20sobre%20el%20Paquete%20Fundador`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-center text-xs font-mono text-neutral-600 hover:text-black underline py-1"
                                >
                                    Hablar directamente por WhatsApp
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 pt-2 text-xs text-neutral-700">
                            {[
                                "Sitio Web Next.js a medida autoadministrable (0.8s de carga).",
                                "Asistente RAG en WhatsApp oficial con panel LiveChat unificado.",
                                "Checkout Webpay Plus y Mercado Pago integrado.",
                                "Notificaciones automáticas (recuperación de carritos + alertas de venta).",
                                "CAPI Server-side, GA4, Clarity y protocolo GEO llms.txt.",
                                "Capacitación presencial/virtual al personal y soporte prioritario.",
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
                                    <Check className="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MENSUALIDAD */}
                    <div className="border border-neutral-200 bg-neutral-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 space-y-6 sm:space-y-8 shadow-lg">
                        <div className="space-y-2 sm:space-y-3 max-w-3xl">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">
                                MANTENIMIENTO OPERATIVO MENSUAL
                            </span>
                            <h3 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                                La Mensualidad: $150.000 a $250.000 CLP / mes.
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                                Es el costo de mantener una infraestructura corporativa operando en piloto automático: servidores Edge, Meta Cloud API, base Postgres, RAG actualizado y soporte prioritario.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            <div className="p-4 sm:p-5 bg-neutral-800/80 rounded-2xl border border-neutral-700 space-y-2">
                                <CreditCard className="w-5 h-5 text-neutral-300" />
                                <h4 className="text-sm font-bold text-white">Nube &amp; Base Postgres</h4>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                                    Servidores Edge para tu web Next.js y respaldos automáticos diarios en Supabase.
                                </p>
                            </div>

                            <div className="p-4 sm:p-5 bg-neutral-800/80 rounded-2xl border border-neutral-700 space-y-2">
                                <Smartphone className="w-5 h-5 text-neutral-300" />
                                <h4 className="text-sm font-bold text-white">APIs Oficiales de Meta Cloud</h4>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                                    Webhooks de WhatsApp oficial, tokens seguros, plantillas transaccionales y cero riesgo de baneo.
                                </p>
                            </div>

                            <div className="p-4 sm:p-5 bg-neutral-800/80 rounded-2xl border border-neutral-700 space-y-2">
                                <CheckCircle2 className="w-5 h-5 text-neutral-300" />
                                <h4 className="text-sm font-bold text-white">Soporte Continuo &amp; RAG</h4>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                                    Ajustes en la base RAG al cambiar precios, monitoreo 99.9% de uptime y soporte técnico prioritario.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── CONTACTO DIRECTO ─── */}
                <motion.section 
                    id="contacto" 
                    initial={{ opacity: 0 }} 
                    whileInView={{ opacity: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.8 }} 
                    className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 border-t border-neutral-100"
                >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                        <div className="md:col-span-5 space-y-5 sm:space-y-6">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">CONTACTO DIRECTO</span>
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                                Conversemos sobre tu sistema.
                            </h2>
                            <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
                                Evaluamos tu flujo comercial y te entregamos la propuesta formal con plazos y valores exactos en CLP.
                            </p>
                            
                            <div className="space-y-3 sm:space-y-4 pt-4 border-t border-neutral-100 text-xs text-neutral-600 font-light">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                                    <span>Implementación en 14 a 21 días hábiles</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-neutral-600 shrink-0" />
                                    <span>Garantía de operatividad y capacitación incluida</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0" />
                                    <span>Sin costos sorpresa ni comisiones intermedias</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <a 
                                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quisiera%20cotizar%20un%20sistema%20operativo%20para%20mi%20empresa`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 sm:py-3 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-colors text-center shadow-sm"
                                >
                                    <Smartphone className="w-4 h-4 shrink-0" />
                                    <span>Escribir por WhatsApp Directo</span>
                                </a>
                            </div>
                        </div>

                        {/* Formulario */}
                        <div className="md:col-span-7 bg-white p-5 sm:p-8 md:p-10 border border-neutral-200 rounded-2xl sm:rounded-3xl shadow-sm">
                            {formStatus === "success" ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                                        <Check className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-black">Solicitud Recibida</h3>
                                    <p className="text-xs text-neutral-500 max-w-sm leading-relaxed font-light">
                                        Te contactaremos vía WhatsApp o correo en menos de 2 horas hábiles con el detalle de la arquitectura para tu empresa.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
                                    <input 
                                        type="text" 
                                        name="_company_site" 
                                        value={formData._honeypot} 
                                        onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })} 
                                        className="hidden" 
                                        tabIndex={-1} 
                                        autoComplete="off" 
                                    />

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
                                                Nombre o Empresa *
                                            </label>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="Ej. Matías Silva - Empresa X"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
                                                    Correo Electrónico *
                                                </label>
                                                <input 
                                                    type="email" 
                                                    required
                                                    placeholder="contacto@tuempresa.cl"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
                                                    Teléfono / WhatsApp *
                                                </label>
                                                <input 
                                                    type="tel" 
                                                    required
                                                    placeholder="+56 9 1234 5678"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
                                                Capa o Paquete de Interés *
                                            </label>
                                            <select 
                                                value={formData.system}
                                                onChange={(e) => setFormData({ ...formData, system: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors bg-white"
                                            >
                                                <option value="Paquete Fundador (Arquitectura Completa: $1.8M - $2.2M CLP)">★ Paquete Fundador (Arquitectura Completa: $1.8M – $2.2M CLP)</option>
                                                <option value="01. El Front-End: Web + Pagos + ERP ($750K - $1.2M CLP)">01. El Front-End: Web + Pagos + ERP ($750K – $1.2M CLP)</option>
                                                <option value="02. El Cerebro: IA Omnicanal + LiveChat ($500K - $850K CLP)">02. El Cerebro: IA Omnicanal + LiveChat ($500K – $850K CLP)</option>
                                                <option value="03. Motor Logístico: Agendamiento & CRM ($350K - $600K CLP)">03. Motor Logístico: Agendamiento &amp; CRM ($350K – $600K CLP)</option>
                                                <option value="04. Automatizaciones 360° ($350K - $550K CLP)">04. Automatizaciones 360° ($350K – $550K CLP)</option>
                                                <option value="05. Infraestructura Growth & CAPI ($400K - $700K CLP)">05. Infraestructura Growth &amp; CAPI ($400K – $700K CLP)</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 block">
                                                ¿Cuál es el mayor cuello de botella en tu operación hoy?
                                            </label>
                                            <textarea 
                                                rows={3}
                                                placeholder="Ej. Perdemos ventas fuera de horario, la gente no asiste a sus citas, o tenemos desorden en el inventario..."
                                                value={formData.challenge}
                                                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={formStatus === "loading"}
                                        className="w-full py-4 bg-black text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm font-mono"
                                    >
                                        {formStatus === "loading" ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                <span>Enviando información...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Solicitar Cotización Formal</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>

                                    {formStatus === "error" && (
                                        <p className="text-xs text-red-600 text-center font-mono">
                                            Error al enviar. Por favor escríbenos directamente por WhatsApp.
                                        </p>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </motion.section>
            </main>

            {/* ─── FOOTER ─── */}
            <footer className="w-full border-t border-neutral-100 bg-[#FCFCFC] py-10 sm:py-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-mono text-neutral-400 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full shrink-0" />
                        <span className="text-black font-semibold tracking-wider uppercase">MERCENARIO // INFRAESTRUCTURA OPERATIVA &amp; SOFTWARE</span>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center">
                        <a href="#arquitectura" className="hover:text-black transition-colors font-bold text-neutral-800">Arquitectura</a>
                        <a href="#sandbox" className="hover:text-black transition-colors font-bold text-neutral-800">Sandbox</a>
                        <a href="#tarifario" className="hover:text-black transition-colors font-bold text-neutral-900">Tarifario CLP</a>
                        <Link href="/tienda" className="hover:text-black text-neutral-700 transition-colors">Tienda Sandbox</Link>
                        <Link href="/admin" className="hover:text-black transition-colors">Consola ERP</Link>
                        <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">WhatsApp</a>
                    </div>

                    <span>© {new Date().getFullYear()} Mercenario Technologies. Santiago, Chile.</span>
                </div>
            </footer>

            {/* ─── WIDGET WHATSAPP ─── */}
            <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
                {/* Mobile */}
                <a
                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20estoy%20viendo%20la%20arquitectura%20de%20Mercenario%20y%20quiero%20hacer%20una%20consulta`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contactar por WhatsApp"
                    className="sm:hidden flex items-center justify-center w-12 h-12 bg-black text-white rounded-full shadow-2xl border border-neutral-700 active:scale-95 transition-transform"
                >
                    <Smartphone className="w-5 h-5" />
                </a>

                {/* Tablet / Desktop */}
                <a
                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20estoy%20viendo%20la%20arquitectura%20de%20Mercenario%20y%20quiero%20hacer%20una%20consulta`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-mono rounded-full shadow-2xl border border-neutral-700 transition-all hover:scale-105"
                >
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>WhatsApp Directo</span>
                    <Smartphone className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}
