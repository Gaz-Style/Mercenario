import { sitemapData } from "@/data/sitemapData";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight } from "lucide-react";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CentroConocimientoPage({ params }: PageProps) {
    const { id } = await params;
    const data = sitemapData[id];

    if (!data || data.category !== "Centro de Conocimiento") {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            
            {/* Header */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span> <span className="text-neutral-500 font-medium">IOS</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col justify-start">
                
                {/* Category & Title */}
                <div className="space-y-4 mb-20">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">{data.category}</span>
                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-black">{data.title}</h1>
                </div>

                {/* Editorial Flow: Problem -> Context -> Operation -> Connections -> Impact */}
                <div className="space-y-16">
                    
                    <div className="border-t border-neutral-100 pt-8 space-y-3">
                        <h2 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">01 / El Problema</h2>
                        <p className="text-xl md:text-2xl font-semibold tracking-tight text-black leading-snug">{data.problem}</p>
                    </div>

                    <div className="border-t border-neutral-100 pt-8 space-y-3">
                        <h2 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">02 / El Contexto</h2>
                        <p className="text-base text-neutral-500 font-light leading-relaxed">{data.context}</p>
                    </div>

                    <div className="border-t border-neutral-100 pt-8 space-y-3">
                        <h2 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">03 / La Operación</h2>
                        <p className="text-lg font-bold text-black tracking-tight leading-snug">{data.operation}</p>
                    </div>

                    <div className="border-t border-neutral-100 pt-8 space-y-3">
                        <h2 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">04 / Conexiones</h2>
                        <p className="text-base text-neutral-500 font-light leading-relaxed">{data.connections}</p>
                    </div>

                    <div className="border-t border-neutral-100 pt-8 space-y-3">
                        <h2 className="text-[10px] font-mono tracking-widest text-mercenario-danger uppercase">05 / Impacto de Negocio</h2>
                        <p className="text-xl font-bold text-black tracking-tight leading-snug">{data.impact}</p>
                    </div>

                </div>

                <div className="mt-24 pt-12 border-t border-neutral-100 flex justify-center">
                    <Link href="/#contacto" className="inline-flex items-center gap-2 px-8 py-4.5 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Iniciar Diagnóstico de esta Capacidad</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">&copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.</footer>

        </div>
    );
}
