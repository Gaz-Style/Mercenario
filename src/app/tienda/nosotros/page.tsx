import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Mountain, 
  Recycle, 
  HeartHandshake, 
  Layers, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Mail, 
  ArrowRight,
  Compass,
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  Users
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nosotros | WEKE Ropa Técnica Sustentable e Inclusiva',
  description: 'Conoce la historia, propósito y filosofía de WEKE: desde 1985 confeccionando indumentaria técnica para alta y media montaña en Chile bajo el principio de cero residuo e inclusión.',
};

export default function NosotrosPage() {
  return (
    <div className="bg-white text-neutral-900 min-h-screen">
      {/* ── 1. HERO EDITORIAL: MANIFIESTO WEKE ─────────────────────────────── */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 overflow-hidden bg-gradient-to-b from-neutral-50 via-white to-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 text-white text-[10px] font-mono font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Desde 1985 • Confeccionado en Chile
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-neutral-950 font-sans leading-[0.95]">
              La montaña es para todos, <br />
              <span className="text-emerald-700">WEKE también.</span>
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 font-light leading-relaxed max-w-3xl">
              Somos especialistas chilenos en la creación de indumentaria técnica de alta durabilidad, diseñada para enfrentar el clima riguroso de la cordillera y el dinamismo de la ciudad. Bajo la filosofía de <strong className="font-semibold text-neutral-900">cero residuo</strong> e <strong className="font-semibold text-neutral-900">inclusión real</strong>, cada pieza es confeccionada artesanalmente en nuestro taller de Santiago.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/tienda"
                className="px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 group cursor-pointer"
              >
                <span>Explorar Colección Técnica</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="https://wa.me/56957958467?text=Hola%20WEKE,%20quisiera%20consultar%20al%20asistente%20virtual%20sobre%20sus%20prendas"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Asistente Virtual IA</span>
              </a>
            </div>
          </div>

          {/* Estadísticas / Pilares Clave */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-16 mt-16 border-t border-neutral-200/80">
            <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/60">
              <span className="font-mono text-2xl sm:text-3xl font-black text-neutral-950 block">1985</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold mt-1 block">
                Año de Fundación
              </span>
              <p className="text-[12px] text-neutral-600 mt-1">40 años de trayectoria en media y alta montaña.</p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/60">
              <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-700 block">100%</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold mt-1 block">
                Hecho en Chile
              </span>
              <p className="text-[12px] text-neutral-600 mt-1">Patronaje y costuras ergonómicas para el cuerpo chileno.</p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/60">
              <span className="font-mono text-2xl sm:text-3xl font-black text-neutral-950 block">0</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold mt-1 block">
                Residuos Textiles
              </span>
              <p className="text-[12px] text-neutral-600 mt-1">Reutilización de lonas de expedición y retazos técnicos.</p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50/80 border border-neutral-200/60">
              <span className="font-mono text-2xl sm:text-3xl font-black text-emerald-700 block">3</span>
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold mt-1 block">
                Capas Técnicas
              </span>
              <p className="text-[12px] text-neutral-600 mt-1">Sistema integral desde primera capa hasta shell exterior.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ¿QUÉ ES WEKE? ORIGEN DEL NOMBRE & GUANACO ───────────────────── */}
      <section className="py-20 sm:py-28 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 aspect-16/10 group">
                <img
                  src="/images/weke-guanaco.jpg"
                  alt="Guanaco andino en la cordillera de Chile - Símbolo de WEKE"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                    Cosmovisión Andina
                  </span>
                  <p className="text-sm font-semibold tracking-wide">
                    El Guanaco: animal sagrado andino capaz de sobrevivir al viento blanco y a la puna.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span>Etimología & Raíces</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 font-sans leading-none">
                ¿Qué significa <span className="text-emerald-700">WEKE</span>?
              </h2>

              <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-light">
                En lengua originaria andina, <strong>Weke</strong> significa <strong>"Guanaco"</strong>, el camélido autóctono que durante milenios ha habitado las cumbres más agrestes de la Cordillera de los Andes.
              </p>

              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Inspirados en su extraordinaria resistencia física, su capacidad natural de adaptación a amplitudes térmicas extremas y su paso silencioso que no erosiona el suelo, creamos una marca de ropa técnica pensada para acompañarte en cada etapa de tu vida al aire libre, sin dejar huellas destructivas en el entorno.
              </p>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm text-neutral-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Diseñado y Confeccionado en Chile</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  A diferencia de las marcas importadas con calces genéricos de Asia o Norteamérica, nuestras prendas están patronadas específicamente para la morfología y ergonomía de las personas en Chile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. EL TALLER: HISTORIA, VIDALINA DÍAZ & ARTESANÍA ───────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA] border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-neutral-500 uppercase">
                <Award className="w-4 h-4 text-emerald-700" />
                <span>Nuestra Historia & Fundadora</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 font-sans leading-none">
                40 años de oficio <br />
                <span className="text-emerald-700">frente a la cordillera.</span>
              </h2>

              <p className="text-neutral-700 text-base leading-relaxed font-light">
                WEKE nació en 1985 de la mano de su fundadora, <strong>Vidalina Díaz</strong>, montañista y maestra de la confección técnica que se propuso resolver una necesidad crítica: equipar a los expedicionarios chilenos con prendas duraderas que no fallaran en situaciones límite y que no dependieran de importaciones inalcanzables.
              </p>

              <p className="text-neutral-600 text-sm leading-relaxed">
                Desde nuestro taller central ubicado en <strong>Gredos 7952, comuna de Las Condes (Santiago)</strong>, combinamos maquinaria industrial especializada (remalladoras de 5 hilos, termoselladoras de costuras y atraques reforzados) con la dedicación de manos expertas que cuidan cada puntada.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200/80 shadow-2xs">
                  <span className="font-mono text-xs font-bold text-emerald-800 block mb-0.5">Taller en Las Condes</span>
                  <p className="text-[12px] text-neutral-600">Gredos 7952, Santiago de Chile.</p>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-neutral-200/80 shadow-2xs">
                  <span className="font-mono text-xs font-bold text-emerald-800 block mb-0.5">Garantía de Por Vida</span>
                  <p className="text-[12px] text-neutral-600">Soporte postventa y compostura técnica.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 aspect-16/10 group">
                <img
                  src="/images/weke-taller.jpg"
                  alt="Taller de confección técnica WEKE en Santiago de Chile frente a los Andes"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                    Confección Local
                  </span>
                  <p className="text-sm font-semibold tracking-wide">
                    Cada prenda es diseñada, cortada y ensamblada artesanalmente en Santiago de Chile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PILAR CENTRAL: LÍNEA INCLUSIVA & ACCESIBILIDAD ──────────────── */}
      <section className="py-20 sm:py-28 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 aspect-16/10 group">
                <img
                  src="/images/weke-inclusivo.jpg"
                  alt="Línea inclusiva de ropa de montaña WEKE en los Andes chilenos"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                    Inclusión Real
                  </span>
                  <p className="text-sm font-semibold tracking-wide">
                    Prendas adaptadas con cierres extendidos, sin etiquetas y máxima autonomía de vestir.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span>Pilar Diferencial Único en Chile</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-neutral-950 font-sans leading-none">
                Línea Inclusiva: <br />
                <span className="text-emerald-700">Outdoor sin barreras.</span>
              </h2>

              <p className="text-neutral-700 text-base leading-relaxed font-light">
                Creemos firmemente que <em>la montaña no discrimina; el vestuario tampoco debe hacerlo</em>. Desarrollamos la primera línea chilena de indumentaria técnica adaptada para personas con discapacidad motora, movilidad reducida o neurodivergencia sensorial.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900">Cero Etiquetas Interiores</h4>
                    <p className="text-xs text-neutral-600">Eliminamos etiquetas cosidas que provocan molestias o hipersensibilidad sensorial en la piel durante largas jornadas.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900">Cierres y Tiradores Ergonómicos</h4>
                    <p className="text-xs text-neutral-600">Tiradores extendidos de fácil manipulación que permiten abrir y cerrar chaquetas incluso con movilidad reducida o usando guantes térmicos gruesos.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900">Pantalones de Apertura Lateral</h4>
                    <p className="text-xs text-neutral-600">Cinturas elasticadas y aperturas laterales con broches/velcros de alta fijación para facilitar el vestir autónomo de personas en sillas de ruedas o con prótesis.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-neutral-900">Costuras Planas Flatlock</h4>
                    <p className="text-xs text-neutral-600">Evitan el roce, la fricción y las marcas sobre la piel al permanecer sentados o en actividad física continua.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FILOSOFÍA CERO RESIDUO & ECONOMÍA CIRCULAR ──────────────────── */}
      <section className="py-20 sm:py-28 bg-[#111815] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
              <Recycle className="w-4 h-4 text-emerald-400" />
              <span>Sustentabilidad Radical Desde 1985</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight font-sans leading-none text-white">
              No causamos daño al medio ambiente: <br />
              <span className="text-emerald-400">Filosofía Cero Residuo.</span>
            </h2>
            <p className="text-neutral-300 text-base font-light leading-relaxed">
              En WEKE combatimos la confección desechable (fast-fashion outdoor). Una prenda de montaña debe durar décadas, resistir tormentas y ser reparable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Recycle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Upcycling de Carpas & Telas</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Desde 1985 rescatamos telas técnicas, lonas de carpas de expedición y retazos de alta densidad para transformarlos en mochilas, bananos, mitones y refuerzos estructurales.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Servicio de Reparación</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Reparamos cierres, rasgaduras y membranas de prendas y equipos de montaña de cualquier marca. Creemos que la prenda más sustentable es la que ya existe y sigue en uso.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-white">Empaques Funcionales</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-light">
                Entregamos nuestras prendas en bolsas de tela técnica con un segundo uso garantizado (bolsa de compresión, organizador de mochila o bolsa de víveres para campamento).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. EL SISTEMA TÉCNICO DE 3 CAPAS WEKE ──────────────────────────── */}
      <section className="py-20 sm:py-28 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-700 uppercase">
              Ingeniería Textil
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-950 font-sans">
              El Sistema de 3 Capas
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base font-light">
              Inspirado en la flora y toponimia andina, nuestro sistema te protege de la humedad, aísla del frío extremo y frena vientos y lluvia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Capa 1 */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/90 space-y-4 hover:border-emerald-500 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                  Capa 01
                </span>
                <span className="text-xs text-neutral-400 font-mono">Segunda Piel</span>
              </div>
              <h3 className="text-xl font-black uppercase text-neutral-900 tracking-tight">
                Primera Capa Térmica
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                Actúa en contacto directo con la piel. Su función principal es expulsar rápidamente la transpiración hacia afuera mientras retiene el calor basal del cuerpo.
              </p>
              <div className="pt-2 border-t border-neutral-200">
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
                  Modelos Insignia:
                </span>
                <p className="text-xs font-semibold text-neutral-800">
                  Evernia Base & Top, Xantoria Base & Top, Camisas técnicas Aspillaga, Poleras técnicas Sora.
                </p>
              </div>
            </div>

            {/* Capa 2 */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/90 space-y-4 hover:border-emerald-500 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                  Capa 02
                </span>
                <span className="text-xs text-neutral-400 font-mono">Aislamiento</span>
              </div>
              <h3 className="text-xl font-black uppercase text-neutral-900 tracking-tight">
                Segunda Capa Térmica
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                Confeccionada con polar reciclado técnico de interior afelpado. Retiene el aire caliente generado por el cuerpo, brindando abrigo sin peso excesivo.
              </p>
              <div className="pt-2 border-t border-neutral-200">
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
                  Modelos Insignia:
                </span>
                <p className="text-xs font-semibold text-neutral-800">
                  Polerones térmicos Adesmia (Crudo, Naranjo, Verde), Berberis con gorro, Pantalones Chilca y Maqui.
                </p>
              </div>
            </div>

            {/* Capa 3 */}
            <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/90 space-y-4 hover:border-emerald-500 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                  Capa 03
                </span>
                <span className="text-xs text-neutral-400 font-mono">Protección Shell</span>
              </div>
              <h3 className="text-xl font-black uppercase text-neutral-900 tracking-tight">
                Tercera Capa Exterior
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed font-light">
                Barrera contra viento, lluvia, nieve y abrasión de la roca. Membranas técnicas impermeables y transpirables con cierres termosellados.
              </p>
              <div className="pt-2 border-t border-neutral-200">
                <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block mb-1">
                  Modelos Insignia:
                </span>
                <p className="text-xs font-semibold text-neutral-800">
                  Chaquetas Acacio, Belloto, Chañar, Ciprés, Notro, Pircún, Ulmo y Buzos completos Peumo y Tiaca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. NUESTRO OBJETIVO & CONTACTO DIRECTO ─────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-14 border border-neutral-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-700 uppercase">
                Visión de Futuro
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950 font-sans">
                Hacia las 5 marcas outdoor más queridas de Chile
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                Nuestro compromiso es seguir democratizando el acceso a la montaña con indumentaria técnica ética, inclusiva y duradera. Te invitamos a conocer nuestras prendas, visitar nuestro taller o coordinar un pedido especial para tu expedición o club.
              </p>
              <div className="flex flex-wrap gap-6 pt-2 text-xs font-mono text-neutral-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Gredos 7952, Las Condes, Santiago</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>+56 9 9878 5258</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span>contacto@wekeoutdoor.cl</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/tienda"
                className="w-full py-4 px-6 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-2xl text-center transition-all shadow-md cursor-pointer"
              >
                Ver Catálogo de Productos
              </Link>
              <a
                href="https://wa.me/56957958467?text=Hola%20WEKE%20Studio,%20quisiera%20asesor%C3%ADa%20del%20asistente%20virtual%20en%20prendas"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-widest rounded-2xl text-center transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                <span>Asistente Virtual IA</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
