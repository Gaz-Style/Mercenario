"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

export default function HeroV2() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 300,
        damping: 40,
        restDelta: 0.001
    });

    // VIDEO INITIALIZATION (Fake Pause for iOS Safari)
    useEffect(() => {
        const video = videoContainerRef.current?.querySelector('video');
        if (!video) return;

        const fakePause = () => {
            video.playbackRate = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        };

        const handlePause = () => {
            video.playbackRate = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        };

        video.addEventListener('canplay', fakePause);
        video.addEventListener('loadedmetadata', fakePause);
        video.addEventListener('pause', handlePause);
        
        const handlePlay = () => { video.playbackRate = 0; };
        video.addEventListener('play', handlePlay); 
        
        fakePause();

        return () => {
            video.removeEventListener('canplay', fakePause);
            video.removeEventListener('loadedmetadata', fakePause);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('play', handlePlay);
        };
    }, []);

    // VIDEO SCRUBBING LOGIC
    useEffect(() => {
        let animationFrameId: number;

        const unsubscribe = smoothProgress.on("change", (latestProgress) => {
            const video = videoContainerRef.current?.querySelector('video');
            if (video && video.readyState >= 2) { 
                video.playbackRate = 0;
                if (video.paused) {
                    video.play().catch(() => {});
                }

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

    // NARRATIVE TIMELINE
    const promptOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
    const questionOpacity = useTransform(smoothProgress, [0, 0.2, 0.35], [1, 1, 0]);
    const questionY = useTransform(smoothProgress, [0, 0.35], [0, -40]); 
    const breakOpacity = useTransform(smoothProgress, [0.4, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
    const breakScale = useTransform(smoothProgress, [0.4, 0.65], [0.95, 1.05]); 
    const brandOpacity = useTransform(smoothProgress, [0.65, 0.75, 1], [0, 1, 1]);
    const brandY = useTransform(smoothProgress, [0.65, 0.75], [20, 0]);
    const fadeToWhite = useTransform(smoothProgress, [0.8, 0.85], [0, 1]);
    const act6Opacity = useTransform(smoothProgress, [0.85, 0.95], [0, 1]);

    return (
        <>
            {/* ── MOBILE HERO (< 768px): Blanco, limpio, directo ── */}
            <div className="md:hidden w-full bg-white text-black flex flex-col border-b border-neutral-100">
                {/* Video de fondo tenue */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                    <video
                        src="/videos/hero-scrub6.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 pointer-events-none" />
                    
                    {/* Titular sobre el video */}
                    <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 space-y-3">
                        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-300 font-bold">
                            MERCENARIO // SISTEMAS OPERATIVOS
                        </span>
                        <h1 className="text-3xl font-black tracking-tight text-white leading-[1.1]">
                            Concéntrate en tu talento.<br />
                            <span className="text-neutral-300 font-light">Nosotros conectamos la operación.</span>
                        </h1>
                    </div>
                </div>

                {/* Propuesta y CTAs */}
                <div className="px-5 py-8 space-y-6">
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">
                        Un software de gestión (ERP/CRM) disfrazado de sitio web de alta conversión, conectado a tu WhatsApp oficial 24/7 y pasarelas de pago. Entregado y operando en 14 días.
                    </p>

                    <div className="flex flex-col gap-3">
                        <a
                            href="#sandbox"
                            className="w-full py-4 px-5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors"
                        >
                            <span>Web Demo</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="#arquitectura"
                            className="w-full py-4 px-5 border border-neutral-200 text-black text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:border-black transition-colors"
                        >
                            <span>Ver Arquitectura del Sistema</span>
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Datos clave */}
                    <div className="grid grid-cols-3 gap-3 pt-2 border-t border-neutral-100">
                        <div className="text-center space-y-1">
                            <span className="text-sm font-mono font-black text-black block">14 días</span>
                            <span className="text-[10px] text-neutral-400 font-mono uppercase">entrega</span>
                        </div>
                        <div className="text-center space-y-1 border-x border-neutral-100">
                            <span className="text-sm font-mono font-black text-black block">24/7</span>
                            <span className="text-[10px] text-neutral-400 font-mono uppercase">operativo</span>
                        </div>
                        <div className="text-center space-y-1">
                            <span className="text-sm font-mono font-black text-black block">0.8s</span>
                            <span className="text-[10px] text-neutral-400 font-mono uppercase">carga web</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── DESKTOP HERO (≥ 768px): Video Scrubbing Narrativo ── */}
            <section ref={containerRef} className="hidden md:block relative w-full h-[300dvh] bg-black">
                
                <motion.div 
                    className="sticky top-0 w-full h-[100dvh] overflow-hidden flex items-center justify-center origin-bottom bg-black"
                >
                    {/* VIDEO LAYER */}
                    <div className="absolute inset-0 z-0 bg-black" ref={videoContainerRef}>
                        <div dangerouslySetInnerHTML={{ __html: `
                            <video
                                src="/videos/hero-scrub6.mp4"
                                autoplay
                                loop
                                muted
                                playsinline
                                webkit-playsinline
                                disablepictureinpicture
                                disableremoteplayback
                                preload="auto"
                                class="object-cover object-center w-full h-full"
                                style="pointer-events: none; -webkit-media-controls-overlay-enclosure: none;"
                            ></video>
                        `}} className="w-full h-full" />
                        <div className="absolute inset-0 bg-black/50 pointer-events-none" />
                    </div>

                    {/* Initial Instruction */}
                    <motion.div style={{ opacity: promptOpacity }} className="absolute bottom-16 inset-x-0 z-10 flex flex-col items-center gap-2 pointer-events-none">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-300 drop-shadow-md">Desliza para avanzar</span>
                        <div className="w-[1px] h-8 bg-neutral-400 animate-pulse" />
                    </motion.div>

                    {/* Act: Question */}
                    <motion.div style={{ opacity: questionOpacity, y: questionY }} className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none">
                        <h3 className="text-2xl md:text-4xl font-light text-white tracking-wide text-center drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                            ¿En qué ocupaste realmente tu tiempo?
                        </h3>
                    </motion.div>

                    {/* Act: The Break */}
                    <motion.div style={{ opacity: breakOpacity, scale: breakScale }} className="absolute inset-0 z-30 flex flex-col items-center justify-start pt-[25vh] px-4 pointer-events-none">
                        <span className="text-xs md:text-base font-semibold tracking-[0.2em] uppercase text-neutral-300 mb-4 md:mb-6 drop-shadow-md">
                            No falta talento.
                        </span>
                        <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold tracking-tighter text-white text-center leading-[1.1] drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)]">
                            FALTA OPERACIÓN.
                        </h2>
                    </motion.div>

                    {/* Act: Brand Reveal */}
                    <motion.div style={{ opacity: brandOpacity, y: brandY }} className="absolute inset-0 z-40 flex flex-col items-center justify-start pt-[22vh] px-4 pointer-events-none w-full">
                        <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-[0.1em] text-white uppercase leading-none whitespace-normal md:whitespace-nowrap drop-shadow-[0_6px_20px_rgba(0,0,0,0.8)]">
                            MERCENARIO<span className="text-mercenario-danger">.</span>
                        </h1>
                        <div className="w-8 md:w-12 h-[2px] bg-white my-6 md:my-8 drop-shadow-md" />
                        <p className="text-sm md:text-2xl font-medium text-white tracking-wide text-center drop-shadow-md">
                            Concéntrate en tu talento.{" "}
                            <span className="text-neutral-300 font-light">Nosotros conectamos la operación.</span>
                        </p>
                        
                        <div className="absolute bottom-12 animate-bounce">
                            <ChevronDown className="w-6 h-6 text-neutral-400 drop-shadow-md" />
                        </div>
                    </motion.div>

                    {/* Fade to White */}
                    <motion.div style={{ opacity: fadeToWhite }} className="absolute inset-0 z-50 bg-white pointer-events-none" />

                    {/* Act: The Approach */}
                    <motion.div style={{ opacity: act6Opacity }} className="absolute inset-0 z-50 flex flex-col items-start justify-center bg-white pointer-events-none overflow-y-auto">
                        <div className="w-full max-w-5xl mx-auto px-6 md:px-8 py-8 space-y-6 md:space-y-8 text-left pointer-events-auto">
                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">El Enfoque</span>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight">
                                No necesitas más herramientas. <br />
                                <span className="text-neutral-400 font-semibold">Necesitas que trabajen juntas.</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-neutral-500 font-light text-sm md:text-base leading-relaxed text-left">
                                <div className="space-y-3">
                                    <p>Hoy probablemente tu empresa ya utiliza varias soluciones.</p>
                                    <p>Una para agendar. Otra para cobrar. Planillas de Excel. WhatsApp personal.</p>
                                </div>
                                <div className="space-y-3">
                                    <p>El problema nunca fueron las herramientas.</p>
                                    <p className="font-semibold text-black">El problema es que ninguna trabaja con las demás. Cuando comienzan a comunicarse, la operación cambia por completo.</p>
                                </div>
                            </div>

                            <div className="pt-2 flex flex-wrap items-center gap-4">
                                <a 
                                    href="#sandbox" 
                                    className="inline-flex items-center gap-2.5 px-7 py-4 bg-black text-white text-[11px] font-semibold uppercase tracking-widest rounded-full hover:bg-neutral-800 transition-all shadow-sm group"
                                >
                                    <span>Web Demo</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a 
                                    href="#arquitectura" 
                                    className="inline-flex items-center gap-2 px-6 py-4 border border-neutral-200 text-black text-[11px] font-semibold uppercase tracking-widest rounded-full hover:border-black hover:bg-neutral-50 transition-all"
                                >
                                    <span>Ver Arquitectura del Sistema</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>

                            <div className="pt-1 flex flex-wrap items-center gap-4 md:gap-6 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                                <span>Implementación en 14 días</span>
                                <span>·</span>
                                <span>Meta WhatsApp Cloud API Oficial</span>
                                <span>·</span>
                                <span>Webpay Plus &amp; SII</span>
                            </div>
                        </div>
                    </motion.div>

                </motion.div>
            </section>
        </>
    );
}
