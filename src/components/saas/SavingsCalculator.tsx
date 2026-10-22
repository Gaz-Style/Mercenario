"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingDown, ArrowRight, ShieldCheck, Check } from "lucide-react";

export default function SavingsCalculator({ onSelectPlan }: { onSelectPlan?: (planName: string) => void }) {
    // Venta mensual estimada en CLP
    const [monthlySales, setMonthlySales] = useState<number>(3500000);

    // Mercado Libre promedio: 13.5%
    const meliCommission = Math.round(monthlySales * 0.135);
    // Shopify: Plan Básico ($39 USD ~ $38.000 CLP) + 2% comisión externa por no usar Shopify Payments en Chile (~$70.000) + App boleta SII ($25.000)
    const shopifyCost = Math.round(38000 + (monthlySales * 0.02) + 25000);
    // Mercenario OS: Plan Omnicanal Fijo ($24.990 CLP) y CERO comisiones por venta
    const mercenarioCost = 24990;

    // Ahorro mensual respecto a Mercado Libre
    const monthlySavingsVsMeli = Math.max(0, meliCommission - mercenarioCost);
    // Ahorro mensual respecto a Shopify + Apps
    const monthlySavingsVsShopify = Math.max(0, shopifyCost - mercenarioCost);

    // Ahorro anual frente a plataformas con comisiones
    const annualSavings = monthlySavingsVsMeli * 12;

    const formatCLP = (val: number) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0
        }).format(val);
    };

    return (
        <section id="calculadora" className="w-full max-w-5xl mx-auto px-4 py-16 sm:py-24 border-t border-neutral-100">
            <div className="border border-neutral-200 bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm space-y-10">
                
                {/* Header */}
                <div className="space-y-4 max-w-3xl">
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-black text-white text-[10px] font-mono uppercase rounded-md font-bold tracking-wider flex items-center gap-1.5">
                            <Calculator className="w-3 h-3" />
                            0% COMISIÓN POR VENTA
                        </span>
                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">
                            CALCULADORA DE RETORNO
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-neutral-900 leading-tight">
                        Calcula cuánto dinero estás perdiendo en comisiones.
                    </h2>
                    <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                        Plataformas tradicionales como Mercado Libre o marketplaces se quedan con hasta un 15% de tu facturación. Shopify penaliza cada venta fuera de su pasarela. Con <strong>Mercenario OS</strong> pagas un abono fijo en pesos chilenos y el <strong>100% del margen es tuyo</strong>.
                    </p>
                </div>

                {/* Slider interactivo */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                        <div>
                            <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                                ¿Cuánto vende tu negocio al mes? (Online + Físico)
                            </span>
                            <span className="text-3xl sm:text-4xl font-mono font-black text-neutral-900">
                                {formatCLP(monthlySales)}
                            </span>
                        </div>
                        <span className="text-xs text-neutral-400 font-mono">
                            Desliza para simular
                        </span>
                    </div>

                    <input
                        type="range"
                        min={500000}
                        max={25000000}
                        step={250000}
                        value={monthlySales}
                        onChange={(e) => setMonthlySales(Number(e.target.value))}
                        className="w-full h-2.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black focus:outline-none"
                    />

                    <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                        <span>$500.000 CLP</span>
                        <span>$10.000.000 CLP</span>
                        <span>$25.000.000+ CLP</span>
                    </div>
                </div>

                {/* Tarjetas comparativas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* MercadoLibre */}
                    <div className="p-6 bg-white rounded-2xl border border-neutral-200 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">
                                MARKETPLACES (Mercado Libre)
                            </span>
                            <div className="text-xs text-neutral-500">
                                Comisión estimada ~13.5%
                            </div>
                            <div className="text-2xl font-mono font-bold text-red-600">
                                -{formatCLP(meliCommission)} <span className="text-xs text-neutral-400 font-sans font-normal">/mes</span>
                            </div>
                        </div>
                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                            Pierdes clientes, no construyes base de datos propia y pagas una comisión agresiva por cada venta.
                        </p>
                    </div>

                    {/* Shopify + Apps */}
                    <div className="p-6 bg-white rounded-2xl border border-neutral-200 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">
                                SHOPIFY + APPS EXTRA
                            </span>
                            <div className="text-xs text-neutral-500">
                                Plan USD + 2% comisión + Boleta SII
                            </div>
                            <div className="text-2xl font-mono font-bold text-neutral-800">
                                -{formatCLP(shopifyCost)} <span className="text-xs text-neutral-400 font-sans font-normal">/mes</span>
                            </div>
                        </div>
                        <p className="text-xs text-neutral-500 leading-relaxed font-light">
                            Tarifas en dólares variables, penalización por usar Webpay chileno y pago mensual extra por facturación electrónica.
                        </p>
                    </div>

                    {/* Mercenario OS */}
                    <div className="p-6 bg-neutral-900 text-white rounded-2xl border-2 border-neutral-900 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 right-0 bg-white text-black text-[9px] font-mono uppercase px-3 py-1 rounded-bl-lg font-black tracking-wider">
                            0% COMISIÓN
                        </div>
                        <div className="space-y-2">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">
                                MERCENARIO OS (OMNICANAL)
                            </span>
                            <div className="text-xs text-neutral-300">
                                Tienda + ERP + POS + Boletas SII
                            </div>
                            <div className="text-2xl font-mono font-bold text-emerald-400">
                                {formatCLP(mercenarioCost)} <span className="text-xs text-neutral-400 font-sans font-normal">/mes fijo</span>
                            </div>
                        </div>
                        <div className="pt-2 border-t border-neutral-800 space-y-1">
                            <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                                Tu ahorro anual estimado:
                            </span>
                            <span className="text-xl sm:text-2xl font-mono font-black text-white block">
                                {formatCLP(annualSavings)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Banner de llamada a la acción */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shrink-0">
                            <TrendingDown className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                            <h4 className="text-sm font-bold text-neutral-900">
                                Ahorras hasta {formatCLP(monthlySavingsVsMeli)} todos los meses
                            </h4>
                            <p className="text-xs text-neutral-600 font-light">
                                Sin comisiones intermedias. El dinero entra directo desde Transbank o Mercado Pago a tu cuenta bancaria.
                            </p>
                        </div>
                    </div>

                    <a
                        href="#planes"
                        onClick={() => onSelectPlan && onSelectPlan("Plan Omnicanal ($24.990 CLP/mes)")}
                        className="w-full sm:w-auto px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider rounded-xl transition-colors font-bold whitespace-nowrap text-center"
                    >
                        Ver Planes y Empezar
                    </a>
                </div>

            </div>
        </section>
    );
}
