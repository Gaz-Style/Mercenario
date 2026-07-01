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

export default function Home() {
    const [formData, setFormData] = useState({ name: "", email: "", challenge: "", budget: "", _honeypot: "" });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    
    // Interactive Map state
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

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

    const operationalSteps = [
        { label: "Un cliente agenda una cita", area: "Agenda", desc: "El profesional recibe la información de forma instantánea." },
        { label: "El cliente recibe su confirmación", area: "Comunicación", desc: "Notificación automatizada enviada por correo y WhatsApp." },
        { label: "Se procesa el pago", area: "Finanzas", desc: "La pasarela de pago liquida y confirma la transacción." },
        { label: "Se emite la boleta", area: "Facturación", desc: "Emisión directa con el SII sin pasos manuales." },
        { label: "Se actualiza la caja", area: "Caja", desc: "El arqueo contable computa la entrada de dinero en tiempo real." },
        { label: "Se registra la atención", area: "Historial", desc: "La ficha única del cliente almacena el evento." },
        { label: "Se agenda el seguimiento", area: "Coordinación", desc: "Se programa una tarea de control para el equipo." },
        { label: "Se solicita una reseña", area: "Calidad", desc: "Encuesta automática enviada al finalizar la experiencia." },
        { label: "Se genera una oportunidad de venta", area: "Crecimiento", desc: "El sistema proyecta la próxima fecha de interacción óptima." }
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
                <div className="w-full max-w-7xl mx-auto px-6 pb-32 relative z-20 flex flex-col items-center">

                {/* 3. SECCIÓN 3 - El Mapa Interactivo */}
                <section className="w-full max-w-5xl mx-auto px-4 py-32 md:py-48 flex flex-col items-center">
                    <div className="text-center max-w-2xl mb-20 space-y-4">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-neutral-400">Coordinación Total</h2>
                        <p className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                            Imagina que cada acción desencadena la siguiente.
                        </p>
                        <p className="text-sm text-neutral-500 font-light">
                            Sin copiar información. Sin repetir tareas. Sin depender de que alguien recuerde hacerlo.
                        </p>
                    </div>

                    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                        {/* Panel de control de simulación */}
                        <div className="lg:col-span-1 space-y-6 bg-neutral-50 border border-neutral-100 p-8 rounded-2xl">
                            <div className="space-y-2">
                                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Simulador de Eventos</span>
                                <h3 className="text-xl font-bold text-black">El Flujo Continuo</h3>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                    Haz click para observar la reacción en cadena de una operación completamente conectada.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                {!isPlaying ? (
                                    <button 
                                        onClick={startSimulation}
                                        className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 bg-black text-white text-[11px] font-semibold uppercase tracking-wider rounded-lg hover:bg-neutral-800 transition-all"
                                    >
                                        <Play className="w-3.5 h-3.5 fill-current" />
                                        <span>Ejecutar</span>
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

                {/* 4. SECCIÓN 4 - Tu empresa ya tiene todo lo necesario (Integraciones) */}
                <section className="w-full max-w-4xl mx-auto px-4 py-32 md:py-48 space-y-12">
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

                    {/* Logos Grid */}
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-8 pt-8 grayscale opacity-45">
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">WhatsApp</div>
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">Google</div>
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">SII</div>
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">IMED</div>
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">Fonasa</div>
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">Previred</div>
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">Mercado Pago</div>
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">Transbank</div>
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">Meta</div>
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">Stripe</div>
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">Outlook</div>
                        <div className="h-12 flex items-center justify-center font-mono font-bold text-xs border border-neutral-200 rounded">APIs</div>
                    </div>

                    <p className="text-xs text-neutral-400 font-medium italic pt-4">
                        Cada empresa es distinta. Por eso cada operación se diseña de forma personalizada.
                    </p>
                </section>

                {/* 5. SECCIÓN 5 - Una solución para cada operación */}
                <section className="w-full max-w-6xl mx-auto px-4 py-32 md:py-48 border-t border-neutral-100">
                    <div className="mb-24 space-y-4">
                        <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400">Sistemas de Trabajo</span>
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black max-w-3xl leading-tight">
                            Una solución para cada operación.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Clínicas", capabilities: ["Agenda", "Pagos", "Ficha clínica", "Bonos", "Seguimiento", "Reportes"] },
                            { title: "Centros estéticos", capabilities: ["Reservas", "Recordatorios", "Cobros", "Marketing", "Fidelización"] },
                            { title: "Retail", capabilities: ["Ventas", "Inventario", "Clientes", "Facturación", "Automatizaciones"] },
                            { title: "Empresas de servicios", capabilities: ["Clientes", "Proyectos", "Cobranza", "Administración", "Seguimiento"] }
                        ].map((sector, i) => (
                            <div key={i} className="border-t border-neutral-200 pt-6 flex flex-col justify-between min-h-[220px]">
                                <h3 className="text-lg font-bold text-black tracking-tight">{sector.title}</h3>
                                <ul className="text-xs text-neutral-500 font-medium tracking-wide space-y-2 mt-4 mb-auto">
                                    {sector.capabilities.map((cap, cIdx) => (
                                        <li key={cIdx} className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-neutral-300 rounded-full" />
                                            <span>{cap}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. SECCIÓN 6 - Mucho más que una buena experiencia */}
                <section className="w-full max-w-4xl mx-auto px-4 py-32 md:py-48 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Impacto de Negocio</span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                        Mucho más que una buena experiencia para tus clientes. <br />
                        <span className="text-neutral-400 font-semibold">Una mejor experiencia también significa una mejor empresa.</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-neutral-100 text-center md:text-left">
                        <div>
                            <span className="text-lg font-bold text-black">Más información.</span>
                        </div>
                        <div>
                            <span className="text-lg font-bold text-black">Más control.</span>
                        </div>
                        <div>
                            <span className="text-lg font-bold text-black">Más tiempo.</span>
                        </div>
                        <div>
                            <span className="text-lg font-bold text-black">Mejores decisiones.</span>
                        </div>
                    </div>
                    <p className="text-sm md:text-base text-neutral-500 leading-relaxed font-light pt-4">
                        Porque cuando toda la operación trabaja conectada, el crecimiento deja de depender de la improvisación.
                    </p>
                </section>

                {/* 7. SECCIÓN 7 - Explora cómo funciona una empresa conectada */}
                <section className="w-full max-w-4xl mx-auto px-4 py-32 md:py-48 border-t border-neutral-100 text-center space-y-8 flex flex-col items-center">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Centro de Conocimiento</span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black max-w-2xl leading-tight">
                        Explora cómo funciona una empresa conectada.
                    </h2>
                    <p className="text-sm md:text-base text-neutral-500 leading-relaxed font-light max-w-xl mx-auto">
                        No importa si buscas mejorar tu clínica, tu centro estético o tu empresa. En Mercenario encontrarás una explicación clara de cada proceso, cada integración y cada herramienta que forma parte de una operación moderna.
                    </p>
                    <div className="pt-4">
                        <button 
                            onClick={() => setActiveMenu("conocimiento")}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full"
                        >
                            <span>Explorar el centro de conocimiento</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </section>

                {/* Última Sección: Hablemos de tu empresa */}
                <motion.section id="contacto" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full py-32 md:py-48 max-w-2xl mx-auto space-y-12 flex flex-col items-center border-t border-neutral-100 mt-24">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">Hablemos de tu empresa.</h2>
                        <p className="text-sm text-neutral-500 font-light max-w-md mx-auto">
                            Cada empresa opera de forma distinta. Por eso cada implementación comienza entendiendo cómo funciona hoy tu operación. Agenda una reunión y conversemos sobre cómo podría funcionar mañana.
                        </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="w-full space-y-8">
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
                            <input type="text" value={formData.challenge} onChange={(e) => setFormData({...formData, challenge: e.target.value})} className="w-full bg-transparent border-b border-neutral-200 py-3.5 text-sm focus:outline-none focus:border-black text-black placeholder:text-neutral-300 transition-colors" placeholder="Ej: Necesitamos conectar las agendas con la facturación..." required disabled={formStatus === "loading" || formStatus === "success"} />
                        </div>
                        
                        {formStatus === "error" && (
                            <p className="text-mercenario-danger text-xs mt-4 text-center">No se pudo procesar la solicitud. Intente más tarde.</p>
                        )}
                        {formStatus === "success" && (
                            <p className="text-emerald-600 text-xs mt-4 text-center font-semibold">Solicitud recibida. Nos pondremos en contacto en breve.</p>
                        )}

                        <div className="pt-8 flex justify-center">
                            <button 
                                type="submit" 
                                disabled={formStatus === "loading" || formStatus === "success"}
                                className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 disabled:bg-neutral-200 disabled:text-neutral-400 transition-colors rounded-full"
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
