"use client";
import { motion } from "framer-motion";
import { Terminal, Database, ShieldAlert, Cpu, Network, Server, Zap, Lock, DollarSign, Activity, FileKey, Stethoscope, Car, Gamepad2, AlertOctagon } from "lucide-react";

export default function RevenueInfrastructureV2() {
    return (
        <div className="min-h-screen bg-[#000] text-white font-sans antialiased selection:bg-mercenario-danger selection:text-white overflow-hidden">
            
            {/* 0. NAVBAR */}
            <header className="fixed top-0 left-0 w-full px-4 sm:px-6 py-4 flex flex-col md:flex-row justify-between items-center z-50 bg-[#000]/90 backdrop-blur-xl border-b border-white/[0.05]">
                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start mb-4 md:mb-0">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-mercenario-danger" />
                        <span className="font-mono font-black tracking-widest text-[10px] sm:text-xs uppercase">Mercenario_</span>
                    </div>
                    <div className="flex sm:hidden items-center gap-2 border border-white/[0.05] bg-white/[0.02] px-2 py-1 rounded">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="font-mono text-[8px] uppercase tracking-widest text-emerald-500">SYS_ONLINE</span>
                    </div>
                </div>
                
                <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-neutral-500 w-full md:w-auto">
                    <a href="#core" className="hover:text-white transition-colors">[ PROTOCOLOS ]</a>
                    <a href="#iac" className="hover:text-white transition-colors">[ ARQUITECTURA ]</a>
                    <a href="#verticales" className="hover:text-white transition-colors">[ VERTICALES ]</a>
                </nav>
                
                <a href="#cta" className="hidden md:flex px-4 py-2 bg-mercenario-danger text-white font-bold text-[9px] uppercase tracking-widest rounded transition-all hover:bg-red-700 font-mono items-center gap-2">
                    <Zap className="w-3 h-3" />
                    [ DESPLEGAR INFRAESTRUCTURA ]
                </a>
            </header>

            <main className="pt-32 sm:pt-40 pb-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-28 sm:space-y-40 relative z-10">
                
                {/* 1. HERO */}
                <section className="text-center space-y-8 flex flex-col items-center justify-center relative min-h-[60vh]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-mercenario-danger/5 blur-[100px] -z-10 rounded-full pointer-events-none" />
                    
                    <div className="inline-flex items-center gap-3 border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 rounded-sm text-[9px] sm:text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-bold">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        DEJE DE HACER MARKETING. INSTALE UN PROTOCOLO DE COBRO.
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1] uppercase py-4">
                        No capturamos leads.<br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-mercenario-danger to-red-600">Automatizamos transacciones.</span>
                    </h1>
                    
                    <p className="text-neutral-400 text-xs sm:text-sm font-mono max-w-2xl leading-relaxed mx-auto">
                        Desplegamos infraestructura de software (PaaS) que integra captaci&oacute;n algor&iacute;tmica con pasarelas de pago y sistemas de salud. Si el sistema no cierra la venta y procesa el cobro, no sirve.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 pt-6">
                        {[
                            { l: "Latency", v: "<200ms" },
                            { l: "Uptime", v: "99.9%" },
                            { l: "Conv. Opt.", v: "AI-Driven" }
                        ].map((d, i) => (
                            <div key={i} className="flex flex-col items-center border border-white/5 bg-[#050505] px-6 py-3 rounded">
                                <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest mb-1">{d.l}</span>
                                <span className="font-mono font-black text-white text-sm sm:text-base">{d.v}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 2. EL DIAGN&Oacute;STICO */}
                <section className="space-y-12 border-t border-white/[0.05] pt-20">
                    <div className="text-center space-y-4">
                        <AlertOctagon className="w-10 h-10 text-red-500 mx-auto" />
                        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">LA DEUDA T&Eacute;CNICA ES P&Eacute;RDIDA DE CAJA</h2>
                        <p className="font-mono text-neutral-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
                            La mayor&iacute;a de los negocios operan con sistemas fragmentados. Su marketing no habla con su CRM, y su CRM no sabe procesar una API financiera. <strong className="text-white">Esa fricci&oacute;n es dinero que se queda en la mesa.</strong>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { t: "Abandono de Checkout", d: "Sin intercepci&oacute;n por eventos, el 70% de sus clics son basura." },
                            { t: "Cero Trazabilidad LTV", d: "Usted no sabe cu&aacute;nto vale su cliente en 12 meses porque no tiene datos, tiene una lista de nombres." },
                            { t: "Carga Operativa Humana", d: "Si su venta depende de una secretaria, su negocio no es escalable. Es una artesan&iacute;a." }
                        ].map((err, i) => (
                            <div key={i} className="p-6 border border-mercenario-danger/20 bg-mercenario-danger/5 rounded-lg space-y-3 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-mercenario-danger/10 blur-xl rounded-full" />
                                <span className="font-mono text-mercenario-danger font-black text-2xl opacity-20 absolute -top-2 -right-1 block">0{i+1}</span>
                                <h3 className="font-mono font-bold text-xs uppercase tracking-widest text-red-400 relative z-10">{err.t}</h3>
                                <p className="font-mono text-[10px] text-neutral-300 leading-relaxed relative z-10">{err.d}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. EL CORE: ARQUITECTURA DE TRIPLE CAPA */}
                <section id="core" className="space-y-12">
                    <div className="text-center space-y-4">
                        <Network className="w-10 h-10 text-neutral-700 mx-auto" />
                        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight">ARQUITECTURA DE TRIPLE CAPA</h2>
                        <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">Protocolo de Asalto Omnicanal</p>
                    </div>

                    <div className="space-y-6">
                        {[
                            { num: "01", name: "EL RADAR", sub: "Detecci&oacute;n Algor&iacute;tmica", tech: "Seguimiento Server-Side y eventos de intenci&oacute;n profunda.", val: "Inyectamos pauta en Meta/Google que no busca 'alcance', busca disparar eventos de conversi&oacute;n. Si el lead tiene intenci&oacute;n de compra, el sistema lo rastrea; si no, lo descarta." },
                            { num: "02", name: "LA INTERCEPCI&Oacute;N", sub: "Capa Cognitiva NLP", tech: "Modelos LLM personalizados + Whisper para transcripci&oacute;n cl&iacute;nica/comercial.", val: "Nuestra IA no es un chat de opciones. Es un agente conversacional con l&oacute;gica de negocio. Califica el dolor del paciente o el estado del veh&iacute;culo, resuelve objeciones financieras y cierra la cita mediante integraci&oacute;n nativa con calendarios y CRM." },
                            { num: "03", name: "LOS RIELES", sub: "Integraci&oacute;n de Transacci&oacute;n", tech: "Conexi&oacute;n v&iacute;a Webhooks a Imed, Stripe, y ERPs propietarios.", val: "El sistema no 'pide informaci&oacute;n'; procesa pagos y genera documentos. Fichas cl&iacute;nicas generadas por IA post-consulta, certificados de garant&iacute;a automotriz con firma digital y flujos de cobro recurrente." }
                        ].map((capa, i) => (
                            <div key={i} className="flex flex-col md:flex-row border border-white/[0.05] bg-[#030303] rounded-xl overflow-hidden group hover:border-white/20 transition-colors">
                                <div className="md:w-1/3 bg-[#060606] p-6 lg:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/[0.05] relative overflow-hidden">
                                    <div className="absolute -bottom-8 -left-8 font-mono font-black text-8xl text-white/[0.02] pointer-events-none">{capa.num}</div>
                                    <span className="font-mono text-mercenario-danger text-[10px] font-bold uppercase tracking-widest mb-2 relative z-10">CAPA {capa.num}</span>
                                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter relative z-10">{capa.name}</h3>
                                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest mt-1 relative z-10">{capa.sub}</span>
                                </div>
                                <div className="md:w-2/3 p-6 lg:p-8 space-y-4 flex flex-col justify-center">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0a0a0a] border border-white/[0.05] rounded text-[9px] font-mono text-emerald-400 capitalize">
                                        <Database className="w-3 h-3" />
                                        <span dangerouslySetInnerHTML={{ __html: capa.tech }} />
                                    </div>
                                    <p className="font-mono text-xs sm:text-sm text-neutral-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: capa.val }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. VERTICALES */}
                <section id="verticales" className="space-y-12 border-t border-white/[0.05] pt-20">
                    <div className="text-center space-y-4">
                        <Activity className="w-10 h-10 text-neutral-700 mx-auto" />
                        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">DESPLIEGUES PROBADOS</h2>
                        <p className="font-mono text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                            No somos generalistas. Instalamos soluciones en industrias con alta fricci&oacute;n operativa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { i: Stethoscope, n: "HEALTH-OS", d: "Integraci&oacute;n nativa con <strong class='text-white'>Imed</strong>. Sincronizaci&oacute;n de bonos, pagos de copago y fichas cl&iacute;nicas automatizadas." },
                            { i: Car, n: "AUTO-TRUST", d: "Infraestructura de certificaci&oacute;n. Conexi&oacute;n con APIs de registro vehicular para avalar garant&iacute;as automotrices en tiempo real." },
                            { i: Gamepad2, n: "FINTECH / GAMING", d: "Sistemas de retenci&oacute;n basados en comportamiento algor&iacute;tmico. Optimizaci&oacute;n predictiva para entornos de rotaci&oacute;n masiva." }
                        ].map((v, i) => (
                            <div key={i} className="p-8 border border-white/[0.05] bg-[#050505] rounded-lg text-center space-y-4 hover:bg-[#080808] transition-colors">
                                <v.i className="w-8 h-8 text-neutral-500 mx-auto" />
                                <h3 className="font-mono text-sm font-bold uppercase tracking-widest text-white">{v.n}</h3>
                                <p className="font-mono text-[10px] text-neutral-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: v.d }} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. IaC */}
                <section id="iac" className="bg-[#020202] border border-white/[0.1] rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] blur-3xl rounded-full pointer-events-none" />
                    
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2 space-y-6 relative z-10">
                            <div className="inline-flex items-center gap-2 border border-white/20 px-3 py-1 rounded text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                                <Server className="w-3 h-3" /> INFRAESTRUCTURA COMO C&Oacute;DIGO (IaC)
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1]">Para los que dudan<br/>de la escala.</h2>
                            <p className="font-mono text-sm text-neutral-400 leading-relaxed">
                                Nosotros no creamos "p&aacute;ginas". Escribimos la arquitectura que procesa transacciones industriales.
                            </p>
                        </div>
                        
                        <div className="lg:w-1/2 space-y-4 w-full relative z-10">
                            {[
                                { ic: FileKey, t: "Despliegue Terraform & Docker", d: "Clonado masivo de ecosistemas estandarizados en 48 horas exactas." },
                                { ic: Lock, t: "Cifrado de Grado Bancario", d: "Protocolos avanzados para protecci&oacute;n estricta de datos (Salud / Finanzas)." },
                                { ic: ShieldAlert, t: "Soberan&iacute;a de Datos Absoluta", d: "Usted es due&ntilde;o de su base de datos. Nosotros s&oacute;lo de la inteligencia que la hace rentable." }
                            ].map((iac, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 border border-white/[0.05] bg-[#000] rounded">
                                    <iac.ic className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-mono text-[10px] font-bold text-white uppercase tracking-widest" dangerouslySetInnerHTML={{ __html: iac.t }} />
                                        <p className="font-mono text-[9px] text-neutral-500 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: iac.d }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. MODELO DE INVERSI&Oacute;N */}
                <section className="space-y-12 border-t border-white/[0.05] pt-20">
                    <div className="text-center space-y-4">
                        <DollarSign className="w-10 h-10 text-emerald-500 mx-auto" />
                        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">REVENUE SHARE & SETUP</h2>
                        <p className="font-mono text-neutral-400 text-xs sm:text-sm font-bold uppercase tracking-widest">Modelo de Inversi&oacute;n Industrial</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:px-12">
                        {[
                            { l: "Setup de Ingenier&iacute;a", p: "Desde $2.500 USD", c: "Construcci&oacute;n de rieles t&eacute;cnicos, despliegue IaC e integraciones API." },
                            { l: "Retainer Operativo", p: "$1.200 USD / mes", c: "Mantenimiento activo de APIs, optimizaci&oacute;n LLM y creaci&oacute;n de contenido t&aacute;ctico." },
                            { l: "Recompensa (Success Fee)", p: "% Facturaci&oacute;n", c: "Porcentaje sobre transacciones autom&aacute;ticas cerradas exclusivamente por el sistema." }
                        ].map((pr, i) => (
                            <div key={i} className="bg-[#050505] p-8 border border-white/[0.05] rounded-xl text-center flex flex-col justify-between group hover:border-emerald-500/30 transition-colors relative overflow-hidden">
                                {i === 2 && <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />}
                                <div>
                                    <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block mb-4" dangerouslySetInnerHTML={{ __html: pr.l }} />
                                    <h3 className={`text-2xl font-black font-mono tracking-tighter ${i===2 ? 'text-emerald-500' : 'text-white'}`} dangerouslySetInnerHTML={{ __html: pr.p }} />
                                </div>
                                <p className="font-mono text-[10px] text-neutral-400 mt-6 pt-6 border-t border-white/[0.03] leading-relaxed" dangerouslySetInnerHTML={{ __html: pr.c }} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. CTA / OFERTA */}
                <section id="cta" className="py-20 border border-mercenario-danger/30 bg-[#060000] rounded-2xl relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[300px] bg-mercenario-danger/10 blur-[100px] -z-10 pointer-events-none rounded-full" />
                    
                    <div className="max-w-4xl mx-auto text-center space-y-8 px-6 relative z-10">
                        <div className="space-y-4">
                            <span className="font-mono text-mercenario-danger font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em]">OFERTA T&Aacute;CTICA: OPERACI&Oacute;N RECONOCIMIENTO</span>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">No vendemos promesas.<br/>Vendemos una<br className="sm:hidden"/>prueba de concepto.</h2>
                        </div>
                        
                        <p className="font-mono text-sm md:text-base text-neutral-300 leading-relaxed max-w-3xl mx-auto italic border-l-2 border-mercenario-danger pl-6 text-left sm:text-center block">
                            "Invierta <strong className="text-white bg-mercenario-danger/20 px-1">$1.000 USD</strong> hoy para reactivar su base de datos actual. Si mi IA no genera ventas tangibles en 21 d&iacute;as, usted no tiene un problema de marketing, <strong className="text-mercenario-danger">tiene un negocio inviable.</strong>"
                        </p>
                        
                        <div className="pt-8">
                            <button className="w-full sm:w-auto px-6 sm:px-12 py-5 sm:py-6 bg-mercenario-danger text-white font-black text-xs sm:text-sm uppercase tracking-widest rounded transition-all hover:bg-red-700 font-mono shadow-[0_0_50px_rgba(255,17,34,0.4)] hover:scale-105">
                                [ INICIAR PROTOCOLO DE AUDITOR&Iacute;A ]
                            </button>
                        </div>
                    </div>
                </section>
                
            </main>

            {/* FOOTER */}
            <footer className="w-full bg-[#000] border-t border-white/[0.03] py-8 sm:py-12 mt-10 relative z-10">
                <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-neutral-600" />
                        <span className="font-mono font-bold tracking-widest text-[9px] uppercase text-neutral-600">REVENUE_INFRASTRUCTURE_OS &copy; {new Date().getFullYear()}</span>
                    </div>
                    <div className="flex gap-4 sm:gap-6 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-neutral-600 flex-wrap justify-center">
                        <span className="hover:text-white transition-colors cursor-pointer">Protocolos</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Seguridad</span>
                        <span className="hover:text-white transition-colors cursor-pointer">Desempe&ntilde;o</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
