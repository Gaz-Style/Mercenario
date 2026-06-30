import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function ViveLaExperienciaPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 04 // La Evidencia</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        No necesitas imaginar cómo funciona una empresa conectada.<br />
                        <span className="text-neutral-400 font-semibold">Puedes verlo.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Hasta ahora hemos hablado de cómo debería funcionar una empresa. Pero la mejor forma de entenderlo no es explicándolo. Es viviéndolo.
                    </p>
                </section>

                {/* Section 2: Elena La Costurera */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Caso Real</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Una empresa real decidió abrir su operación.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No para mostrar un software. Sino para mostrar cómo cambia la experiencia de sus clientes cuando todo está conectado.
                    </p>
                    <div className="bg-neutral-50 border border-neutral-100 p-8 rounded-2xl space-y-2">
                        <h3 className="text-xl font-bold text-black">Elena La Costurera</h3>
                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">Taller de confección activo</p>
                        <p className="text-sm text-neutral-500 font-light pt-2 leading-relaxed">
                            Una empresa real, con clientes reales y una operación completamente activa coordinada por el sistema nervioso de Mercenario.
                        </p>
                    </div>
                    <p className="text-black font-semibold leading-relaxed">
                        Lo que vas a ver no es una simulación. Es el recorrido real de un cliente desde el primer contacto hasta la fidelización, sin cortes ni pantallas de marketing.
                    </p>
                </section>

                {/* Timeline of the journey */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">El Recorrido</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                            Desde el primer contacto hasta la fidelización.
                        </h2>
                    </div>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-10 py-2">
                        {[
                            "Un cliente agenda una cita.",
                            "Recibe confirmación automática por WhatsApp y correo.",
                            "Se registra su información de forma única en el sistema.",
                            "Se prepara la atención de confección.",
                            "Se procesa el pago de forma electrónica.",
                            "Se emite la boleta legal del SII automáticamente.",
                            "Se actualiza la información contable y de caja interna.",
                            "Se activa el seguimiento automático de la orden.",
                            "Se solicita una evaluación del servicio recibido.",
                            "Se guarda el historial completo de medidas y visitas del cliente.",
                            "Se prepara y agenda la siguiente interacción óptima de forma autónoma."
                        ].map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <p className="text-sm font-semibold text-neutral-750 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 4: Lo que no ves */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Lo importante no es lo que ves. Es lo que no ves.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-500 font-light text-sm md:text-base leading-relaxed">
                        <div className="space-y-4">
                            <p>No hay personas copiando datos entre sistemas.</p>
                            <p>No hay mensajes reenviados manualmente.</p>
                        </div>
                        <div className="space-y-4">
                            <p>No hay planillas intermedias para cuadrar la caja.</p>
                            <p>No hay información perdida o llamadas telefónicas de control.</p>
                        </div>
                    </div>
                    <p className="text-black font-semibold leading-relaxed pt-4">
                        Todo ocurre dentro de una sola operación. En tiempo real. Sin fricción.
                    </p>
                </section>

                {/* Section 5: Cambios para la empresa y el cliente */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Company */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-black border-b border-neutral-200 pb-2">¿Qué cambia para la empresa?</h3>
                            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">No trabaja más. Trabaja mejor.</p>
                            <ul className="text-xs text-neutral-500 space-y-2 pt-2 font-medium">
                                <li>· Cada cliente recibe una experiencia consistente.</li>
                                <li>· Cada proceso ocurre en orden exacto.</li>
                                <li>· Cada acción tiene continuidad lógica.</li>
                                <li>· Cada decisión se toma con información completa.</li>
                            </ul>
                        </div>

                        {/* Client */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-black border-b border-neutral-200 pb-2">¿Qué cambia para el cliente?</h3>
                            <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Siente claridad, continuidad y confianza.</p>
                            <ul className="text-xs text-neutral-500 space-y-2 pt-2 font-medium">
                                <li>· No tiene que repetir información.</li>
                                <li>· No tiene que esperar confirmaciones innecesarias.</li>
                                <li>· No siente desorden administrativo.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section 6: Esto es lo que significa operar conectado */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Esto es lo que significa operar conectado.
                    </h2>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed">
                        No es tecnología. Es orden.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Y esto es solo un ejemplo. Cada empresa tiene su propia forma de operar. Pero el principio es el mismo: cuando todo está conectado, la empresa deja de depender del caos diario para funcionar.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Ver cómo podría funcionar tu empresa.</h4>
                    </div>
                    <Link href="/empresa/nosotros" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar soluciones</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
