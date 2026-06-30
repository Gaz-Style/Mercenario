import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function IaPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 12 // Inteligencia Artificial</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        La Inteligencia Artificial no viene a reemplazar personas.<br />
                        <span className="text-neutral-400 font-semibold">Viene a ayudar a que tu empresa tome mejores decisiones.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Durante los últimos años hemos escuchado hablar de Inteligencia Artificial en todas partes. Muchas empresas creen que necesitan implementarla, otras sienten miedo, y la mayoría todavía no comprende cómo puede ayudar realmente a su negocio.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        La respuesta es mucho más simple de lo que parece: la IA no hace magia. Trabaja con información. Mientras más conoce tu empresa, mejores decisiones puede ayudarte a tomar.
                    </p>
                </section>

                {/* Section 2: Imagina un día normal */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Análisis en Tiempo Real</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Imagina un día normal en tu negocio.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Un cliente agenda. Otro cancela. Llegan nuevos pagos. Un profesional cambia su horario. Un proveedor envía una factura. Una campaña consigue nuevos clientes. Todo eso genera información: demasiada para que una persona pueda analizarla continuamente.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Ahí comienza el trabajo de la Inteligencia Artificial. Mientras tú trabajas, ella observa, detecta patrones, relaciona información, busca oportunidades, identifica problemas antes de que ocurran y prepara datos para que puedas decidir mejor.
                    </p>
                </section>

                {/* Grid of pro-active IA alerts */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La IA en Acción</span>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">
                            Ejemplos prácticos de apoyo silencioso.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold text-neutral-500">
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-250 pb-2 flex items-center justify-between">
                                <span>Seguimiento de Controles</span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            </h3>
                            <p className="font-light leading-relaxed">Un paciente olvidó agendar su control médico. La IA detecta que ya pasó el tiempo recomendado y propone una plantilla de seguimiento automatizada.</p>
                        </div>

                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-250 pb-2 flex items-center justify-between">
                                <span>Optimización de Agenda</span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            </h3>
                            <p className="font-light leading-relaxed">Una agenda comienza a saturarse en ciertos bloques horaria. La IA sugiere redistribuir turnos antes de que aparezcan retrasos en sala de espera.</p>
                        </div>

                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-250 pb-2 flex items-center justify-between">
                                <span>Análisis de Demanda</span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            </h3>
                            <p className="font-light leading-relaxed">Un servicio específico comienza a venderse menos. La IA detecta la anomalía de tendencia semanas antes de que aparezca en el informe mensual.</p>
                        </div>

                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-250 pb-2 flex items-center justify-between">
                                <span>Recuperación de Clientes</span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            </h3>
                            <p className="font-light leading-relaxed">Un cliente frecuente deja de volver. La IA identifica su patrón histórico y propone de manera activa una campaña personalizada de reactivación.</p>
                        </div>
                    </div>
                </section>

                {/* Section 4: Una buena IA no habla. Trabaja. */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Una buena IA no habla. Trabaja.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No necesitas preguntarle cada cinco minutos. Ella analiza continuamente la operación y cuando encuentra algo verdaderamente importante, te lo comunica de forma resumida.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        En Mercenario, la Inteligencia Artificial conoce tu empresa. No porque tenga acceso a Internet, sino porque entiende cómo funciona tu operación: conoce tus procesos, tus clientes, tus servicios, tus indicadores y tus objetivos.
                    </p>
                </section>

                {/* Section 5: Descubrir preguntas ocultas */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El verdadero valor no está en responder preguntas. Está en descubrir preguntas que todavía nadie hizo.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-neutral-500 pt-2">
                        <li>· ¿Qué clientes podrían abandonar la empresa próximamente?</li>
                        <li>· ¿Qué profesional del equipo necesita apoyo con sus bloques?</li>
                        <li>· ¿Qué proceso de registro consume más tiempo del personal?</li>
                        <li>· ¿Qué campaña comercial genera mejores resultados reales?</li>
                        <li>· ¿Qué tarea manual repetitiva podría automatizarse de inmediato?</li>
                        <li>· ¿Qué oportunidad comercial estamos dejando pasar por alto?</li>
                    </div>
                    <p className="text-neutral-500 font-light leading-relaxed pt-4">
                        Una empresa genera miles de datos cada día. Muy pocas logran convertirlos en decisiones estratégicas. La Inteligencia Artificial no reemplaza la experiencia del dueño: la potencia.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Conoce cómo varios asistentes trabajan al mismo tiempo dentro de una empresa.</h4>
                    </div>
                    <Link href="/operacion/multiagentes" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Descubrir los Multiagentes</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
