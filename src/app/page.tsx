"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
    ChevronRight, 
    ArrowRight,
    ArrowUpRight,
    ChevronDown,
    Menu,
    X,
    Check,
    Sparkles,
    Clock,
    ShieldCheck,
    Store,
    Calendar,
    Building2,
    Bot,
    CreditCard,
    MessageSquare,
    Layers,
    Receipt,
    Globe,
    ShoppingCart,
    AlertCircle,
    CheckCircle2,
    DollarSign,
    Smartphone,
    Mail,
    Cpu,
    Zap,
    TrendingDown,
    RefreshCw
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import HeroV2 from "@/components/HeroV2";
import OperationMap from "@/components/OperationMap";

export default function Home() {
    const [selectedPackage, setSelectedPackage] = useState<"ecommerce" | "clinica" | "servicios">("ecommerce");
    
    // Formulario de diagnóstico y captura de leads
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        phone: "",
        system: "Paquete Fundador (Ecosistema Completo: $1.8M - $2.2M CLP)", 
        challenge: "", 
        _honeypot: "" 
    });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    
    // Estados de navegación
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Honeypot anti-spam check
        if (formData._honeypot) {
            setFormStatus("success");
            setFormData({ name: "", email: "", phone: "", system: "Paquete Fundador", challenge: "", _honeypot: "" });
            setTimeout(() => setFormStatus("idle"), 5000);
            return;
        }

        setFormStatus("loading");
        const { error } = await supabase
            .from("leads")
            .insert([{ 
                full_name: formData.name, 
                email: formData.email, 
                phone: formData.phone,
                challenge: `[Opción: ${formData.system}] [Tel: ${formData.phone}] ${formData.challenge}`, 
                budget: formData.system 
            }]);

        if (error) {
            console.error("Error guardando lead:", error);
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 4000);
        } else {
            setFormStatus("success");
            setFormData({ name: "", email: "", phone: "", system: "Paquete Fundador", challenge: "", _honeypot: "" });
            setTimeout(() => setFormStatus("idle"), 5000);
        }
    };

    const handleSelectSystemForQuote = (sysName: string) => {
        setFormData(prev => ({ ...prev, system: sysName }));
        const element = document.getElementById("contacto");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const WHATSAPP_NUM = "56957958467";

    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            
            {/* Header: Pulcro, Stark White, Unificado */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/90 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-50">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-2 h-2 bg-red-600 rounded-full group-hover:scale-125 transition-transform" />
                            <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase flex items-center gap-2">
                                MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">SISTEMAS OPERATIVOS</span>
                            </span>
                        </Link>

                        {/* Navigation Links Unificados */}
                        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase select-none">
                            <a href="#demostracion-weke" className="hover:text-black transition-colors py-2 flex items-center gap-1.5 text-emerald-700 font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>Caso Real (WEKE)</span>
                            </a>
                            <a href="#sistemas" className="hover:text-black transition-colors py-2">
                                Sistemas Llave en Mano
                            </a>
                            <a href="#modulos" className="hover:text-black transition-colors py-2">
                                Módulos del Sistema
                            </a>
                            <a href="#tarifario" className="hover:text-black transition-colors py-2 text-black font-bold flex items-center gap-1">
                                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Tarifario & Precios</span>
                            </a>
                            <Link href="/tienda" className="hover:text-black transition-colors py-2 text-neutral-700">
                                Ver Tienda WEKE
                            </Link>
                            
                            {/* Dropdown discreto para Centro de Conocimiento */}
                            <div 
                                className="relative cursor-pointer py-2 hover:text-black transition-colors flex items-center gap-1"
                                onMouseEnter={() => setIsResourcesOpen(true)}
                                onMouseLeave={() => setIsResourcesOpen(false)}
                            >
                                <span>Recursos</span>
                                <ChevronDown className="w-3 h-3 text-neutral-400" />
                                
                                <AnimatePresence>
                                    {isResourcesOpen && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            className="absolute top-full left-0 w-64 bg-white border border-neutral-100 rounded-xl shadow-lg p-3 flex flex-col space-y-1.5 normal-case"
                                        >
                                            <Link href="/centro-de-conocimiento/que-es-un-erp" className="text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 px-2.5 py-1.5 rounded-md transition-colors font-normal">
                                                ¿Qué es un ERP y cuándo se necesita?
                                            </Link>
                                            <Link href="/centro-de-conocimiento/que-es-un-crm" className="text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 px-2.5 py-1.5 rounded-md transition-colors font-normal">
                                                ¿Cómo un CRM evita perder clientes?
                                            </Link>
                                            <Link href="/centro-de-conocimiento/que-es-una-api" className="text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 px-2.5 py-1.5 rounded-md transition-colors font-normal">
                                                ¿Qué es una API y cómo conecta tu negocio?
                                            </Link>
                                            <Link href="/operacion/como-funciona-una-empresa" className="text-xs text-neutral-600 hover:text-black hover:bg-neutral-50 px-2.5 py-1.5 rounded-md transition-colors font-normal">
                                                La anatomía de una operación conectada
                                            </Link>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </nav>
                    </div>

                    {/* Acciones Directas en Header */}
                    <div className="hidden lg:flex items-center gap-4">
                        <a 
                            href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quisiera%20conversar%20sobre%20el%20Ecosistema%20Completo%20(Paquete%20Fundador)`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors"
                        >
                            WhatsApp Directo
                        </a>
                        <a 
                            href="#tarifario" 
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[11px] font-semibold tracking-wider uppercase rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
                        >
                            <span>Ver Tarifario CLP</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    {/* Botón Móvil */}
                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-neutral-600 hover:text-black focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Menú Móvil */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white border-b border-neutral-100 px-6 py-8 flex flex-col gap-6"
                        >
                            <div className="flex flex-col gap-4">
                                <a 
                                    href="#demostracion-weke" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-emerald-700 flex items-center gap-2"
                                >
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>Demostración WEKE (En Vivo)</span>
                                </a>
                                <a 
                                    href="#sistemas" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-black"
                                >
                                    Sistemas Llave en Mano
                                </a>
                                <a 
                                    href="#modulos" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-black"
                                >
                                    Módulos del Sistema
                                </a>
                                <a 
                                    href="#tarifario" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-black flex items-center gap-1.5"
                                >
                                    <DollarSign className="w-4 h-4 text-emerald-600" />
                                    <span>Tarifario & Precios CLP</span>
                                </a>
                                <Link 
                                    href="/tienda" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-bold text-neutral-800"
                                >
                                    Tienda WEKE Store
                                </Link>
                            </div>

                            <div className="pt-6 border-t border-neutral-100 flex flex-col gap-3">
                                <a 
                                    href="#contacto" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-4 bg-black text-white text-center text-xs font-semibold tracking-widest uppercase rounded-full"
                                >
                                    Cotizar Sistema Operativo
                                </a>
                                <a 
                                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quisiera%20conversar%20sobre%20el%20sistema%20llave%20en%20mano%20para%20mi%20empresa`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3.5 border border-neutral-200 text-black text-center text-xs font-semibold tracking-widest uppercase rounded-full"
                                >
                                    Hablar por WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <main className="w-full flex flex-col items-center">
                
                {/* 1. HERO V2 - El Punto de Quiebre con Video Scrub */}
                <HeroV2 />

                {/* 2. SECCIÓN: EL CAOS TRADICIONAL VS EL SISTEMA CONECTADO */}
                <section className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 space-y-12 border-t border-neutral-100">
                    <div className="space-y-4 max-w-3xl">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">
                            DIAGNÓSTICO OPERATIVO
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                            La diferencia entre estar atrapado en el negocio o tener un sistema.
                        </h2>
                        <p className="text-base text-neutral-600 leading-relaxed font-light">
                            La mayoría de las pymes no sufren por falta de clientes, sufren por <strong className="font-semibold text-neutral-900">desorden operativo</strong>: clientes que escriben a deshoras y se van, personas que faltan a sus citas sin avisar y planillas de Excel que nadie actualiza.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* TARJETA CAOS */}
                        <div className="border border-red-200 bg-red-50/20 rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-mono font-bold uppercase rounded-md tracking-wider">
                                    01. El Caos Tradicional (Sin Sistema)
                                </span>
                                <AlertCircle className="w-5 h-5 text-red-500" />
                            </div>

                            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-100 border border-red-100 relative shadow-inner">
                                <img
                                    src="/images/office_chaos.png"
                                    alt="Caos tradicional en la oficina"
                                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                            <ul className="space-y-3 text-xs sm:text-sm text-neutral-600">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-red-500 font-bold">✕</span>
                                    <span><strong>Ventas perdidas fuera de horario:</strong> El 60% de tus clientes escribe de noche o el fin de semana. Si tardas 20 minutos en responder, ya cotizaron con tu competencia.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-red-500 font-bold">✕</span>
                                    <span><strong>Ausentismo a citas (No-Show):</strong> Agendas "de palabra" o por mensaje; 3 de cada 10 pacientes o clientes faltan sin avisar, dejando al equipo o box vacío sin cobrar nada.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-red-500 font-bold">✕</span>
                                    <span><strong>Planillas y chats dispersos:</strong> La recepcionista anota en un Excel, el vendedor en su WhatsApp personal y el dueño no tiene métricas ni control de inventario.</span>
                                </li>
                            </ul>
                        </div>

                        {/* TARJETA SISTEMA CONECTADO */}
                        <div className="border border-emerald-200 bg-emerald-50/20 rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase rounded-md tracking-wider">
                                    02. El Sistema Mercenario (Operación Conectada)
                                </span>
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            </div>

                            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden bg-neutral-100 border border-emerald-100 relative shadow-inner">
                                <img
                                    src="/images/office_order.png"
                                    alt="Oficina ordenada y conectada con software"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>

                            <ul className="space-y-3 text-xs sm:text-sm text-neutral-700">
                                <li className="flex items-start gap-2.5">
                                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <span><strong>Asistente IA responde en 3 segundos:</strong> En WhatsApp oficial, consulta precios, stock o agendas en vivo y cierra reservas sin inventar datos.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <span><strong>Agenda con cobro Webpay obligatorio:</strong> El cliente paga su abono antes de asegurar la cita. Reduce el ausentismo a menos del 4%.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                    <span><strong>Panel Central CRM/ERP + Notificaciones:</strong> Cada compra avisa al WhatsApp del dueño en el segundo exacto, emite boleta y recupera carritos a los 20 min.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 3. SECCIÓN: WEKE STUDIO (LA DEMOSTRACIÓN VIVA DEL SITIO WEB + EL SISTEMA COMPLETO) */}
                <section id="demostracion-weke" className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 border-t border-neutral-100">
                    <div className="border-2 border-neutral-900 bg-white rounded-3xl p-6 sm:p-12 space-y-10 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-neutral-900 text-white text-[10px] font-mono uppercase px-4 py-1.5 rounded-bl-xl font-bold tracking-widest">
                            DEMOSTRACIÓN REAL EN VIVO
                        </div>

                        <div className="space-y-4 max-w-3xl">
                            <div className="flex items-center gap-3">
                                <img src="/images/weke-logo.png" alt="Logo WEKE" className="w-10 h-10 object-contain" />
                                <div>
                                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-900 block">
                                        WEKE STUDIO // E-COMMERCE & SISTEMA CONECTADO
                                    </span>
                                    <span className="text-[11px] text-neutral-400 font-mono">
                                        www.mercenario.cl/tienda
                                    </span>
                                </div>
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900">
                                No te mostramos maquetas en Figma.<br />
                                <span className="text-emerald-700">Mira la Web E-Commerce de WEKE operando en vivo.</span>
                            </h2>
                            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                                Creamos y operamos la marca de indumentaria técnica <strong>WEKE Studio</strong> como banco de pruebas real de toda esta tecnología: una tienda web ultrarrápida con catálogo, carrito flyout y Webpay, comunicada segundo a segundo con el Asistente de WhatsApp, el recuperador de carritos y la consola ERP.
                            </p>
                        </div>

                        {/* SHOWCASE VISUAL: BROWSER MOCKUP CON PRODUCTOS REALES */}
                        <div className="border border-neutral-300 rounded-2xl overflow-hidden bg-neutral-50 shadow-lg">
                            <div className="bg-neutral-200/70 px-4 py-3 border-b border-neutral-300 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-red-400" />
                                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                                    <span className="text-[10px] font-mono text-neutral-500 ml-2">https://www.mercenario.cl/tienda (WEKE Storefront)</span>
                                </div>
                                <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded text-emerald-700 font-bold border border-neutral-300">
                                    Velocidad: 0.8s · Next.js 16
                                </span>
                            </div>

                            <div className="p-6 sm:p-8 space-y-6 bg-white">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-neutral-100">
                                    <div>
                                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                                            CATÁLOGO AUTOADMINISTRABLE EN PRODUCCIÓN REAL
                                        </span>
                                        <h3 className="text-xl font-bold text-neutral-900">
                                            Prendas Técnicas de Montaña & Outdoor WEKE
                                        </h3>
                                    </div>
                                    <Link
                                        href="/tienda"
                                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 text-white text-xs font-mono uppercase tracking-wider rounded-lg hover:bg-black transition-colors"
                                    >
                                        <ShoppingCart className="w-3.5 h-3.5" />
                                        <span>Abrir Tienda WEKE en Vivo</span>
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>

                                {/* PRODUCTOS REALES DE WEKE */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50 p-4 space-y-3 group hover:border-black transition-colors">
                                        <div className="aspect-[4/5] rounded-lg overflow-hidden bg-neutral-100 relative">
                                            <img
                                                src="/uploads/products/1792614911476_Aventura_alpina_con_chaqueta_amarilla.webp"
                                                alt="Chaqueta Alpina Impermeable Pro WEKE"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white text-[9px] font-mono uppercase rounded">
                                                Stock Web en Vivo
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-mono text-neutral-400 uppercase">Prenda Técnica</span>
                                            <h4 className="text-xs font-bold text-neutral-900">Chaqueta Alpina Impermeable Pro</h4>
                                            <p className="text-xs font-mono font-bold text-neutral-900">$89.900 CLP</p>
                                        </div>
                                        <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-neutral-500 border-t border-neutral-200">
                                            <span>Tallas: S, M, L, XL</span>
                                            <span className="text-emerald-700 font-bold">✓ Disponible</span>
                                        </div>
                                    </div>

                                    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50 p-4 space-y-3 group hover:border-black transition-colors">
                                        <div className="aspect-[4/5] rounded-lg overflow-hidden bg-neutral-100 relative">
                                            <img
                                                src="/uploads/products/1792615209190_Explorador_alpino_ante_monta_as_nevadas.webp"
                                                alt="Pantalón Técnico Cordillera WEKE"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white text-[9px] font-mono uppercase rounded">
                                                Stock Web en Vivo
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-mono text-neutral-400 uppercase">Prenda Técnica</span>
                                            <h4 className="text-xs font-bold text-neutral-900">Pantalón Técnico Cordillera</h4>
                                            <p className="text-xs font-mono font-bold text-neutral-900">$54.900 CLP</p>
                                        </div>
                                        <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-neutral-500 border-t border-neutral-200">
                                            <span>Tallas: 38 a 46</span>
                                            <span className="text-emerald-700 font-bold">✓ Disponible</span>
                                        </div>
                                    </div>

                                    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50 p-4 space-y-3 group hover:border-black transition-colors">
                                        <div className="aspect-[4/5] rounded-lg overflow-hidden bg-neutral-100 relative">
                                            <img
                                                src="/uploads/products/1792617202869_Mochila_amarilla_ante_monta_as_alpinas.webp"
                                                alt="Mochila Expedición 45L WEKE"
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-black text-white text-[9px] font-mono uppercase rounded">
                                                Stock Web en Vivo
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-mono text-neutral-400 uppercase">Equipamiento</span>
                                            <h4 className="text-xs font-bold text-neutral-900">Mochila Expedición Cordillera 45L</h4>
                                            <p className="text-xs font-mono font-bold text-neutral-900">$69.900 CLP</p>
                                        </div>
                                        <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-neutral-500 border-t border-neutral-200">
                                            <span>Capacidad: 45 Litros</span>
                                            <span className="text-emerald-700 font-bold">✓ Disponible</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* LAS 4 PIEZAS DEL SISTEMA EN WEKE */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-2">
                                <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">FRONTEND</span>
                                <h4 className="text-sm font-bold text-neutral-900">1. Web Autoadministrable</h4>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Catálogo de productos, carrito lateral flyout y checkout Webpay. Carga en 0.8s en celulares sin WordPress.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-2">
                                <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">ATENCIÓN 24/7</span>
                                <h4 className="text-sm font-bold text-neutral-900">2. Asistente IA WhatsApp</h4>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Pregúntale por tallas o telas técnicas. Lee la base de datos viva y responde con links de compra sin inventar datos.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-2">
                                <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">AUTOMATIZACIÓN</span>
                                <h4 className="text-sm font-bold text-neutral-900">3. Recuperador de Carrito</h4>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Si alguien llena el checkout y no paga, a los 20 min un Cron Job le envía un WhatsApp de ayuda. Rescata hasta 30% de ventas.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200/80 space-y-2">
                                <span className="text-[10px] font-mono text-neutral-400 font-bold uppercase block">OPERACIONES</span>
                                <h4 className="text-sm font-bold text-neutral-900">4. Panel ERP & LiveChat</h4>
                                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                    Centraliza pedidos, descuenta stock de la tienda física y permite a un humano pausar al bot con 1 clic.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. SECCIÓN: SISTEMAS LLAVE EN MANO (La Oferta Desglosada por Industria) */}
                <section id="sistemas" className="w-full max-w-5xl mx-auto px-4 py-20 space-y-12 border-t border-neutral-100">
                    <div className="space-y-4 max-w-3xl">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">OFERTA COMERCIAL LLAVE EN MANO</span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                            Una arquitectura completa para tu industria.<br />
                            <span className="text-neutral-400 font-semibold">Instalada y lista para operar en 14 a 21 días.</span>
                        </h2>
                        <p className="text-base text-neutral-500 leading-relaxed font-light pt-2 max-w-2xl">
                            No entregamos páginas web huérfanas ni software que nadie sabe usar. Entregamos un sistema operativo comercial completo: diseño a medida, pagos, inventario, WhatsApp IA y capacitación de tu equipo.
                        </p>
                    </div>

                    {/* Selector de Industria */}
                    <div className="flex flex-wrap items-center gap-2 p-1 bg-neutral-100/70 rounded-2xl w-max max-w-full">
                        <button
                            onClick={() => setSelectedPackage("ecommerce")}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                                selectedPackage === "ecommerce" 
                                    ? "bg-white text-black shadow-sm" 
                                    : "text-neutral-500 hover:text-black"
                            }`}
                        >
                            <Store className="w-4 h-4" />
                            <span>E-Commerce & Retail (Caso WEKE)</span>
                        </button>
                        <button
                            onClick={() => setSelectedPackage("clinica")}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                                selectedPackage === "clinica" 
                                    ? "bg-white text-black shadow-sm" 
                                    : "text-neutral-500 hover:text-black"
                            }`}
                        >
                            <Calendar className="w-4 h-4" />
                            <span>Clínica, Estética & Salud</span>
                        </button>
                        <button
                            onClick={() => setSelectedPackage("servicios")}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                                selectedPackage === "servicios" 
                                    ? "bg-white text-black shadow-sm" 
                                    : "text-neutral-500 hover:text-black"
                            }`}
                        >
                            <Building2 className="w-4 h-4" />
                            <span>Servicios B2B & Inmobiliaria</span>
                        </button>
                    </div>

                    {/* Tarjeta de Contenido Dinámico */}
                    <AnimatePresence mode="wait">
                        {selectedPackage === "ecommerce" && (
                            <motion.div 
                                key="ecommerce"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-8 md:p-12 border border-neutral-200 rounded-3xl bg-white space-y-8 shadow-sm"
                            >
                                <div className="space-y-3">
                                    <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold tracking-widest">
                                        RETAIL · MODA · PRODUCTOS FÍSICOS
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-black">
                                        Sistema E-Commerce Autoadministrable + WhatsApp IA + POS Sincronizado
                                    </h3>
                                    <p className="text-sm text-neutral-500 leading-relaxed font-light max-w-2xl">
                                        El mismo motor que opera WEKE Studio. Permite vender online con Webpay Plus y en tu tienda física con máquina POS, manteniendo el stock descontado en vivo en ambos canales.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                    <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                                        <Store className="w-5 h-5 text-neutral-800" />
                                        <h4 className="text-sm font-bold text-black">Web Next.js de Carga Rápida</h4>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                            Catálogo interactivo, carrito flyout, filtros por talla/color y panel para subir fotos y cambiar precios en 1 clic.
                                        </p>
                                    </div>
                                    <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                                        <Bot className="w-5 h-5 text-emerald-600" />
                                        <h4 className="text-sm font-bold text-black">Vendedor IA en WhatsApp 24/7</h4>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                            Responde dudas sobre materiales, medidas y stock disponible. Envía links directos de pago con Webpay o Mercado Pago.
                                        </p>
                                    </div>
                                    <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                                        <Receipt className="w-5 h-5 text-neutral-800" />
                                        <h4 className="text-sm font-bold text-black">Recuperador de Carritos</h4>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                            A los 20 min de abandonar el checkout, el sistema le escribe por WhatsApp para rescatar la venta.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-neutral-100">
                                    <button 
                                        onClick={() => handleSelectSystemForQuote("E-Commerce & Retail (Caso WEKE)")}
                                        className="px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors font-bold"
                                    >
                                        Cotizar Sistema E-Commerce
                                    </button>
                                    <Link 
                                        href="/tienda" 
                                        className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-neutral-700 hover:text-black font-semibold"
                                    >
                                        <span>Probar Tienda WEKE en Vivo</span>
                                        <ArrowUpRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </motion.div>
                        )}

                        {selectedPackage === "clinica" && (
                            <motion.div 
                                key="clinica"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-8 md:p-12 border border-neutral-200 rounded-3xl bg-white space-y-8 shadow-sm"
                            >
                                <div className="space-y-3">
                                    <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold tracking-widest">
                                        SALUD · DENTAL · ESTÉTICA · KINESIOLOGÍA
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-black">
                                        Plataforma de Agendamiento Online con Cobro Webpay + Asistente IA Médico
                                    </h3>
                                    <p className="text-sm text-neutral-500 leading-relaxed font-light max-w-2xl">
                                        Diseñado para centros médicos, clínicas dentales y estéticas. Permite reservar horas por especialista y box, exigiendo abono o pago completo para liquidar el ausentismo (No-Show).
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                    <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                                        <Calendar className="w-5 h-5 text-neutral-800" />
                                        <h4 className="text-sm font-bold text-black">Agenda Online con Bloqueo</h4>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                            Sincronizada con los doctores. Exige cobro de consulta previa con Webpay Plus para asegurar el compromiso del paciente.
                                        </p>
                                    </div>
                                    <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                                        <Bot className="w-5 h-5 text-emerald-600" />
                                        <h4 className="text-sm font-bold text-black">Triage IA en WhatsApp 24/7</h4>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                            Responde dudas sobre tratamientos, cuidados post-atención y agenda horas de acuerdo con la disponibilidad real del médico.
                                        </p>
                                    </div>
                                    <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                                        <MessageSquare className="w-5 h-5 text-neutral-800" />
                                        <h4 className="text-sm font-bold text-black">Recordatorios Anti-NoShow 24h</h4>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                            WhatsApp automático recordando la hora médica e indicaciones de ayuno. Reduce el ausentismo a menos del 4%.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-neutral-100">
                                    <button 
                                        onClick={() => handleSelectSystemForQuote("Clínica, Estética & Salud")}
                                        className="px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors font-bold"
                                    >
                                        Cotizar Sistema para Clínicas
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {selectedPackage === "servicios" && (
                            <motion.div 
                                key="servicios"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="p-8 md:p-12 border border-neutral-200 rounded-3xl bg-white space-y-8 shadow-sm"
                            >
                                <div className="space-y-3">
                                    <span className="text-[10px] font-mono text-emerald-600 uppercase font-bold tracking-widest">
                                        B2B · INMOBILIARIAS · SERVICIOS TÉCNICOS
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-bold text-black">
                                        Web Corporativa de Captación + Calificador IA de Leads + CRM de Pipeline
                                    </h3>
                                    <p className="text-sm text-neutral-500 leading-relaxed font-light max-w-2xl">
                                        Para inmobiliarias, empresas de ingeniería o consultoras de alto ticket. Transforma visitas anónimas en prospectos perfilados con presupuesto, plazos y derivación instantánea al WhatsApp del vendedor.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                    <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                                        <Building2 className="w-5 h-5 text-neutral-800" />
                                        <h4 className="text-sm font-bold text-black">Web Showcase & Cotizador</h4>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                            Catálogo de propiedades o servicios técnicos con calculador interactivo de presupuesto y descarga de brochure.
                                        </p>
                                    </div>
                                    <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                                        <Bot className="w-5 h-5 text-emerald-600" />
                                        <h4 className="text-sm font-bold text-black">Calificación IA de Leads</h4>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                            Pregunta requerimiento técnico y presupuesto. Si el lead es calificado, alerta al celular del vendedor en 3 segundos.
                                        </p>
                                    </div>
                                    <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2">
                                        <Layers className="w-5 h-5 text-neutral-800" />
                                        <h4 className="text-sm font-bold text-black">CRM & Envío de Brochures</h4>
                                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                            Disparo automático del dossier técnico en PDF por correo y ficha del cliente en el CRM centralizado.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-neutral-100">
                                    <button 
                                        onClick={() => handleSelectSystemForQuote("Servicios B2B & Inmobiliaria")}
                                        className="px-6 py-3 bg-black text-white text-xs font-mono uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors font-bold"
                                    >
                                        Cotizar Sistema B2B
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* 5. SECCIÓN: LOS 5 MÓDULOS DEL SISTEMA OPERATIVO CON MOCKUPS VISUALES */}
                <section id="modulos" className="w-full max-w-5xl mx-auto px-4 py-24 space-y-16 border-t border-neutral-100">
                    <div className="space-y-4 max-w-3xl">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">ARQUITECTURA DE SOFTWARE</span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                            Cinco módulos independientes.<br />
                            <span className="text-neutral-400 font-semibold">Diseñados para comunicarse sin fricción.</span>
                        </h2>
                        <p className="text-base text-neutral-500 leading-relaxed font-light pt-2 max-w-2xl">
                            Puedes implementar la solución completa o integrar módulos específicos sobre lo que tu empresa ya utiliza.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* MÓDULO 1 */}
                        <div className="p-6 border border-neutral-200/80 rounded-2xl bg-white space-y-4 hover:border-black transition-colors flex flex-col justify-between shadow-sm">
                            <div className="space-y-3">
                                <div className="w-full h-36 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                                    <img src="/images/mod2_web.png" alt="Web Next.js" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xs font-mono text-neutral-400 block font-bold">01 / WEB AUTOADMINISTRABLE</span>
                                <h3 className="text-base font-bold text-black">Catálogo & Web Next.js</h3>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                    Carga en 0.8s en smartphones. Sin WordPress ni plugins pesados que se caen. Panel intuitivo para subir fotos, precios y cupones en 1 clic.
                                </p>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-700 font-bold">✓ Carga Ultrarrápida</span>
                        </div>

                        {/* MÓDULO 2 */}
                        <div className="p-6 border border-neutral-200/80 rounded-2xl bg-white space-y-4 hover:border-black transition-colors flex flex-col justify-between shadow-sm">
                            <div className="space-y-3">
                                <div className="w-full h-36 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                                    <img src="/images/mod1_whatsapp.png" alt="Asistente WhatsApp IA" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xs font-mono text-neutral-400 block font-bold">02 / INTELIGENCIA ARTIFICIAL</span>
                                <h3 className="text-base font-bold text-black">Asistente WhatsApp con RAG</h3>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                    Conectado a la API Oficial de Meta Cloud. Consulta tu base de datos viva para responder precios, stock y agendas sin inventar datos.
                                </p>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-700 font-bold">✓ Cero Alucinaciones</span>
                        </div>

                        {/* MÓDULO 3 */}
                        <div className="p-6 border border-neutral-200/80 rounded-2xl bg-white space-y-4 hover:border-black transition-colors flex flex-col justify-between shadow-sm">
                            <div className="space-y-3">
                                <div className="w-full h-36 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                                    <img src="/images/mod3_webpay.png" alt="Webpay y Pagos" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xs font-mono text-neutral-400 block font-bold">03 / TRANSACCIÓN Y PAGOS</span>
                                <h3 className="text-base font-bold text-black">Webpay Plus & Agenda con Cobro</h3>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                    Acepta tarjetas de débito y crédito Transbank. El cliente abona antes de confirmar la cita para liquidar el ausentismo (No-Show).
                                </p>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-700 font-bold">✓ Sin Comisiones Intermedias</span>
                        </div>

                        {/* MÓDULO 4 */}
                        <div className="p-6 border border-neutral-200/80 rounded-2xl bg-white space-y-4 hover:border-black transition-colors flex flex-col justify-between shadow-sm">
                            <div className="space-y-3">
                                <div className="w-full h-36 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                                    <img src="/images/mod5_pos.png" alt="ERP y POS" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xs font-mono text-neutral-400 block font-bold">04 / CRM, ERP & POS FÍSICO</span>
                                <h3 className="text-base font-bold text-black">Centro de Mando Sincronizado</h3>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                    La máquina POS física y la web comparten la misma base de datos. Si vendes en la tienda física, el stock web se descuenta al instante.
                                </p>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-700 font-bold">✓ Stock Unificado</span>
                        </div>

                        {/* MÓDULO 5 */}
                        <div className="p-6 border border-neutral-200/80 rounded-2xl bg-white space-y-4 hover:border-black transition-colors flex flex-col justify-between shadow-sm">
                            <div className="space-y-3">
                                <div className="w-full h-36 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
                                    <img src="/images/mod4_capi.png" alt="Meta CAPI y SEO" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xs font-mono text-neutral-400 block font-bold">05 / NOTIFICACIONES & CAPI</span>
                                <h3 className="text-base font-bold text-black">Notificaciones 360° & GEO llms.txt</h3>
                                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                                    Recuperador de carritos a los 20 min, alerta de venta al WhatsApp del dueño y blindaje CAPI Server-side para que ChatGPT cite tu web.
                                </p>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-700 font-bold">✓ Indexado en ChatGPT</span>
                        </div>

                        {/* RESUMEN LLAVE EN MANO */}
                        <div className="p-6 border border-neutral-200/80 rounded-2xl bg-black text-white space-y-4 flex flex-col justify-between shadow-md">
                            <div className="space-y-3">
                                <span className="text-xs font-mono text-neutral-400 block font-bold">GARANTÍA TOTAL</span>
                                <h3 className="text-base font-bold text-white">¿Cuánto tarda la entrega?</h3>
                                <p className="text-xs text-neutral-300 leading-relaxed font-light">
                                    Entre 14 y 21 días hábiles con el sistema 100% probado en tu negocio, capacitación presencial/virtual a tu personal y garantía de operatividad.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                                <a 
                                    href="#tarifario" 
                                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:underline"
                                >
                                    <span>Ver Precios Oficiales</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. SECCIÓN: LA OPERACIÓN VIVA (MAPA DE METRO) */}
                <section className="w-full border-t border-neutral-100">
                    <div className="w-full max-w-5xl mx-auto px-4 pt-16 md:pt-24 pb-4 flex flex-col items-start">
                        <div className="text-left max-w-2xl mb-4 md:mb-8 space-y-4">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">Flujo Operativo Automatizado</span>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                                Imagina que cada acción desencadena la siguiente.
                            </h2>
                            <p className="text-base text-neutral-500 max-w-2xl leading-relaxed font-light pt-2">
                                Sin copiar información a mano. Sin planillas dispersas. Sin depender de que alguien recuerde enviar el recordatorio.
                            </p>
                        </div>
                    </div>
                    <OperationMap />
                </section>

                {/* 7. SECCIÓN TARIFARIO Y PRECIOS: EL TARIFARIO MODULAR AVANZADO + EL EFECTO SAAS */}
                <section id="tarifario" className="w-full max-w-5xl mx-auto px-4 py-20 space-y-12 border-t border-neutral-100">
                    <div className="space-y-4 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-md">
                            <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-800 font-bold">
                                TARIFARIO TRANSPARENTE · SETUP ÚNICO + FEE MENSUAL
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900">
                            Tarifario Modular y la Estrategia de Venta (Efecto SaaS).
                        </h2>
                        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                            Explicado sin rodeos técnicos ni letra chica. Puedes implementar módulos individuales según la madurez de tu negocio o activar el <strong className="text-neutral-900 font-semibold">Paquete Fundador (Ecosistema Completo)</strong> con un descuento de hasta un 40%.
                        </p>
                    </div>

                    {/* TABLA DEL TARIFARIO MODULAR AVANZADO */}
                    <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                        <div className="bg-neutral-900 text-white p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                                    SETUP / PAGO ÚNICO POR IMPLEMENTACIÓN LLAVE EN MANO
                                </span>
                                <h3 className="text-base font-bold">Desglose Modular de Infraestructura</h3>
                            </div>
                            <span className="text-xs font-mono bg-neutral-800 px-3 py-1 rounded-full text-emerald-400 font-bold">
                                Valores en CLP (+IVA)
                            </span>
                        </div>

                        <div className="divide-y divide-neutral-200">
                            {/* MÓDULO 1 */}
                            <div className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-neutral-50/60 transition-colors">
                                <div className="space-y-2 max-w-2xl">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                                            Módulo Estratégico 01
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-neutral-900">
                                        Plataforma Web + Pasarelas de Pago + ERP/CRM Interno
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                                        <em>"No es solo una página web, es la matriz de tu negocio. Una sucursal digital que procesa pagos automáticamente y guarda a cada cliente en un CRM interno (base de datos) para que tengas el control total de tu inventario y tus ventas en una sola pantalla."</em>
                                    </p>
                                </div>
                                <div className="text-left md:text-right shrink-0 bg-neutral-50 md:bg-transparent p-3 md:p-0 rounded-xl w-full md:w-auto">
                                    <span className="text-xs font-mono text-neutral-400 uppercase block">Inversión Setup</span>
                                    <span className="text-lg sm:text-xl font-mono font-bold text-neutral-900 block">
                                        $750.000 - $1.200.000
                                    </span>
                                    <span className="text-[10px] font-mono text-neutral-500">Pago único</span>
                                </div>
                            </div>

                            {/* MÓDULO 2 */}
                            <div className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-neutral-50/60 transition-colors">
                                <div className="space-y-2 max-w-2xl">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-600" />
                                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                                            Módulo Estratégico 02
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-neutral-900">
                                        Asistente IA Omnicanal + Panel LiveChat Unificado
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                                        <em>"Un recepcionista con Inteligencia Artificial que atiende WhatsApp, Instagram y tu Web al mismo tiempo. Sabe cuándo responder, pero si la venta es compleja, se silencia y te avisa para que tú o tu equipo tomen el control desde un panel de chat unificado."</em>
                                    </p>
                                </div>
                                <div className="text-left md:text-right shrink-0 bg-neutral-50 md:bg-transparent p-3 md:p-0 rounded-xl w-full md:w-auto">
                                    <span className="text-xs font-mono text-neutral-400 uppercase block">Inversión Setup</span>
                                    <span className="text-lg sm:text-xl font-mono font-bold text-neutral-900 block">
                                        $500.000 - $850.000
                                    </span>
                                    <span className="text-[10px] font-mono text-neutral-500">Pago único</span>
                                </div>
                            </div>

                            {/* MÓDULO 3 */}
                            <div className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-neutral-50/60 transition-colors">
                                <div className="space-y-2 max-w-2xl">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-purple-600" />
                                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                                            Módulo Estratégico 03
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-neutral-900">
                                        Motor de Agendamiento Online + CRM de Citas (Anti No-Show)
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                                        <em>"Tu agenda en piloto automático. El cliente reserva su hora, el sistema lo registra en tu CRM y le envía automáticamente las confirmaciones al instante. Adiós a las confusiones de horarios y al trabajo manual."</em>
                                    </p>
                                </div>
                                <div className="text-left md:text-right shrink-0 bg-neutral-50 md:bg-transparent p-3 md:p-0 rounded-xl w-full md:w-auto">
                                    <span className="text-xs font-mono text-neutral-400 uppercase block">Inversión Setup</span>
                                    <span className="text-lg sm:text-xl font-mono font-bold text-neutral-900 block">
                                        $350.000 - $600.000
                                    </span>
                                    <span className="text-[10px] font-mono text-neutral-500">Pago único</span>
                                </div>
                            </div>

                            {/* MÓDULO 4 */}
                            <div className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-neutral-50/60 transition-colors">
                                <div className="space-y-2 max-w-2xl">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-amber-600" />
                                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                                            Módulo Estratégico 04
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-neutral-900">
                                        Motor de Notificaciones 360° (WhatsApp Cloud API + Email SMTP)
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                                        <em>"El sistema nervioso de tu empresa. Persigue a los que abandonan el carrito para recuperar la venta, envía recordatorios automáticos 24 hrs antes para que nadie falte a su cita, y les pide reseñas (feedback) cuando el servicio termina."</em>
                                    </p>
                                </div>
                                <div className="text-left md:text-right shrink-0 bg-neutral-50 md:bg-transparent p-3 md:p-0 rounded-xl w-full md:w-auto">
                                    <span className="text-xs font-mono text-neutral-400 uppercase block">Inversión Setup</span>
                                    <span className="text-lg sm:text-xl font-mono font-bold text-neutral-900 block">
                                        $350.000 - $550.000
                                    </span>
                                    <span className="text-[10px] font-mono text-neutral-500">Pago único</span>
                                </div>
                            </div>

                            {/* MÓDULO 5 */}
                            <div className="p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-neutral-50/60 transition-colors">
                                <div className="space-y-2 max-w-2xl">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-red-600" />
                                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                                            Módulo Estratégico 05
                                        </span>
                                    </div>
                                    <h4 className="text-lg font-bold text-neutral-900">
                                        Infraestructura Growth (CAPI Server-Side, GA4, Clarity & Protocolo GEO llms.txt)
                                    </h4>
                                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                                        <em>"El cerebro analítico. Conectamos tu negocio a los algoritmos de Meta, TikTok y Google. Optimizamos tu web para que la IA de ChatGPT te recomiende, y grabamos anónimamente cómo navegan tus clientes (mapas de calor) para saber exactamente por qué compran o por qué se van."</em>
                                    </p>
                                </div>
                                <div className="text-left md:text-right shrink-0 bg-neutral-50 md:bg-transparent p-3 md:p-0 rounded-xl w-full md:w-auto">
                                    <span className="text-xs font-mono text-neutral-400 uppercase block">Inversión Setup</span>
                                    <span className="text-lg sm:text-xl font-mono font-bold text-neutral-900 block">
                                        $400.000 - $700.000
                                    </span>
                                    <span className="text-[10px] font-mono text-neutral-500">Pago único</span>
                                </div>
                            </div>
                        </div>

                        {/* SUMA TOTAL SUELTO */}
                        <div className="bg-neutral-100 p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-neutral-300">
                            <div>
                                <span className="text-xs font-mono text-neutral-500 uppercase block">
                                    Total de la tecnología contratada por módulos sueltos:
                                </span>
                                <span className="text-xl sm:text-2xl font-mono font-bold text-neutral-900 line-through decoration-red-500 decoration-2">
                                    $2.350.000 - $3.900.000 CLP
                                </span>
                            </div>
                            <span className="text-xs text-neutral-600 font-light">
                                Comprar la tecnología suelta resulta más costoso e ineficiente.
                            </span>
                        </div>
                    </div>

                    {/* LA ESTRATEGIA COMERCIAL: EL PAQUETE FUNDADOR */}
                    <div className="border-2 border-emerald-600 bg-gradient-to-br from-white to-emerald-50/30 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-mono uppercase px-4 py-1.5 rounded-bl-xl font-bold tracking-widest flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>LA ESTRATEGIA DE VENTA // EL PAQUETE FUNDADOR</span>
                        </div>

                        <div className="space-y-4 max-w-3xl">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-800 font-bold block">
                                OPCIÓN RECOMENDADA · DESCUENTO POR ECOSISTEMA
                            </span>
                            <h3 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight">
                                El Paquete Fundador: Todo el Ecosistema en un solo Setup.
                            </h3>
                            <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
                                Le demostramos al cliente que comprar tecnología suelta es ineficiente y caro. Al contratar la <strong className="font-semibold text-neutral-900">implementación total del Ecosistema Mercenario</strong> en un solo proyecto, el setup se empaqueta con un beneficio directo:
                            </p>
                        </div>

                        {/* PRECIO PAQUETE FUNDADOR */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 bg-white rounded-2xl border border-emerald-200 shadow-sm">
                            <div className="md:col-span-7 space-y-2">
                                <span className="text-xs font-mono text-emerald-700 font-bold uppercase">
                                    SETUP TOTAL EMPAQUETADO (5 MÓDULOS INTEGRADOS)
                                </span>
                                <div className="text-3xl sm:text-5xl font-mono font-black text-neutral-900">
                                    $1.800.000 <span className="text-lg text-neutral-400 font-normal">-</span> $2.200.000 <span className="text-xs font-sans text-neutral-500 font-normal">CLP</span>
                                </div>
                                <p className="text-xs text-neutral-600 font-light">
                                    Ahorro directo de hasta <strong>$1.700.000 CLP</strong> respecto a contratar los 5 módulos por separado. Entrega 100% operativa en 14 a 21 días hábiles con garantía.
                                </p>
                            </div>

                            <div className="md:col-span-5 flex flex-col gap-3">
                                <button
                                    onClick={() => handleSelectSystemForQuote("Ecosistema Completo (Paquete Fundador: $1.8M - $2.2M CLP)")}
                                    className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono uppercase tracking-wider rounded-xl transition-all font-bold text-center shadow-md flex items-center justify-center gap-2"
                                >
                                    <span>Postular al Paquete Fundador</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20me%20interesa%20conversar%20sobre%20el%20Paquete%20Fundador%20del%20Ecosistema%20Completo`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-center text-xs font-mono text-neutral-600 hover:text-black underline"
                                >
                                    Hablar directamente por WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* DETALLE DE LO QUE INCLUYE EL PAQUETE FUNDADOR */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs text-neutral-700">
                            <div className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>Sitio Web Next.js a medida autoadministrable (0.8s de carga).</span>
                            </div>
                            <div className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>Asistente IA en WhatsApp con RAG y panel LiveChat omnicanal.</span>
                            </div>
                            <div className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>Agenda online con cobro Webpay obligatorio (anti No-Show).</span>
                            </div>
                            <div className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>Notificaciones automáticas (recuperación de carritos + alertas dueño).</span>
                            </div>
                            <div className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>Blindaje CAPI Server-side, GA4, Clarity y protocolo GEO llms.txt.</span>
                            </div>
                            <div className="flex items-start gap-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span>Capacitación presencial/virtual al personal y soporte prioritario.</span>
                            </div>
                        </div>
                    </div>

                    {/* LA MENSUALIDAD JUSTIFICADA */}
                    <div className="border border-neutral-200 bg-neutral-900 text-white rounded-3xl p-6 sm:p-10 space-y-8 shadow-lg">
                        <div className="space-y-3 max-w-3xl">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold block">
                                MANTENIMIENTO OPERATIVO Y ACOMPAÑAMIENTO MENSUAL
                            </span>
                            <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                                La Mensualidad Justificada: $150.000 a $250.000 CLP / mes.
                            </h3>
                            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                                Como ahora le entregamos a tu empresa un ERP, un CRM, un panel omnicanal de chat y análisis de datos en tiempo real, la mensualidad ya no es solo "por el hosting". Es el costo de mantener una infraestructura corporativa operando en piloto automático:
                            </p>
                        </div>

                        {/* CONTENIDO DEL FEE MENSUAL */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-5 bg-neutral-800/80 rounded-2xl border border-neutral-700 space-y-2">
                                <Cpu className="w-5 h-5 text-emerald-400" />
                                <h4 className="text-sm font-bold text-white">Nube & Base Postgres</h4>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                                    Servidores Edge para tu web Next.js y respaldos automáticos diarios en Supabase.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-800/80 rounded-2xl border border-neutral-700 space-y-2">
                                <Smartphone className="w-5 h-5 text-emerald-400" />
                                <h4 className="text-sm font-bold text-white">APIs Oficiales de Meta Cloud</h4>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                                    Webhooks de WhatsApp oficial, tokens seguros, plantillas transaccionales homologadas y cero riesgo de baneo.
                                </p>
                            </div>

                            <div className="p-5 bg-neutral-800/80 rounded-2xl border border-neutral-700 space-y-2">
                                <Bot className="w-5 h-5 text-emerald-400" />
                                <h4 className="text-sm font-bold text-white">Soporte Continuo & IA</h4>
                                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                                    Ajustes en la base RAG al cambiar precios o servicios, monitoreo 99.9% de uptime y soporte técnico.
                                </p>
                            </div>
                        </div>

                        {/* COMPARATIVA DE COSTOS */}
                        <div className="p-6 bg-neutral-800 rounded-2xl border border-neutral-700 space-y-4">
                            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold">
                                <TrendingDown className="w-4 h-4" />
                                <span>Comparativa de Costos: Humano vs. Infraestructura Mercenario</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                                <div className="space-y-2 text-neutral-300 border-b md:border-b-0 md:border-r border-neutral-700 pb-4 md:pb-0 md:pr-4">
                                    <span className="font-bold text-red-400 uppercase font-mono block">Operación Tradicional Desconectada:</span>
                                    <ul className="space-y-1 font-light text-neutral-400">
                                        <li>• 1 Recepcionista / Asistente diurno: $600.000 / mes</li>
                                        <li>• 1 Vendedor de guardia nocturna / fines de semana: $650.000 / mes</li>
                                        <li>• Licencias dispersas (HubSpot + Calendly + Mailchimp): $350.000 / mes</li>
                                        <li className="text-white font-bold pt-1 border-t border-neutral-700 font-mono">
                                            Total mensual en gastos fijos: ≈ $1.600.000 CLP / mes
                                        </li>
                                    </ul>
                                </div>

                                <div className="space-y-2 text-neutral-300">
                                    <span className="font-bold text-emerald-400 uppercase font-mono block">Con el Sistema Operativo Mercenario:</span>
                                    <ul className="space-y-1 font-light text-neutral-300">
                                        <li>• Asistente IA 24/7 sin licencias médicas ni ausencias.</li>
                                        <li>• Agenda y cobro con Webpay en piloto automático.</li>
                                        <li>• Todo unificado en una sola mensualidad transparente.</li>
                                        <li className="text-emerald-400 font-bold pt-1 border-t border-neutral-700 font-mono text-sm">
                                            Fee mensual: $150.000 a $250.000 CLP / mes (Ahorro del 85%)
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. SECCIÓN: CONECTIVIDAD (INTEGRACIONES OFICIALES) */}
                <section className="w-full max-w-5xl mx-auto px-4 pt-16 md:pt-24 pb-24 space-y-12 border-t border-neutral-100">
                    <div className="space-y-4">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">Conectividad Nata</span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                            Integrado con las herramientas que ya usas en Chile.
                        </h2>
                        <p className="text-base text-neutral-500 max-w-2xl leading-relaxed font-light pt-4">
                            No necesitas cambiar tus cuentas bancarias ni tus proveedores. Mercenario se conecta sobre tu infraestructura actual.
                        </p>
                    </div>

                    {/* Marquee de Logos */}
                    <div className="relative w-full overflow-hidden py-4" style={{ maskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, white 15%, white 85%, transparent)" }}>
                        <div className="flex gap-3 w-max animate-marquee py-2">
                            {Array.from({ length: 20 }, (_, i) => `/imagenes/logos herramientas con fondo/${i + 1}.png`)
                                .concat(Array.from({ length: 20 }, (_, i) => `/imagenes/logos herramientas con fondo/${i + 1}.png`))
                                .map((src, idx) => (
                                    <div key={idx} className="w-32 h-18 md:w-40 md:h-22 flex items-center justify-center border border-neutral-100 rounded-xl bg-white/80 backdrop-blur-sm grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:border-neutral-300 hover:shadow-sm transition-all duration-300 select-none p-3">
                                        <img src={src} alt={`Logo ${idx + 1}`} className="w-full h-full object-contain" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>

                {/* 9. SECCIÓN: DIAGNÓSTICO OPERATIVO Y CONTACTO UNIFICADO */}
                <motion.section 
                    id="contacto" 
                    initial={{ opacity: 0 }} 
                    whileInView={{ opacity: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.8 }} 
                    className="w-full max-w-5xl mx-auto px-4 py-20 border-t border-neutral-100"
                >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-5 space-y-6">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">CONTACTO & DIAGNÓSTICO</span>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                                Agendemos una sesión técnica de 20 minutos.
                            </h2>
                            <p className="text-sm text-neutral-500 font-light leading-relaxed">
                                Analizaremos tu operación actual, detectaremos dónde se caen las ventas y te entregaremos una propuesta formal aterrizada al tarifario oficial de Mercenario.
                            </p>
                            
                            <div className="space-y-4 pt-4 border-t border-neutral-100 text-xs text-neutral-600 font-light">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-neutral-400" />
                                    <span>Tiempo de implementación: 14 a 21 días hábiles</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    <span>Garantía de operatividad y capacitación incluida</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DollarSign className="w-4 h-4 text-neutral-400" />
                                    <span>Sin costos sorpresa ni comisiones intermedias</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <a 
                                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quisiera%20agendar%20un%20diagn%C3%B3stico%20operativo%20para%20mi%20empresa`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-colors"
                                >
                                    <Smartphone className="w-4 h-4" />
                                    <span>Chatear por WhatsApp Directo</span>
                                </a>
                            </div>
                        </div>

                        {/* Formulario */}
                        <div className="md:col-span-7 bg-white p-8 md:p-10 border border-neutral-200 rounded-3xl shadow-sm">
                            {formStatus === "success" ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center">
                                        <Check className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-black">Solicitud Recibida Correctamente</h3>
                                    <p className="text-xs text-neutral-500 max-w-sm leading-relaxed font-light">
                                        Te contactaremos vía WhatsApp o correo en menos de 2 horas hábiles con el detalle de la arquitectura para tu empresa.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-6">
                                    {/* Honeypot field */}
                                    <input 
                                        type="text" 
                                        name="_company_site" 
                                        value={formData._honeypot} 
                                        onChange={(e) => setFormData({ ...formData, _honeypot: e.target.value })} 
                                        className="hidden" 
                                        tabIndex={-1} 
                                        autoComplete="off" 
                                    />

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                                                Nombre o Empresa *
                                            </label>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="Ej. Matías Silva - Clínica / Marca X"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black transition-colors"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                                                    Correo Electrónico *
                                                </label>
                                                <input 
                                                    type="email" 
                                                    required
                                                    placeholder="contacto@tuempresa.cl"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                                                    Teléfono / WhatsApp *
                                                </label>
                                                <input 
                                                    type="tel" 
                                                    required
                                                    placeholder="+56 9 1234 5678"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                                                Opción o Paquete de Interés *
                                            </label>
                                            <select 
                                                value={formData.system}
                                                onChange={(e) => setFormData({ ...formData, system: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black transition-colors bg-white"
                                            >
                                                <option value="Paquete Fundador (Ecosistema Completo: $1.8M - $2.2M CLP)">★ Paquete Fundador (Ecosistema Completo: $1.8M - $2.2M CLP)</option>
                                                <option value="Módulo 1: Plataforma Web + Pagos + ERP ($750K - $1.2M CLP)">Módulo 1: Plataforma Web + Pagos + ERP ($750K - $1.2M CLP)</option>
                                                <option value="Módulo 2: Asistente IA WhatsApp + LiveChat ($500K - $850K CLP)">Módulo 2: Asistente IA WhatsApp + LiveChat ($500K - $850K CLP)</option>
                                                <option value="Módulo 3: Motor de Agendamiento + CRM ($350K - $600K CLP)">Módulo 3: Motor de Agendamiento + CRM ($350K - $600K CLP)</option>
                                                <option value="Módulo 4: Notificaciones 360° ($350K - $550K CLP)">Módulo 4: Notificaciones 360° ($350K - $550K CLP)</option>
                                                <option value="Módulo 5: Data, CAPI & SEO GEO ($400K - $700K CLP)">Módulo 5: Data, CAPI & SEO GEO ($400K - $700K CLP)</option>
                                                <option value="E-Commerce & Retail (Caso WEKE)">E-Commerce & Retail (Caso WEKE)</option>
                                                <option value="Clínica, Estética & Salud">Clínica, Estética & Salud</option>
                                                <option value="Servicios B2B & Inmobiliaria">Servicios B2B & Inmobiliaria</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                                                ¿Cuál es el mayor dolor en tu operación hoy?
                                            </label>
                                            <textarea 
                                                rows={3}
                                                placeholder="Ej. Perdemos ventas fuera de horario, la gente no asiste a sus citas, o tenemos desorden en las planillas de inventario..."
                                                value={formData.challenge}
                                                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-xs focus:outline-none focus:border-black transition-colors resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={formStatus === "loading"}
                                        className="w-full py-4 bg-black text-white text-xs font-semibold tracking-wider uppercase rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm font-mono"
                                    >
                                        {formStatus === "loading" ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                <span>Enviando información...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Solicitar Cotización Formal</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </motion.section>
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-neutral-100 bg-[#FCFCFC] py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-mono text-neutral-400">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                        <span className="text-black font-semibold tracking-wider uppercase">MERCENARIO // INFRAESTRUCTURA OPERATIVA & SITIOS WEB</span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <a href="#demostracion-weke" className="hover:text-black transition-colors">Caso WEKE</a>
                        <a href="#sistemas" className="hover:text-black transition-colors">Sistemas</a>
                        <a href="#modulos" className="hover:text-black transition-colors">Módulos</a>
                        <a href="#tarifario" className="hover:text-black transition-colors font-bold text-neutral-900">Tarifario CLP</a>
                        <Link href="/tienda" className="hover:text-black text-emerald-700 font-bold transition-colors">Demo WEKE</Link>
                        <Link href="/admin" className="hover:text-black transition-colors">Panel ERP</Link>
                        <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">WhatsApp IA</a>
                    </div>

                    <span>© {new Date().getFullYear()} Mercenario Technologies. Santiago, Chile.</span>
                </div>
            </footer>

            {/* Widget Flotante de WhatsApp IA */}
            <div className="fixed bottom-6 right-6 z-50">
                <a
                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20estoy%20viendo%20la%20web%20de%20Mercenario%20y%20quiero%20hacer%20una%20consulta`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-mono rounded-full shadow-2xl border border-neutral-700 transition-all hover:scale-105 group"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Asistente IA en WhatsApp</span>
                    <Bot className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
                </a>
            </div>
        </div>
    );
}
