import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function NosotrosPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 05 // Nosotros</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        Detrás de una empresa conectada existe una decisión.<br />
                        <span className="text-neutral-400 font-semibold">Diseñar la forma en que toda la empresa trabaja.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Cuando visitas una gran clínica, un banco o una aerolínea, nunca piensas en los sistemas que utilizan. Simplemente todo funciona. Agenda. Pagos. Notificaciones. Documentos. Seguimiento.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Cada área sabe exactamente qué hacer. No porque las personas trabajen más. Porque la operación fue diseñada para funcionar como un solo organismo.
                    </p>
                </section>

                {/* Section 2: Eso mismo puede ocurrir en una pequeña empresa */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Eso mismo puede ocurrir en una pequeña empresa.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No importa si tienes una consulta médica. Un centro estético. Un estudio jurídico. Una empresa de servicios. Una tienda.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Toda empresa comparte el mismo desafío: coordinar personas, clientes e información.
                    </p>
                </section>

                {/* Section 3: Ahí comienza nuestro trabajo */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Ahí comienza nuestro trabajo.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold text-neutral-500 pt-4">
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <p className="text-black">No instalamos un software.</p>
                            <p className="font-light text-[11px] leading-relaxed">No vendemos licencias rígidas que te aten a una estructura fija.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <p className="text-black">No cambiamos tu forma de trabajar.</p>
                            <p className="font-light text-[11px] leading-relaxed">Primero entendemos de forma exacta cómo funciona tu negocio hoy.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <p className="text-black">Diseñamos una operación.</p>
                            <p className="font-light text-[11px] leading-relaxed">Hacemos que todas tus herramientas comiencen a comunicarse.</p>
                        </div>
                    </div>
                </section>

                {/* Section 4: Algunas empresas necesitan integrar 5 */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Diseñamos operaciones. No paquetes.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Algunas empresas necesitan integrar cinco sistemas. Otras veinte. Algunas requieren conexión con el SII, otras con IMED, otras con Previred. No existe una empresa igual a otra. Por eso tampoco existe una solución idéntica para todas.
                    </p>
                    <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4">
                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Diagnóstico Crítico</p>
                        <p className="text-sm font-semibold text-black leading-relaxed">
                            Cada implementación comienza con una pregunta: ¿Cómo funciona hoy tu empresa? No cómo te gustaría que funcionara, sino cómo funciona realmente.
                        </p>
                        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium text-neutral-500 pt-2">
                            <li>· ¿Quién agenda?</li>
                            <li>· ¿Quién cobra?</li>
                            <li>· ¿Quién confirma?</li>
                            <li>· ¿Quién recuerda?</li>
                            <li>· ¿Quién revisa?</li>
                            <li>· ¿Quién toma decisiones?</li>
                        </ul>
                    </div>
                </section>

                {/* Visual connectors representation */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Integración</span>
                        <h3 className="text-xl md:text-2xl font-bold text-black">Unir lo que hoy está separado.</h3>
                    </div>

                    <div className="grid grid-cols-3 md:grid-cols-9 gap-4 text-center">
                        {["Clientes", "Agenda", "Pagos", "Admin", "Marketing", "Finanzas", "Chats", "Dctos", "Reportes"].map((item, idx) => (
                            <div key={idx} className="p-3 border border-neutral-200 rounded-lg bg-white shadow-sm flex items-center justify-center min-h-[60px]">
                                <p className="text-[10px] font-bold text-black tracking-tight">{item}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 6: El resultado */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El resultado no es un sistema nuevo. Es una empresa distinta.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Tus clientes sienten más confianza. Tu equipo trabaja con mayor claridad. Tus procesos dejan de depender de la memoria, y tú recuperas algo que probablemente habías perdido hace tiempo: **Visibilidad**.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Porque dirigir una empresa debería significar tomar decisiones. No perseguir información.
                    </p>
                </section>

                {/* Section 7: Mercenario Brand Definition */}
                <section className="py-20 border-t border-neutral-100 space-y-4">
                    <h3 className="text-xl font-bold text-black">Mercenario</h3>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed">
                        Construimos operaciones para empresas que quieren crecer sin aumentar su complejidad.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Cuéntanos cómo funciona hoy tu empresa.</h4>
                        <p className="text-sm text-neutral-500 font-light">Nosotros te mostraremos cómo podría funcionar mañana.</p>
                    </div>
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Agendar una reunión</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
