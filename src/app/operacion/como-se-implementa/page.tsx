import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Cómo se implementa? — Mercenario IOS",
    description: "La mejor tecnología es la que comienza a generar resultados desde el primer día. No la que obliga a detener tu empresa para empezar de nuevo.",
};

export default function ComoSeImplementaPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">IOS</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capacidad · Implementación</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        La mejor tecnología es la que comienza a generar resultados desde el primer día. <span className="text-neutral-400 font-semibold">No la que obliga a detener tu empresa para empezar de nuevo.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Cuando una empresa decide mejorar su operación, aparece una preocupación natural: <strong>¿Qué va a pasar con todo lo que ya funciona?</strong>
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {["¿Habrá que cambiar la forma de trabajar?", "¿Perderemos información?", "¿Cuánto tiempo tomará?", "¿El equipo tendrá que aprender un sistema nuevo?"].map((item, i) => (
                            <span key={i} className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">{item}</span>
                        ))}
                    </div>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-2">
                        Durante años, implementar tecnología significó interrumpir el trabajo para construir algo diferente. Hoy ya no tiene por qué ser así.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Implementar no significa reemplazar. <span className="text-neutral-400 font-semibold">Significa conectar.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">La mayoría de las empresas ya utiliza herramientas: Agenda. WhatsApp. Correo. Facturación. Medios de pago. Planillas. Sistemas especializados.</p>
                    <p className="text-black font-semibold pt-2">El problema no suele ser la falta de tecnología. El problema es que cada herramienta trabaja por separado.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">Una buena implementación comienza entendiendo la empresa.</h2>
                    <ul className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">Antes de conectar plataformas.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">Antes de configurar procesos.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">Antes de automatizar tareas.</p></li>
                    </ul>
                    <p className="text-neutral-500 font-light pt-4">Primero comprendemos cómo trabaja tu empresa. Cómo llegan los clientes. Cómo se organiza el equipo. Cómo se administra la información. Qué procesos ya funcionan bien. Y dónde aparecen las mayores pérdidas de tiempo.</p>
                    <p className="text-black font-semibold text-lg pt-2">Porque ninguna empresa debería adaptarse a un software. La tecnología debe adaptarse a la empresa.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El cambio ocurre por etapas.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No hace falta transformar toda la empresa en un solo día. Podemos comenzar por aquello que genera mayor impacto:
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {["La agenda.", "Los pagos.", "La administración.", "La comunicación.", "El seguimiento."].map((item, i) => (
                            <span key={i} className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">{item}</span>
                        ))}
                    </div>
                    <p className="text-black font-semibold pt-4">Poco a poco, cada proceso comienza a trabajar junto al siguiente. Hasta que toda la operación funciona como un solo sistema.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Tu equipo no necesita convertirse en experto en tecnología.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Necesita seguir haciendo bien su trabajo. Las herramientas deben facilitar las tareas. No convertirlas en algo más complejo.
                    </p>
                    <p className="text-black font-semibold">Cuando una implementación está bien diseñada... Las personas aprenden trabajando. No estudiando manuales.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La información tampoco comienza desde cero.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Los clientes. Las agendas. Los servicios. Los productos. Los documentos.
                    </p>
                    <p className="text-black font-semibold">La historia de tu empresa tiene valor. Nuestro trabajo consiste en preservarla y darle continuidad.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Implementar también significa acompañar.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las empresas cambian. Crecen. Incorporan nuevas personas. Abren nuevas sucursales. Desarrollan nuevos servicios. La operación evoluciona constantemente.
                    </p>
                    <p className="text-black font-semibold">Por eso una implementación nunca termina el día que el sistema comienza a funcionar. Continúa junto con la empresa.</p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">Nuestra Promesa</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "El objetivo nunca ha sido instalar tecnología. El objetivo es que tu empresa trabaje mejor."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Porque cuando la operación mejora... Todo mejora.
                        </p>
                    </div>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Cada empresa tiene una forma distinta de trabajar.</h4>
                        <p className="text-neutral-500 text-sm leading-relaxed">Conversemos sobre la tuya y diseñemos una implementación que respete tu operación desde el primer día.</p>
                    </div>
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Agendar una conversación</span>
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
