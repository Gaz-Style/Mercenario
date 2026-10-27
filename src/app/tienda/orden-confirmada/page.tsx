import React from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageCircle, Package, Home } from 'lucide-react';

export default async function OrdenConfirmadaPage({
  searchParams,
}: {
  searchParams: Promise<{
    orderId?: string;
    number?: string;
    total?: string;
    name?: string;
  }>;
}) {
  const resolved = await searchParams;
  const orderNumber = resolved?.number || '1042';
  const total = Number(resolved?.total || 149990);
  const customerName = resolved?.name ? decodeURIComponent(resolved.name) : 'Estimado Cliente';

  const whatsappMessage = encodeURIComponent(
    `Hola, acabo de realizar la orden #${orderNumber} por $${total.toLocaleString(
      'es-CL'
    )}. ¡Gracias!`
  );

  return (
    <div className="bg-white min-h-screen text-neutral-900 font-sans py-16 px-4 sm:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Minimal Icon */}
        <div className="w-16 h-16 bg-neutral-100 border border-neutral-200 text-black flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 stroke-[2]" />
        </div>

        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-2">
          // PAGO APROBADO & REGISTRADO
        </span>

        <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight uppercase">
          Gracias por tu orden, {customerName}
        </h1>

        <p className="text-neutral-500 text-xs sm:text-sm max-w-md mx-auto mt-3 font-light leading-relaxed">
          Orden <span className="font-mono font-bold text-black">#{orderNumber}</span> confirmada. Hemos
          despachado la confirmación a tu WhatsApp y correo electrónico.
        </p>

        {/* Order Card */}
        <div className="my-10 bg-[#FAFAFA] border border-neutral-200 p-8 text-left space-y-5 max-w-md mx-auto">
          <div className="flex justify-between items-center text-xs pb-4 border-b border-neutral-200 font-mono">
            <span className="text-neutral-500 uppercase">Monto Facturado</span>
            <span className="text-base font-black text-black">
              ${total.toLocaleString('es-CL')} CLP
            </span>
          </div>

          {/* Minimal Timeline */}
          <div className="space-y-3 pt-2">
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
              Estado de Despacho:
            </p>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              <span className="text-xs font-mono font-bold text-black">1. Pago Aprobado (ERP sincronizado)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse"></span>
              <span className="text-xs font-mono text-neutral-700">2. En Preparación en Bodega Central</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-neutral-300"></span>
              <span className="text-xs font-mono text-neutral-400">3. Retiro Courier (Chilexpress / Starken)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-neutral-300"></span>
              <span className="text-xs font-mono text-neutral-400">4. Entrega en Domicilio</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <a
            href={`https://wa.me/56957958467?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-mono font-bold uppercase tracking-wider text-xs py-3.5 px-6 shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Soporte WhatsApp</span>
          </a>

          <Link
            href="/admin/ecommerce/pedidos"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white font-mono font-bold uppercase tracking-wider text-xs py-3.5 px-6"
          >
            <Package className="w-4 h-4" />
            <span>Ver en ERP</span>
          </Link>
        </div>

        <div className="mt-8">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Volver a la tienda</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
