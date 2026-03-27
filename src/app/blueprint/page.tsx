"use client";
import { motion } from "framer-motion";
import { Network, Server, ArrowRight, Activity, ShieldCheck, Zap, Terminal, Database, FileText, Search, Settings, Lock } from "lucide-react";

export default function Blueprint() {
    return (
        <div className="min-h-screen bg-[#000] text-white font-sans antialiased selection:bg-mercenario-danger selection:text-white overflow-hidden pb-32">
            
            {/* HEADER */}
            <header className="w-full px-6 py-4 flex justify-between items-center bg-[#000]/90 border-b border-white/[0.05] sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-mercenario-danger" />
                    <span className="font-mono font-black tracking-widest text-[10px] sm:text-xs uppercase">BLUEPRINT_ARCH</span>
                </div>
                <a href="#contacto" className="px-4 py-1.5 bg-white/5 border border-white/10 text-white font-bold text-[9px] uppercase tracking-widest rounded hover:bg-mercenario-danger hover:border-mercenario-danger transition-all font-mono flex items-center gap-2 block">
                    [ DESCARGAR DUMP ]
                </a>
            </header>

            <main className="pt-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-20 sm:space-y-32">
                
                {/* 1. HERO */}
                <section className="text-center space-y-6">
                    <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 px-3 py-1 rounded text-[9px] sm:text-[10px] font-mono text-blue-400 uppercase tracking-widest">
                        <Terminal className="w-3 h-3" /> ESTRUCTURA L&Oacute;GICA Y OPERATIVA
                    </div>
                    
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                        SERVICE BLUEPRINT WEB
                    </h1>
                    
                    <p className="font-mono text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                        Un blueprint no se limita a la est&eacute;tica; estructura la web como un <strong className="text-white">motor de conversi&oacute;n t&eacute;cnico y operativo</strong>. Combina el "Frontstage" visual con los procesos implacables del "Backstage".
                    </p>
                </section>

                {/* 1. MAPA DEL SITIO ESTRAT&Eacute;GICO */}
                <section className="space-y-12">
                    <div className="border-l-2 border-mercenario-danger pl-4">
                        <h2 className="text-2xl font-black uppercase tracking-tight font-mono">1. MAPA DEL SITIO (SITEMAP ESTRAT&Eacute;GICO)</h2>
                        <p className="font-mono text-[10px] text-neutral-500 uppercase mt-1">L&oacute;gica de embudo de servicio_</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Box 1 */}
                        <div className="p-6 bg-[#030303] border border-white/[0.05] rounded group hover:border-white/20 transition-colors">
                            <h3 className="font-mono font-bold text-sm text-red-400 uppercase mb-3 flex items-center gap-2"><Search className="w-4 h-4" />/ Home & Autoridad</h3>
                            <p className="font-mono text-[11px] text-neutral-400 leading-relaxed">
                                Comunicaci&oacute;n de la Propuesta &Uacute;nica de Venta (USP) en &lt; 5 segundos. Nombra el problema del cliente con su jerga t&eacute;cnica.
                            </p>
                            <ul className="mt-4 space-y-2 font-mono text-[10px] text-neutral-500 border-t border-white/[0.05] pt-4">
                                <li>&gt; Hero Section (Problema directo)</li>
                                <li>&gt; Logotipos & Autoridad</li>
                                <li>&gt; N&uacute;meros duros y ROI</li>
                            </ul>
                        </div>

                        {/* Box 2 */}
                        <div className="p-6 bg-[#030303] border border-white/[0.05] rounded group hover:border-white/20 transition-colors">
                            <h3 className="font-mono font-bold text-sm text-blue-400 uppercase mb-3 flex items-center gap-2"><Database className="w-4 h-4" />/ Servicios Paquetizados</h3>
                            <p className="font-mono text-[11px] text-neutral-400 leading-relaxed mb-4">
                                Cero servicios vagos. Paquetes de infraestructura claros para facilitar y acelerar la toma de decisi&oacute;n B2B.
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                                <div className="px-3 py-2 bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono text-neutral-300"><strong className="text-white">STARTER (2-4 sem):</strong> Orden inicial.</div>
                                <div className="px-3 py-2 bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono text-neutral-300"><strong className="text-white">GROWTH (3-5 sem):</strong> Aceleraci&oacute;n y escala.</div>
                                <div className="px-3 py-2 bg-white/[0.02] border border-white/[0.05] text-[10px] font-mono text-mercenario-danger border-mercenario-danger/30"><strong className="text-mercenario-danger">ELITE (8+ sem):</strong> Ecosistema Completo + IA.</div>
                            </div>
                        </div>

                        {/* Box 3 */}
                        <div className="p-6 bg-[#030303] border border-white/[0.05] rounded group hover:border-white/20 transition-colors">
                            <h3 className="font-mono font-bold text-sm text-emerald-400 uppercase mb-3 flex items-center gap-2"><Activity className="w-4 h-4" />/ Casos de &Eacute;xito</h3>
                            <p className="font-mono text-[11px] text-neutral-400 leading-relaxed">
                                Estructura algor&iacute;tmica de validaci&oacute;n: <br/> [Problema Real] &rarr; [Arquitectura Aplicada] &rarr; [M&eacute;trica Final M&aacute;xima].
                            </p>
                        </div>

                        {/* Box 4 */}
                        <div className="p-6 bg-mercenario-danger/5 border border-mercenario-danger/20 rounded group hover:border-mercenario-danger/40 transition-colors">
                            <h3 className="font-mono font-bold text-sm text-mercenario-danger uppercase mb-3 flex items-center gap-2"><Zap className="w-4 h-4" />/ Lead Magnet (Auditor&iacute;a)</h3>
                            <p className="font-mono text-[11px] text-neutral-300 leading-relaxed">
                                P&aacute;gina dedicada de alta fricci&oacute;n para ofrecer un "Diagn&oacute;stico T&eacute;cnico" (velocidad, SEO, arquitectura). S&oacute;lo califica a prospectos sobre cierto umbral de facturaci&oacute;n.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 2. CAPAS DEL BLUEPRINT */}
                <section className="space-y-12">
                    <div className="border-l-2 border-blue-500 pl-4">
                        <h2 className="text-2xl font-black uppercase tracking-tight font-mono">2. CAPAS DEL SERVICE BLUEPRINT</h2>
                        <p className="font-mono text-[10px] text-neutral-500 uppercase mt-1">Intersecci&oacute;n entre el usuario y la M&aacute;quina_</p>
                    </div>

                    <div className="border border-white/[0.05] bg-[#020202] rounded-lg overflow-x-auto">
                        <table className="w-full text-left font-mono text-[10px] sm:text-xs">
                            <thead>
                                <tr className="border-b border-white/[0.1] bg-white/[0.02] text-neutral-400 uppercase tracking-widest">
                                    <th className="p-4 sm:p-6 w-1/3">Capa Operativa</th>
                                    <th className="p-4 sm:p-6 w-2/3">Implementaci&oacute;n T&eacute;cnica en Sitio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { c: "Evidencia F&iacute;sica", v: "Dise&ntilde;o m&oacute;vil-first, SSL encriptado, Core Web Vitals (90+). Interfaz minimalista.", color: "text-white" },
                                    { c: "Acciones Cliente", v: "Visita de landing, consumo de logs t&eacute;cnicos, intercepci&oacute;n en Click-to-WhatsApp.", color: "text-neutral-300" },
                                    { c: "Frontstage (Interacci&oacute;n)", v: "Chatbot IA de primera l&iacute;nea, agendamiento de auditor&iacute;as en tiempo real (0s latencia).", color: "text-blue-400" },
                                    { c: "Backstage (Procesos)", v: "Integraci&oacute;n nativa CRM. Calificaci&oacute;n algor&iacute;tmica del lead (Scoring predictivo).", color: "text-mercenario-danger" },
                                    { c: "Sistemas Soporte", v: "Infraestructura de baja latencia. Cron jobs automatizados de marketing y data warehousing.", color: "text-emerald-500" }
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-white/[0.02] hover:bg-white/[0.01]">
                                        <td className={`p-4 sm:p-6 font-bold uppercase tracking-wider ${row.color}`}>{row.c}</td>
                                        <td className="p-4 sm:p-6 text-neutral-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: row.v }} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 3. PILARES T&Eacute;CNICOS */}
                <section className="space-y-12">
                    <div className="border-l-2 border-emerald-500 pl-4">
                        <h2 className="text-2xl font-black uppercase tracking-tight font-mono">3. PILARES T&Eacute;CNICOS DE CONVERSI&Oacute;N</h2>
                        <p className="font-mono text-[10px] text-neutral-500 uppercase mt-1">Reglas duras de infraestructura_</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 border border-white/[0.05] bg-[#030303] rounded hover:border-emerald-500/30 transition-colors">
                            <h3 className="font-mono font-bold text-sm text-white uppercase mb-4 flex items-center gap-2"><Search className="w-4 h-4 text-emerald-500" /> SEO 360&deg;</h3>
                            <p className="font-mono text-[11px] text-neutral-400 leading-relaxed mb-4">
                                Estructura sem&aacute;ntica dise&ntilde;ada no solo para Google, sino para ser inyectada en <strong className="text-white">sistemas LLM (ChatGPT, Perplexity)</strong> como fuente de autoridad primaria.
                            </p>
                        </div>
                        
                        <div className="p-6 border border-white/[0.05] bg-[#030303] rounded hover:border-emerald-500/30 transition-colors">
                            <h3 className="font-mono font-bold text-sm text-white uppercase mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500" /> VELOCIDAD VITAL</h3>
                            <p className="font-mono text-[11px] text-neutral-400 leading-relaxed mb-4">
                                Cumplimiento militar en Core Web Vitals para evitar rebotes de leads premium:
                            </p>
                            <div className="space-y-2 mt-4 font-mono text-[10px] font-bold text-center">
                                <div className="px-3 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded">LCP &le; 2.5s (Largest Contentful Paint)</div>
                                <div className="px-3 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded">FID &le; 100ms (First Input Delay)</div>
                            </div>
                        </div>

                        <div className="p-6 border border-white/[0.05] bg-[#030303] rounded hover:border-emerald-500/30 transition-colors">
                            <h3 className="font-mono font-bold text-sm text-white uppercase mb-4 flex items-center gap-2"><Network className="w-4 h-4 text-emerald-500" /> CLI-TO-WSP (C-Commerce)</h3>
                            <p className="font-mono text-[11px] text-neutral-400 leading-relaxed mb-4">
                                Conversational Commerce. Destrucci&oacute;n de formularios est&aacute;ticos largos. Sustituci&oacute;n por <strong className="text-white">Click-to-WhatsApp</strong> integrados a agentes IA para intercepci&oacute;n inmediata.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. ELEMENTOS DE CONFIANZA Y CIERRE */}
                <section className="space-y-12 pb-20">
                    <div className="border-l-2 border-white pl-4">
                        <h2 className="text-2xl font-black uppercase tracking-tight font-mono">4. ELEMENTOS DE CONFIANZA Y CIERRE</h2>
                        <p className="font-mono text-[10px] text-neutral-500 uppercase mt-1">El vendedor digital que opera 24/7/365_</p>
                    </div>

                    <div className="bg-[#020202] border border-white/[0.05] p-6 sm:p-10 rounded-xl space-y-8">
                        <p className="font-mono text-sm text-neutral-300">
                            Para reducir el riesgo percibido por el "cliente mercenario" que busca valor asim&eacute;trico inmediato, el blueprint exige inyectar los siguientes nodos de f&eacute;:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center border border-white/10"><FileText className="w-4 h-4 text-white" /></div>
                                <h4 className="font-mono font-bold text-[11px] uppercase tracking-widest text-white">1. SLA (Service Level Agreement)</h4>
                                <p className="font-mono text-[10px] text-neutral-500">Tiempos de entrega inquebrantables por fase. Ej: Auditor&iacute;a exacta en &lt; 48 horas operativas.</p>
                            </div>
                            <div className="space-y-3">
                                <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center border border-white/10"><Lock className="w-4 h-4 text-white" /></div>
                                <h4 className="font-mono font-bold text-[11px] uppercase tracking-widest text-white">2. Transparencia IP</h4>
                                <p className="font-mono text-[10px] text-neutral-500">Acuerdos cristalinos: El cliente es el &uacute;nico due&ntilde;o de la infraestructura, datos y entregables post-pago.</p>
                            </div>
                            <div className="space-y-3">
                                <div className="w-8 h-8 rounded bg-mercenario-danger/10 flex items-center justify-center border border-mercenario-danger/30"><ShieldCheck className="w-4 h-4 text-mercenario-danger" /></div>
                                <h4 className="font-mono font-bold text-[11px] uppercase tracking-widest text-mercenario-danger">3. CTA Off-Risk</h4>
                                <p className="font-mono text-[10px] text-neutral-400">Llamados a la acci&oacute;n sin dolor. "Estrategia Primero", "Consultor&iacute;a T&eacute;cnica", bajando la barrera de decisi&oacute;n.</p>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/[0.05] flex justify-center">
                            <button className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs font-mono hover:bg-neutral-200 transition-colors flex items-center gap-2">
                                [ EJECUTAR BLUEPRINT ] <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </section>
                
            </main>
        </div>
    );
}
