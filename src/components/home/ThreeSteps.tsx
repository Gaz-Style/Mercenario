"use client";

import { Palette, CreditCard, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ThreeSteps() {
    const steps = [
        {
            number: "01",
            title: "Elige tu diseño y personalízalo",
            description: "Selecciona una plantilla moderna pensada para vender desde el celular. Cambia los colores, agrega tu logo y banners en minutos. Sin escribir una sola línea de código.",
            icon: Palette,
            badge: "Sin saber programación",
            detail: "Diseño 100% adaptable a smartphones y computadores."
        },
        {
            number: "02",
            title: "Sube tus productos y conecta tus pagos",
            description: "Carga tus fotos, precios y tallas. Activa Transbank Webpay Plus y Mercado Pago en un clic para recibir pagos con débito, crédito y cuotas. El dinero entra directo a tu cuenta.",
            icon: CreditCard,
            badge: "Webpay + Cuotas",
            detail: "Acepta tarjetas de todos los bancos en Chile."
        },
        {
            number: "03",
            title: "Envía a todo Chile o Retiro en Tienda",
            description: "Cotizador automático multicourier en tiempo real (Starken, Chilexpress y Blue Express vía Shipit) según la comuna del cliente, o retiro en tienda física ($0) configurable desde tu panel.",
            icon: Truck,
            badge: "Multi-Courier + Retiro",
            detail: "Cálculo por comuna, tarifas reales y DTE automático."
        }
    ];

    return (
        <section id="como-funciona" className="w-full py-20 bg-white border-b border-neutral-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                
                {/* Header de la sección */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400">
                        RÁPIDO, INTUITIVO Y SIN FRICCIÓN
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
                        Vender nunca fue tan fácil. <br />
                        <span className="text-neutral-500 font-light">Tu tienda lista en 3 simples pasos.</span>
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                        Olvídate de procesos técnicos complicados. Diseñamos la plataforma para que cualquier comerciante pueda abrir su canal digital hoy mismo.
                    </p>
                </div>

                {/* Los 3 Pasos */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <div 
                                key={idx} 
                                className="relative bg-neutral-50 rounded-3xl p-8 border border-neutral-200/80 hover:border-black transition-all hover:shadow-lg flex flex-col justify-between group"
                            >
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-black font-mono text-neutral-900 group-hover:text-black transition-colors">
                                            {step.number}
                                        </span>
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-sm group-hover:bg-black group-hover:text-white transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="inline-block px-2.5 py-1 bg-neutral-200/70 text-neutral-800 text-[10px] font-mono font-bold uppercase rounded-md">
                                            {step.badge}
                                        </span>
                                        <h3 className="text-xl font-bold text-neutral-900 tracking-tight leading-snug">
                                            {step.title}
                                        </h3>
                                    </div>

                                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>

                                <div className="pt-6 mt-6 border-t border-neutral-200/60 text-[11px] font-medium text-neutral-500 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>{step.detail}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA inferior */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <a
                        href="#planes"
                        className="px-8 py-4 bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-colors shadow-sm flex items-center gap-2"
                    >
                        <span>Empieza tu prueba gratis de 14 días</span>
                        <ArrowRight className="w-4 h-4" />
                    </a>
                    <Link
                        href="/tienda"
                        className="px-8 py-4 border border-neutral-300 text-neutral-800 text-xs sm:text-sm font-bold uppercase tracking-wider rounded-full hover:border-black hover:text-black transition-colors"
                    >
                        Probar tienda de demostración
                    </Link>
                </div>
            </div>
        </section>
    );
}
