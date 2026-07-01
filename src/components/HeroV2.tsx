"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function HeroV2() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoLoaded, setVideoLoaded] = useState(false);

    // Track overall scroll progress for the whole section (0 to 1)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // We use a stiff spring to eliminate the 'stuck and accelerate' lag (rubber banding).
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 400,
        damping: 40,
        restDelta: 0.001
    });

    // --------------------------------------------------------
    // VIDEO SCRUBBING LOGIC
    // --------------------------------------------------------
    useEffect(() => {
        // We listen to the smoothed progress to update the video frame
        const unsubscribe = smoothProgress.on("change", (latestProgress) => {
            if (videoRef.current && videoRef.current.readyState >= 2) { // HAVE_CURRENT_DATA
                // If video is loaded, map progress to a safe duration (cutting the end text)
                const END_TRIM_SECONDS = 1.5; // Cut off the last 1.5 seconds where text might appear
                const maxDuration = Math.max(0, videoRef.current.duration - END_TRIM_SECONDS);
                
                // We use 75% of the scroll for the video to finish earlier, leaving room for the final text reveal
                const videoProgress = Math.min(latestProgress / 0.75, 1);
                const targetTime = videoProgress * maxDuration;
                
                // Update the frame
                videoRef.current.currentTime = targetTime || 0;
            }
        });
        
        return () => unsubscribe();
    }, [smoothProgress]);

    // Handle initial video load directly in JSX now
    const handleVideoLoad = () => {
        if (videoRef.current) {
            setVideoLoaded(true);
            videoRef.current.pause();
        }
    };

    // --------------------------------------------------------
    // NARRATIVE TIMELINE (Opacity mappings based on scroll)
    // --------------------------------------------------------
    
    // 0. Dark overlay to make white text readable against the bright papers in the chaotic video
    const overlayOpacity = useTransform(smoothProgress, [0, 0.35], [0.5, 0]);

    // 1. Initial Prompt "Desliza para avanzar"
    const promptOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
    
    // 2. The Saturation Point Text (Visible from the very beginning, fades out as you scrub)
    const questionOpacity = useTransform(smoothProgress, [0, 0.2, 0.35], [1, 1, 0]);
    
    // 3. The Break (Video is mostly ordered now)
    const breakOpacity = useTransform(smoothProgress, [0.4, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
    
    // 4. Final Brand Reveal (Video is stopped at perfect order)
    const brandOpacity = useTransform(smoothProgress, [0.65, 0.75, 1], [0, 1, 1]);
    const brandY = useTransform(smoothProgress, [0.65, 0.75], [20, 0]);

    // 5. Fade to White (Covers everything, including the video and previous texts)
    const fadeToWhite = useTransform(smoothProgress, [0.8, 0.85], [0, 1]);

    // 6. Act 6: The Approach (New Section 2, mapped to scroll)
    const act6Opacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);

    return (
        <section ref={containerRef} className="relative w-full h-[300dvh] bg-white">
            
            {/* The Sticky Viewport */}
            <motion.div 
                className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-black flex items-center justify-center origin-bottom"
            >
                
                {/* --- VIDEO LAYER --- */}
                <div className="absolute inset-0 z-0 bg-black">
                    <video
                        ref={videoRef}
                        src="/videos/hero-scrub5.mp4" 
                        autoPlay
                        playsInline
                        muted
                        preload="auto"
                        onLoadedMetadata={handleVideoLoad}
                        onCanPlay={handleVideoLoad}
                        className="object-cover object-center w-full h-full"
                        style={{ pointerEvents: "none" }} // Ensure it doesn't capture touches
                    />
                    {/* Cinematic Dark Overlay for Text Legibility */}
                    <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black/60 pointer-events-none" />
                </div>

                {/* --- NARRATIVE OVERLAYS --- */}

                {/* Initial Instruction */}
                <motion.div style={{ opacity: promptOpacity }} className="absolute bottom-16 inset-x-0 z-10 flex flex-col items-center gap-2 pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/70 drop-shadow-md">Desliza para avanzar</span>
                    <div className="w-[1px] h-8 bg-white/50 animate-pulse" />
                </motion.div>

                {/* Act 3: Question */}
                <motion.div style={{ opacity: questionOpacity }} className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none">
                    <h3 className="text-2xl md:text-4xl font-light text-white tracking-wide text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                        ¿En qué ocupaste realmente tu tiempo?
                    </h3>
                </motion.div>

                {/* Act 4: The Break */}
                <motion.div style={{ opacity: breakOpacity }} className="absolute inset-0 z-30 flex flex-col items-center justify-start pt-[32vh] md:pt-[25vh] px-4 pointer-events-none">
                    <span className="text-xs md:text-base font-semibold tracking-[0.2em] uppercase text-white/80 mb-4 md:mb-6 drop-shadow-md">
                        No falta talento.
                    </span>
                    <h2 className="text-[8vw] sm:text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tighter text-white text-center leading-[1.1] drop-shadow-2xl">
                        FALTA OPERACIÓN.
                    </h2>
                </motion.div>

                {/* Act 5: Brand Reveal */}
                <motion.div style={{ opacity: brandOpacity, y: brandY }} className="absolute inset-0 z-40 flex flex-col items-center justify-start pt-[26vh] md:pt-[22vh] px-4 pointer-events-none w-full">
                    <h1 className="text-[9vw] sm:text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-[0.1em] text-white uppercase leading-none drop-shadow-xl whitespace-nowrap">
                        MERCENARIO<span className="text-mercenario-danger">.</span>
                    </h1>
                    <div className="w-8 md:w-12 h-[2px] bg-white my-6 md:my-8" />
                    <p className="text-sm md:text-2xl font-medium text-white tracking-wide text-center drop-shadow-md">
                        Concéntrate en tu talento. <br className="md:hidden" />
                        <span className="text-white/60 font-light">Nosotros conectamos la operación.</span>
                    </p>
                    
                    <div className="absolute bottom-12 animate-bounce">
                        <ChevronDown className="w-6 h-6 text-white/50" />
                    </div>
                </motion.div>

                {/* Fade to White Cover */}
                <motion.div style={{ opacity: fadeToWhite }} className="absolute inset-0 z-50 bg-white pointer-events-none" />

                {/* Act 6: The Approach (Previously Section 2) */}
                <motion.div style={{ opacity: act6Opacity }} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white pointer-events-none">
                    <div className="w-full max-w-4xl mx-auto px-4 space-y-8 text-center md:text-left pointer-events-auto">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">El Enfoque</span>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                            No necesitas más herramientas. <br />
                            <span className="text-neutral-400 font-semibold">Necesitas que trabajen juntas.</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-500 font-light text-sm md:text-base leading-relaxed pt-8 text-left">
                            <div className="space-y-4">
                                <p>Hoy probablemente tu empresa ya utiliza varias soluciones.</p>
                                <p>Una para agendar. Otra para cobrar. Otra para emitir documentos. Otra para comunicarte con tus clientes.</p>
                            </div>
                            <div className="space-y-4">
                                <p>El problema nunca fueron las herramientas.</p>
                                <p className="font-semibold text-black">El problema es que ninguna trabaja con las demás. Cuando comienzan a comunicarse, la operación cambia por completo.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}
