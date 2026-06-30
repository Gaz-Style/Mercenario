import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function ClinicaConectadaPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 14 // Casos de Uso</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        Así funciona una clínica conectada.<br />
                        <span className="text-neutral-400 font-semibold">Un paciente nunca ve la operación. Solo vive la experiencia.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Cuando un paciente agenda una consulta, espera que todo funcione. No piensa en agendas, no piensa en IMED, ni en facturación o WhatsApp: solo espera ser atendido. Detrás de esa experiencia ocurre una enorme cantidad de procesos, y todos deben funcionar al mismo tiempo.
                    </p>
                </section>

                {/* Section 2: Antes de la consulta */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Fase 1</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Antes de la consulta.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Todo comienza cuando el paciente agenda. Puede hacerlo desde la página web, WhatsApp, una llamada telefónica o directamente en recepción. No importa el canal: la información entra una sola vez.
                    </p>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-6 py-2">
                        {[
                            "Se registra el paciente en la base de datos única.",
                            "Se crea o actualiza su ficha clínica e historial automáticamente.",
                            "Se reserva el bloque de la agenda del profesional al instante.",
                            "Se envían las confirmaciones inmediatas por WhatsApp y correo.",
                            "Se programan las alertas y recordatorios previos de forma inteligente.",
                            "La administración conoce la nueva atención programada y sus métricas."
                        ].map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <p className="text-sm font-semibold text-neutral-755 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-black font-semibold text-xs pt-2">Todo ocurre de fondo sin necesidad de volver a escribir la información en planillas sueltas.</p>
                </section>

                {/* Section 3: El día de la atención y Durante */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Fase 2 & 3</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El día de la atención.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando el paciente llega, la secretaria ya conoce su información. El profesional tiene acceso a su historial. La agenda está sincronizada, los documentos están preparados y los pagos pueden realizarse inmediatamente. Toda la información ya estaba esperando al paciente. No al revés.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Durante la atención, el profesional dedica su tiempo al paciente. No a buscar información, no a revisar correos, no a preguntar qué ocurrió antes. Toda la operación administrativa ocurre de manera silenciosa en segundo plano.
                    </p>
                </section>

                {/* Section 4: Después de la consulta */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Fase 4</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Después de la consulta.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La experiencia no termina cuando el paciente sale de la clínica: recién comienza una nueva etapa coordinada.
                    </p>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-6 py-2">
                        {[
                            "Se registra el resultado y diagnóstico de la atención.",
                            "Se emite la boleta electrónica legal y bonos SII/IMED automáticamente.",
                            "Se actualiza el historial clínico con nuevas indicaciones.",
                            "Se registra el pago y la conciliación en la caja de administración.",
                            "Se actualizan los reportes financieros en tiempo real.",
                            "Se programa la secuencia de seguimiento posventa.",
                            "El paciente recibe las instrucciones médicas en su teléfono.",
                            "Más adelante recibe una invitación a evaluar el servicio recibido."
                        ].map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <p className="text-sm font-semibold text-neutral-755 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-black font-semibold text-xs pt-2">La clínica nunca pierde el contacto con el paciente.</p>
                </section>

                {/* Section 5: Roles y visibilidad del dueño */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">El Impacto Humano</span>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">¿Cómo cambia la experiencia laboral de tu equipo?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold text-neutral-500">
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">La Secretaria</h3>
                            <p className="font-light leading-relaxed">Sigue siendo fundamental, pero ya no necesita duplicar datos entre sistemas. Puede concentrarse en lo importante: recibir personas, resolver dudas y acompañar.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">El Profesional</h3>
                            <p className="font-light leading-relaxed">Dedica menos tiempo a rellenar casillas administrativas o pelear con la interfaz de fichas lentas, y más tiempo a ejercer su vocación clínica.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">El Dueño</h3>
                            <p className="font-light leading-relaxed">Observa pacientes, ocupación, ingresos, caja y marketing consolidados en tiempo real desde un solo lugar, sin tener que esperar reportes tardíos.</p>
                        </div>
                    </div>
                </section>

                {/* Section 6: El paciente percibe la diferencia */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El paciente percibe la diferencia.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No porque conozca la tecnología que hay detrás, sino porque todo ocurre con naturalidad: recibe respuestas rápidas, no debe repetir información, no espera confirmaciones innecesarias y siente que la clínica está organizada. Y esa sensación genera confianza.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Una clínica moderna no se construye comprando más software. Se construye conectando toda la operación.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El objetivo es que cada paciente viva una gran experiencia y que cada persona dentro de la clínica pueda trabajar con absoluta tranquilidad.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Cada empresa tiene una operación distinta.</h4>
                        <p className="text-sm text-neutral-500 font-light">Descubre cómo podría funcionar la tuya.</p>
                    </div>
                    <Link href="/empresa/filosofia" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Agendar una reunión</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
