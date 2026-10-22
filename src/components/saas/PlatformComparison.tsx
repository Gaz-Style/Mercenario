"use client";

import { Fragment } from "react";
import { Check, X, Minus } from "lucide-react";

export default function PlatformComparison() {
    const comparisonFeatures = [
        {
            category: "Costos y Moneda",
            items: [
                {
                    name: "Comisión por venta de la plataforma",
                    mercenario: "0%",
                    tiendanube: "0%",
                    shopify: "0.5% – 2.0%",
                    woocommerce: "0%"
                },
                {
                    name: "Moneda de cobro mensual fija",
                    mercenario: "Pesos Chilenos (CLP)",
                    tiendanube: "Pesos Chilenos (CLP)",
                    shopify: "Dólares USD (Fluctúa)",
                    woocommerce: "USD / Hosting variable"
                },
                {
                    name: "Límite de visitas y productos",
                    mercenario: "Ilimitado",
                    tiendanube: "Ilimitado",
                    shopify: "Ilimitado",
                    woocommerce: "Depende de tu servidor"
                }
            ]
        },
        {
            category: "Operación & Facturación en Chile",
            items: [
                {
                    name: "Boleta & Factura Electrónica SII automática",
                    mercenario: "Nativa (SimpleAPI)",
                    tiendanube: "Requiere app de pago ($25K+/mes)",
                    shopify: "Requiere app de pago ($30K+/mes)",
                    woocommerce: "Requiere plugin de pago"
                },
                {
                    name: "Punto de Venta (POS) para tienda física integrado",
                    mercenario: "Incluido (Mismo inventario)",
                    tiendanube: "Básico / Integración externa",
                    shopify: "Costo extra en USD",
                    woocommerce: "Plugin extra complejo"
                },
                {
                    name: "Control de stock Multi-Bodega y Sucursales",
                    mercenario: "Nativo en tiempo real",
                    tiendanube: "Limitado por plan",
                    shopify: "Requiere planes altos",
                    woocommerce: "Lento sin optimización"
                },
                {
                    name: "Checkout adaptado a Chile (RUT, Comunas y Regiones)",
                    mercenario: "100% Nativo",
                    tiendanube: "100% Nativo",
                    shopify: "Requiere configuración",
                    woocommerce: "Requiere plugins chilenos"
                }
            ]
        },
        {
            category: "Inteligencia Artificial y Canales",
            items: [
                {
                    name: "Asistente WhatsApp Oficial 24/7 con IA viva",
                    mercenario: "Nativo (RAG con catálogo)",
                    tiendanube: "Chat Nube (Costo por charla)",
                    shopify: "Apps de terceros en USD",
                    woocommerce: "No incluido"
                },
                {
                    name: "Velocidad de carga Next.js Serverless (<0.8s)",
                    mercenario: "Ultra Rápida (Edge)",
                    tiendanube: "Estándar (CMS cerrado)",
                    shopify: "Estándar",
                    woocommerce: "Lenta sin CDN dedicada"
                },
                {
                    name: "Soporte técnico directo en Chile",
                    mercenario: "WhatsApp Directo",
                    tiendanube: "Email / WhatsApp",
                    shopify: "Chat en inglés/tickets",
                    woocommerce: "Por tu cuenta / Comunidad"
                }
            ]
        }
    ];

    return (
        <section id="comparativa" className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 space-y-10 border-t border-neutral-100">
            <div className="space-y-4 max-w-3xl">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">
                    COMPARATIVA TRANSPARENTE
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                    Mercenario OS vs. Las alternativas del mercado.
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                    Mientras otras plataformas son solo vitrinas digitales que te obligan a pagar aplicaciones extras para facturar al SII o controlar el stock de tu tienda física, Mercenario OS es un sistema operativo integral.
                </p>
            </div>

            <div className="border border-neutral-200 rounded-3xl overflow-hidden bg-white shadow-sm overflow-x-auto">
                <table className="w-full min-w-[700px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-900 text-white">
                            <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider font-bold w-2/5">
                                Funcionalidad Clave
                            </th>
                            <th className="py-5 px-4 text-xs font-mono uppercase tracking-wider font-black text-emerald-400 bg-black/40 w-1/5 text-center">
                                Mercenario OS
                            </th>
                            <th className="py-5 px-4 text-xs font-mono uppercase tracking-wider font-bold text-neutral-300 w-1/5 text-center">
                                Tiendanube
                            </th>
                            <th className="py-5 px-4 text-xs font-mono uppercase tracking-wider font-bold text-neutral-300 w-1/5 text-center">
                                Shopify
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 text-xs">
                        {comparisonFeatures.map((group, groupIdx) => (
                            <Fragment key={groupIdx}>
                                <tr className="bg-neutral-100/70">
                                    <td colSpan={4} className="py-2.5 px-6 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-700">
                                        {group.category}
                                    </td>
                                </tr>
                                {group.items.map((item, itemIdx) => (
                                    <tr key={itemIdx} className="hover:bg-neutral-50/80 transition-colors">
                                        <td className="py-4 px-6 text-neutral-900 font-medium">
                                            {item.name}
                                        </td>
                                        <td className="py-4 px-4 text-center font-bold text-black bg-emerald-50/40 font-mono">
                                            {item.mercenario}
                                        </td>
                                        <td className="py-4 px-4 text-center text-neutral-600 font-light">
                                            {item.tiendanube}
                                        </td>
                                        <td className="py-4 px-4 text-center text-neutral-600 font-light">
                                            {item.shopify}
                                        </td>
                                    </tr>
                                ))}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
