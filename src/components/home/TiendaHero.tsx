"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, Smartphone, CreditCard, ShoppingBag } from "lucide-react";
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

                    {/* Formulario de entrada instantáneo estilo Tiendanube */}
                    <form 
                        onSubmit={handleSubmit}
                        className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-2.5 p-2 bg-white rounded-2xl sm:rounded-full border-2 border-neutral-200 focus-within:border-black shadow-lg transition-all"
                    >
                        <div className="relative w-full flex items-center pl-4 pr-2">
                            <span className="text-neutral-400 text-sm font-medium pr-1 select-none">
                                mitienda.cl/
                            </span>
                            <input
                                type="text"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                                placeholder="el-nombre-de-tu-marca"
                                className="w-full py-2.5 text-sm md:text-base font-semibold text-neutral-900 placeholder:text-neutral-400 placeholder:font-normal bg-transparent focus:outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full sm:w-auto shrink-0 px-7 py-3.5 bg-black hover:bg-neutral-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl sm:rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                        >
                            <span>Crear mi tienda</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {/* Micro-beneficios de confianza inmediata */}
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 pt-1">
                        <div className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>14 días de prueba gratis</span>
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

                {/* ─── SHOWCASE MOCKUP VISUAL DE LA TIENDA ─── */}
                <div className="mt-12 md:mt-16 relative max-w-5xl mx-auto">
                    <div className="relative rounded-2xl md:rounded-3xl border border-neutral-200/80 bg-neutral-950 p-2 sm:p-4 shadow-2xl overflow-hidden">
                        
                        {/* Barra superior de navegador falso */}
                        <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-800 text-neutral-400 text-xs">
                            <div className="flex items-center gap-1.5">
                                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                            </div>
                            <div className="bg-neutral-900 px-4 py-1 rounded-full text-[11px] font-mono text-neutral-300 flex items-center gap-1.5">
                                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                <span>https://tumarca.cl</span>
                            </div>
                            <div className="text-[10px] font-mono text-neutral-500">
                                0.8s Carga
                            </div>
                        </div>

                        {/* Contenido interactivo simulado de la tienda */}
                        <div className="bg-white rounded-xl p-4 sm:p-8 space-y-6">
                            
                            {/* Barra de la tienda demo */}
                            <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                                <div className="flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-black text-sm">
                                        M
                                    </span>
                                    <span className="font-bold text-neutral-900 text-sm sm:text-base tracking-tight">
                                        TU MARCA CHILE
                                    </span>
                                </div>
                                <div className="hidden sm:flex items-center gap-6 text-xs font-medium text-neutral-600">
                                    <span>Colección 2026</span>
                                    <span>Lo más vendido</span>
                                    <span>Sucursales</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-neutral-100 text-neutral-800 relative">
                                        <ShoppingBag className="w-4 h-4" />
                                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                            2
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Banner promocional limpio */}
                            <div className="w-full bg-neutral-900 text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="space-y-1 text-center sm:text-left">
                                    <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold">
                                        EN VIVO · WEBPAY PLUS ACTIVO
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                                        Envío a todo Chile con Starken y Chilexpress
                                    </h3>
                                    <p className="text-xs text-neutral-300 font-light">
                                        Paga hasta en 6 cuotas sin interés y recibe boleta electrónica al instante.
                                    </p>
                                </div>
                                <div className="shrink-0">
                                    <Link
                                        href="/tienda"
                                        className="px-5 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-100 transition-colors inline-block"
                                    >
                                        Ver tienda demo
                                    </Link>
                                </div>
                            </div>

                            {/* Grid de productos de muestra */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                                {[
                                    { name: "Chaqueta Cortaviento Térmica", price: "$49.990", tag: "Más Vendido", stock: "12 disponibles" },
                                    { name: "Botella Acero Térmica 1L", price: "$18.990", tag: "Envío Gratis", stock: "28 disponibles" },
                                    { name: "Mochila Urbana Impermeable", price: "$34.990", tag: "Webpay 3 cuotas", stock: "5 disponibles" },
                                    { name: "Gorro Lana Merino", price: "$12.990", tag: "0% Comisión", stock: "40 disponibles" },
                                ].map((prod, idx) => (
                                    <div key={idx} className="p-3 bg-neutral-50 rounded-xl border border-neutral-100 space-y-2">
                                        <div className="w-full aspect-square bg-neutral-200/70 rounded-lg flex items-center justify-center text-neutral-400 text-xs font-mono">
                                            Producto 0{idx + 1}
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-neutral-200/80 text-neutral-700 rounded">
                                                {prod.tag}
                                            </span>
                                            <h4 className="text-xs font-bold text-neutral-900 truncate">
                                                {prod.name}
                                            </h4>
                                            <div className="flex items-center justify-between pt-1">
                                                <span className="text-xs font-black text-neutral-900 font-mono">
                                                    {prod.price}
                                                </span>
                                                <span className="text-[10px] text-emerald-600 font-mono">
                                                    {prod.stock}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Notification: Venta en vivo */}
                        <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md border border-neutral-200 shadow-xl rounded-2xl px-4 py-3 max-w-sm animate-bounce-subtle">
                            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                <CreditCard className="w-4 h-4" />
                            </div>
                            <div className="text-left text-xs">
                                <p className="font-bold text-neutral-900">
                                    ¡Nueva venta de $49.990!
                                </p>
                                <p className="text-[11px] text-neutral-500 font-light">
                                    Pagado con Webpay · Boleta SII #412 emitida
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
