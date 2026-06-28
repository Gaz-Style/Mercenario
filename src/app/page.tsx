"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Crosshair, ChevronRight, Activity, Truck, ShoppingCart, Coffee, Dog, Dumbbell, Wrench, Cpu, ExternalLink } from "lucide-react";
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
            
            <div className="absolute top-[-10%] left-[50%] translate-x-[-50%] w-[1000px] h-[350px] bg-mercenario-danger/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-white/[0.05] bg-[#010101]/60 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                        <Crosshair className="w-5 h-5 text-mercenario-danger animate-pulse" />
                        <span className="text-sm font-black font-mono tracking-wider text-white uppercase flex items-center gap-1">
                            MERCENARIO <span className="text-gray-600 hidden sm:inline">|</span> <span className="text-[9px] text-gray-400 font-normal hidden sm:inline">INFRAESTRUCTURA_</span>
                        </span>
                    </div>
                    <Link href="/auditoria" className="px-4 py-2 bg-mercenario-danger text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest rounded hover:bg-red-700 transition-all duration-300 font-mono">
                        AUDITORÍA_
                    </Link>
                </div>
            </header>

            <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-32 z-10 flex flex-col items-center">

                {/* HERO */}
                <section className="text-center max-w-4xl pt-14 md:pt-24 pb-16 space-y-5 flex flex-col items-center relative w-full rounded-2xl overflow-hidden mt-6 border border-white/[0.03]">
                    <video ref={videoRef} src="/imagenes/Bala_Rodando_Sobre_Mesa_Oscura.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-[1.20] translate-x-[4%] opacity-40 -z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010101]/60 to-[#010101] -z-10" />

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-1.5 border border-mercenario-danger/30 px-4 py-1.5 bg-mercenario-danger/10 rounded text-[10px] sm:text-[11px] font-bold text-mercenario-danger tracking-widest uppercase mb-2 font-mono relative z-10">
                        | INFRAESTRUCTURA UNIFICADA PARA EMPRESAS ESCALABLES |
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.05] text-white font-mono uppercase z-10 mt-10">
                        Deja de usar software fragmentado.<br />
                        <span className="text-mercenario-danger">Construimos el Sistema Central de tu Empresa.</span>
                    </h1>

                    <p className="text-neutral-400 text-sm max-w-2xl mx-auto leading-relaxed px-2 font-mono z-10 mt-6">
                        El crecimiento no falla por vender menos, sino por perder control del negocio en el camino. Centralizamos CRM, ERP, facturación y automatización con IA en un único sistema que entrega visibilidad y control en tiempo real, desde cualquier dispositivo.
                    </p>
                </section>

                {/* 1.5 INFINITE ADS LOGOS CAROUSEL (Efecto Cilindro 3D + Foco) */}
                <section className="w-full bg-[#000] border-y border-white/[0.02] overflow-hidden relative mt-8 md:mt-16 min-h-[140px] sm:min-h-[160px] flex items-center justify-center">
                    
                    {/* Capa Trasera (Back): Oscura, Escala Menor, Gira al Revés */}
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
                                    <img src="/imagenes/logotipo/linkedin.svg" alt="LinkedIn Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/descarga (1).png" alt="Meta Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/antigravity-color.png" alt="Antigravity" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/gemini_star.svg" alt="Gemini" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/DeepSeek.png" alt="DeepSeek" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/chat gpt.png" alt="ChatGPT" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/anthropic-1.svg" alt="Anthropic" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/whatsapp_business.svg" alt="WhatsApp Business" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                </div>
                                <div className="flex gap-10 sm:gap-16 items-center flex-shrink-0 pr-10 sm:pr-16">
                                    <img src="/imagenes/logotipo/google_ads.svg" alt="Google Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/instagram.svg" alt="Instagram Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/tiktok.svg" alt="TikTok Ads" className="h-11 sm:h-13 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/linkedin.svg" alt="LinkedIn Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/descarga (1).png" alt="Meta Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/antigravity-color.png" alt="Antigravity" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/gemini_star.svg" alt="Gemini" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/DeepSeek.png" alt="DeepSeek" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/chat gpt.png" alt="ChatGPT" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/anthropic-1.svg" alt="Anthropic" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                    <img src="/imagenes/logotipo/whatsapp_business.svg" alt="WhatsApp Business" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Capa Frontal (Front): A color y brillante, enmascarada solo en el centro */}
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
                                <img src="/imagenes/logotipo/linkedin.svg" alt="LinkedIn Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/descarga (1).png" alt="Meta Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/antigravity-color.png" alt="Antigravity" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/gemini_star.svg" alt="Gemini" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/DeepSeek.png" alt="DeepSeek" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/chat gpt.png" alt="ChatGPT" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/anthropic-1.svg" alt="Anthropic" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/whatsapp_business.svg" alt="WhatsApp Business" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                            </div>
                            <div className="flex gap-10 sm:gap-16 items-center flex-shrink-0 pr-10 sm:pr-16 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                <img src="/imagenes/logotipo/google_ads.svg" alt="Google Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/instagram.svg" alt="Instagram Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/tiktok.svg" alt="TikTok Ads" className="h-11 sm:h-13 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/linkedin.svg" alt="LinkedIn Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/descarga (1).png" alt="Meta Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/antigravity-color.png" alt="Antigravity" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/gemini_star.svg" alt="Gemini" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/DeepSeek.png" alt="DeepSeek" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/chat gpt.png" alt="ChatGPT" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/anthropic-1.svg" alt="Anthropic" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                                <img src="/imagenes/logotipo/whatsapp_business.svg" alt="WhatsApp Business" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain transform-gpu" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Gradientes puros a los bordes para ocultar el "corte" del cilindro y darle profundidad circular */}
                    <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-20 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-20 pointer-events-none" />
                </section>

                {/* RUTAS POR INDUSTRIA */}
                <section className="w-full mt-24 space-y-12">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl md:text-3xl font-black font-mono tracking-wider uppercase text-white">¿EN QUÉ INDUSTRIA OPERAS?_</h2>
                        <p className="text-xs text-neutral-500 font-mono">Selecciona tu nicho para ver cómo adaptamos la infraestructura a tu operación diaria.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { href: "/industrias/salud", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/5", hover: "group-hover:bg-blue-500/10", borderHover: "hover:border-blue-500/50", title: "Clínicas & Salud", desc: "Integración Imed, agendamiento autónomo y fichas clínicas encriptadas.", os: "HEALTH-OS" },
                            { href: "/industrias/logistica", icon: Truck, color: "text-emerald-500", bg: "bg-emerald-500/5", hover: "group-hover:bg-emerald-500/10", borderHover: "hover:border-emerald-500/50", title: "Logística", desc: "Rastreo de OTs, control de flota y cobro en terreno.", os: "SERVICE-OS" },
                            { href: "/industrias/retail", icon: ShoppingCart, color: "text-purple-500", bg: "bg-purple-500/5", hover: "group-hover:bg-purple-500/10", borderHover: "hover:border-purple-500/50", title: "Retail & E-commerce", desc: "Omni-inventario y facturación SII automática.", os: "COMMERCE-OS" },
                            { href: "/industrias/gastronomia", icon: Coffee, color: "text-orange-500", bg: "bg-orange-500/5", hover: "group-hover:bg-orange-500/10", borderHover: "hover:border-orange-500/50", title: "Gastronomía", desc: "Delivery unificado, control de comandas y POS.", os: "GASTRO-OS" },
                            { href: "/industrias/veterinaria", icon: Dog, color: "text-teal-500", bg: "bg-teal-500/5", hover: "group-hover:bg-teal-500/10", borderHover: "hover:border-teal-500/50", title: "Veterinarias", desc: "Ficha de mascotas, agenda y recordatorios.", os: "PET-OS" },
                            { href: "/industrias/deportes", icon: Dumbbell, color: "text-red-500", bg: "bg-red-500/5", hover: "group-hover:bg-red-500/10", borderHover: "hover:border-red-500/50", title: "Deportes & Gyms", desc: "Cobro recurrente, control de aforo y retención IA.", os: "FIT-OS" },
                            { href: "/industrias/servicios-tecnicos", icon: Wrench, color: "text-yellow-500", bg: "bg-yellow-500/5", hover: "group-hover:bg-yellow-500/10", borderHover: "hover:border-yellow-500/50", title: "Servicios Técnicos", desc: "ERP móvil en terreno, firma digital y cobro in-situ.", os: "FIELD-OS" },
                            { href: "/auditoria", icon: Cpu, color: "text-neutral-400", bg: "bg-neutral-500/5", hover: "group-hover:bg-neutral-500/10", borderHover: "hover:border-neutral-500/50", title: "Otros Nichos / A Medida", desc: "Creamos sistemas a la medida de su negocio según sus requerimientos. Desde aplicaciones operativas simples hasta integraciones complejas de software, POS, ERP e IA.", os: "CUSTOM-OS" },
                        ].map((ind, i) => (
                            <Link key={i} href="#" className={`group p-6 bg-[#040404] border border-white/[0.05] rounded-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${ind.borderHover}`}>
                                <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl rounded-full transition-colors ${ind.bg} ${ind.hover}`} />
                                <div>
                                    <ind.icon className={`w-8 h-8 mb-4 ${ind.color}`} />
                                    <h3 className="font-mono text-sm font-black text-white uppercase mb-2">{ind.title}</h3>
                                    <p className="font-mono text-[10px] text-neutral-400 leading-relaxed mb-6">{ind.desc}</p>
                                </div>
                                <span className={`font-mono text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform ${ind.color}`}>VER {ind.os} <ChevronRight className="w-3 h-3" /></span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="w-full mt-32 space-y-16">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl md:text-4xl font-black font-mono tracking-wider uppercase text-white">LOS 7 PILARES DEL SISTEMA_</h2>
                        <p className="text-sm text-neutral-400 font-mono max-w-2xl mx-auto">La infraestructura unificada se compone de 7 módulos que construyen la columna vertebral de tu negocio.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {[
                            { 
                                n: "01", title: "Growth & Marketing (Captación)", 
                                slug: "growth",
                                content: "SEO local, Meta/Google Ads, programas de referidos (Viral Loops) y AI Content Studio.",
                                purpose: "Generar demanda predecible y atraer clientes de alto valor de forma constante." 
                            },
                            { 
                                n: "02", title: "Ecosistema Multi-Agentes IA", 
                                slug: "multi-agentes-ia",
                                content: "Agentes autónomos de atención (WhatsApp) y agentes internos de optimización.",
                                purpose: "No perder ventas a las 3:00 AM y detectar cuellos de botella en la operación sin intervención humana." 
                            },
                            { 
                                n: "03", title: "CRM Omnicanal (Gestión de Clientes)", 
                                slug: "crm",
                                content: "Ficha digital única, historial de compras, documentos y registro de conversaciones.",
                                purpose: "Centralizar la información del cliente para vender mejor y fidelizar a largo plazo." 
                            },
                            { 
                                n: "04", title: "Automatización de Procesos", 
                                slug: "automatizacion",
                                content: "Mensajes de seguimiento, recordatorios de citas, peticiones de reseñas en Google y alertas de cobro.",
                                purpose: "Eliminar el trabajo manual, reducir la inasistencia y aumentar la retención de clientes en automático." 
                            },
                            { 
                                n: "05", title: "ERP Operativo (Gestión Interna)", 
                                slug: "erp",
                                content: "Control de inventario, asignación de tareas, agenda de personal y control de producción.",
                                purpose: "Ordenar la empresa por dentro para que el servicio se entregue rápido y sin errores humanos." 
                            },
                            { 
                                n: "06", title: "Facturación & POS (Cobros)", 
                                slug: "pos",
                                content: "Cajas registradoras (Smart POS), links de pago online y conexión directa con el SII.",
                                purpose: "Cobrar sin fricción y asegurar que toda boleta o factura se emita de inmediato." 
                            },
                        ].map((pilar, i) => (
                            <Link href="#" key={i} className="flex flex-col justify-between gap-4 p-6 bg-[#030303] border border-white/[0.03] rounded-lg hover:border-white/10 hover:-translate-y-1 transition-all duration-300 group">
                                <div>
                                    <div className="flex items-center gap-3 border-b border-white/[0.05] pb-4">
                                        <span className="text-4xl font-black font-mono text-white/5 group-hover:text-white/10 transition-colors">{pilar.n}</span>
                                        <h3 className="font-mono font-bold text-white uppercase">{pilar.title}</h3>
                                    </div>
                                    <div className="space-y-3 mt-4">
                                        <div>
                                            <p className="text-[10px] text-mercenario-danger font-bold uppercase tracking-widest mb-1">Qué contiene:</p>
                                            <p className="font-mono text-xs text-neutral-400 leading-relaxed">{pilar.content}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Para qué sirve:</p>
                                            <p className="font-mono text-xs text-neutral-400 leading-relaxed">{pilar.purpose}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/[0.02] flex items-center justify-end">
                                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">
                                        Ver módulos y ejemplos →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Link href="#" className="max-w-5xl mx-auto bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-lg flex flex-col md:flex-row items-center gap-6 hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group block">
                        <div className="text-6xl font-black font-mono text-emerald-500/20 group-hover:text-emerald-500/40 transition-colors">07</div>
                        <div className="flex-1 space-y-4 w-full">
                            <h3 className="font-mono font-bold text-emerald-500 uppercase text-xl border-b border-emerald-500/20 pb-4">Business Intelligence (Control Gerencial)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                <div>
                                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Qué contiene:</p>
                                    <p className="font-mono text-xs text-neutral-300 leading-relaxed">Dashboard en vivo, cálculo de Rentabilidad Neta (P&L), métricas de ventas y rendimiento del equipo.</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1">Para qué sirve:</p>
                                    <p className="font-mono text-xs text-neutral-300 leading-relaxed">Para que tengas el control total de tu negocio desde tu celular, basando tus decisiones en datos reales.</p>
                                </div>
                            </div>
                            <div className="pt-2 flex justify-end">
                                <span className="text-[10px] font-mono text-emerald-500/60 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">
                                    Ver módulos y ejemplos →
                                </span>
                            </div>
                        </div>
                    </Link>
                </section>

                {/* 2. PROYECTOS DESTACADOS - CARRUSEL INFINITO FORMATO MÓVIL */}
                <section className="w-full pt-20 md:pt-32 flex flex-col items-center">
                    <div className="text-center space-y-1 z-10 mb-4 sm:mb-8">
                        <h2 className="text-xl sm:text-2xl font-black font-mono tracking-wider uppercase text-white">MISIONES_COMPLETADAS_</h2>
                        <p className="text-[10px] sm:text-[11px] text-neutral-600 font-mono">Bitácora de despliegues y experiencia móvil</p>
                    </div>

                    <div className="relative w-full flex overflow-hidden border-y border-white/[0.02] bg-[#020202]/50 py-4 sm:py-10">
                        {/* Gradientes laterales para difuminar */}
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
                            {/* Repetimos 4 veces para asegurar un loop continuo sin saltos */}
                            {[...projects, ...projects, ...projects, ...projects].map((project, idx) => (
                                <a 
                                    key={idx}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col flex-shrink-0 w-[200px] sm:w-[260px] md:w-[300px] group/card cursor-pointer"
                                >
                                    {/* Imagen */}
                                    <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden border border-white/[0.05] group-hover/card:border-mercenario-danger/40 group-hover/card:shadow-[0_0_30px_rgba(255,17,34,0.15)] transition-all duration-500 mb-8 sm:mb-10">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top opacity-70 group-hover/card:opacity-100 group-hover/card:scale-105 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-[#010101]/20 group-hover/card:bg-transparent transition-colors duration-500 pointer-events-none" />
                                    </div>
                                    
                                    {/* Contenido (Info siempre visible abajo) */}
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
            </main>
        </div>
    );
}
