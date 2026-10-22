"use client";

import { CreditCard, Truck, Receipt, MessageSquare, ShieldCheck, Zap } from "lucide-react";

export default function LocalEcosystem() {
    const integrations = [
        {
            icon: CreditCard,
            category: "Pasarelas de Pago",
            title: "Webpay Plus & Mercado Pago",
            desc: "Acepta tarjetas de crédito, débito Redcompra y prepago sin salir de tu tienda. Cero comisiones de plataforma."
        },
        {
            icon: Truck,
            category: "Couriers & Despacho",
            title: "Starken, Chilexpress & Blue Express",
            desc: "Cotización de fletes en tiempo real para todas las comunas de Chile, retiro en tienda y generación de números de orden."
        },
        {
            icon: Receipt,
            category: "Tributario & Fiscal",
            title: "Boletas y Facturas SII Automáticas",
            desc: "Emisión de DTEs directamente al Servicio de Impuestos Internos vía SimpleAPI cada vez que se confirma un pago."
        },
        {
            icon: MessageSquare,
            category: "Conversacional & Ventas",
            title: "Meta WhatsApp Cloud API Oficial",
            desc: "Conexión directa con la API oficial de Meta para atención automatizada con IA y notificaciones transaccionales sin riesgo de baneo."
        }
    ];

    return (
        <section id="ecosistema" className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-20 border-t border-neutral-100">
            <div className="space-y-10">
                <div className="space-y-3 max-w-3xl">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">
                        INTEGRACIONES NATIVAS PARA CHILE
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-neutral-900 leading-tight">
                        Todo lo que tu comercio necesita para operar en Chile.
                    </h2>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">
                        Olvídate de configurar plugins inestables que se caen en fechas como CyberDay. La infraestructura de Mercenario OS viene pre-configurada para los estándares comerciales y tributarios chilenos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {integrations.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={idx}
                                className="p-6 bg-white rounded-2xl border border-neutral-200 hover:border-black transition-colors space-y-3 shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900 shrink-0">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider font-bold block">
                                            {item.category}
                                        </span>
                                        <h3 className="text-base font-bold text-neutral-900">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed pl-1">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
