'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/lib/ecommerce/cart-context';

export default function CartFlyout() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    subtotal,
    freeShippingProgress,
    totalItems,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-white border-l border-neutral-200 text-neutral-900 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-black uppercase tracking-widest text-black">
                Bolsa de Compras
              </h2>
              <span className="text-xs bg-neutral-100 text-neutral-800 font-mono font-bold px-2 py-0.5 border border-neutral-200">
                {totalItems}
              </span>
            </div>
            <button
              onClick={closeCart}
              aria-label="Cerrar bolsa"
              className="p-1.5 text-neutral-400 hover:text-black hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Minimalist Shipping Goal Banner */}
          <div className="px-6 py-3.5 bg-[#F9F9F9] border-b border-neutral-200 text-xs">
            <div className="flex items-center justify-between text-[11px] mb-2 font-mono text-neutral-600">
              <span className="flex items-center gap-1.5 uppercase tracking-wider font-semibold">
                <Truck className="w-3.5 h-3.5 text-black" />
                {freeShippingProgress >= 100
                  ? 'Despacho Gratis Activado'
                  : `Te faltan $${(100000 - subtotal).toLocaleString('es-CL')} para envío gratis`}
              </span>
              <span className="font-bold text-black">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-neutral-200 h-1 overflow-hidden">
              <div
                className="bg-black h-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-400 space-y-3 py-16">
                <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                  <ShieldCheck className="w-6 h-6 stroke-1 text-neutral-500" />
                </div>
                <p className="text-xs font-mono uppercase tracking-widest text-neutral-700">Tu bolsa está vacía</p>
                <p className="text-xs text-neutral-400 max-w-xs font-light">
                  Explora las prendas técnicas de alto rendimiento diseñadas para la cordillera.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-2 text-xs font-bold text-black underline underline-offset-4 cursor-pointer"
                >
                  Continuar explorando
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variant_id}
                  className="flex gap-4 p-3 border border-neutral-200/80 bg-[#FAFAFA] hover:border-neutral-300 transition-colors"
                >
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="w-16 h-20 rounded-none object-cover bg-neutral-100 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-black line-clamp-1 tracking-tight">
                        {item.product_name}
                      </h4>
                      <p className="text-[11px] font-mono text-neutral-500 mt-0.5 uppercase tracking-wider">
                        {item.variant_title}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-300 bg-white">
                        <button
                          onClick={() => updateQuantity(item.variant_id, -1)}
                          className="px-2 py-0.5 hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold px-2 text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variant_id, 1)}
                          className="px-2 py-0.5 hover:bg-neutral-100 text-neutral-600 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-black text-black font-mono">
                          ${(item.unit_price * item.quantity).toLocaleString('es-CL')}
                        </span>
                        <button
                          onClick={() => removeItem(item.variant_id)}
                          className="text-neutral-400 hover:text-black transition-colors cursor-pointer p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-neutral-200 bg-white space-y-4">
              <div className="flex justify-between items-center text-xs text-neutral-500 font-mono">
                <span className="uppercase tracking-wider">Subtotal Estimado</span>
                <span className="text-base font-black text-black">
                  ${subtotal.toLocaleString('es-CL')}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">
                Impuestos y tarifas de courier calculados en el checkout.
              </p>

              <Link
                href="/tienda/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-mono uppercase tracking-widest text-xs py-4 px-6 transition-all cursor-pointer shadow-md"
              >
                <span>Proceder al Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
