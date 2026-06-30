import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ERP — Mercenario IOS",
    description: "Una empresa no se vuelve más grande cuando contrata un ERP. Se vuelve más tranquila cuando deja de buscar información.",
};

export default function ErpPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capacidad · ERP</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Una empresa no se vuelve más grande cuando contrata un ERP. <span className="text-neutral-400 font-semibold">Se vuelve más tranquila cuando deja de buscar información.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Durante años, la palabra ERP ha estado asociada a grandes empresas. Sistemas complejos. Implementaciones largas. Capacitaciones interminables. Pantallas llenas de opciones. Y la sensación de que todo era demasiado para una pequeña empresa.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Pero un ERP nunca debió ser eso. Su propósito siempre fue mucho más simple: Ayudar a que toda la empresa trabaje con la misma información.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">El verdadero problema no es la falta de herramientas.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">Es que ninguna conversa con la otra.</p>
                    <ul className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-200" /><p className="text-sm font-medium text-neutral-600">La agenda sabe una cosa.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-200" /><p className="text-sm font-medium text-neutral-600">La administración otra.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-200" /><p className="text-sm font-medium text-neutral-600">Contabilidad trabaja con datos distintos.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-200" /><p className="text-sm font-medium text-neutral-600">Marketing tiene su propia información.</p></li>
                    </ul>
                    <p className="text-black font-semibold leading-relaxed pt-4">Cada área construye su propia versión de la empresa. Y cuando llega el momento de tomar una decisión... nadie sabe cuál es la correcta.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una empresa debería tener una sola historia.</h2>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {["Cada cliente.", "Cada pago.", "Cada atención.", "Cada documento.", "Cada conversación.", "Cada movimiento."].map((item, i) => (
                            <span key={i} className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">{item}</span>
                        ))}
                    </div>
                    <p className="text-neutral-500 font-light leading-relaxed pt-4">Todo pertenece a la misma empresa. ¿Por qué entonces la información vive separada?</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Un ERP moderno no acumula datos. <span className="text-neutral-400 font-semibold">Los conecta.</span></h2>
                    <div className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <div className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-semibold text-black">Cuando una persona agenda...</p><p className="text-xs text-neutral-500">La empresa ya conoce al cliente.</p></div>
                        <div className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-semibold text-black">Cuando paga...</p><p className="text-xs text-neutral-500">Administración recibe la información.</p></div>
                        <div className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-semibold text-black">Cuando es atendido...</p><p className="text-xs text-neutral-500">Su historial continúa creciendo.</p></div>
                        <div className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-semibold text-black">Cuando vuelve meses después...</p><p className="text-xs text-neutral-500">Nada comienza desde cero. La empresa recuerda.</p></div>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Un dueño no necesita más reportes. <span className="text-neutral-400 font-semibold">Necesita respuestas.</span></h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-neutral-600 pt-4">
                        <li className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">¿Cuánto vendimos hoy?</li>
                        <li className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">¿Qué servicios funcionan mejor?</li>
                        <li className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">¿Qué clientes no han regresado?</li>
                        <li className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">¿Cuánto dinero tenemos pendiente por cobrar?</li>
                        <li className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">¿Qué equipo está trabajando al máximo de su capacidad?</li>
                    </ul>
                    <p className="text-black font-semibold leading-relaxed pt-4">Las respuestas deberían aparecer cuando las necesitas. No después de horas revisando planillas.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando toda la empresa comparte la misma información...</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="p-5 border border-neutral-100 rounded-2xl bg-white text-xs font-semibold text-neutral-800 text-center">Desaparecen las dobles digitaciones.</div>
                        <div className="p-5 border border-neutral-100 rounded-2xl bg-white text-xs font-semibold text-neutral-800 text-center">Los errores disminuyen.</div>
                        <div className="p-5 border border-neutral-100 rounded-2xl bg-white text-xs font-semibold text-neutral-800 text-center">Las áreas dejan de trabajar aisladas.</div>
                        <div className="p-5 border border-neutral-100 rounded-2xl bg-white text-xs font-semibold text-neutral-800 text-center">Los procesos se vuelven más rápidos.</div>
                        <div className="p-5 border border-neutral-100 rounded-2xl bg-white text-xs font-semibold text-neutral-800 text-center">Y el crecimiento deja de sentirse caótico.</div>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">El Rol del ERP</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Un ERP no reemplaza a las personas. Las ayuda a trabajar juntas."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Porque el problema nunca fue la capacidad del equipo. El problema era que cada persona veía una parte distinta de la operación.
                        </p>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">En Mercenario...</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El ERP no es un módulo separado. Es la base sobre la que descansa toda la operación: La agenda. Los pagos. La facturación. El CRM. El marketing. La administración. Los reportes. Todo comparte la misma información. Todo forma parte de la misma historia.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-4">
                        Una empresa no necesita más software. Necesita un lugar donde toda su operación tenga sentido. Eso es lo que debería hacer un ERP. Y eso es exactamente lo que esperamos de él.
                    </p>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo una operación unificada permite que toda tu empresa trabaje con la misma información.</h4>
                    </div>
                    <Link href="/operacion/centro-de-operaciones" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Conocer el Centro de Operaciones</span>
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
