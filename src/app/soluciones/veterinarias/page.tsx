import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sistema para Veterinarias y Pet Shop — Mercenario IOS",
    description: "Tu veterinaria no atiende mascotas. Gestiona historiales, tratamientos, stock clínico y la confianza de cada dueño. Descubre cómo conectar toda la operación.",
};

const areas = [
    { name: "Ficha Clínica Digital", desc: "Historial completo por paciente, accesible en segundos." },
    { name: "Agenda de Consultas", desc: "Sin llamadas, sin cuadernos. Confirmación automática al dueño." },
    { name: "Inventario Clínico", desc: "Medicamentos, insumos y vacunas con stock en tiempo real." },
    { name: "Recordatorios Automáticos", desc: "Vacunas, controles y tratamientos que se recuerdan solos." },
    { name: "Facturación Integrada", desc: "Cada atención genera su boleta sin doble registro." },
    { name: "CRM de Clientes", desc: "La historia completa del dueño y todas sus mascotas en un lugar." }
];

export default function SolucionesVeterinariasPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">VETERINARIAS</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                {/* HERO */}
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Veterinarias & Pet Shop</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Tu veterinaria no atiende mascotas. <br />
                        <span className="text-neutral-400 font-semibold">Administra la salud de familias enteras.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Detrás de cada consulta hay un dueño que confía en ti. Un historial que debe estar disponible al instante. Un tratamiento que no puede interrumpirse. Y un equipo que necesita coordinarse sin fricción.
                    </p>
                </section>

                {/* COMPRENDER LA OPERACIÓN */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo opera realmente una veterinaria.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Una veterinaria funciona como una clínica médica, un punto de venta y un centro de servicio al mismo tiempo. El veterinario examina, diagnostica y prescribe. El personal de recepción agenda, cobra y coordina. La tienda adjunta vende alimentos, accesorios y medicamentos. Todo ocurre en el mismo espacio y muchas veces al mismo tiempo.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Y a diferencia de otros negocios, el historial clínico de cada paciente es crítico. No es opcional. Un error en la dosis, una vacuna omitida o un tratamiento mal registrado puede tener consecuencias serias para el animal y para la reputación del centro.
                    </p>
                    <p className="text-black font-semibold pt-2">La confianza del dueño de la mascota es el activo más valioso de una veterinaria.</p>
                </section>

                {/* EL CRECIMIENTO */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando la agenda se llena y el control se pierde.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Al principio, el veterinario recuerda cada paciente. Sabe que el labrador de los González viene la próxima semana, que el gato de los Fuentes tiene alergia al maíz y que la perra de la señora Marta está en su tercer mes de embarazo.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Pero cuando la agenda se llena y el equipo crece, esa memoria personal deja de ser suficiente. La información queda dispersa en fichas en papel, en el cuaderno de la recepcionista, en la memoria del veterinario de turno. Y cuando falta uno de ellos, toda la información falta también.
                    </p>
                </section>

                {/* EL CAOS */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Dónde comienzan los problemas.</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-neutral-600 pt-4">
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Historial clínico incompleto.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Vacunas sin seguimiento.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Medicamentos vencidos en stock.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Agenda sin confirmación.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Cobros sin boleta.</div>
                        <div className="p-4 border border-neutral-100 rounded-xl bg-neutral-50/50">Clientes sin recordatorio de control.</div>
                    </div>
                    <p className="text-black font-semibold pt-4">Cada uno de esos problemas erosiona la confianza del dueño de la mascota. Y en esta industria, la confianza es todo.</p>
                </section>

                {/* CÓMO OPERA UNA GRAN VETERINARIA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cómo operan las clínicas veterinarias que crecen sin perder calidad.</h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Las veterinarias que logran escalar —abrir una segunda sede, sumar más veterinarios, crecer en facturación sin perder la calidad— comparten una característica: no dependen de la memoria de ninguna persona en particular.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La ficha clínica de cada paciente está disponible para cualquier profesional en cualquier momento. El recordatorio de vacuna llega automáticamente al dueño, sin que nadie tenga que acordarse de enviarlo. El stock de medicamentos nunca falla porque se gestiona en tiempo real.
                    </p>
                </section>

                {/* OPERACIÓN CONECTADA */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">Cuando la clínica funciona como un sistema.</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                        {areas.map((area, idx) => (
                            <div key={idx} className="p-6 border border-neutral-100 rounded-2xl bg-white hover:border-black transition-colors group">
                                <h4 className="text-sm font-bold text-black">{area.name}</h4>
                                <p className="text-xs text-neutral-500 mt-2 font-medium">{area.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* RESULTADO */}
                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">Lo que cambia de verdad</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "El dueño de la mascota llega y su historial ya está abierto. El recordatorio llegó antes de que tuviera que llamar. Y la boleta ya está emitida cuando paga."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Esa es la diferencia entre una veterinaria que lucha por crecer y una que crece sola. No es el talento del veterinario. Es la operación que lo respalda.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <h4 className="text-xl font-bold text-black max-w-xl">Conversemos sobre cómo funciona tu centro veterinario hoy.</h4>
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Conversemos</span>
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
