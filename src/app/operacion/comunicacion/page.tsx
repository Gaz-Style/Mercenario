import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function ComunicacionPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 17 // Relaciones humanas</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        La comunicación también forma parte del servicio.<br />
                        <span className="text-neutral-400 font-semibold">Un cliente nunca debería preguntarse qué está ocurriendo. La empresa debería decírselo antes.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        Piensa en la última vez que esperaste una respuesta. Una confirmación, un correo, un mensaje, una llamada. La incertidumbre genera desconfianza, incluso cuando todo está funcionando correctamente de fondo. Por eso las mejores empresas no esperan a que el cliente pregunte: se adelantan.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Comunicar también es atender.
                    </p>
                </section>

                {/* Section 2: Comunicar es atender */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        La atención comienza antes y continúa después.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Muchas veces creemos que la atención ocurre únicamente cuando conversamos físicamente con un cliente. Pero comienza mucho antes y continúa mucho después. Cada mensaje transmite una idea clara: "Estamos preparados para recibirte", "Tu pago fue recibido", "Tu cita quedó confirmada".
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        No son simples notificaciones automáticas: son señales de tranquilidad.
                    </p>
                </section>

                {/* Journey vertical timeline */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Senda del Mensaje Justo</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                            Un recorrido sin incertidumbres.
                        </h2>
                        <p className="text-sm text-neutral-500 font-light">Durante todo el proceso, el cliente siempre sabe qué está ocurriendo:</p>
                    </div>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-6 py-2">
                        {[
                            "El cliente agenda su cita e inmediatamente recibe confirmación.",
                            "Un día antes de la cita, recibe un recordatorio inteligente de asistencia.",
                            "Al llegar al lugar, sabe exactamente qué ocurrirá en su atención.",
                            "Después de recibir el servicio, recibe un mensaje de agradecimiento.",
                            "Días más tarde, le llegan recomendaciones posventa personalizadas.",
                            "Semanas después, recibe una invitación oportuna para volver a agendar."
                        ].map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <p className="text-sm font-semibold text-neutral-755 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 4: Grid of channels */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">La Omnicanalidad</span>
                        <h3 className="text-xl md:text-2xl font-bold text-black">Cada canal cumple una función distinta.</h3>
                        <p className="text-sm text-neutral-500 font-light">La empresa no necesita elegir uno: necesita utilizar el adecuado en el momento preciso.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-semibold text-neutral-500">
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h4 className="text-sm font-bold text-black">WhatsApp Business</h4>
                            <p className="font-light leading-relaxed">Ofrece la cercanía, inmediatez y el canal nativo preferido del cliente en su bolsillo.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h4 className="text-sm font-bold text-black">Correo Electrónico</h4>
                            <p className="font-light leading-relaxed">Permite entregar información estructurada de respaldo, documentos tributarios y guías de cuidado profundo.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h4 className="text-sm font-bold text-black">Notificaciones y SMS</h4>
                            <p className="font-light leading-relaxed">Perfectos para resolver situaciones urgentes o recordatorios críticos de último minuto.</p>
                        </div>
                    </div>
                </section>

                {/* Brand slogan highlighted block */}
                <section className="py-20 border-t border-neutral-100 text-center">
                    <div className="max-w-2xl mx-auto bg-neutral-50 border border-neutral-100 p-12 rounded-3xl space-y-3">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-450 uppercase block">El Axioma de Mercenario</span>
                        <blockquote className="text-lg md:text-2xl font-bold text-black tracking-tight leading-snug">
                            "La tecnología organiza la operación.<br />La comunicación construye la confianza."
                        </blockquote>
                    </div>
                </section>

                {/* Section 6: En Mercenario */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        En Mercenario, la comunicación nace de la operación.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No de una campaña masiva de spam. Cada mensaje responde a un hecho real de la clínica: un agendamiento, un pago, una atención, una boleta o un seguimiento clínico. Por eso nunca se siente frío o robótico: se siente oportuno y empático.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Tus clientes no recordarán cada mensaje individual, pero sí recordarán cómo los hiciste sentir: acompañados, informados y tranquilos. Y esa sensación es la base del servicio que entregas.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Descubre cómo cada interacción puede convertirse en una mejor experiencia para tus clientes.</h4>
                    </div>
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Conocer todas las automatizaciones</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
