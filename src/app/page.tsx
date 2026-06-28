"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { 
    Crosshair, 
    ChevronRight, 
    Activity, 
    Truck, 
    ShoppingCart, 
    Coffee, 
    Dog, 
    Dumbbell, 
    Wrench, 
    Cpu, 
    ExternalLink,
    TrendingUp,
    Database,
    Zap,
    CreditCard,
    BarChart3,
    Compass,
    ArrowRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
    const [formData, setFormData] = useState({ name: "", email: "", challenge: "", budget: "" });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const videoRef = useRef<HTMLVideoElement>(null);

    const projects = [
        { title: "NeuroV", cat: "Inteligencia Artificial & UX", desc: "SaaS médico automatizado para clínicas estéticas.", link: "https://neuro-v.vercel.app/", bg: "bg-neutral-950 border-mercenario-danger/20", image: "/imagenes/ejecutados/neuroV.jpeg" },
        { title: "SocialMotors", cat: "E-commerce & Estrategia", desc: "Plataforma de ventas y embudo de conversión automotriz.", link: "https://www.socialmotors.cl/", bg: "bg-neutral-950 border-white/[0.03]", image: "/imagenes/ejecutados/socialmotors.jpeg" },
        { title: "Valet PRT", cat: "SaaS & Operaciones", desc: "Sistema de gestión y recepción automatizada de vehículos.", link: "https://socialmotors.cl/valet", bg: "bg-neutral-950 border-white/[0.03]", image: "/imagenes/ejecutados/valetPRT.jpeg" },
        { title: "PaseaLove", cat: "E-commerce & Servicios", desc: "Plataforma de reserva y cuidado de mascotas con rastreo.", link: "https://www.pasealove.cl/", bg: "bg-neutral-950 border-white/[0.03]", image: "/imagenes/ejecutados/PaseaLove.jpeg" }
    ];

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.defaultMuted = true;
            videoRef.current.muted = true;
            videoRef.current.play().catch(e => console.log("Autoplay blocked:", e));
        }
    }, []);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("loading");
        const { error } = await supabase
            .from("leads")
            .insert([{ name: formData.name, email: formData.email, challenge: formData.challenge, budget: formData.budget }]);

        if (error) {
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 4000);
        } else {
            setFormStatus("success");
            setFormData({ name: "", email: "", challenge: "", budget: "" });
            setTimeout(() => setFormStatus("idle"), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-[#010101] text-white font-sans antialiased flex flex-col items-center relative overflow-hidden selection:bg-mercenario-danger selection:text-white">
            
            {/* Ambient Lights */}
            <div className="absolute top-[-10%] left-[50%] translate-x-[-50%] w-[1000px] h-[350px] bg-mercenario-danger/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Header */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-white/[0.05] bg-[#010101]/60 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                        <Crosshair className="w-5 h-5 text-mercenario-danger animate-pulse" />
                        <span className="text-sm font-black font-mono tracking-wider text-white uppercase flex items-center gap-1">
                            MERCENARIO <span className="text-gray-600">|</span> <span className="text-[9px] text-gray-400 font-normal">INTELLIGENT OS_</span>
                        </span>
                    </div>
                    <Link href="#contacto" className="px-4 py-2 bg-mercenario-danger text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest rounded hover:bg-red-700 transition-all duration-300 font-mono">
                        DIAGNÓSTICO_
                    </Link>
                </div>
            </header>

            <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-32 z-10 flex flex-col items-center">

                {/* HERO - NIVEL 1 */}
                <section className="text-center max-w-4xl pt-14 md:pt-24 pb-16 space-y-5 flex flex-col items-center relative w-full rounded-2xl overflow-hidden mt-6 border border-white/[0.03]">
                    <video ref={videoRef} src="/imagenes/Bala_Rodando_Sobre_Mesa_Oscura.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-[1.20] translate-x-[4%] opacity-40 -z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010101]/60 to-[#010101] -z-10" />

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-1.5 border border-mercenario-danger/30 px-4 py-1.5 bg-mercenario-danger/10 rounded text-[10px] sm:text-[11px] font-bold text-mercenario-danger tracking-widest uppercase mb-2 font-mono relative z-10">
                        | SISTEMA OPERATIVO INTELIGENTE DE NEGOCIOS |
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.05] text-white font-mono uppercase z-10 mt-10">
                        La infraestructura operativa<br />
                        <span className="text-mercenario-danger">donde funciona tu empresa.</span>
                    </h1>

                    <p className="text-neutral-400 text-sm max-w-2xl mx-auto leading-relaxed px-2 font-mono z-10 mt-6">
                        Una sola plataforma. Un solo flujo de datos. Una sola fuente de verdad. Centralizamos toda tu operación, ventas, finanzas e inteligencia artificial sobre un único núcleo operativo estable y escalable: Mercenario OS.
                    </p>

                    <div className="pt-6 z-10">
                        <a href="#contacto" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-black text-[10px] sm:text-[11px] uppercase tracking-widest hover:bg-mercenario-danger hover:text-white transition-all rounded font-mono">
                            <span>EVALUAR INFRAESTRUCTURA_</span>
                            <ChevronRight className="w-4 h-4" />
                        </a>
                    </div>
                </section>

                {/* 3D LOGO CAROUSEL - NIVEL 4 (HERRAMIENTAS E INTEGRACIONES) */}
                <section className="w-full bg-[#000] border-y border-white/[0.02] overflow-hidden relative mt-8 md:mt-16 min-h-[140px] sm:min-h-[160px] flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 grayscale blur-[1px]">
                        <div className="w-full scale-[0.65] sm:scale-[0.75] origin-center -translate-y-2 sm:-translate-y-4">
                            <motion.div 
                                className="flex flex-nowrap"
                                animate={{ x: ["-50%", "0%"] }}
                                transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
                            >
                                <div className="flex gap-10 sm:gap-16 items-center flex-shrink-0 pr-10 sm:pr-16">
                                    <img src="/imagenes/logotipo/google_ads.svg" alt="Google Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/instagram.svg" alt="Instagram Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/tiktok.svg" alt="TikTok Ads" className="h-11 sm:h-13 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/descarga (1).png" alt="Meta Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/antigravity-color.png" alt="Antigravity" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/gemini_star.svg" alt="Gemini" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/DeepSeek.png" alt="DeepSeek" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/chat gpt.png" alt="ChatGPT" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/whatsapp_business.svg" alt="WhatsApp Business" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                </div>
                                <div className="flex gap-10 sm:gap-16 items-center flex-shrink-0 pr-10 sm:pr-16">
                                    <img src="/imagenes/logotipo/google_ads.svg" alt="Google Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/instagram.svg" alt="Instagram Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/tiktok.svg" alt="TikTok Ads" className="h-11 sm:h-13 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/descarga (1).png" alt="Meta Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/antigravity-color.png" alt="Antigravity" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/gemini_star.svg" alt="Gemini" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/DeepSeek.png" alt="DeepSeek" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/chat gpt.png" alt="ChatGPT" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/whatsapp_business.svg" alt="WhatsApp Business" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    <div 
                        className="absolute inset-0 flex items-center overflow-hidden z-10"
                        style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)' }}
                    >
                        <motion.div 
                            className="flex flex-nowrap"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                        >
                            <div className="flex gap-10 sm:gap-16 items-center flex-shrink-0 pr-10 sm:pr-16 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                <img src="/imagenes/logotipo/google_ads.svg" alt="Google Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/instagram.svg" alt="Instagram Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/tiktok.svg" alt="TikTok Ads" className="h-11 sm:h-13 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/descarga (1).png" alt="Meta Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/antigravity-color.png" alt="Antigravity" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/gemini_star.svg" alt="Gemini" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/DeepSeek.png" alt="DeepSeek" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/chat gpt.png" alt="ChatGPT" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/whatsapp_business.svg" alt="WhatsApp Business" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                            </div>
                            <div className="flex gap-10 sm:gap-16 items-center flex-shrink-0 pr-10 sm:pr-16 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                <img src="/imagenes/logotipo/google_ads.svg" alt="Google Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/instagram.svg" alt="Instagram Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/tiktok.svg" alt="TikTok Ads" className="h-11 sm:h-13 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/descarga (1).png" alt="Meta Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/antigravity-color.png" alt="Antigravity" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/gemini_star.svg" alt="Gemini" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/DeepSeek.png" alt="DeepSeek" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/chat gpt.png" alt="ChatGPT" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/whatsapp_business.svg" alt="WhatsApp Business" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />
                </section>

                {/* EL MANIFIESTO OPERATIVO - NIVEL 1.5 */}
                <section className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 border border-mercenario-danger/30 bg-mercenario-danger/10 px-3 py-1 rounded-full mb-2">
                        <div className="w-2 h-2 rounded-full bg-mercenario-danger animate-pulse"></div>
                        <span className="text-[10px] font-mono text-mercenario-danger uppercase tracking-widest font-bold">Mercenario iOS</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black font-mono uppercase text-white leading-tight">
                        Mercenario no es otro software.
                    </h2>
                    <p className="font-mono text-xs sm:text-sm text-neutral-400 max-w-3xl mx-auto leading-relaxed space-y-4">
                        Las empresas no dejan de crecer porque les falten herramientas. Dejan de crecer porque cada área trabaja sobre sistemas distintos, los datos se duplican, las decisiones llegan tarde y la operación pierde sincronía.
                        <br /><br />
                        Durante años, la solución fue comprar más software. Un CRM para vender. Un ERP para administrar. Un sistema para facturar. Otro para automatizar. El resultado nunca fue una empresa más eficiente; fue una empresa más compleja.
                        <br /><br />
                        Mercenario iOS nace para cambiar ese paradigma. No construimos aplicaciones aisladas ni integraciones frágiles. Construimos la infraestructura donde opera tu empresa, unificando clientes, finanzas, automatización e inteligencia artificial sobre un único núcleo operativo estable.
                    </p>
                </section>

                {/* LAS 7 CAPAS DEL SISTEMA - NIVEL 2 & 3 */}
                <section className="w-full mt-12 space-y-16">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl md:text-4xl font-black font-mono tracking-wider uppercase text-white">LAS 7 CAPAS OPERATIVAS_</h2>
                        <p className="text-xs sm:text-sm text-neutral-400 font-mono max-w-2xl mx-auto">
                            Toda empresa que escala necesita siete sistemas fundamentales trabajando sincronizados como un solo ecosistema.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            { 
                                n: "01", title: "Adquisición (Capa de Crecimiento)", 
                                icon: TrendingUp,
                                content: "SEO local, pauta en Meta/Google, embudos de conversión y campañas de referidos integradas.",
                                purpose: "Generar demanda predecible y atraer prospectos calificados directo al núcleo." 
                            },
                            { 
                                n: "02", title: "Inteligencia (Capa Autónoma)", 
                                icon: Cpu,
                                content: "Agentes autónomos de atención en WhatsApp y flujos de pre-calificación basados en IA.",
                                purpose: "Responder al instante, pre-calificar prospectos e inyectar leads listos al CRM sin intervención humana." 
                            },
                            { 
                                n: "03", title: "Operación (Capa de Datos Central)", 
                                icon: Database,
                                content: "Ficha única digital de clientes, control de inventarios, gestión de proyectos e historial unificado.",
                                purpose: "Centralizar la información operativa para eliminar silos de datos y duplicidad de tareas." 
                            },
                            { 
                                n: "04", title: "Automatización (Capa de Sincronía)", 
                                icon: Zap,
                                content: "Flujos lógicos, recordatorios automáticos de citas, alertas de cobro y notificaciones internas.",
                                purpose: "Eliminar el trabajo manual repetitivo y asegurar que ningún proceso se detenga." 
                            },
                            { 
                                n: "05", title: "Finanzas (Capa Transaccional)", 
                                icon: CreditCard,
                                content: "Integración directa de facturación SII, pasarelas de pago (Stripe/Transbank) y links de cobro.",
                                purpose: "Cobrar sin fricciones y asegurar que toda transacción emita la documentación legal de inmediato." 
                            },
                            { 
                                n: "06", title: "Inteligencia de Negocio (Capa Analítica)", 
                                icon: BarChart3,
                                content: "Dashboards unificados en tiempo real, métricas de rendimiento y conversión del equipo.",
                                purpose: "Visualizar el comportamiento de tu negocio de forma consolidada desde cualquier dispositivo." 
                            },
                        ].map((pilar, i) => (
                            <div key={i} className="flex flex-col justify-between gap-4 p-6 bg-[#030303] border border-white/[0.03] rounded-lg hover:border-white/10 hover:-translate-y-1 transition-all duration-300 group">
                                <div>
                                    <div className="flex items-center gap-3 border-b border-white/[0.05] pb-4">
                                        <div className="p-2 border border-white/5 rounded bg-[#010101]">
                                            <pilar.icon className="w-5 h-5 text-mercenario-danger" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-black font-mono text-white/10 block">{pilar.n}_</span>
                                            <h3 className="font-mono font-bold text-white uppercase text-xs sm:text-sm">{pilar.title}</h3>
                                        </div>
                                    </div>
                                    <div className="space-y-3 mt-4">
                                        <div>
                                            <p className="text-[9px] text-mercenario-danger font-bold uppercase tracking-widest mb-1">Capacidades:</p>
                                            <p className="font-mono text-xs text-neutral-400 leading-relaxed">{pilar.content}</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Impacto:</p>
                                            <p className="font-mono text-xs text-neutral-400 leading-relaxed">{pilar.purpose}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-5xl mx-auto bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-lg flex flex-col md:flex-row items-center gap-6 group">
                        <div className="p-4 border border-emerald-500/20 rounded bg-[#010101] flex items-center justify-center">
                            <Compass className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div className="flex-1 space-y-3 w-full">
                            <div className="border-b border-emerald-500/20 pb-3">
                                <span className="text-xs font-black font-mono text-emerald-500/30 block">07_</span>
                                <h3 className="font-mono font-bold text-emerald-500 uppercase text-lg">Dirección (Capa de Control Gerencial / P&L)</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <div>
                                    <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Capacidades:</p>
                                    <p className="font-mono text-xs text-neutral-300 leading-relaxed">Cálculo automatizado de rentabilidad neta (P&L), métricas cruzadas de costos de adquisición y márgenes operativos.</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Impacto:</p>
                                    <p className="font-mono text-xs text-neutral-300 leading-relaxed">Entregar visibilidad absoluta del negocio al tomador de decisiones para guiar el crecimiento con datos reales.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONFIGURACIONES OPERATIVAS - NIVEL 3 */}
                <section className="w-full mt-32 space-y-12">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl md:text-3xl font-black font-mono tracking-wider uppercase text-white">¿CÓMO OPERA TU EMPRESA?_</h2>
                        <p className="text-xs text-neutral-500 font-mono max-w-2xl mx-auto">
                            Una sola infraestructura. Múltiples operaciones. Activamos configuraciones (Stacks) prediseñadas sobre el mismo núcleo de Mercenario iOS para tu modelo de negocio.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { icon: Activity, color: "text-blue-500", bg: "bg-blue-500/5", hover: "group-hover:bg-blue-500/10", borderHover: "hover:border-blue-500/50", title: "Health Stack", desc: "Configuración para salud. Agendamiento, fichas clínicas integradas e historial médico digital.", os: "HEALTH OS" },
                            { icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-500/5", hover: "group-hover:bg-purple-500/10", borderHover: "hover:border-purple-500/50", title: "Commerce Stack", desc: "Configuración comercial. Control de omni-inventarios, POS físico y boleta SII automatizada.", os: "COMMERCE OS" },
                            { icon: Truck, color: "text-emerald-500", bg: "bg-emerald-500/5", hover: "group-hover:bg-emerald-500/10", borderHover: "hover:border-emerald-500/50", title: "Field Stack", desc: "Configuración operativa móvil. Hojas de ruta, firma digital en terreno y control logístico.", os: "FIELD OS" },
                            { icon: Coffee, color: "text-orange-500", bg: "bg-orange-500/5", hover: "group-hover:bg-orange-500/10", borderHover: "hover:border-orange-500/50", title: "Gastro Stack", desc: "Configuración para gastronomía. Comandas digitales, control de mesas y POS integrado.", os: "GASTRO OS" },
                            { icon: Dog, color: "text-teal-500", bg: "bg-teal-500/5", hover: "group-hover:bg-teal-500/10", borderHover: "hover:border-teal-500/50", title: "Pet Stack", desc: "Configuración veterinaria. Agenda de control, ficha única por mascota y recordatorios inteligentes.", os: "PET OS" },
                            { icon: Dumbbell, color: "text-red-500", bg: "bg-red-500/5", hover: "group-hover:bg-red-500/10", borderHover: "hover:border-red-500/50", title: "Fit Stack", desc: "Configuración recurrente. Cobro automático de membresías, control de aforo y alertas.", os: "FIT OS" },
                            { icon: Wrench, color: "text-yellow-500", bg: "bg-yellow-500/5", hover: "group-hover:bg-yellow-500/10", borderHover: "hover:border-yellow-500/50", title: "Technical Stack", desc: "Configuración de servicios. Órdenes de trabajo, asignación de técnicos e incidencias.", os: "TECH OS" },
                            { icon: Cpu, color: "text-neutral-400", bg: "bg-neutral-500/5", hover: "group-hover:bg-neutral-500/10", borderHover: "hover:border-neutral-500/50", title: "Custom Stack", desc: "Arquitectura a la medida de tu modelo de negocio si requieres flujos y sistemas altamente complejos.", os: "CUSTOM OS" },
                        ].map((ind, i) => (
                            <div key={i} className={`group p-6 bg-[#040404] border border-white/[0.05] rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${ind.borderHover}`}>
                                <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl rounded-full transition-colors ${ind.bg} ${ind.hover}`} />
                                <div>
                                    <ind.icon className={`w-8 h-8 mb-4 ${ind.color}`} />
                                    <h3 className="font-mono text-sm font-black text-white uppercase mb-2">{ind.title}</h3>
                                    <p className="font-mono text-[10px] text-neutral-400 leading-relaxed mb-6">{ind.desc}</p>
                                </div>
                                <span className={`font-mono text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform ${ind.color}`}>CONFIGURACIÓN: {ind.os} <ChevronRight className="w-3 h-3" /></span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CARRUSEL DE CASOS REALES / MISIONES */}
                <section className="w-full pt-20 md:pt-32 flex flex-col items-center">
                    <div className="text-center space-y-1 z-10 mb-4 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-black font-mono tracking-wider uppercase text-white">SISTEMAS_EN_MARCHA_</h2>
                        <p className="text-[10px] sm:text-[11px] text-neutral-600 font-mono">Bitácora de despliegues y experiencia de uso en producción</p>
                    </div>

                    <div className="relative w-full flex overflow-hidden border-y border-white/[0.02] bg-[#020202]/50 py-4 sm:py-10">
                        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-48 bg-gradient-to-r from-[#010101] to-transparent z-20 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-48 bg-gradient-to-l from-[#010101] to-transparent z-20 pointer-events-none" />

                        <motion.div 
                            className="flex gap-4 sm:gap-8 px-4"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                ease: "linear",
                                duration: 40,
                                repeat: Infinity
                            }}
                        >
                            {[...projects, ...projects, ...projects, ...projects].map((project, idx) => (
                                <a 
                                    key={idx}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col flex-shrink-0 w-[200px] sm:w-[260px] md:w-[300px] group/card cursor-pointer"
                                >
                                    <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden border border-white/[0.05] group-hover/card:border-mercenario-danger/40 group-hover/card:shadow-[0_0_30px_rgba(255,17,34,0.15)] transition-all duration-500 mb-8 sm:mb-10">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top opacity-70 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-[#010101]/20 group-hover/card:bg-transparent transition-colors duration-500 pointer-events-none" />
                                    </div>
                                    <div className="flex flex-col px-1">
                                        <div className="flex justify-between items-start mb-1 sm:mb-2">
                                            <p className="text-[8px] sm:text-[9px] font-bold font-mono text-mercenario-danger tracking-widest uppercase">{project.cat}</p>
                                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-white opacity-50 group-hover/card:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        <h3 className="text-sm sm:text-base md:text-lg font-black font-mono text-white group-hover/card:text-mercenario-danger transition-colors duration-300 leading-tight">{project.title}_</h3>
                                        <p className="text-[9px] sm:text-[10px] text-neutral-400 font-mono mt-1 sm:mt-2 line-clamp-2 sm:line-clamp-3">{project.desc}</p>
                                    </div>
                                </a>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* FORMULARIO DE DIAGNÓSTICO */}
                <motion.section id="contacto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full pt-16 max-w-md mx-auto space-y-6 flex flex-col items-center mt-24">
                    <div className="text-center space-y-1">
                        <h2 className="text-lg font-black font-mono uppercase tracking-wider text-white">EVALUACIÓN_DE_INFRAESTRUCTURA_</h2>
                        <p className="text-[10px] text-neutral-500 font-mono">Iniciando diagnóstico operativo sin costo</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="w-full bg-[#060606] border border-white/[0.04] p-5 sm:p-7 space-y-4 rounded shadow-2xl relative">
                        <div>
                            <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Nombre / Empresa _</label>
                            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-[#020202] border border-white/5 rounded px-3 py-2.5 text-xs mt-1 focus:outline-none focus:border-mercenario-danger/50 text-gray-300 font-mono transition-colors" required disabled={formStatus === "loading" || formStatus === "success"} />
                        </div>
                        <div>
                            <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Correo Corporativo _</label>
                            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#020202] border border-white/5 rounded px-3 py-2.5 text-xs mt-1 focus:outline-none focus:border-mercenario-danger/50 text-gray-300 font-mono transition-colors" required disabled={formStatus === "loading" || formStatus === "success"} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Inversión Publicitaria / Mes _</label>
                                <select value={formData.budget} onChange={(e) => setFormData({...formData, budget: e.target.value})} className="w-full bg-[#020202] border border-white/5 rounded px-3 py-2.5 text-xs mt-1 focus:outline-none focus:border-mercenario-danger/50 text-gray-400 font-mono transition-colors appearance-none" required disabled={formStatus === "loading" || formStatus === "success"}>
                                    <option value="" disabled>Seleccionar rango...</option>
                                    <option value="Menos de $2.000 USD">&lt; $2.000 USD / mes</option>
                                    <option value="$2.000 a $10.000 USD">$2.000 - $10.000 USD / mes</option>
                                    <option value="$10.000 a $50.000 USD">$10.000 - $50.000 USD / mes</option>
                                    <option value="Más de $50.000 USD">+ $50.000 USD / mes</option>
                                    <option value="Solo Busco Desarrollo/SaaS">Solo Busco Desarrollo/Software</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Objetivo Principal _</label>
                                <input type="text" value={formData.challenge} onChange={(e) => setFormData({...formData, challenge: e.target.value})} className="w-full bg-[#020202] border border-white/5 rounded px-3 py-2.5 text-xs mt-1 focus:outline-none focus:border-mercenario-danger/50 text-gray-300 font-mono placeholder:text-neutral-800 placeholder:italic transition-colors" placeholder="Ej: Escalar ventas o Centralizar sistemas" required disabled={formStatus === "loading" || formStatus === "success"} />
                            </div>
                        </div>
                        
                        {formStatus === "error" && (
                            <p className="text-mercenario-danger text-[10px] font-mono mt-2 text-center p-2 border border-mercenario-danger/20 bg-mercenario-danger/5 rounded">Error de conexión. Intente nuevamente.</p>
                        )}
                        {formStatus === "success" && (
                            <p className="text-emerald-500 text-[10px] font-mono mt-2 text-center font-bold p-2 border border-emerald-500/20 bg-emerald-500/5 rounded">SOLICITUD RECIBIDA. NOS CONTACTAREMOS EN BREVE.</p>
                        )}

                        <button 
                            type="submit" 
                            disabled={formStatus === "loading" || formStatus === "success"}
                            className="w-full bg-mercenario-danger hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-black py-4 px-4 rounded text-[11px] uppercase tracking-widest transition-all mt-6 shadow-lg hover:shadow-mercenario-danger/20 font-mono flex items-center justify-center gap-2 group/btn"
                        >
                            {formStatus === "loading" ? "Procesando..." : formStatus === "success" ? "Diagnóstico Solicitado_" : (
                                <><span>SOLICITAR DIAGNÓSTICO_</span><ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>
                </motion.section>

            </main>

            <footer className="w-full border-t border-white/[0.03] py-8 text-center text-[9px] text-neutral-600 font-mono z-10">&copy; {new Date().getFullYear()} Mercenario OS. Todos los derechos reservados.</footer>

        </div>
    );
}
