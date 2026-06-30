import Link from "next/link";
import { ArrowLeft, ChevronRight, ArrowDown } from "lucide-react";

export default function OperacionConectadaPage() {
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

            <main className="w-full max-w-4xl mx-auto px-6 pt-40 pb-32 flex flex-col justify-start">
                
                {/* HERO */}
                <section className="space-y-8 mb-24 max-w-3xl">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 01 // La Idea</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        Una empresa no funciona por las herramientas que utiliza.<br />
                        <span className="text-neutral-400 font-semibold">Funciona por la forma en que todas trabajan juntas.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Durante años nos enseñaron que una empresa necesita un sistema para agendar, otro para cobrar, otro para emitir documentos y otro para comunicarse con sus clientes.
                    </p>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed">
                        Con el tiempo aparecen más herramientas. Más cuentas. Más planillas. Más procesos. Sin darnos cuenta, comenzamos a trabajar para los sistemas, en lugar de que los sistemas trabajen para nosotros.
                    </p>
                </section>

                {/* Section 2: Una empresa no son herramientas */}
                <section className="py-20 border-t border-neutral-100 space-y-6 max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Una empresa no son herramientas. Es una operación.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cada llamada. Cada pago. Cada correo. Cada cliente. Cada documento. Cada decisión. Forma parte de un mismo proceso.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Cuando una parte deja de comunicarse con la siguiente, aparece el trabajo manual. Y con él llegan los errores.
                    </p>
                </section>

                {/* Section 3: ¿Qué significa operar de forma conectada? */}
                <section className="py-20 border-t border-neutral-100 space-y-6 max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        ¿Qué significa operar de forma conectada?
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Significa que una acción desencadena automáticamente la siguiente. No porque alguien la recuerde. No porque una secretaria copie información. No porque otra persona revise una planilla.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Simplemente porque la empresa entiende lo que acaba de ocurrir.
                    </p>
                </section>

                {/* Comparative Section: Caos vs Orden */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="text-center max-w-xl mx-auto space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Comparación</span>
                        <h3 className="text-xl md:text-2xl font-bold text-black">Dos Realidades Operativas</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                        {/* Connected Operation */}
                        <div className="space-y-6 bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <h4 className="text-md font-bold text-black border-b border-neutral-200 pb-3 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                Así funciona una operación conectada.
                            </h4>
                            <div className="space-y-4 text-xs font-medium text-neutral-600">
                                {[
                                    "Un cliente agenda una consulta.",
                                    "El calendario se actualiza.",
                                    "El profesional recibe la información.",
                                    "El cliente recibe la confirmación.",
                                    "Se genera el enlace de pago.",
                                    "El pago queda registrado.",
                                    "Se emite el documento tributario.",
                                    "La información llega a la administración.",
                                    "Se actualizan los reportes financieros.",
                                    "Después de la atención comienza automáticamente el seguimiento."
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-mono text-[9px] font-bold">{idx + 1}</div>
                                        <p>{step}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-emerald-600 font-semibold pt-4">Nadie tuvo que repetir el trabajo. La empresa simplemente siguió funcionando.</p>
                        </div>

                        {/* Fragmented Operation */}
                        <div className="space-y-6 bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
                            <h4 className="text-md font-bold text-black border-b border-neutral-200 pb-3 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-mercenario-danger rounded-full" />
                                Lo contrario ocurre todos los días.
                            </h4>
                            <div className="space-y-4 text-xs font-medium text-neutral-600">
                                {[
                                    "Un cliente agenda.",
                                    "La secretaria copia la información.",
                                    "Luego llama al profesional.",
                                    "Más tarde envía un correo.",
                                    "Después confirma el pago.",
                                    "Luego revisa la agenda nuevamente.",
                                    "Finalmente recuerda pedir una reseña.",
                                    "Cada paso depende de una persona.",
                                    "Cada persona puede olvidar algo."
                                ].map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-4 h-4 bg-red-50 text-mercenario-danger rounded-full flex items-center justify-center font-mono text-[9px] font-bold">{idx + 1}</div>
                                        <p>{step}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-mercenario-danger font-semibold pt-4">No porque hagan mal su trabajo. Porque el sistema depende de ella para funcionar.</p>
                        </div>
                    </div>
                </section>

                {/* Section 4: Acompañar personas */}
                <section className="py-20 border-t border-neutral-100 space-y-6 max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Una operación conectada no reemplaza personas. Las acompaña.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las tareas repetitivas dejan de depender de la memoria. Las personas recuperan tiempo para hacer aquello que ninguna tecnología puede reemplazar.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Atender mejor. Escuchar mejor. Resolver mejor. Crear una mejor experiencia para cada cliente.
                    </p>
                </section>

                {/* Section 5: Entonces... */}
                <section className="py-20 border-t border-neutral-100 space-y-6 max-w-3xl">
                    <h3 className="text-xl font-bold text-black">Entonces...</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm leading-relaxed">
                        <div>
                            <p className="text-neutral-400 font-medium uppercase tracking-wider text-[10px]">Pregunta</p>
                            <p className="text-lg font-bold text-neutral-500 pt-1">¿Necesitas más herramientas?</p>
                            <p className="text-neutral-400 font-light pt-2">Probablemente no.</p>
                        </div>
                        <div>
                            <p className="text-neutral-400 font-medium uppercase tracking-wider text-[10px]">Pregunta</p>
                            <p className="text-lg font-bold text-black pt-1">¿Necesitas que las que ya utilizas comiencen a trabajar juntas?</p>
                            <p className="text-black font-semibold pt-2">Muy probablemente sí.</p>
                        </div>
                    </div>
                </section>

                {/* Section 6: ¿Cómo se logra? */}
                <section className="py-20 border-t border-neutral-100 space-y-6 max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        ¿Cómo se logra?
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Conectando cada área de la empresa para que la información fluya de manera automática entre ellas.
                    </p>
                    <p className="text-xs uppercase tracking-widest text-neutral-400 font-medium">
                        Agenda · Clientes · Pagos · Facturación · Administración · Marketing · Seguimiento · Reportes
                    </p>
                </section>

                {/* Section 7: La diferencia */}
                <section className="py-20 border-t border-neutral-100 space-y-6 max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Esa es la diferencia.
                    </h2>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed">
                        No se trata de automatizar tareas. Se trata de construir una empresa capaz de trabajar como una sola.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Descubre cómo una operación conectada puede adaptarse a tu empresa.</h4>
                    </div>
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Ver soluciones</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
