'use client';

import React, { useState, useEffect } from 'react';
import { getCustomers } from '@/lib/ecommerce/orders';
import { Customer } from '@/types/ecommerce';
import {
  Users,
  Search,
  MessageCircle,
  Crown,
  Sparkles,
  ShoppingBag,
  MapPin,
  TrendingUp,
  Clock,
  Filter,
} from 'lucide-react';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('all');

  useEffect(() => {
    async function fetchCrm() {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
      setLoading(false);
    }
    fetchCrm();
  }, []);

  const filtered = customers.filter((c) => {
    const matchesSegment = segmentFilter === 'all' || c.segment === segmentFilter;
    const matchesSearch =
      c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.city && c.city.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSegment && matchesSearch;
  });

  const getSegmentBadge = (segment: Customer['segment']) => {
    switch (segment) {
      case 'vip':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Crown className="w-3 h-3 fill-amber-500 text-amber-500" /> VIP
          </span>
        );
      case 'recurring':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
            <TrendingUp className="w-3 h-3" /> Recurrente
          </span>
        );
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <Sparkles className="w-3 h-3" /> Nuevo
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded-full">
            Inactivo
          </span>
        );
    }
  };

  const totalSpentAll = customers.reduce((acc, c) => acc + c.total_spent, 0);
  const avgOrderValue = totalSpentAll / Math.max(1, customers.reduce((acc, c) => acc + c.orders_count, 0));

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-6 border-b border-zinc-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-md">
            CRM Omnicanal
          </span>
          <span className="text-xs text-zinc-500">Perfilado & Segmentación RFM Automática</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight mt-1">
          Directorio de Clientes
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Perfiles creados de manera invisible tras cada checkout con cálculo de LTV y engagement.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-zinc-200/80 p-4 rounded-xl shadow-sm">
          <p className="text-[11px] font-bold text-zinc-500 uppercase">Total Clientes</p>
          <p className="text-2xl font-black text-zinc-900 mt-1">{customers.length}</p>
        </div>
        <div className="bg-white border border-zinc-200/80 p-4 rounded-xl shadow-sm">
          <p className="text-[11px] font-bold text-amber-600 uppercase">Clientes VIP</p>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {customers.filter((c) => c.segment === 'vip').length}
          </p>
        </div>
        <div className="bg-white border border-zinc-200/80 p-4 rounded-xl shadow-sm">
          <p className="text-[11px] font-bold text-zinc-500 uppercase">LTV Acumulado</p>
          <p className="text-2xl font-black text-zinc-900 mt-1 font-mono">
            ${totalSpentAll.toLocaleString('es-CL')}
          </p>
        </div>
        <div className="bg-white border border-zinc-200/80 p-4 rounded-xl shadow-sm">
          <p className="text-[11px] font-bold text-emerald-600 uppercase">Ticket Promedio (AOV)</p>
          <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">
            ${Math.round(avgOrderValue).toLocaleString('es-CL')}
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-zinc-200/80 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-sm border border-zinc-300 rounded-lg px-3 py-1.5 bg-zinc-50">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, email, teléfono o ciudad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Segmento:
          </span>
          {['all', 'vip', 'recurring', 'new'].map((seg) => (
            <button
              key={seg}
              onClick={() => setSegmentFilter(seg)}
              className={`text-xs px-3 py-1 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                segmentFilter === seg
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {seg === 'all' ? 'Todos' : seg}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-zinc-200/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Contacto</th>
                <th className="py-3 px-4">Ubicación</th>
                <th className="py-3 px-4">Órdenes</th>
                <th className="py-3 px-4">LTV Total</th>
                <th className="py-3 px-4">Segmento</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filtered.map((customer) => {
                const whatsappUrl = `https://wa.me/${customer.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Hola ${customer.full_name}, te saludamos de Mercenario.`
                )}`;

                return (
                  <tr key={customer.id} className="hover:bg-zinc-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-zinc-900">
                      {customer.full_name}
                      {customer.rut_dni && (
                        <span className="block text-[10px] font-mono text-zinc-400">{customer.rut_dni}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-zinc-700">{customer.email}</div>
                      <div className="text-[11px] text-zinc-500 font-mono">{customer.phone}</div>
                    </td>

                    <td className="py-3.5 px-4 text-zinc-600">
                      <div className="font-semibold text-zinc-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {customer.city || 'Santiago'}
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate max-w-[180px]">
                        {customer.address}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-zinc-800">
                      {customer.orders_count} compras
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-zinc-900">
                      ${customer.total_spent.toLocaleString('es-CL')}
                    </td>

                    <td className="py-3.5 px-4">
                      {getSegmentBadge(customer.segment)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-[11px] px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
