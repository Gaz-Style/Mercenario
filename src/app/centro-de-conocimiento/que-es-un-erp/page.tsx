import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function QueEsUnErpPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 09 // Conceptos</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        ¿Qué es un ERP?<br />
                        <span className="text-neutral-400 font-semibold">Un ERP no es un software. Es la forma en que una empresa deja de improvisar.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Muchas personas escuchan la palabra ERP y piensan inmediatamente en grandes empresas. Fábricas. Corporaciones. Multinacionales. La realidad es mucho más simple: un ERP es el lugar donde una empresa administra su operación.
                    </p>
                </section>

                {/* Section 2: Tablero de avión */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Analogía</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Piensa en el tablero de un avión.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El piloto no necesita mirar cada motor por separado. Tiene un panel donde toda la información importante llega en tiempo real: velocidad, combustible, altura, rumbo. Todo está reunido en un solo lugar.
                    </p>
                    <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 text-center text-xs font-bold text-neutral-400 uppercase tracking-widest">
                        [ Tablero Unificado // Velocidad · Combustible · Rumbo · Altura ]
                    </div>
                    <p className="text-black font-semibold leading-relaxed pt-2">
                        Una empresa necesita exactamente lo mismo para tomar decisiones.
                    </p>
                </section>

                {/* Side-by-Side comparison */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Comparación de Estructura</span>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">
                            ¿Cómo vive tu información hoy?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Without ERP */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Sin un ERP</h3>
                            <ul className="text-xs text-neutral-500 space-y-2 font-medium">
                                <li>· La agenda está en un sistema.</li>
                                <li>· Los pagos en otro.</li>
                                <li>· Las boletas en otro distinto.</li>
                                <li>· Los clientes en carpetas o CRM suelto.</li>
                                <li>· La contabilidad en planillas manuales.</li>
                            </ul>
                            <p className="text-xs text-mercenario-danger font-semibold pt-4">Cada decisión requiere buscar datos en distintos lugares.</p>
                        </div>

                        {/* With ERP */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Con un ERP</h3>
                            <ul className="text-xs text-neutral-500 space-y-2 font-medium">
                                <li>· Clientes y ventas unificados.</li>
                                <li>· Pagos y cobranzas en línea.</li>
                                <li>· Caja e inventario integrados.</li>
                                <li>· Documentos del SII sincronizados.</li>
                                <li>· Indicadores y reportes financieros consolidados.</li>
                            </ul>
                            <p className="text-xs text-emerald-600 font-semibold pt-4">Toda la empresa comienza a verse desde un solo tablero.</p>
                        </div>
                    </div>
                </section>

                {/* Section 4: Un ERP no hace el trabajo por ti */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Un ERP no hace el trabajo por ti. Te permite entender qué está ocurriendo.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando sabes exactamente cuánto vendiste, cuánto falta por cobrar, qué profesional atendió más pacientes, qué servicio genera mayores ingresos y qué clientes dejaron de volver... entonces puedes tomar decisiones con información. No con intuición.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Un ERP moderno no trabaja solo: trabaja conectado. Recibe información desde la agenda, desde el sistema de pagos, desde el SII, el banco, WhatsApp, IMED y tu sitio web. Toda esa información llega automáticamente.
                    </p>
                </section>

                {/* Section 5: Lo importante no es tener datos */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Lo importante no es tener más datos. Es entenderlos.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Una empresa genera cientos de movimientos cada día, pero si nadie logra interpretarlos, esos datos no generan valor. Un buen ERP transforma movimientos en información útil que te permite crecer.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        ¿Todas las empresas necesitan un ERP? Toda empresa necesita comprender su operación. No importa si tienes dos personas o cincuenta. Mientras más crece un negocio, más importante resulta tener una visión completa de lo que ocurre.
                    </p>
                </section>

                {/* Section 6: En Mercenario */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El ERP en Mercenario
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No es un sistema aislado. Es el centro de mando de toda la empresa. Desde ahí es posible comprender cómo funciona cada área, qué está ocurriendo, qué necesita atención y qué oportunidades están apareciendo.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Porque dirigir una empresa no debería consistir en buscar información. Debería consistir en tomar decisiones.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Conoce cómo funciona el Centro de Operaciones de Mercenario.</h4>
                    </div>
                    <Link href="/centro-de-conocimiento/que-es-un-crm" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar el Centro de Operaciones</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
