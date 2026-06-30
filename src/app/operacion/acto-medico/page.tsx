import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function ActoMedicoPage() {
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
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">IOS</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col justify-start">
                {/* HERO */}
                <section className="space-y-8 mb-24 max-w-3xl">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 20 // Acto Médico</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        La tecnología debería desaparecer cuando comienza la consulta.
                        <br />
                        <span className="text-neutral-400 font-semibold">El protagonista nunca ha sido el sistema, siempre ha sido el paciente.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Cada consulta está llena de pequeñas interrupciones: buscar fichas, validar previsiones, revisar documentos, registrar datos y emitir boletas. Todas son necesarias, pero ninguna debe robar tiempo a la atención.
                    </p>
                </section>

                {/* Problem statement */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El objetivo no es digitalizar la consulta.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Es devolverle tiempo al profesional para que se concentre en atender a la persona que tiene frente a él.
                    </p>
                </section>

                {/* Pre‑consultation flow */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Antes de la llegada</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Toda la información está lista.</h2>
                    </div>
                    <div className="relative border-l border-neutral-200 ml-2 space-y-6 py-2">
                        {[
                            "El paciente agenda y su ficha ya está disponible.",
                            "La previsión está validada y los documentos necesarios preparados.",
                            "La agenda está organizada y la recepción conoce su llegada.",
                            "Todo ocurre antes del primer saludo."
                        ].map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <p className="text-sm font-semibold text-neutral-755 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* During consultation */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Durante la atención</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El profesional no piensa en sistemas, piensa en la persona frente a él. Los antecedentes clínicos están donde deben estar, la información es accesible al instante y la decisión médica sigue siendo completamente humana. La tecnología sólo acompaña.
                    </p>
                </section>

                {/* Post‑consultation flow */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Después de la consulta</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La operación continúa sin interrupciones</h2>
                    </div>
                    <div className="relative border-l border-neutral-200 ml-2 space-y-6 py-2">
                        {[
                            "Se registran los datos necesarios.",
                            "Se generan los documentos correspondientes.",
                            "Se actualiza el historial clínico.",
                            "Se programa el seguimiento.",
                            "El paciente recibe la información que necesita.",
                            "La clínica sigue operando sin volver a empezar."
                        ].map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <p className="text-sm font-semibold text-neutral-755 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Integrated integrations */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Integraciones que trabajan en silencio</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando una clínica necesita conectarse con servicios externos (validaciones, documentación, facturación, cobertura, registros), esas conexiones forman parte del mismo flujo. No es necesario que el equipo cambie de plataforma continuamente.
                    </p>
                </section>

                {/* Benefits grid */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold text-neutral-500">
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Más tiempo para el paciente</h3>
                            <p className="font-light leading-relaxed">Al eliminar pasos manuales, el profesional dedica el tiempo que realmente importa.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Menos interrupciones</h3>
                            <p className="font-light leading-relaxed">La información clínica está siempre disponible, sin búsquedas engorrosas.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Operación sin fricción</h3>
                            <p className="font-light leading-relaxed">Los datos fluyen automáticamente entre agenda, fichas, facturación y seguimiento.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Información en tiempo real</h3>
                            <p className="font-light leading-relaxed">Indicadores clínicos y financieros se actualizan al instante.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Tranquilidad para todo el equipo</h3>
                            <p className="font-light leading-relaxed">Secretarias, médicos y administradores tienen datos ordenados y confiables.</p>
                        </div>
                    </div>
                </section>

                {/* Brand axiom block */}
                <section className="py-20 border-t border-neutral-100 text-center">
                    <div className="max-w-2xl mx-auto bg-neutral-50 border border-neutral-100 p-12 rounded-3xl space-y-3">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-450 uppercase block">El Axioma de Mercenario</span>
                        <blockquote className="text-lg md:text-2xl font-bold text-black tracking-tight leading-snug">
                            "La tecnología organiza la operación.<br/>La comunicación construye la confianza."
                        </blockquote>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Descubre cómo diseñamos operaciones para clínicas y consultas médicas.</h4>
                    </div>
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Conocer la solución para salud</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>
        </div>
    );
}
