import Link from "next/link";
import { ArrowLeft, ChevronRight, CreditCard, DollarSign, ShieldCheck, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Integración Mercado Pago — Mercenario IOS",
    description: "La pasarela de pagos no es un botón en tu web. Es el motor que convierte el interés del cliente en caja real e instantánea. Descubre cómo integrarlo.",
};

const benefits = [
    {
        title: "Links de cobro inteligentes",
        desc: "Genera enlaces de pago directamente desde tus chats de WhatsApp o correos de recordatorio sin digitar montos manualmente.",
        icon: Zap
    },
    {
        title: "Conciliación al segundo",
        desc: "Cada peso que ingresa a tu cuenta de Mercado Pago actualiza la caja del día y el estado de la cuenta del cliente de manera automática.",
        icon: DollarSign
    },
    {
        title: "Facturación invisible",
        desc: "La aprobación del pago en Mercado Pago activa la orden de emisión de la boleta o factura de venta del SII en segundo plano.",
        icon: ShieldCheck
    }
];

export default function MercadoPagoPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            {/* Header */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">INTEGRACIONES</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                {/* Hero Section */}
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Integración Comercial</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        El pago no es el fin del flujo. <span className="text-neutral-400 font-semibold">Es el activador de toda la maquinaria.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Un cliente decide comprar. Selecciona sus servicios. Pero si el proceso de cobro implica enviarle datos de transferencia, esperar que envíe el comprobante y revisar la cartola bancaria al final del día... tu operación sigue rota.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-2">
                        La integración con Mercado Pago automatiza este puente: el cobro toma un segundo y la reconciliación ocurre sola.
                    </p>
                </section>

                {/* Section 2: ¿Por qué Mercado Pago? */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Caja e instantaneidad para tu negocio</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Mercado Pago es el ecosistema de pagos líder en Latinoamérica. Integrarlo directamente con Mercenario IOS permite recibir pagos con tarjetas de crédito, débito y transferencias simplificadas en milisegundos.
                    </p>
                </section>

                {/* Section 3: Beneficios claves */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Beneficios Clave</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo transforma tu operación diaria</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                        {benefits.map((b, i) => {
                            const Icon = b.icon;
                            return (
                                <div key={i} className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50 space-y-4">
                                    <div className="p-2 w-fit bg-black text-white rounded-lg">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-base font-bold text-black">{b.title}</h3>
                                    <p className="text-xs text-neutral-500 font-light leading-relaxed">{b.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Section 4: El flujo conectado */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El dinero fluye sin intervención manual</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando un cliente paga usando Mercado Pago, el sistema no solo actualiza su saldo. Gatilla eventos en todas tus áreas de manera nativa:
                    </p>
                    <ul className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6 text-sm text-neutral-600 font-medium">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" />Gatilla la reserva definitiva en la agenda.</li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" />Actualiza el saldo a favor en el CRM.</li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" />Dispara el webhook para emitir boleta automática con el SII.</li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" />Notifica por WhatsApp al cliente confirmando la transacción.</li>
                    </ul>
                </section>

                {/* Axiom Block */}
                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">El Axioma de Caja</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Cobrar no debería ser una tarea administrativa.<br />Debería ser un evento de software invisible."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Conectamos las pasarelas directamente con tu flujo de venta, reduciendo el error humano a cero y mejorando tu flujo de caja neto.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Automatiza los cobros y facturación de tu negocio hoy.</h4>
                    </div>
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Iniciar Diagnóstico de Pagos</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">
                &copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.
            </footer>
        </div>
    );
}
