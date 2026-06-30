import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function InformacionPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 06 // El Flujo</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        Tu empresa ya genera toda la información que necesitas.<br />
                        <span className="text-neutral-400 font-semibold">El problema es que vive repartida en distintos lugares.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Cada día tu empresa produce información. Clientes nuevos. Pagos. Agendamientos. Boletas. Correos. Mensajes. Documentos. Reportes.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        El problema no es obtener esa información. El problema es que nunca llega al lugar donde realmente se necesita.
                    </p>
                </section>

                {/* Section 2: Imagina la situación */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Ejemplo Cotidiano</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Imagina la siguiente situación.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Un paciente agenda una consulta. La secretaria lo sabe. Pero administración todavía no. El profesional aún no recibe la información. El área financiera todavía no registra un posible ingreso. Marketing tampoco sabe que acaba de llegar un nuevo cliente.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Cada área comienza a enterarse en momentos distintos. Y muchas veces gracias a una persona. No gracias al sistema.
                    </p>
                </section>

                {/* Section 3: Una empresa conectada piensa diferente */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Una empresa conectada piensa diferente.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La información se registra una sola vez. Y desde ese momento comienza a viajar. No vuelve a escribirse. No vuelve a copiarse. No vuelve a preguntarse.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Simplemente llega donde debe llegar. En el momento correcto.
                    </p>
                </section>

                {/* Visual Branching Section */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Un Solo Dato, Múltiples Acciones</span>
                        <h3 className="text-xl md:text-2xl font-bold text-black">Cuando un cliente agenda...</h3>
                    </div>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-8 py-2">
                        {[
                            { title: "La agenda cambia", desc: "El calendario se actualiza de forma global." },
                            { title: "El profesional recibe la información", desc: "El especialista ya cuenta con el bloque reservado." },
                            { title: "Se crea la ficha", desc: "Historial y registro listos para el ingreso." },
                            { title: "Se prepara el pago", desc: "Se habilita el cobro electrónico coordinado." },
                            { title: "Se genera la boleta", desc: "SII notificado de la transacción de forma autónoma." },
                            { title: "Se actualiza la caja", desc: "El flujo financiero cuadra el movimiento contable." },
                            { title: "La administración recibe el movimiento", desc: "Auditoría en tiempo real para control de gestión." },
                            { title: "Marketing registra un nuevo cliente", desc: "Bitácora comercial actualizada." },
                            { title: "Comienza el seguimiento", desc: "Planificación de fidelización en curso." }
                        ].map((item, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <h4 className="text-sm font-bold text-black tracking-tight">{item.title}</h4>
                                <p className="text-xs text-neutral-500 font-light mt-1 max-w-lg">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-base text-neutral-500 font-light leading-relaxed">
                        Todo ocurre porque existe una única fuente de información. Así funcionan las grandes organizaciones: no porque tengan más personas, sino porque toda la empresa trabaja sobre la misma información.
                    </p>
                </section>

                {/* Fragmented Duplication representation */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Fragmentación</span>
                        <h3 className="text-xl md:text-2xl font-bold text-black">¿Qué ocurre en la mayoría de las pequeñas empresas?</h3>
                    </div>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La misma información termina escrita varias veces de forma manual.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center text-xs font-semibold text-neutral-500">
                        <div className="p-4 border border-neutral-200 rounded bg-white">En una agenda</div>
                        <div className="p-4 border border-neutral-200 rounded bg-white">En WhatsApp</div>
                        <div className="p-4 border border-neutral-200 rounded bg-white">En una planilla</div>
                        <div className="p-4 border border-neutral-200 rounded bg-white">En el correo</div>
                        <div className="p-4 border border-neutral-200 rounded bg-white">Sistema contable</div>
                        <div className="p-4 border border-neutral-200 rounded bg-white">En una libreta</div>
                    </div>
                    <p className="text-xs text-mercenario-danger font-medium pt-2">
                        Cada copia aumenta la posibilidad de cometer un error.
                    </p>
                </section>

                {/* Section 6: Resultados de conectar */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Cuando la información se conecta...
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Desaparecen los dobles registros. Disminuyen los errores. La empresa responde más rápido, y las decisiones comienzan a basarse en datos reales. No en suposiciones.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Esto es lo que realmente hacemos: no conectamos programas, conectamos la información que hace funcionar tu empresa.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Descubre qué herramientas pueden formar parte de una operación conectada.</h4>
                    </div>
                    <Link href="/integraciones/no-necesitas-comenzar-de-cero" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar integraciones</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
