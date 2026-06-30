import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Qué es FONASA? — Centro de Conocimiento",
    description: "FONASA no es un sistema para clínicas. Es el sistema que permite que millones de personas accedan a la salud. Descubre cómo integrarlo.",
};

const chain = [
    "La agenda conoce al paciente.",
    "Recepción prepara la atención.",
    "Administración recibe los datos necesarios.",
    "La ficha clínica queda disponible.",
    "La facturación continúa sin volver a digitar información."
];

export default function QueEsFonasaPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">CONOCIMIENTO</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Centro de Conocimiento</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        FONASA no es un sistema para clínicas. <span className="text-neutral-400 font-semibold">Es el sistema que permite que millones de personas accedan a la salud.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Cuando una persona agenda una atención médica, pocas veces piensa en todo lo que ocurre antes de entrar a la consulta: Verificación de previsión. Bonos. Copagos. Coberturas. Prestaciones. Autorizaciones.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-2">
                        Para el paciente todo debería ser simple. Pero detrás de esa simplicidad existe una operación compleja. Y gran parte de ella involucra a FONASA.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">¿Qué es FONASA?</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El Fondo Nacional de Salud es el seguro público de salud en Chile. Millones de personas utilizan sus beneficios para acceder a consultas, exámenes, procedimientos y tratamientos.
                    </p>
                    <p className="text-black font-semibold pt-4">
                        Para clínicas, centros médicos y profesionales, esto significa que parte importante de la atención diaria depende de procesos relacionados con FONASA. Por eso una buena operación debe estar preparada para trabajar con ellos.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El paciente no quiere entender el proceso. <span className="text-neutral-400 font-semibold">Quiere ser atendido.</span></h2>
                    <ul className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm font-medium text-neutral-600">No le interesa saber cómo funciona una cobertura.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm font-medium text-neutral-600">Ni cómo se valida una prestación.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm font-medium text-neutral-600">Ni qué plataforma utiliza la clínica.</p></li>
                    </ul>
                    <p className="text-black font-semibold pt-4">Solo espera que todo ocurra rápidamente. Cuando la operación funciona bien... El paciente apenas nota que existe toda esa complejidad.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El desafío aparece cuando la información no está conectada.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Una secretaria valida la previsión. Luego vuelve a escribir los datos. Administración registra nuevamente al paciente. Más tarde se generan documentos. Finalmente alguien actualiza otra plataforma.
                    </p>
                    <div className="bg-neutral-50/50 border border-neutral-100 p-6 rounded-2xl mt-4">
                        <p className="text-sm font-semibold text-black">La información viaja varias veces. Siempre de forma manual. Y cada repetición aumenta el riesgo de errores.</p>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Solución Integrada</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una clínica moderna trabaja diferente.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La información ingresa una sola vez. Desde ese momento acompaña todo el recorrido:
                    </p>
                    
                    <div className="space-y-0 mt-4">
                        {chain.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-start">
                                <div className="flex items-center gap-4 py-4 w-full">
                                    <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                                    <p className="text-sm font-semibold text-black leading-relaxed">{step}</p>
                                </div>
                                {idx < chain.length - 1 && (
                                    <div className="ml-[3px] text-neutral-300 text-xs font-mono pl-0.5 pb-1 select-none">↓</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-neutral-500 font-light pt-4">Todo ocurre de manera coordinada.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">FONASA forma parte de una operación mucho mayor.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No comienza cuando el paciente llega. Comienza cuando agenda. Y tampoco termina cuando sale de la consulta. Después vienen documentos. Seguimiento. Nuevas atenciones. Indicadores. Administración.
                    </p>
                    <p className="text-black font-semibold pt-4">La experiencia continúa.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El verdadero objetivo no es digitalizar un trámite. <span className="text-neutral-400 font-semibold">Es mejorar la experiencia.</span></h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-neutral-600 text-center pt-4">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Menos tiempo esperando.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Menos errores.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Menos información duplicada.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Más tiempo para atender.</div>
                    </div>
                    <p className="text-black font-semibold pt-4">Porque una buena operación beneficia tanto al equipo como al paciente.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Conectar FONASA no significa cambiar la forma de trabajar.</h2>
                    <ul className="flex flex-wrap gap-6 pt-2 border-l border-neutral-200 ml-1 pl-6">
                        <li className="text-sm font-medium text-neutral-600">Significa eliminar pasos innecesarios.</li>
                        <li className="text-sm font-medium text-neutral-600">Permitir que la información circule.</li>
                        <li className="text-sm font-medium text-neutral-600">Reducir tareas repetitivas.</li>
                        <li className="text-sm font-medium text-neutral-600">Dar visibilidad a toda la empresa.</li>
                        <li className="text-sm font-medium text-neutral-600">Y preparar la operación para seguir creciendo.</li>
                    </ul>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">La Filosofía</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "En Mercenario... no reemplazamos los servicios de FONASA. Conectamos la información que generan con el resto de la operación."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Agenda. Ficha clínica. Facturación. Administración. Marketing. Seguimiento. Todo comparte la misma información. Porque la salud no depende únicamente de una buena atención. También depende de una buena organización.
                        </p>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">Conclusión</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        FONASA ayuda a que millones de personas accedan a la salud. Una operación conectada ayuda a que cada una de esas atenciones ocurra de forma más simple, más rápida y con menos trabajo administrativo.
                    </p>
                    <p className="text-black font-semibold pt-2">
                        Y esa diferencia la perciben tanto los pacientes como el equipo que los atiende.
                    </p>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo una operación conectada integra cada etapa de la atención médica.</h4>
                    </div>
                    <Link href="/soluciones/health" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar la solución para centros de salud</span>
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
