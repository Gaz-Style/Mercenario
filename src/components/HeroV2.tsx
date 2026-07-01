"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function HeroV2() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);

    // Track overall scroll progress for the whole section (0 to 1)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // We use a balanced spring to smooth out touch input
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 300,
        damping: 40,
        restDelta: 0.001
    });

    // --------------------------------------------------------
    // VIDEO INITIALIZATION (Fake Pause for iOS Safari)
    // --------------------------------------------------------
    useEffect(() => {
        const video = videoContainerRef.current?.querySelector('video');
        if (!video) return;

        const fakePause = () => {
            // CRITICAL: Instead of .pause() or speed 0, we set playback speed to 0.01.
            // 0 completely freezes the Safari rendering pipeline on some iOS versions, 
            // breaking the scroll scrubbing. 0.01 keeps the engine alive without noticeable playback.
            video.playbackRate = 0.01;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        };

        video.addEventListener('canplay', fakePause);
        video.addEventListener('loadedmetadata', fakePause);
        
        // If it starts playing naturally, force speed back to 0.01
        const handlePlay = () => { video.playbackRate = 0.01; };
        video.addEventListener('play', handlePlay); 
        
        fakePause(); // Try immediately

        return () => {
            video.removeEventListener('canplay', fakePause);
            video.removeEventListener('loadedmetadata', fakePause);
            video.removeEventListener('play', handlePlay);
        };
    }, []);

    // --------------------------------------------------------
    // VIDEO SCRUBBING LOGIC (Optimized for Main Thread & iOS Bounce)
    // --------------------------------------------------------
    useEffect(() => {
        let animationFrameId: number;

        // We listen to the smoothed progress to update the video frame
        const unsubscribe = smoothProgress.on("change", (latestProgress) => {
            const video = videoContainerRef.current?.querySelector('video');
            if (video && video.readyState >= 2) { 
                // Ensure it's in our fake "playing at 0.01 speed" state to prevent frame freezing
                video.playbackRate = 0.01;
                if (video.paused) {
                    video.play().catch(() => {});
                }

                // CRITICAL FIX: Clamp progress to prevent iOS bounce scroll (negative values) from breaking the video currentTime
                const clampedProgress = Math.max(0, Math.min(latestProgress, 1));
                
                const END_TRIM_SECONDS = 1.5; 
                const maxDuration = Math.max(0, video.duration - END_TRIM_SECONDS);
                
                const videoProgress = Math.min(clampedProgress / 0.75, 1);
                const targetTime = videoProgress * maxDuration;
                
                cancelAnimationFrame(animationFrameId);
                animationFrameId = requestAnimationFrame(() => {
                    if (video) {
                        video.currentTime = targetTime;
                    }
                });
            }
        });
        
        return () => {
            unsubscribe();
            cancelAnimationFrame(animationFrameId);
        };
    }, [smoothProgress]);

    // --------------------------------------------------------
    // NARRATIVE TIMELINE (Opacity mappings based on scroll)
    // --------------------------------------------------------
    
    // 1. Initial Prompt "Desliza para avanzar"
    const promptOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
    
    // 2. The Saturation Point Text
    const questionOpacity = useTransform(smoothProgress, [0, 0.2, 0.35], [1, 1, 0]);
    const questionY = useTransform(smoothProgress, [0, 0.35], [0, -40]); 
    
    // 3. The Break
    const breakOpacity = useTransform(smoothProgress, [0.4, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
    const breakScale = useTransform(smoothProgress, [0.4, 0.65], [0.95, 1.05]); 
    
    // 4. Final Brand Reveal
    const brandOpacity = useTransform(smoothProgress, [0.65, 0.75, 1], [0, 1, 1]);
    const brandY = useTransform(smoothProgress, [0.65, 0.75], [20, 0]);

    // 5. Fade to White (Transition to the next section)
    const fadeToWhite = useTransform(smoothProgress, [0.8, 0.85], [0, 1]);

    // 6. Act 6: The Approach (New Section 2, mapped to scroll)
    const act6Opacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);

    return (
        <section ref={containerRef} className="relative w-full h-[300svh] bg-black">
            
            {/* The Sticky Viewport */}
            <motion.div 
                className="sticky top-0 w-full h-[100svh] overflow-hidden flex items-center justify-center origin-bottom bg-black"
            >
                
                {/* --- VIDEO LAYER --- */}
                <div className="absolute inset-0 z-0 bg-black" ref={videoContainerRef}>
                    <div dangerouslySetInnerHTML={{ __html: `
                        <video
                            src="/videos/hero-scrub6.mp4"
                            autoplay
                            loop
                            muted
                            playsinline
                            preload="auto"
                            class="object-cover object-center w-full h-full"
                            style="pointer-events: none;"
                        ></video>
                    `}} className="w-full h-full" />
                    {/* Cinematic Dark Overlay for Text Legibility (Constant 50% opacity) */}
                    <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                </div>

                {/* --- NARRATIVE OVERLAYS --- */}

                {/* Initial Instruction */}
                <motion.div style={{ opacity: promptOpacity }} className="absolute bottom-16 inset-x-0 z-10 flex flex-col items-center gap-2 pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 drop-shadow-md">Desliza para avanzar</span>
                    <div className="w-[1px] h-8 bg-neutral-400 animate-pulse" />
                </motion.div>

                {/* Act 3: Question */}
                <motion.div style={{ opacity: questionOpacity, y: questionY }} className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none">
                    <h3 className="text-2xl md:text-4xl font-light text-white tracking-wide text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        ¿En qué ocupaste realmente tu tiempo?
                    </h3>
                </motion.div>

                {/* Act 4: The Break */}
                <motion.div style={{ opacity: breakOpacity, scale: breakScale }} className="absolute inset-0 z-30 flex flex-col items-center justify-start pt-[32vh] md:pt-[25vh] px-4 pointer-events-none">
                    <span className="text-xs md:text-base font-semibold tracking-[0.2em] uppercase text-neutral-300 mb-4 md:mb-6 drop-shadow-md">
                        No falta talento.
                    </span>
                    <h2 className="text-[8vw] sm:text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tighter text-white text-center leading-[1.1] drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)]">
                        FALTA OPERACIÓN.
                    </h2>
                </motion.div>

                {/* Act 5: Brand Reveal */}
                <motion.div style={{ opacity: brandOpacity, y: brandY }} className="absolute inset-0 z-40 flex flex-col items-center justify-start pt-[26vh] md:pt-[22vh] px-4 pointer-events-none w-full">
                    <h1 className="text-[9vw] sm:text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-[0.1em] text-white uppercase leading-none whitespace-nowrap drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)]">
                        MERCENARIO<span className="text-mercenario-danger">.</span>
                    </h1>
                    <div className="w-8 md:w-12 h-[2px] bg-white my-6 md:my-8 drop-shadow-md" />
                    <p className="text-sm md:text-2xl font-medium text-white tracking-wide text-center drop-shadow-md">
                        Concéntrate en tu talento. <br className="md:hidden" />
                        <span className="text-neutral-300 font-light">Nosotros conectamos la operación.</span>
                    </p>
                    
                    <div className="absolute bottom-12 animate-bounce">
                        <ChevronDown className="w-6 h-6 text-neutral-400 drop-shadow-md" />
                    </div>
                </motion.div>

                {/* Fade to White Cover */}
                <motion.div style={{ opacity: fadeToWhite }} className="absolute inset-0 z-50 bg-white pointer-events-none" />

                {/* Act 6: The Approach */}
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
