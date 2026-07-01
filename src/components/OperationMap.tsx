"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// --- Subcomponents to respect React Rules of Hooks & improve performance ---

const NodeItem = ({ 
    node, 
    progressValue 
}: { 
    node: any; 
    progressValue: MotionValue<number>;
}) => {
    // Map animations strictly to a scroll range just before hitting the node for a smooth mathematical transition
    const rangeStart = node.progress - 0.05;
    const rangeEnd = node.progress;

    // Premium GPU-Accelerated Animations
    const color = useTransform(progressValue, [rangeStart, rangeEnd], ["#d4d4d4", "#000000"]);
    const scale = useTransform(progressValue, [rangeStart, rangeEnd], [1, 1.05]);
    const branchScaleX = useTransform(progressValue, [rangeStart, rangeEnd], [0, 1]);
    const branchOpacity = useTransform(progressValue, [rangeStart, rangeEnd], [0, 1]);
    const branchTranslateL = useTransform(progressValue, [rangeStart, rangeEnd], [10, 0]);
    const branchTranslateR = useTransform(progressValue, [rangeStart, rangeEnd], [-10, 0]);
    
    return (
        <div 
            className="absolute left-1/2 flex items-center w-full z-10"
            style={{ top: `${node.progress * 100}%`, transform: 'translate(-50%, -50%)' }}
        >
            {/* Branch Left */}
            {node.branchLeft && (
                <div className="absolute right-1/2 top-1/2 -translate-y-1/2 w-[15vw] md:w-[10vw] flex items-center justify-end pr-4 md:pr-6">
                    <motion.span 
                        style={{ opacity: branchOpacity, x: branchTranslateL }}
                        className="text-[9px] md:text-10px font-mono uppercase tracking-widest text-neutral-400 mr-2 md:mr-4"
                    >
                        {node.branchLeft}
                    </motion.span>
                    <div className="w-full max-w-[40px] md:max-w-[80px] h-[1px] bg-transparent flex justify-end">
                        <motion.div 
                            style={{ scaleX: branchScaleX }}
                            className="h-full w-full bg-neutral-200 origin-right" 
                        />
                    </div>
                </div>
            )}

            {/* Node Label (Right side of trunk) */}
            <motion.span 
                style={{ color, scale }}
                className="absolute left-1/2 pl-6 md:pl-10 text-base md:text-3xl font-bold tracking-tight origin-left"
            >
                {node.label}
            </motion.span>

            {/* Branch Right (further right than the label) */}
            {node.branchRight && (
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-[35vw] flex items-center pl-[160px] md:pl-[240px]">
                    <div className="w-full max-w-[40px] md:max-w-[80px] h-[1px] bg-transparent flex justify-start">
                        <motion.div 
                            style={{ scaleX: branchScaleX }}
                            className="h-full w-full bg-neutral-200 origin-left" 
                        />
                    </div>
                    <motion.span 
                        style={{ opacity: branchOpacity, x: branchTranslateR }}
                        className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest text-neutral-400 ml-2 md:ml-4"
                    >
                        {node.branchRight}
                    </motion.span>
                </div>
            )}
        </div>
    );
};

const PhraseItem = ({ 
    phrase, 
    progressValue 
}: { 
    phrase: any; 
    progressValue: MotionValue<number>;
}) => {
    const opacity = useTransform(
        progressValue, 
        [phrase.start - 0.03, phrase.start, phrase.end, phrase.end + 0.03], 
        [0, 1, 1, 0]
    );
    const yOffset = useTransform(
        progressValue, 
        [phrase.start - 0.03, phrase.start, phrase.end, phrase.end + 0.03], 
        [30, 0, 0, -30]
    );

    return (
        <motion.div
            style={{ opacity, y: yOffset }}
            className="absolute left-[5%] md:left-[15%] top-1/2 -translate-y-1/2 w-[35%] md:w-[25%] pointer-events-none"
        >
            <p className="text-xl md:text-4xl lg:text-5xl font-light text-black leading-tight tracking-tight selection:bg-black selection:text-white">
                {phrase.text}
            </p>
        </motion.div>
    );
};


export default function OperationMap() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll through this massive 800vh section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Directly bind to scroll
    const progressValue = scrollYProgress;

    // Red dot vertical movement (from 10% to 90% of screen height)
    const dotY = useTransform(progressValue, [0, 1], ["10%", "90%"]);
    // The main black line that draws itself to follow the dot using scaleY (GPU accelerated)
    const trunkScaleY = useTransform(progressValue, [0, 1], [0, 1]);

    // Nodes definition
    const nodes = [
        { id: "cliente", label: "Cliente", progress: 0.1 },
        { id: "agenda", label: "Agenda", progress: 0.2, branchLeft: "WhatsApp" },
        { id: "recepcion", label: "Recepción", progress: 0.3 },
        { id: "caja", label: "Caja", progress: 0.4, branchRight: "Webpay" },
        { id: "facturacion", label: "Facturación", progress: 0.5 },
        { id: "sii", label: "SII", progress: 0.6, branchRight: "API" },
        { id: "inventario", label: "Inventario", progress: 0.7, branchLeft: "IA" },
        { id: "compras", label: "Compras", progress: 0.8 },
        { id: "contabilidad", label: "Contabilidad", progress: 0.9 }
    ];

    // Phrases that appear alongside the journey
    const phrases = [
        { text: "Un cliente agenda una cita.", start: 0.05, end: 0.15 },
        { text: "La agenda se actualiza.", start: 0.18, end: 0.25 },
        { text: "Recepción valida la llegada.", start: 0.28, end: 0.35 },
        { text: "Caja recibe la operación.", start: 0.38, end: 0.45 },
        { text: "Se genera la boleta.", start: 0.48, end: 0.55 },
        { text: "SII es notificado en silencio.", start: 0.58, end: 0.65 },
        { text: "El inventario se ajusta.", start: 0.68, end: 0.75 },
        { text: "Compras consolida la demanda.", start: 0.78, end: 0.85 },
        { text: "El cliente recibe la confirmación.", start: 0.88, end: 0.95 },
    ];

    return (
        <section ref={containerRef} className="relative w-full h-[800vh] bg-white">
            
            <div className="sticky top-0 w-full h-[100svh] overflow-hidden flex justify-center bg-white">
                
                {/* Center Background Line */}
                <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1px] bg-neutral-100" style={{ height: '80%' }} />
                
                {/* Animated Black Trunk Line (GPU Accelerated via scaleY) */}
                <motion.div 
                    className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[1px] bg-black origin-top" 
                    style={{ height: '80%', scaleY: trunkScaleY }} 
                />

                {/* Nodes & Branches */}
                {nodes.map((node) => (
                    <NodeItem key={node.id} node={node} progressValue={progressValue} />
                ))}

                {/* Dynamic Phrases (Premium fade & slide) */}
                {phrases.map((phrase, i) => (
                    <PhraseItem key={i} phrase={phrase} progressValue={progressValue} />
                ))}

                {/* The Red Dot (The Operation) */}
                <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-mercenario-danger rounded-full z-50 flex items-center justify-center"
                    style={{ top: dotY, marginTop: '-8px', boxShadow: '0 0 20px rgba(255,17,34,0.4)' }}
                >
                    {/* Pulsing Halo */}
                    <div className="absolute w-full h-full bg-mercenario-danger rounded-full animate-ping opacity-60" />
                    {/* Inner Core */}
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </motion.div>

            </div>
        </section>
    );
}
