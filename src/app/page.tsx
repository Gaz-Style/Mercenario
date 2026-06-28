"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
    ChevronRight, 
    ArrowRight,
    ArrowUpRight
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
    const [formData, setFormData] = useState({ name: "", email: "", challenge: "", budget: "" });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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
        <div className="min-h-screen bg-[#050505] text-white font-sans antialiased flex flex-col items-center selection:bg-white selection:text-black">
            
            {/* Header: Ultra minimal */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-white/[0.04] bg-[#050505]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-mercenario-danger rounded-full" />
                        <span className="text-[11px] font-medium tracking-widest text-white uppercase flex items-center gap-2">
                            MERCENARIO <span className="text-white/20">|</span> <span className="text-white/50">IOS</span>
                        </span>
                    </div>
                    <Link href="#contacto" className="text-[11px] font-medium tracking-widest text-white/50 hover:text-white uppercase transition-colors">
                        Iniciar Diagnóstico
                    </Link>
                </div>
            </header>

            <main className="w-full max-w-7xl mx-auto px-6 pt-32 sm:pt-48 pb-32 z-10 flex flex-col items-center">

                {/* 1. HERO - Una sola idea. Mucho espacio negativo. */}
                <section className="text-center max-w-5xl pt-16 pb-32 md:pb-48 space-y-8 flex flex-col items-center w-full">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col items-center gap-8">
                        
                        <div className="inline-flex items-center gap-2 border border-white/[0.08] px-4 py-1.5 rounded-full text-[10px] font-medium text-white/60 tracking-widest uppercase">
                            <span className="w-1 h-1 bg-mercenario-danger rounded-full"></span>
                            Categoría: Infraestructura Operativa
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-[5rem] lg:text-[6rem] font-medium tracking-tighter leading-[1.05] text-white">
                            La infraestructura operativa <br className="hidden md:block" />
                            <span className="text-white/40">donde funciona tu empresa.</span>
                        </h1>

                        <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light tracking-wide mt-4">
                            Una sola plataforma. Un solo flujo de datos. Una sola fuente de verdad. Centralizamos toda la operación de tu negocio sobre un núcleo operativo diseñado para el orden absoluto.
                        </p>

                        <div className="pt-8">
                            <a href="#contacto" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-full">
                                <span>Recuperar el Control</span>
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                </section>

                {/* 2. EL PROBLEMA - Ritmo visual y pausa absoluta */}
                <section className="w-full max-w-4xl mx-auto px-4 py-32 md:py-48 space-y-12">
                    <div className="space-y-8">
                        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1]">
                            Las empresas no dejan de crecer por falta de talento.
                        </h2>
                        <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-white/40 leading-[1.1]">
                            Dejan de crecer porque operan sobre sistemas fragmentados.
                        </h3>
                        <p className="text-base text-white/50 max-w-2xl leading-relaxed font-light pt-8">
                            Durante años, la respuesta al crecimiento fue comprar más aplicaciones aisladas. Un sistema para vender, otro para administrar, otro para facturar. El resultado nunca fue eficiencia; fue un ecosistema caótico donde la información se duplica, las decisiones son lentas y se pierde el control.
                        </p>
                    </div>
                </section>

                {/* 3. LA SOLUCIÓN */}
                <section className="w-full max-w-4xl mx-auto px-4 py-32 md:py-48 border-t border-white/[0.04]">
                    <div className="space-y-8">
                        <div className="w-1.5 h-1.5 bg-mercenario-danger rounded-full" />
                        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white leading-[1.1]">
                            Mercenario IOS.
                        </h2>
                        <h3 className="text-2xl md:text-4xl font-medium tracking-tight text-white/40 leading-[1.1]">
                            El Sistema Inteligente de Operaciones para Empresas.
                        </h3>
                        <p className="text-base text-white/50 max-w-2xl leading-relaxed font-light pt-8">
                            No es otro software. Construimos y configuramos la infraestructura operativa central de tu negocio, conectando a tus clientes, finanzas y operaciones sobre una misma red, eliminando el caos para siempre.
                        </p>
                    </div>
                </section>

                {/* 4. LA ARQUITECTURA (Nodos Conectados, No Módulos) */}
                <section className="w-full max-w-4xl mx-auto px-4 py-32 md:py-48">
                    <div className="mb-24 space-y-4">
                        <h2 className="text-sm font-medium tracking-widest uppercase text-white/40">Arquitectura Base</h2>
                        <p className="text-2xl md:text-3xl font-medium tracking-tight text-white max-w-2xl leading-tight">
                            Siete capacidades fundamentales organizadas como un solo organismo.
                        </p>
                    </div>

                    <div className="relative border-l border-white/[0.1] ml-2 space-y-16 py-4">
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
                                {/* Nodo conector */}
                                <div className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-mercenario-danger transition-colors duration-500" />
                                
                                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
                                    <span className="text-[10px] font-mono tracking-widest text-white/30 md:w-8">{cap.n}</span>
                                    <div>
                                        <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">{cap.title}</h3>
                                        <p className="text-sm text-white/50 leading-relaxed font-light mt-2 max-w-xl">{cap.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. LAS CONFIGURACIONES (Misma infraestructura, formas distintas) */}
                <section className="w-full max-w-6xl mx-auto px-4 py-32 md:py-48 border-t border-white/[0.04]">
                    <div className="mb-24 space-y-4">
                        <h2 className="text-sm font-medium tracking-widest uppercase text-white/40">Adaptación Estructural</h2>
                        <p className="text-2xl md:text-3xl font-medium tracking-tight text-white max-w-3xl leading-tight">
                            Una misma infraestructura. Diferentes configuraciones según los flujos exactos de tu industria.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
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
                            <div key={i} className="group border-t border-white/[0.06] pt-6 flex flex-col hover:border-white/20 transition-colors duration-500">
                                <h3 className="text-lg font-medium text-white tracking-tight flex items-center justify-between">
                                    {conf.title}
                                    <ArrowUpRight className="w-4 h-4 text-white/0 group-hover:text-white/30 transition-all duration-300 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                                </h3>
                                <p className="text-sm text-white/40 leading-relaxed font-light mt-2">{conf.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. EVIDENCIA (Proyectos Reales) */}
                <section className="w-full pt-32 md:pt-48 flex flex-col items-center">
                    <div className="text-center space-y-4 z-10 mb-16">
                        <h2 className="text-sm font-medium tracking-widest uppercase text-white/40">Despliegues</h2>
                        <p className="text-2xl md:text-3xl font-medium tracking-tight text-white max-w-xl mx-auto leading-tight">
                            Sistemas operando con éxito en entornos reales.
                        </p>
                    </div>

                    <div className="relative w-full flex overflow-hidden py-10">
                        {/* Gradientes laterales para difuminar */}
                        <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

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
                                    <div className="w-full aspect-[4/3] overflow-hidden bg-[#0a0a0a] border border-white/[0.04] mb-6">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                                    </div>
                                    <div className="flex flex-col px-2">
                                        <p className="text-[10px] font-medium text-white/40 tracking-widest uppercase mb-2">{project.cat}</p>
                                        <h3 className="text-lg font-medium text-white tracking-tight">{project.title}</h3>
                                        <p className="text-sm text-white/50 font-light mt-1">{project.desc}</p>
                                    </div>
                                </a>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* 7. DIAGNÓSTICO (Formulario Ultra Minimalista) */}
                <motion.section id="contacto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full py-32 md:py-48 max-w-2xl mx-auto space-y-12 flex flex-col items-center border-t border-white/[0.04] mt-24">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white">Recuperar el control.</h2>
                        <p className="text-sm text-white/50 font-light">Comienza el proceso de diagnóstico de tu infraestructura.</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="w-full space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-medium text-white/40 uppercase tracking-widest">Empresa</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent border-b border-white/[0.1] py-3 text-sm focus:outline-none focus:border-white text-white transition-colors" required disabled={formStatus === "loading" || formStatus === "success"} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-medium text-white/40 uppercase tracking-widest">Correo</label>
                                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent border-b border-white/[0.1] py-3 text-sm focus:outline-none focus:border-white text-white transition-colors" required disabled={formStatus === "loading" || formStatus === "success"} />
                            </div>
                        </div>
                        
                        <div className="space-y-2 pt-4">
                            <label className="text-[11px] font-medium text-white/40 uppercase tracking-widest">Situación Operativa</label>
                            <input type="text" value={formData.challenge} onChange={(e) => setFormData({...formData, challenge: e.target.value})} className="w-full bg-transparent border-b border-white/[0.1] py-3 text-sm focus:outline-none focus:border-white text-white placeholder:text-white/20 transition-colors" placeholder="Ej: Necesitamos centralizar la operación..." required disabled={formStatus === "loading" || formStatus === "success"} />
                        </div>
                        
                        {formStatus === "error" && (
                            <p className="text-mercenario-danger text-[11px] mt-4 text-center">No se pudo procesar la solicitud. Intente más tarde.</p>
                        )}
                        {formStatus === "success" && (
                            <p className="text-white text-[11px] mt-4 text-center">Diagnóstico solicitado. En breve entraremos en contacto.</p>
                        )}

                        <div className="pt-8 flex justify-center">
                            <button 
                                type="submit" 
                                disabled={formStatus === "loading" || formStatus === "success"}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-200 disabled:bg-white/10 disabled:text-white/30 transition-colors rounded-full"
                            >
                                {formStatus === "loading" ? "Procesando..." : formStatus === "success" ? "Completado" : (
                                    <><span>Iniciar Diagnóstico</span><ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.section>

            </main>

            <footer className="w-full py-12 text-center text-[10px] text-white/30 tracking-widest uppercase">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
