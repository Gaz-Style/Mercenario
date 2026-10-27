"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
    ArrowRight,
    ChevronDown,
    Menu,
    X,
    Check,
    Clock,
    ShieldCheck,
    Smartphone,
    RefreshCw,
    Sparkles,
    CheckCircle2,
    Stethoscope,
    ExternalLink,
    Activity
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// Componentes estilo Tiendanube (Simplicidad Radical + Conversión)
import TiendaHero from "@/components/home/TiendaHero";
import ThreeSteps from "@/components/home/ThreeSteps";
import OmnichannelPillars from "@/components/home/OmnichannelPillars";
import StoreShowcase from "@/components/home/StoreShowcase";
import SimpleFAQ from "@/components/home/SimpleFAQ";

// Componentes de propuesta comercial y ecosistema
import LocalEcosystem from "@/components/saas/LocalEcosystem";
import SavingsCalculator from "@/components/saas/SavingsCalculator";
import PricingPlans from "@/components/saas/PricingPlans";
import PlatformComparison from "@/components/saas/PlatformComparison";

export default function Home() {
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        phone: "",
        system: "Negocio Omnicanal ($44.990 CLP/mes) - Más Elegido", 
        challenge: "", 
        _honeypot: "" 
    });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

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
        
        if (formData._honeypot) {
            setFormStatus("success");
            setFormData({ name: "", email: "", phone: "", system: "Negocio Omnicanal ($44.990 CLP/mes) - Más Elegido", challenge: "", _honeypot: "" });
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
                challenge: `[Plan: ${formData.system}] [Tel: ${formData.phone}] ${formData.challenge}`, 
                budget: formData.system 
            }]);

        if (error) {
            console.error("Error guardando lead:", error);
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 4000);
        } else {
            setFormStatus("success");
            setFormData({ name: "", email: "", phone: "", system: "Negocio Omnicanal ($44.990 CLP/mes) - Más Elegido", challenge: "", _honeypot: "" });
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
        <div className="min-h-screen bg-white text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            
            {/* ─── HEADER COMERCIAL LIMPIO ─── */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-white/95 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex justify-between items-center relative z-50">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-2.5 h-2.5 bg-black rounded-full group-hover:scale-125 transition-transform" />
                            <span className="text-xs font-black tracking-[0.2em] text-black uppercase flex items-center gap-2">
                                MERCENARIO <span className="text-neutral-300 font-light">|</span> <span className="text-neutral-500 font-bold text-[10px]">TIENDAS &amp; POS CHILE</span>
                            </span>
                        </Link>

                        <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold tracking-wider text-neutral-500 uppercase select-none">
                            <Link href="/que-es-mercenario" className="text-black font-extrabold hover:opacity-80 transition-opacity py-2 border-b-2 border-black">
                                ¿Qué es Mercenario?
                            </Link>
                            <a href="#como-funciona" className="hover:text-black transition-colors py-2">
                                Cómo Funciona
                            </a>
                            <a href="#soluciones" className="hover:text-black transition-colors py-2">
                                Todo Resuelto
                            </a>
                            <a href="#disenos" className="hover:text-black transition-colors py-2">
                                Diseños
                            </a>
                            <a href="#planes" className="hover:text-black transition-colors py-2 text-black font-black">
                                Planes CLP
                            </a>
                            <a href="#calculadora" className="hover:text-black transition-colors py-2">
                                0% Comisión
                            </a>
                            <a href="#faq" className="hover:text-black transition-colors py-2">
                                Preguntas
                            </a>
                            <Link href="/tienda" className="hover:text-black transition-colors py-2 text-neutral-400">
                                Tienda Demo
                            </Link>
                            <a 
                                href="https://clinicafy-beige.vercel.app/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors text-[10px] font-bold"
                            >
                                <Stethoscope className="w-3 h-3 text-emerald-600" />
                                <span>Clinicafy (Salud)</span>
                                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                            </a>
                        </nav>
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        <a 
                            href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quisiera%20consultar%20sobre%20los%20planes%20para%20crear%20mi%20tienda%20online`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-bold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors"
                        >
                            WhatsApp
                        </a>
                        <a 
                            href="#planes" 
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-black text-white text-[11px] font-bold tracking-wider uppercase rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
                        >
                            <span>Crear Mi Tienda</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    <button 
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-neutral-700 hover:text-black focus:outline-none"
                        aria-label="Abrir Menú"
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
                            className="lg:hidden bg-white border-b border-neutral-100 px-6 py-8 flex flex-col gap-5 shadow-2xl"
                        >
                            <div className="flex flex-col gap-4 text-sm font-bold text-neutral-900">
                                <Link 
                                    href="/que-es-mercenario" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-1 text-black font-extrabold flex items-center justify-between border-b border-neutral-100 pb-2"
                                >
                                    <span>¿Qué es Mercenario? (Manifiesto)</span>
                                    <span className="text-xs text-neutral-400">→</span>
                                </Link>
                                <a 
                                    href="#como-funciona" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-1"
                                >
                                    Cómo Funciona en 3 Pasos
                                </a>
                                <a 
                                    href="#soluciones" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-1"
                                >
                                    Todo Resuelto (Pagos, Envíos, POS)
                                </a>
                                <a 
                                    href="#disenos" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-1"
                                >
                                    Diseños y Plantillas
                                </a>
                                <a 
                                    href="#planes" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-1 text-black font-black"
                                >
                                    Planes en CLP (0% Comisión)
                                </a>
                                <a 
                                    href="#calculadora" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-1 text-neutral-700"
                                >
                                    Calculadora de Ahorro
                                </a>
                                <a 
                                    href="#faq" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-1 text-neutral-700"
                                >
                                    Preguntas Frecuentes
                                </a>
                                <Link 
                                    href="/tienda" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-1 text-neutral-500 font-normal"
                                >
                                    Ver Tienda de Prueba (WEKE)
                                </Link>
                                <a 
                                    href="https://clinicafy-beige.vercel.app/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <Stethoscope className="w-4 h-4 text-emerald-600" />
                                        <span>Clinicafy (Clínicas &amp; Salud)</span>
                                    </div>
                                    <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                                </a>
                            </div>

                            <div className="pt-4 border-t border-neutral-100 flex flex-col gap-3">
                                <a 
                                    href="#planes" 
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-4 bg-black text-white text-center text-xs font-bold tracking-widest uppercase rounded-full shadow-md"
                                >
                                    Comenzar Mi Proyecto
                                </a>
                                <a 
                                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quisiera%20conversar%20sobre%20los%20planes%20para%20mi%20tienda`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 border border-neutral-300 text-center text-xs font-bold tracking-widest uppercase rounded-full text-neutral-800"
                                >
                                    Hablar por WhatsApp
                                </a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <main className="w-full flex flex-col items-center">
                
                {/* ─── 01. HERO DIRECTO ESTILO TIENDANUBE (Con input para crear tienda al instante) ─── */}
                <TiendaHero onStartTrial={(name) => handleSelectSystemForQuote(`Prueba Gratis para Tienda: ${name}`)} />

                {/* ─── 02. CÓMO FUNCIONA EN 3 SIMPLES PASOS ─── */}
                <ThreeSteps />

                {/* ─── 03. TODO LO QUE TU NEGOCIO NECESITA (Pagos, Envíos, POS, Boletas SII, Redes) ─── */}
                <OmnichannelPillars />

                {/* ─── 04. DISEÑOS MODERNOS DE ALTA CONVERSIÓN MÓVIL ─── */}
                <StoreShowcase />

                {/* ─── 05. ECOSISTEMA LOCAL CHILENO (Webpay, Starken, SII, WhatsApp) ─── */}
                <LocalEcosystem />

                {/* ─── 06. CALCULADORA INTERACTIVA DE AHORRO 0% COMISIÓN ─── */}
                <SavingsCalculator onSelectPlan={handleSelectSystemForQuote} />

                {/* ─── 07. PLANES & PRECIOS SAAS EN PESOS CHILENOS (CLP) ─── */}
                <PricingPlans onSelectPlan={handleSelectSystemForQuote} />

                {/* ─── 08. TABLA COMPARATIVA DIRECTA VS TIENDANUBE / SHOPIFY ─── */}
                <PlatformComparison />

                {/* ─── 09. PREGUNTAS FRECUENTES CLARAS Y HUMANAS (FAQ) ─── */}
                <SimpleFAQ />

                {/* ─── 10. BANNER SECUNDARIO PARA CLIENTES CORPORATIVOS O CÓDIGO DEDICADO ─── */}
                <section className="w-full max-w-5xl mx-auto px-4 py-8 space-y-6">
                    {/* Tarjeta Clinicafy para Centros Médicos & Clínicas */}
                    <div className="bg-gradient-to-br from-emerald-950 via-neutral-900 to-black text-white rounded-3xl p-7 sm:p-9 border border-emerald-800/40 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="space-y-3 max-w-2xl">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-400 font-bold">
                                        SOLUCIÓN VERTICAL DE SALUD // CLINICAFY
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                                    ¿Operas un Centro Médico, Clínica Dental o Terapéutica?
                                </h3>
                                <p className="text-sm text-neutral-300 font-light leading-relaxed">
                                    Diseñamos <strong className="text-white font-semibold">Clinicafy</strong>: la plataforma operativa especializada en agendamiento automatizado por WhatsApp con IA, confirmación de citas para reducir inasistencias (no-shows) bajo el 8%, cobro Webpay y liquidación automática a especialistas médicos con boleta de honorarios.
                                </p>
                                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-emerald-300/90 pt-1">
                                    <span className="flex items-center gap-1.5">✓ Agendamiento 24/7</span>
                                    <span className="flex items-center gap-1.5">✓ Ficha Clínica Digital</span>
                                    <span className="flex items-center gap-1.5">✓ Reembolso Isapre</span>
                                    <span className="flex items-center gap-1.5">✓ Multi-Sucursal</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                                <a
                                    href="https://clinicafy-beige.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3.5 bg-emerald-400 text-neutral-950 hover:bg-emerald-300 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 font-mono group-hover:scale-102"
                                >
                                    <Stethoscope className="w-4 h-4" />
                                    <span>Ver Demo Clinicafy</span>
                                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                                </a>
                                <Link
                                    href="/propuesta/centro-la-dehesa"
                                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors border border-white/15 text-center font-mono"
                                >
                                    Caso Centro La Dehesa
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Banner Empresas y Alto Volumen */}
                    <div className="bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                        <div className="space-y-1">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">
                                EMPRESAS &amp; ALTO VOLUMEN
                            </span>
                            <h3 className="text-base sm:text-lg font-bold text-neutral-900">
                                ¿Buscas arquitectura dedicada, código fuente propio o integración con tu ERP existente?
                            </h3>
                            <p className="text-xs text-neutral-500 font-light max-w-2xl">
                                Desarrollamos e implementamos infraestructura a medida sobre Next.js y Supabase con entrega llave en mano.
                            </p>
                        </div>
                        <button
                            onClick={() => handleSelectSystemForQuote("Arquitectura Dedicada / Enterprise")}
                            className="shrink-0 px-6 py-3 border border-neutral-300 hover:border-black bg-white text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap shadow-sm"
                        >
                            Cotizar a Medida
                        </button>
                    </div>
                </section>

                {/* ─── 11. FORMULARIO DE CONTACTO Y ASESORÍA DIRECTA ─── */}
                <motion.section 
                    id="contacto" 
                    initial={{ opacity: 0 }} 
                    whileInView={{ opacity: 1 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.8 }} 
                    className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-20 border-t border-neutral-100"
                >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                        <div className="md:col-span-5 space-y-6">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">
                                COMIENZA HOY
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 leading-tight">
                                Hablemos de tu tienda y tu negocio.
                            </h2>
                            <p className="text-sm text-neutral-600 font-light leading-relaxed">
                                <strong>Cada proyecto es personalizado:</strong> adaptamos el software, la identidad visual, los flujos de cobro y los circuitos de inventario exactamente a la medida de tu negocio.
                            </p>
                            
                            <div className="space-y-3 pt-2 text-xs text-neutral-600 font-light">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>Puesta en marcha rápida con entrega llave en mano</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>Acompañamiento en la carga inicial y pasarelas de pago</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                    <span>0% de comisiones por venta garantizado</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <a 
                                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quisiera%20abrir%20mi%20tienda%20online%20con%20Mercenario`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                                >
                                    <Smartphone className="w-4 h-4 shrink-0" />
                                    <span>Escribir por WhatsApp Directo</span>
                                </a>
                            </div>
                        </div>

                        {/* Formulario */}
                        <div className="md:col-span-7 bg-white p-6 sm:p-8 border border-neutral-200 rounded-3xl shadow-sm">
                            {formStatus === "success" ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                                >
                                    <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                                        <Check className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-black">¡Solicitud Recibida con Éxito!</h3>
                                    <p className="text-xs text-neutral-600 max-w-sm leading-relaxed font-light">
                                        Te contactaremos vía WhatsApp o correo en menos de 15 minutos para ayudarte a dar de alta tu tienda.
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
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
                                            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold block">
                                                Nombre o Marca de tu Tienda *
                                            </label>
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="Ej. Mi Tienda de Ropa / Matías Silva"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold block">
                                                    Correo Electrónico *
                                                </label>
                                                <input 
                                                    type="email" 
                                                    required
                                                    placeholder="tucorreo@ejemplo.cl"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold block">
                                                    Teléfono / WhatsApp *
                                                </label>
                                                <input 
                                                    type="tel" 
                                                    required
                                                    placeholder="+56 9 1234 5678"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold block">
                                                Plan de Interés *
                                            </label>
                                            <select 
                                                value={formData.system}
                                                onChange={(e) => setFormData({ ...formData, system: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors bg-white font-medium"
                                            >
                                                <option value="Negocio Omnicanal ($44.990 CLP/mes) - Más Elegido">★ Negocio Omnicanal ($44.990 CLP/mes) - POS + Boleta SII</option>
                                                <option value="Starter Digital ($14.990 CLP/mes)">Starter Digital ($14.990 CLP/mes) - Tienda Web + Pagos</option>
                                                <option value="Retail Pro + Asistente IA ($89.990 CLP/mes)">Retail Pro + Asistente IA ($89.990 CLP/mes) - WhatsApp Bot (1.000 chats)</option>
                                                <option value="Servicio Llave en Mano Express ($149.000 CLP Setup)">Setup Llave en Mano Express ($149.000 CLP únicos)</option>
                                                <option value="Arquitectura Dedicada / Enterprise">Arquitectura Dedicada / Enterprise</option>
                                            </select>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-bold block">
                                                ¿Qué vendes actualmente o qué necesitas resolver?
                                            </label>
                                            <textarea 
                                                rows={3}
                                                placeholder="Ej. Vendo por Instagram y quiero profesionalizar mis cobros con Webpay, o tengo un local físico y quiero sincronizar mi stock..."
                                                value={formData.challenge}
                                                onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                                                className="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black transition-colors resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={formStatus === "loading"}
                                        className="w-full py-4 bg-black text-white text-xs font-bold tracking-wider uppercase rounded-xl hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        {formStatus === "loading" ? (
                                            <>
                                                <RefreshCw className="w-4 h-4 animate-spin" />
                                                <span>Enviando información...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Solicitar Puesta en Marcha</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>

                                    {formStatus === "error" && (
                                        <p className="text-xs text-red-600 text-center">
                                            Hubo un detalle al enviar. Por favor escríbenos directamente por WhatsApp.
                                        </p>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </motion.section>
            </main>

            {/* ─── FOOTER COMERCIAL LIMPIO ─── */}
            <footer className="w-full border-t border-neutral-100 bg-white py-12 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                        <div className="w-2 h-2 bg-black rounded-full shrink-0" />
                        <span className="text-black font-bold tracking-wider uppercase">MERCENARIO // E-COMMERCE &amp; RETAIL CHILE</span>
                    </div>
                    
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs">
                        <Link href="/que-es-mercenario" className="font-bold text-black hover:opacity-80 transition-opacity">¿Qué es Mercenario?</Link>
                        <a href="#como-funciona" className="hover:text-black transition-colors">Cómo Funciona</a>
                        <a href="#soluciones" className="hover:text-black transition-colors">Soluciones</a>
                        <a href="#disenos" className="hover:text-black transition-colors">Diseños</a>
                        <a href="#planes" className="hover:text-black transition-colors font-bold text-neutral-900">Planes CLP</a>
                        <a href="#calculadora" className="hover:text-black transition-colors">Calculadora Ahorro</a>
                        <a href="#faq" className="hover:text-black transition-colors">Preguntas</a>
                        <Link href="/tienda" className="hover:text-black text-neutral-700 transition-colors">Tienda Demo (Retail)</Link>
                        <a 
                            href="https://clinicafy-beige.vercel.app/" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-bold text-emerald-700 hover:text-emerald-900 transition-colors inline-flex items-center gap-1"
                        >
                            <span>Clinicafy (Salud)</span>
                            <span className="text-[10px]">↗</span>
                        </a>
                        <Link href="/admin" className="hover:text-black transition-colors">Panel Admin</Link>
                    </div>

                    <span>© {new Date().getFullYear()} Mercenario OS. Santiago, Chile.</span>
                </div>
            </footer>

            {/* ─── WIDGET FLOTANTE WHATSAPP ─── */}
            <div className="fixed bottom-5 right-5 z-50">
                <a
                    href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20quisiera%20hacer%20una%20consulta%20sobre%20la%20plataforma%20Mercenario`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold rounded-full shadow-2xl transition-all hover:scale-105"
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>WhatsApp Directo</span>
                    <Smartphone className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
}
