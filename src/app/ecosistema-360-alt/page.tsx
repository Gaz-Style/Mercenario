"use client";
import { motion } from "framer-motion";
import { ArrowRight, Crosshair, Terminal, Activity, Database, Link as LinkIcon, Cpu, AlertTriangle, ShieldCheck, ChevronRight, BarChart, Zap } from "lucide-react";
import { useState } from "react";

const Simulator = () => {
    const [revenue, setRevenue] = useState<number>(50000);
    const lostRevenue = revenue * 0.40;
    
    return (
        <div className="w-full max-w-xl mx-auto bg-[#0a0a0a] border border-white/[0.1] rounded-lg p-6 sm:p-8 mt-12 font-mono relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mercenario-danger/10 blur-3xl rounded-full" />
            <div className="flex items-center gap-2 mb-6 border-b border-white/[0.05] pb-4">
                <Terminal className="w-4 h-4 text-mercenario-danger" />
                <h3 className="text-xs uppercase tracking-widest text-white font-bold">Simulador de Fricci├│n Operativa_</h3>
            </div>
            
            <div className="space-y-6 relative z-10">
                <div>
                    <label className="text-[10px] text-neutral-400 uppercase tracking-widest mb-2 block">Facturaci├│n Mensual Estimada (USD)_</label>
                    <div className="flex items-center gap-4">
                        <input 
                            type="range" 
                            min="10000" 
                            max="500000" 
                            step="5000"
                            value={revenue} 
                            onChange={(e) => setRevenue(Number(e.target.value))}
                            className="w-full accent-mercenario-danger h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-sm font-bold text-white min-w-[90px] text-right">${revenue.toLocaleString()}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.05]">
                    <div className="space-y-1">
                        <span className="text-[9px] text-red-500 uppercase tracking-widest block">Fuga de Capital (40%)</span>
                        <span className="text-xl sm:text-2xl font-black text-red-500 tracking-tighter">-${lostRevenue.toLocaleString()}</span>
                        <p className="text-[8px] text-neutral-600 leading-tight pt-1">P├®rdida por latencia de repuesta, abandono de carrito y nulo seguimiento.</p>
                    </div>
                    <div className="space-y-1 border-l border-white/[0.05] pl-4">
                        <span className="text-[9px] text-emerald-500 uppercase tracking-widest block">Recuperaci├│n con IA</span>
                        <span className="text-xl sm:text-2xl font-black text-emerald-500 tracking-tighter">+${(lostRevenue * 0.85).toLocaleString()}</span>
                        <p className="text-[8px] text-neutral-600 leading-tight pt-1">Ingreso bloqueado mediante intercepci├│n autom├ítica y remarketing continuo.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function RevenueInfrastructure() {
    return (
        <div className="min-h-screen bg-[#010101] text-white font-sans antialiased selection:bg-mercenario-danger selection:text-white overflow-hidden">
            
            {/* 0. HEADER */}
            <header className="fixed top-0 left-0 w-full px-6 py-4 flex justify-between items-center z-50 bg-[#010101]/90 backdrop-blur-xl border-b border-white/[0.02]">
                <div className="flex items-center gap-2">
                    <Crosshair className="w-5 h-5 text-mercenario-danger" />
                    <span className="font-mono font-black tracking-widest text-[10px] sm:text-xs uppercase hidden sm:inline">Mercenario_</span>
                </div>
                <div className="hidden md:flex items-center gap-2 border border-white/[0.05] bg-white/[0.02] px-3 py-1 rounded">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-500">Sistemas Operativos_</span>
                </div>
                <a href="#auditoria" className="px-4 py-2 bg-white text-black font-bold text-[9px] sm:text-[10px] uppercase tracking-widest rounded shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-mercenario-danger hover:text-white transition-all font-mono">
                    [ INICIAR PROTOCOLO ]
                </a>
            </header>

            <main className="pt-32 pb-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-32 sm:space-y-40 relative z-10">
                
                {/* 1. EL HERO (La Intercepci├│n) */}
                <section className="text-center space-y-8 min-h-[75vh] flex flex-col items-center justify-center relative">
                    {/* Animated Nodes Background (CSS only conceptually) */}
                    <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                    
                    <div className="inline-flex items-center gap-2 border border-mercenario-danger/30 bg-mercenario-danger/5 px-4 py-1.5 rounded-full text-[10px] font-mono text-mercenario-danger uppercase tracking-widest font-bold">
                        <Terminal className="w-3 h-3" />
                        ESTADO: OPERACI├ôN AUT├ôNOMA
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.05] uppercase">
                        C├ôDIGO OPERATIVO:<br/>
                        <span className="text-neutral-600">REVENUE</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-mercenario-danger to-red-500 drop-shadow-[0_0_20px_rgba(255,17,34,0.4)]">INFRASTRUCTURE</span>
                    </h1>
                    
                    <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-2xl leading-relaxed">
                        No gestionamos su marketing. Codificamos su rentabilidad. Desplegamos la infraestructura t├®cnica que rastrea la intenci├│n, automatiza la confianza y asegura el cobro de punta a punta.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 w-full justify-center">
                        <a href="#auditoria" className="w-full sm:w-auto px-8 py-4 bg-mercenario-danger text-white font-black text-[10px] sm:text-xs uppercase tracking-widest rounded transition-all hover:bg-red-700 font-mono flex items-center justify-center gap-3">
                            [INICIAR PROTOCOLO DE AUDITOR├ìA] <ChevronRight className="w-4 h-4" />
                        </a>
                        <a href="#arquitectura" className="w-full sm:w-auto px-8 py-4 border border-white/20 text-neutral-300 hover:text-white font-bold text-[10px] sm:text-xs uppercase tracking-widest rounded transition-all hover:bg-white/5 font-mono">
                            [VER ARQUITECTURA T├ëCNICA]
                        </a>
                    </div>
                </section>

                {/* 2. EL DIAGN├ôSTICO (La Fricci├│n Humana) */}
                <section className="space-y-12">
                    <div className="text-center space-y-4">
                        <AlertTriangle className="w-8 h-8 text-neutral-600 mx-auto" />
                        <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-mono">EL CUBO AGUJEREADO_</h2>
                        <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-2xl mx-auto leading-relaxed">
                            La mayor├¡a de las empresas <strong className="text-red-500 font-bold hidden sm:inline">pierden el 40% de sus ingresos</strong> en el 'limbo' entre el clic y el cobro. El error humano, la demora en la respuesta y la falta de integraci├│n matan su LTV (Valor de Vida del Cliente).
                        </p>
                    </div>

                    {/* Gr├ífico Conceptual */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        <div className="p-8 border border-white/[0.05] bg-[#050505] rounded-xl flex flex-col items-center text-center opacity-60">
                            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-6 block">Marketing Tradicional (Desconexi├│n)</span>
                            <div className="flex flex-col gap-2 w-full max-w-xs">
                                <div className="px-4 py-2 border border-dashed border-white/20 text-[10px] font-mono text-neutral-400">Pauta Publicitaria</div>
                                <div className="w-full flex justify-center py-1"><div className="w-0.5 h-4 bg-white/20" /></div>
                                <div className="px-4 py-2 bg-red-900/10 border border-red-500/20 text-[10px] font-mono text-red-500">Demora Humana (Pierde 20%)</div>
                                <div className="w-full flex justify-center py-1"><div className="w-0.5 h-4 bg-white/20" /></div>
                                <div className="px-4 py-2 border border-dashed border-white/20 text-[10px] font-mono text-neutral-400">Equipo de Ventas Rebasado</div>
                            </div>
                        </div>
                        <div className="p-8 border border-mercenario-danger/30 bg-mercenario-danger/5 rounded-xl flex flex-col items-center text-center relative overflow-hidden shadow-[0_0_30px_rgba(255,17,34,0.05)]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-mercenario-danger/10 blur-2xl rounded-full" />
                            <span className="font-mono text-[10px] text-mercenario-danger uppercase tracking-widest mb-6 block relative z-10">Ecosistema Mercenario (Flujo)</span>
                            <div className="flex flex-col w-full max-w-xs relative z-10">
                                <div className="px-4 py-3 bg-white/5 border border-white/10 text-[10px] font-mono text-white rounded-t">Inbound Algor├¡tmico</div>
                                <div className="px-4 py-3 bg-mercenario-danger/20 border-x border-mercenario-danger/30 text-[10px] font-mono text-mercenario-danger font-bold flex items-center justify-center gap-2">
                                    <Zap className="w-3 h-3" /> Intercepci├│n IA (0s latencia)
                                </div>
                                <div className="px-4 py-3 bg-white/5 border border-white/10 text-[10px] font-mono text-white rounded-b">Cobro Automatizado</div>
                            </div>
                        </div>
                    </div>

                    <Simulator />
                </section>

                {/* 3. EL N├ÜCLEO T├ëCNICO: "THE REVENUE ENGINE" */}
                <section id="arquitectura" className="space-y-12 pt-10">
                    <div className="text-center space-y-4">
                        <Cpu className="w-8 h-8 text-neutral-600 mx-auto" />
                        <h2 className="text-3xl font-black uppercase tracking-tight font-mono">THE REVENUE ENGINE_</h2>
                        <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest">Desglose de Capacidad de Fuego T├®cnica</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { id: "A", title: "EL RADAR (Inteligencia Inbound)", tech: "Algoritmos de predicci├│n + GTM Server Side.", val: "Detectamos la intenci├│n de compra antes de que el lead sea un nombre. Personalizaci├│n din├ímica de landings seg├║n la patolog├¡a, modelo de auto o necesidad financiera.", icon: Activity },
                            { id: "B", title: "EL CEREBRO (IA & NLP Operativo)", tech: "Whisper (OpenAI) + NLP de sentimiento.", val: "Intercepci├│n conversacional 24/7. Nuestra IA no 'chatea'; analiza el miedo, la frustraci├│n o la urgencia del lead para calificarlo y cerrar la venta.", icon: Brain },
                            { id: "C", title: "LOS RIELES (Integraci├│n Cr├¡tica)", tech: "Conectividad nativa API (Imed, Fintech, Registros).", val: "Nos conectamos a las arterias de su industria. Cobro automatizado v├¡a pasarela y sincronizaci├│n con sistemas nacionales de salud o registros legales.", icon: LinkIcon },
                            { id: "D", title: "EL RETORNO (Ingenier├¡a de LTV)", tech: "Cron Jobs + Automatizaci├│n Inbound.", val: "La venta es el inicio. El sistema programa la fidelizaci├│n y la recompra de forma predictiva basado en el historial del usuario.", icon: Database }
                        ].map((block, i) => (
                            <div key={i} className="p-8 bg-[#050505] border border-white/[0.05] rounded-xl hover:border-mercenario-danger/30 transition-colors group">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 flex items-center justify-center border border-white/10 bg-white/[0.02] text-white font-mono font-bold group-hover:border-mercenario-danger/50 group-hover:text-mercenario-danger transition-colors">{block.id}</div>
                                    <h3 className="text-sm font-black uppercase font-mono tracking-tight">{block.title}</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="bg-[#020202] px-3 py-2 border border-white/[0.05] rounded text-[10px] font-mono">
                                        <span className="text-neutral-500 uppercase tracking-widest block mb-1">Stack / Tec:</span>
                                        <span className="text-mercenario-danger">{block.tech}</span>
                                    </div>
                                    <p className="text-xs text-neutral-400 font-mono leading-relaxed">{block.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. PRUEBA DE CAMPO (Reportes de Misi├│n) */}
                <section className="space-y-12">
                    <div className="text-center">
                        <h2 className="text-2xl font-black uppercase tracking-tight font-mono">REPORTES DE MISI├ôN_</h2>
                        <p className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest mt-2">Verticales de ├ëxito (Sin Bullshit)</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {[
                            { n: "Salud", res: "+180% en citas confirmadas.", metric: "Sincronizaci├│n Imed + Resumen Cl├¡nico IA" },
                            { n: "Automotriz", res: "Transformaci├│n de mercado informal a ecosistema de confianza.", metric: "Certificaci├│n de Garant├¡a EaaS" },
                            { n: "Fintech", res: "Maximizaci├│n de retenci├│n en entornos de alta rotaci├│n.", metric: "Predicci├│n Algor├¡tmica Operativa" }
                        ].map((m, i) => (
                            <div key={i} className="border border-white/[0.05] bg-[#030303] rounded p-6">
                                <div className="flex items-center gap-2 mb-4 border-b border-white/[0.05] pb-3">
                                    <div className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                                    <span className="font-mono text-[10px] font-bold text-white uppercase tracking-widest">CASO: {m.n}</span>
                                </div>
                                <div className="space-y-3">
                                    <span className="font-mono text-[9px] text-mercenario-danger uppercase tracking-widest">{m.metric}</span>
                                    <p className="font-mono text-sm text-neutral-300 font-bold leading-snug">"{m.res}"</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. LA "CAJA NEGRA" (Soberan├¡a Tecnol├│gica) */}
                <section className="bg-gradient-to-br from-[#0a0a0a] to-[#000] border border-white/[0.05] rounded-2xl p-8 sm:p-16 text-center space-y-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />
                    
                    <div className="relative z-10 space-y-4">
                        <ShieldCheck className="w-12 h-12 text-zinc-700 mx-auto" />
                        <h2 className="text-3xl font-black uppercase tracking-tight font-mono">LA CAJA NEGRA_</h2>
                        <strong className="text-mercenario-danger font-mono text-sm uppercase tracking-widest block">Soberan├¡a Tecnol├│gica Absoluta.</strong>
                    </div>
                    
                    <p className="text-neutral-300 text-lg font-mono max-w-2xl mx-auto relative z-10 leading-relaxed italic border-l-2 border-mercenario-danger pl-6 text-left">
                        "No somos una agencia de plantillas. Somos ingenieros de infraestructura. Desplegamos Infraestructura como C├│digo (IaC)."
                    </p>
                    
                    <div className="flex flex-wrap justify-center items-center gap-6 pt-6 relative z-10 opacity-50 grayscale">
                        {/* Simulated Tech Stack Logos via Text for speed, though SVGs are better */}
                        <span className="font-mono font-bold text-xl uppercase tracking-widest border border-white/20 px-4 py-2 rounded">TERRAFORM</span>
                        <span className="font-mono font-bold text-xl uppercase tracking-widest border border-white/20 px-4 py-2 rounded">DOCKER</span>
                        <span className="font-mono font-bold text-xl uppercase tracking-widest border border-white/20 px-4 py-2 rounded">PYTHON</span>
                        <span className="font-mono font-bold text-xl uppercase tracking-widest border border-white/20 px-4 py-2 rounded">NEXT.JS</span>
                    </div>

                    <p className="font-mono text-xs text-neutral-500 uppercase tracking-widest pt-4 relative z-10 border-t border-white/[0.05] inline-block mt-8">
                        Despliegue masivo en 48 horas con seguridad de grado industrial.
                    </p>
                </section>

                {/* 6. LA OFERTA: "OPERACI├ôN RECONOCIMIENTO" */}
                <section id="auditoria" className="py-12 border-y border-mercenario-danger/30 bg-mercenario-danger/5 relative">
                    <div className="max-w-3xl mx-auto text-center space-y-8 px-6">
                        <div className="space-y-4">
                            <span className="font-mono text-mercenario-danger font-bold text-[10px] uppercase tracking-[0.2em]">OFERTA LIMITADA: OPERACI├ôN RECONOCIMIENTO</span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">No compre el sistema.<br/>Pruebe la eficacia.</h2>
                        </div>
                        
                        <p className="font-mono text-sm md:text-base text-neutral-300 leading-relaxed">
                            Inicie con una auditor├¡a t├®cnica y una prueba de concepto (PoC) de 21 d├¡as por $1.000 USD. Recuperamos su base de datos muerta y demostramos el ROI matem├ítico <strong className="text-white">antes</strong> de construir su Ecosistema 360 completo.
                        </p>
                        
                        <div className="pt-6">
                            <button className="w-full sm:w-auto px-10 py-5 bg-mercenario-danger text-white font-black text-xs uppercase tracking-widest rounded transition-all hover:bg-red-700 font-mono shadow-[0_0_40px_rgba(255,17,34,0.4)] hover:scale-105">
                                [ RESERVAR CUPO DE DESPLIEGUE ]
                            </button>
                        </div>
                    </div>
                </section>

                {/* EL MANIFIESTO (Consejo Estrat├®gico del Footer) */}
                <section className="text-center max-w-4xl mx-auto pt-10">
                    <h3 className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest mb-6">MANIFIESTO DE INGENIER├ìA_</h3>
                    <p className="font-mono text-[11px] sm:text-xs text-neutral-500 leading-relaxed text-justify sm:text-center px-4">
                        Tener el mejor producto del mercado ya no es suficiente. Si su proceso comercial depende exclusivamente del esfuerzo humano, de vendedores que no hacen seguimiento a tiempo, o de campa├▒as que tiran datos crudos a correos electr├│nicos esperando un milagro... su negocio est├í dise├▒ado para fallar en el volumen. Un humano se cansa, olvida y procrastina. Una infraestructura aut├│noma no descansa, no perdona un lead y obedece al algoritmo de rentabilidad absoluta. <strong>Cualquier otra opci├│n en 2026 es un juguete corporativo.</strong> Bienvenidas sean las operaciones aut├│nomas.
                    </p>
                </section>

            </main>

            {/* 7. FOOTER */}
            <footer className="w-full bg-[#000] border-t border-white/[0.03] py-10 mt-10">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-mercenario-danger" />
                        <span className="font-mono font-bold tracking-widest text-[9px] uppercase text-neutral-500">REVENUE_INFRASTRUCTURE © {new Date().getFullYear()}</span>
                    </div>
                    <div className="flex gap-6 font-mono text-[9px] uppercase tracking-widest text-neutral-600">
                        <span className="hover:text-white transition-colors cursor-pointer">Protocolos de Privacidad</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Seguridad de Datos</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Soporte Operativo</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

const Brain = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
);
