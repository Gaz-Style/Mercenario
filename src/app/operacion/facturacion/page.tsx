import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Facturación — Mercenario IOS",
    description: "Una factura no debería ser el final de una venta. Debería ser el comienzo de una empresa mejor organizada.",
};

const chain = [
    "Una cotización.",
    "Una aceptación.",
    "Un pago.",
    "Una atención.",
    "Un documento tributario.",
    "Un registro financiero.",
    "Un reporte."
];

export default function FacturacionPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
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

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capacidad · Facturación</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Una factura no debería ser el final de una venta. <span className="text-neutral-400 font-semibold">Debería ser el comienzo de una empresa mejor organizada.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Cuando pensamos en facturación solemos imaginar un documento. Una boleta. Una factura. Un archivo PDF. Pero esos documentos solo representan una parte de la historia.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Lo realmente importante es todo lo que ocurre cuando una venta queda registrada correctamente.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una empresa vive de la información que genera.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">Cada documento confirma que algo ocurrió:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-neutral-600">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Un cliente compró.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Un servicio fue realizado.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Un producto fue entregado.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Un pago fue recibido.</div>
                    </div>
                    <p className="text-black font-semibold pt-4">La empresa necesita recordar todo eso. No para cumplir una obligación. Para poder seguir creciendo.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El problema no es emitir documentos. <span className="text-neutral-400 font-semibold">Es tener que reconstruir la historia al final del día.</span></h2>
                    <ul className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        {["¿Cuántas ventas hicimos?", "¿Cuáles fueron pagadas?", "¿Cuáles siguen pendientes?", "¿Qué cliente compró qué servicio?", "¿Cuánto debemos declarar?", "¿Cuánto ingresó realmente?"].map((q, i) => (
                            <li key={i} className="relative">
                                <div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" />
                                <p className="text-sm font-medium text-neutral-600">{q}</p>
                            </li>
                        ))}
                    </ul>
                    <p className="text-neutral-500 font-light pt-4">Cuando esa información vive repartida entre distintas plataformas, la empresa pierde tiempo buscando respuestas que ya debería conocer.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una operación conectada registra la historia mientras ocurre.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cada venta genera automáticamente la información necesaria para continuar el proceso. Los documentos se preparan cuando corresponde. La administración recibe la información. Los indicadores se actualizan. La contabilidad trabaja con datos consistentes.
                    </p>
                    <p className="text-black font-semibold text-lg">No hace falta reconstruir el pasado. La empresa ya lo registró mientras trabajaba.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Cadena Completa</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una factura nunca viaja sola.</h2>
                    
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
                    <p className="text-black font-semibold pt-4">Todo forma parte de la misma historia.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cada empresa tiene necesidades distintas.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Algunas emiten cientos de documentos cada día. Otras solo algunos al mes. Algunas trabajan con boletas. Otras con facturas. Otras combinan distintos tipos de documentos.
                    </p>
                    <p className="text-black font-semibold">La tecnología debe adaptarse a esa realidad. No obligar a cambiar la forma de trabajar.</p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">El Valor Real</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Porque una empresa organizada no emite documentos. Construye información."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Y esa información es la que permite crecer con seguridad.
                        </p>
                    </div>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo una operación conectada transforma la facturación en una fuente de información.</h4>
                    </div>
                    <Link href="/operacion/administracion" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar la operación administrativa</span>
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
