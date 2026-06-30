import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Caja — Mercenario IOS",
    description: "La caja no muestra cuánto dinero tienes. Muestra cómo se mueve tu empresa.",
};

export default function CajaPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
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

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">
                <section className="space-y-10 mb-24">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Capacidad · Caja</span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        La caja no muestra cuánto dinero tienes. <span className="text-neutral-400 font-semibold">Muestra cómo se mueve tu empresa.</span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Cada venta. Cada pago. Cada devolución. Cada gasto. Cada transferencia. Todo pasa por la caja. Y cada movimiento cuenta una parte de la historia de tu negocio.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">El problema no es registrar movimientos. <span className="text-neutral-400 font-semibold">Es perder el control de ellos.</span></h2>
                    <ul className="space-y-4 pt-4">
                        <li className="flex items-start gap-4"><div className="w-2 h-2 rounded-full bg-neutral-300 mt-2 shrink-0" /><p className="text-sm text-neutral-600">El dinero entra y sale.</p></li>
                        <li className="flex items-start gap-4"><div className="w-2 h-2 rounded-full bg-neutral-300 mt-2 shrink-0" /><p className="text-sm text-neutral-600">Alguien recibe un pago o realiza una compra.</p></li>
                        <li className="flex items-start gap-4"><div className="w-2 h-2 rounded-full bg-neutral-300 mt-2 shrink-0" /><p className="text-sm text-neutral-600">Se paga un proveedor o se devuelve un anticipo.</p></li>
                    </ul>
                    <p className="text-black font-semibold leading-relaxed pt-4">
                        Al final del día aparece la misma pregunta: <strong>¿Cuánto dinero tenemos realmente?</strong>
                    </p>
                    <p className="text-neutral-500 font-light">
                        Cuando la respuesta depende de revisar planillas o calcular manualmente... la empresa ya perdió tiempo.
                    </p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El dinero nunca debería viajar sin información.</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                        <div className="space-y-4">
                            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Un Ingreso</span>
                            <p className="text-sm text-neutral-600 font-light">No es solamente un monto. Es un cliente. Una venta. Una oportunidad. Un compromiso cumplido.</p>
                        </div>
                        <div className="space-y-4">
                            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Un Egreso</span>
                            <p className="text-sm text-neutral-600 font-light">Tampoco es solo un gasto. Es una inversión. Un proveedor. Un recurso. Una decisión.</p>
                        </div>
                    </div>
                    <p className="text-black font-semibold text-lg pt-4">Cuando comprendemos el contexto... comprendemos la empresa.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">El objetivo no es controlar el dinero. <span className="text-neutral-400 font-semibold">Es tomar mejores decisiones.</span></h2>
                    <ul className="space-y-4 pt-4 border-l border-neutral-200 ml-1 pl-6">
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">¿Podemos invertir?</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">¿Es momento de contratar?</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">¿Conviene comprar ahora?</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">¿Qué servicios generan mayor liquidez?</p></li>
                        <li className="relative"><div className="absolute -left-[29px] top-[7px] w-2 h-2 rounded-full bg-black" /><p className="text-sm font-medium text-black">¿Dónde se concentran los gastos?</p></li>
                    </ul>
                    <p className="text-neutral-500 font-light pt-4">Responder esas preguntas requiere información confiable. No intuición.</p>
                </section>

                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-black">La caja forma parte de la operación.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium pt-2">
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-neutral-50/50 space-y-2">
                            <p className="font-bold text-black border-b border-neutral-200 pb-2">Cuando trabaja separada...</p>
                            <p className="text-neutral-500 font-light">Aparecen diferencias. Errores. Retrabajo. Conciliaciones interminables.</p>
                        </div>
                        <div className="p-6 border border-neutral-100 rounded-2xl bg-black text-white space-y-2">
                            <p className="font-bold border-b border-neutral-800 pb-2">Cuando está conectada...</p>
                            <p className="text-neutral-300 font-light">Cada movimiento encuentra automáticamente su lugar.</p>
                        </div>
                    </div>
                </section>

                <section className="py-20 border-t border-neutral-100">
                    <div className="bg-neutral-950 text-white p-12 rounded-3xl space-y-4 text-center">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase block">El Control Real</span>
                        <blockquote className="text-xl md:text-3xl font-bold tracking-tighter leading-snug">
                            "Una empresa ordenada no revisa la caja para descubrir qué ocurrió. La revisa para decidir qué hacer después."
                        </blockquote>
                        <p className="text-sm text-neutral-400 font-light leading-relaxed pt-4 max-w-md mx-auto">
                            Esa diferencia cambia completamente la forma de administrar un negocio.
                        </p>
                    </div>
                </section>

                <div className="mt-16 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">Descubre cómo entender el movimiento de tu empresa en tiempo real.</h4>
                    </div>
                    <Link href="/operacion/administracion" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full">
                        <span>Explorar Administración</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            </main>

            <footer className="w-full py-16 border-t border-neutral-100 text-center text-[10px] text-neutral-400 tracking-wider uppercase bg-white">
                &copy; {new Date().getFullYear()} Mercenario IOS. All rights reserved.
            </footer>
        </div>
    );
}
