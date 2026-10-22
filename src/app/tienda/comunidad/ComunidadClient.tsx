'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Mail, 
  Sparkles, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Recycle, 
  Mountain, 
  HeartHandshake, 
  Compass,
  Clock,
  Send,
  MessageCircle,
  Share2,
  Copy,
  Check
} from 'lucide-react';

const INTEREST_TAGS = [
  { id: 'trekking', label: '🏔️ Trekking & Senderismo' },
  { id: 'montana', label: '🧗 Alta Montaña & Clima Extremo' },
  { id: 'inclusivo', label: '♿ Montañismo Adaptado & Inclusivo' },
  { id: 'upcycling', label: '♻️ Upcycling & Reparación Textil' },
  { id: 'campamento', label: '🏕️ Campamento & Expedición' },
  { id: 'fauna', label: '🌿 Conservación del Guanaco Andino' },
];

const UPCOMING_EVENTS = [
  {
    id: 'taller-reparacion',
    title: 'Clínica de Reparación y Parche de Membranas Técnicas',
    date: 'Sábado 15 de Noviembre, 2026',
    time: '10:30 - 13:00 hrs',
    location: 'Taller Central WEKE (Gredos 7952, Las Condes, Santiago)',
    badge: 'Taller Presencial Gratuito',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    description: 'Aprende a reparar rasgaduras en chaquetas técnicas, lubricar cierres impermeables y parchar carpas con sellado térmico para alargar la vida de tu equipo.',
    spots: '15 cupos disponibles',
  },
  {
    id: 'trekking-inclusivo',
    title: 'Trekking Inclusivo Cordillera Central: Sendero Los Almendros',
    date: 'Sábado 29 de Noviembre, 2026',
    time: '08:30 - 13:30 hrs',
    location: 'Parque Cordillera, Precordillera de Santiago',
    badge: 'Salida Comunitaria',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    description: 'Jornada de senderismo inclusivo abierta a personas con movilidad reducida, familiares y amigos. Contaremos con asistentes de montaña y testeo de indumentaria adaptada.',
    spots: '25 cupos disponibles',
  },
  {
    id: 'cero-huella',
    title: 'Jornada Cero Huella: Limpieza y Educación Ambiental',
    date: 'Domingo 14 de Diciembre, 2026',
    time: '09:00 - 14:00 hrs',
    location: 'Valle de las Arenas, Cajón del Maipo',
    badge: 'Conservación Activa',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    description: 'Subida colectiva para retirar microbasura de senderos de alta afluencia y charla de respeto por el hábitat del Guanaco y la flora nativa.',
    spots: 'Abierto a la comunidad',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Poder subir a la cordillera con un pantalón que no me aprieta la prótesis y que puedo abrir fácilmente por el costado con velcro es una autonomía que ninguna marca extranjera me había brindado.',
    author: 'Gonzalo Sepúlveda',
    role: 'Montañista adaptado & usuario de prótesis transtibial',
    location: 'Santiago, Chile',
    avatar: 'GS',
  },
  {
    quote: 'Desde 1985 coso para personas de verdad, no para figurines de pasarela. La comunidad de montañistas que cuida sus prendas durante décadas es el mayor orgullo de nuestro taller.',
    author: 'Vidalina Díaz',
    role: 'Fundadora y Maestra Confeccionista de WEKE',
    location: 'Las Condes, Santiago',
    avatar: 'VD',
  },
  {
    quote: 'Mi chaqueta WEKE tiene más de 7 años de expediciones. Cuando se le rompió un tirador en la roca, la traje a Gredos y me la repararon en el momento. Eso es sustentabilidad real, no marketing.',
    author: 'Martina Valenzuela',
    role: 'Guía de trekking y escaladora',
    location: 'Región Metropolitana',
    avatar: 'MV',
  },
];

