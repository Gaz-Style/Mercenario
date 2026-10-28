"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, Smartphone, CreditCard, ShoppingBag, Stethoscope, ExternalLink } from "lucide-react";
import Link from "next/link";

interface TiendaHeroProps {
    onStartTrial?: (storeName: string) => void;
}

export default function TiendaHero({ onStartTrial }: TiendaHeroProps) {
    const [storeName, setStoreName] = useState("");
    const WHATSAPP_NUM = "56957958467";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanName = storeName.trim();
        const targetUrl = cleanName
            ? `https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quiero%20crear%20mi%20tienda%20online%20para%20mi%20marca%20*${encodeURIComponent(cleanName)}*`
            : `https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quiero%20crear%20mi%20tienda%20online%20con%20Mercenario`;
        window.open(targetUrl, "_blank");
    };

    return (
        <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-white border-b border-neutral-100">
            {/* Elementos sutiles de fondo */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-emerald-100/40 via-neutral-100/60 to-transparent blur-3xl pointer-events-none rounded-full" />
            
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
                    
                    {/* Badge de confianza */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-[11px] font-medium tracking-wide shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>La plataforma de comercio para vender en Chile</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-neutral-300 font-bold">0% Comisión</span>
                    </div>

                    {/* Titular Principal simple y directo */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-neutral-950 tracking-tight leading-[1.08]">
                        Crea tu tienda online y vende a todo Chile <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
                            sin complicaciones.
                        </span>
                    </h1>

                    {/* Bajada clara, humana y sin tecnicismos */}
                    <p className="text-base sm:text-lg md:text-xl text-neutral-600 font-light leading-relaxed max-w-2xl">
                        Todo lo que tu marca necesita: pagos con tarjetas y cuotas, envíos automáticos con Starken y Chilexpress, boletas del SII y control de stock unificado. <strong className="font-semibold text-neutral-900">Sin saber de programación.</strong>
                    </p>

                    {/* Selector de Demos en Vivo: E-Commerce (WEKE) & Clínicas (Clinicafy) */}
                    <div className="w-full max-w-xl flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                        {/* Botón 1: Demo E-Commerce / Retail */}
                        <Link
                            href="/tienda"
                            className="w-full sm:w-1/2 px-6 py-4 bg-black hover:bg-neutral-800 text-white rounded-2xl flex items-center justify-between gap-3 transition-all hover:scale-[1.02] shadow-xl group border border-black"
                        >
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white/20 transition-colors">
                                    <ShoppingBag className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-semibold">
                                        Retail &amp; Marcas
                                    </span>
                                    <span className="text-sm font-black tracking-tight text-white block">
                                        Demo E-Commerce
                                    </span>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </Link>

                        {/* Botón 2: Demo Clinicafy */}
                        <a
                            href="https://clinicafy-beige.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-1/2 px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-2xl flex items-center justify-between gap-3 transition-all hover:scale-[1.02] shadow-xl group border border-emerald-400"
                        >
                            <div className="flex items-center gap-3 text-left">
                                <div className="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center text-neutral-950 shrink-0 group-hover:bg-black/15 transition-colors">
                                    <Stethoscope className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-950/70 block font-semibold">
                                        Salud &amp; Consultas
                                    </span>
                                    <span className="text-sm font-black tracking-tight text-neutral-950 block">
                                        Demo Clinicafy
                                    </span>
                                </div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-emerald-950/70 group-hover:text-neutral-950 group-hover:translate-x-0.5 transition-all" />
                        </a>
                    </div>

                    {/* Micro-beneficios de confianza inmediata */}
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 pt-1">
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>100% Llave en mano</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Sin tarjeta de crédito</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>0% de comisión por venta</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Lista en 15 minutos</span>
                        </div>
                    </div>
                </div>

                {/* ─── HERO VISUAL: PLATAFORMA OPERATIVA MERCENARIO EN VIVO ─── */}
                <div className="mt-12 md:mt-16 relative max-w-5xl mx-auto">
                    <div className="relative rounded-2xl md:rounded-3xl border border-neutral-200/90 bg-neutral-950 p-2 sm:p-3 shadow-2xl overflow-hidden group">
                        
                        {/* Barra superior de navegador de alta fidelidad */}
                        <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 text-neutral-400 text-xs bg-neutral-900/80 rounded-t-xl">
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                            </div>
                            <div className="bg-neutral-950 px-4 py-1 rounded-full text-[11px] font-mono text-neutral-300 flex items-center gap-1.5 border border-white/5">
                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                <span>https://mercenario.cl/operacion-conectada</span>
                            </div>
                            <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span>0.8s Edge Carga</span>
                            </div>
                        </div>

                        {/* Imagen Hero Central con Overlay Editorial y Badges Operativos en Vivo */}
                        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl overflow-hidden bg-neutral-900">
                            <img
                                src="/images/mercenario_hero_dashboard.jpg"
                                alt="Mercenario OS - Plataforma Operativa Comercial"
                                className="w-full h-full object-cover object-center group-hover:scale-[1.01] transition-transform duration-700"
                            />
                            
                            {/* Gradiente sutil para legibilidad y acabado cinematográfico */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                            {/* Badge Flotante Superior Izquierdo: Estado de la Operación */}
                            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                <span className="font-bold tracking-wider">SISTEMA ACTIVO 24/7</span>
                            </div>

                            {/* Badge Flotante Superior Derecho: Webpay & Boleta SII */}
                            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-mono">
                                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Webpay Plus & Boleta SII Conectados</span>
                            </div>

                            {/* Barra Inferior de Métricas en Vivo */}
                            <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 text-white">
                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                                            <span>Operación Unificada en Tiempo Real</span>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-black font-black uppercase">
                                                Sin Fricción
                                            </span>
                                        </div>
                                        <div className="text-[11px] text-neutral-300 font-light">
                                            Web ultra rápida &bull; WhatsApp IA 24/7 &bull; Pagos &bull; Stock sincronizado
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                                    <Link
                                        href="/tienda"
                                        className="px-4 py-2 bg-white text-black hover:bg-neutral-100 text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
                                    >
                                        Explorar Tienda Demo &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
