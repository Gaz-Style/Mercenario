"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Crosshair, Target, Cpu, MessageSquare, Database, ChevronRight, Zap, Palette, Video, Mail, Search, Globe, TrendingUp, BarChart, ExternalLink, Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
    const [currentProject, setCurrentProject] = useState(0);
    const [formData, setFormData] = useState({ name: "", email: "", challenge: "", budget: "" });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("loading");

        const { error } = await supabase
            .from("leads")
            .insert([{ 
                name: formData.name, 
                email: formData.email, 
                challenge: formData.challenge,
                budget: formData.budget 
            }]);

        if (error) {
            console.error("Error inserting lead:", error);
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 4000);
        } else {
            setFormStatus("success");
            setFormData({ name: "", email: "", challenge: "", budget: "" });
            setTimeout(() => setFormStatus("idle"), 5000);
        }
    };

    const projects = [
        { title: "NeuroV", cat: "Inteligencia Artificial & UX", desc: "SaaS médico automatizado para clínicas estéticas.", link: "https://neuro-v.vercel.app/", bg: "bg-neutral-950 border-mercenario-danger/20", image: "/imagenes/ejecutados/neuroV.jpeg" },
        { title: "SocialMotors", cat: "E-commerce & Estrategia", desc: "Plataforma de ventas y embudo de conversión automotriz.", link: "https://www.socialmotors.cl/", bg: "bg-neutral-950 border-white/[0.03]", image: "/imagenes/ejecutados/socialmotors.jpeg" },
        { title: "Valet PRT", cat: "SaaS & Operaciones", desc: "Sistema de gestión y recepción automatizada de vehículos.", link: "https://socialmotors.cl/valet", bg: "bg-neutral-950 border-white/[0.03]", image: "/imagenes/ejecutados/valetPRT.jpeg" },
        { title: "PaseaLove", cat: "E-commerce & Servicios", desc: "Plataforma de reserva y cuidado de mascotas con rastreo.", link: "https://www.pasealove.cl/", bg: "bg-neutral-950 border-white/[0.03]", image: "/imagenes/ejecutados/PaseaLove.jpeg" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProject((prev) => (prev + 1) % projects.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [projects.length]);

    return (
        <div className="min-h-screen bg-[#010101] text-white font-sans antialiased flex flex-col items-center relative overflow-hidden selection:bg-mercenario-danger selection:text-white">
            
            {/* Ambient Tactical Lights */}
            <div className="absolute top-[-10%] left-[50%] translate-x-[-50%] w-[1000px] h-[350px] bg-mercenario-danger/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            {/* Float CTA Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <a 
                    href="#contacto" 
                    className="flex items-center gap-2 px-4 py-2.5 bg-mercenario-danger text-white font-bold text-[10px] uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(255,17,34,0.3)] hover:scale-105 transition-all duration-300 backdrop-blur-md"
                >
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                    Iniciar Auditoría_
                </a>
            </div>

            {/* Header / Navbar */}
            <header className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex justify-between items-center z-50 border-b border-white/[0.03]">
                <div className="flex items-center gap-1.5">
                    <Crosshair className="w-5 h-5 text-mercenario-danger animate-pulse" />
                    <span className="text-sm font-black font-mono tracking-wider text-white uppercase flex items-center gap-1">
                        MERCENARIO <span className="text-gray-600 hidden sm:inline">|</span> <span className="text-[9px] text-gray-400 font-normal hidden sm:inline">OPERACIONES_</span>
                    </span>
                </div>
                <a 
                    href="#contacto" 
                    className="px-4 py-2 border border-white/10 hover:border-mercenario-danger/40 text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest rounded hover:bg-white/5 transition-all duration-300 font-mono"
                >
                    CONTACTO_
                </a>
            </header>

            <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-32 z-10 flex flex-col items-center">

                {/* 1. HERO - IMPACTO TÁCTICO */}
                <section className="text-center max-w-3xl pt-14 md:pt-24 pb-16 space-y-5 flex flex-col items-center relative w-full rounded-2xl overflow-hidden mt-6 border border-white/[0.03]">
                    <video src="/imagenes/Bala_Rodando_Sobre_Mesa_Oscura.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 -z-10" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010101]/40 to-[#010101] -z-10" />

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="inline-flex items-center gap-1.5 border border-mercenario-danger/30 px-4 py-1.5 bg-mercenario-danger/10 rounded text-[10px] sm:text-[11px] font-bold text-mercenario-danger tracking-widest uppercase mb-2 font-mono relative z-10">
                        | EJECUCIÓN TÁCTICA 360 |
                    </motion.div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter sm:tracking-tight leading-[1.05] text-white font-mono uppercase z-10 mt-10 sm:mt-14">
                        Automatizamos tu <br />
                        <span className="text-mercenario-danger">Crecimiento_</span>
                    </h1>

                    <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed px-2 font-mono z-10 mt-3 sm:mt-4">
                        Diseñamos y escalamos toda tu cadena de ventas con pauta de respuesta directa y arquitectura técnica_
                    </p>

                    <div className="pt-8 sm:pt-10 z-10">
                        <a href="#contacto" className="inline-flex items-center gap-3 px-6 py-4 bg-white text-black font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-mercenario-danger hover:text-white transition-all group rounded shadow-lg font-mono">
                            <span>EVALUAR_PROYECTO_</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </section>
                        <div className="flex gap-16 items-center flex-shrink-0 pr-16">
                            <img src="/imagenes/logotipo/google_ads.svg" alt="Google Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/instagram.svg" alt="Instagram Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/tiktok.svg" alt="TikTok Ads" className="h-11 sm:h-13 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/linkedin.svg" alt="LinkedIn Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/descarga (1).png" alt="Meta Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/antigravity-color.png" alt="Antigravity" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/gemini_star.svg" alt="Gemini" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/DeepSeek.png" alt="DeepSeek" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/chat gpt.png" alt="ChatGPT" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/anthropic-1.svg" alt="Anthropic" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/whatsapp_business.svg" alt="WhatsApp Business" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                        </div>
                        <div className="flex gap-16 items-center flex-shrink-0 pr-16">
                            <img src="/imagenes/logotipo/google_ads.svg" alt="Google Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/instagram.svg" alt="Instagram Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/tiktok.svg" alt="TikTok Ads" className="h-11 sm:h-13 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/linkedin.svg" alt="LinkedIn Ads" className="h-9 sm:h-11 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/descarga (1).png" alt="Meta Ads" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/antigravity-color.png" alt="Antigravity" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/gemini_star.svg" alt="Gemini" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/DeepSeek.png" alt="DeepSeek" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/chat gpt.png" alt="ChatGPT" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/anthropic-1.svg" alt="Anthropic" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                            <img src="/imagenes/logotipo/whatsapp_business.svg" alt="WhatsApp Business" className="h-10 sm:h-12 max-w-[50px] sm:max-w-[70px] object-contain" />
                        </div>
                    </motion.div>
                </section>

                {/* 1.7 PROTOCOLO Y ESCALA CLASIFICADA (Manifiesto) */}
                <section className="w-full max-w-4xl mx-auto px-6 py-16 md:py-24 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 border border-mercenario-danger/30 bg-mercenario-danger/10 px-3 py-1 rounded-full mb-2">
                        <div className="w-2 h-2 rounded-full bg-mercenario-danger animate-pulse"></div>
                        <span className="text-[10px] font-mono text-mercenario-danger uppercase tracking-widest font-bold">Acceso Restringido</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-black font-mono uppercase text-white leading-tight">No somos una agencia creativa.<br/>Somos una <span className="text-mercenario-danger">fuerza de escalabilidad</span>.</h2>
                    <p className="font-mono text-sm md:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Solo aceptamos proyectos donde exista viabilidad matemática y técnica para multiplicar tu facturación. Diseñamos infraestructura, inyectamos tráfico cualificado y automatizamos el cierre de ventas bajo un protocolo de ejecución hiper-rentable.
                    </p>
                </section>

                {/* 2. PROYECTOS DESTACADOS - CARRUSEL INFINITO FORMATO MÓVIL */}
                <section className="w-full pt-10 md:pt-16 flex flex-col items-center">
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

                {/* 3. ECOSISTEMA 360 - EL CEREBRO OPERATIVO */}
                <section className="w-full pt-20 md:pt-32 max-w-6xl mx-auto px-6">
                    <div className="text-center space-y-4 mb-12 sm:mb-16">
                        <div className="inline-block border border-mercenario-danger/30 bg-mercenario-danger/5 px-4 py-1.5 rounded-full mb-2">
                            <span className="text-[9px] font-mono text-mercenario-danger font-bold uppercase tracking-[0.2em]">Operación Bandera</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black font-mono tracking-wider uppercase text-white">ECOSISTEMA_360_</h2>
                        <p className="font-mono text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                            No solo ejecutamos tareas; instalamos un <strong className="text-white">Cerebro Operativo</strong> en tu empresa. Un flujo continuo pilotado por Inteligencia Artificial y automatización diseñado para dominar todo el ciclo de vida del cliente.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {[
                            { step: "01", title: "Atracción", desc: "Minería de leads y pauta inteligente y autónoma." },
                            { step: "02", title: "Intercepción", desc: "Agentes SDR 24/7 y perfilamiento algorítmico." },
                            { step: "03", title: "Ingeniería", desc: "Integración de Cómputo API y automatización CRM." },
                            { step: "04", title: "Cierre", desc: "Redacción dinámica e hiper-personalización." },
                            { step: "05", title: "Retención", desc: "LTV, gestión de reputación y recompra automática." }
                        ].map((s, i) => (
                            <div key={i} className="bg-[#050505] border border-white/[0.05] p-6 rounded-lg relative overflow-hidden group hover:border-mercenario-danger/40 transition-colors">
                                <div className="text-white/5 font-black text-5xl lg:text-5xl font-mono absolute -top-4 -right-2 group-hover:text-mercenario-danger/10 transition-colors">{s.step}</div>
                                <h3 className="text-white font-mono font-bold text-sm sm:text-base mb-2 relative z-10">{s.title}_</h3>
                                <p className="text-neutral-500 font-mono text-[10px] leading-relaxed relative z-10">{s.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/ecosistema-360" className="inline-flex items-center gap-2 text-[10px] font-mono font-bold text-mercenario-danger uppercase tracking-widest hover:text-white transition-colors group">
                            <span className="border-b border-mercenario-danger/30 group-hover:border-white/30 pb-0.5 transition-colors">Ver Documentación Desclasificada del Sistema</span>
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>

                {/* 3.1 VECTORES DE ATAQUE (SERVICIOS INDIVIDUALES) */}
                <section className="w-full space-y-6 md:space-y-10 pt-20 md:pt-32 mt-12 md:mt-20">
                    <div className="text-center space-y-2 px-4 border-t border-white/[0.05] pt-12 md:pt-20">
                        <h2 className="text-xl sm:text-2xl font-black font-mono tracking-wider uppercase text-white">INTERVENCIONES_TÁCTICAS_</h2>
                        <p className="text-[10px] sm:text-[11px] text-neutral-500 font-mono max-w-xl mx-auto leading-relaxed">
                            Respuesta directa bajo arquitectura propia. Contrata el Ecosistema 360 completo o despliega nuestros "Caballos de Troya" para resolver fallas críticas en tu maquinaria actual de ventas.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                        {[
                            { num: "01", icon: Target, title: "Pauta Táctica Integral", desc: "Campañas de respuesta directa multiplataforma en Meta, Google y TikTok Ads.", items: ["CPA & Retorno Directo", "Estructura de Escalabilidad", "Modelado de Atribución"] },
                            { num: "02", icon: Database, title: "Arquitectura SaaS & Sistemas_", desc: "Diseño y desarrollo de backends escalables, dashboards operativos y CRM a medida.", items: ["Node.js / Python / SQL", "Automatización de Procesos", "Infraestructura Cloud"] },
                            { num: "03", icon: Globe, title: "Ingeniería Frontend (Next.js)_", desc: "Construcción de plataformas y aplicativos web de carga ultra-rápida.", items: ["Next.js / TypeScript", "Core Web Vitals", "Flujos de Conversión"] },
                            { num: "04", icon: Palette, title: "UX/UI & Diseño de Producto_", desc: "Interfaces comerciales y prototipado que proyectan autoridad y conversión.", items: ["Diseño de Producto", "Branding Técnico", "Activos Digitales"] },
                            { num: "05", icon: Video, title: "Producción Audiovisual_", desc: "Grabación y edición de video de alta retención para Ads y Reels tácticos.", items: ["Corte Dinámico", "Post-producción", "Formatos Verticales"] },
                            { num: "06", icon: MessageSquare, title: "Creación de Contenido_", desc: "Estrategia para posicionar marca sin depender solo de tráfico pagado.", items: ["Copywriting Directo", "Parrillas Estratégicas", "Guiones de Conversión"] },
                            { num: "07", icon: Mail, title: "Automations & Email Marketing_", desc: "Automatización de flujos de nutrición y CRM para cerrar ventas latentes.", items: ["Automatización de Envíos", "Integración CRM", "Flujos de Reserva"] },
                            { num: "08", icon: Cpu, title: "Integración IA & Automations_", desc: "Entrenamiento e integración de modelos de lenguaje para workflows automatizados.", items: ["Agentes de IA", "Automatización Workflows", "API Integrations"] }
                        ].map((serv, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }} className="bg-[#060606] border border-white/[0.03] p-5 rounded relative overflow-hidden group hover:border-white/10 transition-all duration-300 flex flex-col justify-between">
                                <div className="absolute top-[-5px] right-2 text-5xl font-black font-mono text-white/[0.01] group-hover:text-mercenario-danger/[0.02] transition-colors pointer-events-none">{serv.num}</div>
                                <div className="space-y-4 z-10"><div className="p-1.5 border border-white/10 w-fit backdrop-blur-md rounded group-hover:border-mercenario-danger/40 transition-colors"><serv.icon className="w-4 h-4 text-mercenario-danger" /></div><div className="space-y-1"><h3 className="text-xs font-black tracking-tight uppercase font-mono text-white group-hover:text-mercenario-danger transition-colors">{serv.title}_</h3><p className="text-[10px] text-neutral-500 leading-relaxed font-mono">{serv.desc}</p></div></div>
                                <ul className="text-[9px] text-neutral-400 space-y-1 list-none pt-3 mt-4 border-t border-white/[0.03] flex-grow font-mono z-10">{serv.items.map((it, j) => (<li key={j} className="flex items-center gap-1"><div className="w-1 h-1 bg-mercenario-danger/60 rounded-full" />{it}</li>))}</ul>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 3.5 INFINITE METRICS STRIP (Framer Motion Marquee) - Reubicado Aquí */}
                <section className="w-full overflow-hidden py-10 mt-12 bg-[#020202] flex">
                    <motion.div 
                        className="flex gap-8 whitespace-nowrap"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            ease: "linear",
                            duration: 20,
                            repeat: Infinity
                        }}
                    >
                        <div className="flex gap-8 items-center">
                            {[
                                "ROAS: 4.8X [E-COMMERCE]_", "CPA: -35% [SaaS]_", "LEADS: +180% [FINANZAS]_",
                                "VENTAS: +220% [RETAIL]_", "ROI: 520% [B2B]_", "INDEXACIÓN: 100% [IA]_"
                            ].map((met, i) => (
                                <span key={i} className="text-[10px] font-black font-mono tracking-widest text-neutral-500 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-mercenario-danger rounded-full" />
                                    {met}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-8 items-center">
                            {[
                                "ROAS: 4.8X [E-COMMERCE]_", "CPA: -35% [SaaS]_", "LEADS: +180% [FINANZAS]_",
                                "VENTAS: +220% [RETAIL]_", "ROI: 520% [B2B]_", "INDEXACIÓN: 100% [IA]_"
                            ].map((met, i) => (
                                <span key={i} className="text-[10px] font-black font-mono tracking-widest text-neutral-500 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-mercenario-danger rounded-full" />
                                    {met}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* 4. PORTAFOLIO - CASOS DE ÉXITO */}
                <section className="w-full space-y-12 mt-12">
                    <div className="text-center space-y-1">
                        <h2 className="text-xl sm:text-2xl font-black font-mono tracking-wider uppercase text-white">MISIONES_EJECUTADAS_</h2>
                        <p className="text-[10px] sm:text-[11px] text-neutral-600 font-mono">Registro de operaciones y retornos asegurados</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            { title: "Operación: Escala E-commerce", client: "Retail Moda", mainMetric: "+250%", metricLabel: "Incremento en Ventas", items: ["Paid Media Multicanal", "Embudo de Alta Conversión", "Atribución en Tiempo Real"], icon: TrendingUp },
                            { title: "Operación: Captura B2B", client: "Servicios SaaS", mainMetric: "-35%", metricLabel: "Reducción de CPL", items: ["LinkedIn Ads de Autoridad", "Automatización CRM", "AI Bots de Seguimiento"], icon: BarChart },
                            { title: "Operación: Visibilidad Total", client: "Salud / Clínicas", mainMetric: "+180%", metricLabel: "Leads Orgánicos", items: ["SEO Local & Maps", "Búsqueda Generativa IA", "Indexación Automatizada"], icon: Zap }
                        ].map((caso, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="bg-[#040404] border border-white/[0.02] rounded-xl p-6 relative overflow-hidden group hover:border-mercenario-danger/20 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-mercenario-danger/5 blur-xl rounded-full pointer-events-none group-hover:bg-mercenario-danger/10 transition-colors" />
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start"><div className="space-y-1"><p className="text-[8px] font-bold font-mono text-mercenario-danger tracking-widest uppercase">{caso.client}</p><h3 className="text-xs sm:text-sm font-black font-mono text-white group-hover:text-mercenario-danger transition-colors">{caso.title}_</h3></div><caso.icon className="w-5 h-5 text-neutral-700 group-hover:text-mercenario-danger transition-colors" /></div>
                                    <div className="py-4 border-y border-white/[0.03] my-4"><p className="text-4xl font-extrabold font-mono text-white tracking-tighter">{caso.mainMetric}</p><p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">{caso.metricLabel}</p></div>
                                    <ul className="text-[9px] text-neutral-400 space-y-1 font-mono">{caso.items.map((it, j) => (<li key={j} className="flex items-center gap-1.5"><div className="w-1 h-1 bg-mercenario-danger/40 rounded-full" />{it}</li>))}</ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* 5. CONTACTO */}
                <motion.section id="contacto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full pt-16 max-w-md mx-auto space-y-6 flex flex-col items-center mt-24">
                    <div className="text-center space-y-1">
                        <h2 className="text-lg font-black font-mono uppercase tracking-wider text-white">EVALUACIÓN_PROYECTO_</h2>
                        <p className="text-[10px] text-neutral-500 font-mono">Iniciando protocolo de auditoría técnica</p>
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
                                    <option value="" disabled selected>Seleccionar rango...</option>
                                    <option value="Menos de $2.000 USD">&lt; $2.000 USD / mes</option>
                                    <option value="$2.000 a $10.000 USD">$2.000 - $10.000 USD / mes</option>
                                    <option value="$10.000 a $50.000 USD">$10.000 - $50.000 USD / mes</option>
                                    <option value="Más de $50.000 USD">+ $50.000 USD / mes</option>
                                    <option value="Solo Busco Desarrollo/SaaS">Solo Busco Desarrollo/Software</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest font-mono">Objetivo Principal _</label>
                                <input type="text" value={formData.challenge} onChange={(e) => setFormData({...formData, challenge: e.target.value})} className="w-full bg-[#020202] border border-white/5 rounded px-3 py-2.5 text-xs mt-1 focus:outline-none focus:border-mercenario-danger/50 text-gray-300 font-mono placeholder:text-neutral-800 placeholder:italic transition-colors" placeholder="Ej: Escala de pauta o Sistema a medida" required disabled={formStatus === "loading" || formStatus === "success"} />
                            </div>
                        </div>
                        
                        {formStatus === "error" && (
                            <p className="text-mercenario-danger text-[10px] font-mono mt-2 text-center p-2 border border-mercenario-danger/20 bg-mercenario-danger/5 rounded">Fallo en la comunicación encriptada. Intenta nuevamente.</p>
                        )}
                        {formStatus === "success" && (
                            <p className="text-emerald-500 text-[10px] font-mono mt-2 text-center font-bold p-2 border border-emerald-500/20 bg-emerald-500/5 rounded">CONTACTO RECIBIDO. INICIANDO PROTOCOLO.</p>
                        )}

                        <button 
                            type="submit" 
                            disabled={formStatus === "loading" || formStatus === "success"}
                            className="w-full bg-mercenario-danger hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-black py-4 px-4 rounded text-[11px] uppercase tracking-widest transition-all mt-6 shadow-lg hover:shadow-mercenario-danger/20 font-mono flex items-center justify-center gap-2 group/btn"
                        >
                            {formStatus === "loading" ? "Procesando Datos..." : formStatus === "success" ? "Auditoría Solicitada_" : (
                                <><span>ENVIAR SOLICITUD CLASIFICADA_</span><ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>
                </motion.section>

            </main>

            <footer className="w-full border-t border-white/[0.03] py-8 text-center text-[9px] text-neutral-600 font-mono z-10">&copy; {new Date().getFullYear()} Mercenario. Operaciones Especiales Clasificadas_</footer>

        </div>
    );
}
