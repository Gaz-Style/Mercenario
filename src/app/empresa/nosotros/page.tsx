import Link from "next/link";
import { 
    ArrowLeft, 
    ArrowRight, 
    CheckCircle2, 
    XCircle, 
    Zap, 
    ShieldCheck, 
    Layers, 
    Cpu, 
    Clock, 
    TrendingUp,
    MessageCircle,
    FileSpreadsheet,
    Building2,
    Users
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "¿Qué es Mercenario? | Presentación, Filosofía y Modelo Operativo",
    description: "Descubre qué es Mercenario, para quién fue diseñado, cómo funciona nuestro sistema operativo empresarial y por qué no somos un software tradicional.",
};

const WHATSAPP_NUM = "56984669028";

export default function QueEsMercenarioPage() {
    return (
        <div className="min-h-screen bg-[#FCFCFC] text-black font-sans antialiased selection:bg-black selection:text-white">
            
            {/* ─── HEADER MINIMALISTA DE ALTO CONTRASTE ─── */}
            <header className="fixed top-0 inset-x-0 w-full z-[100] border-b border-neutral-200/80 bg-[#FCFCFC]/90 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link 
                        href="/" 
                        className="flex items-center gap-2 group text-[11px] font-bold tracking-wider text-neutral-500 hover:text-black uppercase transition-colors"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        <span>Volver a la Portada</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-black rounded-full" />
                        <span className="text-[11px] font-black tracking-[0.25em] text-black uppercase">
                            MERCENARIO <span className="text-neutral-300 font-light">|</span> <span className="text-neutral-500 font-semibold">SISTEMA OPERATIVO</span>
                        </span>
                    </div>
                </div>
            </header>

            {/* ─── CONTENIDO PRINCIPAL DOCUMENTAL ─── */}
            <main className="w-full max-w-4xl mx-auto px-6 pt-36 pb-28 space-y-28">
                
                {/* ─── HERO // EL MANIFIESTO ─── */}
                <section className="space-y-6 pt-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-[10px] font-mono tracking-widest text-neutral-600 uppercase">
                        <span>Documento Operativo // Manifiesto</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-black leading-[1.05]">
                        No vendemos un software.<br />
                        <span className="text-neutral-400 font-bold">Diseñamos y operamos cómo trabaja tu empresa.</span>
                    </h1>

                    <p className="text-neutral-600 text-lg sm:text-xl font-normal leading-relaxed max-w-3xl pt-2">
                        En el mercado abundan las herramientas que prometen solucionarlo todo: ERPs genéricos, CRMs complejos y aplicaciones sueltas que terminan abandonadas. 
                        <strong> Mercenario nació para romper esa trampa.</strong>
                    </p>

                    <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm text-neutral-800 text-base leading-relaxed">
                        <p className="font-semibold text-black mb-1">Nuestra regla fundacional:</p>
                        <p className="text-neutral-600 font-normal">
                            La tecnología nunca debe ser el protagonista; tu operación siempre lo es. El cliente no necesita aprender a configurar software; necesita que sus ventas se atiendan, sus cobros se concilien y su negocio funcione con orden absoluto.
                        </p>
                    </div>
                </section>

                {/* ─── CAPÍTULO 1: ¿QUÉ ES Y QUÉ NO ES MERCENARIO? ─── */}
                <section className="pt-16 border-t border-neutral-200 space-y-10">
                    <div className="space-y-2">
                        <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 01</span>
                        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-black">
                            ¿Qué es Mercenario? (Y qué NO es)
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Lo que NO es */}
                        <div className="p-7 rounded-2xl bg-neutral-100/60 border border-neutral-200/80 space-y-5">
                            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                                <XCircle className="w-4 h-4" />
                                <span>Mercenario NO es:</span>
                            </div>
                            <ul className="space-y-3.5 text-sm text-neutral-600 leading-snug">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-neutral-400 mt-0.5">•</span>
                                    <span><strong>Un software empaquetado o SaaS genérico</strong> que te entrega un usuario, una contraseña y te deja solo aprendiendo a usarlo.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-neutral-400 mt-0.5">•</span>
                                    <span><strong>Una consultoría teórica</strong> que cobra por entregarte un informe en PDF o presentaciones de diapositivas.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-neutral-400 mt-0.5">•</span>
                                    <span><strong>Una colección de apps desconectadas</strong> que obligan a tu equipo a pasar datos a mano de un lugar a otro.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Lo que SÍ es */}
                        <div className="p-7 rounded-2xl bg-black text-white space-y-5 shadow-xl">
                            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                                <CheckCircle2 className="w-4 h-4" />
                                <span>Mercenario SÍ es:</span>
                            </div>
                            <ul className="space-y-3.5 text-sm text-neutral-300 leading-snug">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-emerald-400 mt-0.5">•</span>
                                    <span><strong>Un ejecutor táctico de infraestructura operativa:</strong> Entramos a tu negocio, integramos tus canales y dejamos la maquinaria corriendo.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-emerald-400 mt-0.5">•</span>
                                    <span><strong>Unificación total en un solo sistema:</strong> WhatsApp con IA para vender y agendar, cobros con Transbank/Mercado Pago, boletas del SII e inventario.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-emerald-400 mt-0.5">•</span>
                                    <span><strong>Soporte y evolución constante:</strong> Cuando tu empresa crece o suma nuevos servicios, tu sistema evoluciona a la par sin fricción.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ─── CAPÍTULO 2: ¿PARA QUIÉN ES? ─── */}
                <section className="pt-16 border-t border-neutral-200 space-y-10">
                    <div className="space-y-2">
                        <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 02</span>
                        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-black">
                            ¿Para quién fue diseñado?
                        </h2>
                        <p className="text-neutral-500 text-base">
                            Mercenario fue creado con un perfil de empresa muy específico en mente.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Es para ti si */}
                        <div className="p-7 bg-white border border-neutral-200 rounded-2xl space-y-4">
                            <h3 className="font-bold text-black text-base flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-black" />
                                <span>Es perfecto para tu empresa si:</span>
                            </h3>
                            <ul className="space-y-3 text-sm text-neutral-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-black font-bold">1.</span>
                                    <span><strong>Tienes ventas y clientes activos</strong>, pero sientes que la operación diaria es un cuello de botella caótico.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-black font-bold">2.</span>
                                    <span><strong>Pierdes cotizaciones por demoras:</strong> Los prospectos te escriben al WhatsApp o redes y quedan esperando horas una respuesta.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-black font-bold">3.</span>
                                    <span><strong>El dueño o los socios están atrapados en tareas manuales:</strong> Cuadrar transferencias bancarias, emitir boletas en el portal del SII o perseguir confirmaciones.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-black font-bold">4.</span>
                                    <span><strong>Rubros idóneos:</strong> Clínicas y salud, centros de estética, retail, talleres, tiendas de especialidad, distribución y empresas de servicios profesionales.</span>
                                </li>
                            </ul>
                        </div>

                        {/* NO es para ti si */}
                        <div className="p-7 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-4">
                            <h3 className="font-bold text-neutral-700 text-base flex items-center gap-2">
                                <XCircle className="w-5 h-5 text-neutral-400" />
                                <span>NO es para tu empresa si:</span>
                            </h3>
                            <ul className="space-y-3 text-sm text-neutral-500">
                                <li className="flex items-start gap-2">
                                    <span className="text-neutral-400 font-bold">1.</span>
                                    <span>Solo buscas una plantilla web de bajo costo sin modelo de negocio ni clientes reales.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-neutral-400 font-bold">2.</span>
                                    <span>Prefieres comprar un software enlatado tradicional y dedicar tus fines de semana a ver tutoriales técnicos para configurarlo.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-neutral-400 font-bold">3.</span>
                                    <span>Tu empresa no está dispuesta a ordenar y estandarizar sus procesos comerciales y de atención.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ─── CAPÍTULO 3: ¿CÓMO FUNCIONA? ─── */}
                <section className="pt-16 border-t border-neutral-200 space-y-10">
                    <div className="space-y-2">
                        <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 03</span>
                        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-black">
                            ¿Cómo funciona la implementación?
                        </h2>
                        <p className="text-neutral-500 text-base">
                            Un método probado de tres etapas para pasar del desorden al control en cuestión de días.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-7 bg-white border border-neutral-200 rounded-2xl space-y-4 relative">
                            <div className="w-8 h-8 rounded-full bg-black text-white font-mono text-xs font-bold flex items-center justify-center">
                                01
                            </div>
                            <h3 className="text-lg font-bold text-black">Diagnóstico Operativo</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                No te preguntamos qué software te gusta; preguntamos <em>cómo funciona tu negocio hoy</em>: ¿Quién agenda? ¿Quién cobra? ¿Dónde se caen las ventas? ¿Dónde se pierde tiempo?
                            </p>
                        </div>

                        <div className="p-7 bg-white border border-neutral-200 rounded-2xl space-y-4 relative">
                            <div className="w-8 h-8 rounded-full bg-black text-white font-mono text-xs font-bold flex items-center justify-center">
                                02
                            </div>
                            <h3 className="text-lg font-bold text-black">Conexión e Infraestructura</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                Desplegamos tu entorno dedicado: base de datos privada, pasarela Webpay/Mercado Pago, facturación electrónica automática del SII y agente de IA en WhatsApp entrenado con tu catálogo y reglas.
                            </p>
                        </div>

                        <div className="p-7 bg-white border border-neutral-200 rounded-2xl space-y-4 relative">
                            <div className="w-8 h-8 rounded-full bg-black text-white font-mono text-xs font-bold flex items-center justify-center">
                                03
                            </div>
                            <h3 className="text-lg font-bold text-black">Operación en Piloto Firme</h3>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                Tu negocio empieza a recibir pedidos, cobrar con tarjeta y emitir boletas sin intervención manual. Nuestro equipo y telemetría monitorean que cada engranaje funcione las 24 horas.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ─── CAPÍTULO 4: EL ANTES VS EL DESPUÉS ─── */}
                <section className="pt-16 border-t border-neutral-200 space-y-10">
                    <div className="space-y-2">
                        <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 04</span>
                        <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-black">
                            La diferencia en el día a día
                        </h2>
                    </div>

                    <div className="overflow-x-auto border border-neutral-200 rounded-2xl bg-white shadow-sm">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-neutral-200 bg-neutral-50 text-neutral-400 font-mono text-xs uppercase">
                                    <th className="p-4 sm:p-5">Área de tu Negocio</th>
                                    <th className="p-4 sm:p-5 text-rose-700">Sin Mercenario (Operación Tradicional)</th>
                                    <th className="p-4 sm:p-5 text-black font-bold">Con Mercenario OS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 text-neutral-700">
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-black flex items-center gap-2">
                                        <MessageCircle className="w-4 h-4 text-neutral-400" />
                                        <span>Atención en WhatsApp</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-neutral-500">
                                        Mensajes sin responder en la noche o fines de semana; clientes que compran en la competencia por demora.
                                    </td>
                                    <td className="p-4 sm:p-5 text-black font-semibold bg-emerald-50/30">
                                        Agente de IA responde en 3 segundos, entrega precios, muestra opciones y cierra citas o ventas 24/7.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-black flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-neutral-400" />
                                        <span>Cobros y Pagos</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-neutral-500">
                                        Pedir comprobante por foto, revisar la app del banco a mano y arriesgar fraudes con comprobantes falsos.
                                    </td>
                                    <td className="p-4 sm:p-5 text-black font-semibold bg-emerald-50/30">
                                        Link de pago Webpay/Mercado Pago verificado al instante por webhook. La orden se confirma sola.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-black flex items-center gap-2">
                                        <Building2 className="w-4 h-4 text-neutral-400" />
                                        <span>Facturación y SII</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-neutral-500">
                                        Entrar al portal del SII a fin de mes, digitar boletas una por una y cuadrar diferencias con el contador.
                                    </td>
                                    <td className="p-4 sm:p-5 text-black font-semibold bg-emerald-50/30">
                                        Boleta o factura electrónica emitida de forma automática apenas ingresa el pago, sin digitar nada.
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 sm:p-5 font-bold text-black flex items-center gap-2">
                                        <Users className="w-4 h-4 text-neutral-400" />
                                        <span>Rol del Dueño</span>
                                    </td>
                                    <td className="p-4 sm:p-5 text-neutral-500">
                                        Bombero apagando incendios operativos, persiguiendo datos y respondiendo mensajes hasta la medianoche.
                                    </td>
                                    <td className="p-4 sm:p-5 text-black font-semibold bg-emerald-50/30">
                                        Líder con visibilidad en tiempo real, enfocado en estrategia, crecimiento y calidad de vida.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* ─── CAPÍTULO 5: ¿POR QUÉ EL NOMBRE "MERCENARIO"? ─── */}
                <section className="pt-16 border-t border-neutral-200 space-y-6">
                    <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">Capítulo 05</span>
                    <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-black">
                        ¿Por qué nos llamamos Mercenario?
                    </h2>
                    
                    <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
                        En el mundo de los negocios, abundan los teóricos y los proveedores que se desentienden de los resultados.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div className="p-6 border border-neutral-200 rounded-xl bg-white space-y-2">
                            <p className="text-xs font-mono uppercase text-neutral-400 font-bold">El Consultor</p>
                            <p className="text-black font-semibold text-sm">Te dice qué deberías hacer.</p>
                            <p className="text-neutral-500 text-xs leading-relaxed">Te entrega un informe de diagnóstico y se retira.</p>
                        </div>
                        <div className="p-6 border border-neutral-200 rounded-xl bg-white space-y-2">
                            <p className="text-xs font-mono uppercase text-neutral-400 font-bold">El Software Tradicional</p>
                            <p className="text-black font-semibold text-sm">Te cobra por un acceso.</p>
                            <p className="text-neutral-500 text-xs leading-relaxed">Te deja solo tratando de entender cómo configurarlo.</p>
                        </div>
                        <div className="p-6 border border-neutral-900 rounded-xl bg-black text-white space-y-2">
                            <p className="text-xs font-mono uppercase text-emerald-400 font-bold">Mercenario</p>
                            <p className="text-white font-semibold text-sm">Ejecuta la misión.</p>
                            <p className="text-neutral-300 text-xs leading-relaxed">Entramos al terreno, conectamos la operación y garantizamos resultados medibles.</p>
                        </div>
                    </div>
                </section>

                {/* ─── LLAMADO A LA ACCIÓN (CTA) ─── */}
                <section className="pt-16 border-t border-neutral-200">
                    <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white text-center space-y-8 shadow-2xl relative overflow-hidden">
                        <div className="max-w-2xl mx-auto space-y-4 relative z-10">
                            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Paso Siguiente</span>
                            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                                Cuéntanos cómo funciona hoy tu empresa.
                            </h3>
                            <p className="text-neutral-400 text-sm sm:text-base font-normal leading-relaxed">
                                Sin presentaciones comerciales vacías ni promesas teóricas. Analizaremos tu flujo actual de ventas, cobros y atención, y te mostraremos cómo operarlo sin fricción.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                            <a 
                                href={`https://wa.me/${WHATSAPP_NUM}?text=Hola,%20leí%20el%20manifiesto%20de%20Mercenario%20y%20me%20gustaría%20agendar%20un%20diagnóstico%20operativo%20para%20mi%20empresa`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-100 transition-colors rounded-full shadow-lg"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>Agendar Diagnóstico por WhatsApp</span>
                            </a>

                            <Link 
                                href="/#planes"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border border-neutral-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors rounded-full"
                            >
                                <span>Ver Planes y Precios CLP</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

            </main>

            {/* ─── FOOTER ─── */}
            <footer className="w-full py-12 border-t border-neutral-200 text-center text-xs text-neutral-400 tracking-wider uppercase bg-white">
                <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <span>© {new Date().getFullYear()} Mercenario OS. Santiago, Chile.</span>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
                        <Link href="/tienda" className="hover:text-black transition-colors">Tienda Demo</Link>
                        <a href={`https://wa.me/${WHATSAPP_NUM}`} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">WhatsApp</a>
                    </div>
                </div>
            </footer>

        </div>
    );
}
