import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Qué es la conciliación bancaria? — Centro de Conocimiento",
    description: "El banco dice una cosa. La empresa dice otra. La conciliación bancaria existe para que ambas hablen el mismo idioma.",
};

const chainProcess = [
    "Facturación.",
    "Reportes.",
    "Administración.",
    "Comisiones.",
    "Indicadores."
];

export default function QueEsConciliacionBancariaPage() {
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
                        El banco dice una cosa. <span className="text-neutral-400 font-semibold">La empresa dice otra.</span>
                    </h1>
                    <p className="text-black font-semibold text-lg leading-relaxed max-w-2xl">
                        La conciliación bancaria existe para que ambas hablen el mismo idioma.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Todos los días entra y sale dinero de una empresa. Un cliente paga. Se recibe una transferencia. Se cobra con tarjeta. Se paga a un proveedor. Se realiza una devolución.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cada movimiento queda registrado en el banco. Pero no siempre queda registrado de la misma forma dentro de la empresa.
                    </p>
                    <p className="text-black font-semibold pt-2">
                        Y ahí comienza el problema.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">¿Qué es la conciliación bancaria?</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Es el proceso de comparar los movimientos del banco con los registros internos de la empresa. Su objetivo es confirmar que ambos cuentan exactamente la misma historia.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-neutral-600 pt-4">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Cada pago existe.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Cada gasto fue registrado.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">No hay diferencias.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Información confiable.</div>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El problema aparece cuando todo se hace manualmente.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Muchas empresas descargan una cartola bancaria. Luego abren una planilla. Después revisan:
                    </p>
                    <ul className="space-y-4 pt-2 border-l border-neutral-200 ml-1 pl-6">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" /><p className="text-sm font-medium text-neutral-600">Factura por factura.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" /><p className="text-sm font-medium text-neutral-600">Transferencia por transferencia.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" /><p className="text-sm font-medium text-neutral-600">Pago por pago.</p></li>
                    </ul>
                    <p className="text-black font-semibold pt-4">
                        Horas de trabajo dedicadas únicamente a responder una pregunta: <strong>¿Cuadra todo?</strong>
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando no cuadra... <span className="text-neutral-400 font-semibold">Comienza la investigación.</span></h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium pt-2">
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-neutral-600">¿Quién realizó ese pago?</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-neutral-600">¿A qué factura corresponde?</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-neutral-600">¿Fue una transferencia parcial?</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-neutral-600">¿Entró el dinero?</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-neutral-600">¿Se registró dos veces?</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-neutral-600">¿Falta un documento?</p></div>
                    </div>
                    <p className="text-black font-semibold pt-4">Una diferencia de pocos pesos puede transformarse en una mañana completa de trabajo.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La conciliación no sirve solo para encontrar errores. <span className="text-neutral-400 font-semibold">Sirve para confiar en la información.</span></h2>
                    <ul className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">Los reportes son confiables.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">La caja refleja la realidad.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">La contabilidad trabaja con tranquilidad.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">El dueño puede tomar decisiones con seguridad.</p></li>
                    </ul>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una empresa conectada trabaja diferente.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando un cliente paga... La operación registra el movimiento. Cuando el banco confirma la transacción... La información se actualiza automáticamente.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">Documentos actualizados.</span>
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">Administración notificada.</span>
                        <span className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">Reportes en tiempo real.</span>
                    </div>
                    <p className="text-black font-semibold pt-4">No hace falta reconstruir la historia al final del día. La empresa ya la fue escribiendo mientras trabajaba.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Conciliar también significa ahorrar tiempo.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No porque desaparezca el control. Sino porque las personas dejan de buscar información que el sistema ya conoce.
                    </p>
                    <p className="text-black font-semibold">El tiempo se utiliza para analizar. No para copiar datos.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Reacción Operativa</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La conciliación forma parte de una operación mayor.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No termina cuando el banco confirma un movimiento. A partir de ahí continúan otros procesos:
                    </p>
                    <div className="space-y-0 mt-4">
                        {chainProcess.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-start">
                                <div className="flex items-center gap-4 py-4 w-full">
                                    <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                                    <p className="text-sm font-semibold text-black leading-relaxed">{step}</p>
                                </div>
                                {idx < chainProcess.length - 1 && (
                                    <div className="ml-[3px] text-neutral-300 text-xs font-mono pl-0.5 pb-1 select-none">↓</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-black font-semibold pt-4">Cada área depende de esa misma información.</p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">La Filosofía</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "En Mercenario... la conciliación bancaria no es una tarea aislada. Forma parte de una operación conectada."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Los pagos. La caja. La administración. La facturación. Los reportes. Todo comparte la misma información. Porque cuando cada movimiento encuentra automáticamente su lugar... la empresa deja de perseguir números. Y comienza a confiar en ellos.
                        </p>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">Conclusión</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La conciliación bancaria no existe para revisar el pasado. Existe para que cada decisión que tomes mañana se base en información correcta.
                    </p>
                    <p className="text-black font-semibold pt-2">
                        Y cuando una empresa puede confiar en sus propios datos... También puede crecer con mucha más tranquilidad.
                    </p>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo mantener sincronizados tus pagos, tu banco y toda tu empresa.</h4>
                    </div>
                    <Link href="/operacion/administracion" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar Administración</span>
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
