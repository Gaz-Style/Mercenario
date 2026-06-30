import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Así comienza una implementación — Mercenario IOS",
    description:
        "No cambiamos tu empresa en un día. La entendemos primero. Conoce el proceso de implementación de Mercenario: escuchar, diseñar, construir y acompañar.",
};

const steps = [
    {
        number: "01",
        title: "Conocer tu empresa.",
        lines: [
            "Cómo llegan tus clientes.",
            "Cómo trabajan las personas.",
            "Qué herramientas utilizas.",
            "Dónde aparecen los retrasos.",
            "Qué tareas consumen más tiempo.",
            "Qué cosas funcionan bien y no deberían cambiar.",
        ],
        note: "Todavía no hablamos de tecnología.",
    },
    {
        number: "02",
        title: "Diseñar la operación.",
        lines: [
            "Qué procesos pueden simplificarse.",
            "Qué información debería viajar automáticamente.",
            "Qué herramientas necesitan conectarse.",
            "Qué partes seguirán siendo completamente humanas.",
        ],
        note: "Todavía no hablamos de software. Hablamos de la forma en que trabaja tu empresa.",
    },
    {
        number: "03",
        title: "Construir.",
        lines: [
            "Configuramos.",
            "Conectamos.",
            "Desarrollamos cuando es necesario.",
            "Probamos cada proceso.",
            "Nos aseguramos de que todo funcione antes de avanzar.",
        ],
        note: "Recién aquí comienza la tecnología.",
    },
    {
        number: "04",
        title: "Acompañar.",
        lines: [
            "Ajustamos procesos.",
            "Escuchamos a tu equipo.",
            "Incorporamos mejoras.",
            "Seguimos evolucionando junto a tu empresa.",
        ],
        note: "La implementación no termina cuando el sistema comienza a funcionar. Ese es el momento en que realmente empieza la relación.",
    },
];

const faqs = [
    {
        q: "¿Tengo que cambiar todas mis herramientas?",
        a: "No. Muchas veces conservamos gran parte de lo que ya utilizas. Nuestro trabajo consiste en conectar y mejorar, no en reemplazar por reemplazar.",
    },
    {
        q: "¿Cuánto tiempo demora?",
        a: "Depende de la operación. Algunas empresas pueden comenzar rápidamente. Otras requieren un proceso más amplio. Lo importante es que cada etapa se construya sobre bases sólidas. No buscamos avanzar más rápido. Buscamos hacerlo correctamente.",
    },
    {
        q: "¿Mi equipo tendrá que aprender todo de nuevo?",
        a: "No. La tecnología debe adaptarse a las personas, no al revés. Nuestro objetivo es simplificar el trabajo diario, no volverlo más complejo.",
    },
];

export default function ComoSeSolucionaPage() {
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
                        Página 22 · El proceso
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        No cambiamos tu empresa en un día.{" "}
                        <span className="text-neutral-400 font-semibold">
                            La entendemos primero.
                        </span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Cada empresa tiene años construyendo su forma de trabajar. Sus propios procesos, sus propias costumbres, sus propios desafíos. Por eso una implementación nunca comienza instalando tecnología.
                    </p>
                    <p className="text-black text-lg font-semibold leading-relaxed">
                        Comienza escuchando.
                    </p>
                </section>

                {/* ── 4 PASOS ───────────────────────────────────────── */}
                <section className="border-t border-neutral-100 space-y-0">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="py-16 border-b border-neutral-100 grid grid-cols-[3rem_1fr] gap-8 group"
                        >
                            {/* Number */}
                            <span className="text-[11px] font-mono text-neutral-300 pt-1 group-hover:text-black transition-colors duration-500">
                                {step.number}
                            </span>

                            {/* Content */}
                            <div className="space-y-6">
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black leading-tight">
                                    {step.title}
                                </h2>

                                {/* Timeline of lines */}
                                <div className="relative border-l border-neutral-200 ml-1 space-y-4 py-1">
                                    {step.lines.map((line, i) => (
                                        <div key={i} className="relative pl-6">
                                            <div className="absolute -left-[4px] top-[7px] w-2 h-2 rounded-full bg-neutral-200 group-hover:bg-black transition-colors duration-700" />
                                            <p className="text-sm font-medium text-neutral-600 leading-relaxed">
                                                {line}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Note */}
                                <p className="text-[11px] font-mono text-neutral-400 tracking-wide italic">
                                    {step.note}
                                </p>
                            </div>
                        </div>
                    ))}
                </section>

                {/* ── NO EXISTEN DOS EMPRESAS IGUALES ──────────────── */}
                <section className="py-20 border-b border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                        No creemos en las implementaciones estándar.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Porque no existen dos empresas iguales. Una clínica tiene necesidades distintas a un estudio jurídico. Una empresa con dos personas trabaja diferente a una con cincuenta. Incluso dos negocios del mismo rubro suelen tener formas distintas de operar.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Por eso cada implementación comienza desde cero.
                    </p>
                </section>

                {/* ── FAQ ───────────────────────────────────────────── */}
                <section className="py-20 border-b border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Preguntas frecuentes
                    </span>
                    <div className="space-y-0">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="py-8 border-b border-neutral-100 last:border-none grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                <h3 className="text-base font-bold text-black leading-snug">
                                    {faq.q}
                                </h3>
                                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── AXIOM BLOCK ───────────────────────────────────── */}
                <section className="py-20 border-b border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">
                            La medida del éxito
                        </span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Una implementación exitosa no se mide por la cantidad de funciones.
                            <br />
                            <span className="text-neutral-400 font-semibold">
                                Se mide por la tranquilidad con la que trabaja tu empresa después."
                            </span>
                        </blockquote>
                    </div>
                </section>

                {/* ── FINAL LINE ────────────────────────────────────── */}
                <section className="py-20 border-b border-neutral-100 space-y-4 text-center">
                    <p className="text-neutral-500 font-light text-lg leading-relaxed">
                        Al terminar, tus clientes seguirán viendo <strong className="text-black">tu empresa</strong>.
                    </p>
                    <p className="text-neutral-500 font-light text-lg leading-relaxed">
                        No Mercenario.
                    </p>
                    <p className="text-neutral-400 text-sm font-mono tracking-widest uppercase pt-2">
                        Y eso significa que hicimos bien nuestro trabajo.
                    </p>
                </section>

                {/* ── CTA ───────────────────────────────────────────── */}
                <div className="mt-16 pt-12 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">
                            El primer paso es una conversación.
                        </h4>
                        <p className="text-neutral-500 text-sm leading-relaxed">
                            Cuéntanos cómo funciona hoy tu empresa. Nosotros nos encargaremos del resto.
                        </p>
                    </div>
                    <Link
                        href="/#contacto"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full"
                    >
                        <span>Solicitar una reunión</span>
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
