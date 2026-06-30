import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Solución Personalizada para tu Empresa — Mercenario IOS",
    description: "Tu empresa no encaja en un molde. Ninguna empresa real lo hace. Descubre cómo una operación diseñada desde tu realidad puede transformar cómo funciona tu negocio.",
};

export default function SolucionesPersonalizadasPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">PERSONALIZADO</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                {/* HERO */}
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Solución Personalizada</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Tu empresa no encaja en un molde. <br />
                        <span className="text-neutral-400 font-semibold">Ninguna empresa real lo hace.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Hay empresas que mezclan rubros, que tienen procesos únicos, que operan de una manera que no tiene nombre en ningún catálogo de software. Esas empresas son exactamente las que más necesitan una solución diseñada desde su propia realidad.
                    </p>
                </section>

                {/* EL PROBLEMA DE LOS MOLDES */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El problema con las soluciones genéricas.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La mayoría de los sistemas de gestión están diseñados para una empresa promedio que nadie ha visto en la vida real. Tienen módulos que nadie usa, flujos que no corresponden a tu proceso y una lógica que obliga a que la empresa se adapte al software, en lugar de que el software se adapte a la empresa.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El resultado siempre es el mismo: la empresa termina usando el 20% del sistema y el 80% sigue ocurriendo en planillas, cuadernos y conversaciones de WhatsApp.
                    </p>
                    <p className="text-black font-semibold pt-2">Un sistema que no refleja cómo opera tu empresa no es un sistema. Es un problema adicional.</p>
                </section>

                {/* CÓMO FUNCIONA TU EMPRESA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Primero entendemos cómo funciona tu empresa.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Antes de proponer cualquier solución, necesitamos entender tu operación real. Cómo entra un cliente. Qué pasa desde que entra hasta que se atiende. Cómo se registra lo que se hizo. Cómo se cobra. Cómo se organiza el equipo. Qué información necesitas ver y cuándo.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Ese diagnóstico inicial no tiene costo y no tiene compromiso. Porque si no entendemos tu empresa, no podemos ayudarte de verdad.
                    </p>
                </section>

                {/* CÓMO OPERA UNA GRAN EMPRESA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Lo que todas las empresas exitosas tienen en común.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Más allá del rubro, la industria o el tamaño, las empresas que operan bien comparten una característica: la información fluye sin fricción entre las personas que necesitan usarla. El dueño no necesita preguntar para saber lo que pasa. El equipo no necesita esperar instrucciones para saber qué hacer. Y el cliente no necesita perseguir a nadie para obtener una respuesta.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Eso no lo da un software específico. Lo da una operación bien diseñada, apoyada por las herramientas correctas para esa empresa en particular.
                    </p>
                </section>

                {/* QUÉ PODEMOS CONSTRUIR */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Lo que podemos construir juntos.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed mb-8">Dependiendo de cómo funciona tu empresa, podemos diseñar e implementar:</p>
                    <div className="space-y-4">
                        {[
                            "Un flujo de atención al cliente completamente adaptado a tu proceso.",
                            "Un sistema de coordinación interno que refleja cómo trabaja tu equipo.",
                            "Automatizaciones que eliminen las tareas repetitivas específicas de tu operación.",
                            "Reportes que muestren exactamente la información que tú necesitas ver.",
                            "Integraciones con las herramientas que ya usas y no puedes reemplazar.",
                            "Una experiencia de cliente que se sienta coherente y profesional en cada punto de contacto."
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-5 border border-neutral-100 rounded-xl bg-white">
                                <span className="text-[10px] font-mono text-neutral-300 mt-0.5 shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                                <p className="text-sm text-neutral-700 font-medium leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* EL PROCESO */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo funciona el proceso.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Comenzamos con una conversación. Sin presentaciones de ventas, sin demostraciones de software. Solo entendemos cómo opera tu empresa hoy. Qué funciona bien y qué no. Cuáles son los puntos donde el tiempo se pierde o donde la información se pierde.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Con eso, construimos una propuesta específica para tu realidad. No un catálogo de módulos. Una solución diseñada para ti.
                    </p>
                </section>

                {/* RESULTADO */}
                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">Lo que cambia de verdad</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Una operación que funciona según cómo tú trabajas. No según cómo el software decidió que debías trabajar."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Ese es el único tipo de solución que produce un cambio real. Porque si el sistema no refleja tu empresa, no va a transformarla.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-3 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Cuéntanos cómo funciona tu empresa.</h4>
                        <p className="text-sm text-neutral-500 font-light">En la primera conversación ya tendrás una perspectiva diferente de tu operación.</p>
                    </div>
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Conversemos</span>
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
