'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Settings,
  Store,
  Truck,
  CreditCard,
  Phone,
  Mail,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Save,
  Building,
  DollarSign,
  MapPin,
  Clock,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function StoreSettingsPage() {
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    storeName: 'WEKE Studio',
    tagline: 'Equipamiento Técnico y Confección de Alto Rendimiento',
    supportEmail: 'contacto@mercenariostudio.cl',
    supportWhatsapp: '+56 9 8765 4321',
    city: 'Santiago, Chile',
    freeShippingThreshold: 100000,
    flatShippingRate: 4990,
    deliveryEstimate: '24 a 48 horas hábiles vía Courier',
    // ── Retiro en Tienda ──────────────────────────────────────────────────────
    pickupEnabled: false,
    pickupAddress: '',
    pickupCommune: '',
    pickupSchedule: '',
    pickupNote: '',
    // ─────────────────────────────────────────────────────────────────────────
    bankName: 'Banco Santander',
    accountType: 'Cuenta Corriente',
    accountNumber: '78-987654-2',
    accountHolder: 'Mercenario SpA',
    accountRut: '77.890.123-K',
    transferEmail: 'pagos@mercenariostudio.cl',
    webpayEnabled: true,
    transferEnabled: true,
  });

  useEffect(() => {
    async function loadInitial() {
      const local = localStorage.getItem('mercenario_store_settings');
      if (local) {
        try {
          setSettings(JSON.parse(local));
          return;
        } catch (e) {
          console.warn('Error reading store settings', e);
        }
      }
      try {
        const res = await fetch('/api/store/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings((prev) => ({
            ...prev,
            pickupEnabled: data.pickupEnabled ?? prev.pickupEnabled,
            pickupAddress: data.pickupAddress || prev.pickupAddress,
            pickupCommune: data.pickupCommune || prev.pickupCommune,
            pickupSchedule: data.pickupSchedule || prev.pickupSchedule,
            pickupNote: data.pickupNote || prev.pickupNote,
          }));
        }
      } catch (err) {
        console.warn('Could not fetch /api/store/settings', err);
      }
    }
    loadInitial();
  }, []);

  const handleChange = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mercenario_store_settings', JSON.stringify(settings));

    try {
      await fetch('/api/store/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pickupEnabled: settings.pickupEnabled,
          pickupAddress: settings.pickupAddress,
          pickupCommune: settings.pickupCommune,
          pickupSchedule: settings.pickupSchedule,
          pickupNote: settings.pickupNote,
        }),
      });
    } catch (err) {
      console.warn('Could not post to /api/store/settings', err);
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50/40 font-sans text-zinc-900 pb-16">
      <main className="max-w-5xl mx-auto px-6 md:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold">
              <Settings className="w-3.5 h-3.5" />
              <span>Back-Office · Configuración General</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
              Ajustes de la Tienda
            </h1>
            <p className="text-zinc-500 text-xs mt-1">
              Personaliza la identidad de tu marca, datos de despacho, canales de soporte y cuentas de pago.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/tienda"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-300 hover:border-black rounded-lg transition-all shadow-sm"
            >
              <span>Ver Tienda</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-zinc-800 rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>Configuración guardada exitosamente. Los cambios se aplican de inmediato en la tienda.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          {/* 1. Identidad de la Marca */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 font-bold">
                <Store className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900">Identidad & Contacto de la Tienda</h2>
                <p className="text-xs text-zinc-500">Datos públicos que verán los clientes en la tienda y comprobantes.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-zinc-50 border border-zinc-200 rounded-xl">
              <div className="w-16 h-16 rounded-xl bg-white border border-zinc-200 flex items-center justify-center p-2 shadow-sm flex-shrink-0">
                <img
                  src="/images/weke-logo.png"
                  alt="WEKE Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Logotipo Oficial de la Empresa</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Activo y sincronizado en la tienda pública y panel de administración.</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 font-bold mt-1">
                  ✓ public/images/weke-logo.png
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  Nombre Comercial de la Tienda
                </label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => handleChange('storeName', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                  placeholder="Ej: WEKE Studio"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  Eslogan o Descripción Corta
                </label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                  placeholder="Ej: Ropa técnica de montaña"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Correo de Notificaciones & Soporte
                </label>
                <input
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleChange('supportEmail', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                  placeholder="contacto@tutienda.cl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> WhatsApp Oficial de Ventas & Post-Venta
                </label>
                <input
                  type="text"
                  value={settings.supportWhatsapp}
                  onChange={(e) => handleChange('supportWhatsapp', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                  placeholder="+56 9 1234 5678"
                />
              </div>
            </div>
          </div>

          {/* 2. Envíos y Logística */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 font-bold">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900">Envíos & Logística</h2>
                <p className="text-xs text-zinc-500">Tarifas y condiciones para el cálculo de despacho al cliente.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  Costo Despacho Estándar ($ CLP)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">$</span>
                  <input
                    type="number"
                    value={settings.flatShippingRate}
                    onChange={(e) => handleChange('flatShippingRate', Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  Envío Gratis sobre ($ CLP)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-zinc-400 font-bold">$</span>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => handleChange('freeShippingThreshold', Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  Promesa de Entrega Visible
                </label>
                <input
                  type="text"
                  value={settings.deliveryEstimate}
                  onChange={(e) => handleChange('deliveryEstimate', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                  placeholder="Ej: 24/48h vía Chilexpress"
                />
              </div>
            </div>
          </div>

          {/* 2b. Retiro en Tienda Física */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900">Retiro en Tienda Física</h2>
                  <p className="text-xs text-zinc-500">Si tienes local físico, activa esta opción para que el cliente pueda retirar su pedido sin costo de envío.</p>
                </div>
              </div>
              {/* Toggle principal */}
              <button
                type="button"
                onClick={() => handleChange('pickupEnabled', !settings.pickupEnabled)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  settings.pickupEnabled
                    ? 'bg-black text-white'
                    : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                }`}
              >
                {settings.pickupEnabled
                  ? <><ToggleRight className="w-4 h-4" /> Activado</>
                  : <><ToggleLeft className="w-4 h-4" /> Desactivado</>}
              </button>
            </div>

            {settings.pickupEnabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Dirección Exacta del Local
                  </label>
                  <input
                    type="text"
                    value={settings.pickupAddress}
                    onChange={(e) => handleChange('pickupAddress', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                    placeholder="Ej: Av. Vitacura 2939, Local 4"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                    Comuna
                  </label>
                  <input
                    type="text"
                    value={settings.pickupCommune}
                    onChange={(e) => handleChange('pickupCommune', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                    placeholder="Ej: Vitacura, Las Condes"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Horario de Retiro
                  </label>
                  <input
                    type="text"
                    value={settings.pickupSchedule}
                    onChange={(e) => handleChange('pickupSchedule', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                    placeholder="Ej: Lun-Vie 10:00 a 19:00 · Sáb 10:00 a 14:00"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                    Nota Visible en el Checkout (Instrucciones para el cliente)
                  </label>
                  <input
                    type="text"
                    value={settings.pickupNote}
                    onChange={(e) => handleChange('pickupNote', e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                    placeholder="Ej: Traer RUT y número de orden. Pedido listo en 2h hábiles."
                  />
                </div>

                <div className="md:col-span-2 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Retiro activado:</strong> Los clientes verán la opción «Retiro en Tienda (Gratis)» en el checkout junto a las opciones de courier.
                    Al elegir esta opción, el costo de envío es $0 y recibirán instrucciones de retiro por WhatsApp.
                  </span>
                </div>
              </div>
            )}

            {!settings.pickupEnabled && (
              <p className="text-xs text-zinc-400 font-mono">
                Activa esta opción si tienes un local físico donde el cliente puede buscar su pedido sin pagar despacho.
              </p>
            )}
          </div>

          {/* 3. Pagos y Datos de Transferencia */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="w-9 h-9 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 font-bold">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-zinc-900">Métodos de Pago & Transferencia Bancaria</h2>
                <p className="text-xs text-zinc-500">Datos que se muestran al cliente al finalizar la compra por transferencia.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  Banco Destino
                </label>
                <input
                  type="text"
                  value={settings.bankName}
                  onChange={(e) => handleChange('bankName', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                  placeholder="Ej: Banco de Chile, Santander, BCI"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  Tipo de Cuenta
                </label>
                <input
                  type="text"
                  value={settings.accountType}
                  onChange={(e) => handleChange('accountType', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                  placeholder="Ej: Cuenta Corriente / Cuenta Vista"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  Número de Cuenta
                </label>
                <input
                  type="text"
                  value={settings.accountNumber}
                  onChange={(e) => handleChange('accountNumber', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all font-mono"
                  placeholder="Ej: 12345678"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  Titular de la Cuenta
                </label>
                <input
                  type="text"
                  value={settings.accountHolder}
                  onChange={(e) => handleChange('accountHolder', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                  placeholder="Ej: Nombre Empresa SpA"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  RUT del Titular
                </label>
                <input
                  type="text"
                  value={settings.accountRut}
                  onChange={(e) => handleChange('accountRut', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all font-mono"
                  placeholder="Ej: 76.543.210-K"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-2">
                  Email Receptor de Comprobantes
                </label>
                <input
                  type="email"
                  value={settings.transferEmail}
                  onChange={(e) => handleChange('transferEmail', e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black transition-all"
                  placeholder="pagos@tutienda.cl"
                />
              </div>
            </div>
          </div>

          {/* Botón Inferior */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white bg-black hover:bg-zinc-800 rounded-xl transition-all shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Todos los Ajustes</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
