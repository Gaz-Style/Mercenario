'use client';

import React, { useRef, useEffect } from 'react';
import { Compass, ArrowDown } from 'lucide-react';

export default function StoreHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force muted and autoplay across all mobile and desktop browsers
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px] bg-neutral-950 overflow-hidden border-b border-neutral-200">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          disablePictureInPicture
          disableRemotePlayback
          preload="auto"
          poster="/videos/mountain-poster.webp"
          className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.88]"
        >
          <source src="/videos/mountain-optimized.webm" type="video/webm" />
          <source src="/videos/mountain-optimized.mp4" type="video/mp4" />
          <source src="/videos/mountain.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Gradient Overlays (Arc'teryx Technical Contrast) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Over Video */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-between py-8 sm:py-12">
        {/* Top Technical Metadata Bar */}
        <div className="flex items-center justify-between text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
          <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Colección Cordillera 2026 // Propiedad Total</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 bg-black/50 backdrop-blur-md px-3 py-1 border border-white/15">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Compass className="w-3 h-3 text-neutral-400" />
              -33.3820° S, -70.5510° W
            </span>
            <span className="text-neutral-500">|</span>
            <span className="text-white font-semibold">VITACURA, SANTIAGO</span>
          </div>
        </div>

        {/* Main Editorial Headline */}
        <div className="space-y-4 max-w-3xl">
          <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase block">
            // EQUIPAMIENTO TÉCNICO DE ALTA MONTAÑA
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-[0.92] drop-shadow-lg">
            DISEÑO QUE <br />
            RESISTE EL TERRENO.
          </h1>

          <p className="text-neutral-200 text-sm sm:text-base font-light max-w-xl leading-relaxed drop-shadow-md">
            Ingeniería textil desarrollada sin atajos para las condiciones más severas. Stock relacional sincronizado en tiempo real y despacho express nacional.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <a
              href="#catalogo"
              className="px-6 py-3.5 bg-white text-black hover:bg-neutral-200 transition-colors font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-2 group"
            >
              <span>Explorar Colección</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Video HUD Specs */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-[10px] font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold tracking-wider uppercase">
              CAM 01 // ANDES EXPEDITION
            </span>
            <span className="hidden sm:inline text-neutral-500">•</span>
            <span className="hidden sm:inline">576×1024 • 24 FPS • CONDICIONES EXTREMAS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
