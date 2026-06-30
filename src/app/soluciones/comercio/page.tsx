import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Soluciones para Comercio y Retail — Mercenario IOS",
    description: "Tu negocio ya trabaja como una gran empresa. Descubre cómo conectar tu inventario, ventas y caja en una sola operación.",
};

const areas = [
    { name: "Punto de Venta (POS)", desc: "Ventas rápidas, integradas con medios de pago." },
    { name: "Inventario Sincronizado", desc: "Si se vende, se descuenta. Sin quiebres de stock." },
    { name: "Caja Centralizada", desc: "El efectivo, las tarjetas y las transferencias cuadran." },
    { name: "Facturación Automática", desc: "Boletas al SII sin doble digitación." },
    { name: "Fidelización", desc: "CRM para que el cliente vuelva a comprar." },
    { name: "Reportes en Tiempo Real", desc: "Toma decisiones basadas en datos concretos." }
];

export default function SolucionesComercioPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">COMERCIO</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                {/* HERO */}
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Comercio & Retail</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Tu negocio ya trabaja como una gran empresa. <br />
                        <span className="text-neutral-400 font-semibold">Solo que todavía no lo sabe.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Tu negocio no vende productos. Administra cientos de pequeñas decisiones cada día.
                    </p>
                </section>

                {/* EL PROBLEMA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo opera realmente el comercio.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Muchas personas creen que tener una tienda es simplemente abrir la puerta y esperar a que los clientes entren. 
                        Pero la realidad es muy distinta. Es coordinar proveedores, ingresar mercadería, etiquetar, exhibir, atender, cobrar, 
                        emitir la boleta y cuadrar la caja al final del día.
                    </p>
                    <p className="text-black font-semibold pt-2">Cada uno de esos pasos es crítico. Si uno falla, el negocio completo sufre.</p>
                </section>

                {/* EL CRECIMIENTO */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando el volumen aumenta.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando las cosas van bien, entran más clientes. Eso significa más mercadería rotando, más comprobantes de pago 
                        acumulándose y la necesidad de contratar más personal para atender la demanda.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Lo que antes podías controlar mirando la bodega, ahora requiere registro. Lo que antes cuadrabas en cinco minutos, 
                        ahora te toma horas. Todo se multiplica.
                    </p>
                </section>

                {/* EL CAOS */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Dónde comienzan los errores.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-neutral-600 pt-4">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Quiebres de stock.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Descuadres de caja.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Ventas sin boleta.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Pérdida de mercadería.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Precios desactualizados.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Proveedores impagos.</div>
                    </div>
                    <p className="text-black font-semibold pt-4">
                        El dueño termina corriendo de un lado a otro apagando incendios, en lugar de hacer crecer el negocio.
                    </p>
                </section>

                {/* LA EMPRESA QUE EL DUEÑO QUIERE TENER */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La experiencia de ser dueño.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No abriste tu negocio para ser esclavo de una planilla Excel o para estar atrapado en el local de lunes a domingo.
                        Quieres mirar los números y saber que son reales. Quieres tener la tranquilidad de que el inventario está bajo control 
                        y que las ventas se registran correctamente.
                    </p>
                    <p className="text-black font-semibold pt-2">Quieres irte a casa sabiendo que el negocio funciona, incluso si tú no estás ahí.</p>
                </section>

                {/* CÓMO TRABAJA UNA GRAN EMPRESA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Las grandes empresas no improvisan.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Tienen sistemas conectados. Cuando un producto pasa por la caja, el inventario se descuenta automáticamente. 
                        El dinero ingresa al registro. El SII recibe la boleta electrónica al instante. Y el contador ya tiene la información para fin de mes.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Nadie anota en un cuaderno. Nadie digita la venta dos veces. La información fluye de manera natural.
                    </p>
                </section>

                {/* CÓMO CONECTAR TODA LA OPERACIÓN */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Tu empresa como una sola unidad conectada.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed mb-8">
                        Para lograr esa fluidez, necesitas que todas las partes de tu negocio se hablen entre sí.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        {areas.map((area, idx) => (
                            <div key={idx} className="p-6 border border-neutral-100 rounded-2xl bg-white hover:border-black transition-colors group">
                                <h4 className="text-sm font-bold text-black group-hover:text-black">{area.name}</h4>
                                <p className="text-xs text-neutral-500 mt-2 font-medium">{area.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* RESULTADO */}
                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">Tranquilidad Operativa</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "No más inventarios sorpresa. No más cierres de caja a medianoche cuadrando boletas perdidas."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Cuando conectas toda la operación de tu comercio, dejas de perseguir los problemas y comienzas a enfocarte en crecer. Tu negocio, pero operando al nivel de los más grandes.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Hagamos que tu comercio funcione sin problemas.</h4>
                    </div>
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
