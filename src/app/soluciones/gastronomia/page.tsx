import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Soluciones para Restaurantes y Gastronomía — Mercenario IOS",
    description: "Tu restaurante no cocina platos. Coordina decenas de procesos simultáneos cada segundo. Descubre cómo una operación conectada transforma la gastronomía.",
};

const areas = [
    { name: "Reservas y Mesas", desc: "Control de disponibilidad en tiempo real sin conflictos." },
    { name: "Órdenes y Comandas", desc: "Del mesero a la cocina sin papel y sin errores." },
    { name: "Caja Integrada", desc: "Efectivo, tarjeta y delivery liquidados en un solo cierre." },
    { name: "Facturación SII", desc: "Boletas emitidas en el momento, sin pendientes acumulados." },
    { name: "Gestión de Proveedores", desc: "Control de insumos y alertas automáticas de reposición." },
    { name: "Reportes de Venta", desc: "Qué se vende, cuándo y cuánto deja de margen real." }
];

export default function SolucionesGastronomiaPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">GASTRONOMÍA</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                {/* HERO */}
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Restaurantes & Gastronomía</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Tu restaurante no cocina platos. <br />
                        <span className="text-neutral-400 font-semibold">Coordina decenas de decisiones simultáneas cada segundo.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Una mesa libre, un pedido en cocina, un mesero ocupado, un cliente esperando, una reserva que llega, un proveedor que no entregó. Todo al mismo tiempo. Todo dependiendo de personas.
                    </p>
                </section>

                {/* COMPRENDER LA OPERACIÓN */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo funciona realmente un restaurante.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La gente ve el salón, los platos y la decoración. Pero detrás hay una operación que empieza horas antes de abrir. Ingresan los insumos. Se prepara la mise en place. Se coordina al equipo. Se activan las reservas. Se configura la barra.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Y cuando el servicio comienza, el margen de error es cero. Un pedido equivocado vuelve a la cocina y destruye el ritmo. Una mesa sin atender transforma una buena noche en una mala reseña.
                    </p>
                    <p className="text-black font-semibold pt-2">La gastronomía no es arte solamente. Es logística de alta precisión en tiempo real.</p>
                </section>

                {/* EL CRECIMIENTO */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando la demanda supera la capacidad de coordinar.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Con un local pequeño y pocos cubiertos, el dueño puede controlarlo todo con la vista. Sabe qué mesa está esperando, qué insumo está por agotarse, cuánto llevamos vendido hoy.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Pero cuando crece la demanda —más mesas, un segundo turno, delivery, catering— ese control visual desaparece. Y si no hay un sistema que registre lo que el dueño ya no puede ver, la operación empieza a descontrolarse desde adentro.
                    </p>
                </section>

                {/* EL CAOS */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Dónde aparecen los quiebres.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-neutral-600 pt-4">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Comandas perdidas o duplicadas.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Insumos agotados a mitad de servicio.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Caja que no cuadra con el delivery.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Merma sin registro.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Boletas acumuladas para el final.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Reservas que se superponen.</div>
                    </div>
                    <p className="text-black font-semibold pt-4">Cada uno de esos quiebres tiene un costo real. En insumos, en reputación, en tiempo del equipo.</p>
                </section>

                {/* CÓMO OPERA UNA GRAN EMPRESA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo operan los restaurantes que escalan.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las cadenas de restaurantes exitosas no tienen mejores cocineros que la competencia. Tienen mejores sistemas. El mesero toma el pedido y llega directamente a la pantalla de cocina, sin papel de por medio. La comanda no puede perderse porque nunca estuvo en papel.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El sistema sabe cuántos cubiertos hay disponibles en tiempo real. Sabe qué insumos se han consumido durante el servicio. Sabe qué platos son los más rentables. El cierre de caja es automático y sin sorpresas.
                    </p>
                </section>

                {/* OPERACIÓN CONECTADA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando toda la operación trabaja junta.</h2>
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
                            "Cerrar el día sin buscar el error en la caja. Sin reconstruir qué se vendió. Sin llamar al proveedor porque no sabes qué quedó en bodega."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Eso es lo que ocurre cuando la operación de tu restaurante deja de depender de la memoria de las personas y empieza a funcionar como un sistema.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <h4 className="text-xl font-bold text-black max-w-xl">Conversemos sobre cómo opera tu restaurante hoy y cómo podría funcionar mañana.</h4>
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
