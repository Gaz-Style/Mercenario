"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Sparkles,
    Flame,
    ArrowRight,
    Check,
    TrendingUp,
    MessageCircle,
    Eye,
    Maximize2,
    Film,
    Camera,
    Sliders,
    Zap,
    MapPin,
    Share2,
    ArrowUpRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ReelItem {
    id: string;
    title: string;
    client: string;
    category: "gastronomia" | "salud" | "ecommerce" | "b2b";
    categoryLabel: string;
    hook: string;
    views: string;
    conversions: string;
    videoUrl: string;
    poster: string;
    accent: string;
}

const REELS_DATA: ReelItem[] = [
    {
        id: "1",
        title: "El Secreto del Mejor Corte",
        client: "Corte Maestro Grill • Vitacura",
        category: "gastronomia",
        categoryLabel: "Gastronomía & Bares",
        hook: "“No vuelvas a pedir el lomo vetado sin saber esto…”",
        views: "1.4M views",
        conversions: "+180 reservas",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-in-a-pan-42971-large.mp4",
        poster: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
        accent: "#f97316"
    },
    {
        id: "2",
        title: "Streetwear Drops",
        client: "Kroma Apparel • Santiago",
        category: "ecommerce",
        categoryLabel: "Moda & E-Commerce",
        hook: "“3 prendas que todo hombre debería tener en invierno”",
        views: "890K views",
        conversions: "Drop sold out 48h",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-neon-light-40032-large.mp4",
        poster: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        accent: "#ec4899"
    },
    {
        id: "3",
        title: "Cirugía Guiada 1 Día",
        client: "Clínica Dental Providencia",
        category: "salud",
        categoryLabel: "Clínicas & Salud",
        hook: "“¿Duele ponerse un implante? Mira esto en 15 segundos.”",
        views: "420K views",
        conversions: "+84 cotizaciones",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smartphone-with-green-screen-41484-large.mp4",
        poster: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
        accent: "#06b6d4"
    },
    {
        id: "4",
        title: "Logística B2B & Minería",
        client: "Andes Industrial Tech",
        category: "b2b",
        categoryLabel: "B2B & Servicios",
        hook: "“Cómo ahorramos $14.000.000 en faena con este sensor”",
        views: "160K views",
        conversions: "3 licitaciones",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-walking-in-a-modern-office-43383-large.mp4",
        poster: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
        accent: "#eab308"
    }
];

