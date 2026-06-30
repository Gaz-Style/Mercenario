import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function MultiagentesPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 13 // Colaboración Autónoma</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        Imagina que cada área de tu empresa tuviera su propio especialista.<br />
                        <span className="text-neutral-400 font-semibold">Trabajando las 24 horas. Coordinándose entre sí. Sin descansar.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Cuando escuchamos hablar de Inteligencia Artificial, normalmente pensamos en un asistente que responde preguntas de forma pasiva. Pero una empresa no tiene un solo trabajo: tiene decenas de procesos ocurriendo al mismo tiempo. Por eso una sola IA no es suficiente.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Una empresa necesita especialistas, no una sola persona o herramienta que intente hacerlo todo.
                    </p>
                </section>

                {/* Section 2: Cada agente tiene una responsabilidad */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Los Roles Digitales</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Cada agente tiene una responsabilidad.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Piensa en tu empresa. Existe alguien que atiende clientes, alguien que administra pagos, alguien que revisa documentos, alguien que hace seguimiento y alguien que organiza la agenda. Los Multiagentes funcionan exactamente igual:
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs font-semibold text-neutral-500">
                        <div className="p-4 border border-neutral-150 rounded bg-white">Agente de Agenda</div>
                        <div className="p-4 border border-neutral-150 rounded bg-white">Agente Financiero</div>
                        <div className="p-4 border border-neutral-150 rounded bg-white">Agente Tributario</div>
                        <div className="p-4 border border-neutral-150 rounded bg-white">Agente de Marketing</div>
                        <div className="p-4 border border-neutral-150 rounded bg-white">Agente de Comunicaciones</div>
                        <div className="p-4 border border-neutral-150 rounded bg-white">Agente Clínico</div>
                        <div className="p-4 border border-neutral-150 rounded bg-white">Agente de Calidad</div>
                        <div className="p-4 border border-neutral-150 rounded bg-white">Agente Administrativo</div>
                    </div>
                </section>

                {/* Section 3: Ninguno trabaja solo */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Sincronización</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                            Ninguno trabaja solo. Se comunican entre ellos.
                        </h2>
                        <p className="text-sm text-neutral-500 font-light">Cuando un cliente agenda una hora...</p>
                    </div>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-6 py-2">
                        {[
                            "El agente de Agenda registra la cita en el calendario central.",
                            "El agente de Comunicaciones prepara la confirmación personalizada por WhatsApp.",
                            "El agente Financiero verifica si hay transacciones o pagos pendientes.",
                            "El agente Tributario coordina y prepara la boleta legal ante el SII.",
                            "El agente Clínico organiza la ficha y antecedentes para el profesional.",
                            "El agente de Marketing programa la secuencia óptima de seguimiento.",
                            "El agente de Calidad programa la encuesta posterior para evaluar el servicio."
                        ].map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <p className="text-sm font-semibold text-neutral-755 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-neutral-500 font-light leading-relaxed pt-4">
                        Cada uno realiza una parte específica del trabajo, exactamente como ocurre en cualquier organización madura. Lo importante no es la cantidad de agentes, sino que todos comparten y entienden el mismo negocio.
                    </p>
                </section>

                {/* Section 4: Los multiagentes no reemplazan a tu equipo */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Los Multiagentes no reemplazan a tu equipo. Trabajan junto a él.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Mientras las personas atienden clientes de forma humana, resuelven problemas y toman decisiones estratégicas, los agentes realizan tareas repetitivas de forma invisible: analizan información, preparan documentos, detectan fallas de caja y mantienen el negocio en marcha.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Con el tiempo, también aprenden de tu empresa (procesos, turnos, clientes e indicadores) anticipando necesidades críticas antes de que tú tengas que buscarlas.
                    </p>
                </section>

                {/* Section 5: Ejemplos de cooperación */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Práctica</span>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">
                            Cooperación en el día a día.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold text-neutral-500">
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Control Financiero</h3>
                            <p className="font-light leading-relaxed">El agente financiero detecta diferencias de cobro o descuadraturas de caja ante el banco y el POS de forma inmediata, antes de que el contador cierre el mes.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Retención Comercial</h3>
                            <p className="font-light leading-relaxed">El agente comercial identifica a clientes con probabilidad de abandono basándose en sus visitas anteriores y arma campañas personalizadas de fidelización.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Seguimiento Médico</h3>
                            <p className="font-light leading-relaxed">El agente clínico monitorea las fichas y envía avisos preventivos a pacientes con citas o controles de salud atrasados de forma autónoma.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Auditoría Administrativa</h3>
                            <p className="font-light leading-relaxed">El agente administrativo audita las firmas de consentimientos, fichas cargadas y boletas emitidas para asegurar que todo cuadre legalmente cada día.</p>
                        </div>
                    </div>
                </section>

                {/* Section 6: En Mercenario */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        La diferencia está en el trabajo en equipo.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Una empresa moderna no depende de una sola persona. Tampoco debería depender de una sola IA. En Mercenario, los Multiagentes no son un opcional: son tu nuevo equipo digital que colabora en silencio para que cada área funcione con orden, velocidad y precisión.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        El objetivo nunca ha sido automatizar una empresa. El objetivo siempre ha sido ayudar a las personas a trabajar mejor.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Descubre cómo todos estos agentes trabajan desde un único Centro de Operaciones.</h4>
                    </div>
                    <Link href="/soluciones/health" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Ver una empresa funcionando</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
