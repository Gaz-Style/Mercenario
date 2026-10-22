'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/ecommerce/cart-context';
import { createOrder } from '@/lib/ecommerce/orders';
import { ArrowLeft, Lock, CreditCard, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingCost, total, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rut: '',
    street: '',
    city: 'Santiago',
    region: 'Región Metropolitana',
    notes: '',
    paymentGateway: 'webpay' as 'webpay' | 'mercadopago' | 'transferencia',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setErrorMessage('Tu bolsa está vacía. Agrega productos antes de pagar.');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.phone || !formData.street) {
      setErrorMessage('Por favor completa todos los campos requeridos para el despacho.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const res = await createOrder({
        customer_name: formData.fullName,
        customer_email: formData.email,
        customer_phone: formData.phone,
        rut_dni: formData.rut,
        shipping_address: {
          street: formData.street,
          city: formData.city,
          region: formData.region,
          notes: formData.notes,
        },
        items: items.map((i) => ({
          product_id: i.product_id,
          variant_id: i.variant_id,
          product_title: i.product_name,
          variant_title: i.variant_title,
          sku: i.sku,
          image: i.image,
          quantity: i.quantity,
          unit_price: i.unit_price,
          total_price: i.unit_price * i.quantity,
        })),
        subtotal,
        discount_amount: 0,
        shipping_cost: shippingCost,
        total_amount: total,
        payment_gateway: formData.paymentGateway,
      });

      if (res.success && res.order) {
        clearCart();
        router.push(
          `/tienda/orden-confirmada?orderId=${res.order.id}&number=${res.order.order_number}&total=${res.order.total_amount}&name=${encodeURIComponent(
            res.order.customer_name
          )}`
        );
      } else {
        setErrorMessage(res.error || 'Ocurrió un error al procesar el pedido.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-28 text-center space-y-4 bg-white text-neutral-900">
        <h1 className="text-2xl font-black uppercase tracking-tight text-black">Tu bolsa está vacía</h1>
        <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Añade prendas de la colección técnica antes de finalizar el pedido.
        </p>
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 bg-black text-white font-mono uppercase tracking-widest text-xs py-3.5 px-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Back link */}
        <div className="mb-6">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver a la tienda</span>
          </Link>
        </div>

        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 mb-10">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block mb-1">
              // FINALIZACIÓN DE COMPRA
            </span>
            <h1 className="text-3xl font-black text-black tracking-tight uppercase">
              Checkout Seguro
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-600 bg-neutral-100 border border-neutral-200 px-3 py-1.5">
            <Lock className="w-3.5 h-3.5 text-black" />
            <span>ENCRIPTADO SSL 256-BIT</span>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form fields (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Datos del Cliente */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <span className="text-xs font-mono font-bold text-neutral-400">[01]</span>
                <h2 className="text-xs font-mono font-black uppercase tracking-widest text-black">
                  Identificación & Contacto
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Francisca Valenzuela"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    RUT / DNI (Opcional)
                  </label>
                  <input
                    type="text"
                    name="rut"
                    placeholder="12.345.678-9"
                    value={formData.rut}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="contacto@empresa.cl"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Teléfono Móvil (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+56 9 8765 4321"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </section>

            {/* 2. Dirección de Entrega */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <span className="text-xs font-mono font-bold text-neutral-400">[02]</span>
                <h2 className="text-xs font-mono font-black uppercase tracking-widest text-black">
                  Dirección de Entrega
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Calle, Número y Depto *
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    placeholder="Av. Tabancura 1091, Depto 402"
                    value={formData.street}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Comuna / Ciudad *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="Vitacura, Las Condes..."
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Región *
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                  >
                    <option value="Región Metropolitana">Región Metropolitana</option>
                    <option value="Valparaíso">Valparaíso</option>
                    <option value="Biobío">Biobío</option>
                    <option value="Araucanía">Araucanía</option>
                    <option value="Los Lagos">Los Lagos</option>
                    <option value="Antofagasta">Antofagasta</option>
                    <option value="Coquimbo">Coquimbo</option>
                    <option value="Otra Región">Otra Región</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Instrucciones Especiales (Opcional)
                  </label>
                  <input
                    type="text"
                    name="notes"
                    placeholder="Dejar en conserjería..."
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </section>

            {/* 3. Pasarela de Pago */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <span className="text-xs font-mono font-bold text-neutral-400">[03]</span>
                <h2 className="text-xs font-mono font-black uppercase tracking-widest text-black">
                  Método de Pago
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <label
                  className={`p-4 border flex flex-col justify-between cursor-pointer transition-all ${
                    formData.paymentGateway === 'webpay'
                      ? 'border-black bg-neutral-50 ring-1 ring-black'
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <CreditCard className="w-5 h-5 text-black" />
                    <input
                      type="radio"
                      name="paymentGateway"
                      value="webpay"
                      checked={formData.paymentGateway === 'webpay'}
                      onChange={handleChange}
                      className="accent-black"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="font-bold text-xs text-black font-mono uppercase">Webpay Plus</p>
                    <p className="text-[10px] text-neutral-500">Débito y Crédito</p>
                  </div>
                </label>

                <label
                  className={`p-4 border flex flex-col justify-between cursor-pointer transition-all ${
                    formData.paymentGateway === 'mercadopago'
                      ? 'border-black bg-neutral-50 ring-1 ring-black'
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-xs text-black">MP</span>
                    <input
                      type="radio"
                      name="paymentGateway"
                      value="mercadopago"
                      checked={formData.paymentGateway === 'mercadopago'}
                      onChange={handleChange}
                      className="accent-black"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="font-bold text-xs text-black font-mono uppercase">Mercado Pago</p>
                    <p className="text-[10px] text-neutral-500">Tarjetas & Saldo</p>
                  </div>
                </label>

                <label
                  className={`p-4 border flex flex-col justify-between cursor-pointer transition-all ${
                    formData.paymentGateway === 'transferencia'
                      ? 'border-black bg-neutral-50 ring-1 ring-black'
                      : 'border-neutral-200 bg-white hover:border-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-xs text-neutral-800">0%</span>
                    <input
                      type="radio"
                      name="paymentGateway"
                      value="transferencia"
                      checked={formData.paymentGateway === 'transferencia'}
                      onChange={handleChange}
                      className="accent-black"
                    />
                  </div>
                  <div className="mt-4">
                    <p className="font-bold text-xs text-black font-mono uppercase">Transferencia</p>
                    <p className="text-[10px] text-neutral-500">Cta. Corriente Directa</p>
                  </div>
                </label>
              </div>
            </section>
          </div>

          {/* Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#FAFAFA] border border-neutral-200 p-6 space-y-6">
              <h3 className="text-xs font-mono font-black uppercase tracking-widest text-black pb-3 border-b border-neutral-200">
                Resumen de la Bolsa ({items.length})
              </h3>

              {/* Items list */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                {items.map((i) => (
                  <div key={i.variant_id} className="flex items-center gap-3 text-xs bg-white p-2.5 border border-neutral-200/80">
                    <img src={i.image} alt={i.product_name} className="w-12 h-14 object-cover bg-neutral-100" />
                    <div className="flex-1">
                      <p className="font-bold text-black line-clamp-1">{i.product_name}</p>
                      <p className="text-[10px] font-mono text-neutral-500 uppercase">
                        {i.quantity} × ${i.unit_price.toLocaleString('es-CL')} ({i.variant_title})
                      </p>
                    </div>
                    <span className="font-mono font-bold text-black">
                      ${(i.unit_price * i.quantity).toLocaleString('es-CL')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculations */}
              <div className="border-t border-neutral-200 pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Despacho</span>
                  <span>
                    {shippingCost === 0 ? (
                      <span className="font-bold text-black uppercase text-[10px]">Gratis</span>
                    ) : (
                      `$${shippingCost.toLocaleString('es-CL')}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-black pt-3 border-t border-neutral-200">
                  <span className="uppercase">Total a Pagar</span>
                  <span className="text-base">${total.toLocaleString('es-CL')} CLP</span>
                </div>
              </div>

              {/* Arc'teryx black solid button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-mono uppercase tracking-widest text-xs py-4 px-6 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-50 shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirmando Orden...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirmar y Pagar ${total.toLocaleString('es-CL')}</span>
                  </>
                )}
              </button>

              <div className="text-[10px] font-mono text-neutral-400 text-center leading-relaxed">
                <span>Confirmación inmediata y seguimiento vía WhatsApp y Courier</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
