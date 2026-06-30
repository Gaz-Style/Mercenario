import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function FilosofiaPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 15 // Filosofía</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        Diseñamos la forma en que tu empresa trabaja.<br />
                        <span className="text-neutral-400 font-semibold">No vendemos un software. Construimos una operación.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Cada empresa tiene una historia distinta. Pero casi todas comparten el mismo desafío: la información está repartida, las tareas se repiten, los sistemas no se comunican y las personas terminan haciendo de puente de datos entre ellos. Nuestro trabajo consiste en cambiar eso.
                    </p>
                </section>

                {/* Section 2: Las 4 Etapas */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Nuestra Metodología</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                            Cómo trabajamos.
                        </h2>
                    </div>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-10 py-2">
                        {[
                            {
                                title: "1. No comenzamos instalando tecnología.",
                                desc: "Comenzamos haciendo preguntas críticas. Entendemos de verdad cómo llega un cliente, quién agenda, cómo cobras y dónde se pierde tiempo u ocurren errores. Comprender es la base."
                            },
                            {
                                title: "2. Luego diseñamos la operación.",
                                desc: "No pensamos en marcas de software, pensamos en procesos. Qué ocurre primero, qué ocurre después, qué tareas pueden automatizarse y qué decisiones críticas siempre deberán ser humanas."
                            },
                            {
                                title: "3. Después conectamos las herramientas.",
                                desc: "Enlazamos las que ya utilizas, las que necesitas incorporar y las que desarrollamos a medida para tu empresa. El objetivo nunca es llenar tu negocio de apps sueltas, sino lograr que funcionen como un solo bloque."
                            },
                            {
                                title: "4. Finalmente, acompañamos la evolución.",
                                desc: "Una empresa bien diseñada crece y cambia. Llegan nuevos servicios y personas. Mercenario crece junto a tu operación para que el sistema siga respondiendo al mismo movimiento."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <h3 className="text-sm font-bold text-black tracking-tight">{item.title}</h3>
                                <p className="text-xs text-neutral-500 font-light mt-1 max-w-lg leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Do vs Do Not */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Claridad</span>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">
                            Honestidad operativa.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* What we do */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Lo que construimos</h3>
                            <ul className="text-xs text-neutral-500 space-y-2 font-medium">
                                <li>· Una operación conectada de fondo.</li>
                                <li>· Una mejor experiencia para tus clientes.</li>
                                <li>· Un Centro de Operaciones unificado.</li>
                                <li>· Automatizaciones, integraciones y marketing.</li>
                                <li>· Información y reportes financieros en tiempo real.</li>
                                <li>· Inteligencia Artificial y multiagentes a la medida.</li>
                            </ul>
                        </div>

                        {/* What we do NOT do */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Lo que no hacemos</h3>
                            <ul className="text-xs text-neutral-500 space-y-2 font-medium">
                                <li>· No reemplazamos a las personas del equipo.</li>
                                <li>· No instalamos soluciones que no necesitas.</li>
                                <li>· No obligamos a cambiar procesos que funcionan bien.</li>
                                <li>· No vendemos soluciones genéricas iguales para todos.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section 4: Adaptabilidad */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Mercenario no es un producto terminado.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Es una plataforma que se adapta a la forma en que trabaja cada empresa. No al revés. Una clínica no opera igual que una tienda, y un centro estético tiene desafíos totalmente distintos a una consulta médica. La tecnología puede ser la misma; la operación nunca lo es.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Nuestro objetivo es simple: que tu empresa funcione con la claridad, el orden y la coordinación que normalmente solo encontramos en grandes organizaciones.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando todo está conectado, las personas trabajan con mayor tranquilidad, los clientes reciben una mejor experiencia y el dueño puede volver a dirigir su empresa en lugar de perseguir problemas todos los días.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Cuéntanos cómo funciona hoy tu empresa.</h4>
                        <p className="text-sm text-neutral-500 font-light">Diseñaremos una operación pensada específicamente para ella.</p>
                    </div>
                    <Link href="/operacion/marketing" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Solicitar una reunión</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
