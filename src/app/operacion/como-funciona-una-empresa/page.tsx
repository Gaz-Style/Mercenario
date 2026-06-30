import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Cómo funciona una empresa? — Mercenario IOS",
    description:
        "Una empresa es una promesa. Y toda promesa necesita una operación capaz de cumplirla. Este es el manifiesto de Mercenario.",
};

const axioms = [
    {
        title: "El recorrido del cliente.",
        body: "Lo que vive la persona que confía en ti. Desde el primer contacto hasta muchos años después.",
    },
    {
        title: "El recorrido de la operación.",
        body: "Todo lo que ocurre para hacer posible esa experiencia. Lo que el cliente nunca ve, pero siempre siente.",
    },
];

const clientJourney = [
    "Alguien encuentra tu empresa por primera vez.",
    "Tiene una pregunta. Todavía no es cliente.",
    "Llama, escribe, agenda, solicita o compra.",
    "Comienza una relación.",
    "Vive la experiencia.",
    "Recuerda cómo se sintió.",
    "Decide si vuelve y si recomienda.",
];

const operationJourney = [
    "Alguien agenda.",
    "Otra persona prepara la atención.",
    "Se registra información.",
    "Se procesa un pago.",
    "Se emite un documento.",
    "Se actualizan reportes.",
    "Se planifica el día siguiente.",
];

export default function ComoFuncionaUnaEmpresaPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased flex flex-col items-center selection:bg-black selection:text-white">
            {/* Header */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-100 bg-[#FCFCFC]/80 backdrop-blur-md">
                <div className="max-w-4xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link
                        href="/"
                        className="flex items-center gap-2 group text-[11px] font-semibold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver al Inicio</span>
                    </Link>
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-black uppercase">
                        MERCENARIO <span className="text-neutral-200">|</span>{" "}
                        <span className="text-neutral-500 font-medium">IOS</span>
                    </span>
                </div>
            </header>

            <main className="w-full max-w-3xl mx-auto px-6 pt-40 pb-32 flex flex-col">

                {/* ── HERO ─────────────────────────────────────────── */}
                <section className="space-y-10 mb-28">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Manifiesto · Página 24
                    </span>
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter text-black leading-[1.02]">
                        Una empresa no comienza cuando vende.{" "}
                        <span className="text-neutral-400 font-semibold">
                            Comienza cuando alguien decide confiar en ella.
                        </span>
                    </h1>
                    <p className="text-neutral-500 text-lg font-light leading-relaxed max-w-2xl">
                        Todo negocio, sin importar su tamaño, vive el mismo recorrido. Una persona necesita algo. Y busca a alguien que pueda ayudarla. Ese es el verdadero comienzo. No la venta. La confianza.
                    </p>
                </section>

                {/* ── ACT I: La oportunidad ────────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Acto I
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                        Todo parte con una oportunidad.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Alguien encuentra tu empresa. Puede llegar por una recomendación, por Google, por redes sociales, por una caminata, por un aviso, por casualidad. Todavía no es cliente. Solo tiene una pregunta.
                    </p>
                    <p className="text-black font-semibold leading-relaxed">
                        Si encuentra una respuesta... da el siguiente paso.
                    </p>

                    {/* Client journey vertical timeline */}
                    <div className="relative border-l border-neutral-200 ml-2 space-y-5 py-2 mt-8">
                        {clientJourney.map((step, idx) => (
                            <div key={idx} className="relative pl-8 group">
                                <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full group-hover:bg-black transition-colors duration-500" />
                                <p className="text-sm font-medium text-neutral-600 leading-relaxed group-hover:text-black transition-colors">
                                    {step}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── ACT II: La responsabilidad ───────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Acto II
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                        A partir de aquí, la empresa tiene una responsabilidad.
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {["Responder.", "Confirmar.", "Guiar.", "Dar tranquilidad.", "Cumplir lo prometido.", "Cuidar la relación."].map(
                            (item, i) => (
                                <div
                                    key={i}
                                    className="p-5 border border-neutral-100 rounded-2xl bg-neutral-50/60 text-sm font-semibold text-black"
                                >
                                    {item}
                                </div>
                            )
                        )}
                    </div>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        Cada interacción fortalece o debilita la confianza. El cliente no recuerda qué sistema utilizaste. No recuerda cómo organizaste la agenda. No recuerda qué software emitió la boleta.{" "}
                        <strong className="text-black">Recuerda cómo se sintió.</strong>
                    </p>
                </section>

                {/* ── ACT III: La doble historia ───────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-10">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Acto III
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                        Mientras el cliente vive esa historia... la empresa vive otra completamente distinta.
                    </h2>

                    {/* Dual journey */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {/* Client side */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                                Lo que ve el cliente
                            </span>
                            <div className="relative border-l border-neutral-200 ml-2 space-y-5 py-2">
                                {clientJourney.slice(0, 5).map((step, idx) => (
                                    <div key={idx} className="relative pl-8">
                                        <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-neutral-200 rounded-full" />
                                        <p className="text-xs font-medium text-neutral-500 leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Operation side */}
                        <div className="space-y-4">
                            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                                Lo que ocurre por dentro
                            </span>
                            <div className="relative border-l border-neutral-200 ml-2 space-y-5 py-2">
                                {operationJourney.map((step, idx) => (
                                    <div key={idx} className="relative pl-8">
                                        <div className="absolute -left-[4.5px] top-1.5 w-2 h-2 bg-black rounded-full" />
                                        <p className="text-xs font-medium text-neutral-700 leading-relaxed">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-neutral-950 text-white p-10 rounded-3xl space-y-4 mt-12">
                        <p className="text-sm font-light text-neutral-400 leading-relaxed">
                            Esa historia no la ve el cliente.
                        </p>
                        <p className="text-xl md:text-2xl font-bold leading-snug tracking-tight">
                            Pero determina completamente la experiencia que recibe.
                        </p>
                        <p className="text-sm font-light text-neutral-400 leading-relaxed pt-2">
                            Cuando la operación está desordenada, los errores llegan al cliente. Cuando la operación funciona, el cliente solo siente tranquilidad.
                        </p>
                    </div>
                </section>

                {/* ── ACT IV: Los dos recorridos ───────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Acto IV
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                        Por eso una empresa tiene dos recorridos.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {axioms.map((ax, i) => (
                            <div
                                key={i}
                                className="p-8 border border-neutral-100 rounded-2xl bg-neutral-50/50 space-y-3"
                            >
                                <h3 className="text-base font-bold text-black border-b border-neutral-200 pb-3">
                                    {ax.title}
                                </h3>
                                <p className="text-sm font-light text-neutral-500 leading-relaxed">{ax.body}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-black font-semibold text-lg leading-relaxed pt-4">
                        Cuando ambos recorridos trabajan juntos... aparece algo extraordinario. Una empresa que parece simple, aunque por dentro sea increíblemente compleja.
                    </p>
                </section>

                {/* ── Origen de Mercenario ─────────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-8">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        El origen
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-black leading-tight">
                        Las mejores empresas del mundo entendieron esto hace mucho tiempo.
                    </h2>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        No venden únicamente productos. Diseñan experiencias. Y detrás de cada experiencia existe una operación cuidadosamente organizada. Durante mucho tiempo, parecía que esa forma de trabajar estaba reservada para grandes organizaciones. Hoy ya no.
                    </p>
                    <p className="text-neutral-500 font-light leading-relaxed">
                        La tecnología permite que una pequeña empresa pueda coordinar su operación con el mismo nivel de organización. No para parecer una gran empresa, sino para entregar una mejor experiencia.
                    </p>
                </section>

                {/* ── Manifiesto Final ─────────────────────────────── */}
                <section className="py-20 border-t border-neutral-100 space-y-6">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                        Esa es la idea que dio origen a Mercenario.
                    </span>
                    <p className="text-neutral-600 font-light leading-relaxed text-lg">
                        No construir otro software. Sino ayudar a que pequeñas empresas diseñen una operación capaz de cuidar a sus clientes desde el primer contacto hasta muchos años después.
                    </p>

                    {/* The core sentence */}
                    <div className="my-12 py-14 px-10 border border-neutral-950/10 rounded-3xl bg-neutral-950 text-white text-center space-y-4">
                        <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-500 uppercase">
                            El manifiesto de Mercenario
                        </span>
                        <blockquote className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight">
                            "Una empresa es una promesa.
                            <br />
                            <span className="text-neutral-400 font-semibold">
                                Y toda promesa necesita una operación capaz de cumplirla."
                            </span>
                        </blockquote>
                    </div>
                </section>

                {/* ── CTA ──────────────────────────────────────────── */}
                <div className="mt-8 pt-12 border-t border-neutral-100 flex flex-col items-center gap-6 text-center">
                    <div className="space-y-2 max-w-xl">
                        <h4 className="text-xl font-bold text-black">
                            Ahora que conoces cómo funciona realmente una empresa...
                        </h4>
                        <p className="text-neutral-500 text-sm">
                            Descubre cómo construir una operación capaz de sostener esa experiencia.
                        </p>
                    </div>
                    <Link
                        href="/#contacto"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold text-[11px] uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full"
                    >
                        <span>Explorar Mercenario</span>
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
