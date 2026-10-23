"use client";

import { CreditCard, Truck, MessageCircle, Store, FileText, Smartphone, ArrowRight } from "lucide-react";

export default function OmnichannelPillars() {
    const pillars = [
        {
            icon: CreditCard,
            tag: "COBROS FÁCILES",
            title: "Recibe pagos con tarjetas y cuotas",
            description: "Ofrece a tus clientes pagar con Redcompra, tarjetas de débito, crédito y transferencias bancarias mediante Webpay Plus y Mercado Pago. El dinero va directo a tu cuenta bancaria.",
            highlight: "Hasta 12 cuotas bancarias"
        },
        {
            icon: Truck,
            tag: "LOGÍSTICA & DESPACHO",
            title: "Multi-Courier en vivo y Retiro en Tienda",
            description: "Cotizador inteligente por comuna conectado a Starken, Chilexpress y Blue Express vía Shipit. Tus clientes eligen el courier más rápido o económico, o seleccionan Retiro en Tienda ($0) con los horarios que tú configuras en el panel.",
            highlight: "Cotización por comuna + Retiro"
        },
        {
            icon: MessageCircle,
            tag: "VENTA SOCIAL",
            title: "Vende en Instagram, TikTok y WhatsApp",
            description: "Conecta tu catálogo a tus redes sociales para etiquetar productos en tus publicaciones. Envía links directos de pago por WhatsApp y atiende con un asistente inteligente 24/7.",
            highlight: "Catálogo sincronizado"
        },
        {
            icon: Store,
            tag: "TIENDA FÍSICA + WEB",
            title: "¿Tienes local a la calle? Punto de Venta (POS) incluido",
            description: "Usa nuestro sistema de caja en tu mesón o tablet. Si vendes una polera en tu tienda física, el stock de la página web se descuenta en el mismo segundo para evitar quiebres de inventario.",
            highlight: "Stock unificado en tiempo real"
        },
        {
            icon: FileText,
            tag: "TRIBUTARIO CHILE",
            title: "Boletas y facturas electrónicas al SII",
            description: "Cada compra emite automáticamente su boleta electrónica legal ante el Servicio de Impuestos Internos (SII) y la envía por correo al comprador. Sin contratar apps externas costosas.",
            highlight: "100% legal y automático"
        },
        {
            icon: Smartphone,
            tag: "GESTIÓN EN TU BOLSILLO",
            title: "Maneja todo desde tu celular",
            description: "Recibe alertas sonoras con cada nueva venta. Actualiza precios, agrega fotos de nuevos productos, revisa el estado de tus despachos y consulta tus ventas del mes desde cualquier lugar.",
            highlight: "Panel móvil intuitivo"
        }
    ];

    return (
        <section id="soluciones" className="w-full py-20 bg-neutral-900 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
                        ECOSISTEMA INTEGRAL
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        Todo lo que tu marca necesita <br />
                        <span className="text-neutral-400 font-light">en un solo lugar.</span>
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                        No necesitas pagar 5 herramientas distintas ni contratar programadores. Mercenario reúne todo el circuito comercial listo para operar.
                    </p>
                </div>

                {/* Grid de 6 pilares */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pillars.map((pillar, idx) => {
                        const Icon = pillar.icon;
                        return (
                            <div 
                                key={idx}
                                className="bg-neutral-850 border border-neutral-800 rounded-3xl p-7 flex flex-col justify-between hover:border-neutral-600 transition-all space-y-6 group"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-black transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-400">
                                            {pillar.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                                        {pillar.title}
                                    </h3>

                                    <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-medium text-emerald-400 font-mono">
                                    <span>{pillar.highlight}</span>
                                    <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
