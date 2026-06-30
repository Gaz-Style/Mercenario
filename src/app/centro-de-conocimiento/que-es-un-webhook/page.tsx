import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Qué es un Webhook? — Centro de Conocimiento",
    description: "Las empresas pierden tiempo porque sus sistemas no saben cuándo actuar. Un webhook existe para cambiar eso.",
};

const chainExample = [
    "Un cliente agenda una consulta.",
    "La agenda envía un webhook.",
    "El CRM crea automáticamente al nuevo cliente.",
    "Marketing detiene campañas que ya no corresponden.",
    "Administración prepara la información.",
    "El profesional recibe la agenda actualizada."
];

const chainProcess = [
    "Agenda.",
    "CRM.",
    "Facturación.",
    "Administración.",
    "Reportes.",
    "Marketing."
];

export default function QueEsUnWebhookPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">CONOCIMIENTO</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Centro de Conocimiento</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Las empresas pierden tiempo porque sus sistemas no saben cuándo actuar. <span className="text-neutral-400 font-semibold">Un webhook existe para cambiar eso.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        La mayoría de las empresas utiliza varias herramientas al mismo tiempo: Una agenda. Un sistema de pagos. WhatsApp. Correo electrónico. Facturación. CRM. ERP.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-2">
                        El problema no es tener muchas herramientas. El problema aparece cuando ninguna sabe lo que está ocurriendo en la otra.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Imagina la siguiente situación.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Un cliente agenda una cita. La agenda registra la reserva. Pero...
                    </p>
                    <ul className="space-y-4 pt-2 border-l border-neutral-200 ml-1 pl-6">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" /><p className="text-sm font-medium text-neutral-600">El CRM no sabe que existe un nuevo cliente.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" /><p className="text-sm font-medium text-neutral-600">Marketing no deja de enviar promociones innecesarias.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" /><p className="text-sm font-medium text-neutral-600">La secretaria debe revisar manualmente las nuevas reservas.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-red-500" /><p className="text-sm font-medium text-neutral-600">Administración todavía no conoce la información.</p></li>
                    </ul>
                    <p className="text-black font-semibold pt-4">Todo porque cada sistema espera que una persona le avise.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Un webhook hace exactamente eso. <span className="text-neutral-400 font-semibold">Es un aviso automático.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando ocurre un evento importante... Un sistema le informa inmediatamente al siguiente.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-neutral-600 text-center pt-2">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Sin intervención humana.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Sin esperar.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Sin copiar información.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Comunicación al instante.</div>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Piensa en un timbre.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando alguien toca la puerta... No sales cada cinco minutos a revisar si llegó una visita. El timbre te avisa.
                    </p>
                    <p className="text-black font-semibold text-lg pt-4">
                        Eso es un webhook. No hace el trabajo. Solo comunica que es momento de actuar.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Un ejemplo simple</span>
                    
                    <div className="space-y-0">
                        {chainExample.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-start">
                                <div className="flex items-center gap-4 py-4 w-full">
                                    <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                                    <p className="text-sm font-semibold text-black leading-relaxed">{step}</p>
                                </div>
                                {idx < chainExample.length - 1 && (
                                    <div className="ml-[3px] text-neutral-300 text-xs font-mono pl-0.5 pb-1 select-none">↓</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-neutral-500 font-light pt-4">Todo ocurre en segundos. Sin que nadie tenga que mover información manualmente.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Los webhooks no reemplazan personas. <span className="text-neutral-400 font-semibold">Eliminan esperas.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Durante años los sistemas funcionaban preguntando constantemente: <em>"¿Pasó algo nuevo? ¿Ahora? ¿Y ahora?"</em> Eso consume tiempo y recursos.
                    </p>
                    <p className="text-black font-semibold pt-4">Con un webhook ocurre exactamente lo contrario. El sistema solo habla cuando realmente tiene algo importante que decir.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">¿Por qué son tan importantes?</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Porque permiten que toda la empresa reaccione en tiempo real.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                        {["Un pago confirmado.", "Una cita cancelada.", "Una factura emitida.", "Un paciente atendido.", "Una compra realizada."].map((item, i) => (
                            <span key={i} className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">{item}</span>
                        ))}
                    </div>
                    <p className="text-black font-semibold pt-4">
                        Cada uno de esos eventos puede iniciar automáticamente el siguiente proceso. La operación deja de depender de personas recordando tareas. Comienza a coordinarse sola.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Un webhook no tiene valor por sí mismo.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Su valor aparece cuando conecta procesos.
                    </p>
                    
                    <div className="space-y-0 mt-4">
                        {chainProcess.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-start">
                                <div className="flex items-center gap-4 py-4 w-full">
                                    <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                                    <p className="text-sm font-semibold text-black leading-relaxed">{step}</p>
                                </div>
                                {idx < chainProcess.length - 1 && (
                                    <div className="ml-[3px] text-neutral-300 text-xs font-mono pl-0.5 pb-1 select-none">↓</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-black font-semibold pt-4">Cada evento alimenta al siguiente. Y la empresa comienza a comportarse como un solo sistema.</p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">La Filosofía</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "En Mercenario... los webhooks forman parte de la infraestructura que mantiene conectada la operación."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            No necesitas configurarlos manualmente. No necesitas entender cómo funcionan técnicamente. Lo importante es el resultado: La información viaja automáticamente entre procesos. Y las personas dejan de repetir tareas que una empresa moderna debería resolver por sí sola.
                        </p>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">Conclusión</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Un webhook no es una herramienta. No es una aplicación. No es un software. Es una forma de permitir que toda la empresa se mantenga sincronizada.
                    </p>
                    <p className="text-black font-semibold pt-2">
                        Cuando una empresa deja de esperar que las personas transmitan información... Comienza a trabajar con la velocidad que sus clientes ya esperan.
                    </p>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo una operación conectada permite que cada proceso active automáticamente el siguiente.</h4>
                    </div>
                    <Link href="/operacion/operacion-conectada" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar Operación Conectada</span>
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
