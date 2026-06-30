import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function QueEsUnaApiPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 08 // Conceptos</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        ¿Qué es una API?<br />
                        <span className="text-neutral-400 font-semibold">La razón por la que unas empresas trabajan conectadas y otras no.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Probablemente has escuchado la palabra "API". Tal vez al contratar un software, al leer una página web o conversando con algún desarrollador. La mayoría de las personas nunca recibe una explicación sencilla.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Y en realidad, es mucho más simple de lo que parece.
                    </p>
                </section>

                {/* Section 2: Imagina tu empresa */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Imagina tu empresa.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Tienes una agenda, un sistema de pagos, WhatsApp, facturación electrónica, correo, Google Calendar. Cada uno hace bien su trabajo. Pero ninguno sabe que el otro existe.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Una API es el idioma que permite que dos sistemas comiencen a entenderse. No cambia ninguno de ellos: simplemente les permite conversar.
                    </p>
                </section>

                {/* Side-by-Side Example */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">El Contraste</span>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">
                            Un ejemplo en el día a día.
                        </h2>
                        <p className="text-sm text-neutral-500 font-light">Cuando un cliente agenda una consulta...</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Without API */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Sin una API</h3>
                            <ul className="text-xs text-neutral-500 space-y-2 font-medium">
                                <li>· La secretaria revisa la agenda.</li>
                                <li>· Luego envía un WhatsApp manual.</li>
                                <li>· Después confirma el pago.</li>
                                <li>· Más tarde emite la boleta.</li>
                                <li>· Finalmente actualiza una planilla.</li>
                            </ul>
                            <p className="text-xs text-mercenario-danger font-semibold pt-4">Todo depende de que una persona mueva los datos.</p>
                        </div>

                        {/* With API */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-4">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Con una API</h3>
                            <ul className="text-xs text-neutral-500 space-y-2 font-medium">
                                <li>· El cliente agenda en segundos.</li>
                                <li>· La agenda informa automáticamente al resto.</li>
                                <li>· El profesional recibe la notificación.</li>
                                <li>· WhatsApp confirma y agenda el pago.</li>
                                <li>· Se genera la boleta SII e informes contables.</li>
                            </ul>
                            <p className="text-xs text-emerald-600 font-semibold pt-4">Todo ocurre porque los sistemas aprendieron a comunicarse.</p>
                        </div>
                    </div>
                </section>

                {/* Section 4: Una API no reemplaza personas */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Una API no reemplaza personas.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Elimina el trabajo repetitivo. Las personas siguen tomando decisiones, atendiendo clientes y resolviendo problemas, pero dejan de mover información de un lugar a otro.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        ¿Necesito saber cómo funciona una API? No, de la misma forma que no necesitas entender cómo funciona Internet para enviar un correo. Lo importante no es la tecnología: lo importante es el resultado.
                    </p>
                </section>

                {/* What can an API connect */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capacidades de Enlace</span>
                        <h3 className="text-xl md:text-2xl font-bold text-black">¿Qué puede conectar una API?</h3>
                        <p className="text-sm text-neutral-500 font-light">Prácticamente cualquier sistema moderno en tu empresa.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs font-semibold text-neutral-500">
                        {["Agenda", "Pagos", "Facturación", "Correo", "WhatsApp", "Google", "Meta", "IMED", "Fonasa", "Previred", "ERP", "CRM", "POS", "Bancos", "Webs", "Apps móviles"].map((item, idx) => (
                            <div key={idx} className="p-4 border border-neutral-200 rounded bg-white">{item}</div>
                        ))}
                    </div>
                </section>

                {/* Section 6: Entonces... */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Entonces...
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Una API no es un programa, ni un software, ni una aplicación. Es el puente que permite que toda la empresa trabaje sobre la misma información.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        En Mercenario utilizamos APIs para construir operaciones, no para mostrar tecnología. Nuestro trabajo consiste en decidir qué información debe viajar, cuándo, hacia dónde y con qué propósito.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Conectar dos sistemas es sencillo. Diseñar una empresa que funcione mejor gracias a esas conexiones es otra historia. La mejor integración es la que el cliente nunca nota: simplemente funciona.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Descubre todas las conexiones que pueden formar parte de tu empresa.</h4>
                    </div>
                    <Link href="/centro-de-conocimiento/que-es-un-erp" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar integraciones</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
