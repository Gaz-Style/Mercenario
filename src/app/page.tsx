"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
    ChevronRight, 
    ArrowRight,
    ArrowUpRight,
    Play,
    RotateCcw
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
    const [formData, setFormData] = useState({ name: "", email: "", challenge: "", budget: "" });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    
    // Interactive Map state
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const operationalSteps = [
        { label: "Cliente reserva cita", area: "Demanda", desc: "El cliente agenda en línea de forma autónoma." },
        { label: "Pago confirmado", area: "Finanzas", desc: "Transacción procesada y link de cobro conciliado." },
        { label: "Agenda coordinada", area: "Sincronización", desc: "El calendario global se actualiza sin duplicarse." },
        { label: "Trabajador digital notificado", area: "Inteligencia", desc: "La IA asigna recursos y prepara la pauta." },
        { label: "Registro único actualizado", area: "Operaciones", desc: "Se actualiza el historial y ficha del cliente." },
        { label: "Factura SII generada", area: "Transaccional", desc: "Emisión y envío automático de la documentación legal." },
        { label: "Conciliación bancaria", area: "Control", desc: "El flujo de caja se cuadra con la cuenta corriente." },
        { label: "Reporte de rentabilidad", area: "Dirección", desc: "Métricas financieras actualizadas en tiempo real." },
        { label: "Reactivación automática", area: "Crecimiento", desc: "El sistema detecta inactividad e invita a retornar." }
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev >= operationalSteps.length - 1) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1800);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    const startSimulation = () => {
        setCurrentStep(0);
        setIsPlaying(true);
    };

    const resetSimulation = () => {
        setIsPlaying(false);
        setCurrentStep(0);
    };

    const projects = [
        { title: "NeuroV", cat: "Inteligencia & UI", desc: "Clínica estética operando sobre un único sistema.", link: "https://neuro-v.vercel.app/", image: "/imagenes/ejecutados/neuroV.jpeg" },
        { title: "SocialMotors", cat: "Ventas & Operación", desc: "Embudo comercial y control de inventario unificado.", link: "https://www.socialmotors.cl/", image: "/imagenes/ejecutados/socialmotors.jpeg" },
        { title: "Valet PRT", cat: "Terreno & Gestión", desc: "Recepción y control de vehículos centralizado.", link: "https://socialmotors.cl/valet", image: "/imagenes/ejecutados/valetPRT.jpeg" },
        { title: "PaseaLove", cat: "Servicios & Rastreo", desc: "Reservas, logística y operaciones en una sola vista.", link: "https://www.pasealove.cl/", image: "/imagenes/ejecutados/PaseaLove.jpeg" }
    ];

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("loading");
        const { error } = await supabase
            .from("leads")
            .insert([{ name: formData.name, email: formData.email, challenge: formData.challenge, budget: formData.budget }]);

        if (error) {
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 4000);
        } else {
            setFormStatus("success");
            setFormData({ name: "", email: "", challenge: "", budget: "" });
            setTimeout(() => setFormStatus("idle"), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            
            {/* Header: Ultra minimal, stark white */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 bg-mercenario-danger rounded-full" />
                        <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase flex items-center gap-2">
                            MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">IOS</span>
                        </span>
                    </div>
                    <Link href="#contacto" className="text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        Iniciar Diagnóstico
                    </Link>
                </div>
            </header>

            <main className="w-full max-w-7xl mx-auto px-6 pt-40 sm:pt-56 pb-32 z-10 flex flex-col items-center">

                {/* 1. HERO - La gran idea. Espacio y tipografía. */}
                <section className="text-center max-w-5xl pb-40 md:pb-56 space-y-8 flex flex-col items-center w-full">
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center gap-8">
                        
                        <div className="inline-flex items-center gap-2 border border-neutral-200 px-4 py-1.5 rounded-full text-[10px] font-semibold text-neutral-500 tracking-wider uppercase">
                            <span className="w-1 h-1 bg-mercenario-danger rounded-full"></span>
                            Infraestructura de Operaciones
                        </div>

                        <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] font-bold tracking-tighter leading-[1] text-black">
                            La infraestructura operativa <br className="hidden md:block" />
                            <span className="text-neutral-400 font-semibold">donde funciona tu empresa.</span>
                        </h1>

                        <p className="text-neutral-500 text-base md:text-xl max-w-2xl mx-auto leading-relaxed font-light tracking-wide mt-4">
                            Una sola plataforma. Un solo flujo de datos. Una sola fuente de verdad. Centralizamos toda la operación de tu negocio sobre un núcleo operativo diseñado para el orden absoluto.
                        </p>

                        <div className="pt-8">
                            <a href="#contacto" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                                <span>Recuperar el Control</span>
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                </section>

                {/* 2. LA OPERACIÓN - El Mapa Interactivo */}
                <section className="w-full max-w-5xl mx-auto px-4 py-32 md:py-48 border-t border-neutral-100 flex flex-col items-center">
                    <div className="text-center max-w-2xl mb-20 space-y-4">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-neutral-400">El Centro de Operaciones</h2>
                        <p className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                            Observa cómo opera una empresa coordinada en tiempo real.
                        </p>
                        <p className="text-sm text-neutral-500 font-light">
                            Una sola acción del cliente activa una cadena de eventos autónomos entre todas las áreas del negocio.
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                        {/* Panel de control de simulación */}
                        <div className="lg:col-span-1 space-y-6 bg-neutral-50 border border-neutral-100 p-8 rounded-2xl">
                            <div className="space-y-2">
                                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Simulación Operativa</span>
                                <h3 className="text-xl font-bold text-black">Flujo Orgánico</h3>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                    Haz click en ejecutar para ver cómo viajan los datos a través del sistema nervioso de Mercenario IOS.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                {!isPlaying ? (
                                    <button 
                                        onClick={startSimulation}
                                        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-black text-white text-[11px] font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-all"
                                    >
                                        <Play className="w-3.5 h-3.5 fill-current" />
                                        <span>Ejecutar Flujo</span>
                                    </button>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-neutral-200 text-neutral-500 text-[11px] font-semibold uppercase tracking-wider rounded-lg cursor-not-allowed">
                                        <div className="w-1.5 h-1.5 bg-mercenario-danger rounded-full animate-ping" />
                                        <span>Procesando...</span>
                                    </div>
                                )}
                                <button 
                                    onClick={resetSimulation}
                                    className="p-3.5 border border-neutral-200 text-neutral-500 rounded-lg hover:bg-neutral-100 transition-all"
                                    aria-label="Reiniciar flujo"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Mostrar detalles del paso activo */}
                            <div className="border-t border-neutral-200/60 pt-6 space-y-2 min-h-[100px]">
                                <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">Área: {operationalSteps[currentStep].area}</span>
                                <h4 className="text-sm font-bold text-black">{operationalSteps[currentStep].label}</h4>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">{operationalSteps[currentStep].desc}</p>
                            </div>
                        </div>

                        {/* Visualizador de Nodos */}
                        <div className="lg:col-span-2 space-y-3">
                            {operationalSteps.map((step, index) => {
                                const isActive = index === currentStep;
                                const isCompleted = index < currentStep;
                                return (
                                    <div 
                                        key={index}
                                        onClick={() => { setIsPlaying(false); setCurrentStep(index); }}
                                        className={`flex items-center gap-4 p-4 border rounded-xl transition-all duration-300 cursor-pointer ${
                                            isActive 
                                                ? "bg-black border-black text-white shadow-md translate-x-2" 
                                                : isCompleted
                                                    ? "bg-neutral-50/50 border-neutral-100 text-neutral-400"
                                                    : "bg-white border-neutral-100 text-neutral-600 hover:border-neutral-200"
                                        }`}
                                    >
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full border text-[9px] font-mono font-bold shrink-0">
                                            {isActive ? (
                                                <div className="w-1.5 h-1.5 bg-mercenario-danger rounded-full animate-pulse" />
                                            ) : (
                                                <span>{index + 1}</span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-baseline gap-2">
                                                <p className="text-xs font-semibold truncate tracking-tight">{step.label}</p>
                                                <span className={`text-[8px] font-mono tracking-wider uppercase shrink-0 ${isActive ? "text-neutral-400" : "text-neutral-400"}`}>{step.area}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* 3. EL PROBLEMA - Caos y fragmentación */}
                <section className="w-full max-w-4xl mx-auto px-4 py-32 md:py-48 border-t border-neutral-100 space-y-12">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-[1.1]">
                            Las empresas no dejan de crecer por falta de talento.
                        </h2>
                        <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-neutral-400 leading-[1.1]">
                            Dejan de crecer porque operan sobre sistemas fragmentados.
                        </h3>
                        <p className="text-base md:text-lg text-neutral-500 max-w-2xl leading-relaxed font-light pt-8">
                            Durante años, la respuesta al crecimiento fue comprar más aplicaciones aisladas. Un sistema para vender, otro para administrar, otro para facturar. El resultado nunca fue eficiencia; fue un ecosistema caótico donde la información se duplica, las decisiones son lentas y se pierde el control.
                        </p>
                    </div>
                </section>

                {/* 4. LAS CONEXIONES (Las 7 Capacidades de la Arquitectura) */}
                <section className="w-full max-w-4xl mx-auto px-4 py-32 md:py-48 border-t border-neutral-100">
                    <div className="mb-24 space-y-4">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-neutral-400">Arquitectura Base</h2>
                        <p className="text-2xl md:text-4xl font-bold tracking-tight text-black max-w-2xl leading-tight">
                            Siete capacidades fundamentales organizadas como un solo organismo.
                        </p>
                    </div>

                    <div className="relative border-l border-neutral-200 ml-2 space-y-20 py-4">
                        {[
                            { n: "01", title: "Adquisición", desc: "Control total del flujo de prospectos. Desde la atracción hasta la entrada al sistema central, generando demanda predecible." },
                            { n: "02", title: "Inteligencia", desc: "Capacidad autónoma de respuesta y pre-calificación. Procesamiento de interacciones sin necesidad de intervención humana inmediata." },
                            { n: "03", title: "Operación", desc: "El centro de gravedad de los datos. Registro único de clientes, inventario e historial para eliminar cualquier duplicidad." },
                            { n: "04", title: "Coordinación", desc: "Sincronía de procesos lógicos. Aseguramos que la información fluya de un estado a otro sin tareas repetitivas o manuales." },
                            { n: "05", title: "Finanzas", desc: "Capa transaccional integrada. Ejecución de cobros y emisión de documentación legal de manera invisible y fluida." },
                            { n: "06", title: "Análisis", desc: "Visibilidad consolidada del rendimiento. Extracción de métricas clave del sistema para entender el comportamiento real del negocio." },
                            { n: "07", title: "Dirección", desc: "Control gerencial absoluto. Visibilidad de rentabilidad, márgenes y costos de operación para guiar decisiones con certeza matemática." },
                        ].map((cap, i) => (
                            <div key={i} className="relative pl-8 md:pl-12 group">
                                {/* Conector */}
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                
                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 md:w-8">{cap.n}</span>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-bold text-black tracking-tight">{cap.title}</h3>
                                        <p className="text-sm md:text-base text-neutral-500 leading-relaxed font-light mt-2 max-w-xl">{cap.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. LA SOLUCIÓN */}
                <section className="w-full max-w-4xl mx-auto px-4 py-32 md:py-48 border-t border-neutral-100">
                    <div className="space-y-8">
                        <div className="w-1.5 h-1.5 bg-mercenario-danger rounded-full" />
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-[1.1]">
                            Mercenario IOS.
                        </h2>
                        <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-neutral-400 leading-[1.1]">
                            El Sistema Inteligente de Operaciones para Empresas.
                        </h3>
                        <p className="text-base md:text-lg text-neutral-500 max-w-2xl leading-relaxed font-light pt-8">
                            No es otro software. Construimos y configuramos la infraestructura operativa central de tu negocio, conectando a tus clientes, finanzas y operaciones sobre una misma red, eliminando el caos para siempre.
                        </p>
                    </div>
                </section>

                {/* 6. CONFIGURACIONES (Cómo se adapta) */}
                <section className="w-full max-w-6xl mx-auto px-4 py-32 md:py-48 border-t border-neutral-100">
                    <div className="mb-24 space-y-4">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-neutral-400">Adaptación Estructural</h2>
                        <p className="text-2xl md:text-4xl font-bold tracking-tight text-black max-w-3xl leading-tight">
                            Una misma infraestructura. Diferentes configuraciones según los flujos exactos de tu industria.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {[
                            { title: "Health", desc: "La operación clínica funcionando de forma sincronizada." },
                            { title: "Commerce", desc: "Negocio comercial e inventario centralizado en tiempo real." },
                            { title: "Field", desc: "Operaciones en terreno, despachos y logística en una sola vista." },
                            { title: "Gastro", desc: "Salón, cocina y administración operando a la misma velocidad." },
                            { title: "Pet", desc: "Historial de pacientes y control financiero en el mismo núcleo." },
                            { title: "Fit", desc: "Control de acceso y gestión de membresías consolidadas." },
                            { title: "Tech", desc: "Gestión de soporte, asignaciones y tiempos de respuesta unificados." },
                            { title: "Custom", desc: "La infraestructura esculpida para los procesos únicos de tu corporación." },
                        ].map((conf, i) => (
                            <div key={i} className="group border-t border-neutral-200 pt-6 flex flex-col hover:border-black transition-colors duration-500">
                                <h3 className="text-lg font-bold text-black tracking-tight flex items-center justify-between">
                                    {conf.title}
                                    <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-black transition-all duration-300 -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0" />
                                </h3>
                                <p className="text-sm text-neutral-500 leading-relaxed font-light mt-2">{conf.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. EVIDENCIA (Proyectos Reales) */}
                <section className="w-full pt-32 md:pt-48 flex flex-col items-center border-t border-neutral-100">
                    <div className="text-center space-y-4 z-10 mb-16">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-neutral-400">Despliegues</h2>
                        <p className="text-2xl md:text-4xl font-bold tracking-tight text-black max-w-xl mx-auto leading-tight">
                            Sistemas operando con éxito en entornos reales.
                        </p>
                    </div>

                    <div className="relative w-full flex overflow-hidden py-10">
                        {/* Gradientes laterales para difuminar */}
                        <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#FCFCFC] to-transparent z-20 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#FCFCFC] to-transparent z-20 pointer-events-none" />

                        <motion.div 
                            className="flex gap-8 px-4"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ ease: "linear", duration: 50, repeat: Infinity }}
                        >
                            {[...projects, ...projects, ...projects].map((project, idx) => (
                                <a 
                                    key={idx}
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col flex-shrink-0 w-[280px] md:w-[400px] group cursor-pointer"
                                >
                                    <div className="w-full aspect-[4/3] overflow-hidden bg-neutral-100 border border-neutral-200/60 mb-6 rounded-lg">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                                    </div>
                                    <div className="flex flex-col px-2">
                                        <p className="text-[10px] font-semibold text-neutral-400 tracking-wider uppercase mb-2">{project.cat}</p>
                                        <h3 className="text-lg font-bold text-black tracking-tight">{project.title}</h3>
                                        <p className="text-sm text-neutral-500 font-light mt-1">{project.desc}</p>
                                    </div>
                                </a>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 8. DIAGNÓSTICO (Formulario Minimalista) */}
                <motion.section id="contacto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full py-32 md:py-48 max-w-2xl mx-auto space-y-12 flex flex-col items-center border-t border-neutral-100 mt-24">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Recuperar el control.</h2>
                        <p className="text-sm text-neutral-500 font-light">Comienza el proceso de diagnóstico de tu infraestructura.</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="w-full space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">Empresa</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-neutral-200 py-3.5 text-sm focus:outline-none focus:border-black text-black transition-colors" required disabled={formStatus === "loading" || formStatus === "success"} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">Correo</label>
                                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-neutral-200 py-3.5 text-sm focus:outline-none focus:border-black text-black transition-colors" required disabled={formStatus === "loading" || formStatus === "success"} />
                            </div>
                        </div>
                        
                        <div className="space-y-2 pt-4">
                            <label className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest">Situación Operativa</label>
                            <input type="text" value={formData.challenge} onChange={(e) => setFormData({...formData, challenge: e.target.value})} className="w-full bg-transparent border-b border-neutral-200 py-3.5 text-sm focus:outline-none focus:border-black text-black placeholder:text-neutral-300 transition-colors" placeholder="Ej: Necesitamos centralizar la operación..." required disabled={formStatus === "loading" || formStatus === "success"} />
                        </div>
                        
                        {formStatus === "error" && (
                            <p className="text-mercenario-danger text-xs mt-4 text-center">No se pudo procesar la solicitud. Intente más tarde.</p>
                        )}
                        {formStatus === "success" && (
                            <p className="text-emerald-600 text-xs mt-4 text-center font-semibold">Diagnóstico solicitado con éxito. Nos comunicaremos en breve.</p>
                        )}

                        <div className="pt-8 flex justify-center">
                            <button 
                                type="submit" 
                                disabled={formStatus === "loading" || formStatus === "success"}
                                className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 transition-colors rounded-full"
                            >
                                {formStatus === "loading" ? "Procesando..." : formStatus === "success" ? "Completado" : (
                                    <><span>Iniciar Diagnóstico</span><ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.section>

            </main>

            {/* Stark footer */}
            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
