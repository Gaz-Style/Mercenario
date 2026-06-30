import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Qué es la experiencia del cliente? — Centro de Conocimiento",
    description: "La experiencia del cliente no comienza cuando lo atiendes. Comienza mucho antes. Y continúa mucho después.",
};

const moments = [
    "Encuentra tu empresa.",
    "Visita tu sitio web.",
    "Hace una pregunta.",
    "Recibe una respuesta.",
    "Agenda una reunión.",
    "Confirma su asistencia.",
    "Es atendida.",
    "Recibe un documento.",
    "Paga.",
    "Vuelve meses después."
];

export default function QueEsExperienciaDeClientePage() {
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
                        La experiencia del cliente no comienza cuando lo atiendes. <span className="text-neutral-400 font-semibold">Comienza mucho antes. Y continúa mucho después.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Muchas empresas creen que la experiencia del cliente depende de una sonrisa. De un buen café. De una oficina bonita. De responder con amabilidad. Todo eso ayuda.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-2">
                        Pero la experiencia comienza mucho antes de que el cliente cruce la puerta. Y casi siempre depende de algo que nunca ve: La operación.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La experiencia es la suma de todos los momentos.</h2>
                    <div className="flex flex-wrap gap-3 pt-4">
                        {moments.map((item, i) => (
                            <span key={i} className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">{item}</span>
                        ))}
                    </div>
                    <p className="text-neutral-500 font-light pt-4">
                        Cada uno de esos momentos construye una percepción. No existe un único instante donde ocurre la experiencia. Toda la empresa participa en ella.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Los clientes no evalúan procesos. <span className="text-neutral-400 font-semibold">Evalúan cómo se sintieron.</span></h2>
                    <ul className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm font-medium text-neutral-600">No recuerdan qué software utilizaste.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm font-medium text-neutral-600">No recuerdan cuántas personas participaron.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm font-medium text-neutral-600">No recuerdan cómo emitiste una factura.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-semibold text-black">Recuerdan si fue fácil.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-semibold text-black">Si sintieron confianza.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-semibold text-black">Si todo ocurrió sin problemas.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-semibold text-black">Si volverían.</p></li>
                    </ul>
                    <p className="text-black font-semibold pt-4">La experiencia siempre es emocional. Aunque nazca de procesos muy concretos.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La mayoría de los problemas nunca llegan al cliente por casualidad.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-neutral-600 pt-4">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Un correo que no se envió.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Una cita olvidada.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Una factura incorrecta.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Una llamada no devuelta.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Un pago que no apareció.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Una agenda duplicada.</div>
                    </div>
                    <p className="text-neutral-500 font-light pt-4">Casi nunca son errores aislados. Son síntomas de una operación desconectada.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una buena experiencia nace de una buena organización.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando toda la empresa comparte la misma información... Las respuestas llegan más rápido. Los errores disminuyen. Las personas trabajan con tranquilidad. Y el cliente siente que todo fluye naturalmente.
                    </p>
                    <p className="text-black font-semibold pt-2">Lo interesante es que nunca ve ese trabajo. Solo percibe el resultado.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La experiencia también continúa después de la venta.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Muchas empresas desaparecen cuando reciben el pago. Las mejores hacen exactamente lo contrario.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">Preguntan cómo fue la atención.</span>
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">Recuerdan un control.</span>
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">Envían información útil.</span>
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">Acompañan.</span>
                    </div>
                    <p className="text-black font-semibold pt-4">Porque un cliente satisfecho puede volver. Pero un cliente que se siente acompañado también recomienda.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La tecnología no crea experiencias. <span className="text-neutral-400 font-semibold">Las hace posibles.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Ningún software puede hacer que una empresa sea cercana. Pero sí puede evitar que una persona tenga que repetir sus datos. Puede recordar una cita. Puede mantener informado al equipo. Puede eliminar errores.
                    </p>
                    <div className="bg-neutral-50/50 border border-neutral-100 p-6 rounded-2xl mt-4 space-y-4">
                        <p className="text-sm font-semibold text-neutral-800">Puede liberar tiempo para que las personas hagan aquello que ninguna tecnología puede reemplazar.</p>
                        <ul className="flex gap-4 text-xs font-bold text-black uppercase tracking-wider">
                            <li>Escuchar.</li>
                            <li>Comprender.</li>
                            <li>Cuidar.</li>
                        </ul>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una empresa pequeña puede ofrecer una experiencia extraordinaria.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No necesita cientos de personas. Ni enormes presupuestos. Necesita procesos claros. Información conectada. Y herramientas que trabajen juntas.
                    </p>
                    <p className="text-black font-semibold pt-2">La experiencia no depende del tamaño de la empresa. Depende de cómo está diseñada su operación.</p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">La Filosofía Central</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "En Mercenario... creemos que la experiencia del cliente es la consecuencia natural de una empresa bien organizada."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Por eso no comenzamos hablando de software. Comenzamos hablando de personas. De confianza. De procesos. De operaciones. Porque cuando una empresa funciona correctamente por dentro... los clientes lo sienten inmediatamente por fuera.
                        </p>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">Conclusión</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La experiencia del cliente no es un departamento. No es una estrategia. No es una campaña. Es la forma en que una empresa cumple cada una de las promesas que hace.
                    </p>
                    <p className="text-black font-semibold pt-2">
                        Y cada promesa necesita una operación capaz de sostenerla.
                    </p>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo una operación conectada permite que cada interacción se transforme en una mejor experiencia.</h4>
                    </div>
                    <Link href="/operacion/como-funciona-una-empresa" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar cómo funciona una empresa</span>
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
