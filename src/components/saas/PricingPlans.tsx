"use client";

import { useState } from "react";
import { Check, ArrowRight, Zap, HelpCircle, Sparkles, Building2, Store } from "lucide-react";

interface PricingPlansProps {
    onSelectPlan: (planName: string) => void;
}

export default function PricingPlans({ onSelectPlan }: PricingPlansProps) {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

    const plans = [
        {
            id: "starter",
            slug: "starter",
            badge: "Para Iniciar",
            name: "Starter Digital",
            tagline: "Crea tu tienda online profesional y empieza a vender sin comisiones.",
            priceMonthly: 9990,
            priceAnnual: 7990,
            features: [
                "Tienda online autoadministrable (Carga ultrarrápida Next.js)",
                "Catálogo, visitas y ventas ilimitadas (sin límites)",
                "0% de comisión por venta de la plataforma",
                "Integración Webpay Plus (Transbank) y Mercado Pago",
                "Cotizador de envíos en tiempo real (Starken y Chilexpress)",
                "Checkout optimizado para celulares y recuperación de carritos",
                "Certificado de seguridad SSL gratis y dominio personalizado",
                "1 usuario administrador"
            ],
            cta: "Probar 7 días gratis",
            isFeatured: false
        },
        {
            id: "omnicanal",
            slug: "omnicanal",
            badge: "MÁS POPULAR · EL RECOMENDADO",
            name: "Negocio Omnicanal",
            tagline: "Unifica tu local físico y tu tienda web con inventario sincronizado y boletas SII.",
            priceMonthly: 24990,
            priceAnnual: 19990,
            features: [
                "Todo lo incluido en el plan Starter Digital",
                "Punto de Venta (POS) para mostrador y tienda física",
                "Control de inventario multi-sucursal y multi-bodega en vivo",
                "Emisión automática de Boletas y Facturas Electrónicas SII (SimpleAPI)",
                "CRM de clientes con RUT chileno y segmentación VIP",
                "Gestión de acciones masivas sobre precios y catálogo",
                "3 usuarios administradores con roles de acceso",
                "Soporte prioritario por WhatsApp en español"
            ],
            cta: "Empezar con Omnicanal",
            isFeatured: true
        },
        {
            id: "pro_ai",
            slug: "pro_ai",
            badge: "ESCALABILIDAD TOTAL",
            name: "Pro + Asistente IA",
            tagline: "Automatiza tu atención por WhatsApp 24/7 y expande tu venta B2B y mayorista.",
            priceMonthly: 64990,
            priceAnnual: 49990,
            features: [
                "Todo lo incluido en el plan Negocio Omnicanal",
                "Asistente WhatsApp Oficial 24/7 con IA entrenada con tu catálogo (RAG)",
                "Panel LiveChat centralizado con derivación a humano (Handoff)",
                "Tablas de precios mayoristas y cotizaciones B2B",
                "Meta Conversions API (CAPI) server-side y Google Analytics 4",
                "Centros de distribución y bodegas ilimitadas",
                "Usuarios y perfiles de gestión ilimitados",
                "Onboarding asistido 1 a 1 y soporte técnico VIP"
            ],
            cta: "Elegir Plan Pro + IA",
            isFeatured: false
        }
    ];

    const formatCLP = (val: number) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <section id="planes" className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 space-y-12 border-t border-neutral-100">
            {/* Header */}
            <div className="space-y-4 max-w-3xl">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">
                    PLANES SAAS CHILE · VALORES EN CLP (+IVA) · 0% COMISIÓN
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                    Planes transparentes a la medida de tu negocio.
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                    Sin comisiones por venta. Elige el plan que necesitas para vender online, o activa la potencia omnicanal con boleta electrónica y asistente de WhatsApp con IA.
                </p>

                {/* Toggle Mensual / Anual */}
                <div className="pt-2 flex items-center gap-3 select-none">
                    <div className="inline-flex items-center p-1 bg-neutral-100 rounded-full border border-neutral-200">
                        <button
                            type="button"
                            onClick={() => setBillingCycle("monthly")}
                            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                                billingCycle === "monthly"
                                    ? "bg-white text-black shadow-sm"
                                    : "text-neutral-500 hover:text-black"
                            }`}
                        >
                            Facturación Mensual
                        </button>
                        <button
                            type="button"
                            onClick={() => setBillingCycle("annual")}
                            className={`px-4 py-1.5 rounded-full text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                                billingCycle === "annual"
                                    ? "bg-black text-white shadow-sm"
                                    : "text-neutral-500 hover:text-black"
                            }`}
                        >
                            <span>Pago Anual</span>
                            <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] rounded-full uppercase tracking-wider">
                                2 meses gratis
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid de los 3 Planes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((p) => {
                    const price = billingCycle === "annual" ? p.priceAnnual : p.priceMonthly;
                    return (
                        <div
                            key={p.id}
                            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                                p.isFeatured
                                    ? "bg-neutral-900 text-white border-2 border-black shadow-2xl md:-translate-y-2"
                                    : "bg-white text-neutral-900 border border-neutral-200 shadow-sm hover:border-neutral-400"
                            }`}
                        >
                            {p.isFeatured && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-mono uppercase px-4 py-1 rounded-full font-black tracking-wider shadow-md">
                                    {p.badge}
                                </div>
                            )}

                            <div className="space-y-6">
                                {/* Header del Plan */}
                                <div className="space-y-2">
                                    {!p.isFeatured && (
                                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                                            {p.badge}
                                        </span>
                                    )}
                                    <h3 className="text-2xl font-black tracking-tight">{p.name}</h3>
                                    <p className={`text-xs leading-relaxed font-light ${p.isFeatured ? "text-neutral-300" : "text-neutral-600"}`}>
                                        {p.tagline}
                                    </p>
                                </div>

                                {/* Precio */}
                                <div className="space-y-1 pb-6 border-b border-neutral-100/20">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl sm:text-4xl font-mono font-black tracking-tight">
                                            {formatCLP(price)}
                                        </span>
                                        <span className={`text-xs font-mono ${p.isFeatured ? "text-neutral-400" : "text-neutral-500"}`}>
                                            + IVA /mes
                                        </span>
                                    </div>
                                    <span className={`text-[10px] font-mono block ${p.isFeatured ? "text-neutral-400" : "text-neutral-400"}`}>
                                        {billingCycle === "annual" ? "Cobrado anualmente (Ahorro del 20%)" : "Sin contrato forzado, cancela cuando quieras"}
                                    </span>
                                </div>

                                {/* Lista de Features */}
                                <ul className="space-y-3 text-xs leading-relaxed">
                                    {p.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${p.isFeatured ? "text-emerald-400" : "text-neutral-900"}`} />
                                            <span className={p.isFeatured ? "text-neutral-200" : "text-neutral-700 font-light"}>
                                                {feat}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Botón CTA */}
                            <div className="pt-8">
                                <button
                                    type="button"
                                    onClick={() => onSelectPlan(`${p.name} (${formatCLP(price)} CLP/mes)`)}
                                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all ${
                                        p.isFeatured
                                            ? "bg-white text-black hover:bg-neutral-100 shadow-md"
                                            : "bg-black text-white hover:bg-neutral-800"
                                    }`}
                                >
                                    <span>{p.cta}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                                <span className={`text-[10px] text-center block pt-2 font-mono ${p.isFeatured ? "text-neutral-400" : "text-neutral-400"}`}>
                                    Activación inmediata en 24h
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Servicio Addon: Llave en Mano Express */}
            <div className="border border-neutral-200 bg-neutral-50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-bold">
                            SERVICIO OPCIONAL · ACTIVACIÓN EXPRESS 48H
                        </span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-neutral-900">
                        ¿No tienes tiempo de configurar tu tienda? Te la entregamos lista para vender.
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                        Cargamos tus primeros 50 productos, vinculamos tu cuenta de Webpay Transbank o Mercado Pago, configuramos tus tarifas de Starken/Chilexpress y capacitamos a tu equipo.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 w-full md:w-auto">
                    <div className="text-left md:text-right">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase block">Pago Único de Setup</span>
                        <span className="text-xl font-mono font-bold text-neutral-900">$89.000 + IVA CLP</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => onSelectPlan("Servicio Llave en Mano ($89.000 CLP)")}
                        className="w-full sm:w-auto px-5 py-3 border border-neutral-300 hover:border-black bg-white text-black text-xs font-mono uppercase tracking-wider rounded-xl transition-colors font-bold whitespace-nowrap text-center"
                    >
                        Solicitar Setup Express
                    </button>
                </div>
            </div>
        </section>
    );
}
