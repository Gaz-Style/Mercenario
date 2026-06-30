import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pagos — Mercenario IOS",
    description:
        "Cobrar es fácil. Lo difícil es todo lo que ocurre después. Descubre cómo Mercenario convierte cada pago en un evento operativo que conecta toda tu empresa.",
};

const paymentInfo = [
    "Quién pagó.",
    "Qué compró.",
    "Cuándo lo hizo.",
    "Cómo pagó.",
    "Qué servicio recibirá.",
    "Qué documento debe emitirse.",
    "Qué seguimiento corresponde.",
];

const disconnectedProblems = [
    "Una persona paga, pero la secretaria aún espera la confirmación.",
    "Administración no sabe que ingresó el dinero a la cuenta.",
    "El profesional en sala no sabe si puede iniciar la atención.",
    "Contabilidad debe reconstruir la operación al final del día.",
];

const connectedSolutions = [
    "La atención queda autorizada en el sistema.",
    "La administración actualiza sus registros al instante.",
    "La facturación continúa automáticamente sin intervención humana.",
    "El historial del cliente se completa con el registro financiero.",
    "Los indicadores clave de negocio cambian en tiempo real.",
];

const paymentModels = [
    { title: "Venta directa", desc: "Venta de productos físicos o digitales con stock sincronizado." },
    { title: "Consultas y Citas", desc: "Pagos de atenciones profesionales previo al ingreso." },
    { title: "Presupuestos", desc: "Aprobación y pago de presupuestos complejos por etapas." },
    { title: "Anticipos", desc: "Reserva de cupo mediante abonos y saldos pendientes." },
    { title: "Suscripciones", desc: "Cobros recurrentes automáticos y gestión de membresías." },
];

export default function PagosPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            {/* Header */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span>{" "}
                        <span className="text-neutral-500 font-medium">IOS</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">

                {/* ── HERO ──────────────────────────────────────────── */}
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Capacidad · Pagos
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Cobrar es fácil.{" "}
                        <span className="text-neutral-400 font-semibold">
                            Lo difícil es todo lo que ocurre después.
                        </span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Cuando una persona realiza un pago, no está terminando un proceso. Lo está iniciando. A partir de ese momento la empresa adquiere una nueva responsabilidad: confirmar, registrar, informar, preparar y continuar.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Un simple pago pone en movimiento toda la operación.
                    </p>
                </section>

                {/* ── EL DINERO NUNCA VIAJA SOLO ────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                        El dinero nunca viaja solo.
                        <br />
                        <span className="text-neutral-400 font-semibold">Cada pago trae consigo información.</span>
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La mayoría de las empresas administra esta información manualmente. Y ahí comienzan los errores.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                        {paymentInfo.map((info, i) => (
                            <div
                                key={i}
                                className="p-5 border border-neutral-100 rounded-2xl bg-neutral-50/60 text-xs font-semibold text-neutral-800"
                            >
                                {info}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── EL VERDADERO PROBLEMA ─────────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El verdadero problema no es recibir dinero.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Es que el resto de la empresa no se entera porque el pago quedó atrapado en una plataforma aislada:
                    </p>
                    <div className="relative border-l border-neutral-200 ml-1 space-y-4 py-1">
                        {disconnectedProblems.map((problem, i) => (
                            <div key={i} className="relative pl-6">
                                <div className="absolute -left-[4px] top-[7px] w-2 h-2 rounded-full bg-red-500" />
                                <p className="text-sm font-medium text-neutral-600 leading-relaxed">{problem}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── UNA OPERACIÓN CONECTADA ───────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Una operación conectada funciona distinto.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando un pago es confirmado, toda la empresa lo sabe sin necesidad de copiar o preguntar:
                    </p>
                    <div className="relative border-l border-neutral-200 ml-1 space-y-4 py-1">
                        {connectedSolutions.map((solution, i) => (
                            <div key={i} className="relative pl-6 group">
                                <div className="absolute -left-[4px] top-[7px] w-2 h-2 rounded-full bg-black group-hover:bg-neutral-800 transition-colors" />
                                <p className="text-sm font-semibold text-black leading-relaxed">{solution}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── EL PAGO COMO EXPERIENCIA ──────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Pagar también forma parte de la experiencia.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Piensa en la tranquilidad que siente un cliente cuando paga y recibe su comprobante inmediatamente, sabe exactamente qué ocurrirá después y no necesita enviar comprobantes por WhatsApp o llamar por teléfono. La empresa ya está preparada.
                    </p>
                </section>

                {/* ── MODELOS DE PAGO ────────────────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Versatilidad
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Cada empresa cobra de manera diferente.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No importa el modelo, todas necesitan que el pago forme parte activa de la operación.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paymentModels.map((model, i) => (
                            <div
                                key={i}
                                className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50 space-y-2"
                            >
                                <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">
                                    {model.title}
                                </h3>
                                <p className="text-xs font-light text-neutral-500 leading-relaxed">
                                    {model.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── EVENTO OPERATIVO ──────────────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El dinero deja de ser un dato financiero.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed font-semibold text-black">
                        Se convierte en un evento operativo.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Un pago puede iniciar una atención, liberar un pedido, activar una factura, generar una comisión, programar un seguimiento o actualizar un reporte. No mueve solo la caja, mueve toda la empresa de manera coordinada.
                    </p>
                </section>

                {/* ── AXIOMA ────────────────────────────────────────── */}
                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">
                            Filosofía de Transacción
                        </span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Cuando cobrar deja de ser una tarea,
                            <br />
                            <span className="text-neutral-400 font-semibold">
                                la empresa puede volver a concentrarse en atender."
                            </span>
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            El dinero ya no necesita perseguirse; simplemente encuentra su lugar natural dentro de la operación.
                        </p>
                    </div>
                </section>

                {/* ── CTA ───────────────────────────────────────────── */}
                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">
                            Un pago no debería terminar una venta.
                        </h4>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            Debería dar inicio a una operación perfectamente coordinada.
                        </p>
                    </div>
                    <Link
                        href="/#contacto"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full"
                    >
                        <span>Descubre cómo conectar los pagos con tu empresa</span>
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
