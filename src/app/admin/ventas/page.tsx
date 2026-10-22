'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Download,
  Printer,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  CreditCard,
  Banknote,
  Store,
  Globe,
  Calendar,
  ArrowUpRight,
  RefreshCw,
  FileText
} from 'lucide-react';
import { getPosSales, PosSale } from '@/lib/ecommerce/pos';
import { getOrders } from '@/lib/ecommerce/orders';
import { Order } from '@/types/ecommerce';

interface UnifiedSaleRow {
  id: string;
  receiptNumber: string;
  date: string;
  channel: 'pos' | 'online';
  customerName: string;
  customerRut?: string;
  paymentMethod: string;
  itemsSummary: string;
  subtotalNeto: number;
  iva: number;
  totalBruto: number;
  status: string;
}

export default function SalesSpreadsheetPage() {
  const [sales, setSales] = useState<UnifiedSaleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [channelFilter, setChannelFilter] = useState<'all' | 'pos' | 'online'>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<'all' | 'today' | 'week' | 'month'>('all');

  const loadData = async () => {
    setLoading(true);
    const [posList, onlineOrders] = await Promise.all([
      Promise.resolve(getPosSales()),
      getOrders(),
    ]);

    const posRows: UnifiedSaleRow[] = posList.map((p) => ({
      id: p.id,
      receiptNumber: p.receiptNumber,
      date: p.timestamp,
      channel: 'pos',
      customerName: p.customerName,
      customerRut: p.customerRut || '66.666.666-6',
      paymentMethod: p.paymentMethod === 'tarjeta' ? 'Tarjeta POS' : p.paymentMethod === 'efectivo' ? 'Efectivo' : 'Transferencia',
      itemsSummary: p.items.map((i) => `${i.quantity}x ${i.productName}`).join(', '),
      subtotalNeto: p.subtotalNeto,
      iva: p.ivaAmount,
      totalBruto: p.totalAmount,
      status: 'Completada',
    }));

    const onlineRows: UnifiedSaleRow[] = onlineOrders.map((o) => {
      const total = o.total_amount || 0;
      const neto = Math.round(total / 1.19);
      const iva = total - neto;
      return {
        id: o.id,
        receiptNumber: `WEB-${o.order_number}`,
        date: o.created_at,
        channel: 'online',
        customerName: o.customer_name,
        customerRut: 'Online Web',
        paymentMethod: o.payment_gateway === 'webpay' ? 'Webpay Plus' : o.payment_gateway === 'transferencia' ? 'Transferencia' : 'Mercado Pago',
        itemsSummary: (o.items || []).map((i) => `${i.quantity}x ${i.product_title}`).join(', ') || 'Productos varios',
        subtotalNeto: neto,
        iva: iva,
        totalBruto: total,
        status: o.status === 'paid' ? 'Pagada' : o.status === 'shipped' ? 'Despachada' : 'Confirmada',
      };
    });

    const combined = [...posRows, ...onlineRows].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setSales(combined);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter rows
  const filteredSales = sales.filter((s) => {
    const matchChannel = channelFilter === 'all' || s.channel === channelFilter;
    const matchPayment = paymentFilter === 'all' || s.paymentMethod.toLowerCase().includes(paymentFilter.toLowerCase());
    const matchSearch =
      s.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.customerRut && s.customerRut.includes(searchTerm));
    return matchChannel && matchPayment && matchSearch;
  });

  // Financial aggregates
  const totalBruto = filteredSales.reduce((acc, s) => acc + s.totalBruto, 0);
  const totalNeto = filteredSales.reduce((acc, s) => acc + s.subtotalNeto, 0);
  const totalIva = filteredSales.reduce((acc, s) => acc + s.iva, 0);
  const averageTicket = filteredSales.length > 0 ? Math.round(totalBruto / filteredSales.length) : 0;

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredSales.length === 0) return;

    const headers = [
      'Folio',
      'Fecha',
      'Canal',
      'Cliente',
      'RUT',
      'Metodo de Pago',
      'Detalle Items',
      'Monto Neto (CLP)',
      'IVA 19% (CLP)',
      'Total Bruto (CLP)',
      'Estado',
    ];

    const rows = filteredSales.map((s) => [
      `"${s.receiptNumber}"`,
      `"${new Date(s.date).toLocaleString('es-CL')}"`,
      `"${s.channel === 'pos' ? 'Punto de Venta POS' : 'Tienda Online'}"`,
      `"${s.customerName}"`,
      `"${s.customerRut || ''}"`,
      `"${s.paymentMethod}"`,
      `"${s.itemsSummary.replace(/"/g, '""')}"`,
      s.subtotalNeto,
      s.iva,
      s.totalBruto,
      `"${s.status}"`,
    ]);

    const csvContent =
      '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `planilla_ventas_weke_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-zinc-50/40 font-sans text-zinc-900 pb-16">
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 mb-1.5 text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Back-Office ERP · Planilla & Libro de Ventas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950 font-sans">
              Planilla de Ventas
            </h1>
            <p className="text-zinc-500 text-xs mt-1">
              Registro contable consolidado: Tienda Online (E-commerce) + Punto de Venta Físico (POS).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualizar</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-zinc-500" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Excel (CSV)</span>
            </button>
          </div>
        </div>

        {/* Resumen Financiero Consolidado */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white border border-zinc-200/90 p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
              Venta Bruta Total
            </span>
            <p className="text-2xl font-black text-zinc-900 font-mono mt-1.5">
              ${totalBruto.toLocaleString('es-CL')}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">
              ✓ IVA Incluido
            </p>
          </div>

          <div className="bg-white border border-zinc-200/90 p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
              Venta Neta
            </span>
            <p className="text-2xl font-black text-zinc-800 font-mono mt-1.5">
              ${totalNeto.toLocaleString('es-CL')}
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Base imponible
            </p>
          </div>

          <div className="bg-white border border-zinc-200/90 p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
              IVA Débito (19%)
            </span>
            <p className="text-2xl font-black text-blue-600 font-mono mt-1.5">
              ${totalIva.toLocaleString('es-CL')}
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              A declarar al SII
            </p>
          </div>

          <div className="bg-white border border-zinc-200/90 p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
              Ticket Promedio
            </span>
            <p className="text-2xl font-black text-zinc-800 font-mono mt-1.5">
              ${averageTicket.toLocaleString('es-CL')}
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Por transacción
            </p>
          </div>

          <div className="bg-white border border-zinc-200/90 p-4 rounded-2xl shadow-sm col-span-2 lg:col-span-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
              Total Operaciones
            </span>
            <p className="text-2xl font-black text-zinc-800 font-mono mt-1.5">
              {filteredSales.length}
            </p>
            <p className="text-[11px] text-zinc-400 mt-1">
              Online + Showroom
            </p>
          </div>
        </section>

        {/* Filtros de la Planilla */}
        <div className="bg-white p-4 rounded-2xl border border-zinc-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full md:max-w-md">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar por folio (BOL/WEB), cliente o RUT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Canal */}
            <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-xl text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setChannelFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  channelFilter === 'all' ? 'bg-white shadow-sm text-black' : 'text-zinc-500 hover:text-black'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setChannelFilter('pos')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  channelFilter === 'pos' ? 'bg-white shadow-sm text-black' : 'text-zinc-500 hover:text-black'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>POS</span>
              </button>
              <button
                onClick={() => setChannelFilter('online')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  channelFilter === 'online' ? 'bg-white shadow-sm text-black' : 'text-zinc-500 hover:text-black'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Online</span>
              </button>
            </div>

            {/* Medio de Pago */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-2 text-xs font-semibold bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black"
            >
              <option value="all">Medio de Pago: Todos</option>
              <option value="tarjeta">Tarjeta (POS/Webpay)</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
            </select>
          </div>
        </div>

        {/* Tabla Tipo Hoja de Cálculo / Excel */}
        <section className="bg-white border border-zinc-200/90 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-zinc-50/80 border-b border-zinc-200 text-zinc-500 font-mono uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Folio</th>
                  <th className="py-3.5 px-4">Fecha / Hora</th>
                  <th className="py-3.5 px-4">Canal</th>
                  <th className="py-3.5 px-4">Cliente / RUT</th>
                  <th className="py-3.5 px-4">Glosa / Ítems</th>
                  <th className="py-3.5 px-4">Medio Pago</th>
                  <th className="py-3.5 px-4 text-right">Neto ($)</th>
                  <th className="py-3.5 px-4 text-right">IVA 19% ($)</th>
                  <th className="py-3.5 px-4 text-right">Total ($)</th>
                  <th className="py-3.5 px-4 text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 font-sans">
                {filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-10 text-center text-zinc-400 font-mono text-xs">
                      No se encontraron transacciones con los filtros seleccionados.
                    </td>
                  </tr>
                ) : (
                  filteredSales.map((row) => (
                    <tr key={row.id} className="hover:bg-zinc-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-zinc-950 whitespace-nowrap">
                        {row.receiptNumber}
                      </td>
                      <td className="py-3.5 px-4 text-zinc-500 font-mono text-[11px] whitespace-nowrap">
                        {new Date(row.date).toLocaleString('es-CL', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {row.channel === 'pos' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200">
                            <Store className="w-3 h-3 text-zinc-600" /> POS Showroom
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            <Globe className="w-3 h-3 text-blue-600" /> E-commerce
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-zinc-900">{row.customerName}</div>
                        <div className="text-[10px] text-zinc-400 font-mono">{row.customerRut}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-[220px] truncate text-zinc-600" title={row.itemsSummary}>
                        {row.itemsSummary}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-zinc-700 whitespace-nowrap">
                        {row.paymentMethod}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-zinc-600 whitespace-nowrap">
                        ${row.subtotalNeto.toLocaleString('es-CL')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-zinc-600 whitespace-nowrap">
                        ${row.iva.toLocaleString('es-CL')}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-black text-zinc-950 whitespace-nowrap">
                        ${row.totalBruto.toLocaleString('es-CL')}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
