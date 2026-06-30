import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sistema para Agencias y Empresas de Tecnología — Mercenario IOS",
    description: "Tu agencia no vende proyectos. Administra talento, plazos, clientes y entregas al mismo tiempo. Descubre cómo una operación conectada transforma las empresas TI.",
};

const areas = [
    { name: "Pipeline de Proyectos", desc: "Visibilidad de cada oportunidad desde la propuesta hasta el cierre." },
    { name: "Gestión de Equipo", desc: "Capacidad disponible, asignaciones y carga de trabajo en tiempo real." },
    { name: "Facturación por Hito", desc: "Cobros vinculados a entregables reales, no a calendarios arbitrarios." },
    { name: "CRM de Cuentas", desc: "Historial completo de cada cliente con contexto disponible siempre." },
    { name: "Control de Rentabilidad", desc: "Costo real de cada proyecto frente al precio que se cobró." },
    { name: "Automatizaciones de Entrega", desc: "Notificaciones, reportes y seguimiento que ocurren solos." }
];

export default function SolucionesTecnologiaPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">TECNOLOGÍA</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                {/* HERO */}
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Agencias & Software Factories</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Tu agencia no vende proyectos. <br />
                        <span className="text-neutral-400 font-semibold">Administra talento que no puede detenerse.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Hay un cliente esperando un entregable. Hay un desarrollador que termina un sprint y debe empezar otro. Hay una propuesta que vence mañana y una factura de hace dos meses que todavía no llegó. Todo al mismo tiempo, todos los días.
                    </p>
                </section>

                {/* COMPRENDER LA OPERACIÓN */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo opera realmente una empresa de tecnología.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Una agencia o software factory opera con una presión que pocas industrias entienden: el producto que vende es intangible, el cliente muchas veces no entiende el proceso y el principal activo —el tiempo de las personas— no se puede recuperar una vez perdido.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cada proyecto necesita estimación, asignación de equipo, entregas parciales, revisiones del cliente, ajustes, validación y cierre formal. Y mientras uno avanza, el equipo ya debe estar pensando en el siguiente. La capacidad de coordinar todo eso sin perder calidad ni margen es lo que define si una agencia crece o se estanca.
                    </p>
                    <p className="text-black font-semibold pt-2">La industria que más sabe de sistemas es muchas veces la que peor gestiona su propia operación interna.</p>
                </section>

                {/* EL CRECIMIENTO */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando el equipo crece pero el margen no mejora.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Es una paradoja frecuente en las agencias: consiguen más proyectos, contratan más personas, facturan más. Pero el margen se mantiene igual o baja. El motivo casi siempre es el mismo: el costo real de cada proyecto nunca se midió bien.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las horas extras que nadie registra, los cambios de scope que no se cobran, los proyectos que se extienden más allá de lo estimado sin una conversación formal con el cliente. Cada uno de esos puntos erosiona el margen en silencio.
                    </p>
                </section>

                {/* EL CAOS */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Dónde se pierde el margen.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-neutral-600 pt-4">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Proyectos sin presupuesto definido.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Horas sin registrar.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Cambios de scope no cobrados.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Equipo sobreasignado.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Facturas emitidas tarde.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Clientes sin contexto al retomar.</div>
                    </div>
                    <p className="text-black font-semibold pt-4">Cada hora perdida en coordinación interna es una hora que no se cobró ni se usó para crecer.</p>
                </section>

                {/* CÓMO OPERA UNA GRAN AGENCIA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo operan las agencias que escalan con rentabilidad.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las agencias que logran crecer de manera sostenida tienen visibilidad sobre dos cosas que las demás no controlan: la capacidad real de su equipo y el costo real de cada proyecto.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Saben antes de aceptar un nuevo proyecto si hay equipo disponible para asumirlo bien. Saben cuántas horas se han consumido en cada entrega y si el margen todavía está en rango. Y cuando un cliente pide un cambio, tienen la información para tomar una decisión rápida: se cobra o se absorbe, pero siempre es una decisión consciente.
                    </p>
                </section>

                {/* OPERACIÓN CONECTADA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando la operación interna es tan buena como el producto que entrega.</h2>
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
                            "Entrar el lunes sabiendo exactamente qué proyectos están en riesgo, qué equipo tiene capacidad y qué facturas están pendientes de emitir."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Esa visibilidad convierte la incertidumbre en decisiones. Y las decisiones en crecimiento que no depende de trabajar más horas. Depende de operar mejor.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <h4 className="text-xl font-bold text-black max-w-xl">Conversemos sobre cómo opera tu agencia hoy y cuánto margen podrías recuperar.</h4>
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
