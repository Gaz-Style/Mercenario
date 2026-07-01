"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function OperationMap() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll through this massive 800vh section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll input slightly for a more organic feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 90,
        restDelta: 0.001
    });

    // Red dot vertical movement (from 10% to 90% of screen height)
    const dotY = useTransform(smoothProgress, [0, 1], ["10%", "90%"]);

    // Nodes definition
    const nodes = [
        { id: "cliente", label: "Cliente", progress: 0.1 },
        { id: "agenda", label: "Agenda", progress: 0.2, branchLeft: "WhatsApp" },
        { id: "recepcion", label: "Recepción", progress: 0.3 },
        { id: "caja", label: "Caja", progress: 0.4, branchRight: "Webpay" },
        { id: "facturacion", label: "Facturación", progress: 0.5 },
        { id: "sii", label: "SII", progress: 0.6 },
        { id: "inventario", label: "Inventario", progress: 0.7, branchLeft: "IA" },
        { id: "compras", label: "Compras", progress: 0.8 },
        { id: "contabilidad", label: "Contabilidad", progress: 0.9 }
    ];

    // Phrases that appear alongside the journey
    const phrases = [
        { text: "Cliente agenda una cita.", start: 0.05, end: 0.15 },
        { text: "La agenda se actualiza.", start: 0.18, end: 0.25 },
        { text: "Recepción valida llegada.", start: 0.28, end: 0.35 },
        { text: "Caja recibe la operación.", start: 0.38, end: 0.45 },
        { text: "Se genera la boleta.", start: 0.48, end: 0.55 },
        { text: "SII es notificado automáticamente.", start: 0.58, end: 0.65 },
        { text: "El inventario descuenta el insumo.", start: 0.68, end: 0.75 },
        { text: "Compras consolida la demanda.", start: 0.78, end: 0.85 },
        { text: "El cliente recibe la confirmación.", start: 0.88, end: 0.95 },
    ];

    return (
        <section ref={containerRef} className="relative w-full h-[800vh] bg-white">
            
            <div className="sticky top-0 w-full h-[100svh] overflow-hidden flex justify-center bg-white">
                
                {/* Center SVG Line (The Main Trunk) */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] py-[10vh]">
                    <div className="w-full h-full bg-neutral-200" />
                </div>

                {/* Nodes & Branches */}
                {nodes.map((node, i) => {
                    // Activate node when dot passes its progress
                    const isActive = useTransform(smoothProgress, (p) => p >= node.progress);
                    // Color transition based on activation
                    const color = useTransform(isActive, (active) => active ? "#000000" : "#d4d4d4");
                    
                    return (
                        <div 
                            key={node.id} 
                            className="absolute left-1/2 flex items-center w-full"
                            style={{ top: `${node.progress * 100}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            {/* Branch Left */}
                            {node.branchLeft && (
                                <div className="absolute right-1/2 top-1/2 -translate-y-1/2 w-[15vw] flex items-center justify-end pr-4">
                                    <motion.span 
                                        style={{ color }}
                                        className="text-[10px] md:text-xs font-mono uppercase tracking-widest mr-2 transition-colors duration-500"
                                    >
                                        {node.branchLeft}
                                    </motion.span>
                                    <motion.div 
                                        style={{ backgroundColor: color }}
                                        className="h-[1px] w-full max-w-[40px] transition-colors duration-500" 
                                    />
                                </div>
                            )}

                            {/* Node Label (Right side of trunk) */}
                            <motion.span 
                                style={{ color }}
                                className="absolute left-1/2 pl-6 md:pl-10 text-sm md:text-2xl font-bold tracking-tight transition-colors duration-500"
                            >
                                {node.label}
                            </motion.span>

                            {/* Branch Right (further right than the label) */}
                            {node.branchRight && (
                                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[35vw] flex items-center pl-[150px] md:pl-[200px]">
                                    <motion.div 
                                        style={{ backgroundColor: color }}
                                        className="h-[1px] w-full max-w-[40px] transition-colors duration-500" 
                                    />
                                    <motion.span 
                                        style={{ color }}
                                        className="text-[10px] md:text-xs font-mono uppercase tracking-widest ml-2 transition-colors duration-500"
                                    >
                                        {node.branchRight}
                                    </motion.span>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Dynamic Phrases */}
                {phrases.map((phrase, i) => {
                    const opacity = useTransform(
                        smoothProgress, 
                        [phrase.start - 0.02, phrase.start, phrase.end, phrase.end + 0.02], 
                        [0, 1, 1, 0]
                    );
                    const yOffset = useTransform(
                        smoothProgress, 
                        [phrase.start - 0.02, phrase.start, phrase.end, phrase.end + 0.02], 
                        [10, 0, 0, -10]
                    );

                    return (
                        <motion.div
                            key={i}
                            style={{ opacity, y: yOffset }}
                            className="absolute left-[10%] md:left-[20%] top-1/2 -translate-y-1/2 w-[30%] md:w-[25%] pointer-events-none"
                        >
                            <p className="text-xl md:text-3xl lg:text-4xl font-light text-black leading-tight tracking-tight">
                                {phrase.text}
                            </p>
                        </motion.div>
                    );
                })}

                {/* The Red Dot (The Operation) */}
                <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-mercenario-danger rounded-full shadow-[0_0_20px_rgba(255,17,34,0.6)] z-50"
                    style={{ top: dotY, marginTop: '-6px' }}
                />

            </div>
        </section>
    );
}