export default function VideoReelsVisualLanding() {
    const [selectedCategory, setSelectedCategory] = useState<string>("todos");
    const [activeVideo, setActiveVideo] = useState<ReelItem | null>(null);
    const [mutedStates, setMutedStates] = useState<{ [key: string]: boolean }>({
        "1": true,
        "2": true,
        "3": true,
        "4": true
    });

    // Formulario Simple
    const [formData, setFormData] = useState({
        name: "",
        business: "",
        phone: "",
        plan: "Pack 8 Reels ($890.000 CLP/mes)",
        _honeypot: ""
    });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");

    const WHATSAPP_NUM = "56957958467";

    const filteredReels = selectedCategory === "todos"
        ? REELS_DATA
        : REELS_DATA.filter(r => r.category === selectedCategory);

    const toggleMute = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setMutedStates(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData._honeypot) return;
        setFormStatus("loading");

        try {
            const cleanDigits = formData.phone.replace(/\D/g, "") || "cliente";
            await supabase
                .from("leads")
                .insert([{
                    name: `${formData.name} (${formData.business})`,
                    email: `${cleanDigits}@whatsapp.videoreels.cl`,
                    challenge: `Cotización Video Reels Visual. Plan: ${formData.plan}. WhatsApp: ${formData.phone}`,
                    budget: formData.plan
                }]);
        } catch (err) {
            console.warn("[VideoReels] Error local:", err);
        }

        setFormStatus("success");
        const mensajeWA = encodeURIComponent(
            `¡Hola! Vi el portafolio de Video Reels y quiero cotizar rodaje para mi marca.\n\n` +
            `• Mi Nombre: ${formData.name}\n` +
            `• Marca / Negocio: ${formData.business}\n` +
            `• Plan de Interés: ${formData.plan}\n` +
            `• Mi WhatsApp: ${formData.phone}\n\n` +
            `¿Tienen disponibilidad de rodaje para las próximas semanas?`
        );
        window.open(`https://wa.me/${WHATSAPP_NUM}?text=${mensajeWA}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-[#070709] text-white selection:bg-orange-500 selection:text-black font-sans antialiased">
            {/* Cinematic Film Grain Overlay */}
            <div 
                className="fixed inset-0 pointer-events-none z-50 opacity-[0.035] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            {/* NAV DE ESTUDIO */}
            <header className="sticky top-0 z-40 bg-[#070709]/90 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/videoreels" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-black text-sm tracking-tighter group-hover:scale-105 transition-transform">
                            VR
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-lg tracking-tight uppercase leading-none">
                                VIDEO REELS<span className="text-orange-500">.</span>
                            </span>
                            <span className="text-[10px] text-white/50 tracking-widest uppercase font-mono mt-0.5">
                                Santiago Studio • 9:16
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-white/70">
                        <a href="#showreel" className="hover:text-white transition-colors">Showreel</a>
                        <a href="#metodo" className="hover:text-white transition-colors">El Método</a>
                        <a href="#rodaje" className="hover:text-white transition-colors">El Rodaje</a>
                        <a href="#tarifas" className="hover:text-white transition-colors">Tarifas</a>
                    </nav>

                    <a
                        href="#cotizar"
                        className="px-5 py-2.5 rounded-full bg-white text-black font-extrabold text-xs tracking-wider uppercase hover:bg-orange-500 hover:text-white transition-all shadow-xl shadow-white/5"
                    >
                        Cotizar Rodaje
                    </a>
                </div>
            </header>

            {/* HERO SECTION VISUAL-FIRST */}
            <section className="relative pt-12 pb-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* Left: Punchy Editorial Copy */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                            <span>DISPONIBILIDAD: RODAJES NOVIEMBRE 2026</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-[0.95]">
                            Hacemos reels que la gente <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-rose-400">no se salta.</span>
                        </h1>

                        <p className="text-lg sm:text-xl text-white/70 max-w-xl font-normal leading-relaxed">
                            Producción de video vertical con cámaras de cine, guiones con ganchos de retención y arquitectura semántica para que tu marca venda todos los días en Instagram y TikTok.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <a
                                href="#showreel"
                                className="px-8 py-4 rounded-full bg-orange-500 text-black font-black text-xs uppercase tracking-widest hover:bg-orange-400 transition-all flex items-center gap-3 shadow-lg shadow-orange-500/20"
                            >
                                <Play className="w-4 h-4 fill-black text-black" />
                                <span>Ver Showreel de Casos</span>
                            </a>
                            <a
                                href="#cotizar"
                                className="px-8 py-4 rounded-full bg-white/5 border border-white/15 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors"
                            >
                                Agendar Rodaje
                            </a>
                        </div>

                        {/* Fast Stats Bar */}
                        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-md">
                            <div>
                                <p className="text-3xl font-black font-mono tracking-tight text-white">+12M</p>
                                <p className="text-[11px] text-white/40 uppercase font-mono tracking-wider mt-0.5">Vistas Orgánicas</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black font-mono tracking-tight text-white">4.8s</p>
                                <p className="text-[11px] text-white/40 uppercase font-mono tracking-wider mt-0.5">Retención Media</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black font-mono tracking-tight text-white">+380%</p>
                                <p className="text-[11px] text-white/40 uppercase font-mono tracking-wider mt-0.5">Conversión DM</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Real Vertical Video Player Hero Mockup */}
                    <div className="lg:col-span-5 flex justify-center">
                        <div className="relative w-[300px] sm:w-[340px] aspect-[9/16] rounded-[42px] p-3 bg-gradient-to-b from-white/20 via-white/5 to-white/10 border border-white/20 shadow-2xl shadow-orange-500/10 overflow-hidden group">
                            {/* Phone Screen */}
                            <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-black flex flex-col justify-between">
                                {/* Real Video Background */}
                                <video
                                    autoPlay
                                    loop
                                    muted={mutedStates["1"]}
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                    src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-neon-light-40032-large.mp4"
                                />

                                {/* Dark Gradient Scrim for Readability */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 pointer-events-none" />

                                {/* Top Bar */}
                                <div className="relative z-10 p-4 flex items-center justify-between text-xs">
                                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 font-mono text-[10px] font-bold tracking-wider text-orange-400">
                                        ● SHOWREEL LIVE
                                    </span>
                                    <button
                                        onClick={(e) => toggleMute("1", e)}
                                        aria-label="Silenciar o activar audio"
                                        className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95 hover:scale-105 transition-all touch-manipulation shadow-lg"
                                    >
                                        {mutedStates["1"] ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-orange-400" />}
                                    </button>
                                </div>

                                {/* Hook Banner */}
                                <div className="relative z-10 mx-4 bg-black/80 backdrop-blur-md border border-white/15 p-3 rounded-2xl shadow-xl">
                                    <p className="text-[9px] font-mono font-bold text-orange-400 uppercase tracking-widest">
                                        HOOK DE RETENCIÓN (0-3s)
                                    </p>
                                    <p className="text-sm font-black text-white leading-tight mt-0.5">
                                        “3 errores al vestir que destruyen tu imagen profesional”
                                    </p>
                                </div>

                                {/* Bottom Engagement Overlay */}
                                <div className="relative z-10 p-4 flex items-end justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-orange-500" />
                                            <span className="text-xs font-bold text-white tracking-tight">@videoreels.cl</span>
                                        </div>
                                        <p className="text-[11px] text-white/80 line-clamp-1">
                                            Estructura de ventas directa a WhatsApp...
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                            <Flame className="w-4 h-4 text-orange-400" />
                                        </div>
                                        <span className="text-[10px] font-mono font-bold">1.4M</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MARQUEE VISUAL BAR */}
            <div className="border-y border-white/10 bg-white/[0.02] py-5 overflow-hidden whitespace-nowrap">
                <div className="flex items-center gap-12 text-xs font-mono font-bold uppercase tracking-widest text-white/40 animate-marquee">
                    <span>• SONY FX3 CINEMA LINE</span>
                    <span>• MICRÓFONOS 32-BIT FLOAT</span>
                    <span>• ÓPTICAS ANAMÓRFICAS</span>
                    <span>• SOCIAL SEO SANTIAGO</span>
                    <span>• SUBTÍTULOS OCR CERTIFICADOS</span>
                    <span>• AUTOMATIZACIÓN MANYCHAT</span>
                    <span>• RETENCIÓN +70%</span>
                    <span>• CERO BAILES DE TIKTOK</span>
                </div>
            </div>

            {/* SHOWREEL / FEED INTERACTIVO (VIDEO PURO) */}
            <section id="showreel" className="py-24 px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
                            Portafolio Real
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
                            El Feed de Resultados
                        </h2>
                        <p className="text-sm text-white/60 mt-2 max-w-lg">
                            Reels grabados con cámaras de cine en Santiago de Chile. Haz clic en cualquier video para reproducir y ver la métrica comercial generada.
                        </p>
                    </div>

                    {/* Filtros por Categoría con swipe horizontal en móvil */}
                    <div className="flex overflow-x-auto scrollbar-none gap-2 pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 sm:flex-wrap">
                        {[
                            { id: "todos", label: "Todos" },
                            { id: "gastronomia", label: "Gastronomía" },
                            { id: "ecommerce", label: "E-Commerce" },
                            { id: "salud", label: "Salud & Clínicas" },
                            { id: "b2b", label: "B2B Corporativo" }
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all touch-manipulation ${
                                    selectedCategory === cat.id
                                        ? "bg-white text-black shadow-lg"
                                        : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid 9:16 de Videos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredReels.map((reel) => {
                        const isMuted = mutedStates[reel.id] ?? true;
                        return (
                            <div
                                key={reel.id}
                                className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-[9/16] flex flex-col justify-between p-4 cursor-pointer hover:border-white/30 transition-all hover:-translate-y-1 shadow-2xl"
                                onClick={() => setActiveVideo(reel)}
                            >
                                {/* Video Player */}
                                <video
                                    autoPlay
                                    loop
                                    muted={isMuted}
                                    playsInline
                                    poster={reel.poster}
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    src={reel.videoUrl}
                                />

                                {/* Gradient Scrim */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none" />

                                {/* Top Tags */}
                                <div className="relative z-10 flex items-center justify-between">
                                    <span 
                                        className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-black/60 border"
                                        style={{ borderColor: reel.accent, color: reel.accent }}
                                    >
                                        {reel.categoryLabel}
                                    </span>
                                    <button
                                        onClick={(e) => toggleMute(reel.id, e)}
                                        aria-label="Silenciar o activar audio"
                                        className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white active:scale-95 hover:bg-white hover:text-black transition-all touch-manipulation shadow-lg"
                                    >
                                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-orange-400" />}
                                    </button>
                                </div>

                                {/* Bottom Info & Results */}
                                <div className="relative z-10 space-y-2">
                                    <div className="space-y-0.5">
                                        <p className="text-[11px] text-white/50 font-mono">{reel.client}</p>
                                        <h3 className="font-black text-base text-white leading-snug group-hover:text-orange-400 transition-colors">
                                            {reel.title}
                                        </h3>
                                    </div>

                                    {/* Hook Snippet */}
                                    <p className="text-xs text-white/80 italic line-clamp-2 bg-black/40 backdrop-blur-sm p-2 rounded-xl border border-white/10">
                                        {reel.hook}
                                    </p>

                                    {/* Metrics Pill */}
                                    <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs font-mono">
                                        <span className="text-white font-bold flex items-center gap-1">
                                            <Eye className="w-3.5 h-3.5 text-white/60" /> {reel.views}
                                        </span>
                                        <span className="text-emerald-400 font-black">
                                            {reel.conversions}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* SECCIÓN "EL MÉTODO": MENOS TEXTO, MÁS CÁMARA */}
            <section id="metodo" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10 bg-white/[0.01]">
                <div className="max-w-3xl mb-16">
                    <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
                        El Método Anti-Bailes
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
                        Cómo convertimos 1 mañana de rodaje en 30 días de clientes
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Paso 1 */}
                    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                        <span className="text-3xl font-black font-mono text-orange-500">01</span>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white">
                            Investigamos qué busca tu cliente en Google e Instagram
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Cero improvisación. Rastreamos las 10 preguntas exactas que tus clientes le hacen a la barra de búsqueda y a ChatGPT antes de comprar tu servicio.
                        </p>
                    </div>

                    {/* Paso 2 */}
                    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                        <span className="text-3xl font-black font-mono text-orange-500">02</span>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white">
                            Rodamos en tu local u oficina con cámaras de cine
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Solo te pedimos 4 horas al mes. Llegamos con luces, micrófonos profesionales y teleprompter para que no tengas que memorizar nada.
                        </p>
                    </div>

                    {/* Paso 3 */}
                    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-4">
                        <span className="text-3xl font-black font-mono text-orange-500">03</span>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white">
                            Editamos, subtitulamos y conectamos a tu WhatsApp
                        </h3>
                        <p className="text-sm text-white/60 leading-relaxed">
                            Entregamos el pack listo para publicar: subtítulos dinámicos de alto impacto, copys con SEO local y disparador de comentarios para capturar clientes al DM.
                        </p>
                    </div>
                </div>
            </section>

            {/* SECCIÓN DETRÁS DE CÁMARAS / EQUIPAMIENTO */}
            <section id="rodaje" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
                <div className="rounded-[40px] bg-gradient-to-br from-white/10 via-white/[0.02] to-transparent border border-white/15 p-8 sm:p-14 overflow-hidden relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <span className="px-3 py-1 rounded-full bg-white text-black font-mono text-xs font-black uppercase tracking-wider">
                                Equipamiento de Cine
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white leading-none">
                                No grabamos con celular. Grabamos con estándares de publicidad.
                            </h2>
                            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                                La diferencia entre parecer un aficionado o una marca líder en Santiago está en la óptica, la iluminación y el sonido. Llevamos un set de cine compacto directamente a tus instalaciones.
                            </p>
                            <div className="grid grid-cols-2 gap-4 pt-4 text-xs font-mono text-white/80">
                                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                                    <Camera className="w-4 h-4 text-orange-400" />
                                    <span>Sony Cinema FX3 4K</span>
                                </div>
                                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-orange-400" />
                                    <span>Lavalier 32-bit Float</span>
                                </div>
                                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                                    <Sliders className="w-4 h-4 text-orange-400" />
                                    <span>Teleprompter Presencial</span>
                                </div>
                                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                                    <Film className="w-4 h-4 text-orange-400" />
                                    <span>Iluminación Aputure</span>
                                </div>
                            </div>
                        </div>

                        {/* Visual Image / Set Grid */}
                        <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&q=80"
                                alt="Film Set Video Reels"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                <p className="text-xs font-mono text-white/70">
                                    Rodaje comercial en Providencia • Santiago, Chile
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TARIFAS EDITORIALES Y MINIMALISTAS */}
            <section id="tarifas" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest">
                        Inversión Transparente
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white mt-1">
                        Packs Mensuales de Rodaje
                    </h2>
                    <p className="text-sm text-white/60 mt-2">
                        Todo incluido: guion, rodaje presencial, edición y entrega lista para pauta o redes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Pack 1 */}
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
                        <div className="space-y-4">
                            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Pack 01</span>
                            <h3 className="text-2xl font-black uppercase text-white">4 Video Reels</h3>
                            <p className="text-xs text-white/60">Para profesionales y fundadores que quieren empezar con autoridad.</p>
                            <div className="py-4 border-y border-white/10 font-mono">
                                <span className="text-4xl font-black text-white">$450.000</span>
                                <span className="text-xs text-white/50"> CLP/mes</span>
                            </div>
                            <ul className="space-y-2.5 text-xs text-white/80">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> 1 Sesión de rodaje (2 horas)</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> 4 Guiones con Social SEO</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> Edición y subtítulos fonéticos</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> Copys con palabras clave</li>
                            </ul>
                        </div>
                        <a
                            href="#cotizar"
                            onClick={() => setFormData({ ...formData, plan: "Pack 4 Reels ($450.000 CLP/mes)" })}
                            className="mt-8 w-full py-3.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-widest text-center hover:bg-white hover:text-black transition-all"
                        >
                            Elegir Pack 4
                        </a>
                    </div>

                    {/* Pack 2 (Destacado) */}
                    <div className="p-8 rounded-3xl bg-gradient-to-b from-white/10 via-white/[0.04] to-black border-2 border-orange-500 relative flex flex-col justify-between shadow-2xl shadow-orange-500/10">
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-orange-500 text-black font-black text-[10px] uppercase tracking-widest">
                            EL MÁS ELEGIDO
                        </div>
                        <div className="space-y-4">
                            <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">Pack 02 • Recomendado</span>
                            <h3 className="text-2xl font-black uppercase text-white">8 Video Reels</h3>
                            <p className="text-xs text-white/70">Frecuencia perfecta (2 videos por semana) para alimentar el algoritmo y vender.</p>
                            <div className="py-4 border-y border-white/10 font-mono">
                                <span className="text-4xl font-black text-white">$890.000</span>
                                <span className="text-xs text-white/50"> CLP/mes</span>
                            </div>
                            <ul className="space-y-2.5 text-xs text-white">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> <strong>Media jornada de rodaje (4 horas)</strong></li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> 8 Guiones de autoridad y venta</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> Audio de cine e iluminación pro</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> <strong>Disparador ManyChat (Comenta PRECIO)</strong></li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> 2 Adaptaciones para Meta Ads</li>
                            </ul>
                        </div>
                        <a
                            href="#cotizar"
                            onClick={() => setFormData({ ...formData, plan: "Pack 8 Reels ($890.000 CLP/mes)" })}
                            className="mt-8 w-full py-4 rounded-full bg-orange-500 text-black font-black text-xs uppercase tracking-widest text-center hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20"
                        >
                            Elegir Pack 8 (Recomendado)
                        </a>
                    </div>

                    {/* Pack 3 */}
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
                        <div className="space-y-4">
                            <span className="text-xs font-mono text-white/40 uppercase tracking-widest">Pack 03</span>
                            <h3 className="text-2xl font-black uppercase text-white">16 Video Reels</h3>
                            <p className="text-xs text-white/60">Para marcas con catálogo grande o clínicas que quieren dominar su comuna.</p>
                            <div className="py-4 border-y border-white/10 font-mono">
                                <span className="text-4xl font-black text-white">$1.590.000</span>
                                <span className="text-xs text-white/50"> CLP/mes</span>
                            </div>
                            <ul className="space-y-2.5 text-xs text-white/80">
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> Jornada completa de rodaje (8h)</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> 16 Guiones de alta retención</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> B-roll masivo de instalaciones</li>
                                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-400" /> 4 Variantes para anuncios pagados</li>
                            </ul>
                        </div>
                        <a
                            href="#cotizar"
                            onClick={() => setFormData({ ...formData, plan: "Pack 16 Reels ($1.590.000 CLP/mes)" })}
                            className="mt-8 w-full py-3.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase tracking-widest text-center hover:bg-white hover:text-black transition-all"
                        >
                            Elegir Pack 16
                        </a>
                    </div>
                </div>
            </section>

            {/* FORMULARIO DE AGENDAMIENTO DIRECTO */}
            <section id="cotizar" className="py-24 px-6 max-w-4xl mx-auto border-t border-white/10">
                <div className="p-8 sm:p-14 rounded-[36px] bg-gradient-to-b from-white/10 via-white/[0.03] to-transparent border border-white/15">
                    <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
                        <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">
                            Directo a tu WhatsApp
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
                            Agenda tu sesión de rodaje
                        </h2>
                        <p className="text-xs sm:text-sm text-white/60">
                            Déjanos tu WhatsApp y te contactaremos hoy mismo con 3 ideas de reels personalizadas para tu marca.
                        </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4 max-w-lg mx-auto">
                        <input
                            type="text"
                            name="_honeypot"
                            value={formData._honeypot}
                            onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })}
                            className="hidden"
                        />

                        <div>
                            <label className="block text-[11px] font-mono text-white/70 uppercase mb-1">
                                Tu Nombre:
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Ej: Rodrigo Valdés"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-mono text-white/70 uppercase mb-1">
                                    Marca o Rubro:
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Ej: Clínica Dental / Bar Grill"
                                    value={formData.business}
                                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                                    className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-mono text-white/70 uppercase mb-1">
                                    WhatsApp:
                                </label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+56 9 8765 4321"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-mono text-white/70 uppercase mb-1">
                                Plan de Interés:
                            </label>
                            <select
                                value={formData.plan}
                                onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                                className="w-full px-4 py-3.5 rounded-2xl bg-black/60 border border-white/15 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
                            >
                                <option value="Pack 4 Reels ($450.000 CLP/mes)">Pack 4 Reels ($450.000 CLP/mes)</option>
                                <option value="Pack 8 Reels ($890.000 CLP/mes)">Pack 8 Reels ($890.000 CLP/mes) [MÁS ELEGIDO]</option>
                                <option value="Pack 16 Reels ($1.590.000 CLP/mes)">Pack 16 Reels ($1.590.000 CLP/mes)</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={formStatus === "loading"}
                            className="w-full py-4 rounded-full bg-orange-500 text-black font-black text-xs uppercase tracking-widest hover:bg-orange-400 transition-all shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 mt-4"
                        >
                            {formStatus === "loading" ? (
                                <span>Coordinando...</span>
                            ) : (
                                <>
                                    <span>Solicitar Propuesta y Agendar Rodaje</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        <p className="text-[11px] text-center text-white/40 font-mono pt-2">
                            ● Respuesta directa en menos de 15 minutos hábiles vía WhatsApp
                        </p>
                    </form>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-white/10 py-12 px-6 max-w-7xl mx-auto pb-24 md:pb-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 font-mono">
                <div className="flex items-center gap-2">
                    <span className="font-black text-white">VIDEO REELS™</span>
                    <span>• Santiago de Chile</span>
                </div>
                <div>
                    Producción audiovisual vertical, Social SEO y conversión en pauta digital.
                </div>
            </footer>

            {/* STICKY BAR FLOTANTE EN MÓVILES */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
                <a
                    href="#cotizar"
                    className="w-full py-3.5 px-6 rounded-full bg-orange-500 text-black font-black text-xs uppercase tracking-widest flex items-center justify-between shadow-2xl shadow-orange-500/40 border border-orange-400/30 backdrop-blur-lg active:scale-95 transition-all"
                >
                    <span className="flex items-center gap-2">
                        <Flame className="w-4 h-4 fill-black" />
                        <span>Agendar Rodaje de Reels</span>
                    </span>
                    <ArrowRight className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}
