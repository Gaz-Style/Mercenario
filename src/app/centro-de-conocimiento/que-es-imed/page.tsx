import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Qué es IMED? — Centro de Conocimiento",
    description: "IMED no reemplaza al profesional. Elimina el tiempo que se pierde antes de atender. Descubre cómo integrarlo en tu operación.",
};

const chain = [
    "El paciente agenda.",
    "Llega a recepción.",
    "Se valida la previsión.",
    "Es atendido.",
    "Se registra la ficha clínica.",
    "Se emite la documentación correspondiente.",
    "Administración recibe la información.",
    "Comienza el seguimiento."
];

export default function QueEsImedPage() {
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
                        IMED no reemplaza al profesional. <span className="text-neutral-400 font-semibold">Elimina el tiempo que se pierde antes de atender.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Si trabajas en salud, probablemente utilizas IMED todos los días. Pero pocas veces pensamos cuál es su verdadero propósito.
                    </p>
                    <div className="bg-neutral-50/80 border border-neutral-100 p-6 rounded-2xl italic text-sm text-neutral-600 max-w-xl">
                        "Sirve para validar previsiones."
                    </div>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-2">
                        Y aunque es cierto, esa respuesta se queda corta. IMED existe para que la información viaje más rápido entre las instituciones de salud y los prestadores. Su objetivo nunca fue agregar trabajo. Fue reducirlo.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">¿Qué hace realmente IMED?</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando un paciente llega a una consulta, existen varias verificaciones que deben realizarse antes de la atención:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                        {["Identificar al paciente.", "Validar su previsión.", "Confirmar beneficios.", "Calcular copagos.", "Autorizar prestación."].map((item, i) => (
                            <div key={i} className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50 text-xs font-semibold text-neutral-600 text-center flex items-center justify-center">
                                {item}
                            </div>
                        ))}
                    </div>
                    <p className="text-neutral-500 font-light leading-relaxed pt-4">
                        Hace años gran parte de este proceso era manual. Hoy buena parte puede realizarse digitalmente gracias a la conexión con IMED.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El beneficio no es solo para el paciente. <span className="text-neutral-400 font-semibold">También lo es para el equipo.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cada minuto que una recepcionista dedica a resolver procesos administrativos... Es un minuto que no dedica a atender personas.
                    </p>
                    <p className="text-black font-semibold pt-4">Cuando la validación ocurre de manera rápida, toda la operación avanza con mayor fluidez:</p>
                    <ul className="flex flex-wrap gap-6 pt-2">
                        <li className="flex items-center gap-2 text-sm text-neutral-600"><div className="w-1.5 h-1.5 rounded-full bg-black" />Menos filas.</li>
                        <li className="flex items-center gap-2 text-sm text-neutral-600"><div className="w-1.5 h-1.5 rounded-full bg-black" />Menos esperas.</li>
                        <li className="flex items-center gap-2 text-sm text-neutral-600"><div className="w-1.5 h-1.5 rounded-full bg-black" />Menos errores.</li>
                    </ul>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">IMED no trabaja solo.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Y aquí aparece uno de los mayores desafíos. Muchas clínicas utilizan IMED. Pero esa información queda aislada del resto de la empresa.
                    </p>
                    <div className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <p className="text-sm font-medium text-neutral-600">La validación ocurre.</p>
                        <p className="text-sm font-medium text-neutral-600">Luego alguien vuelve a escribir los datos.</p>
                        <p className="text-sm font-medium text-neutral-600">Actualiza otro sistema.</p>
                        <p className="text-sm font-medium text-neutral-600">Emite documentos.</p>
                        <p className="text-sm font-medium text-neutral-600">Agenda controles.</p>
                        <p className="text-sm font-medium text-neutral-600">Envía correos.</p>
                        <p className="text-sm font-bold text-black pt-2">Todo manualmente.</p>
                    </div>
                    <p className="text-black font-semibold text-lg pt-4">El problema ya no es IMED. Es la desconexión entre las herramientas.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Cadena Operativa</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una clínica funciona como una cadena.</h2>
                    
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
                    <p className="text-neutral-500 font-light pt-4">Cada paso depende del anterior. Cuando uno se detiene... Toda la experiencia se resiente.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Conectar IMED cambia mucho más que la recepción.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La información deja de quedar atrapada en un solo proceso.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium pt-4">
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black">Puede alimentar la agenda.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black">Actualizar el historial del paciente.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black">Preparar la facturación.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black">Generar indicadores.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50 md:col-span-2"><p className="text-black">Coordinar la administración.</p></div>
                    </div>
                    <p className="text-black font-semibold pt-4">Todo utilizando la misma información.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Lo importante no es la integración. <span className="text-neutral-400 font-semibold">Es el resultado.</span></h2>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">El paciente espera menos.</span>
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">El equipo trabaja con menos tareas repetitivas.</span>
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">La empresa administra mejor su operación.</span>
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">Los errores disminuyen.</span>
                    </div>
                    <p className="text-black font-bold text-lg pt-4">Eso es lo que realmente importa.</p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">El Rol de la Tecnología</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "IMED es una pieza. No la solución completa."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Por sí solo resuelve una necesidad específica. Pero cuando forma parte de una operación conectada... su impacto es mucho mayor. La tecnología deja de ser una colección de herramientas. Se convierte en una experiencia continua.
                        </p>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">En Mercenario...</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No desarrollamos IMED. Lo conectamos con el resto de la empresa. Porque el verdadero valor no está en validar una previsión.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-4">
                        Está en conseguir que toda la operación continúe automáticamente a partir de esa información.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">Conclusión</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        IMED ayuda a que una atención médica comience más rápido. Una operación conectada ayuda a que toda la empresa funcione mejor. Y esa diferencia es la que termina percibiendo cada paciente.
                    </p>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo una clínica puede conectar IMED con toda su operación.</h4>
                    </div>
                    <Link href="/soluciones/health" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar Soluciones para Salud</span>
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
