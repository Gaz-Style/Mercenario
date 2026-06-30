import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sistema para Gimnasios y Centros Deportivos — Mercenario IOS",
    description: "Tu gimnasio no vende membresías. Administra personas, horarios, instructores y resultados al mismo tiempo. Descubre cómo una operación conectada transforma tu centro.",
};

const areas = [
    { name: "Membresías y Acceso", desc: "Control de vigencia automático. Sin excepciones manuales." },
    { name: "Agenda de Clases", desc: "Cupos, horarios e instructores sincronizados en tiempo real." },
    { name: "Cobranza Recurrente", desc: "El cobro mensual ocurre solo. Sin perseguir a nadie." },
    { name: "CRM de Socios", desc: "Asistencia, renovaciones y alertas de abandono anticipadas." },
    { name: "Facturación Automática", desc: "Cada pago genera su boleta sin intervención del equipo." },
    { name: "Reportes de Retención", desc: "Quién está en riesgo de irse antes de que se vaya." }
];

export default function SolucionesGimnasiosPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">GIMNASIOS</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                {/* HERO */}
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Gimnasios & Centros Deportivos</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Tu gimnasio no vende membresías. <br />
                        <span className="text-neutral-400 font-semibold">Administra la continuidad de cientos de personas.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Cada socio tiene una fecha de vencimiento, una rutina, un instructor favorito y un momento en que decide si sigue o se va. Todo eso ocurre al mismo tiempo, todos los días.
                    </p>
                </section>

                {/* COMPRENDER LA OPERACIÓN */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo funciona realmente un gimnasio.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Un gimnasio no es un local con máquinas. Es una operación de retención. El ingreso depende de que cada socio renueve mes a mes, semana a semana, año a año. Y esa renovación no es automática. Depende de que el socio se sienta atendido, motivado y parte de algo.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Al mismo tiempo, el equipo debe coordinar clases, controlar aforo, gestionar instructores, cobrar cuotas, emitir comprobantes, responder consultas y mantener el acceso operativo. Todo sin que el dueño tenga que estar presente en cada detalle.
                    </p>
                    <p className="text-black font-semibold pt-2">El mayor activo de un gimnasio no son las máquinas. Es la relación con cada socio.</p>
                </section>

                {/* EL CRECIMIENTO */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando la cantidad de socios supera la capacidad de seguimiento.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Con 50 socios, el dueño sabe quién viene, quién no ha venido en dos semanas y quién está por vencer. Esa visibilidad directa es suficiente.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Con 300, 500 o 1.000 socios, esa visibilidad desaparece. Alguien deja de venir y nadie lo nota hasta que cancela. Un cobro no se procesa y nadie lo detecta hasta el cierre del mes. Una clase se llena pero los cupos siguen apareciendo disponibles porque el sistema no se actualizó.
                    </p>
                </section>

                {/* EL CAOS */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Dónde se escapa el dinero y la energía.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-neutral-600 pt-4">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Membresías vencidas sin cobrar.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Socios que se van sin aviso.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Clases llenas con cupos sin control.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Acceso sin verificar vigencia.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Instructores sin agenda clara.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Caja que no cuadra con socios activos.</div>
                    </div>
                    <p className="text-black font-semibold pt-4">Cada socio que se va sin que nadie lo note representa ingresos perdidos que nunca aparecen en ningún reporte.</p>
                </section>

                {/* CÓMO OPERA UN GRAN GIMNASIO */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo operan los centros que retienen y escalan.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Los centros deportivos que logran crecer de manera sostenida no tienen más suerte ni mejores instructores que los demás. Tienen sistemas que les avisan antes de que ocurra el problema. Saben qué socios están en riesgo de cancelar antes de que cancelen. Cobran automáticamente sin necesidad de perseguir a nadie.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El acceso al recinto verifica la membresía en el momento. La clase se cierra cuando se llena. El instructor sabe exactamente a quiénes espera ese día. Y el dueño ve en tiempo real cuántos socios activos tiene, cuánto ingresa este mes y cuánto podría escapar el próximo.
                    </p>
                </section>

                {/* OPERACIÓN CONECTADA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando toda la operación trabaja por la retención.</h2>
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
                            "Saber cada mañana cuántos socios activos tienes, cuánto ingresa este mes y cuál es el riesgo de fuga del próximo. Sin hacer cuentas manualmente."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Esa visibilidad transforma la gestión de un gimnasio. Deja de ser reactiva y se convierte en algo que se puede planificar, predecir y sostener en el tiempo.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <h4 className="text-xl font-bold text-black max-w-xl">Conversemos sobre cómo opera tu centro y cuánto podrías retener.</h4>
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
