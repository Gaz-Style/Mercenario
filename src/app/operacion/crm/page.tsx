import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "CRM — Mercenario IOS",
    description: "Un cliente no debería volver a presentarse cada vez que vuelve. La mejor relación comienza cuando tu empresa recuerda.",
};

const chain = [
    "Un correo.",
    "Una reunión.",
    "Una propuesta.",
    "Una compra.",
    "Un seguimiento.",
    "Una recomendación."
];

export default function CrmPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capacidad · CRM</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Un cliente no debería volver a presentarse cada vez que vuelve. <span className="text-neutral-400 font-semibold">La mejor relación comienza cuando tu empresa recuerda.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Hay empresas que conocen a sus clientes. Y hay empresas que vuelven a empezar cada vez que alguien llama.
                    </p>
                    <div className="space-y-2 pt-2 border-l border-neutral-200 ml-1 pl-6">
                        <p className="text-sm font-medium text-neutral-600 italic">"¿Cuál era su nombre?"</p>
                        <p className="text-sm font-medium text-neutral-600 italic">"¿En qué lo atendimos?"</p>
                        <p className="text-sm font-medium text-neutral-600 italic">"¿Quién habló con usted?"</p>
                        <p className="text-sm font-medium text-neutral-600 italic">"¿Qué presupuesto le enviamos?"</p>
                    </div>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-2">
                        Cuando la información depende de la memoria de una persona... La relación también.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Un CRM no sirve para guardar contactos. <span className="text-neutral-400 font-semibold">Sirve para construir relaciones.</span></h2>
                    <div className="flex flex-wrap gap-3 pt-4">
                        {["Cada conversación.", "Cada correo.", "Cada llamada.", "Cada cotización.", "Cada reunión.", "Cada compra.", "Cada atención."].map((item, i) => (
                            <span key={i} className="px-4 py-2 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-600 bg-white">{item}</span>
                        ))}
                    </div>
                    <p className="text-black font-semibold pt-4">Todo forma parte de la historia entre una empresa y un cliente. Y esa historia no debería perderse nunca.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El verdadero problema no es olvidar un nombre. <span className="text-neutral-400 font-semibold">Es olvidar el contexto.</span></h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Imagina que un cliente vuelve seis meses después. La empresa ya sabe quién es. Qué compró. Qué necesitaba. Qué quedó pendiente. Qué persona lo atendió. Qué conversación tuvieron.
                    </p>
                    <p className="text-black font-semibold text-lg">No necesita comenzar de nuevo. Puede continuar donde la relación quedó. Eso cambia completamente la experiencia.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cada cliente deja información valiosa.</h2>
                    <ul className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">Qué servicios utiliza.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">Con qué frecuencia compra.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">Qué preguntas hace.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">Qué problemas ha tenido.</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">Qué oportunidades existen.</p></li>
                    </ul>
                    <p className="text-neutral-500 font-light pt-4">Toda esa información ayuda a comprender mejor a cada persona. No para vender más. Para atender mejor.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Un CRM también organiza el trabajo del equipo.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando varias personas participan en una misma operación... Todos deberían conocer la misma historia. Ventas. Administración. Marketing. Soporte. Gerencia.
                    </p>
                    <p className="text-black font-semibold">Cada área necesita contexto. No versiones distintas de un mismo cliente.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La relación no termina cuando termina la venta.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Muchas empresas desaparecen después de emitir una factura. Las mejores empresas hacen exactamente lo contrario.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-neutral-600 text-center pt-2">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Preguntan.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Acompañan.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Recuerdan.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Informan.</div>
                    </div>
                    <p className="text-neutral-500 font-light pt-2">Vuelven a aparecer cuando realmente pueden aportar valor. Un CRM permite que esa relación continúe creciendo.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Reacción en Cadena</span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cada interacción fortalece la siguiente.</h2>
                    
                    <div className="space-y-0 mt-4">
                        {chain.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-start">
                                <div className="flex items-center gap-4 py-4 w-full">
                                    <div className="w-2 h-2 rounded-full bg-black shrink-0" />
                                    <p className="text-sm font-semibold text-black leading-relaxed">{step}</p>
                                </div>
                                {idx < chain.length - 1 && (
                                    <div className="ml-[3px] text-neutral-300 text-xs font-mono pl-0.5 pb-1 select-none">↓</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-black font-semibold pt-4">Nada ocurre de manera aislada. Cada momento prepara el siguiente.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Un buen CRM no obliga a registrar información. <span className="text-neutral-400 font-semibold">La obtiene de la operación.</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium pt-4">
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-1 font-bold">Cuando la agenda está conectada...</p><p className="text-neutral-500 font-light">El CRM se actualiza.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-1 font-bold">Cuando existe una venta...</p><p className="text-neutral-500 font-light">El CRM la conoce.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-1 font-bold">Cuando marketing envía una campaña...</p><p className="text-neutral-500 font-light">El CRM registra la respuesta.</p></div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50"><p className="text-black mb-1 font-bold">Cuando administración genera un documento...</p><p className="text-neutral-500 font-light">El historial continúa creciendo.</p></div>
                    </div>
                    <p className="text-neutral-500 font-light pt-4">Las personas dejan de alimentar un sistema. Es el sistema quien acompaña el trabajo diario.</p>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">El Propósito</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Conocer a un cliente no consiste en guardar su nombre. Consiste en comprender su historia."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Una empresa organizada no pregunta dos veces lo mismo. Recuerda. Y cuando recuerda... puede ofrecer una experiencia que se siente cercana, profesional y coherente desde el primer contacto hasta muchos años después.
                        </p>
                    </div>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Cada cliente tiene una historia.</h4>
                        <p className="text-neutral-500 text-sm leading-relaxed">Descubre cómo una operación conectada permite que toda tu empresa la conozca y la continúe.</p>
                    </div>
                    <Link href="/operacion/operacion-conectada" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar la experiencia completa</span>
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
