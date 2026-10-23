"use client";

import { Fragment } from "react";
import { Check, X, ShieldCheck, Sparkles, TrendingDown, DollarSign } from "lucide-react";

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
                },
                {
                    name: "Cotizador Multi-Courier & Retiro en Tienda",
                    mercenario: "Nativo en vivo (Shipit, Starken, Chilexpress) + Retiro $0",
                    tiendanube: "Requiere apps o tablas fijas",
                    shopify: "Exige plan Advanced ($299 USD/mes)",
                    jumpseller: "Básico manual",
                    bsale: "Solo manual"
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

    const financialSimulation = [
        {
            item: "Suscripción base mensual",
            tiendanube: "$59.999 CLP",
            shopify: "~$67.500 CLP ($69 USD)",
            jumpseller: "$36.000 CLP",
            bsale: "~$68.000 CLP (1.8 UF)",
            mercenarioOmni: "$44.990 CLP",
            mercenarioPro: "$89.990 CLP"
        },
        {
            item: "Comisión plataforma sobre ventas ($5.000.000)",
            tiendanube: "$0 CLP (0%)",
            shopify: "$50.000 CLP (1.0% comisión)",
            jumpseller: "$0 CLP (0%)",
            bsale: "$0 CLP (0%)",
            mercenarioOmni: "$0 CLP (0%)",
            mercenarioPro: "$0 CLP (0%)"
        },
        {
            item: "App externa Boletas / Facturas SII",
            tiendanube: "$30.000 CLP (Lioren / Relbase)",
            shopify: "$35.000 CLP (Multivende / Apps)",
            jumpseller: "$20.000 CLP (Módulo DTE)",
            bsale: "Incluido",
            mercenarioOmni: "Nativo incluido",
            mercenarioPro: "Nativo incluido"
        },
        {
            item: "Software POS para local físico",
            tiendanube: "$35.000 CLP (Software externo)",
            shopify: "$87.000 CLP ($89 USD POS Pro)",
            jumpseller: "Básico manual",
            bsale: "Incluido",
            mercenarioOmni: "Nativo incluido",
            mercenarioPro: "Nativo incluido"
        },
        {
            item: "Asistente WhatsApp IA (1.000 chats)",
            tiendanube: "$100.000 CLP ($100 por chat)",
            shopify: "$60.000+ CLP (ManyChat/Zenvia)",
            jumpseller: "No disponible",
            bsale: "No disponible",
            mercenarioOmni: "No incluye",
            mercenarioPro: "Incluido (1.000 chats)"
        }
    ];

    return (
        <section id="comparativa" className="w-full max-w-6xl mx-auto px-4 py-16 sm:py-24 space-y-16 border-t border-neutral-100">
            
            {/* ─── PARTE 1: BENCHMARK FUNCIONAL ─── */}
            <div className="space-y-8">
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
                        <strong>Diferenciador clave:</strong> Cada empresa tiene flujos de despacho, bodegas y reglas tributarias distintas. A diferencia de las plataformas cerradas tipo "hazlo tú mismo", en Mercenario <strong>cada proyecto es 100% personalizado</strong> y se configura con acompañamiento técnico directo en Chile.
                    </span>
                </div>

                {/* Tabla Funcionalidades */}
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
            </div>

            {/* ─── PARTE 2: MATRIZ DE COSTOS REALES (SIMULACIÓN $5.000.000 CLP / MES) ─── */}
            <div className="space-y-8 pt-6 border-t border-neutral-100">
                <div className="space-y-4 max-w-3xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-mono font-bold uppercase">
                        <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                        <span>SIMULACIÓN REAL: COMERCIO VENDIENDO $5.000.000 CLP / MES</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-neutral-900 leading-tight">
                        Matriz de Costos Reales y Gasto Anual.
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                        En Chile, vender formalmente exige emitir boletas al SII y, si tienes tienda física o showroom, sincronizar tu stock con un Punto de Venta. Esto es lo que realmente pagas al mes y al año sumando comisiones por venta y aplicaciones externas indispensables:
                    </p>
                </div>

                <div className="border border-neutral-200 rounded-3xl overflow-hidden bg-white shadow-md overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse text-left">
                        <thead>
                            <tr className="border-b border-neutral-200 bg-neutral-900 text-white">
                                <th className="py-5 px-6 text-xs font-mono uppercase tracking-wider font-bold w-1/4">
                                    Concepto de Costo
                                </th>
                                <th className="py-5 px-3 text-xs font-mono uppercase tracking-wider font-bold text-neutral-300 text-center">
                                    Tiendanube<br /><span className="text-[10px] text-neutral-400 font-normal">Avanzado</span>
                                </th>
                                <th className="py-5 px-3 text-xs font-mono uppercase tracking-wider font-bold text-neutral-300 text-center">
                                    Shopify<br /><span className="text-[10px] text-neutral-400 font-normal">Plan Shopify</span>
                                </th>
                                <th className="py-5 px-3 text-xs font-mono uppercase tracking-wider font-bold text-neutral-300 text-center">
                                    Jumpseller<br /><span className="text-[10px] text-neutral-400 font-normal">Plan Pro</span>
                                </th>
                                <th className="py-5 px-3 text-xs font-mono uppercase tracking-wider font-bold text-neutral-300 text-center">
                                    Bsale<br /><span className="text-[10px] text-neutral-400 font-normal">Estándar</span>
                                </th>
                                <th className="py-5 px-4 text-xs font-mono uppercase tracking-wider font-black text-emerald-400 bg-black/40 text-center">
                                    Mercenario<br /><span className="text-[10px] text-emerald-300 font-normal">Omnicanal</span>
                                </th>
                                <th className="py-5 px-4 text-xs font-mono uppercase tracking-wider font-black text-emerald-400 bg-black/40 text-center">
                                    Mercenario<br /><span className="text-[10px] text-emerald-300 font-normal">Pro + IA</span>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-200 text-xs">
                            {financialSimulation.map((row, idx) => (
                                <tr key={idx} className="hover:bg-neutral-50/80 transition-colors">
                                    <td className="py-3.5 px-6 font-medium text-neutral-900">
                                        {row.item}
                                    </td>
                                    <td className="py-3.5 px-3 text-center text-neutral-600 font-mono text-[11px]">
                                        {row.tiendanube}
                                    </td>
                                    <td className="py-3.5 px-3 text-center text-neutral-600 font-mono text-[11px]">
                                        {row.shopify}
                                    </td>
                                    <td className="py-3.5 px-3 text-center text-neutral-600 font-mono text-[11px]">
                                        {row.jumpseller}
                                    </td>
                                    <td className="py-3.5 px-3 text-center text-neutral-600 font-mono text-[11px]">
                                        {row.bsale}
                                    </td>
                                    <td className="py-3.5 px-4 text-center font-bold text-black bg-emerald-50/30 font-mono text-[11px]">
                                        {row.mercenarioOmni}
                                    </td>
                                    <td className="py-3.5 px-4 text-center font-bold text-black bg-emerald-50/50 font-mono text-[11px]">
                                        {row.mercenarioPro}
                                    </td>
                                </tr>
                            ))}

                            {/* Fila: Total Mensual */}
                            <tr className="bg-neutral-100/90 font-bold border-t-2 border-neutral-300">
                                <td className="py-4 px-6 text-sm text-neutral-900 font-black">
                                    GASTO TOTAL MENSUAL
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-sm text-neutral-900">
                                    $224.999 CLP
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-sm text-red-600">
                                    $299.500 CLP
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-sm text-neutral-900">
                                    $116.000 CLP
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-sm text-neutral-900">
                                    $105.000+ CLP
                                </td>
                                <td className="py-4 px-4 text-center font-mono text-base font-black text-black bg-emerald-100/60">
                                    $44.990 CLP
                                </td>
                                <td className="py-4 px-4 text-center font-mono text-base font-black text-black bg-emerald-200/60">
                                    $89.990 CLP
                                </td>
                            </tr>

                            {/* Fila: Gasto Anual */}
                            <tr className="bg-neutral-900 text-white font-bold">
                                <td className="py-4 px-6 text-sm font-black">
                                    GASTO TOTAL ANUAL
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-sm text-neutral-300">
                                    $2.699.988 CLP
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-sm text-rose-300">
                                    $3.594.000 CLP
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-sm text-neutral-300">
                                    $1.392.000 CLP
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-sm text-neutral-300">
                                    $1.260.000 CLP
                                </td>
                                <td className="py-4 px-4 text-center font-mono text-base font-black text-emerald-400 bg-black/60">
                                    $539.880 CLP
                                </td>
                                <td className="py-4 px-4 text-center font-mono text-base font-black text-emerald-300 bg-black/80">
                                    $1.079.880 CLP
                                </td>
                            </tr>

                            {/* Fila: Ahorro Neto Anual */}
                            <tr className="bg-emerald-50 text-emerald-950 font-bold border-t border-emerald-200">
                                <td className="py-4 px-6 text-xs uppercase tracking-wider font-black">
                                    AHORRO NETO ANUAL CON MERCENARIO
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-xs text-emerald-800">
                                    Ahorras $2.160.108
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-xs text-emerald-800">
                                    Ahorras $3.054.120
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-xs text-emerald-800">
                                    Ahorras $852.120
                                </td>
                                <td className="py-4 px-3 text-center font-mono text-xs text-emerald-800">
                                    Ahorras $720.120
                                </td>
                                <td colSpan={2} className="py-4 px-4 text-center font-mono text-xs text-emerald-900 font-black">
                                    ★ Todo incluido en pesos chilenos
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-neutral-100 rounded-2xl text-[11px] font-mono text-neutral-500 leading-relaxed">
                    * Simulación basada en un comercio con ventas de $5.000.000 CLP mensuales (combinando venta web y presencial), emisión de boletas legales ante el SII, 1 caja física POS y 1.000 interacciones mensuales de atención. Los valores de Shopify consideran el cobro del 1.0% de comisión por pasarela externa al no operar Shopify Payments en Chile y tipo de cambio referencial de $980 CLP/USD.
                </div>
            </div>

        </section>
    );
}
