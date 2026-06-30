import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sistema para Empresas en Terreno y Constructoras — Mercenario IOS",
    description: "Tu empresa no despacha cuadrillas. Coordina personas, materiales y tiempo en múltiples frentes simultáneos. Descubre cómo conectar tu operación en terreno.",
};

const areas = [
    { name: "Coordinación de Cuadrillas", desc: "Asignación, ubicación y estado de cada equipo en terreno." },
    { name: "Control de Materiales", desc: "Stock en bodega y consumo por obra en tiempo real." },
    { name: "Registro de Avance", desc: "Reportes fotográficos y de progreso desde terreno." },
    { name: "Facturación por Hito", desc: "Cobros parciales vinculados al avance real de la obra." },
    { name: "Gestión de Subcontratos", desc: "Control de terceros integrado en el flujo de la obra." },
    { name: "Reportes de Costos", desc: "Proyección vs ejecución antes de que el presupuesto se desborde." }
];

export default function SolucionesTerrenoPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">TERRENO</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                {/* HERO */}
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Empresas en Terreno & Constructoras</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Tu empresa no despacha cuadrillas. <br />
                        <span className="text-neutral-400 font-semibold">Coordina múltiples frentes que nunca se detienen.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Mientras el dueño está en una obra, hay cuatro más avanzando solas. Cada una con su equipo, sus materiales, su cronograma y sus imprevistos. El control desde la oficina ya no es suficiente.
                    </p>
                </section>

                {/* COMPRENDER LA OPERACIÓN */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo funciona realmente una empresa en terreno.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Antes de que el primer trabajador llegue al frente, hay una operación logística completa. Los materiales deben estar disponibles. El equipo debe saber exactamente qué se espera de él ese día. Los planos, las especificaciones y los permisos deben estar accesibles. Y el cliente debe tener claridad sobre el avance.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Durante la ejecución, el ritmo de la obra depende de que la información fluya sin interrupciones. Una entrega de materiales atrasada paraliza una cuadrilla completa. Un cambio de especificación que no llega a tiempo obliga a rehacer el trabajo. Un reporte de avance que no llega a la oficina genera incertidumbre en el cliente.
                    </p>
                    <p className="text-black font-semibold pt-2">En terreno, el tiempo perdido no se recupera. Y casi siempre se pierde por falta de información, no por falta de mano de obra.</p>
                </section>

                {/* EL CRECIMIENTO */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando el número de obras supera la capacidad de supervisión directa.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Con una sola obra, el dueño puede estar presente todos los días. Con tres obras simultáneas, ya debe confiar en sus jefes de terreno. Con cinco o más, necesita sistemas que le entreguen visibilidad sin que tenga que llamar a cada supervisor para saber qué está pasando.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El crecimiento de una empresa en terreno depende de poder escalar sin perder el control. Y eso no ocurre con más personas. Ocurre con mejor información en tiempo real.
                    </p>
                </section>

                {/* EL CAOS */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Dónde se generan las pérdidas.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-neutral-600 pt-4">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Materiales que no llegan a tiempo.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Presupuestos que se desbordan.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Avance sin registro formal.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Facturas emitidas tarde.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Subcontratos sin control.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Clientes sin información de avance.</div>
                    </div>
                    <p className="text-black font-semibold pt-4">Cada uno de esos puntos tiene un costo real. En tiempo, en dinero y en la relación con el cliente.</p>
                </section>

                {/* CÓMO OPERA UNA EMPRESA GRANDE */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo operan las constructoras que manejan múltiples proyectos sin perder el hilo.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las empresas de construcción que logran crecer con rentabilidad comparten una característica: el dueño no necesita estar en terreno para saber qué está pasando. Tiene visibilidad del avance de cada obra, del consumo de materiales y del estado financiero de cada proyecto desde cualquier lugar.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Los jefes de terreno reportan el avance directamente al sistema. El sistema genera las alertas cuando algo se desvía del plan. Y el cliente recibe actualizaciones periódicas sin que nadie tenga que redactar un correo.
                    </p>
                </section>

                {/* OPERACIÓN CONECTADA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando la oficina y el terreno hablan el mismo idioma.</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        {areas.map((area, idx) => (
                            <div key={idx} className="p-6 border border-neutral-100 rounded-2xl bg-white hover:border-black transition-colors group">
                                <h4 className="text-sm font-bold text-black">{area.name}</h4>
                                <p className="text-xs text-neutral-500 mt-2 font-medium">{area.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* RESULTADO */}
                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">Lo que cambia de verdad</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Saber el estado de cada obra, el consumo de materiales y el avance financiero. Sin llamadas. Sin WhatsApp. Sin esperar al cierre del mes."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Esa visibilidad en tiempo real es lo que permite tomar decisiones antes de que los problemas se vuelvan pérdidas. Y es lo que permite crecer sin perder el control.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <h4 className="text-xl font-bold text-black max-w-xl">Conversemos sobre cuántas obras manejas hoy y cómo podrías verlas todas desde un mismo lugar.</h4>
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
