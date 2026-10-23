'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/ecommerce/cart-context';
import { createOrder } from '@/lib/ecommerce/orders';
import { 
  ArrowLeft, Lock, CreditCard, CheckCircle2, 
  AlertCircle, Loader2, Truck, ChevronDown, Package
} from 'lucide-react';

// ─── TIPOS LOCALES ────────────────────────────────────────────────────────────

interface ShipitCommune {
  id: number;
  name: string;
  region_name: string;
}

interface CourierRate {
  courier_id: number;
  courier_name: string;
  service_name: string;
  total_price: number;
  estimated_days: number;
}

// ─── COMUNAS DE FALLBACK (para cuando Shipit no está configurado aún) ─────────
const FALLBACK_COMMUNES: ShipitCommune[] = [
  { id: 306, name: 'Las Condes', region_name: 'Región Metropolitana' },
  { id: 307, name: 'Providencia', region_name: 'Región Metropolitana' },
  { id: 308, name: 'Vitacura', region_name: 'Región Metropolitana' },
  { id: 309, name: 'Lo Barnechea', region_name: 'Región Metropolitana' },
  { id: 310, name: 'Santiago', region_name: 'Región Metropolitana' },
  { id: 311, name: 'Ñuñoa', region_name: 'Región Metropolitana' },
  { id: 312, name: 'La Florida', region_name: 'Región Metropolitana' },
  { id: 313, name: 'Maipú', region_name: 'Región Metropolitana' },
  { id: 314, name: 'Pudahuel', region_name: 'Región Metropolitana' },
  { id: 315, name: 'La Reina', region_name: 'Región Metropolitana' },
  { id: 316, name: 'Macul', region_name: 'Región Metropolitana' },
  { id: 317, name: 'Peñalolén', region_name: 'Región Metropolitana' },
  { id: 318, name: 'Quilicura', region_name: 'Región Metropolitana' },
  { id: 319, name: 'San Miguel', region_name: 'Región Metropolitana' },
  { id: 320, name: 'Valparaíso', region_name: 'Valparaíso' },
  { id: 321, name: 'Viña del Mar', region_name: 'Valparaíso' },
  { id: 322, name: 'Concepción', region_name: 'Biobío' },
  { id: 323, name: 'Temuco', region_name: 'Araucanía' },
  { id: 324, name: 'Antofagasta', region_name: 'Antofagasta' },
  { id: 325, name: 'Puerto Montt', region_name: 'Los Lagos' },
  { id: 326, name: 'Rancagua', region_name: 'O\'Higgins' },
  { id: 327, name: 'Talca', region_name: 'Maule' },
  { id: 328, name: 'Iquique', region_name: 'Tarapacá' },
  { id: 329, name: 'La Serena', region_name: 'Coquimbo' },
  { id: 330, name: 'Arica', region_name: 'Arica y Parinacota' },
];

// ─── HELPER ───────────────────────────────────────────────────────────────────

