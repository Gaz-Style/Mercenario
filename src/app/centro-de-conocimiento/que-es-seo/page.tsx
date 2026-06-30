import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Qué es SEO? — Centro de Conocimiento",
    description: "El mejor lugar para esconder una empresa es la segunda página de Google. Y ahí es donde termina la mayoría.",
};

export default function QueEsSeoPage() {
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
                        El mejor lugar para esconder una empresa es la segunda página de Google. <span className="text-neutral-400 font-semibold">Y ahí es donde termina la mayoría.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Muchas personas creen que el SEO consiste en aparecer primero en Google. Pero esa es solo la consecuencia. El verdadero objetivo del SEO es mucho más simple.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-2">
                        Ser encontrado exactamente cuando alguien necesita lo que haces. No antes. No después. Justo en ese momento.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">¿Qué significa SEO?</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        SEO significa <em>Search Engine Optimization</em>. En español, Optimización para Motores de Búsqueda. En términos simples...
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Es el conjunto de decisiones que ayudan a que una empresa aparezca cuando alguien busca una solución.
                    </p>
                    <ul className="flex flex-col gap-2 pt-2 border-l border-neutral-200 ml-1 pl-6 text-sm text-neutral-600 font-medium">
                        <li>No es publicidad.</li>
                        <li>No es pagar anuncios.</li>
                        <li>Es construir un sitio que responda mejor que los demás a las preguntas de las personas.</li>
                    </ul>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Google ya no busca palabras. <span className="text-neutral-400 font-semibold">Busca respuestas.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Hace algunos años bastaba con repetir muchas veces una palabra. Hoy eso ya no funciona. Google intenta comprender qué necesita realmente una persona.
                    </p>
                    <div className="bg-neutral-50/50 border border-neutral-100 p-6 rounded-2xl mt-4 space-y-4">
                        <p className="text-sm font-semibold text-neutral-800">Si alguien escribe <em>"Software para clínicas"</em>, quizás no está buscando un software.</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-neutral-600">
                            <li>Quizás está buscando organizar mejor su consulta.</li>
                            <li>Reducir el trabajo administrativo.</li>
                            <li>Atender más pacientes.</li>
                            <li>Crecer.</li>
                        </ul>
                    </div>
                    <p className="text-black font-semibold pt-4">El buscador intenta entender esa intención. Y muestra los contenidos que mejor responden esa necesidad.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El SEO comienza mucho antes de escribir una página.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Comienza entendiendo a las personas.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">¿Qué preguntas hacen?</span>
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">¿Qué problemas intentan resolver?</span>
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">¿Qué dudas tienen antes de contratar?</span>
                    </div>
                    <p className="text-black font-semibold pt-4">
                        Una buena estrategia de SEO no escribe pensando en Google. Escribe pensando en las personas. Google simplemente recompensa ese esfuerzo.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una empresa responde preguntas todos los días.</h2>
                    <ul className="flex gap-4 pt-2 text-sm text-neutral-600 font-medium">
                        <li>Por teléfono.</li>
                        <li>Por WhatsApp.</li>
                        <li>Por correo.</li>
                        <li>En reuniones.</li>
                    </ul>
                    <p className="text-neutral-500 font-light pt-2">
                        Entonces surge una pregunta. ¿Por qué esas respuestas no están también en tu sitio web?
                    </p>
                    <p className="text-black font-semibold pt-2">
                        Cada pregunta respondida es una oportunidad para que un nuevo cliente encuentre tu empresa.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Confianza</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El contenido genera confianza.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium pt-2">
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50 space-y-3">
                            <p className="font-bold text-black border-b border-neutral-200 pb-2">Empresa 1</p>
                            <p className="text-neutral-500 font-light italic">"Somos líderes en soluciones empresariales."</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-black text-white space-y-3">
                            <p className="font-bold border-b border-neutral-800 pb-2">Empresa 2</p>
                            <ul className="text-neutral-400 font-light space-y-2">
                                <li>"¿Cómo funciona una empresa?"</li>
                                <li>"¿Qué es un ERP?"</li>
                                <li>"¿Cómo conectar WhatsApp?"</li>
                                <li>"¿Qué es conciliación bancaria?"</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-black font-semibold pt-2 text-center text-lg">¿Cuál transmite más confianza?</p>
                    <p className="text-neutral-500 font-light text-center">Las personas no buscan empresas. Buscan respuestas.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El SEO no termina cuando alguien entra a tu sitio. <span className="text-neutral-400 font-semibold">Ahí recién comienza la experiencia.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Si una página responde claramente una duda... El visitante continúa leyendo. Explora otros contenidos. Comprende mejor su problema. Y finalmente encuentra la solución.
                    </p>
                    <p className="text-black font-semibold text-lg pt-4">El mejor SEO no consigue visitas. Consigue conversaciones.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una empresa pequeña también puede competir.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No necesitas ser la empresa más grande. Necesitas ser la que mejor explica. La que mejor enseña. La que genera mayor confianza.
                    </p>
                    <p className="text-black font-semibold pt-2">Internet recompensa a quienes aportan valor antes de intentar vender.</p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">La Filosofía</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "En Mercenario... no entendemos el SEO como una estrategia para aparecer primero. Lo entendemos como una forma de ayudar."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Por eso escribimos páginas que responden preguntas reales. No para atraer clics. Sino para que cada empresario comprenda mejor cómo funciona su propia empresa. Porque cuando alguien entiende el problema... La solución aparece de forma natural.
                        </p>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">Conclusión</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El SEO no consiste en convencer a Google. Consiste en ayudar a las personas.
                    </p>
                    <p className="text-black font-semibold pt-2">
                        Y cuando ayudas de verdad... Google suele encargarse del resto.
                    </p>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo una operación bien diseñada también puede convertirse en la mejor estrategia de crecimiento.</h4>
                    </div>
                    <Link href="/centro-de-conocimiento" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar Centro de Conocimiento</span>
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
