import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function AdministracionPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 18 // Administración</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        La administración también puede funcionar sola.<br />
                        <span className="text-neutral-400 font-semibold">Una empresa no debería detenerse para emitir una boleta. Debería seguir funcionando.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Cada venta genera una responsabilidad: registrar el pago, emitir el documento, actualizar la información, conciliar ingresos y guardar el respaldo. La mayoría de las empresas realiza estos pasos por separado, a veces horas o días después.
                    </p>
                </section>

                {/* Problem statement */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El problema no son las boletas.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Es todo lo que ocurre antes y después de ellas. Cada pequeño paso consume tiempo y genera fricción.
                    </p>
                </section>

                {/* Vertical timeline */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Flujo conectado</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                            Cada acción genera la siguiente.
                        </h2>
                    </div>
                    <div className="relative border-l border-neutral-200 ml-2 space-y-6 py-2">
                        {[
                            "El cliente paga.",
                            "La operación registra el movimiento.",
                            "Se prepara el documento correspondiente.",
                            "La información queda disponible para administración.",
                            "Los indicadores financieros se actualizan.",
                            "La empresa continúa funcionando."
                        ].map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <p className="text-sm font-semibold text-neutral-755 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Benefits grid */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold text-neutral-500">
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Menos errores</h3>
                            <p className="font-light leading-relaxed">Al no haber pasos manuales repetidos, disminuye la probabilidad de equivocaciones.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Menos retrabajo</h3>
                            <p className="font-light leading-relaxed">La información se actualiza una sola vez y se reutiliza en toda la empresa.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Información unificada</h3>
                            <p className="font-light leading-relaxed">Todos los departamentos trabajan con la misma vista de datos en tiempo real.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Datos en tiempo real</h3>
                            <p className="font-light leading-relaxed">Indicadores financieros y operativos se actualizan al instante.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Menos interrupciones</h3>
                            <p className="font-light leading-relaxed">Secretarias y contadores dejan de buscar documentos; la información ya está donde deben trabajar.</p>
                        </div>
                    </div>
                </section>

                {/* Brand axiom block */}
                <section className="py-20 border-t border-neutral-100 text-center">
                    <div className="max-w-2xl mx-auto bg-neutral-50 border border-neutral-100 p-12 rounded-3xl space-y-3">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-450 uppercase block">El Axioma de Mercenario</span>
                        <blockquote className="text-lg md:text-2xl font-bold text-black tracking-tight leading-snug">
                            "La tecnología organiza la operación.<br/>La comunicación construye la confianza."
                        </blockquote>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Descubre cómo Mercenario conecta administración, pagos y operación en un solo flujo.</h4>
                    </div>
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar integraciones administrativas</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>
        </div>
    );
}
