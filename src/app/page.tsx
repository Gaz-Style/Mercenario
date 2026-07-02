"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
    ChevronRight, 
    ArrowRight,
    ArrowUpRight,
    Play,
    RotateCcw,
    ChevronDown,
    Menu,
    X
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import HeroV2 from "@/components/HeroV2";
import OperationMap from "@/components/OperationMap";

export default function Home() {
    const [formData, setFormData] = useState({ name: "", email: "", challenge: "", budget: "", _honeypot: "" });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    
    // Navigation Menu States
    const [activeMenu, setActiveMenu] = useState<"experiencia" | "soluciones" | "operacion" | "integraciones" | "conocimiento" | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const menuItems = {
        experiencia: [
            { label: "¿Qué es la experiencia de cliente?", href: "/centro-de-conocimiento/que-es-experiencia-de-cliente" },
            { label: "Vive la experiencia", href: "/experiencia/vive-la-experiencia" },
            { label: "Casos reales", href: "#" }
        ],
        soluciones: [
            { label: "Salud", href: "/soluciones/health" },
            { label: "Comercio", href: "/soluciones/comercio" },
            { label: "Gastronomía", href: "/soluciones/gastronomia" },
            { label: "Servicios", href: "/soluciones/servicios" },
            { label: "Terreno", href: "/soluciones/terreno" },
            { label: "Gimnasios", href: "/soluciones/gimnasios" },
            { label: "Veterinarias", href: "/soluciones/veterinarias" },
            { label: "Tecnología", href: "/soluciones/tecnologia" },
            { label: "Personalizado", href: "/soluciones/personalizadas" }
        ],
        operacion: [
            { label: "¿Cómo funciona una empresa?", href: "/operacion/como-funciona-una-empresa" },
            { label: "¿Qué es una operación conectada?", href: "/operacion/operacion-conectada" },
            { label: "El flujo de información", href: "/operacion/informacion" },
            { label: "Centro de Operaciones", href: "/operacion/centro-de-operaciones" },
            { label: "Marketing", href: "/operacion/marketing" },
            { label: "Comunicación y Chats", href: "/operacion/comunicacion" },
            { label: "Administración", href: "/operacion/administracion" },
            { label: "Acto Médico", href: "/operacion/acto-medico" },
            { label: "Todas las empresas", href: "/operacion/todas-empresas" },
            { label: "Así comienza una implementación", href: "/operacion/como-se-soluciona" },
            { label: "CRM", href: "/operacion/crm" },
            { label: "Agenda", href: "/operacion/agenda" },
            { label: "Pagos", href: "/operacion/pagos" },
            { label: "Facturación", href: "/operacion/facturacion" },
            { label: "ERP", href: "/operacion/erp" },
            { label: "Reportes", href: "/operacion/reportes" },
            { label: "Caja", href: "/operacion/caja" },
            { label: "Inventario", href: "/operacion/inventario" },
            { label: "IA", href: "/operacion/ia" },
            { label: "Multiagentes", href: "/operacion/multiagentes" },
            { label: "Automatizaciones", href: "/operacion/automatizaciones" }
        ],
        integraciones: [
            { label: "¿Puedo usar mis herramientas?", href: "/integraciones/no-necesitas-comenzar-de-cero" },
            { label: "SII", href: "#" },
            { label: "IMED", href: "/centro-de-conocimiento/que-es-imed" },
            { label: "Fonasa", href: "/centro-de-conocimiento/que-es-fonasa" },
            { label: "Previred", href: "#" },
            { label: "WhatsApp", href: "#" },
            { label: "Meta", href: "#" },
            { label: "Google", href: "#" },
            { label: "Outlook", href: "#" },
            { label: "Mercado Pago", href: "#" },
            { label: "Transbank", href: "#" },
            { label: "API", href: "#" },
            { label: "Webhooks", href: "#" }
        ],
        conocimiento: [
            { label: "¿Qué es un ERP?", href: "/centro-de-conocimiento/que-es-un-erp" },
            { label: "¿Qué es un CRM?", href: "/centro-de-conocimiento/que-es-un-crm" },
            { label: "¿Qué es una API?", href: "/centro-de-conocimiento/que-es-una-api" },
            { label: "¿Qué es IMED?", href: "/centro-de-conocimiento/que-es-imed" },
            { label: "¿Qué es Fonasa?", href: "/centro-de-conocimiento/que-es-fonasa" },
            { label: "¿Qué es un webhook?", href: "/centro-de-conocimiento/que-es-un-webhook" },
            { label: "¿Qué es conciliación bancaria?", href: "/centro-de-conocimiento/que-es-conciliacion-bancaria" },
            { label: "¿Qué es SEO?", href: "/centro-de-conocimiento/que-es-seo" },
            { label: "¿Qué es CX?", href: "/centro-de-conocimiento/que-es-experiencia-de-cliente" },
            { label: "Operación fragmentada", href: "/centro-de-conocimiento/que-es-una-operacion-fragmentada" }
        ]
    };



    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Honeypot anti-spam check
        if (formData._honeypot) {
            setFormStatus("success");
            setFormData({ name: "", email: "", challenge: "", budget: "", _honeypot: "" });
            setTimeout(() => setFormStatus("idle"), 5000);
            return;
        }

        setFormStatus("loading");
        const { error } = await supabase
            .from("leads")
            .insert([{ name: formData.name, email: formData.email, challenge: formData.challenge, budget: formData.budget }]);

        if (error) {
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 4000);
        } else {
            setFormStatus("success");
            setFormData({ name: "", email: "", challenge: "", budget: "", _honeypot: "" });
            setTimeout(() => setFormStatus("idle"), 5000);
        }
    };

    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white" onMouseLeave={() => setActiveMenu(null)}>
            
            {/* Header: Ultra minimal, stark white with Mega Menu */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC] backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center relative z-50 bg-[#FCFCFC]">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 bg-mercenario-danger rounded-full" />
                            <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase flex items-center gap-2">
                                MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">IOS</span>
                            </span>
                        </Link>

                        {/* Navigation Mega Links */}
                        <nav className="hidden lg:flex items-center gap-6 text-[10px] font-semibold tracking-wider text-neutral-400 uppercase select-none">
                            <div className="relative cursor-pointer py-2 hover:text-black transition-colors flex items-center gap-1" onMouseEnter={() => setActiveMenu("experiencia")}>
                                <span>Experiencia</span>
                                <ChevronDown className="w-3 h-3" />
                            </div>
                            <div className="relative cursor-pointer py-2 hover:text-black transition-colors flex items-center gap-1" onMouseEnter={() => setActiveMenu("soluciones")}>
                                <span>Soluciones</span>
                                <ChevronDown className="w-3 h-3" />
                            </div>
                            <div className="relative cursor-pointer py-2 hover:text-black transition-colors flex items-center gap-1" onMouseEnter={() => setActiveMenu("operacion")}>
                                <span>Operación</span>
                                <ChevronDown className="w-3 h-3" />
                            </div>
                            <div className="relative cursor-pointer py-2 hover:text-black transition-colors flex items-center gap-1" onMouseEnter={() => setActiveMenu("integraciones")}>
                                <span>Integraciones</span>
                                <ChevronDown className="w-3 h-3" />
                            </div>
                            <div className="relative cursor-pointer py-2 hover:text-black transition-colors flex items-center gap-1" onMouseEnter={() => setActiveMenu("conocimiento")}>
                                <span>Centro de Conocimiento</span>
                                <ChevronDown className="w-3 h-3" />
                            </div>
                        </nav>
                    </div>

                    <Link href="#contacto" className="hidden lg:block text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        Iniciar Diagnóstico
                    </Link>

                    <button 
                        className="lg:hidden p-2 -mr-2 text-black"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -10 }} 
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-full h-[calc(100vh-60px)] bg-[#FCFCFC] border-t border-neutral-100 z-50 overflow-y-auto lg:hidden flex flex-col"
                        >
                            <div className="px-6 py-8 flex flex-col space-y-6">
                                {Object.entries(menuItems).map(([categoryKey, items]) => (
                                    <div key={categoryKey} className="border-b border-neutral-100 pb-4">
                                        <button 
                                            onClick={() => setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey)}
                                            className="w-full flex items-center justify-between py-2 text-[13px] font-bold tracking-widest text-black uppercase"
                                        >
                                            {categoryKey === "conocimiento" ? "Centro de Conocimiento" : categoryKey}
                                            <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategory === categoryKey ? "rotate-180" : ""}`} />
                                        </button>
                                        
                                        <AnimatePresence>
                                            {expandedCategory === categoryKey && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="flex flex-col space-y-3 pt-4 pl-2">
                                                        {items.map((item, idx) => (
                                                            <Link 
                                                                key={idx} 
                                                                href={item.href}
                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                className="text-sm font-medium text-neutral-500 hover:text-black flex items-center gap-2"
                                                            >
                                                                <div className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                                                                {item.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                                <Link 
                                    href="#contacto" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full mt-6 py-4 bg-black text-white text-center text-[11px] font-semibold tracking-widest uppercase rounded-full"
                                >
                                    Iniciar Diagnóstico
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Dropdown panel */}
                <AnimatePresence>
                    {activeMenu && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -10 }} 
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="absolute top-full inset-x-0 bg-[#FCFCFC] border-b border-neutral-100 shadow-sm z-40 py-10 px-6 max-h-[400px] overflow-y-auto"
                        >
                            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                                {menuItems[activeMenu].map((item, idx) => (
                                    <Link 
                                        key={idx} 
                                        href={item.href}
                                        onClick={() => setActiveMenu(null)}
                                        className="group text-[11px] tracking-wide text-neutral-500 hover:text-black transition-colors py-2 block font-medium"
                                    >
                                        <span className="flex items-center justify-between border-b border-neutral-100 pb-1 group-hover:border-black transition-colors">
                                            {item.label}
                                            <ChevronRight className="w-3 h-3 text-neutral-300 group-hover:text-black transition-colors -translate-x-1 group-hover:translate-x-0" />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <main className="w-full flex flex-col items-center">
                
                {/* 1. HERO V2 - El Punto de Quiebre */}
                <HeroV2 />

                {/* Contenido posterior al Hero */}
                <div className="w-full bg-white text-black relative z-20 flex flex-col items-center">

                {/* SECCIÓN: El Problema y La Solución (Comparación) */}
                <section className="w-full max-w-5xl mx-auto px-4 pt-24 md:pt-32 pb-16 md:pb-24 space-y-12">
                    <div className="space-y-4 max-w-3xl">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">El Diagnóstico</span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                            Dos formas de operar.<br />
                            <span className="text-neutral-400 font-semibold">Solo una escala.</span>
                        </h2>
                        <p className="text-base text-neutral-500 leading-relaxed font-light pt-2 max-w-2xl">
                            La mayoría de las empresas no tienen un problema de talento. Tienen un problema de operación. La información vive atrapada en herramientas que no se hablan entre sí.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Lado A: Sin Mercenario */}
                        <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-100 space-y-5">
                            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
                                <div className="w-2 h-2 rounded-full bg-mercenario-danger" />
                                <h3 className="text-sm font-bold text-black">La operación fragmentada</h3>
                            </div>
                            <ul className="text-xs text-neutral-500 space-y-3 font-medium">
                                <li className="flex items-start gap-2"><span className="mt-0.5 text-neutral-300">·</span>El cliente agenda por teléfono. Alguien lo anota en un cuaderno.</li>
                                <li className="flex items-start gap-2"><span className="mt-0.5 text-neutral-300">·</span>El cobro se hace en otro sistema. Nadie registra el historial.</li>
                                <li className="flex items-start gap-2"><span className="mt-0.5 text-neutral-300">·</span>El recordatorio depende de que alguien lo recuerde enviar.</li>
                                <li className="flex items-start gap-2"><span className="mt-0.5 text-neutral-300">·</span>El mes cierra y nadie sabe exactamente cuánto se generó.</li>
                            </ul>
                            <p className="text-xs text-mercenario-danger font-semibold pt-2">Tiempo del dueño ocupado en tareas operativas, no en crecer.</p>
                        </div>

                        {/* Lado B: Con Mercenario */}
                        <div className="bg-black p-8 rounded-2xl border border-black space-y-5">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                <h3 className="text-sm font-bold text-white">La operación conectada</h3>
                            </div>
                            <ul className="text-xs text-neutral-400 space-y-3 font-medium">
                                <li className="flex items-start gap-2"><span className="mt-0.5 text-neutral-600">·</span>El cliente agenda online. El sistema confirma, registra y notifica.</li>
                                <li className="flex items-start gap-2"><span className="mt-0.5 text-neutral-600">·</span>El pago activa la factura automáticamente.</li>
                                <li className="flex items-start gap-2"><span className="mt-0.5 text-neutral-600">·</span>El recordatorio llega por WhatsApp sin que nadie lo envíe.</li>
                                <li className="flex items-start gap-2"><span className="mt-0.5 text-neutral-600">·</span>Al cierre del mes, el dashboard refleja cada número en tiempo real.</li>
                            </ul>
                            <p className="text-xs text-emerald-400 font-semibold pt-2">El dueño se concentra en el negocio. La operación se ejecuta sola.</p>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN: La Operación Viva (Mapa de Metro) */}
                <section className="w-full border-t border-neutral-100">
                    <div className="w-full max-w-5xl mx-auto px-4 pt-16 md:pt-24 pb-4 flex flex-col items-start">
                        <div className="text-left max-w-2xl mb-4 md:mb-8 space-y-4">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Operación Viva</span>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                                Imagina que cada acción desencadena la siguiente.
                            </h2>
                            <p className="text-base text-neutral-500 max-w-2xl leading-relaxed font-light pt-2">
                                Sin copiar información. Sin repetir tareas. Sin depender de que alguien recuerde hacerlo.
                            </p>
                        </div>
                    </div>
                    <OperationMap />
                </section>

                {/* SECCIÓN: Conectividad (Integraciones + Logos) */}
                <section className="w-full max-w-5xl mx-auto px-4 pt-16 md:pt-24 pb-32 md:pb-48 space-y-12 border-t border-neutral-100">
                    <div className="space-y-4">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Conectividad Nata</span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                            Tu empresa ya tiene todo lo necesario. <br />
                            <span className="text-neutral-400 font-semibold">Solo necesita empezar a trabajar como una.</span>
                        </h2>
                        <p className="text-base text-neutral-500 max-w-2xl leading-relaxed font-light pt-4">
                            Conectamos las herramientas que ya utilizas. No necesitas cambiar la forma en que trabajas. Necesitas que todo comience a conversar.
                        </p>
                    </div>

                    {/* Infinite Scrolling Marquee of Logos */}
                    <div className="relative w-full overflow-hidden py-4" style={{ maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)" }}>
                        <div className="flex gap-3 w-max animate-marquee py-2">
                            {Array.from({ length: 20 }, (_, i) => `/imagenes/logos herramientas con fondo/${i + 1}.png`)
                                .concat(Array.from({ length: 20 }, (_, i) => `/imagenes/logos herramientas con fondo/${i + 1}.png`))
                                .map((src, idx) => {
                                    const isSpecial = src.endsWith("/10.png") || // Fonasa
                                                      src.endsWith("/11.png") || // CENS
                                                      src.endsWith("/12.png") || // Previred
                                                      src.endsWith("/13.png") || // IMED
                                                      src.endsWith("/17.png") || // LinkedIn
                                                      src.endsWith("/4.png")  || // WhatsApp API
                                                      src.endsWith("/1.png");    // HL7 FHIR
                                    return (
                                        <div key={idx} className={`w-32 h-18 md:w-40 md:h-22 flex items-center justify-center border border-neutral-100 rounded-xl bg-white/80 backdrop-blur-sm grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:border-neutral-300 hover:shadow-sm transition-all duration-300 select-none ${isSpecial ? 'p-1.5' : 'p-3'}`}>
                                            <img src={src} alt={`Logo ${idx + 1}`} className={`w-full h-full object-contain ${isSpecial ? 'scale-135' : ''}`} />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>

                    <p className="text-xs text-neutral-400 font-medium italic pt-4">
                        Cada empresa es distinta. Por eso cada operación se diseña de forma personalizada.
                    </p>
                </section>

                {/* SECCIÓN: Soluciones por Industria */}
                <section className="w-full max-w-5xl mx-auto px-4 py-32 md:py-48 border-t border-neutral-100 space-y-16">
                    <div className="space-y-4 max-w-3xl">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Sistemas de Trabajo</span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                            Una solución para cada operación.
                        </h2>
                        <p className="text-base text-neutral-500 leading-relaxed font-light pt-2 max-w-2xl">
                            No existe una solución universal porque no existe una empresa universal. Cada implementación parte desde cómo funciona tu negocio hoy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Clínicas y Salud",
                                href: "/soluciones/health",
                                tag: "Sector salud",
                                description: "Desde la agenda médica hasta la emisión de bonos Fonasa e Isapre. El historial clínico, los recordatorios y los cobros funcionan como una sola unidad.",
                                capabilities: ["Agenda", "Bonos", "Ficha clínica", "Pagos", "Recordatorios", "Reportes"]
                            },
                            {
                                title: "Centros Estéticos",
                                href: "/soluciones/health",
                                tag: "Estética y bienestar",
                                description: "Gestión de paquetes de sesiones, seguimiento de clientes, fidelización automática y marketing integrado con WhatsApp y correo.",
                                capabilities: ["Reservas", "Paquetes", "Recordatorios", "Cobros", "Marketing", "Fidelización"]
                            },
                            {
                                title: "Retail y Comercio",
                                href: "/soluciones/comercio",
                                tag: "Comercio",
                                description: "Control de inventario en tiempo real, punto de venta integrado con facturación SII y gestión de clientes recurrentes.",
                                capabilities: ["Ventas", "Inventario", "Facturación SII", "Clientes", "Automatizaciones"]
                            },
                            {
                                title: "Empresas de Servicios",
                                href: "/soluciones/servicios",
                                tag: "Servicios B2B",
                                description: "Pipeline de cotizaciones, gestión de proyectos activos, alertas de cobranza y renovaciones de contratos. Todo conectado.",
                                capabilities: ["Cotizaciones", "Proyectos", "Cobranza", "CRM", "Seguimiento"]
                            }
                        ].map((sector, i) => (
                            <Link key={i} href={sector.href} className="group bg-neutral-50 hover:bg-neutral-100 border border-neutral-100 hover:border-neutral-200 rounded-2xl p-8 space-y-5 transition-all duration-300 flex flex-col">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">{sector.tag}</span>
                                        <h3 className="text-lg font-bold text-black tracking-tight mt-1">{sector.title}</h3>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 mt-1 shrink-0" />
                                </div>
                                <p className="text-xs text-neutral-500 font-light leading-relaxed flex-1">{sector.description}</p>
                                <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-200">
                                    {sector.capabilities.map((cap, cIdx) => (
                                        <span key={cIdx} className="text-[10px] font-semibold tracking-wide text-neutral-500 bg-white border border-neutral-200 rounded-full px-2.5 py-1">{cap}</span>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* SECCIÓN: Impacto de Negocio con stat blocks */}
                <section className="w-full max-w-5xl mx-auto px-4 py-32 md:py-48 border-t border-neutral-100 space-y-16">
                    <div className="space-y-4 max-w-3xl">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Impacto de Negocio</span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                            Mucho más que una buena experiencia. <br />
                            <span className="text-neutral-400 font-semibold">Una mejor empresa.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { stat: "Más información.", detail: "Cada acción queda registrada. Al final del mes sabes exactamente qué pasó, quién lo hizo y cuánto generó.", icon: "01" },
                            { stat: "Más control.", detail: "El dueño deja de depender de la memoria del equipo. Los procesos ocurren igual, sin importar quién esté trabajando.", icon: "02" },
                            { stat: "Más tiempo.", detail: "Las tareas repetitivas se automatizan. El equipo se concentra en lo que realmente importa: atender bien.", icon: "03" },
                            { stat: "Mejores decisiones.", detail: "Con datos reales en tiempo real, las decisiones dejan de basarse en intuición y comienzan a basarse en evidencia.", icon: "04" }
                        ].map((item, i) => (
                            <div key={i} className="p-8 border border-neutral-100 rounded-2xl space-y-4 hover:border-neutral-300 transition-colors">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold text-black">{item.stat}</h3>
                                    <span className="text-[10px] font-mono text-neutral-300">{item.icon}</span>
                                </div>
                                <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.detail}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-black rounded-2xl p-10 md:p-14 space-y-4">
                        <p className="text-white text-xl md:text-2xl font-light leading-relaxed max-w-3xl">
                            Cuando toda la operación trabaja conectada, el crecimiento deja de depender de la improvisación.
                        </p>
                        <p className="text-neutral-400 text-sm font-semibold">
                            Se convierte en el resultado natural de operar bien.
                        </p>
                    </div>
                </section>

                {/* SECCIÓN: Centro de Conocimiento con artículos */}
                <section className="w-full max-w-5xl mx-auto px-4 py-32 md:py-48 border-t border-neutral-100 space-y-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4 max-w-2xl">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Centro de Conocimiento</span>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                                Explora cómo funciona una empresa conectada.
                            </h2>
                            <p className="text-sm md:text-base text-neutral-500 leading-relaxed font-light">
                                Cada concepto explicado con claridad. Sin tecnicismos innecesarios.
                            </p>
                        </div>
                        <button
                            onClick={() => setActiveMenu("conocimiento")}
                            className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 border border-black text-black font-semibold text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors rounded-full"
                        >
                            <span>Ver todos</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "¿Qué es un ERP?", description: "Entiende cómo un sistema centralizado puede reemplazar todas las planillas y archivos dispersos que hoy frenan tu operación.", href: "/centro-de-conocimiento/que-es-un-erp", tag: "Conceptos" },
                            { title: "¿Qué es un CRM?", description: "Descubre cómo una empresa que recuerda a sus clientes genera más ingresos que una que simplemente les vende.", href: "/centro-de-conocimiento/que-es-un-crm", tag: "Conceptos" },
                            { title: "¿Qué es una API?", description: "Aprende por qué la conexión entre tus herramientas es la diferencia entre una empresa que trabaja y una que escala.", href: "/centro-de-conocimiento/que-es-una-api", tag: "Tecnología" },
                            { title: "¿Qué es Fonasa?", description: "Entender cómo funciona Fonasa te permite integrar cobros de bonos directamente en tu flujo de atención.", href: "/centro-de-conocimiento/que-es-fonasa", tag: "Salud" },
                            { title: "¿Qué es IMED?", description: "Cómo funciona la validación electrónica de bonos y qué significa integrarla en tu punto de atención.", href: "/centro-de-conocimiento/que-es-imed", tag: "Salud" },
                            { title: "¿Qué es una operación fragmentada?", description: "El diagnóstico que explica por qué muchas empresas trabajan más de lo necesario sin obtener mejores resultados.", href: "/centro-de-conocimiento/que-es-una-operacion-fragmentada", tag: "Operación" }
                        ].map((article, i) => (
                            <Link key={i} href={article.href} className="group border border-neutral-100 rounded-2xl p-6 space-y-4 hover:border-neutral-300 hover:shadow-sm transition-all duration-300 flex flex-col">
                                <div>
                                    <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400">{article.tag}</span>
                                    <h3 className="text-sm font-bold text-black mt-1 group-hover:underline underline-offset-2 transition-all">{article.title}</h3>
                                </div>
                                <p className="text-xs text-neutral-500 font-light leading-relaxed flex-1">{article.description}</p>
                                <div className="flex items-center gap-1 text-[10px] font-semibold tracking-wider text-neutral-400 group-hover:text-black transition-colors uppercase pt-2 border-t border-neutral-100">
                                    <span>Leer artículo</span>
                                    <ChevronRight className="w-3 h-3 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Última Sección: Hablemos de tu empresa */}
                <motion.section id="contacto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full py-32 md:py-48 max-w-2xl mx-auto px-6 md:px-0 space-y-12 flex flex-col items-start border-t border-neutral-100">
                    <div className="text-left space-y-4 w-full">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Diagnóstico Operativo</span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black">Hablemos de tu empresa.</h2>
                        <p className="text-sm text-neutral-500 font-light max-w-md">
                            Cada empresa opera de forma distinta. Por eso cada implementación comienza entendiendo cómo funciona hoy tu operación. Agenda una reunión y conversemos sobre cómo podría funcionar mañana.
                        </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="w-full space-y-6">
                        {/* Honeypot field - hidden from users, visible to bots */}
                        <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                            <label htmlFor="_honeypot">Leave this field empty</label>
                            <input 
                                type="text" 
                                id="_honeypot" 
                                name="_honeypot" 
                                tabIndex={-1} 
                                autoComplete="off"
                                value={formData._honeypot} 
                                onChange={(e) => setFormData({...formData, _honeypot: e.target.value})} 
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Empresa</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-black focus:bg-white text-black transition-all" required disabled={formStatus === "loading" || formStatus === "success"} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Correo</label>
                                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-black focus:bg-white text-black transition-all" required disabled={formStatus === "loading" || formStatus === "success"} />
                            </div>
                        </div>
                        
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest pl-1">Situación Operativa</label>
                            <input type="text" value={formData.challenge} onChange={(e) => setFormData({...formData, challenge: e.target.value})} className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-black focus:bg-white text-black placeholder:text-neutral-400 transition-all" placeholder="Ej: Necesitamos conectar las agendas con la facturación..." required disabled={formStatus === "loading" || formStatus === "success"} />
                        </div>
                        
                        {formStatus === "error" && (
                            <p className="text-mercenario-danger text-xs mt-2 text-left">No se pudo procesar la solicitud. Intente más tarde.</p>
                        )}
                        {formStatus === "success" && (
                            <p className="text-emerald-600 text-xs mt-2 text-left font-semibold">Solicitud recibida. Nos pondremos en contacto en breve.</p>
                        )}

                        <div className="pt-4 flex justify-center md:justify-start w-full">
                            <button 
                                type="submit" 
                                disabled={formStatus === "loading" || formStatus === "success"}
                                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 transition-colors rounded-full"
                            >
                                {formStatus === "loading" ? "Procesando..." : formStatus === "success" ? "Completado" : (
                                    <><span>Agendar reunión</span><ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.section>

                </div>
            </main>

            {/* Stark footer with all Sitemap sections */}
            <footer className="w-full py-16 border-t border-neutral-100 bg-white flex flex-col items-center">
                <div className="max-w-7xl w-full px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-[11px] text-neutral-500 font-medium">
                    <div className="space-y-4">
                        <span className="font-bold text-black">MERCENARIO</span>
                        <p className="font-light text-neutral-400 leading-relaxed">Una nueva forma de operar pequeñas empresas.</p>
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <span className="font-bold text-black uppercase tracking-wider mb-2">Soluciones</span>
                        <Link href="/soluciones/health" className="hover:text-black transition-colors">Salud</Link>
                        <Link href="/soluciones/comercio" className="hover:text-black transition-colors">Comercio</Link>
                        <Link href="/soluciones/gastronomia" className="hover:text-black transition-colors">Gastronomía</Link>
                        <Link href="/soluciones/servicios" className="hover:text-black transition-colors">Servicios</Link>
                        <Link href="/soluciones/terreno" className="hover:text-black transition-colors">Terreno</Link>
                        <Link href="/soluciones/gimnasios" className="hover:text-black transition-colors">Gimnasios</Link>
                        <Link href="/soluciones/veterinarias" className="hover:text-black transition-colors">Veterinarias</Link>
                        <Link href="/soluciones/tecnologia" className="hover:text-black transition-colors">Tecnología</Link>
                        <Link href="/soluciones/personalizadas" className="hover:text-black transition-colors">Personalizado</Link>
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <span className="font-bold text-black uppercase tracking-wider mb-2">Conocimiento</span>
                        <Link href="/centro-de-conocimiento/que-es-un-erp" className="hover:text-black transition-colors">¿Qué es un ERP?</Link>
                        <Link href="/centro-de-conocimiento/que-es-un-crm" className="hover:text-black transition-colors">¿Qué es un CRM?</Link>
                        <Link href="/centro-de-conocimiento/que-es-una-api" className="hover:text-black transition-colors">¿Qué es una API?</Link>
                        <Link href="/centro-de-conocimiento/que-es-un-webhook" className="hover:text-black transition-colors">¿Qué es un webhook?</Link>
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <span className="font-bold text-black uppercase tracking-wider mb-2">Integraciones</span>
                        <span className="text-neutral-400 select-none">SII / IMED / Fonasa</span>
                        <span className="text-neutral-400 select-none">WhatsApp / Mercado Pago</span>
                        <span className="text-neutral-400 select-none">Transbank / Stripe</span>
                    </div>
                    <div className="space-y-2 flex flex-col">
                        <span className="font-bold text-black uppercase tracking-wider mb-2">Empresa</span>
                        <Link href="/#contacto" className="hover:text-black transition-colors">Contacto</Link>
                        <Link href="/#contacto" className="hover:text-black transition-colors">Agenda una reunión</Link>
                    </div>
                </div>
                <div className="w-full text-center text-[9px] text-neutral-400 tracking-wider uppercase mt-16">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</div>
            </footer>

        </div>
    );
}
