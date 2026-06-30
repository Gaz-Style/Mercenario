import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function QueEsUnCrmPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 10 // Conceptos</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        ¿Qué es un CRM?<br />
                        <span className="text-neutral-400 font-semibold">Tus clientes no deberían desaparecer después de una venta. Deberían convertirse en la siguiente oportunidad.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Toda empresa consigue clientes. Muy pocas empresas aprenden a construir relaciones con ellos. La diferencia entre ambas suele llamarse CRM (Customer Relationship Management), pero detrás de ese nombre existe una idea mucho más simple: conocer a tus clientes, recordar su historia y saber cuál debería ser el siguiente paso.
                    </p>
                </section>

                {/* Side-by-Side comparison */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Dos Filosofías de Relación</span>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">
                            Imagina dos formas de gestionar tu negocio.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Option A */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Vender y Olvidar</h3>
                            <ul className="text-xs text-neutral-500 space-y-2 font-medium">
                                <li>· Un cliente realiza su compra y recibe el servicio.</li>
                                <li>· El cliente desaparece de los registros activos.</li>
                                <li>· Nadie sabe cuándo debería regresar ni qué compró.</li>
                                <li>· Si vuelve meses después, la relación inicia desde cero.</li>
                            </ul>
                            <p className="text-xs text-mercenario-danger font-semibold pt-4">El esfuerzo de venta se repite en cada visita.</p>
                        </div>

                        {/* Option B */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Construir Relaciones</h3>
                            <ul className="text-xs text-neutral-500 space-y-2 font-medium">
                                <li>· El cliente agenda y se abre su bitácora histórica.</li>
                                <li>· La empresa conoce sus servicios pasados y quién lo atendió.</li>
                                <li>· Se registra qué productos prefiere y cuándo debe volver.</li>
                                <li>· La conversación nunca se detiene, simplemente continúa.</li>
                            </ul>
                            <p className="text-xs text-emerald-600 font-semibold pt-4">Menos clientes perdidos, más valor de vida.</p>
                        </div>
                    </div>
                    <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-2xl">
                        Conseguir un nuevo cliente siempre será más difícil que mantener uno existente. Por eso las empresas que crecen no solo venden: construyen relaciones.
                    </p>
                </section>

                {/* Section 4: Un CRM no guarda nombres, guarda historias */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Un CRM no guarda nombres. Guarda historias.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cada interacción se convierte en información útil: una llamada, una reserva, un pago, una consulta, un correo, una conversación por WhatsApp o una reseña. Todo ayuda a comprender mejor a esa persona.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Entonces ocurre algo interesante: la empresa deja de reaccionar y comienza a anticiparse. Antes de que un cliente desaparezca, recibe un recordatorio. Antes de olvidar una mantención, recibe una invitación. No porque alguien lo recordó, sino porque la operación fue diseñada para hacerlo.
                    </p>
                </section>

                {/* Use cases by industry */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Aplicación Real</span>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">
                            ¿Cómo se ve un CRM en tu industria?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold text-neutral-500">
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Clínicas</h3>
                            <p className="font-light leading-relaxed">Recuerda automáticamente controles pendientes, seguimientos de recetas, tratamientos a mediano plazo y encuestas médicas.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Centros Estéticos</h3>
                            <p className="font-light leading-relaxed">Controla la vigencia de sesiones, paquetes activos de tratamiento, productos recomendados para el hogar y recordatorios de renovación.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Servicios</h3>
                            <p className="font-light leading-relaxed">Gestiona el embudo de cotizaciones, estados de proyectos activos, alertas de cobranza y renovaciones de contratos anuales.</p>
                        </div>
                    </div>
                </section>

                {/* Section 6: En Mercenario */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El CRM en Mercenario
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No vive separado del resto de la empresa. Habla con la agenda, con el ERP, con el marketing, con WhatsApp, la facturación y la inteligencia artificial. Porque conocer un cliente no sirve de mucho si esa información no ayuda al resto de la operación a coordinar acciones inmediatas.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Una empresa que recuerda a sus clientes transmite confianza. Una empresa que entiende a sus clientes genera crecimiento.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Descubre cómo Mercenario convierte cada cliente en una relación de largo plazo.</h4>
                    </div>
                    <Link href="/operacion/centro-de-operaciones" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar Marketing y CRM</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
