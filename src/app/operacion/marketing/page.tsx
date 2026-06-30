import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";

export default function MarketingPage() {
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
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 16 // Marketing Operativo</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black leading-[1.05]">
                        Marketing que trabaja mientras tu empresa sigue atendiendo.<br />
                        <span className="text-neutral-400 font-semibold">El mejor marketing comienza después de la primera venta. No antes.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed pt-4">
                        La mayoría de las empresas piensa en marketing como publicidad: publicar en redes sociales, crear anuncios y conseguir nuevos clientes. Pero existe una pregunta mucho más importante: ¿Qué ocurre con las personas que ya confiaron en ti?
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        Conseguir un cliente cuesta tiempo y dinero. Perderlo solo toma un descuido.
                    </p>
                </section>

                {/* Section 2: El silencio posventa */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El costo del silencio.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Un cliente termina una consulta, una atención o una compra. Y después... silencio. Nadie vuelve a escribirle, nadie sabe si quedó conforme, nadie recuerda cuándo debería regresar. La empresa simplemente espera que vuelva por iniciativa propia, pero muchas veces eso no ocurre.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        El marketing también puede cuidar relaciones.
                    </p>
                </section>

                {/* The marketing cycle vertical timeline */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">El Ciclo de Vida</span>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                            Mantener viva la relación.
                        </h2>
                        <p className="text-sm text-neutral-500 font-light">Así se comporta una operación que cuida a sus clientes en el tiempo:</p>
                    </div>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-6 py-2">
                        {[
                            "El cliente recibe un mensaje agradeciendo su visita posconsulta.",
                            "Días después recibe recomendaciones o cuidados útiles para su caso.",
                            "Más adelante recibe un recordatorio preventivo de control.",
                            "Semanas después recibe una invitación cordial para agendar de nuevo.",
                            "Finalmente se le solicita una breve evaluación u opinión del servicio."
                        ].map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                <p className="text-sm font-semibold text-neutral-755 leading-relaxed">{step}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-neutral-500 font-light leading-relaxed pt-4">
                        Todo ocurre de manera natural, sin invadir y sin insistir. Cada cliente vive un recorrido diferente: algunos necesitan volver en un mes, otros en seis y otros una vez al año. Tu empresa no tiene por qué recordar cada caso individualmente, la operación debe hacerlo de manera automática.
                    </p>
                </section>

                {/* Section 4: El marketing deja de ser campaña */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        El marketing deja de ser una campaña y se convierte en una conversación.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cuando una persona agenda, comienza una historia. Cada mensaje tiene un propósito claro: dar la bienvenida, confirmar, acompañar, informar, recordar, agradecer, invitar a volver o solicitar una evaluación de calidad. Todo forma parte de la misma experiencia.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Nada ocurre por casualidad. Cada mensaje aparece en el momento correcto porque responde a una acción real del cliente, no a una fecha elegida al azar.
                    </p>
                </section>

                {/* Grid of marketing examples */}
                <section className="py-20 border-t border-neutral-100 space-y-12">
                    <div className="space-y-2">
                        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Ejemplos Reales</span>
                        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-black">
                            Mensajería basada en acciones.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold text-neutral-500">
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Tratamiento Terminado</h3>
                            <p className="font-light leading-relaxed">Un paciente finaliza su ciclo de atención y recibe de inmediato los cuidados posteriores detallados y recomendaciones en su WhatsApp.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Carrito Abandonado</h3>
                            <p className="font-light leading-relaxed">Un usuario abandona un agendamiento o compra a medio camino y recibe un recordatorio amistoso horas después con un enlace directo para continuar.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Aniversario de Visita</h3>
                            <p className="font-light leading-relaxed">Una persona cumple un año exacto desde su última visita y recibe una invitación personalizada con beneficios especiales para retomar.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-xl bg-neutral-50/50 space-y-2">
                            <h3 className="text-sm font-bold text-black border-b border-neutral-200 pb-2">Invitación a Reseña</h3>
                            <p className="font-light leading-relaxed">Un cliente califica su servicio internamente con puntuación máxima y el sistema lo invita de forma automática a compartir su reseña en Google Reviews.</p>
                        </div>
                    </div>
                    <p className="text-black font-semibold text-xs pt-4">Todo ocurre automáticamente porque el sistema está diseñado para mantener activa la relación de largo plazo.</p>
                </section>

                {/* Section 6: Las 22 herramientas */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">
                        Más de 20 herramientas trabajando juntas.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        El marketing en Mercenario no es un botón ni una función aislada. Es un conjunto coordinado de procesos: correos automatizados, WhatsApp, encuestas de calidad, recuperación de inactivos, carritos abandonados, segmentación inteligente y campañas proactivas. Cada una aparece únicamente cuando aporta valor.
                    </p>
                    <p className="text-black font-semibold text-lg leading-relaxed">
                        El objetivo nunca es enviar más mensajes: es construir más confianza.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Porque una empresa que permanece presente en el momento correcto, rara vez necesita volver a presentarse.
                    </p>
                </section>

                {/* CTA */}
                <div className="mt-20 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-bold text-black">Descubre cómo cada interacción puede convertirse en una nueva oportunidad.</h4>
                    </div>
                    <Link href="/operacion/comunicacion" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Conocer todas las herramientas de Marketing</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
