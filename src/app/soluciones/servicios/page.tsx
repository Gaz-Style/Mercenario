import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sistema para Empresas de Servicios — Mercenario IOS",
    description: "Tu empresa de servicios no vende horas. Administra compromisos, equipos, proyectos y la confianza de cada cliente. Descubre cómo conectar toda la operación.",
};

const areas = [
    { name: "Gestión de Proyectos", desc: "Seguimiento de cada trabajo desde la cotización hasta el cierre." },
    { name: "Agenda de Atenciones", desc: "Asignación de técnicos o profesionales sin conflictos." },
    { name: "Facturación por Servicio", desc: "Cada trabajo cerrado genera su documento automáticamente." },
    { name: "CRM de Clientes", desc: "Historial completo de cada empresa o persona que atienes." },
    { name: "Control de Costos", desc: "Cuánto cuesta cada proyecto en tiempo real." },
    { name: "Reportes de Rentabilidad", desc: "Qué servicios dejan margen real y cuáles no." }
];

export default function SolucionesServiciosPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">SERVICIOS</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                {/* HERO */}
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Empresas de Servicios</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Tu empresa no vende horas. <br />
                        <span className="text-neutral-400 font-semibold">Administra compromisos que no pueden fallar.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Cada cliente que te contrata está confiando en que vas a aparecer, que el trabajo quedará bien y que la promesa que hiciste se va a cumplir. Esa cadena de confianza es tu negocio.
                    </p>
                </section>

                {/* COMPRENDER LA OPERACIÓN */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo opera realmente una empresa de servicios.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La operación comienza antes de que empiece el trabajo. Hay que entender lo que el cliente necesita, cotizar correctamente, conseguir los materiales o insumos, asignar al equipo disponible, confirmar la fecha y coordinar la logística.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Durante la ejecución, el servicio debe avanzar según lo acordado. Y al terminar, hay que documentar el trabajo, emitir el cobro, hacer seguimiento del pago y dejar al cliente en condiciones de volver a contratar.
                    </p>
                    <p className="text-black font-semibold pt-2">En servicios, el proceso no termina cuando termina el trabajo. Termina cuando el cliente queda listo para la próxima vez.</p>
                </section>

                {/* EL CRECIMIENTO */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando los trabajos se multiplican y la coordinación se fragmenta.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Con pocos clientes, el dueño puede llevar el seguimiento en su cabeza o en un cuaderno. Sabe qué trabajos están pendientes, qué facturas están por cobrar y qué miembro del equipo está disponible.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Pero cuando los trabajos se multiplican, ese control se fragmenta. Alguien llega a una dirección equivocada. Un trabajo cierra pero la factura nunca se emite. Un cliente pregunta por el estado de su solicitud y nadie sabe bien en qué está. Los problemas no aparecen por falta de talento. Aparecen por falta de información compartida.
                    </p>
                </section>

                {/* EL CAOS */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Dónde se pierde la eficiencia.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-neutral-600 pt-4">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Cotizaciones sin seguimiento.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Trabajos sin cerrar formalmente.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Facturas que nadie cobró.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Equipo mal asignado.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Clientes sin historial.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Costos que superan lo cotizado.</div>
                    </div>
                    <p className="text-black font-semibold pt-4">El tiempo que se pierde en coordinar es tiempo que no se usa en atender o en crecer.</p>
                </section>

                {/* CÓMO OPERA UNA EMPRESA GRANDE */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo operan las empresas de servicios que escalan sin perder el control.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las empresas de servicios que logran crecer sin que la calidad caiga comparten una característica: la información no vive en la cabeza del dueño. Vive en el sistema. Cualquier miembro del equipo puede ver qué trabajo hay pendiente, en qué estado está y qué falta para cerrarlo.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El cliente puede preguntar el estado de su servicio y recibir una respuesta en segundos, sin que nadie tenga que llamar a otro para averiguarlo. Los costos se registran en tiempo real y el margen de cada trabajo es visible antes de que sea demasiado tarde para ajustar.
                    </p>
                </section>

                {/* OPERACIÓN CONECTADA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando cada área de la empresa habla el mismo idioma.</h2>
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
                            "Saber exactamente cuántos trabajos hay en curso, cuánto está por cobrar y cuánto está costando. Sin llamadas internas ni planillas desactualizadas."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Esa claridad es lo que separa una empresa de servicios que sobrevive de una que crece. No es el talento. Es la operación que lo sostiene.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <h4 className="text-xl font-bold text-black max-w-xl">Conversemos sobre cómo funciona tu empresa hoy y cómo podría funcionar mañana.</h4>
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
