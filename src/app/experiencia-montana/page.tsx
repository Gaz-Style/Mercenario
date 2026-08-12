"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ExperienciaMontanaPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rut, setRut] = useState("");

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* FontAwesome & Google Fonts */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          
          .experiencia-montana-body {
            background-color: #090d16;
            color: #f3f4f6;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
          }
          .glow-amber {
            box-shadow: 0 0 35px -5px rgba(245, 158, 11, 0.35);
          }
          .glow-subtle {
            box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.7);
          }
          .bg-grid-pattern {
            background-image: radial-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px);
            background-size: 24px 24px;
          }
        `
      }} />

      <div className="experiencia-montana-body antialiased text-slate-100 min-h-screen flex flex-col">
        {/* ANNOUNCEMENT / SCARCITY BAR */}
        <div className="bg-amber-500 text-slate-950 font-black text-xs md:text-sm py-2 px-4 text-center sticky top-0 z-50 shadow-md flex items-center justify-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-slate-950 animate-ping"></span>
          <span>PILOTO B2C EXCLUSIVO — LO BARNECHEA:</span>
          <span className="bg-slate-950 text-amber-400 px-2 py-0.5 rounded text-[11px] uppercase tracking-wider font-extrabold">Quedan 3 de 8 cupos</span>
        </div>

        {/* HEADER BRANDING */}
        <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-8 z-40">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white uppercase transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Inicio</span>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black rounded-xl flex items-center justify-center text-lg shadow-lg">
                  <i className="fa-solid fa-mountain-sun"></i>
                </div>
                <span className="font-black text-lg md:text-xl tracking-tight text-white">GAZ<span className="text-amber-500">_STYLE</span></span>
              </div>
            </div>
            <a href="#reservar" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs md:text-sm px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-2">
              <span>Reservar Cupo</span>
              <i className="fa-solid fa-arrow-right text-xs"></i>
            </a>
          </div>
        </header>

        {/* HERO SECTION (VSL / HIGH CONVERSION) */}
        <section className="relative pt-8 pb-12 md:pt-16 md:pb-20 bg-grid-pattern border-b border-slate-800/60 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3.5 py-1 text-amber-400 text-xs font-semibold mb-6">
                  <i className="fa-solid fa-bolt text-amber-400"></i>
                  <span>Trekking de Mente & Experiencia Gastronómica</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-4">
                  Reconecta, desafía tu mente y recarga la <span className="text-amber-400 underline decoration-amber-500 decoration-wavy underline-offset-8">fucking vibra</span> en la montaña.
              </h1>

              <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto font-medium mb-8 leading-relaxed">
                  Una jornada exclusiva que combina ascenso técnico en Parque Cordillera con alta gastronomía local en Lo Barnechea.
              </p>

              {/* VSL VIDEO PLAYER MOCKUP */}
              <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-2xl mb-8 group glow-subtle">
                  <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-6 text-center" id="video-container">
                      {isPlaying ? (
                        <iframe
                          className="w-full h-full absolute inset-0"
                          src="https://www.youtube-nocookie.com/embed/4wdXuIwjh8s?autoplay=1"
                          title="VSL Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <>
                          <img
                            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
                            alt="Montaña Lo Barnechea"
                            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                          
                          <button
                            onClick={() => setIsPlaying(true)}
                            className="relative z-10 w-20 h-20 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full flex items-center justify-center text-2xl font-black shadow-2xl transform group-hover:scale-110 transition-all cursor-pointer glow-amber"
                          >
                              <i className="fa-solid fa-play ml-1"></i>
                          </button>
                          
                          <div className="relative z-10 mt-4">
                              <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Video de 60 segundos</p>
                              <p className="text-sm md:text-base font-semibold text-white">Mira de qué trata la experiencia con Mario Cruz</p>
                          </div>
                        </>
                      )}
                  </div>
              </div>

              {/* CTA BUTTON */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="#reservar" className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base md:text-lg px-8 py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5 glow-amber">
                      <i className="fa-solid fa-ticket"></i>
                      <span>ASEGURAR MI CUPO — $35.000 CLP</span>
                  </a>
              </div>

              {/* TRUST BADGES */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
                  <span className="flex items-center gap-2"><i className="fa-solid fa-shield-halved text-emerald-400"></i> Guiado Seguro & WFR</span>
                  <span className="flex items-center gap-2"><i className="fa-solid fa-kit-medical text-amber-400"></i> Seguro de Accidentes Incluido</span>
                  <span className="flex items-center gap-2"><i className="fa-solid fa-utensils text-sky-400"></i> Almuerzo Gastronómico Incluido</span>
              </div>

          </div>
        </section>

        {/* PROBLEM VS SOLUTION SECTION */}
        <section className="py-12 md:py-16 bg-slate-950 border-b border-slate-800">
            <div className="max-w-5xl mx-auto px-4">
                
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-4xl font-black text-white mb-3">¿RUTINA AGOTADORA O RESETEO REAL?</h2>
                    <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">No venimos a pasear ni a perder el tiempo. Compara lo que vives hoy con lo que logras en la montaña.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* THE OLD WAY */}
                    <div className="bg-rose-950/20 border border-rose-900/40 p-6 md:p-8 rounded-3xl relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-4 text-rose-400">
                            <i className="fa-solid fa-circle-xmark text-2xl"></i>
                            <h3 className="font-extrabold text-lg text-white">El Ruido Urbano</h3>
                        </div>
                        <ul className="space-y-3 text-xs md:text-sm text-slate-300">
                            <li className="flex items-start gap-2">
                                <i className="fa-solid fa-minus text-rose-500 mt-1"></i>
                                <span>Semanas cargadas de pantalla, sobrepensamiento y fatiga mental.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fa-solid fa-minus text-rose-500 mt-1"></i>
                                <span>Fin de semana en el mall o descansando sin recargar la energía de verdad.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fa-solid fa-minus text-rose-500 mt-1"></i>
                                <span>Desconexión vacía que te deja igual de cansado el domingo por la noche.</span>
                            </li>
                        </ul>
                    </div>

                    {/* THE GAZ STYLE WAY */}
                    <div className="bg-amber-950/20 border-2 border-amber-500/50 p-6 md:p-8 rounded-3xl relative overflow-hidden glow-subtle">
                        <div className="flex items-center gap-3 mb-4 text-amber-400">
                            <i className="fa-solid fa-circle-check text-2xl"></i>
                            <h3 className="font-extrabold text-lg text-white">La Experiencia Gaz_Style</h3>
                        </div>
                        <ul className="space-y-3 text-xs md:text-sm text-slate-200">
                            <li className="flex items-start gap-2">
                                <i className="fa-solid fa-check text-amber-400 mt-1"></i>
                                <span><strong>Conexión & Enfoque:</strong> Ascenso técnico controlado con la mente presente.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fa-solid fa-check text-amber-400 mt-1"></i>
                                <span><strong>Energía Real:</strong> Salir de la zona de confort y volver con la vibra encendida.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <i className="fa-solid fa-check text-amber-400 mt-1"></i>
                                <span><strong>Cierre de Alto Nivel:</strong> Gastronomía local en Lo Barnechea para compartir el logro.</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>

        {/* ITINERARIO PASO A PASO */}
        <section className="py-12 md:py-16 bg-slate-900 border-b border-slate-800">
            <div className="max-w-4xl mx-auto px-4">
                
                <div className="text-center mb-12">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Cronograma de la Jornada</span>
                    <h2 className="text-2xl md:text-4xl font-black text-white mt-1">EL PASO A PASO DEL DÍA</h2>
                </div>

                <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-ml-px before:w-0.5 before:bg-slate-800">
                    
                    {/* Step 1 */}
                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs shrink-0 z-10 shadow-lg md:mx-auto">1</div>
                        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl w-full md:w-[calc(50%-2rem)] md:text-right">
                            <span className="text-amber-400 font-bold text-xs">08:00 AM &bull; Lo Barnechea</span>
                            <h3 className="font-extrabold text-white text-base mt-0.5">Encuentro & Briefing</h3>
                            <p className="text-xs text-slate-400 mt-1">Punto de reunión, revisión de equipo técnico e instrucción de seguridad para el grupo.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs shrink-0 z-10 shadow-lg md:mx-auto">2</div>
                        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl w-full md:w-[calc(50%-2rem)]">
                            <span className="text-amber-400 font-bold text-xs">08:30 AM &bull; Parque Cordillera</span>
                            <h3 className="font-extrabold text-white text-base mt-0.5">Ascenso & Ritmo de Montaña</h3>
                            <p className="text-xs text-slate-400 mt-1">Trekking en senderos cordilleranos. Enfoque en respiración, cadencia y ritmo constante.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-xs shrink-0 z-10 shadow-lg md:mx-auto">3</div>
                        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl w-full md:w-[calc(50%-2rem)] md:text-right">
                            <span className="text-amber-400 font-bold text-xs">11:30 AM &bull; Cumbre / Mirador</span>
                            <h3 className="font-extrabold text-white text-base mt-0.5">Recarga & Registro HD</h3>
                            <p className="text-xs text-slate-400 mt-1">Pausa en la cumbre para hidratar, disfrutar la vista panorámica y capturar el recuerdo en fotos de alta calidad.</p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500 text-slate-950 font-black text-xs shrink-0 z-10 shadow-lg md:mx-auto">4</div>
                        <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl w-full md:w-[calc(50%-2rem)]">
                            <span className="text-emerald-400 font-bold text-xs">02:00 PM &bull; Local Gastronómico Aliado</span>
                            <h3 className="font-extrabold text-white text-base mt-0.5">Cierre Gastronómico</h3>
                            <p className="text-xs text-slate-400 mt-1">Descenso y traslado al café/restaurante de Lo Barnechea para almorzar y recargar la vibra en grupo.</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>

        {/* ¿QUÉ INCLUYE EL TICKET? */}
        <section className="py-12 md:py-16 bg-slate-950 border-b border-slate-800">
            <div className="max-w-5xl mx-auto px-4">
                
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-4xl font-black text-white mb-2">TODO LO QUE INCLUYE TU EXPEDICIÓN</h2>
                    <p className="text-sm text-slate-400">Una sola tarifa integral sin cobros sorpresas en el terreno.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center text-lg mb-4">
                                <i className="fa-solid fa-user-shield"></i>
                            </div>
                            <h3 className="font-bold text-white text-base mb-1">Guiado & Seguridad WFR</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Liderado directamente por Mario Cruz. Control de grupo, primeros auxilios en áreas remotas y asistencia continua.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center text-lg mb-4">
                                <i className="fa-solid fa-utensils"></i>
                            </div>
                            <h3 className="font-bold text-white text-base mb-1">Menú Gastronómico</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Almuerzo completo o consumo especial reservado en nuestro local gastronómico aliado de Lo Barnechea.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center text-lg mb-4">
                                <i className="fa-solid fa-camera"></i>
                            </div>
                            <h3 className="font-bold text-white text-base mb-1">Registro Audiovisual</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Fotografías y clips de alta calidad de tu jornada para que conserves el recuerdo de tu logro.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center text-lg mb-4">
                                <i className="fa-solid fa-file-medical"></i>
                            </div>
                            <h3 className="font-bold text-white text-base mb-1">Seguro de Accidentes</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Cobertura individual para actividades de trekking durante todo el desarrollo de la jornada.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center text-lg mb-4">
                                <i className="fa-solid fa-apple-whole"></i>
                            </div>
                            <h3 className="font-bold text-white text-base mb-1">Ración de Marcha</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Snack técnico de alta densidad calórica e hidratación complementaria durante la ruta.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 bg-amber-500/10 text-amber-400 rounded-xl flex items-center justify-center text-lg mb-4">
                                <i className="fa-solid fa-ticket"></i>
                            </div>
                            <h3 className="font-bold text-white text-base mb-1">Entradas a Parques</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">Tickets de acceso pagados a los recintos y senderos de la Asociación Parque Cordillera.</p>
                        </div>
                    </div>

                </div>

            </div>
        </section>

        {/* SECCIÓN DE RESERVA Y CHECKOUT */}
        <section id="reservar" className="py-12 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
            <div className="max-w-3xl mx-auto px-4">
                
                <div className="bg-slate-900 border-2 border-amber-500/80 rounded-3xl p-6 md:p-10 shadow-2xl relative glow-amber">
                    
                    <div className="text-center mb-8">
                        <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded-full">Piloto B2C — Cupos Limitados</span>
                        <h2 className="text-2xl md:text-4xl font-black text-white mt-3">RESERVA TU LUGAR EN EL PILOTO</h2>
                        <p className="text-xs md:text-sm text-slate-300 mt-2">Próxima Fecha: <strong className="text-amber-400">Sábado 22 de Agosto &bull; Lo Barnechea</strong></p>
                    </div>

                    {/* SEAT COUNTER DYNAMIC */}
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 mb-8 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-slate-400">Cupos Confirmados:</p>
                            <p className="text-lg font-black text-white">5 de 8 Asientos</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-amber-400 font-bold">Quedan solo 3 cupos</p>
                            <div className="w-28 h-2.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                                <div className="bg-amber-500 h-full w-[62.5%] rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* REGISTRATION FORM */}
                    <form onSubmit={handleCheckout} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">Nombre Completo *</label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              placeholder="Ej: Mario Cruz"
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Correo Electrónico *</label>
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                  placeholder="mario@ejemplo.cl"
                                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">WhatsApp / Teléfono *</label>
                                <input
                                  type="tel"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  required
                                  placeholder="+56 9 1234 5678"
                                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">RUT (Para Seguro de Accidentes) *</label>
                            <input
                              type="text"
                              value={rut}
                              onChange={(e) => setRut(e.target.value)}
                              required
                              placeholder="12.345.678-9"
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500"
                            />
                        </div>

                        {/* PAYMENT SUMMARY */}
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 my-4 space-y-2 text-xs">
                            <div className="flex justify-between text-slate-300">
                                <span>Ticket Integral Experiencia (1 Cupo):</span>
                                <span className="font-bold text-white">$35.000 CLP</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>Seguro + Gastronomía Lo Barnechea:</span>
                                <span className="text-emerald-400 font-bold">Incluido ($0)</span>
                            </div>
                            <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-black text-amber-400">
                                <span>Total a Pagar:</span>
                                <span>$35.000 CLP</span>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer glow-amber">
                            <i className="fa-solid fa-lock"></i>
                            <span>PAGAR Y CONFIRMAR MI CUPO</span>
                        </button>

                        <p className="text-[11px] text-slate-500 text-center mt-2">
                            <i className="fa-solid fa-shield text-slate-400 mr-1"></i> Transacción directa y segura. Recibirás tu comprobante e instrucciones por e-mail de inmediato.
                        </p>
                    </form>

                </div>

            </div>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section className="py-12 bg-slate-950 border-b border-slate-800">
            <div className="max-w-3xl mx-auto px-4">
                
                <h2 className="text-xl md:text-2xl font-black text-white text-center mb-6">PREGUNTAS FRECUENTES</h2>

                <div className="space-y-3">
                    <details className="bg-slate-900 border border-slate-800 rounded-xl p-4 cursor-pointer">
                        <summary className="font-bold text-sm text-white">¿Cuál es el nivel de exigencia física?</summary>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">Es un nivel medio. No se requiere ser atleta profesional, pero sí contar con una condición física básica para caminar 3 a 4 horas con desnivel moderado.</p>
                    </details>

                    <details className="bg-slate-900 border border-slate-800 rounded-xl p-4 cursor-pointer">
                        <summary className="font-bold text-sm text-white">¿Qué pasa si las condiciones del clima no acompañan?</summary>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">Por seguridad WFR, si hay tormenta o lluvia torrencial la fecha se reprograma para el fin de semana siguiente o se reembolsa el 100% de tu dinero.</p>
                    </details>

                    <details className="bg-slate-900 border border-slate-800 rounded-xl p-4 cursor-pointer">
                        <summary className="font-bold text-sm text-white">¿Qué debo llevar al trekking?</summary>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">Mochila pequeña, mínimo 1.5L de agua, calzado con buen agarre (zapatillas de trail o botas) y ropa cómoda por capas. Te enviaremos la pauta exacta al confirmar.</p>
                    </details>
                </div>

            </div>
        </section>

        {/* FOOTER */}
        <footer className="py-8 bg-slate-950 text-slate-500 text-xs text-center border-t border-slate-900">
            <div className="max-w-4xl mx-auto px-4 space-y-2">
                <p className="font-bold text-slate-400">GAZ_STYLE &bull; Mario Cruz</p>
                <p>Lo Barnechea, Santiago de Chile &bull; Programa Emerge (Anglo American)</p>
                <p className="text-[10px] text-slate-600">&copy; 2026 Gaz_Style. Todos los derechos reservados.</p>
            </div>
        </footer>

        {/* SUCCESS MODAL */}
        <div
          className={`fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 ${
            showModal ? "" : "hidden"
          }`}
        >
            <div className="bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 md:p-8 max-w-md w-full text-center space-y-4 shadow-2xl">
                <div className="w-16 h-16 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center text-3xl font-black mx-auto">
                    <i className="fa-solid fa-check"></i>
                </div>
                <h3 className="text-2xl font-black text-white">¡CUPO PRE-RESERVADO!</h3>
                <p className="text-xs text-slate-300">Hemos registrado tu lugar para la experiencia en Lo Barnechea. Te enviamos la ficha de confirmación a tu correo.</p>
                
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left text-xs space-y-1">
                    <p><strong className="text-amber-400">Titular:</strong> <span>{name}</span></p>
                    <p><strong className="text-amber-400">Fecha:</strong> Sábado 22 de Agosto</p>
                    <p><strong className="text-amber-400">Lugar:</strong> Lo Barnechea</p>
                </div>

                <button onClick={closeModal} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-sm transition-all cursor-pointer">
                    ENTENDIDO, VOLVER AL SITIO
                </button>
            </div>
        </div>
      </div>
    </>
  );
}
