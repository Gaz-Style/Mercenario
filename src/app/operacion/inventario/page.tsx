import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inventario — Mercenario IOS",
    description: "El inventario no consiste en saber qué tienes. Consiste en saber con qué puedes cumplir lo que prometes.",
};

export default function InventarioPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
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

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capacidad · Inventario</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        El inventario no consiste en saber qué tienes. <span className="text-neutral-400 font-semibold">Consiste en saber con qué puedes cumplir lo que prometes.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Cada producto. Cada insumo. Cada medicamento. Cada herramienta. Cada repuesto. Cada material.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Representa una promesa. La promesa de que, cuando un cliente llegue, tu empresa estará preparada para responder.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El problema no aparece cuando falta un producto. <span className="text-neutral-400 font-semibold">Aparece mucho antes.</span></h2>
                    <ul className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" /><p className="text-sm font-medium text-neutral-600">Cuando nadie sabe cuánto queda.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" /><p className="text-sm font-medium text-neutral-600">Cuando dos personas creen tener la misma información.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" /><p className="text-sm font-medium text-neutral-600">Cuando las compras se hacen por intuición.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" /><p className="text-sm font-medium text-neutral-600">Cuando un cliente descubre el problema antes que la empresa.</p></li>
                    </ul>
                    <p className="text-black font-semibold pt-4">En ese momento el inventario deja de ser una tarea administrativa. Se convierte en un problema para la experiencia del cliente.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Un buen inventario evita decisiones de último minuto.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-4 text-xs font-semibold text-neutral-600 text-center">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Qué tiene.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Qué está por terminar.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Qué reponer.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Qué rota rápido.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Qué está inmovilizado.</div>
                    </div>
                    <p className="text-neutral-500 font-light pt-4">No porque alguien revisó una bodega. Porque la operación siempre está actualizada.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cada movimiento cuenta una historia.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Un producto ingresó. Otro fue vendido. Un insumo se utilizó durante una atención. Un medicamento fue administrado. Una herramienta quedó asignada a un trabajo.
                    </p>
                    <p className="text-black font-semibold text-lg">Nada desaparece. Todo deja un registro.</p>
                    <p className="text-neutral-500 font-light leading-relaxed pt-2">
                        Y ese registro permite comprender cómo funciona realmente la empresa.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El inventario también protege la rentabilidad.</h2>
                    <div className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <div className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm text-neutral-600">Comprar de más inmoviliza recursos.</p></div>
                        <div className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm text-neutral-600">Comprar de menos detiene la operación.</p></div>
                        <div className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm text-neutral-600">Perder productos genera costos invisibles.</p></div>
                        <div className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm text-neutral-600">No registrar consumos distorsiona toda la información.</p></div>
                    </div>
                    <p className="text-black font-semibold pt-4">Cuando el inventario está conectado con la operación... La empresa compra mejor. Utiliza mejor. Y desperdicia menos.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Esencia</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cada industria administra recursos distintos.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: "Clínica", action: "insumos médicos" },
                            { name: "Centro estético", action: "productos" },
                            { name: "Taller", action: "repuestos" },
                            { name: "Restaurante", action: "alimentos" },
                            { name: "Tienda", action: "mercadería" },
                        ].map((ind, i) => (
                            <div key={i} className="p-5 border border-neutral-100 rounded-2xl bg-neutral-50/60">
                                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">{ind.name}</p>
                                <p className="text-sm font-semibold text-black mt-1">{ind.action}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-neutral-500 font-light pt-2">
                        La necesidad cambia. El principio es exactamente el mismo: Saber qué recursos tiene la empresa para cumplir lo que promete.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">El Inventario Real</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Una empresa no crece por tener más inventario."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Crece cuando sabe exactamente qué necesita para seguir cumpliendo sus promesas.
                        </p>
                    </div>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo una operación conectada mantiene sincronizados tus recursos, procesos y decisiones.</h4>
                    </div>
                    <Link href="/operacion/operacion-conectada" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar la operación conectada</span>
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
