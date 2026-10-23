"use client";

import { useState } from "react";
import { Check, ArrowRight, Sparkles, ShieldCheck, HelpCircle } from "lucide-react";

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
            tagline: "Crea tu tienda online personalizada de alta velocidad y vende sin comisiones.",
            priceMonthly: 14990,
            priceAnnual: 11990,
            features: [
                "Tienda online autoadministrable (Next.js carga <0.8s)",
                "Catálogo, visitas y ventas 100% ilimitadas",
                "0% de comisión por venta de la plataforma",
                "Integración Webpay Plus (Transbank) y Mercado Pago",
                "Cotizador de envíos en tiempo real (Starken y Chilexpress)",
                "Checkout optimizado con autocompletado de RUT chileno",
                "Certificado SSL gratis y dominio propio .cl",
                "1 usuario administrador con panel móvil"
            ],
            cta: "Probar 14 días gratis",
            isFeatured: false
        },
        {
            id: "omnicanal",
            slug: "omnicanal",
            badge: "MÁS POPULAR · EL RECOMENDADO",
            name: "Negocio Omnicanal",
            tagline: "Unifica tu local físico y tu tienda web con Punto de Venta (POS) y Boletas del SII.",
            priceMonthly: 44990,
            priceAnnual: 35990,
            features: [
                "Todo lo incluido en el plan Starter Digital",
                "Punto de Venta (POS) para mostrador físico y ferias",
                "Emisión automática de Boletas y Facturas Electrónicas al SII",
                "Sincronización de stock en tiempo real (si vendes en tienda, descuenta en web)",
                "Lector de código de barras, control de caja diaria y arqueo",
                "CRM con ficha de clientes por RUT y segmentación",
                "3 usuarios administradores con roles diferenciados",
                "Soporte prioritario y personalizado por WhatsApp"
            ],
            cta: "Empezar con Omnicanal",
            isFeatured: true
        },
        {
            id: "pro_ai",
            slug: "pro_ai",
            badge: "ALTO RENDIMIENTO + IA",
            name: "Retail Pro + Asistente IA",
            tagline: "Vende en automático por WhatsApp 24/7 y expande tus canales mayoristas B2B.",
            priceMonthly: 89990,
            priceAnnual: 71990,
            features: [
                "Todo lo incluido en el plan Negocio Omnicanal",
                "Agente Oficial WhatsApp Cloud 24/7 con IA viva (RAG de catálogo y stock)",
                "1.000 conversaciones mensuales de WhatsApp incluidas (+$45 CLP/extra)",
                "Bandeja unificada LiveChat con derivación fluida a humano (Handoff)",
                "Listas de precios mayoristas B2B diferenciadas por RUT cliente",
                "Meta Conversions API (CAPI) server-side y Google Analytics 4",
                "Multi-bodega y centros de distribución ilimitados",
                "Usuarios y perfiles de gestión ilimitados"
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
        <section id="planes" className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 space-y-10 border-t border-neutral-100">
            {/* Header */}
            <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-[11px] font-mono font-bold uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PLANES EN PESOS CHILENOS (+IVA) · 0% COMISIÓN</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                    Precios transparentes. <br />
                    <span className="text-neutral-500 font-light">Proyectos 100% personalizados.</span>
                </h2>

                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                    Sin comisiones sobre tus ventas. Te entregamos un sistema adaptado a tu rubro, con boleta electrónica, punto de venta y soporte directo en Chile.
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

            {/* Aviso Destacado: PROYECTO PERSONALIZADO */}
            <div className="bg-neutral-900 text-white rounded-2xl p-5 sm:p-6 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-white">
                            Cada proyecto es 100% personalizado
                        </h4>
                        <p className="text-xs text-neutral-300 font-light leading-relaxed">
                            No te entregamos una plantilla genérica. Adaptamos el diseño visual, las reglas tributarias, las pasarelas de pago y los circuitos de bodega a la realidad operativa exacta de tu negocio.
                        </p>
                    </div>
                </div>
                <a
                    href="#contacto"
                    className="shrink-0 px-4 py-2 bg-white text-black hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap"
                >
                    Asesoría Personalizada
                </a>
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
                                        {billingCycle === "annual" ? "Cobrado anualmente (Ahorro del 20%)" : "Sin contratos forzados, cancela cuando quieras"}
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
                                    Configuración y puesta en marcha personalizada
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
                        ¿No tienes tiempo de configurar? Te entregamos el sistema 100% llave en mano.
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                        Cargamos tus productos iniciales, homologamos tu certificado del SII con la pasarela para boletas automáticas, integramos Webpay/Mercado Pago, Starken y dejamos el Punto de Venta listo para operar.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 w-full md:w-auto">
                    <div className="text-left md:text-right">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase block">Setup Personalizado Único</span>
                        <span className="text-xl font-mono font-bold text-neutral-900">$149.000 + IVA CLP</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => onSelectPlan("Servicio Llave en Mano Express ($149.000 CLP)")}
                        className="w-full sm:w-auto px-5 py-3 border border-neutral-300 hover:border-black bg-white text-black text-xs font-mono uppercase tracking-wider rounded-xl transition-colors font-bold whitespace-nowrap text-center"
                    >
                        Solicitar Setup Express
                    </button>
                </div>
            </div>
        </section>
    );
}
