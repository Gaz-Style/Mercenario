'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/ecommerce';

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingOrSwiping = useRef(false);
  const touchStartPos = useRef<{ x: number; y: number; time: number } | null>(null);

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1000'];

  const currentPrice = product.sale_price || product.base_price;
  const hasDiscount = Boolean(product.sale_price && product.sale_price < product.base_price);
  const discountPercent = hasDiscount
    ? Math.round(((product.base_price - product.sale_price!) / product.base_price) * 100)
    : 0;

  // Sincronizar índice activo al hacer scroll snap
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const width = el.clientWidth;
    if (width > 0) {
      const newIndex = Math.round(el.scrollLeft / width);
      if (newIndex >= 0 && newIndex < images.length && newIndex !== currentImgIndex) {
        setCurrentImgIndex(newIndex);
      }
    }
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const target = Math.max(0, Math.min(index, images.length - 1));
    el.scrollTo({
      left: target * el.clientWidth,
      behavior: 'smooth',
    });
    setCurrentImgIndex(target);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const prevIdx = (currentImgIndex - 1 + images.length) % images.length;
    scrollToIndex(prevIdx);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const nextIdx = (currentImgIndex + 1) % images.length;
    scrollToIndex(nextIdx);
  };

  // Detección de tap limpio vs swipe para no navegar accidentalmente
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
    isScrollingOrSwiping.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const diffX = Math.abs(e.touches[0].clientX - touchStartPos.current.x);
    const diffY = Math.abs(e.touches[0].clientY - touchStartPos.current.y);
    if (diffX > 10 || diffY > 10) {
      isScrollingOrSwiping.current = true;
    }
  };

  const handleTouchEnd = () => {
    touchStartPos.current = null;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isScrollingOrSwiping.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    router.push(`/tienda/${product.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="group relative aspect-[4/5] w-full bg-[#111111] overflow-hidden rounded-none select-none cursor-pointer border-0"
    >
      {/* ─── 1. Background Carousel Image Track (Scroll Snap Nativo 100% Fluido) ─── */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute inset-0 w-full h-full flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-full h-full min-w-full max-w-full flex-shrink-0 snap-center snap-always relative overflow-hidden"
          >
            <img
              src={img}
              alt={`${product.name} - Imagen ${idx + 1}`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading={idx === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* ─── 2. Top Badges & Indicator ─── */}
      <div className="absolute top-3 inset-x-3 flex items-start justify-between z-20 pointer-events-none">
        {/* Badges */}
        <div className="flex flex-col gap-1.5 pointer-events-auto">
          {hasDiscount && (
            <span className="bg-black/90 backdrop-blur-md text-white font-mono text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 shadow-sm border border-white/10">
              -{discountPercent}% OFF
            </span>
          )}
          {product.featured && (
            <span className="bg-white/95 backdrop-blur-md text-black font-mono text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 shadow-sm border border-black/10">
              Technical Core
            </span>
          )}
        </div>

        {/* Counter Badge if multiple images */}
        {images.length > 1 && (
          <span className="bg-black/60 backdrop-blur-md text-white/90 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10">
            {currentImgIndex + 1}/{images.length}
          </span>
        )}
      </div>

      {/* ─── 3. Desktop Hover Chevron Arrows ─── */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevImage}
            aria-label="Imagen anterior"
            className="hidden md:flex absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-black shadow-lg items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 cursor-pointer active:scale-90"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextImage}
            aria-label="Siguiente imagen"
            className="hidden md:flex absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-black shadow-lg items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 cursor-pointer active:scale-90"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* ─── 4. Instagram / App Style Pagination Dots (Bottom Center) ─── */}
      {images.length > 1 && (
        <div className="absolute bottom-[92px] inset-x-0 flex items-center justify-center gap-1.5 z-20 pointer-events-none">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollToIndex(idx);
              }}
              className={`pointer-events-auto h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentImgIndex
                  ? 'w-4 bg-white shadow-sm'
                  : 'w-1.5 bg-white/45 hover:bg-white/70'
              }`}
              aria-label={`Ir a imagen ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* ─── 5. Bottom Overlay: Title, Price and Action Button (Inside the Image) ─── */}
      <div className="absolute inset-x-0 bottom-0 pt-20 pb-3.5 px-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end gap-1.5 text-white z-20 pointer-events-auto">
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-300 truncate">
          {product.category}
        </span>

        {/* Product Title inside image */}
        <h3 className="font-bold text-sm sm:text-base text-white line-clamp-1 tracking-tight drop-shadow-sm">
          {product.name}
        </h3>

        {/* Price & Action Button Row inside image */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-black text-white font-mono tracking-tight drop-shadow-sm">
              ${currentPrice.toLocaleString('es-CL')}
            </span>
            {hasDiscount && (
              <span className="text-xs text-neutral-400 line-through font-mono">
                ${product.base_price.toLocaleString('es-CL')}
              </span>
            )}
          </div>

          {/* Action Button inside image */}
          <div onClick={(e) => e.stopPropagation()}>
            <Link
              href={`/tienda/${product.slug}`}
              className="flex items-center gap-1 bg-white hover:bg-neutral-200 text-black font-mono text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-none transition-all shadow-md active:scale-95"
            >
              <span>VER</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
