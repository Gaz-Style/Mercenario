import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function NoNecesitasComenzarDeCeroPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 07 // Integraciones</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        No necesitas comenzar de cero.<br />
                        <span className="text-neutral-400 font-semibold">La mejor empresa no es la que cambia todas sus herramientas. Es la que logra que todas trabajen juntas.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Existe una idea muy común cuando una empresa decide modernizarse: "Vamos a tener que cambiar todo". La realidad suele ser exactamente la contraria.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        La mayoría de las empresas ya tiene herramientas que funcionan bien. Una agenda, WhatsApp, correo, facturación, contabilidad, calendarios. El problema no suele ser ninguna de ellas: el problema es que trabajan aisladas.
                    </p>
                </section>

                {/* Section 2: Tu empresa ya hizo una inversión */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Tu empresa ya hizo una inversión.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No tendría sentido comenzar desde cero si aquello que utilizas sigue siendo útil. Por eso nuestro trabajo comienza respetando la operación que ya existe. Primero entendemos cómo funciona, luego decidimos qué vale la pena conservar, y finalmente unimos todas las piezas.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Conectar no significa reemplazar. Significa permitir que la información viaje.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando un cliente agenda una cita... no importa si utilizó una página web, WhatsApp, Google o una secretaria. Lo importante es que esa información llegue automáticamente donde debe llegar.
                    </p>
                </section>

                {/* Grid of Connections */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">El Ecosistema</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                            Algunas de las conexiones más habituales.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold text-neutral-500">
                        
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black">Comunicación</h3>
                            <ul className="space-y-1 font-light leading-relaxed">
                                <li>· WhatsApp Business</li>
                                <li>· Correo electrónico</li>
                                <li>· SMS</li>
                                <li>· Google Calendar</li>
                                <li>· Outlook</li>
                            </ul>
                        </div>

                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black">Administración</h3>
                            <ul className="space-y-1 font-light leading-relaxed">
                                <li>· SII (Servicio de Impuestos Internos)</li>
                                <li>· Facturación electrónica</li>
                                <li>· Boletas</li>
                                <li>· Conciliación bancaria</li>
                                <li>· Reportes financieros</li>
                            </ul>
                        </div>

                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black">Salud</h3>
                            <ul className="space-y-1 font-light leading-relaxed">
                                <li>· IMED</li>
                                <li>· Fonasa</li>
                                <li>· Ficha clínica</li>
                                <li>· Agenda médica</li>
                                <li>· Consentimientos</li>
                            </ul>
                        </div>

                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black">Recursos Humanos</h3>
                            <ul className="space-y-1 font-light leading-relaxed">
                                <li>· Previred</li>
                                <li>· Remuneraciones</li>
                                <li>· Liquidaciones</li>
                                <li>· Documentación</li>
                            </ul>
                        </div>

                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black">Marketing</h3>
                            <ul className="space-y-1 font-light leading-relaxed">
                                <li>· Meta (Facebook/Instagram)</li>
                                <li>· Google Ads / Search</li>
                                <li>· Google Reviews automáticas</li>
                                <li>· Correo automático de fidelización</li>
                                <li>· Seguimiento de clientes inactivos</li>
                            </ul>
                        </div>

                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-3">
                            <h3 className="text-sm font-bold text-black">Pagos</h3>
                            <ul className="space-y-1 font-light leading-relaxed">
                                <li>· Mercado Pago</li>
                                <li>· Transbank (Webpay)</li>
                                <li>· Flow</li>
                                <li>· Stripe</li>
                                <li>· Transferencias automáticas</li>
                            </ul>
                        </div>

                    </div>
                </section>

                {/* Section 4: Y cuando una herramienta no existe */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Y cuando una herramienta no existe... la construimos.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cada empresa tiene procesos únicos. Muchas veces ninguna plataforma ofrece exactamente lo que necesitas. En esos casos desarrollamos soluciones específicas para esa operación, porque el objetivo nunca es vender un sistema: el objetivo es resolver un problema.
                    </p>
                </section>

                {/* Section 5: La tecnología cambia */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        La tecnología cambia. La operación permanece.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Dentro de algunos años aparecerán nuevas herramientas. Nuevas plataformas. Nuevas formas de trabajar. Pero una empresa bien diseñada podrá adaptarse sin volver a comenzar desde cero, porque las conexiones seguirán existiendo.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        En Mercenario no compras una plataforma. Construyes una operación preparada para evolucionar.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Descubre todas las integraciones disponibles.</h4>
                    </div>
                    <Link href="/centro-de-conocimiento/que-es-una-api" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar conexiones</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
