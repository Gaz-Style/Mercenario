import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reportes — Mercenario IOS",
    description: "Una empresa no mejora porque tiene más datos. Mejora cuando entiende lo que esos datos quieren decir.",
};

export default function ReportesPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capacidad · Reportes</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Una empresa no mejora porque tiene más datos. <span className="text-neutral-400 font-semibold">Mejora cuando entiende lo que esos datos quieren decir.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Todos los días una empresa genera información. Cada venta. Cada cliente. Cada pago. Cada atención. Cada servicio. Cada conversación. El problema nunca ha sido la falta de información. El problema es encontrarla cuando realmente hace falta.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">Muchos dueños toman decisiones a ciegas.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">No porque les falte experiencia. Porque los datos viven repartidos:</p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {["Una planilla.", "Un correo.", "Un sistema.", "Una libreta.", "Una conversación."].map((item, i) => (
                            <span key={i} className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">{item}</span>
                        ))}
                    </div>
                    <p className="text-black font-semibold leading-relaxed pt-4">Cuando finalmente logran reunir toda la información... la decisión ya llegó tarde.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Un buen reporte responde preguntas. <span className="text-neutral-400 font-semibold">No muestra números.</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        {["¿Cuánto vendimos este mes?", "¿Qué servicios crecen?", "¿Qué profesionales tienen mayor ocupación?", "¿Qué clientes dejaron de volver?", "¿Qué campañas generan mejores resultados?", "¿Qué productos rotan más lento?"].map((q, i) => (
                            <div key={i} className="p-5 border border-neutral-100 rounded-2xl bg-neutral-50/60 flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                                <p className="text-sm font-semibold text-neutral-800">{q}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-black font-semibold leading-relaxed pt-4">La información correcta evita cientos de suposiciones.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Los indicadores no son para controlar personas. <span className="text-neutral-400 font-semibold">Son para comprender la empresa.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando algo mejora... podemos repetirlo. Cuando algo empeora... podemos actuar antes de que sea demasiado tarde. Los reportes convierten la intuición en conocimiento.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed pt-4">
                        Una empresa cambia todos los días. Por eso los reportes también deberían hacerlo. No tiene sentido revisar información de hace semanas. Las decisiones importantes se toman hoy. Con la información disponible hoy.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">No necesitas cincuenta gráficos. <span className="text-neutral-400 font-semibold">Necesitas cinco respuestas.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las empresas suelen acumular paneles llenos de indicadores que nadie revisa. La verdadera utilidad aparece cuando cada dato tiene un propósito.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-2">
                        Menos información. Más claridad.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-neutral-100">
                        <div><p className="text-xs font-mono text-neutral-400 mb-1">Administración</p><p className="text-sm font-bold text-black">Quiere conocer ingresos.</p></div>
                        <div><p className="text-xs font-mono text-neutral-400 mb-1">Marketing</p><p className="text-sm font-bold text-black">Analiza campañas.</p></div>
                        <div><p className="text-xs font-mono text-neutral-400 mb-1">Operaciones</p><p className="text-sm font-bold text-black">Mide tiempos.</p></div>
                        <div><p className="text-xs font-mono text-neutral-400 mb-1">Gerencia</p><p className="text-sm font-bold text-black">Busca tendencias.</p></div>
                    </div>
                    <p className="text-neutral-500 font-light text-sm italic">Todos observan la misma empresa. Pero necesitan respuestas diferentes.</p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">Decisiones Informadas</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Los reportes también cuentan historias."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Detrás de cada número hay una decisión. Detrás de cada tendencia hay un comportamiento. Detrás de cada cliente existe una experiencia. Los datos solo cobran valor cuando ayudan a comprender lo que realmente está ocurriendo.
                        </p>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">En Mercenario...</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Los reportes no se construyen manualmente. La información nace de la operación. Cada proceso actualiza automáticamente los indicadores. Cada acción deja una huella. Cada decisión puede apoyarse en datos reales.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-4">
                        Una empresa organizada no trabaja con suposiciones. Trabaja con información. Y cuando la información llega en el momento adecuado... las decisiones dejan de ser un riesgo. Se convierten en oportunidades.
                    </p>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo una operación conectada transforma los datos en mejores decisiones.</h4>
                    </div>
                    <Link href="/operacion/centro-de-operaciones" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar el Centro de Operaciones</span>
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
