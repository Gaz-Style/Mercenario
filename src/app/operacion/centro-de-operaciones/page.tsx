import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function CentroDeOperacionesPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 11 // El Centro de Mando</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        Imagina dirigir tu empresa desde un solo lugar.<br />
                        <span className="text-neutral-400 font-semibold">No para controlarlo todo. Sino para comprenderlo todo.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Cuando una empresa crece, también crece la cantidad de información. Clientes, pagos, agenda, facturas, profesionales, inventario, marketing, reportes. Cada área comienza a generar sus propios datos, y cada dato termina viviendo en un lugar diferente.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        El resultado: todos trabajan, pero nadie tiene la fotografía completa. El Centro de Operaciones nace para resolver exactamente ese problema. No reemplaza a las distintas áreas: las reúne.
                    </p>
                </section>

                {/* Section 2: Un solo panel */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">El Panel de Control</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                            Un solo panel. Toda la empresa.
                        </h2>
                        <p className="text-sm text-neutral-500 font-light">Al comenzar el día, puedes responder al instante:</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {[
                            "¿Cuántos clientes fueron atendidos?",
                            "¿Cuántos vienen en camino?",
                            "¿Cuánto dinero ingresó hoy?",
                            "¿Qué pagos siguen pendientes?",
                            "¿Qué profesional tiene mayor ocupación?",
                            "¿Qué campañas están funcionando?",
                            "¿Qué clientes necesitan seguimiento?",
                            "¿Qué documentos aún faltan?"
                        ].map((question, idx) => (
                            <div key={idx} className="bg-neutral-50 border border-neutral-100 p-4 rounded-xl flex items-center justify-center min-h-[90px]">
                                <p className="text-[10px] font-bold text-neutral-700 leading-tight">{question}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-neutral-500 font-light pt-4 leading-relaxed">
                        Todo a la mano, sin necesidad de abrir cinco plataformas diferentes o forzar llamadas de control administrativo.
                    </p>
                </section>

                {/* Section 3: Las conversaciones de las áreas */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Flujo de Comunicación</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                            Cada área continúa haciendo su trabajo.
                        </h2>
                        <p className="text-sm text-neutral-500 font-light">La diferencia es que ahora comparten información de manera directa:</p>
                    </div>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-6 py-2">
                        {[
                            "La agenda conversa directamente con el CRM.",
                            "El CRM comparte patrones clave con marketing.",
                            "Marketing alimenta y prepara las ventas.",
                            "Las ventas generan el movimiento contable en administración.",
                            "Administración concilia la caja real con finanzas.",
                            "Y toda la empresa conversa directamente contigo."
                        ].map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <p className="text-sm font-semibold text-neutral-750 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-black font-semibold text-base leading-relaxed pt-4">
                        Tomar decisiones deja de ser una intuición. Comienza a ser información.
                    </p>
                </section>

                {/* Section 4: Preguntas antes de los problemas */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Respuestas antes de que aparezcan los problemas.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El Centro de Operaciones te permite reaccionar en tiempo real, no al final del mes, ni cuando el contador entrega un informe tardío, ni cuando alguien termina de cuadrar una planilla Excel.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-neutral-500 pt-2">
                        <li>· ¿Qué profesional tiene horas disponibles esta semana?</li>
                        <li>· ¿Qué servicio genera más ingresos netos?</li>
                        <li>· ¿Qué tratamientos están incompletos en el registro?</li>
                        <li>· ¿Qué campañas están atrayendo clientes de verdad?</li>
                    </div>
                </section>

                {/* Section 5: Una empresa moderna no necesita más reportes */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Una empresa moderna no necesita más reportes. Necesita mejores respuestas.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Por eso el Centro de Operaciones no muestra datos por el simple hecho de acumularlos: muestra aquello que te ayuda a decidir. Además, aprende con el tiempo para detectar patrones de horarios, servicios y oportunidades de crecimiento.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        La verdadera tranquilidad no consiste en trabajar menos: consiste en saber que la empresa sigue funcionando incluso cuando tú no estás mirando.
                    </p>
                </section>

                {/* Section 6: El objetivo */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Ese es el objetivo.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Que la empresa deje de depender de la memoria, del papel, de la planilla o de la llamada telefónica constante, y comience a depender de procesos bien diseñados de manera sistémica.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        El Centro de Operaciones no dirige tu empresa: te entrega la información para que tú puedas hacerlo mejor.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Descubre cómo la Inteligencia Artificial puede ayudarte a operar una empresa moderna.</h4>
                    </div>
                    <Link href="/operacion/ia" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Conocer el Asistente IA</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
