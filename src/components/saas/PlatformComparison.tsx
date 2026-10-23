"use client";

import { Fragment } from "react";
import { Check, X, ShieldCheck, Sparkles } from "lucide-react";

export default function PlatformComparison() {
    const comparisonFeatures = [
        {
            category: "Costos, Moneda y Modelo",
            items: [
                {
                    name: "Comisión por venta de la plataforma",
                    mercenario: "0%",
                    tiendanube: "0%",
                    shopify: "0.5% – 2.0% extra",
                    jumpseller: "0% (básico)",
                    bsale: "0%"
                },
                {
                    name: "Moneda de cobro fija sin sorpresas",
                    mercenario: "Pesos Chilenos (CLP)",
                    tiendanube: "Pesos Chilenos (CLP)",
                    shopify: "Dólares USD (Fluctúa)",
                    jumpseller: "Pesos Chilenos (CLP)",
                    bsale: "UF (Fluctúa mes a mes)"
                },
                {
                    name: "Personalización del proyecto según tu rubro",
                    mercenario: "100% Personalizado",
                    tiendanube: "Plantilla estándar",
                    shopify: "Plantilla estándar",
                    jumpseller: "Plantilla básica",
                    bsale: "Formatos rígidos"
                }
            ]
        },
        {
            category: "Operación & Facturación en Chile",
            items: [
                {
                    name: "Boleta & Factura Electrónica SII automática",
                    mercenario: "Nativa (Pasarela / DTE)",
                    tiendanube: "Requiere app ($25K–$40K/mes)",
                    shopify: "Requiere app ($35K–$50K/mes)",
                    jumpseller: "Módulo DTE ($20K/mes)",
                    bsale: "Incluida en plan base"
                },
                {
                    name: "Punto de Venta (POS) Físico + Web sincronizado",
                    mercenario: "Nativo incluido (Mismo stock)",
                    tiendanube: "No tiene POS físico propio",
                    shopify: "POS Pro cuesta $89 USD/mes",
                    jumpseller: "POS móvil elemental",
                    bsale: "Nativo incluido"
                },
                {
                    name: "Límite de sucursales y bodegas",
                    mercenario: "Multi-bodega ilimitada",
                    tiendanube: "Máximo 3 centros de despacho",
                    shopify: "Limitado por plan USD",
                    jumpseller: "Limitado por espacio GB",
                    bsale: "Cobro por sucursal extra"
                }
            ]
        },
        {
            category: "Inteligencia Artificial y Canales",
            items: [
                {
                    name: "Asistente WhatsApp Cloud con IA en tiempo real",
                    mercenario: "Nativo 24/7 (1.000 chats inc.)",
                    tiendanube: "Chat Nube ($100 CLP por chat)",
                    shopify: "Apps externas en USD",
                    jumpseller: "Solo mensajes automáticos",
                    bsale: "No disponible"
                },
                {
                    name: "Listas de precios mayoristas B2B por RUT",
                    mercenario: "Ilimitadas por cliente",
                    tiendanube: "Máximo 3 tablas de precio",
                    shopify: "Solo en Shopify Plus ($2K USD)",
                    jumpseller: "Solo en planes altos",
                    bsale: "Listas estándar"
                },
                {
                    name: "Velocidad de carga móvil (Next.js Edge)",
                    mercenario: "<0.8 segundos (Edge)",
                    tiendanube: "2.2s a 3.5s",
                    shopify: "2.0s a 3.0s",
                    jumpseller: "2.5s a 4.0s",
                    bsale: "3.0s+"
                }
            ]
        }
    ];

    return (
        <section id="comparativa" className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-24 space-y-10 border-t border-neutral-100">
            {/* Header */}
            <div className="space-y-4 max-w-3xl">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">
                    BENCHMARK DE MERCADO EN CHILE · COSTOS Y CAPACIDADES REALES
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                    Mercenario OS vs. La Competencia.
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                    Mientras otras plataformas te obligan a contratar software de facturación aparte, sistemas de caja adicionales y aplicaciones en dólares, Mercenario resuelve todo tu circuito comercial de forma personalizada y unificada.
                </p>
            </div>

            {/* Cuadro aclaratorio de personalización */}
            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center gap-3 text-xs text-neutral-700">
                <ShieldCheck className="w-5 h-5 text-neutral-900 shrink-0" />
                <span>
                    <strong>Diferenciador clave:</strong> Cada empresa tiene flujos de despacho, bodegas y reglas tributarias distintas. A diferencia de las plataformas cerradas tipo "hazlo tú mismo", en Mercenario <strong>cada proyecto es personalizado</strong> y se configura con acompañamiento técnico directo en Chile.
                </span>
            </div>

            {/* Tabla Comparativa Responsive */}
            <div className="border border-neutral-200 rounded-3xl overflow-hidden bg-white shadow-sm overflow-x-auto">
                <table className="w-full min-w-[850px] border-collapse text-left">
                    <thead>
                        <tr className="border-b border-neutral-200 bg-neutral-900 text-white">
                            <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider font-bold w-1/3">
                                Funcionalidad Clave
                            </th>
                            <th className="py-5 px-4 text-xs font-mono uppercase tracking-wider font-black text-emerald-400 bg-black/40 text-center">
                                Mercenario OS
                            </th>
                            <th className="py-5 px-3 text-xs font-mono uppercase tracking-wider font-bold text-neutral-300 text-center">
                                Tiendanube
                            </th>
                            <th className="py-5 px-3 text-xs font-mono uppercase tracking-wider font-bold text-neutral-300 text-center">
                                Shopify
                            </th>
                            <th className="py-5 px-3 text-xs font-mono uppercase tracking-wider font-bold text-neutral-300 text-center">
                                Jumpseller
                            </th>
                            <th className="py-5 px-3 text-xs font-mono uppercase tracking-wider font-bold text-neutral-300 text-center">
                                Bsale
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 text-xs">
                        {comparisonFeatures.map((group, groupIdx) => (
                            <Fragment key={groupIdx}>
                                <tr className="bg-neutral-100/70">
                                    <td colSpan={6} className="py-2.5 px-6 text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-700">
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
                                        <td className="py-4 px-3 text-center text-neutral-600 font-light">
                                            {item.tiendanube}
                                        </td>
                                        <td className="py-4 px-3 text-center text-neutral-600 font-light">
                                            {item.shopify}
                                        </td>
                                        <td className="py-4 px-3 text-center text-neutral-600 font-light">
                                            {item.jumpseller}
                                        </td>
                                        <td className="py-4 px-3 text-center text-neutral-600 font-light">
                                            {item.bsale}
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