const courierLogos: Record<string, string> = {
  Starken: '★',
  Chilexpress: '⚡',
  'Blue Express': '◆',
  'Correos de Chile': '✉',
  Shippify: '⚡',
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Comunas
  const [communes, setCommunes] = useState<ShipitCommune[]>([]);
  const [communeSearch, setCommuneSearch] = useState('');
  const [showCommuneList, setShowCommuneList] = useState(false);
  const [selectedCommune, setSelectedCommune] = useState<ShipitCommune | null>(null);

  // Cotización courier
  const [quotingRates, setQuotingRates] = useState(false);
  const [courierRates, setCourierRates] = useState<CourierRate[]>([]);
  const [selectedRate, setSelectedRate] = useState<CourierRate | null>(null);

  // Cálculos dinámicos
  const FREE_SHIPPING_THRESHOLD = 100000;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : (selectedRate?.total_price ?? 0);
  const total = subtotal + shippingCost;

  // Form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rut: '',
    street: '',
    streetNumber: '',
    notes: '',
    paymentGateway: 'webpay' as 'webpay' | 'mercadopago' | 'transferencia',
  });

  // ─── CARGA DE COMUNAS ─────────────────────────────────────────────────────

  useEffect(() => {
    async function loadCommunes() {
      try {
        const res = await fetch('/api/shipping/communes');
        if (res.ok) {
          const data = await res.json();
          setCommunes(data.communes?.length ? data.communes : FALLBACK_COMMUNES);
        } else {
          setCommunes(FALLBACK_COMMUNES);
        }
      } catch {
        setCommunes(FALLBACK_COMMUNES);
      }
    }
    loadCommunes();
  }, []);

  // ─── COTIZACIÓN EN TIEMPO REAL ────────────────────────────────────────────

  const quoteRates = useCallback(async (communeId: number) => {
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      setCourierRates([{ courier_id: 0, courier_name: 'Envío Gratis', service_name: '¡Lo alcanzaste!', total_price: 0, estimated_days: 3 }]);
      setSelectedRate({ courier_id: 0, courier_name: 'Envío Gratis', service_name: '¡Lo alcanzaste!', total_price: 0, estimated_days: 3 });
      return;
    }

    setQuotingRates(true);
    setCourierRates([]);
    setSelectedRate(null);
    try {
      const res = await fetch('/api/shipping/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destiny_commune_id: communeId,
          weight: 1,
          height: 10,
          width: 15,
          length: 20,
        }),
      });
      const data = await res.json();
      const rates: CourierRate[] = data.rates || [];
      setCourierRates(rates);
      if (rates.length > 0) setSelectedRate(rates[0]);
    } catch {
      // Fallback local si la API falla
      const fallbackRates: CourierRate[] = [
        { courier_id: 1, courier_name: 'Starken', service_name: 'Estándar', total_price: 4990, estimated_days: 3 },
        { courier_id: 2, courier_name: 'Chilexpress', service_name: 'Económico', total_price: 3990, estimated_days: 5 },
      ];
      setCourierRates(fallbackRates);
      setSelectedRate(fallbackRates[0]);
    } finally {
      setQuotingRates(false);
    }
  }, [subtotal]);

  const handleCommuneSelect = (commune: ShipitCommune) => {
    setSelectedCommune(commune);
    setCommuneSearch(commune.name);
    setShowCommuneList(false);
    quoteRates(commune.id);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ─── FILTRADO DE COMUNAS ──────────────────────────────────────────────────

  const filteredCommunes = communes.filter((c) =>
    c.name.toLowerCase().includes(communeSearch.toLowerCase())
  ).slice(0, 10);

  // ─── SUBMIT ───────────────────────────────────────────────────────────────

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
    if (!selectedCommune) {
      setErrorMessage('Selecciona una comuna de destino para calcular el envío.');
      return;
    }
    if (!selectedRate) {
      setErrorMessage('Selecciona un courier para continuar.');
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
          street: `${formData.street} ${formData.streetNumber}`.trim(),
          city: selectedCommune.name,
          region: selectedCommune.region_name,
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
          `/tienda/orden-confirmada?orderId=${res.order.id}&number=${res.order.order_number}&total=${res.order.total_amount}&name=${encodeURIComponent(res.order.customer_name)}&courier=${encodeURIComponent(selectedRate.courier_name)}`
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

  // ─── CARRITO VACÍO ────────────────────────────────────────────────────────

  if (items.length === 0 && !loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-28 text-center space-y-4 bg-white text-neutral-900">
        <h1 className="text-2xl font-black uppercase tracking-tight text-black">Tu bolsa está vacía</h1>
        <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
          Añade productos antes de finalizar el pedido.
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

  // ─── RENDER ───────────────────────────────────────────────────────────────

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

          {/* ── COLUMNA IZQUIERDA: Formulario ─────────────────────────────── */}
          <div className="lg:col-span-7 space-y-10">

            {/* [01] Identificación */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <span className="text-xs font-mono font-bold text-neutral-400">[01]</span>
                <h2 className="text-xs font-mono font-black uppercase tracking-widest text-black">
                  Identificación &amp; Contacto
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">Nombre Completo *</label>
                  <input type="text" name="fullName" required placeholder="Francisca Valenzuela"
                    value={formData.fullName} onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">RUT / DNI (Opcional)</label>
                  <input type="text" name="rut" placeholder="12.345.678-9"
                    value={formData.rut} onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">Correo Electrónico *</label>
                  <input type="email" name="email" required placeholder="contacto@empresa.cl"
                    value={formData.email} onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black" />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">Teléfono (WhatsApp) *</label>
                  <input type="tel" name="phone" required placeholder="+56 9 8765 4321"
                    value={formData.phone} onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black" />
                </div>
              </div>
            </section>

            {/* [02] Dirección de Entrega */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <span className="text-xs font-mono font-bold text-neutral-400">[02]</span>
                <h2 className="text-xs font-mono font-black uppercase tracking-widest text-black">
                  Dirección de Entrega
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Calle */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">Calle / Av. *</label>
                  <input type="text" name="street" required placeholder="Av. Tabancura"
                    value={formData.street} onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black" />
                </div>

                {/* Número */}
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">Número / Depto</label>
                  <input type="text" name="streetNumber" placeholder="1091 Depto 402"
                    value={formData.streetNumber} onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black" />
                </div>

                {/* COMUNA: Buscador con dropdown */}
                <div className="sm:col-span-2 relative">
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">
                    Comuna *
                    {selectedCommune && (
                      <span className="ml-2 text-emerald-600 font-bold">✓ {selectedCommune.region_name}</span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Escribe tu comuna (ej: Las Condes, Providencia...)"
                      value={communeSearch}
                      onChange={(e) => {
                        setCommuneSearch(e.target.value);
                        setShowCommuneList(true);
                        if (!e.target.value) {
                          setSelectedCommune(null);
                          setCourierRates([]);
                          setSelectedRate(null);
                        }
                      }}
                      onFocus={() => setShowCommuneList(true)}
                      className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 pr-10 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                    />
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                  </div>

                  {/* Dropdown de comunas */}
                  {showCommuneList && communeSearch.length >= 2 && filteredCommunes.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-50 bg-white border border-neutral-300 border-t-0 shadow-xl max-h-52 overflow-y-auto">
                      {filteredCommunes.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => handleCommuneSelect(c)}
                          className="w-full text-left px-4 py-2.5 text-xs hover:bg-neutral-50 transition-colors flex items-center justify-between group"
                        >
                          <span className="font-bold text-black">{c.name}</span>
                          <span className="text-neutral-400 text-[10px] font-mono">{c.region_name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Instrucciones */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1">Instrucciones (Opcional)</label>
                  <input type="text" name="notes" placeholder="Dejar en conserjería, timbre B..."
                    value={formData.notes} onChange={handleChange}
                    className="w-full bg-white border border-neutral-300 px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black" />
                </div>
              </div>
            </section>

            {/* [03] SELECCIÓN DE COURIER (aparece solo cuando se elige una comuna) */}
            {(quotingRates || courierRates.length > 0) && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                  <span className="text-xs font-mono font-bold text-neutral-400">[03]</span>
                  <h2 className="text-xs font-mono font-black uppercase tracking-widest text-black">
                    Opción de Envío
                  </h2>
                </div>

                {quotingRates ? (
                  // Estado: Cotizando...
                  <div className="flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-600">
                    <Loader2 className="w-4 h-4 animate-spin text-black" />
                    <span>Cotizando tarifas de envío para <strong>{communeSearch}</strong>...</span>
                  </div>
                ) : (
                  // Estado: Resultados de cotización
                  <div className="space-y-2 pt-1">
                    {courierRates.map((rate) => (
                      <label
                        key={rate.courier_id}
                        className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                          selectedRate?.courier_id === rate.courier_id
                            ? 'border-black bg-neutral-50 ring-1 ring-black'
                            : 'border-neutral-200 bg-white hover:border-neutral-400'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="courierRate"
                            value={rate.courier_id}
                            checked={selectedRate?.courier_id === rate.courier_id}
                            onChange={() => setSelectedRate(rate)}
                            className="accent-black"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono">
                                {courierLogos[rate.courier_name] || '📦'}
                              </span>
                              <p className="text-xs font-bold text-black uppercase font-mono">
                                {rate.courier_name}
                              </p>
                              <span className="text-[10px] text-neutral-400 font-mono">
                                {rate.service_name}
                              </span>
                            </div>
                            <p className="text-[10px] text-neutral-500 mt-0.5 flex items-center gap-1">
                              <Truck className="w-3 h-3" />
                              {rate.estimated_days === 1 ? '1 día hábil' : `${rate.estimated_days} días hábiles`}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {rate.total_price === 0 ? (
                            <span className="text-xs font-black text-emerald-600 font-mono uppercase">GRATIS</span>
                          ) : (
                            <span className="text-sm font-black text-black font-mono">
                              ${rate.total_price.toLocaleString('es-CL')}
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* [04] Método de Pago */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <span className="text-xs font-mono font-bold text-neutral-400">
                  [{courierRates.length > 0 ? '04' : '03'}]
                </span>
                <h2 className="text-xs font-mono font-black uppercase tracking-widest text-black">
                  Método de Pago
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { value: 'webpay', label: 'Webpay Plus', sub: 'Débito y Crédito', icon: <CreditCard className="w-5 h-5 text-black" /> },
                  { value: 'mercadopago', label: 'Mercado Pago', sub: 'Tarjetas & Saldo', icon: <span className="font-mono font-black text-xs text-black">MP</span> },
                  { value: 'transferencia', label: 'Transferencia', sub: 'Cta. Corriente Directa', icon: <span className="font-mono font-black text-xs text-neutral-800">0%</span> },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`p-4 border flex flex-col justify-between cursor-pointer transition-all ${
                      formData.paymentGateway === opt.value
                        ? 'border-black bg-neutral-50 ring-1 ring-black'
                        : 'border-neutral-200 bg-white hover:border-neutral-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {opt.icon}
                      <input type="radio" name="paymentGateway" value={opt.value}
                        checked={formData.paymentGateway === opt.value}
                        onChange={handleChange} className="accent-black" />
                    </div>
                    <div className="mt-4">
                      <p className="font-bold text-xs text-black font-mono uppercase">{opt.label}</p>
                      <p className="text-[10px] text-neutral-500">{opt.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* ── COLUMNA DERECHA: Resumen del Pedido ───────────────────────── */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-[#FAFAFA] border border-neutral-200 p-6 space-y-6">
              <h3 className="text-xs font-mono font-black uppercase tracking-widest text-black pb-3 border-b border-neutral-200">
                Resumen del Pedido ({items.length})
              </h3>

              {/* Items */}
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

              {/* Totales dinámicos */}
              <div className="border-t border-neutral-200 pt-4 space-y-2 text-xs font-mono">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString('es-CL')}</span>
                </div>

                <div className="flex justify-between text-neutral-600 items-center">
                  <span>Despacho</span>
                  <span>
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <span className="font-bold text-emerald-600 uppercase text-[10px]">GRATIS</span>
                    ) : selectedRate ? (
                      selectedRate.total_price === 0
                        ? <span className="font-bold text-emerald-600 uppercase text-[10px]">GRATIS</span>
                        : `$${selectedRate.total_price.toLocaleString('es-CL')}`
                    ) : quotingRates ? (
                      <span className="flex items-center gap-1 text-neutral-400">
                        <Loader2 className="w-3 h-3 animate-spin" /> Cotizando...
                      </span>
                    ) : (
                      <span className="text-neutral-400">— Selecciona comuna</span>
                    )}
                  </span>
                </div>

                {selectedRate && (
                  <div className="flex justify-between text-neutral-400 text-[10px]">
                    <span></span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3" />
                      {selectedRate.courier_name} · {selectedRate.estimated_days}d hábiles
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm font-black text-black pt-3 border-t border-neutral-200">
                  <span className="uppercase">Total a Pagar</span>
                  <span className="text-base">
                    {selectedRate || subtotal >= FREE_SHIPPING_THRESHOLD
                      ? `$${total.toLocaleString('es-CL')} CLP`
                      : <span className="text-neutral-400 text-sm font-mono">Elige commune</span>
                    }
                  </span>
                </div>
              </div>

              {/* Botón de pago */}
              <button
                type="submit"
                disabled={loading || (!selectedRate && subtotal < FREE_SHIPPING_THRESHOLD)}
                className="w-full flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-mono uppercase tracking-widest text-xs py-4 px-6 transition-all active:scale-[0.99] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Confirmando Orden...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {selectedRate || subtotal >= FREE_SHIPPING_THRESHOLD
                        ? `Confirmar y Pagar $${total.toLocaleString('es-CL')}`
                        : 'Selecciona tu comuna primero'
                      }
                    </span>
                  </>
                )}
              </button>

              <div className="text-[10px] font-mono text-neutral-400 text-center leading-relaxed">
                <span>Confirmación inmediata · Seguimiento por WhatsApp · Despacho a todo Chile</span>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
