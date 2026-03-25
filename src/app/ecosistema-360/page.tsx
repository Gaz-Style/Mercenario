"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Target, Crosshair, Network, GitMerge, Database, Zap, RefreshCw, BarChart, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Ecosistema360() {
    return (
        <div className="min-h-screen bg-[#010101] text-neutral-300 font-sans selection:bg-mercenario-danger/30 selection:text-white pb-32">
            
            {/* NAV / BACK BUTTON */}
            <nav className="w-full fixed top-0 z-50 bg-[#010101]/80 backdrop-blur-md border-b border-white/[0.05]">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Volver a Base</span>
                    </Link>
                    <div className="flex items-center gap-2 opacity-50">
                        <Crosshair className="w-4 h-4 text-mercenario-danger" />
                        <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-white">Documento_Desclasificado</span>
                    </div>
                </div>
            </nav>

            <main className="pt-32">
                {/* HERO */}
                <section className="max-w-4xl mx-auto px-6 text-center space-y-6 mb-24">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block border border-mercenario-danger/30 bg-mercenario-danger/5 px-4 py-1.5 rounded-full mb-4">
                        <span className="text-[9px] font-mono text-mercenario-danger font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-mercenario-danger animate-pulse"></span>
                            INFORME ESTRATÉGICO Y HOJA DE RUTA
                        </span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-black font-mono uppercase text-white leading-tight">
                        EL CEREBRO <span className="text-mercenario-danger">OPERATIVO</span><br/>ECOSISTEMA 360_
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="font-mono text-sm md:text-base text-neutral-400 max-w-3xl mx-auto leading-relaxed border-l-2 border-mercenario-danger/50 pl-6 text-left italic">
                        "La agencia se posiciona como una Unidad de Ingeniería de Ingresos. No entregamos servicios aislados; instalamos un Cerebro Operativo que gestiona el ciclo de vida completo del cliente."
                    </motion.p>
                </section>

                {/* ARCHITECTURE GRAPHIC PROP */}
                <section className="w-full max-w-6xl mx-auto px-6 mb-32">
                    <div className="w-full aspect-video md:aspect-[21/9] bg-[#030303] border border-white/5 flex flex-col items-center justify-center relative overflow-hidden rounded-lg group">
                        <div className="absolute inset-0 bg-[url('/imagenes/ejecutados/neuroV.jpeg')] bg-cover bg-center opacity-10 grayscale mix-blend-overlay"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-transparent z-10"></div>
                        
                        <div className="relative z-20 flex flex-col items-center gap-6 p-8">
                            <Network className="w-16 h-16 text-mercenario-danger/50 group-hover:text-mercenario-danger group-hover:scale-110 transition-all duration-700" />
                            <h3 className="font-mono text-xl md:text-2xl font-black uppercase text-white tracking-widest text-center">Arquitectura de Nodo Central</h3>
                            <p className="font-mono text-[10px] text-neutral-500 max-w-lg text-center leading-relaxed">Representación visual requerida [VIDEO/DIAGRAMA]. El núcleo de procesamiento conecta la adquisición externa con el CRM interno operado por modelos de lenguaje.</p>
                        </div>
                    </div>
                </section>

                {/* 5 AREAS DE TRABAJO */}
                <section className="max-w-5xl mx-auto px-6 space-y-24">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-black font-mono uppercase text-white border-b border-white/10 pb-6 inline-block">5 COMPONENTES DE LA INFRAESTRUCTURA_</h2>
                    </div>

                    {[
                        { num: "01", title: "Inyección de Demanda (Atracción)", icon: Target, resp: "Generar tráfico calificado de alta intención al menor costo.", tasks: ["Generación de Activos Dinámicos (SEO/Ads)", "Optimización de Puja en Tiempo Real", "Minado y Retargeting Predictivo"] },
                        { num: "02", title: "Intercepción Conversacional (SDR 24/7)", icon: MessageSquare, resp: "Capturar interés inmediato y filtrar prospectos de alto valor.", tasks: ["Atención y Resolución de Dudas Complejas", "Triage y Perfilamiento de Datos", "OCR: Extracción de info de Facturas/IDs"] },
                        { num: "03", title: "Ingeniería Operativa (Pipes & APIs)", icon: Cpu, resp: "Eliminar la carga administrativa y enlazar software.", tasks: ["Sincronización de Datos a ERP/CRM", "Gestión de Agendamientos Directo a Calendario", "Impresión de Contratos/Presupuestos Auto"] },
                        { num: "04", title: "Nutrición y Persistencia (Cierre)", icon: Zap, resp: "Maximizar conversión mediante seguimiento infatigable.", tasks: ["Mailings y WhatsApp Follow-Ups Personalizados", "Educación de Leads por Comportamiento", "Gestión de Objeciones Pasivas"] },
                        { num: "05", title: "Fidelización y LTV (Valor de Vida)", icon: RefreshCw, resp: "Transformar clientes en activos prolongados.", tasks: ["Minería de Reviews y SEO Orgánico", "Activación Proactiva de Recompra", "Intervención de Escalamiento Humano en Quejas"] }
                    ].map((area, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row gap-8 items-start relative pb-12 border-b border-white/[0.02] last:border-0 group">
                            <div className="md:w-1/3 flex flex-col gap-4">
                                <div className="text-6xl font-black font-mono text-white/5 group-hover:text-mercenario-danger/20 transition-colors absolute -left-4 -top-8 -z-10">{area.num}</div>
                                <area.icon className="w-8 h-8 text-mercenario-danger" />
                                <h3 className="text-xl font-black font-mono uppercase text-white leading-tight">{area.title}_</h3>
                                <p className="font-mono text-[10px] text-mercenario-danger uppercase tracking-widest leading-relaxed">OBJ: {area.resp}</p>
                            </div>
                            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {area.tasks.map((task, tIdx) => (
                                    <div key={tIdx} className="bg-[#050505] border border-white/[0.05] p-5 rounded hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-2 mb-3"><GitMerge className="w-4 h-4 text-neutral-500" /><span className="text-[10px] font-mono font-bold text-white uppercase">{`Tarea Operativa ${tIdx+1}`}</span></div>
                                        <p className="font-mono text-xs text-neutral-400 leading-relaxed">{task}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* ROADMAP */}
                <section className="max-w-4xl mx-auto px-6 mt-32 mb-16">
                    <div className="bg-[#020202] border border-white/10 p-8 md:p-12 rounded-xl relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 p-4 opacity-5"><BarChart className="w-48 h-48" /></div>
                        <h2 className="text-2xl font-black font-mono uppercase text-white mb-2 relative z-10">HOJA DE RUTA DE INTEGRACIÓN_</h2>
                        <p className="font-mono text-xs text-neutral-500 mb-12 relative z-10">4 Fases para acoplar el Sistema Autónomo a cualquier nicho.</p>
                        
                        <div className="space-y-4 relative z-10 text-left">
                            {[
                                { fase: "Fase 1", name: "Configuración del Nodo Central", desc: "Infraestructura puente entre canales de captación y sistemas internos." },
                                { fase: "Fase 2", name: "Entrenamiento IA Especializado", desc: "Alimentación de modelos de LLM con conocimiento de nicho (Salud, Legal, etc.)." },
                                { fase: "Fase 3", name: "Despliegue de Rutas API", desc: "Mapeo y conexión bidireccional de los softwares de gestión del cliente." },
                                { fase: "Fase 4", name: "Activación del Dashboard 360", desc: "Despliegue de paneles de lectura para visualización del ROI en tiempo real." }
                            ].map((f, i) => (
                                <div key={i} className="flex gap-4 p-4 border border-white/5 rounded bg-black hover:border-mercenario-danger/30 transition-colors">
                                    <div className="text-mercenario-danger font-mono font-black text-sm uppercase shrink-0 pt-0.5">{f.fase}</div>
                                    <div>
                                        <h4 className="font-mono text-xs font-bold text-white uppercase mb-1">{f.name}_</h4>
                                        <p className="font-mono text-[10px] text-neutral-500 leading-relaxed max-w-xl">{f.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center px-6 mt-24">
                    <Link href="/#contacto" className="inline-flex items-center justify-center gap-3 bg-white hover:bg-neutral-200 text-black font-black py-4 px-8 rounded text-sm uppercase tracking-widest transition-all font-mono group">
                        SOLICITAR INSTALACIÓN DE SISTEMA <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </section>

            </main>
        </div>
    );
}
