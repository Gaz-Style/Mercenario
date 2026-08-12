"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Briefcase, ChevronRight } from "lucide-react";

export default function GazStylePage() {
  return (
    <>
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
          
          .gaz-style-body {
            font-family: 'Plus Jakarta Sans', sans-serif;
            background: radial-gradient(circle at 50% -20%, #1e1b4b 0%, #090514 60%, #020005 100%);
            color: #f8fafc;
          }

          .font-title {
            font-family: 'Outfit', sans-serif;
          }
          
          .glass-card-hover {
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .glass-card-hover:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(245, 158, 11, 0.3);
            transform: translateY(-4px);
            box-shadow: 0 20px 40px -15px rgba(245, 158, 11, 0.1);
          }
        `
      }} />

      <div className="gaz-style-body min-h-screen p-6 flex flex-col justify-center items-center relative overflow-hidden">
        {/* Decorative Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="w-full max-w-4xl z-10 flex flex-col items-center">
          {/* Back Home Button */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white uppercase transition-colors mb-12 self-start"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Inicio</span>
          </Link>

          {/* Header Title */}
          <div className="text-center mb-16">
            <span className="bg-amber-500/10 text-amber-400 font-extrabold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-4 inline-block border border-amber-500/20">
              Gaz_Style Hub
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight font-title mt-2">
              CONECTANDO LA MONTAÑA <br />Y LOS NEGOCIOS
            </h1>
            <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto mt-4 font-light">
              Explora las dos vertientes fundamentales del proyecto Gaz_Style. Descubre la estrategia detrás de la operación y vive la experiencia real en la cordillera.
            </p>
          </div>

          {/* Link Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
            {/* Card 1: Modelo de Negocio */}
            <Link href="/modelo-negocio" className="block group">
              <div className="glass-card-hover p-8 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors"></div>
                <div>
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center mb-6 border border-amber-500/20">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-title group-hover:text-amber-400 transition-colors">
                    Modelo de Negocio
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light mb-8">
                    Análisis estructurado en Canvas de 9 bloques. Conoce la estrategia B2C de validación ágil, costos fijos digitales, la propuesta de valor y las tutorías del programa Emerge.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-400 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Ver Canvas</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Card 2: Experiencia Montaña */}
            <Link href="/experiencia-montana" className="block group">
              <div className="glass-card-hover p-8 rounded-3xl h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-colors"></div>
                <div>
                  <div className="w-12 h-12 bg-violet-500/10 text-violet-400 rounded-2xl flex items-center justify-center mb-6 border border-violet-500/20">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-title group-hover:text-violet-400 transition-colors">
                    Experiencia Montaña
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light mb-8">
                    Vive la desconexión urbana en Lo Barnechea. Rutas de trekking diseñadas para la recarga mental, la cohesión de grupo y la integración con la gastronomía de montaña local.
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-violet-400 uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                  <span>Explorar Experiencia</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

          {/* Footer inside the Hub */}
          <p className="text-[10px] text-slate-600 tracking-widest uppercase font-semibold mt-20">
            © {new Date().getFullYear()} GAZ_STYLE & MERCENARIO OS.
          </p>
        </div>
      </div>
    </>
  );
}
