import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agenda — Mercenario IOS",
    description:
        "Una agenda no organiza horarios. Organiza compromisos. Descubre cómo una agenda conectada activa toda la operación de tu empresa desde el primer clic.",
};

const chain = [
    "Se confirma la reserva.",
    "Se prepara la atención.",
    "Se envían las comunicaciones necesarias.",
    "La operación sabe qué ocurrirá ese día.",
    "La administración recibe la información correspondiente.",
    "El seguimiento queda preparado antes de que ocurra la atención.",
];

const protects = [
    "Las dobles reservas desaparecen.",
    "Los olvidos disminuyen.",
    "Los cambios quedan registrados.",
    "Las cancelaciones generan nuevos espacios.",
    "Los recordatorios reducen las ausencias.",
    "Todo ocurre de manera natural.",
];

const industries = [
    { name: "Centro médico", action: "agenda consultas" },
    { name: "Abogado", action: "agenda reuniones" },
    { name: "Peluquería", action: "agenda servicios" },
    { name: "Empresa técnica", action: "agenda visitas" },
    { name: "Consultora", action: "agenda proyectos" },
    { name: "Tu empresa", action: "coordina personas, recursos y tiempo" },
];

export default function AgendaPage() {
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
                        Capacidad · Agenda
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Todo comienza cuando alguien decide confiar en tu empresa.{" "}
                        <span className="text-neutral-400 font-semibold">
                            No cuando llega. No cuando paga. Mucho antes.
                        </span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        La agenda suele verse como un calendario. Un lugar donde aparecen horas disponibles. Pero en realidad representa algo mucho más importante: es el momento exacto en que un desconocido decide convertirse en cliente.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Y ese momento merece mucho más que un espacio libre entre las 10:00 y las 10:30.
                    </p>
                </section>

                {/* ── UNA AGENDA NO ORGANIZA HORARIOS ──────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                        Una agenda no organiza horarios.
                        <br />
                        <span className="text-neutral-400 font-semibold">Organiza compromisos.</span>
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cada reserva representa una promesa. La empresa promete estar preparada. El cliente promete llegar. Ambos esperan que todo ocurra como fue acordado.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/60 space-y-2">
                            <p className="text-sm font-bold text-black">Cuando esa promesa se cumple.</p>
                            <p className="text-xs font-light text-neutral-500 leading-relaxed">Nace la confianza.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/60 space-y-2">
                            <p className="text-sm font-bold text-black">Cuando falla.</p>
                            <p className="text-xs font-light text-neutral-500 leading-relaxed">Comienza la frustración.</p>
                        </div>
                    </div>
                </section>

                {/* ── EL PROBLEMA NUNCA FUE ENCONTRAR UN ESPACIO ───── */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El problema nunca fue encontrar un espacio.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El problema aparece después.
                    </p>
                    <div className="relative border-l border-neutral-200 ml-1 space-y-4 py-1">
                        {[
                            "¿Quién confirmó la reserva?",
                            "¿El cliente recibió un correo?",
                            "¿Hay un recordatorio programado?",
                            "¿La secretaria sabe quién llegará?",
                            "¿El profesional tiene la información necesaria?",
                            "¿El pago quedó registrado?",
                            "¿La ficha está preparada?",
                        ].map((q, i) => (
                            <div key={i} className="relative pl-6">
                                <div className="absolute -left-[4px] top-[7px] w-2 h-2 rounded-full bg-neutral-200" />
                                <p className="text-sm font-medium text-neutral-600 leading-relaxed">{q}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-black font-semibold leading-relaxed pt-2">
                        La agenda no es un evento. Es el punto de partida de toda la operación.
                    </p>
                </section>

                {/* ── CADENA DE PROCESOS ────────────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Reacción en cadena
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Cuando alguien agenda... activa una cadena completa de procesos.
                    </h2>

                    {/* Vertical chain with arrows */}
                    <div className="space-y-0 mt-4">
                        {chain.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-start">
                                <div className="flex items-center gap-4 py-4 w-full group">
                                    <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                                    <p className="text-sm font-semibold text-black leading-relaxed">{step}</p>
                                </div>
                                {idx < chain.length - 1 && (
                                    <div className="ml-[3px] text-neutral-300 text-xs font-mono pl-0.5 pb-1 select-none">↓</div>
                                )}
                            </div>
                        ))}
                    </div>

                    <p className="text-black font-bold text-lg leading-relaxed pt-4">
                        Todo comienza con un solo clic.
                    </p>
                </section>

                {/* ── ANTICIPA ──────────────────────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Una agenda moderna no recuerda.{" "}
                        <span className="text-neutral-400 font-semibold">Anticipa.</span>
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No espera que alguien confirme manualmente. No espera que la secretaria revise una planilla. No depende de una llamada telefónica.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        La operación completa sabe qué ocurrirá antes de que ocurra.
                    </p>
                </section>

                {/* ── CADA INDUSTRIA ────────────────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Cualquier industria
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Cada industria vive una agenda distinta.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La palabra cambia. La necesidad es exactamente la misma.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {industries.map((ind, i) => (
                            <div
                                key={i}
                                className={`p-5 border rounded-2xl space-y-1 ${
                                    i === industries.length - 1
                                        ? "border-black bg-black text-white"
                                        : "border-neutral-100 bg-neutral-50/60"
                                }`}
                            >
                                <p className={`text-xs font-bold uppercase tracking-wider ${i === industries.length - 1 ? "text-neutral-400" : "text-neutral-400"}`}>
                                    {ind.name}
                                </p>
                                <p className={`text-sm font-semibold leading-relaxed ${i === industries.length - 1 ? "text-white" : "text-black"}`}>
                                    {ind.action}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs font-mono text-neutral-400 italic">
                        Coordinar personas, recursos y tiempo. Siempre la misma necesidad.
                    </p>
                </section>

                {/* ── PROTEGE EL TIEMPO ─────────────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        La agenda también protege el tiempo de tu equipo.
                    </h2>
                    <div className="relative border-l border-neutral-200 ml-1 space-y-4 py-1">
                        {protects.map((line, i) => (
                            <div key={i} className="relative pl-6 group">
                                <div className="absolute -left-[4px] top-[7px] w-2 h-2 rounded-full bg-neutral-200 group-hover:bg-black transition-colors duration-500" />
                                <p className="text-sm font-medium text-neutral-600 leading-relaxed group-hover:text-black transition-colors">{line}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── DESPUÉS ───────────────────────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Pero la verdadera diferencia aparece después.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando termina la atención, la agenda no desaparece. Da paso al siguiente proceso.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {["El seguimiento.", "La comunicación.", "La facturación.", "El marketing.", "La administración."].map(
                            (item, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white"
                                >
                                    {item}
                                </span>
                            )
                        )}
                    </div>
                    <p className="text-black font-semibold leading-relaxed pt-2">
                        Porque una empresa no termina cuando una reunión finaliza. Continúa.
                    </p>
                </section>

                {/* ── AXIOM ─────────────────────────────────────────── */}
                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">
                            La agenda en Mercenario
                        </span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "La agenda deja de ser un calendario.
                            <br />
                            <span className="text-neutral-400 font-semibold">
                                Se convierte en el inicio de la experiencia del cliente."
                            </span>
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Y cuando el inicio está bien diseñado, todo lo que viene después resulta más simple.
                        </p>
                    </div>
                </section>

                {/* ── CTA ───────────────────────────────────────────── */}
                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">
                            Una buena experiencia comienza mucho antes de atender a un cliente.
                        </h4>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            Descubre cómo una agenda conectada transforma la operación completa de tu empresa.
                        </p>
                    </div>
                    <Link
                        href="/#contacto"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full"
                    >
                        <span>Conversemos</span>
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
