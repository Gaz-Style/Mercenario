import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Automatizaciones — Mercenario IOS",
    description: "Automatizar no significa que las personas trabajen menos. Significa que dejan de hacer el trabajo que nunca debieron hacer.",
};

export default function AutomatizacionesPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capacidad · Automatizaciones</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Automatizar no significa que las personas trabajen menos. <span className="text-neutral-400 font-semibold">Significa que dejan de hacer el trabajo que nunca debieron hacer.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Cada empresa está llena de pequeñas tareas repetitivas. Confirmar una cita. Enviar un correo. Recordar un pago. Actualizar una planilla. Avisar a un cliente. Mover información de un sistema a otro. Ninguna de ellas es difícil. Pero todas consumen tiempo. Y ese tiempo nunca vuelve.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">El problema no son las tareas. <span className="text-neutral-400 font-semibold">Es la cantidad de veces que se repiten.</span></h2>
                    <ul className="space-y-4 pt-4">
                        <li className="flex items-start gap-4"><div className="w-2 h-2 rounded-full bg-neutral-300 mt-2 shrink-0" /><p className="text-sm text-neutral-600">Una secretaria confirma decenas de citas cada día.</p></li>
                        <li className="flex items-start gap-4"><div className="w-2 h-2 rounded-full bg-neutral-300 mt-2 shrink-0" /><p className="text-sm text-neutral-600">Administración copia la misma información en distintas plataformas.</p></li>
                        <li className="flex items-start gap-4"><div className="w-2 h-2 rounded-full bg-neutral-300 mt-2 shrink-0" /><p className="text-sm text-neutral-600">El equipo responde las mismas preguntas una y otra vez.</p></li>
                        <li className="flex items-start gap-4"><div className="w-2 h-2 rounded-full bg-neutral-300 mt-2 shrink-0" /><p className="text-sm text-neutral-600">Marketing envía mensajes manualmente.</p></li>
                    </ul>
                    <p className="text-black font-semibold leading-relaxed pt-4">Al final de la jornada nadie hizo algo extraordinario. Solo mantuvo funcionando la operación.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Imagina una empresa que recuerda por sí sola.</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium pt-4">
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-2">Cuando un cliente agenda...</p><p className="text-neutral-500 font-light">Recibe su confirmación.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-2">Cuando se acerca la fecha...</p><p className="text-neutral-500 font-light">Llega un recordatorio.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-2">Si cambia la hora...</p><p className="text-neutral-500 font-light">Todos reciben la actualización.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-2">Si termina una atención...</p><p className="text-neutral-500 font-light">Comienza el seguimiento.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50 sm:col-span-2"><p className="text-black mb-2">Si un cliente deja un proceso incompleto...</p><p className="text-neutral-500 font-light">La empresa vuelve a contactarlo. No porque alguien lo recordó. Porque la operación estaba preparada para hacerlo.</p></div>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Automatizar no significa perder cercanía.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">Significa que las personas pueden dedicar su tiempo a aquello que realmente necesita una conversación.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-100">
                        <div><p className="text-sm font-semibold text-black">La tecnología puede confirmar una cita.</p><p className="text-xs font-light text-neutral-500 mt-2">Pero no puede tranquilizar a un paciente.</p></div>
                        <div><p className="text-sm font-semibold text-black">Puede enviar una factura.</p><p className="text-xs font-light text-neutral-500 mt-2">Pero no construir una relación.</p></div>
                        <div><p className="text-sm font-semibold text-black">Puede recordar un pago.</p><p className="text-xs font-light text-neutral-500 mt-2">Pero no comprender una preocupación.</p></div>
                    </div>
                    <p className="text-black font-semibold leading-relaxed pt-6 border-t border-neutral-100">Las automatizaciones liberan tiempo para que las personas hagan aquello que solo ellas pueden hacer.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una empresa organizada no depende de la memoria. <span className="text-neutral-400 font-semibold">Depende de procesos.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">Los procesos no se enferman. No olvidan. No salen de vacaciones. No cambian cuando alguien deja la empresa. Simplemente siguen funcionando.</p>
                    <div className="pt-8">
                        <div className="flex items-center gap-4 py-4 w-full">
                            <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                            <p className="text-sm font-semibold text-black leading-relaxed">Una acción provoca otra.</p>
                        </div>
                        <div className="ml-[3px] text-neutral-300 text-xs font-mono pl-0.5 pb-1 select-none">↓</div>
                        <div className="flex items-center gap-4 py-4 w-full">
                            <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                            <p className="text-sm font-semibold text-black leading-relaxed">Y esa provoca otra más.</p>
                        </div>
                    </div>
                    <p className="text-black font-semibold text-lg pt-4">La empresa deja de reaccionar. Comienza a anticiparse.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">No se trata de automatizar todo.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Hay decisiones que siempre serán humanas. Hay conversaciones que nunca deberían delegarse. Hay momentos donde la cercanía es irremplazable.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La tecnología no viene a reemplazar esos momentos. Viene a protegerlos. Eliminando todo aquello que les roba tiempo.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">El Propósito</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Una empresa eficiente no trabaja más rápido. Trabaja con menos interrupciones."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Y cuando las interrupciones desaparecen, las personas recuperan lo más valioso que tienen: Tiempo para atender mejor. Tiempo para pensar. Tiempo para crecer.
                        </p>
                    </div>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo una operación conectada permite que tu empresa haga más, sin exigir más a las personas.</h4>
                    </div>
                    <Link href="/operacion/operacion-conectada" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar la operación conectada</span>
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