export default function ComunidadClient() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'trekking',
    'upcycling',
  ]);
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ecommerce/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          interests: selectedInterests,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubscribed(true);
        setDiscountCode(data.discountCode || 'COMUNIDAD-WEKE-10');
      } else {
        setErrorMsg(data.error || 'Ocurrió un error al registrar tu suscripción.');
      }
    } catch (err) {
      setErrorMsg('No pudimos procesar tu solicitud. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!discountCode) return;
    navigator.clipboard.writeText(discountCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="bg-white text-neutral-900 min-h-screen">
      {/* ── 1. HERO COMUNIDAD WEKE ────────────────────────────────────────── */}
      <section className="relative pt-12 pb-24 sm:pt-20 sm:pb-32 overflow-hidden bg-neutral-950 text-white">
        {/* Imagen de fondo con overlay ambiental */}
        <div className="absolute inset-0 opacity-35 mix-blend-luminosity pointer-events-none">
          <img
            src="/images/weke-comunidad.jpg"
            alt="Comunidad WEKE en la cordillera de los Andes"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-neutral-200 text-[10px] font-mono font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Comunidad & Bitácora Andina • Desde 1985
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase text-white font-sans leading-[0.95]">
              La montaña nos reúne. <br />
              <span className="text-emerald-400">La cordillera nos une.</span>
            </h1>

            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
              Somos un colectivo abierto de expedicionarios, familias, amantes de la naturaleza y montañistas adaptados. Compartimos rutas limpias, aprendemos a reparar nuestro propio equipo y defendemos la montaña sin barreras.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#boletin"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Suscribirme al Boletín</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#encuentros"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-xs uppercase tracking-wider border border-white/20 transition-all backdrop-blur-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span>Próximos Encuentros</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SECCIÓN PRINCIPAL: FORMULARIO DEL BOLETÍN DE NOVEDADES ─────── */}
      <section id="boletin" className="relative -mt-12 z-10 max-w-5xl mx-auto px-4 sm:px-8 mb-24">
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Lado Izquierdo: Beneficios del Boletín */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold tracking-widest uppercase">
                <Mail className="w-3.5 h-3.5" />
                <span>Bitácora Mensual Gratuita</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-tight">
                Únete a la Bitácora de Novedades WEKE
              </h2>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                No enviamos spam. Recibirás un correo mensual con guías de rutas andinas, fechas de talleres presenciales de compostura en Las Condes y acceso prioritario a drops exclusivos confeccionados con carpas recicladas.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>10% de descuento inmediato</strong> en tu primera compra o servicio de reparación técnica.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Convocatorias prioritarias</strong> a trekkings inclusivos y clínicas de compostura.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Acceso anticipado de 48h</strong> a nuevos lanzamientos de chaquetas 3 capas.</span>
                </div>
              </div>
            </div>

            {/* Lado Derecho: Formulario Interactivo */}
            <div className="lg:col-span-7 bg-neutral-950/80 p-6 sm:p-8 rounded-2xl border border-neutral-800/80">
              {subscribed ? (
                /* Estado de Éxito */
                <div className="text-center py-6 space-y-5">
                  <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-7 h-7" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-black uppercase tracking-tight text-white">
                      ¡Bienvenido a la Comunidad WEKE!
                    </h3>
                    <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                      Te hemos registrado en la Bitácora Andina. Hemos enviado una confirmación a <strong>{email}</strong> con los detalles de las próximas salidas.
                    </p>
                  </div>

                  {/* Cupón Exclusivo */}
                  <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl max-w-sm mx-auto space-y-2 text-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">
                      Tu Cupón de Bienvenida (10% OFF)
                    </span>
                    <div className="flex items-center justify-between bg-black px-4 py-2.5 rounded-lg border border-neutral-700">
                      <span className="font-mono font-bold text-emerald-400 text-sm tracking-wider">
                        {discountCode}
                      </span>
                      <button
                        onClick={copyToClipboard}
                        className="p-1.5 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        title="Copiar cupón"
                      >
                        {copiedCode ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {copiedCode && (
                      <span className="text-[10px] text-emerald-400 font-mono block">
                        ✓ Cupón copiado al portapapeles
                      </span>
                    )}
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/tienda"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black hover:bg-neutral-200 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      <span>Explorar la Colección</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                /* Formulario Activo */
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej: Camila Sepúlveda"
                      className="w-full bg-neutral-900 border border-neutral-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="camila@exploradora.cl"
                        className="w-full bg-neutral-900 border border-neutral-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                        WhatsApp (Opcional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+56 9 9878 5258"
                        className="w-full bg-neutral-900 border border-neutral-700 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  {/* Intereses Outdoor */}
                  <div className="space-y-2 pt-1">
                    <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Tus Intereses en la Comunidad (Selecciona los que quieras):
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {INTEREST_TAGS.map((tag) => {
                        const isSelected = selectedInterests.includes(tag.id);
                        return (
                          <button
                            key={tag.id}
                            type="button"
                            onClick={() => toggleInterest(tag.id)}
                            className={`text-[11px] px-3 py-1.5 rounded-full transition-all border cursor-pointer select-none ${
                              isSelected
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-semibold'
                                : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:border-neutral-500'
                            }`}
                          >
                            {tag.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-red-400 text-xs bg-red-950/40 p-2.5 rounded-lg border border-red-800/50">
                      {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-neutral-700 text-neutral-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {loading ? (
                      <span>Procesando suscripción...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Suscribirme al Boletín de Novedades</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-neutral-500 text-center font-mono">
                    Tus datos están protegidos. Puedes desuscribirte con 1 clic en cualquier momento.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. CUATRO PILARES DE LA COMUNIDAD WEKE ───────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 border-t border-neutral-200/80">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-700 font-bold block">
            Vivir la Montaña Juntos
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950">
            ¿Qué Hacemos en la Comunidad WEKE?
          </h2>
          <p className="text-neutral-600 text-sm font-light leading-relaxed">
            Nuestra comunidad no es solo un boletín por correo; es una red viva de personas que se encuentran en el taller, en los senderos y en la defensa de los Andes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pilar 1 */}
          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200/90 space-y-3 hover:border-black transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Recycle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base uppercase text-neutral-950 tracking-tight">
              Talleres de Reparación Gratuita
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Realizamos clínicas prácticas en nuestro taller de Gredos 7952 (Las Condes) para enseñarte a cambiar tiradores, parchar rasgaduras y mantener membranas técnicas sin botar nada a la basura.
            </p>
          </div>

          {/* Pilar 2 */}
          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200/90 space-y-3 hover:border-black transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center border border-blue-200">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base uppercase text-neutral-950 tracking-tight">
              Trekking Adaptado & Inclusivo
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Convocamos a montañistas con movilidad reducida o neurodivergencia a salidas guiadas en la precordillera de Santiago, poniendo a prueba nuestras prendas adaptadas con empatía real.
            </p>
          </div>

          {/* Pilar 3 */}
          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200/90 space-y-3 hover:border-black transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base uppercase text-neutral-950 tracking-tight">
              Bitácoras de Rutas Cero Huella
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Compartimos trazados GPS, guías de aclimatación y normas de no dejar rastro, con especial foco en la protección y avistamiento responsable del Guanaco andino.
            </p>
          </div>

          {/* Pilar 4 */}
          <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-neutral-200/90 space-y-3 hover:border-black transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center border border-purple-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base uppercase text-neutral-950 tracking-tight">
              Drops de Edición Limitada
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Confeccionamos tirajes reducidos de mochilas y bananos a partir de lonas de carpas de expedición donadas. Los suscriptores del boletín acceden 48 horas antes del lanzamiento.
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. CALENDARIO DE PRÓXIMOS ENCUENTROS ───────────────────────────── */}
      <section id="encuentros" className="bg-[#F8F9FA] py-20 border-y border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200 text-neutral-700 text-[10px] font-mono font-bold tracking-widest uppercase">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>Calendario de Actividades</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950">
                Próximos Encuentros de la Comunidad
              </h2>
            </div>
            <p className="text-xs text-neutral-500 max-w-md font-light leading-relaxed">
              Las actividades son gratuitas con inscripción previa mediante nuestro boletín o WhatsApp oficial de la marca.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {UPCOMING_EVENTS.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${event.badgeColor}`}
                    >
                      {event.badge}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {event.spots}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-neutral-900 leading-snug">
                    {event.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-neutral-600 font-mono">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-500 leading-relaxed font-light pt-1">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100">
                  <a
                    href={`https://wa.me/56957958467?text=${encodeURIComponent(
                      `Hola Asistente Virtual WEKE, quisiera reservar un cupo para el evento: ${event.title}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Inscribirme vía WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TESTIMONIOS DE LA COMUNIDAD ───────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-bold block">
            Voces de los Andes
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950">
            Historias que Tejen Nuestra Identidad
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between space-y-6"
            >
              <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic font-light">
                “{t.quote}”
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-neutral-200/60">
                <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs font-mono shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase text-neutral-900">
                    {t.author}
                  </h4>
                  <p className="text-[11px] text-neutral-500 leading-tight">
                    {t.role}
                  </p>
                  <span className="text-[10px] text-neutral-400 font-mono block">
                    {t.location}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. LLAMADO FINAL Y ENLACES SOCIALES ───────────────────────────── */}
      <section className="bg-neutral-950 text-white py-16 px-4 sm:px-8 border-t border-neutral-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-neutral-300 text-[10px] font-mono font-bold tracking-widest uppercase">
            <Mountain className="w-3.5 h-3.5 text-emerald-400" />
            <span>WEKE Outdoor • Taller Gredos 7952, Las Condes</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            ¿Listo para Subir con Nosotros?
          </h2>

          <p className="text-neutral-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Visita nuestra tienda para conocer el Sistema de 3 Capas o acércate a nuestro taller para conversar de montaña, reparar tu equipo o sumarte a la próxima salida.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/tienda"
              className="px-6 py-3 bg-white text-black hover:bg-neutral-200 rounded-full font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Ver Toda la Colección
            </Link>

            <Link
              href="/tienda/nosotros"
              className="px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full font-bold text-xs uppercase tracking-wider border border-neutral-700 transition-colors"
            >
              Conocer Nuestra Historia
            </Link>

            <a
              href="https://wa.me/56957958467?text=Hola%20WEKE%2C%20quisiera%20sumarme%20a%20la%20comunidad"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Asistente Virtual Comunidad</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
