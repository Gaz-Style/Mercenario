'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  ArrowLeft, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  User,
  Menu,
  X,
  Users,
  Compass,
  Mountain
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/ecommerce/cart-context';

const ANNOUNCEMENT_BADGES = [
  {
    id: 'free-shipping',
    icon: Sparkles,
    highlight: 'Despacho Gratis',
    detail: 'en compras sobre $100.000 CLP',
  },
  {
    id: 'national-delivery',
    icon: Truck,
    highlight: 'Despacho Nacional 24/48h',
    detail: 'Tracking directo vía Courier y WhatsApp',
  },
  {
    id: 'guarantee',
    icon: ShieldCheck,
    highlight: 'Garantía WEKE de por Vida',
    detail: 'Confección nacional y servicio de compostura',
  },
  {
    id: 'returns',
    icon: RotateCcw,
    highlight: 'Cambios de Talla sin Costo',
    detail: 'Gestión directa durante 30 días',
  },
];

export default function StoreNavbar() {
  const { totalItems, openCart } = useCart();
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentBadgeIndex((prev) => (prev + 1) % ANNOUNCEMENT_BADGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentBadgeIndex((prev) => (prev - 1 + ANNOUNCEMENT_BADGES.length) % ANNOUNCEMENT_BADGES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentBadgeIndex((prev) => (prev + 1) % ANNOUNCEMENT_BADGES.length);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 border-b border-neutral-200/90 text-neutral-900 transition-all">
      {/* Top Utility Announcement Bar with Alternating Badges */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="bg-[#111111] text-white text-[10px] sm:text-[11px] font-mono tracking-widest py-2 px-3 sm:px-6 relative overflow-hidden select-none border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mini Left Arrow */}
          <button
            onClick={handlePrev}
            aria-label="Badge anterior"
            className="text-neutral-500 hover:text-white transition-colors p-1 flex-shrink-0 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Central Rotating Content with AnimatePresence */}
          <div className="flex-1 overflow-hidden h-5 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              {(() => {
                const currentBadge = ANNOUNCEMENT_BADGES[currentBadgeIndex];
                const Icon = currentBadge.icon;
                return (
                  <motion.div
                    key={currentBadge.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex items-center justify-center gap-2 text-center uppercase whitespace-nowrap px-2"
                  >
                    <Icon className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
                    <span className="font-bold text-white tracking-wider">{currentBadge.highlight}</span>
                    <span className="text-neutral-500 hidden md:inline">•</span>
                    <span className="text-neutral-400 font-normal hidden sm:inline">{currentBadge.detail}</span>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Mini Right Arrow & Indicators */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[9px] text-neutral-500 hidden sm:inline font-mono">
              {currentBadgeIndex + 1}/{ANNOUNCEMENT_BADGES.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Siguiente badge"
              className="text-neutral-500 hover:text-white transition-colors p-1 cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 flex items-center justify-between gap-4">
        {/* Left: Brand & Return */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="md:hidden p-2 -ml-2 text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            href="/"
            className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-neutral-400 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Inicio</span>
          </Link>

          <Link href="/tienda" className="flex items-center gap-2.5 group">
            <img
              src="/images/weke-logo.png"
              alt="WEKE Logo"
              className="w-9 h-9 object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-xl tracking-tight uppercase text-black font-sans group-hover:opacity-80 transition-opacity">
                WEKE
              </span>
              <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                STUDIO
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Main Desktop Navigation (Nosotros, Colección, Comunidad) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-bold tracking-widest uppercase text-neutral-700">
          <Link
            href="/tienda/nosotros"
            className="hover:text-black transition-colors py-1 hover:border-b-2 hover:border-neutral-900"
          >
            Nosotros
          </Link>

          <Link
            href="/tienda"
            className="hover:text-black transition-colors py-1 hover:border-b-2 hover:border-neutral-900"
          >
            Colección
          </Link>

          <Link
            href="/tienda/comunidad"
            className="hover:text-emerald-800 transition-colors py-1 text-emerald-700 flex items-center gap-1.5 hover:border-b-2 hover:border-emerald-700"
          >
            <span>Comunidad</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </Link>
        </nav>

        {/* Right: Social Links, Cart & User Account Icon */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Instagram Link */}
          <a
            href="https://www.instagram.com/wekeoutdoor_?srtk=MXgzb3hubjJ0ODBnNw=="
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram @wekeoutdoor_"
            aria-label="Instagram de WEKE Outdoor"
            className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 hover:border-black text-neutral-600 hover:text-black bg-white hover:bg-neutral-50 transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* Quick WhatsApp Link to Asistente Virtual */}
          <a
            href="https://wa.me/56957958467?text=Hola%20WEKE%20Studio%2C%20quisiera%20consultar%20al%20asistente%20virtual"
            target="_blank"
            rel="noopener noreferrer"
            title="Asistente Virtual WhatsApp +56 9 5795 8467"
            aria-label="Asistente Virtual WhatsApp de WEKE Studio"
            className="hidden sm:flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 hover:border-emerald-500 text-neutral-600 hover:text-emerald-600 bg-white hover:bg-emerald-50/50 transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          {/* Cart Button */}
          <button
            onClick={openCart}
            aria-label="Abrir Carrito"
            className="relative flex items-center gap-2 bg-black hover:bg-neutral-800 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-white" />
            <span className="hidden sm:inline">Bolsa</span>
            {totalItems > 0 && (
              <span className="bg-white text-black text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono">
                {totalItems}
              </span>
            )}
          </button>

          {/* User Account Button (Simulated Admin ERP Access) */}
          <Link
            href="/admin/ecommerce/pedidos"
            title="Mi Cuenta"
            aria-label="Mi Cuenta"
            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-300 hover:border-black text-neutral-700 hover:text-black bg-white hover:bg-neutral-50 transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <User className="w-4.5 h-4.5 stroke-[2]" />
          </Link>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-neutral-200 bg-white px-4 py-6 space-y-5 shadow-lg overflow-hidden"
          >
            {/* Primary Main Menu Links */}
            <div className="space-y-2 border-b border-neutral-100 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                Menú Principal
              </span>
              <div className="space-y-1">
                <Link
                  href="/tienda/nosotros"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl text-sm font-bold text-neutral-900 hover:bg-neutral-100 uppercase tracking-wider transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Mountain className="w-4 h-4 text-neutral-700" />
                    <span>Nosotros</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>

                <Link
                  href="/tienda"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl text-sm font-bold text-neutral-900 hover:bg-neutral-100 uppercase tracking-wider transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-neutral-700" />
                    <span>Colección</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </Link>

                <Link
                  href="/tienda/comunidad"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-50/80 hover:bg-emerald-100 uppercase tracking-wider transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-emerald-700" />
                    <span>Comunidad & Boletín</span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-600 text-white px-2 py-0.5 rounded-full uppercase">
                    Nuevo
                  </span>
                </Link>
              </div>
            </div>



            {/* Direct Social & WhatsApp in Mobile */}
            <div className="flex items-center justify-between pt-1">
              <a
                href="https://wa.me/56957958467?text=Hola%20WEKE%20Studio%2C%20quisiera%20consultar%20al%20asistente%20virtual"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase"
              >
                <span>Asistente Virtual IA</span>
              </a>
              <a
                href="https://www.instagram.com/wekeoutdoor_?srtk=MXgzb3hubjJ0ODBnNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-neutral-500 hover:text-black"
              >
                @wekeoutdoor_
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
