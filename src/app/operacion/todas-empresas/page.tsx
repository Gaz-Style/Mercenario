import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function TodasEmpresasPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 21 // Todas las empresas</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        No importa a qué se dedica tu empresa.
                        <br />
                        <span className="text-neutral-400 font-semibold">La operación siempre cuenta una historia.</span>
                    </h1>
                </section>

                {/* Intro */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cada empresa trabaja de forma distinta, pero todas enfrentan el mismo desafío.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Coordinar personas, información y decisiones.
                    </p>
                </section>

                {/* Industry examples */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-neutral-500 text-sm font-semibold">
                        <div><strong>Centro médico:</strong> agenda pacientes.</div>
                        <div><strong>Peluquería:</strong> agenda horas.</div>
                        <div><strong>Estudio jurídico:</strong> agenda reuniones.</div>
                        <div><strong>Inmobiliaria:</strong> agenda visitas.</div>
                        <div><strong>Empresa de servicios:</strong> agenda proyectos.</div>
                    </div>
                </section>

                {/* Customer journey */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Todo comienza con un cliente.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Una consulta, una solicitud de información, una cotización, una reserva, una compra… ese primer contacto pone en marcha toda la empresa.
                    </p>
                </section>

                {/* Process flow */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Después aparecen los procesos.</h2>
                    <ul className="list-disc list-inside text-neutral-500 space-y-2">
                        <li>Confirmaciones</li>
                        <li>Pagos</li>
                        <li>Documentos</li>
                        <li>Seguimientos</li>
                        <li>Comunicación</li>
                        <li>Cobranza</li>
                        <li>Marketing</li>
                        <li>Administración</li>
                        <li>Reportes</li>
                    </ul>
                    <p className="text-neutral-500 font-light leading-relaxed mt-4">Aunque cambie la industria, la operación es sorprendentemente parecida.</p>
                </section>

                {/* What changes */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Lo que cambia no es la tecnología, es la historia del cliente.</h2>
                </section>

                {/* Sector examples */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <h3 className="text-xl font-bold text-black">Salud</h3>
                    <p className="text-neutral-500 font-light">Consultas médicas, clínicas, centros médicos, psicología, kinesiología, odontología.</p>
                    <h3 className="text-xl font-bold text-black mt-6">Belleza y bienestar</h3>
                    <p className="text-neutral-500 font-light">Centros estéticos, peluquerías, barberías, spa, masoterapia.</p>
                    <h3 className="text-xl font-bold text-black mt-6">Servicios profesionales</h3>
                    <p className="text-neutral-500 font-light">Abogados, arquitectos, ingenieros, consultores, contadores.</p>
                    <h3 className="text-xl font-bold text-black mt-6">Comercio</h3>
                    <p className="text-neutral-500 font-light">Tiendas, showrooms, emprendimientos, retail especializado.</p>
                    <h3 className="text-xl font-bold text-black mt-6">Servicios técnicos</h3>
                    <p className="text-neutral-500 font-light">Talleres, mantenciones, instalaciones, soporte, empresas de terreno.</p>
                </section>

                {/* Core message */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Todas parecen empresas distintas, hasta que observas su operación. Descubres que todas necesitan exactamente lo mismo: orden, coordinación, información y una buena experiencia para sus clientes.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Por eso Mercenario no fue construido para una industria, sino para una forma de trabajar.
                    </p>
                </section>

                {/* Brand axiom */}
                <section className="py-20 border-t border-neutral-100 text-center">
                    <div className="max-w-2xl mx-auto bg-neutral-50 border border-neutral-100 p-12 rounded-3xl space-y-3">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-450 uppercase block">El Axioma de Mercenario</span>
                        <blockquote className="text-lg md:text-2xl font-bold text-black tracking-tight leading-snug">
                            "La tecnología organiza la operación.<br/>La comunicación construye la confianza."
                        </blockquote>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Cuéntanos a qué se dedica tu empresa. Diseñaremos una operación pensada para ella.</h4>
                    </div>
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Agendar una conversación</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>
        </div>
    );
}
