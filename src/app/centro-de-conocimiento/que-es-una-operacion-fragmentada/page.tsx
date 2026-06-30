import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function OperacionFragmentadaPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 02 // El Diagnóstico</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        Nadie diseña una empresa para que sea compleja.<br />
                        <span className="text-neutral-400 font-semibold">Simplemente ocurre.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Cuando una empresa comienza, todo es simple. Un teléfono. Un calendario. Una libreta. Un computador. Con eso basta.
                    </p>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed">
                        Pero la empresa crece. Llegan más clientes. Más pagos. Más profesionales. Más documentos. Más responsabilidades. Y cada nuevo desafío suele resolverse de la misma manera: con una nueva herramienta.
                    </p>
                </section>

                {/* Timeline of Fragmentation */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Evolución Silenciosa</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                            Así comienza la fragmentación.
                        </h2>
                    </div>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-12 py-2">
                        {[
                            { step: "El Inicio", desc: "La libreta o el celular resuelven la agenda básica." },
                            { step: "El Cobro", desc: "Aparece un sistema o terminal para procesar los pagos electrónicos." },
                            { step: "La Legalidad", desc: "Se contrata un software externo para facturar y emitir boletas al SII." },
                            { step: "Los Clientes", desc: "Se implementa una base de datos o CRM sencillo para guardar fichas." },
                            { step: "La Captación", desc: "Se configura una plataforma extra para enviar correos y marketing." },
                            { step: "El Frankenstein contable", desc: "Se crea una planilla Excel gigantesca que intenta unir todo lo anterior de forma manual." }
                        ].map((item, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <h3 className="text-sm font-bold text-black tracking-tight">{item.step}</h3>
                                <p className="text-xs text-neutral-500 font-light mt-1 max-w-lg leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-sm text-neutral-500 font-light max-w-2xl leading-relaxed pt-6">
                        Ninguna decisión fue incorrecta. Cada herramienta resolvió un problema puntual en el momento en que apareció.
                    </p>
                </section>

                {/* Section 3: El problema aparece después */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El problema aparece después.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cada herramienta comienza a guardar información distinta. Cada una tiene usuarios diferentes. Cada una envía notificaciones distintas. Cada una genera reportes diferentes.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Y ninguna sabe lo que ocurre en la otra. La empresa sigue creciendo, pero la información deja de hacerlo.
                    </p>
                </section>

                {/* Section 4: Entonces aparecen las personas */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Entonces aparecen las personas.
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        {["La secretaria copia datos.", "El administrador revisa planillas.", "El contador vuelve a ingresar.", "El profesional confirma horarios.", "La gerencia intenta entender."].map((action, idx) => (
                            <div key={idx} className="bg-neutral-50 border border-neutral-100 p-4 rounded-xl flex items-center justify-center min-h-[90px]">
                                <p className="text-[11px] font-medium text-neutral-600 leading-tight">{action}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-neutral-500 font-light leading-relaxed pt-4">
                        Las personas comienzan a convertirse en el puente entre sistemas que nunca aprendieron a conversar.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        La empresa sigue funcionando, pero cada día depende más del esfuerzo humano. No porque trabajen mal, sino porque la operación fue creciendo sin una estructura común.
                    </p>
                </section>

                {/* Section 5: Las consecuencias */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Las consecuencias no siempre son evidentes.
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-xs font-medium text-neutral-500">
                        <div className="border-l border-neutral-200 pl-4 py-2"><p>Una cita olvidada.</p></div>
                        <div className="border-l border-neutral-200 pl-4 py-2"><p>Un pago sin registrar.</p></div>
                        <div className="border-l border-neutral-200 pl-4 py-2"><p>Una boleta emitida tarde.</p></div>
                        <div className="border-l border-neutral-200 pl-4 py-2"><p>Un cliente que no volvió.</p></div>
                        <div className="border-l border-neutral-200 pl-4 py-2"><p>Un recordatorio no enviado.</p></div>
                        <div className="border-l border-neutral-200 pl-4 py-2"><p>Una reseña no solicitada.</p></div>
                    </div>
                    <p className="text-neutral-500 font-light leading-relaxed pt-4">
                        Cada problema parece pequeño. Pero juntos consumen horas de trabajo todos los días.
                    </p>
                </section>

                {/* Section 6: Todo parece normal */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Lo más complejo es que todo parece normal.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las empresas se acostumbran. "Siempre lo hemos hecho así". "Después lo revisamos". "Anótalo para que no se nos olvide". "Pregúntale a la secretaria".
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Con el tiempo, el trabajo manual deja de parecer un problema y comienza a formar parte de la cultura de la empresa.
                    </p>
                </section>

                {/* Section 7: Sin embargo... */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Sin embargo...
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las grandes organizaciones también enfrentan los mismos desafíos. La diferencia es que no permiten que cada área trabaje aislada.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Diseñan procesos. Conectan información. Comparten datos. Automatizan tareas repetitivas y permiten que las personas se concentren en tomar decisiones, no en mover información de un lugar a otro.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Una pequeña empresa también puede trabajar así. No necesita cientos de personas, ni un departamento de tecnología, ni una inversión imposible. Solo necesita que su operación deje de estar fragmentada.
                    </p>
                </section>

                {/* Section 8: Pregunta */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-xl md:text-2xl font-bold text-black">
                        Antes de pensar en nuevas herramientas...
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Hazte una pregunta. Cuando un cliente agenda una cita...
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm font-semibold pt-4">
                        <div className="bg-neutral-50 p-6 border border-neutral-100 rounded-xl">
                            <p className="text-neutral-400 text-[10px] uppercase tracking-wider">Escenario A</p>
                            <p className="text-base text-neutral-500 pt-2">¿Toda tu empresa se entera automáticamente?</p>
                        </div>
                        <div className="bg-neutral-50 p-6 border border-neutral-100 rounded-xl">
                            <p className="text-neutral-400 text-[10px] uppercase tracking-wider">Escenario B</p>
                            <p className="text-base text-black pt-2">¿O todavía depende de que alguien lo comunique?</p>
                        </div>
                    </div>
                    <p className="text-neutral-500 font-light leading-relaxed pt-4">
                        La respuesta suele explicar gran parte de los problemas diarios de una operación.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">El siguiente paso no es comprar otra herramienta.</h4>
                        <p className="text-sm text-neutral-500 font-light">Es entender cómo todas pueden comenzar a trabajar como una sola.</p>
                    </div>
                    <Link href="/operacion/como-se-soluciona" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Descubre cómo funciona una operación conectada</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
