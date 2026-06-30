import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Puedo seguir usando mis herramientas? — Mercenario IOS",
    description: "No necesitas comenzar de cero. Lo que ya funciona también puede formar parte de una mejor operación.",
};

export default function HerramientasPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Integraciones</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        No necesitas comenzar de cero. <span className="text-neutral-400 font-semibold">Lo que ya funciona también puede formar parte de una mejor operación.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Una de las primeras preguntas que recibimos es también una de las más importantes: <strong>¿Voy a tener que cambiar todo lo que ya uso?</strong>
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-2">
                        La respuesta es simple. No. Porque el problema rara vez son las herramientas. El problema es que trabajan aisladas.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">La mayoría de las empresas ya construyó parte de su operación.</h2>
                    <ul className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm text-neutral-600">Utilizan WhatsApp para comunicarse.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm text-neutral-600">Google Calendar para organizar reuniones.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm text-neutral-600">Un sistema para emitir documentos.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm text-neutral-600">Otro para administrar pagos.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm text-neutral-600">Planillas para controlar información.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-neutral-300" /><p className="text-sm text-neutral-600">Aplicaciones especializadas para su industria.</p></li>
                    </ul>
                    <p className="text-neutral-500 font-light pt-4">Cada una cumple una función. Pero ninguna conoce lo que ocurre en la otra.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cambiar todo rara vez es una buena idea.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las personas ya aprendieron a trabajar. Los procesos ya existen. La información ya tiene una historia. Reemplazarlo todo implica detener la operación, volver a capacitar al equipo y comenzar nuevamente.
                    </p>
                    <p className="text-black font-semibold">En la mayoría de los casos, ese no es el camino.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Una empresa conectada piensa diferente. <span className="text-neutral-400 font-semibold">En lugar de reemplazar herramientas... las conecta.</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium pt-4">
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-1 font-bold">La agenda</p><p className="text-neutral-500 font-light">comparte información con el CRM.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-1 font-bold">Los pagos</p><p className="text-neutral-500 font-light">actualizan la administración.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-1 font-bold">La facturación</p><p className="text-neutral-500 font-light">alimenta los reportes.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-1 font-bold">El marketing</p><p className="text-neutral-500 font-light">conoce la actividad de los clientes.</p></div>
                    </div>
                    <p className="text-neutral-500 font-light pt-4">La información comienza a circular. Cada herramienta sigue haciendo aquello para lo que fue creada. Pero ahora deja de trabajar sola.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La verdadera transformación ocurre entre los sistemas. <span className="text-neutral-400 font-semibold">No dentro de ellos.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Muchas empresas creen que necesitan comprar una plataforma más grande. Cuando en realidad solo necesitan que las plataformas que ya tienen comiencen a colaborar. Ahí es donde aparece el mayor cambio.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Algunas herramientas seguirán contigo durante muchos años. <span className="text-neutral-400 font-semibold">Otras serán reemplazadas.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Y eso está bien. Una operación moderna debe poder evolucionar. Agregar nuevas capacidades. Incorporar nuevas tecnologías. Cambiar proveedores cuando sea necesario.
                    </p>
                    <p className="text-black font-semibold pt-2">Sin obligar a reconstruir toda la empresa cada vez que algo cambia.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La tecnología debería darte libertad. <span className="text-neutral-400 font-semibold">No dependencia.</span></h2>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {["Abrir nuevas sucursales.", "Incorporar nuevos servicios.", "Conectar nuevas plataformas.", "Automatizar nuevos procesos."].map((item, i) => (
                            <span key={i} className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">{item}</span>
                        ))}
                    </div>
                    <p className="text-neutral-500 font-light pt-4">Todo sin romper lo que ya funciona.</p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">El Propósito</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "No importa cuántas herramientas utilices. Lo importante es que todas compartan el mismo propósito."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Ayudar a que tu empresa entregue una mejor experiencia. Y que tú puedas administrarla con tranquilidad.
                        </p>
                    </div>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Tu empresa ya tiene una forma de trabajar.</h4>
                        <p className="text-neutral-500 text-sm leading-relaxed">Descubramos cómo conectar todo lo que ya funciona para construir una operación más simple, más eficiente y preparada para crecer.</p>
                    </div>
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Conversemos sobre tu empresa</span>
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
