"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function SimpleFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: "¿Necesito saber de programación o diseño para crear mi tienda?",
            a: "No, para nada. La plataforma está pensada para que cualquier persona pueda gestionar su tienda sin tocar una sola línea de código. Todo se personaliza de forma visual: subir productos, cambiar fotos, ajustar colores y ordenar categorías toma solo un par de clics."
        },
        {
            q: "¿Cómo y cuándo recibo el dinero de mis ventas?",
            a: "El dinero de tus ventas no pasa por intermediarios innecesarios. Se deposita directamente en tu cuenta corriente o vista según los plazos habituales de las pasarelas en Chile (por ejemplo, Transbank Webpay Plus abona en 24 a 48 horas hábiles directamente a tu banco)."
        },
        {
            q: "¿Puedo usar mi propio dominio .cl?",
            a: "Sí, por supuesto. Puedes conectar tu dominio propio (por ejemplo, www.tumarca.cl) en minutos. Además, te entregamos certificado de seguridad SSL gratis para que tus clientes compren con total confianza."
        },
        {
            q: "¿Cobran comisión por las ventas que realizo?",
            a: "No. En Mercenario cobramos 0% de comisión por venta en todos nuestros planes. El 100% de la venta es tuyo; solo aplica la tarifa habitual de la pasarela de pago que elijas (como la comisión estándar de Webpay o Mercado Pago)."
        },
        {
            q: "¿Qué pasa si ya tengo una tienda física o local a la calle?",
            a: "Esa es una de nuestras mayores ventajas frente a otras plataformas. Mercenario incluye un Punto de Venta (POS) para tu tienda física. Si vendes una prenda o producto en tu mesón físico, el stock de la página web se descuenta automáticamente en el mismo segundo para evitar que vendas algo que ya no tienes."
        },
        {
            q: "¿Cómo funciona la emisión automática de boletas al SII?",
            a: "Conectamos tu empresa con el Servicio de Impuestos Internos (SII). Cada vez que un cliente realiza un pago exitoso en la web o en el POS, el sistema genera la boleta electrónica legal, la timbra ante el SII y se la despacha automáticamente por correo electrónico al cliente."
        },
        {
            q: "¿Cómo funcionan los envíos por courier y el retiro en tienda?",
            a: "Integramos tu tienda con Starken, Chilexpress y Blue Express a través de Shipit. En el checkout, cuando el cliente escribe su comuna, el cotizador calcula automáticamente los valores y tiempos de entrega reales. Además, si tienes tienda física, puedes habilitar con un solo clic la opción 'Retiro en Tienda ($0 GRATIS)' indicando tu dirección, horarios de atención y notas especiales para la entrega."
        },
        {
            q: "¿Hay contratos forzosos o cláusulas de permanencia?",
            a: "Ninguno. Puedes pagar mes a mes o anual (con 2 meses de regalo) y cancelar cuando tú lo decidas desde tu panel, sin multas ni letra chica."
        }
    ];

    const toggle = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section id="faq" className="w-full py-20 bg-white border-b border-neutral-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-4">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400">
                        RESOLVEMOS TUS DUDAS
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
                        Preguntas Frecuentes. <br />
                        <span className="text-neutral-500 font-light">Sin tecnicismos ni letra chica.</span>
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                        Todo lo que necesitas saber antes de dar el paso y empezar a vender a todo Chile.
                    </p>
                </div>

                {/* Acordeón de FAQs */}
                <div className="space-y-3">
                    {faqs.map((faq, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div 
                                key={idx}
                                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                                    isOpen ? "border-black bg-neutral-50/50 shadow-sm" : "border-neutral-200 bg-white hover:border-neutral-300"
                                }`}
                            >
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                                >
                                    <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                                        {faq.q}
                                    </span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                                        isOpen ? "rotate-180 bg-black text-white" : "bg-neutral-100 text-neutral-600"
                                    }`}>
                                        <ChevronDown className="w-4 h-4" />
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="px-6 pb-6 pt-1 text-sm text-neutral-600 font-light leading-relaxed border-t border-neutral-100/60">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Asistencia directa por WhatsApp */}
                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div className="space-y-1">
                        <h4 className="text-sm font-bold text-neutral-900">
                            ¿Tienes una pregunta específica sobre tu negocio?
                        </h4>
                        <p className="text-xs text-neutral-500 font-light">
                            Nuestro equipo en Chile te responde de inmediato por WhatsApp.
                        </p>
                    </div>
                    <a
                        href="https://wa.me/56984669028?text=Hola,%20tengo%20una%20consulta%20sobre%20la%20plataforma%20Mercenario"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors whitespace-nowrap"
                    >
                        Preguntar por WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}
