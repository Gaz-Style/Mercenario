"use client";

import { useState } from "react";
import { Sparkles, Smartphone, Laptop, Check, ArrowRight, Eye } from "lucide-react";
import Link from "next/link";

export default function StoreShowcase() {
    const categories = [
        { id: "moda", name: "Moda y Accesorios", badge: "Alta Conversión" },
        { id: "belleza", name: "Cosmética y Cuidado", badge: "Diseño Limpio" },
        { id: "gourmet", name: "Cafetería y Gourmet", badge: "Entrega Rápida" },
        { id: "mascotas", name: "Mascotas y Veterinaria", badge: "Suscripciones" },
        { id: "tech", name: "Tecnología y Gadgets", badge: "Filtros Avanzados" }
    ];

    const [activeTab, setActiveTab] = useState("moda");

    const showcaseData: Record<string, {
        title: string;
        description: string;
        highlights: string[];
        accentColor: string;
        products: { name: string; price: string; color: string; image: string }[];
    }> = {
        moda: {
            title: "Tiendas pensadas para marcas de ropa, calzado y accesorios",
            description: "Selector visual de tallas y colores, guía interactiva de medidas y checkout móvil en 3 toques con Webpay.",
            highlights: ["Selector de tallas y colores dinámico", "Fotos en alta resolución con zoom fluido", "Cálculo de despacho en tiempo real"],
            accentColor: "from-stone-900 to-neutral-800",
            products: [
                { name: "Parka Impermeable Andes", price: "$64.990", color: "Negro Matte", image: "/images/showcase/parka-impermeable.jpg" },
                { name: "Polerón Oversize Algodón", price: "$29.990", color: "Gris Melange", image: "/images/showcase/poleron-oversize.jpg" },
                { name: "Pantalón Cargo Técnico", price: "$39.990", color: "Verde Militar", image: "/images/showcase/pantalon-cargo.jpg" },
            ]
        },
        belleza: {
            title: "Diseño elegante para marcas de cosmética, skincare y aromas",
            description: "Páginas de producto detalladas con ingredientes, modo de uso, reseñas verificadas de clientes y venta cruzada.",
            highlights: ["Reseñas con fotos de clientes", "Kits y combos con descuento automático", "Recordatorio de recompra automática"],
            accentColor: "from-rose-950 to-neutral-900",
            products: [
                { name: "Serum Ácido Hialurónico 30ml", price: "$21.990", color: "Edición Botánica", image: "/images/showcase/serum-hialuronico.jpg" },
                { name: "Crema Hidratante Ceramid", price: "$18.990", color: "Día & Noche", image: "/images/showcase/crema-ceramid.jpg" },
                { name: "Aceite Regenerador Rosa Mosqueta", price: "$14.990", color: "100% Orgánico", image: "/images/showcase/aceite-rosa-mosqueta.jpg" },
            ]
        },
        gourmet: {
            title: "Venta de café de especialidad, repostería y alimentos gourmet",
            description: "Selector de tipo de molienda, fecha de entrega programada y retiro en tienda física o despacho express.",
            highlights: ["Programación de fecha de despacho", "Selector de molienda y tostado", "Retiro inmediato en local comercial"],
            accentColor: "from-amber-950 to-neutral-900",
            products: [
                { name: "Café Origen Colombia 500g", price: "$14.990", color: "Grano Entero", image: "/images/showcase/cafe-colombia.jpg" },
                { name: "Botella Acero Térmica 1L", price: "$18.990", color: "Negro & Bambú", image: "/images/demo-store/botella-acero.jpg" },
                { name: "Pack Degustación 3 Orígenes", price: "$36.990", color: "Edición Limitada", image: "/images/showcase/cafe-colombia.jpg" },
            ]
        },
        mascotas: {
            title: "Alimento, accesorios y farmacia para mascotas",
            description: "Búsqueda por tipo de mascota, opciones de compras recurrentes con suscripción y boleta automática al SII.",
            highlights: ["Filtros por peso, edad y raza", "Venta programada mensual", "Cálculo de despacho por volumen"],
            accentColor: "from-emerald-950 to-neutral-900",
            products: [
                { name: "Alimento Super Premium 15kg", price: "$52.990", color: "Perro Adulto", image: "/images/demo-store/mochila-urbana.jpg" },
                { name: "Arnés Ergonómico Reflectante", price: "$17.990", color: "Talla M / Naranja", image: "/images/demo-store/gorro-lana-merino.jpg" },
                { name: "Snacks Dentales Naturales 300g", price: "$8.990", color: "Pack Familiar", image: "/images/demo-store/botella-acero.jpg" },
            ]
        },
        tech: {
            title: "Electrónica, computación y accesorios inteligentes",
            description: "Filtros técnicos de compatibilidad, comparador de modelos y pasarela con hasta 12 cuotas sin interés.",
            highlights: ["Fichas técnicas con especificaciones", "Garantía legal y boleta electrónica", "Hasta 12 cuotas bancarias"],
            accentColor: "from-blue-950 to-neutral-900",
            products: [
                { name: "Audífonos Inalámbricos ANC", price: "$69.990", color: "Bluetooth 5.3", image: "/images/showcase/audifonos-anc.jpg" },
                { name: "Cargador Rápido GaN 65W", price: "$24.990", color: "3 Puertos USB-C", image: "/images/demo-store/botella-acero.jpg" },
                { name: "Mochila Tech Impermeable", price: "$34.990", color: "Antirrobo USB", image: "/images/demo-store/mochila-urbana.jpg" },
            ]
        }
    };

    const current = showcaseData[activeTab];

    return (
        <section id="disenos" className="w-full py-20 bg-neutral-50 border-b border-neutral-200/80">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Header */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-400">
                        DISEÑOS PROFESIONALES
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-tight">
                        Plantillas que enamoran <br />
                        <span className="text-neutral-500 font-light">y multiplican tus ventas.</span>
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
                        El 85% de las compras online en Chile se hacen desde celulares. Nuestras tiendas cargan en menos de 1 segundo y están diseñadas para que tus clientes compren en 3 toques.
                    </p>
                </div>

                {/* Tabs de rubros */}
                <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {categories.map((cat) => {
                        const isActive = activeTab === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                                    isActive 
                                        ? "bg-black text-white shadow-md" 
                                        : "bg-white text-neutral-600 hover:text-black border border-neutral-200"
                                }`}
                            >
                                <span>{cat.name}</span>
                                {isActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Vista previa del diseño */}
                <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Explicación a la izquierda */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="inline-block px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-mono font-bold uppercase">
                            {categories.find(c => c.id === activeTab)?.badge}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-snug">
                            {current.title}
                        </h3>

                        <p className="text-sm text-neutral-600 font-light leading-relaxed">
                            {current.description}
                        </p>

                        <div className="space-y-3 pt-2">
                            {current.highlights.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-800 font-medium">
                                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                        <Check className="w-2.5 h-2.5" />
                                    </div>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 flex items-center gap-4">
                            <Link
                                href="/tienda"
                                className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-neutral-800 transition-colors inline-flex items-center gap-2"
                            >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Ver Demo en Vivo</span>
                            </Link>
                        </div>
                    </div>

                    {/* Simulación visual de productos a la derecha */}
                    <div className="lg:col-span-7 bg-neutral-950 rounded-2xl p-4 sm:p-6 text-white space-y-4">
                        <div className="flex items-center justify-between text-xs text-neutral-400 border-b border-neutral-800 pb-3">
                            <div className="flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-emerald-400" />
                                <span className="font-mono text-[11px]">Vista Móvil Optimizada · Checkout 1-Click</span>
                            </div>
                            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                                0% Comisión
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {current.products.map((prod, idx) => (
                                <div key={idx} className="group/card bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl p-4 space-y-3 transition-colors">
                                    <div className="w-full aspect-[4/3] bg-neutral-800 rounded-lg overflow-hidden relative shadow-inner">
                                        <img
                                            src={prod.image}
                                            alt={prod.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-bold text-white truncate">
                                            {prod.name}
                                        </h4>
                                        <p className="text-[10px] text-neutral-400 font-light">
                                            {prod.color}
                                        </p>
                                        <div className="pt-2 flex items-center justify-between">
                                            <span className="text-sm font-black text-white font-mono">
                                                {prod.price}
                                            </span>
                                            <span className="text-[10px] text-emerald-400 font-mono">
                                                Stock OK
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 flex items-center justify-between text-xs text-neutral-300">
                            <span>¿Te gusta este diseño? Lo puedes activar en 1 clic.</span>
                            <a
                                href="#planes"
                                className="text-emerald-400 font-bold hover:underline inline-flex items-center gap-1"
                            >
                                <span>Elegir</span>
                                <ArrowRight className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
