'use client';

import React, { useState, useRef } from 'react';
import { Product, ProductVariant } from '@/types/ecommerce';
import { useCart } from '@/lib/ecommerce/cart-context';
import { ShoppingBag, ShieldCheck, Truck, RefreshCw, Check, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  
  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1000'];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Swipe detection refs
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const price = selectedVariant?.price || product.sale_price || product.base_price;
  const comparePrice = selectedVariant?.compare_at_price || (product.sale_price ? product.base_price : null);
  const stock = selectedVariant?.stock ?? product.total_stock ?? 10;

  // Touch handlers for fluid app-like sliding
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;

    if (isHorizontalSwipe.current === null) {
      if (Math.abs(diffX) > 6 || Math.abs(diffY) > 6) {
        isHorizontalSwipe.current = Math.abs(diffX) > Math.abs(diffY);
      }
    }

    if (isHorizontalSwipe.current) {
      setIsDragging(true);
      // Rubber-band resistance on ends
      if ((activeImageIndex === 0 && diffX > 0) || (activeImageIndex === images.length - 1 && diffX < 0)) {
        setDragOffset(diffX * 0.25);
      } else {
        setDragOffset(diffX);
      }
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;

    if (isDragging) {
      const threshold = 40;
      if (dragOffset < -threshold && activeImageIndex < images.length - 1) {
        setActiveImageIndex((prev) => prev + 1);
      } else if (dragOffset > threshold && activeImageIndex > 0) {
        setActiveImageIndex((prev) => prev - 1);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
    touchStartX.current = null;
    touchStartY.current = null;
    isHorizontalSwipe.current = null;
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const handleAddToCart = () => {
    addItem(
      {
        variant_id: selectedVariant?.id || product.id,
        product_id: product.id,
        product_name: product.name,
        variant_title: selectedVariant?.title || 'Estándar',
        sku: selectedVariant?.sku || product.sku,
        image: images[0] || '',
        unit_price: price,
        max_stock: stock,
      },
      quantity
    );

    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start bg-white text-neutral-900 font-sans">
      {/* Product Image Gallery (7 cols) - Transición Suave Tipo App */}
      <div className="lg:col-span-7 space-y-4">
        <div 
          className="group relative aspect-[4/5] bg-[#F7F7F7] overflow-hidden border border-neutral-200 shadow-xs select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding Track */}
          <div
            className={`flex h-full w-full ${
              isDragging
                ? ''
                : 'transition-transform duration-350 ease-[cubic-bezier(0.25,1,0.5,1)]'
            }`}
            style={{
              transform: `translateX(calc(-${activeImageIndex * 100}% + ${dragOffset}px))`,
            }}
          >
            {images.map((img, idx) => (
              <div key={idx} className="relative min-w-full h-full flex-shrink-0">
                <img
                  src={img}
                  alt={`${product.name} ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading={idx === 0 ? "eager" : "lazy"}
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Desktop Chevrons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                aria-label="Imagen anterior"
                className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-black shadow-md items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextImage}
                aria-label="Siguiente imagen"
                className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-black shadow-md items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Pagination Dots (Mobile) */}
          {images.length > 1 && (
            <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-20 pointer-events-none md:hidden">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeImageIndex
                      ? 'w-4 bg-white shadow-sm'
                      : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails row */}
        {images.length > 1 && (
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-20 sm:w-20 sm:h-24 overflow-hidden border transition-all flex-shrink-0 cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-black opacity-100 ring-1 ring-black'
                    : 'border-neutral-200 opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Information & Buy Box (5 cols) */}
      <div className="lg:col-span-5 space-y-8">
        <div className="border-b border-neutral-200 pb-6">
          <span className="text-[10px] font-mono uppercase text-neutral-500 font-semibold tracking-widest block mb-2">
            // {product.category} • SKU: {selectedVariant?.sku || product.sku}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight uppercase leading-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-2xl font-black text-black font-mono">
              ${price.toLocaleString('es-CL')} CLP
            </span>
            {comparePrice && comparePrice > price && (
              <span className="text-xs text-neutral-400 line-through font-mono">
                ${comparePrice.toLocaleString('es-CL')}
              </span>
            )}
          </div>
        </div>

        {/* Technical Description */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-black font-bold mb-2">
            Especificaciones & Uso
          </h3>
          <p className="text-neutral-600 text-sm leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        {/* Variants Selector */}
        {product.variants && product.variants.length > 1 && (
          <div className="space-y-3 pt-4 border-t border-neutral-200">
            <label className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
              Seleccionar Talla / Variante:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {product.variants.map((variant) => {
                const isSelected = selectedVariant?.id === variant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-black bg-black text-white'
                        : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                    }`}
                  >
                    <div className="text-xs font-bold font-mono uppercase">{variant.title}</div>
                    <div className="text-[11px] font-mono opacity-80 mt-1">
                      ${variant.price.toLocaleString('es-CL')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Stock Status Badge */}
        <div className="flex items-center gap-2 text-xs font-mono">
          {stock > 5 ? (
            <span className="inline-flex items-center gap-1.5 text-black font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Stock en línea verificado ({stock} unidades en Bodega Central)
            </span>
          ) : stock > 0 ? (
            <span className="inline-flex items-center gap-1.5 text-neutral-800 font-semibold">
              <AlertCircle className="w-3.5 h-3.5" />
              Stock limitado: {stock} unidades restantes
            </span>
          ) : (
            <span className="text-neutral-400 font-semibold">Agotado temporalmente</span>
          )}
        </div>

        {/* Actions: Quantity + Black CTA Button */}
        <div className="flex gap-3 pt-2">
          {/* Quantity selector */}
          <div className="flex items-center border border-neutral-300 bg-white px-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="text-neutral-500 hover:text-black px-2 py-1 text-sm font-bold cursor-pointer"
            >
              -
            </button>
            <span className="text-xs font-mono font-bold px-3 text-black">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => Math.min(stock, q + 1))}
              className="text-neutral-500 hover:text-black px-2 py-1 text-sm font-bold cursor-pointer"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={stock <= 0}
            className={`flex-1 flex items-center justify-center gap-2 font-mono uppercase tracking-widest text-xs py-4 px-6 transition-all shadow-sm cursor-pointer disabled:opacity-50 ${
              addedAnimation
                ? 'bg-neutral-900 text-white'
                : 'bg-black hover:bg-neutral-800 text-white active:scale-[0.99]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Añadido a la Bolsa</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Añadir a la Bolsa</span>
              </>
            )}
          </button>
        </div>

        {/* Trust & Guarantee List */}
        <div className="pt-6 border-t border-neutral-200 space-y-3 text-xs text-neutral-500 font-light">
          <div className="flex items-center gap-3">
            <Truck className="w-4 h-4 text-black flex-shrink-0" />
            <span>Despacho express a todo Chile con seguimiento en tiempo real.</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-black flex-shrink-0" />
            <span>Transacciones cifradas sin comisiones ocultas vía Webpay y Mercado Pago.</span>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-black flex-shrink-0" />
            <span>Soporte directo vía WhatsApp desde nuestra central en Vitacura.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
