"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    ChevronUp,
    Check,
    Sparkles,
    ShieldAlert,
    MessageSquare,
    Zap,
    CreditCard,
    BarChart3,
    Layers,
    Clock,
    PhoneCall,
    Receipt,
    Eye,
    TrendingUp,
    Smartphone,
    Bot,
    CheckCircle2,
    DollarSign,
    Flame
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Growth360LandingPage() {
    // Tarjetas de Módulos (Estado de apertura individual o acordeón)
    const [openCardIndex, setOpenCardIndex] = useState<number | null>(0); // El primero abierto por defecto

    // ROI Calculator State
    const [leadsPerMonth, setLeadsPerMonth] = useState(250);
    const [averageTicket, setAverageTicket] = useState(40000);

    // Simulador WhatsApp
    const [simStep, setSimStep] = useState<number>(0);

    // Formulario de Contacto
    const [formData, setFormData] = useState({
        name: "",
        business: "",
        phone: "",
        fugaPrincipal: "Me escriben fuera de horario y no alcanzo a contestar",
        _honeypot: ""
    });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    // Cálculo ROI
    const estimatedLostLeads = Math.round(leadsPerMonth * 0.30);
    const estimatedRecoveredSales = Math.round(estimatedLostLeads * 0.25);
    const recoveredMoney = estimatedRecoveredSales * averageTicket;

    const toggleCard = (index: number) => {
        setOpenCardIndex(openCardIndex === index ? null : index);
    };

    // Estado FAQs para SEO y Conversion
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const faqs = [
        {
            q: "¿Por qué las pequeñas empresas pierden ventas en WhatsApp?",
            a: "Más del 60% de los clientes potenciales escriben fuera de horario comercial o fines de semana. Si un negocio tarda más de 5 minutos en responder, el prospecto compra a la competencia. Growth 360 responde y califica con IA en 5 segundos las 24 horas del día."
        },
        {
            q: "¿Tengo que cambiar mi número de WhatsApp o software actual?",
            a: "No. Mercenario integra el Asistente de IA directamente sobre tu número actual a través de la API Oficial de Meta Cloud WhatsApp sin interrumpir tus operaciones ni perder conversaciones previas."
        },
        {
            q: "¿Qué pasarelas de pago se integran en Chile?",
            a: "Integramos Transbank Webpay Plus (Débito, Crédito, Redcompra) y Mercado Pago Chile, facilitando el cobro de anticipos o venta directa con confirmación instantánea y emisión de boleta electrónica SII."
        },
        {
            q: "¿Cuánto tarda la entrega e instalación de Growth 360?",
            a: "El tiempo de desarrollo e integración completa es de 14 a 21 días hábiles, entregando el sistema 100% operativo con garantía y capacitando a tu equipo de trabajo."
        }
    ];

    const WHATSAPP_NUM = "56957958467";

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData._honeypot) {
            setFormStatus("success");
            return;
        }

        setFormStatus("loading");

        // 1. Guardar en Supabase en segundo plano (blindado con try/catch para que nunca bloquee la venta)
        try {
            const cleanDigits = formData.phone.replace(/\D/g, "") || "cliente";
            await supabase
                .from("leads")
                .insert([{
                    name: `${formData.name} (${formData.business})`,
                    email: `${cleanDigits}@whatsapp.mercenario.cl`,
                    challenge: `Demostración Growth 360. WhatsApp: ${formData.phone}. Dolor: ${formData.fugaPrincipal}`,
                    budget: "$1.890.000 CLP"
                }]);
        } catch (err) {
            console.warn("Nota: Registro de lead procesado localmente:", err);
        }

        // 2. Éxito y apertura instantánea de WhatsApp con el mensaje preformateado
        setFormStatus("success");
        const mensajeWA = encodeURIComponent(
            `¡Hola! Quiero coordinar una demostración en vivo de Growth 360.\n\n` +
            `• Mi Nombre: ${formData.name}\n` +
            `• Mi Negocio: ${formData.business}\n` +
            `• Mi WhatsApp: ${formData.phone}\n` +
            `• Mi mayor problema hoy: ${formData.fugaPrincipal}`
        );
        const waUrl = `https://wa.me/${WHATSAPP_NUM}?text=${mensajeWA}`;
        
        // Abrir WhatsApp en pestaña nueva o redirigir
        if (typeof window !== "undefined") {
            window.open(waUrl, "_blank");
        }
    };

    // 5 MÓDULOS EN FORMATO TARJETA VISUAL (IMAGEN + DOLOR CORTO + DESPLIEGUE)
    const cards = [
        {
            title: "¿Te escriben a deshoras y pierdes la venta por no contestar?",
            subtitle: "Vendedor Inteligente 24/7 en WhatsApp Oficial",
            image: "/images/mod1_whatsapp.png",
            badge: "MÓDULO 01 · VENTAS EN WHATSAPP",
            problemaCorto: "El 60% de tus clientes te escribe de noche o fines de semana cuando estás descansando. Si tardas 15 minutos en contestar, ya le compraron a otro.",
            solucionCorta: "Un asistente oficial con IA que responde en 3 segundos, explica tus precios, muestra tus horarios y atiende con botones táctiles fáciles de tocar.",
            resultado: "Recuperas clientes sin tener que estar pegado al celular todo el día."
        },
        {
            title: "¿Tu página web es lenta o nadie te encuentra en Google?",
            subtitle: "Web Ultrarrápida + Diagnóstico con Fotos",
            image: "/images/mod2_web.png",
            badge: "MÓDULO 02 · PLATAFORMA WEB",
            problemaCorto: "Tener una página web pesada hace que el 40% de las personas se salga antes de que cargue. Y para colmo, cuando te escriben, no saben explicar qué necesitan.",
            solucionCorta: "Una web ultrarrápida que abre al instante en celulares y le permite a tu cliente enviar una foto de su problema para que la IA le entregue un estimado en segundos.",
            resultado: "Tu página carga en menos de 1 segundo y filtras a los clientes curiosos."
        },
        {
            title: "¿Te piden hora y después no aparecen (No-Show)?",
            subtitle: "Agenda Online con Cobro Webpay Obligatorio",
            image: "/images/mod3_webpay.png",
            badge: "MÓDULO 03 · PAGOS & AGENDA",
            problemaCorto: "Agendar 'de palabra' o pedir que te transfieran por cuenta bancaria hace que 3 de cada 10 clientes falten a la cita, dejándote a ti y a tu equipo esperando sin cobrar nada.",
            solucionCorta: "El cliente elige la fecha en tu calendario online y paga su abono obligatorio con tarjeta de débito o crédito (Transbank Webpay / Mercado Pago) antes de confirmar.",
            resultado: "Eliminas el 80% de las inasistencias y el dinero entra directo a tu cuenta."
        },
        {
            title: "¿Gastas en publicidad de Meta y sientes que botas la plata?",
            subtitle: "Blindaje de Anuncios CAPI + Reseñas en Google Maps",
            image: "/images/mod4_capi.png",
            badge: "MÓDULO 04 · PUBLICIDAD & MAPS",
            problemaCorto: "Los bloqueadores de iPhone ocultan las ventas que genera tu publicidad. Facebook cree que tus anuncios no funcionan y te cobra más caro por cada cliente.",
            solucionCorta: "Conectamos tu web directo a los servidores de Meta (CAPI) para que tus anuncios encuentren compradores reales y activamos un envío automático de reseñas de 5 estrellas en Google.",
            resultado: "Tus anuncios rinden hasta un 30% más y dominas el puesto #1 en tu zona."
        },
        {
            title: "¿Llegas al final del día y la plata de la caja no te calza?",
            subtitle: "Punto de Venta (POS) Mostrador + Cuadratura en 30 Segundos",
            image: "/images/mod5_pos.png",
            badge: "MÓDULO 05 · CONTROL & CAJA",
            problemaCorto: "Cobras en máquina en el local, recibes efectivo y vendes por internet. A las 20:00 hrs la caja física no calza con los váuchers y nadie sabe en qué estado va cada pedido.",
            solucionCorta: "Un panel de control donde registras ventas en mostrador, cuadras la caja cruzando efectivo vs tarjetas en 30 segundos y ves tus trabajos en un tablero en vivo.",
            resultado: "Cero fugas de dinero en tu local y control total sin planillas enredadas."
        }
    ];

    return (
        <div className="min-h-screen bg-[#FBFBFB] text-neutral-900 font-sans antialiased selection:bg-black selection:text-white flex flex-col items-center">
            
            {/* BARRA SUPERIOR VISUAL Y LIMPIA */}
            <header className="sticky top-0 inset-x-0 w-full z-50 bg-[#FBFBFB]/90 backdrop-blur-md border-b border-neutral-200/80">
                <div className="max-w-5xl mx-auto px-5 py-3.5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-black transition-colors uppercase tracking-wider">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Volver</span>
                    </Link>
                    
                    <span className="text-xs font-bold tracking-widest text-black uppercase">
                        GROWTH 360 <span className="text-neutral-400 font-normal">| MERCENARIO</span>
                    </span>

                    <a 
                        href={`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent("Hola! Estoy viendo la página de Growth 360 y quiero coordinar una demostración.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-[#25D366] text-white text-[11px] font-bold uppercase tracking-wider rounded-full hover:bg-[#20bd5a] transition-all shadow-xs flex items-center gap-1.5"
                    >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        <span>WhatsApp Directo</span>
                    </a>
                </div>
            </header>

            <main className="w-full max-w-4xl mx-auto px-5 pt-12 pb-28 flex flex-col items-center">
                
                {/* 1. HERO VISUAL DIRECTO (POCO TEXTO, MUY CLARO) */}
                <section className="text-center space-y-6 max-w-2xl mb-16">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Sistema Llave en Mano · Listo en 14 Días Hábiles</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 leading-tight">
                        ¿Tu negocio pierde ventas porque no alcanzas a responder a tiempo?
                    </h1>

                    <p className="text-neutral-600 text-base sm:text-lg font-normal leading-relaxed">
                        Instalamos en tu empresa el sistema que <strong>atiende en WhatsApp las 24 horas</strong>, cobra con Webpay antes de agendar y te ordena la caja. Sin que tengas que estar pegado al teléfono.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a 
                            href="#tarjetas"
                            className="w-full sm:w-auto px-7 py-4 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-neutral-800 transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
                        >
                            <span>Ver los 5 problemas que resolvemos</span>
                            <ChevronDown className="w-4 h-4" />
                        </a>
                        <a 
                            href="#calculadora"
                            className="w-full sm:w-auto px-6 py-4 bg-white border border-neutral-300 text-neutral-800 font-bold text-xs uppercase tracking-wider rounded-full hover:border-black transition-colors"
                        >
                            Calcular dinero perdido
                        </a>
                    </div>
                </section>

                {/* 2. SECCIÓN PRINCIPAL: LAS 5 TARJETAS CON IMAGEN (EL FORMATO INTUITIVO PEDIDO) */}
                <section id="tarjetas" className="w-full space-y-8 mb-24">
                    <div className="text-center space-y-2">
                        <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 font-bold">Sin rodeos ni tecnicismos</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-black">
                            Pincha en cada tarjeta para ver cómo se resuelve tu problema:
                        </h2>
                    </div>

                    {/* LISTA DE TARJETAS VISUALES INTERACTIVAS */}
                    <div className="space-y-4">
                        {cards.map((card, idx) => {
                            const isOpen = openCardIndex === idx;
                            return (
                                <div 
                                    key={idx}
                                    className={`border rounded-2xl bg-white overflow-hidden transition-all duration-300 shadow-xs ${
                                        isOpen ? "border-black ring-1 ring-black shadow-md" : "border-neutral-200 hover:border-neutral-400"
                                    }`}
                                >
                                    {/* HEADER DE LA TARJETA (SIEMPRE VISIBLE: IMAGEN PEQUEÑA + DOLOR DIRECTO + BOTÓN) */}
                                    <div 
                                        onClick={() => toggleCard(idx)}
                                        className="p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Imagen representativa */}
                                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-neutral-100 bg-neutral-50 shadow-inner">
                                                <Image 
                                                    src={card.image} 
                                                    alt={card.title} 
                                                    fill 
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Textos mínimos y directos */}
                                            <div className="space-y-1">
                                                <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400 block">
                                                    {card.badge}
                                                </span>
                                                <h3 className="text-base sm:text-lg font-bold text-black leading-snug">
                                                    {card.title}
                                                </h3>
                                                <p className="text-xs text-neutral-500 hidden sm:block">
                                                    {card.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Botón interactivo de despliegue */}
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-[11px] font-bold text-neutral-700 hidden md:inline">
                                                {isOpen ? "Ocultar" : "Pincha aquí"}
                                            </span>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                                isOpen ? "bg-black text-white" : "bg-neutral-100 text-neutral-700"
                                            }`}>
                                                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* CONTENIDO DESPLEGABLE (SOLO CUANDO PINCHA) */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: "easeOut" }}
                                                className="overflow-hidden border-t border-neutral-100 bg-neutral-50/60"
                                            >
                                                <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm">
                                                    
                                                    {/* El Problema */}
                                                    <div className="space-y-1.5 p-4 rounded-xl bg-red-50/60 border border-red-100">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 flex items-center gap-1.5">
                                                            <span className="w-2 h-2 rounded-full bg-red-500" />
                                                            El Problema que Sufres Hoy:
                                                        </span>
                                                        <p className="text-neutral-800 leading-relaxed font-normal">
                                                            {card.problemaCorto}
                                                        </p>
                                                    </div>

                                                    {/* La Solución */}
                                                    <div className="space-y-1.5 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                                            Cómo te lo Solucionamos en Growth 360:
                                                        </span>
                                                        <p className="text-neutral-800 leading-relaxed font-normal">
                                                            {card.solucionCorta}
                                                        </p>
                                                    </div>

                                                    {/* Resultado en Dinero */}
                                                    <div className="flex items-center justify-between pt-2 text-xs font-semibold text-black">
                                                        <span className="text-neutral-500 font-normal">Beneficio Directo:</span>
                                                        <span className="px-3 py-1 bg-white border border-neutral-200 rounded-full shadow-xs">
                                                            💰 {card.resultado}
                                                        </span>
                                                    </div>

                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 3. SIMULADOR WHATSAPP EN 3 TOQUES (VISUAL, PRACTICO, CERO TEXTO) */}
                <section className="w-full py-12 border-t border-neutral-200 space-y-6 mb-20">
                    <div className="text-center space-y-1 max-w-lg mx-auto">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">Demostración en vivo</span>
                        <h2 className="text-2xl font-extrabold text-black">Pruébalo tú mismo en 3 toques</h2>
                        <p className="text-xs text-neutral-500">Toca las opciones del teléfono y mira cómo compra tu cliente:</p>
                    </div>

                    <div className="max-w-sm mx-auto bg-white border border-neutral-300 rounded-3xl p-5 shadow-lg space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-neutral-100 text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="font-bold text-black text-[11px]">Asistente IA de tu Negocio</p>
                                    <p className="text-[9px] text-emerald-600">● En línea (Responde en 3 seg)</p>
                                </div>
                            </div>
                            <button onClick={() => setSimStep(0)} className="text-[9px] text-neutral-400 hover:text-black uppercase">
                                Reiniciar
                            </button>
                        </div>

                        {/* Mensajes */}
                        <div className="space-y-3 min-h-[220px] flex flex-col justify-end text-xs">
                            <div className="bg-neutral-100 p-3 rounded-2xl rounded-tl-xs space-y-2">
                                <p className="text-neutral-800">Hola! El valor de la atención es de <strong>$40.000 CLP</strong>. Tengo estos cupos libres:</p>
                                <button 
                                    onClick={() => setSimStep(1)}
                                    className={`w-full py-2 px-3 text-left rounded-lg font-semibold text-xs border transition-all ${
                                        simStep >= 1 ? "bg-black text-white border-black" : "bg-white text-black border-neutral-200 hover:border-black"
                                    }`}
                                >
                                    👉 Toca aquí: Jueves 16:30 hrs
                                </button>
                            </div>

                            {simStep >= 1 && (
                                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="bg-neutral-100 p-3 rounded-2xl rounded-tl-xs space-y-2">
                                    <p className="text-neutral-800">Para asegurar tu hora, abona la reserva:</p>
                                    <button 
                                        onClick={() => setSimStep(2)}
                                        className={`w-full py-2 text-center rounded-lg font-bold text-xs transition-all ${
                                            simStep >= 2 ? "bg-emerald-600 text-white" : "bg-black text-white hover:bg-neutral-800"
                                        }`}
                                    >
                                        {simStep >= 2 ? "✓ Pago de $20.000 Aprobado" : "👉 Pagar $20.000 con Webpay"}
                                    </button>
                                </motion.div>
                            )}

                            {simStep >= 2 && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-emerald-900 text-white p-3 rounded-2xl text-center space-y-1">
                                    <p className="font-bold text-xs text-emerald-300">🎉 ¡Hora confirmada y pagada!</p>
                                    <p className="text-[10px] text-neutral-200">Boleta del SII y cita en Google Calendar creadas automáticamente.</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 4. CALCULADORA SIMPLE (2 DESLIZADORES Y RESULTADO EN GRANDE) */}
                <section id="calculadora" className="w-full py-12 border-t border-neutral-200 space-y-8 mb-20">
                    <div className="text-center space-y-1">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-mercenario-danger font-bold">Calculadora Simple</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-black">¿Cuánto dinero estás perdiendo al mes?</h2>
                        <p className="text-xs text-neutral-500">Mueve los botones con tu realidad y calcula tu fuga de dinero:</p>
                    </div>

                    <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm max-w-xl mx-auto space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span>Mensajes o consultas al mes:</span>
                                <span className="font-mono text-sm px-2.5 py-0.5 bg-neutral-100 rounded">{leadsPerMonth} mensajes</span>
                            </div>
                            <input 
                                type="range" 
                                min="50" 
                                max="1000" 
                                step="50"
                                value={leadsPerMonth}
                                onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                                className="w-full accent-black cursor-pointer h-2 bg-neutral-200 rounded-lg appearance-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-bold">
                                <span>Valor promedio de tu venta o atención:</span>
                                <span className="font-mono text-sm px-2.5 py-0.5 bg-neutral-100 rounded">${averageTicket.toLocaleString('es-CL')} CLP</span>
                            </div>
                            <input 
                                type="range" 
                                min="10000" 
                                max="200000" 
                                step="5000"
                                value={averageTicket}
                                onChange={(e) => setAverageTicket(Number(e.target.value))}
                                className="w-full accent-black cursor-pointer h-2 bg-neutral-200 rounded-lg appearance-none"
                            />
                        </div>

                        {/* Resultado */}
                        <div className="p-6 bg-black text-white rounded-2xl text-center space-y-2">
                            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                                Dinero que se te escapa cada mes hacia tu competencia:
                            </span>
                            <p className="text-3xl sm:text-4xl font-extrabold text-white">
                                -${recoveredMoney.toLocaleString('es-CL')} <span className="text-xs text-neutral-400 font-normal">CLP / mes</span>
                            </p>
                            <p className="text-[11px] text-neutral-400 pt-1">
                                Son aprox. <strong>+{estimatedRecoveredSales} clientes perdidos</strong> por responder tarde o no cobrar seña previa.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 5. PRECIOS TRANSPARENTES (DIRECTOS Y CLAROS) */}
                <section className="w-full py-12 border-t border-neutral-200 space-y-8 mb-20">
                    <div className="text-center space-y-1">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">Precios claros</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-black">Inversión única y mensualidad</h2>
                        <p className="text-xs text-neutral-500">Sin letras chicas. Pagas 50% al inicio y 50% cuando el sistema esté 100% probado en vivo.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                        
                        {/* PACK 1: ENTRADA */}
                        <div className="p-7 border border-neutral-200 bg-white rounded-3xl space-y-4 flex flex-col justify-between">
                            <div className="space-y-3">
                                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">Pack Solo WhatsApp</span>
                                <h3 className="text-xl font-bold text-black">Captación Pro</h3>
                                <p className="text-xs text-neutral-500 font-light">Para negocios que solo quieren automatizar WhatsApp y la agenda.</p>
                                
                                <div className="pt-2">
                                    <p className="text-2xl font-bold text-black">$890.000 <span className="text-xs font-normal text-neutral-500">CLP (Setup)</span></p>
                                    <p className="text-xs text-neutral-600 mt-0.5">Mensual: $130.000 CLP / mes</p>
                                </div>

                                <ul className="space-y-2 text-xs text-neutral-600 pt-3 border-t border-neutral-100">
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Oficial con IA 24/7</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> LiveChat para atender en el celular</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Agenda online sincronizada</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Listo en 14 días hábiles</li>
                                </ul>
                            </div>

                            <a href="#contacto-rapido" className="w-full py-3 text-center border border-neutral-300 rounded-full text-xs font-bold uppercase tracking-wider hover:border-black block mt-4">
                                Consultar Pack 1
                            </a>
                        </div>

                        {/* PACK 2: EL COMPLETO (RECOMENDADO) */}
                        <div className="p-7 border-2 border-black bg-white rounded-3xl space-y-4 flex flex-col justify-between shadow-xl relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest">
                                El más elegido
                            </div>

                            <div className="space-y-3">
                                <span className="text-[10px] font-mono font-bold text-mercenario-danger uppercase">Sistema Completo</span>
                                <h3 className="text-xl font-bold text-black">Growth 360</h3>
                                <p className="text-xs text-neutral-500 font-light">WhatsApp + Web ultrarrápida + Pasarela Webpay + POS Mostrador.</p>
                                
                                <div className="pt-2">
                                    <p className="text-2xl font-bold text-black">$1.890.000 <span className="text-xs font-normal text-neutral-500">CLP (Setup)</span></p>
                                    <p className="text-xs text-neutral-600 mt-0.5">Mensual: $210.000 CLP / mes</p>
                                </div>

                                <ul className="space-y-2 text-xs text-neutral-800 pt-3 border-t border-neutral-100 font-medium">
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Todo lo de WhatsApp +</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Web Next.js ultrarrápida (0.8s)</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Cobro con Transbank Webpay Plus</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Diagnóstico visual de fotos con IA</li>
                                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-emerald-600" /> Punto de Venta (POS) y cuadratura caja</li>
                                </ul>
                            </div>

                            <a href="#contacto-rapido" className="w-full py-3.5 text-center bg-black text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 block mt-4 shadow-sm">
                                Quiero Growth 360
                            </a>
                        </div>
                    </div>
                </section>

                {/* SECCIÓN PREGUNTAS FRECUENTES (SEO & CONVERSIÓN) */}
                <section className="w-full max-w-2xl mx-auto py-10 border-t border-neutral-200 space-y-4">
                    <div className="text-center space-y-1">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold">Dudas Habituales</span>
                        <h2 className="text-xl sm:text-2xl font-extrabold text-black">Preguntas Frecuentes</h2>
                    </div>

                    <div className="space-y-2.5 pt-2">
                        {faqs.map((faq, idx) => {
                            const isOpen = openFaqIndex === idx;
                            return (
                                <div 
                                    key={idx}
                                    className="border border-neutral-200 bg-white rounded-2xl overflow-hidden shadow-xs transition-all"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                        className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-neutral-900 hover:text-black transition-colors"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-black" : ""}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-4 pb-4 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100">
                                                    {faq.a}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 6. FORMULARIO RÁPIDO PARA EL DUEÑO OCUPADO (SOLO 3 CAMPOS) */}
                <section id="contacto-rapido" className="w-full max-w-lg mx-auto py-12 border-t border-neutral-200 space-y-6">
                    <div className="text-center space-y-1">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-mercenario-danger font-bold">Llamada de 15 minutos</span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-black">Te mostramos el sistema en vivo</h2>
                        <p className="text-xs text-neutral-500">Déjanos tu WhatsApp. Te escribimos para coordinar una videollamada corta donde pondrás a prueba al bot desde tu propio teléfono.</p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="bg-white border border-neutral-300 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
                        <div className="hidden">
                            <input 
                                type="text" 
                                name="_honeypot" 
                                value={formData._honeypot} 
                                onChange={(e) => setFormData({...formData, _honeypot: e.target.value})} 
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-neutral-600 uppercase">Tu Nombre</label>
                            <input 
                                type="text" 
                                required 
                                placeholder="Ej: Marcelo Vidal"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                disabled={formStatus === "loading" || formStatus === "success"}
                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-xs focus:bg-white focus:border-black outline-none"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-neutral-600 uppercase">Nombre de tu Negocio / Empresa</label>
                            <input 
                                type="text" 
                                required 
                                placeholder="Ej: Clínica Dental o Taller Mecánico"
                                value={formData.business}
                                onChange={(e) => setFormData({...formData, business: e.target.value})}
                                disabled={formStatus === "loading" || formStatus === "success"}
                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-xs focus:bg-white focus:border-black outline-none"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-neutral-600 uppercase">WhatsApp de Contacto (+56)</label>
                            <input 
                                type="tel" 
                                required 
                                placeholder="+56 9 1234 5678"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                disabled={formStatus === "loading" || formStatus === "success"}
                                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-3 text-xs focus:bg-white focus:border-black outline-none"
                            />
                        </div>

                        {formStatus === "error" && (
                            <p className="text-red-600 text-xs text-center">Hubo un error al enviar. Por favor intenta de nuevo.</p>
                        )}

                        {formStatus === "success" && (
                            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs text-center font-medium">
                                ✓ ¡Listo! Te escribiremos por WhatsApp para coordinar la demo corta.
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={formStatus === "loading" || formStatus === "success"}
                            className="w-full py-4 bg-black text-white font-bold text-xs uppercase tracking-wider hover:bg-neutral-800 disabled:bg-neutral-300 rounded-full transition-all shadow-md active:scale-98"
                        >
                            {formStatus === "loading" ? "Enviando..." : formStatus === "success" ? "Solicitud Enviada" : "Coordinar Demo por WhatsApp"}
                        </button>
                    </form>
                </section>

            </main>

            {/* FOOTER MÍNIMO */}
            <footer className="w-full py-10 border-t border-neutral-200 bg-white text-center text-[10px] text-neutral-400 tracking-wider uppercase">
                <p className="font-bold text-black">MERCENARIO IOS · GROWTH 360</p>
                <p className="pt-1">Listo en 14 a 21 días hábiles · Soporte en Chile vía Asistente Virtual WhatsApp +56 9 5795 8467</p>
            </footer>

            {/* BOTÓN FLOTANTE PERMANENTE DE WHATSAPP (+56 9 5795 8467) */}
            <a 
                href={`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent("Hola! Tengo dudas sobre el sistema Growth 360 y quiero hablar con el asistente virtual.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3.5 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all text-xs font-bold tracking-wide border border-white/20"
                title="Escríbenos directamente a WhatsApp"
            >
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <MessageSquare className="w-4 h-4 fill-current" />
                <span className="hidden sm:inline">Asistente Virtual WhatsApp (+56 9 5795 8467)</span>
                <span className="sm:hidden">WhatsApp</span>
            </a>

        </div>
    );
}
