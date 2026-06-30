import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function ComoSeSolucionaPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 03 // La Solución</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        No se trata de agregar más herramientas.<br />
                        <span className="text-neutral-400 font-semibold">Se trata de hacer que las que ya tienes comiencen a trabajar juntas.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Cuando una empresa se siente desordenada, la primera reacción suele ser buscar una nueva solución. Un mejor sistema de agenda. Un mejor software de cobros. Un mejor CRM. Un mejor ERP.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Pero el problema no está en cada herramienta por separado. Está en el espacio entre ellas.
                    </p>
                </section>

                {/* Section 2: La solución no es reemplazar */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        La solución no es reemplazar. Es conectar.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Conectar significa que la información deja de depender de personas para moverse. Y comienza a fluir de forma automática entre cada parte de la empresa.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Un cliente deja de ser un dato aislado. Se convierte en una historia continua, desde el momento en que agenda, hasta el momento en que vuelve.
                    </p>
                </section>

                {/* Section 3: Todo comienza en un solo punto */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">El Punto de Partida</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                            Todo comienza en un solo punto.
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                        {["Una reserva.", "Un pago.", "Una consulta.", "Una compra.", "Una acción del cliente."].map((action, idx) => (
                            <div key={idx} className="bg-neutral-50 border border-neutral-100 p-4 rounded-xl flex items-center justify-center min-h-[80px]">
                                <p className="text-[11px] font-bold text-neutral-700 leading-tight">{action}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-lg font-bold text-black tracking-tight leading-snug">
                        Y a partir de ahí, la empresa reacciona sola.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Sin copiar información. Sin reenviar mensajes. Sin registrar lo mismo dos veces. Sin depender de recordatorios manuales.
                    </p>
                </section>

                {/* Visual Flow diagram */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">En la Práctica</span>
                        <h3 className="text-xl md:text-2xl font-bold text-black">Así es una operación conectada.</h3>
                    </div>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-10 py-2">
                        {[
                            "Un cliente agenda una hora.",
                            "El sistema registra la información una sola vez.",
                            "El profesional recibe la notificación automáticamente.",
                            "El cliente recibe confirmación inmediata.",
                            "Se prepara la atención.",
                            "Se registra el resultado de la visita.",
                            "Se actualiza el estado del cliente.",
                            "Se activa el seguimiento.",
                            "Se genera el cobro o la boleta.",
                            "Se actualizan los reportes del negocio.",
                            "Se abre la posibilidad de una nueva visita."
                        ].map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <p className="text-sm font-semibold text-neutral-750 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-center text-xs font-semibold text-neutral-500">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Nada se pierde.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Nada se repite.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Nada depende de la memoria.</div>
                    </div>
                </section>

                {/* Section 4: Lo más importante no es la tecnología */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Lo más importante no es la tecnología. Es el orden.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando la información fluye correctamente, las tareas manuales desaparecen sin eliminar personas. Los errores disminuyen, el tiempo se libera y las decisiones se vuelven más claras.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        El negocio se vuelve más predecible. Una empresa conectada no trabaja más: trabaja mejor. No necesita más esfuerzo para crecer, necesita menos fricción para operar.
                    </p>
                </section>

                {/* Section 5: Qué pasa con las herramientas actuales */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        ¿Y qué pasa con las herramientas actuales?
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No desaparecen. Siguen siendo útiles. Siguen haciendo su trabajo. Pero dejan de funcionar aisladas. Comienzan a formar parte de un sistema mayor.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Es como pasar de piezas sueltas a un solo mecanismo: cada parte sigue existiendo, pero ahora responde al mismo movimiento.
                    </p>
                </section>

                {/* Section 6: El resultado */}
                <section className="py-20 border-t border-neutral-100 space-y-6 max-w-3xl">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El resultado
                    </h2>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed">
                        La empresa deja de ser una colección de tareas. Y se convierte en un flujo continuo de operaciones.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Ver cómo se ve una empresa conectada en la vida real.</h4>
                    </div>
                    <Link href="/experiencia/vive-la-experiencia" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar ejemplo</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
