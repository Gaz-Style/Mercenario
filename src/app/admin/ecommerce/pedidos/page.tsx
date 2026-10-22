'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOrders, updateOrderStatus } from '@/lib/ecommerce/orders';
import { Order, OrderStatus } from '@/types/ecommerce';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MessageCircle,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
  ShoppingBag,
  Store,
} from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Modal / Inputs for tracking dispatch
  const [dispatchModal, setDispatchModal] = useState<{
    order: Order | null;
    courier: string;
    trackingNumber: string;
  }>({ order: null, courier: 'Chilexpress', trackingNumber: '' });

  const loadData = async () => {
    setLoading(true);
    const data = await getOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    setUpdatingId(orderId);
    await updateOrderStatus(orderId, newStatus);
    await loadData();
    setUpdatingId(null);
  };

  const handleConfirmDispatch = async () => {
    if (!dispatchModal.order) return;
    setUpdatingId(dispatchModal.order.id);
    await updateOrderStatus(
      dispatchModal.order.id,
      'shipped',
      dispatchModal.courier,
      dispatchModal.trackingNumber
    );
    setDispatchModal({ order: null, courier: 'Chilexpress', trackingNumber: '' });
    await loadData();
    setUpdatingId(null);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch =
      o.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer_phone.includes(searchTerm) ||
      o.order_number.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" /> Pagado
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Clock className="w-3 h-3" /> En Preparación
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
            <Truck className="w-3 h-3" /> Despachado
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
            <Package className="w-3 h-3" /> Entregado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-md">
              ERP Logístico
            </span>
            <span className="text-xs text-zinc-500">Módulo de Despachos & Sincronización</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight mt-1">
            Gestión de Pedidos & Envíos
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Control en tiempo real de ventas entrantes con automatización a WhatsApp y Couriers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/tienda"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-50 px-3.5 py-2 rounded-xl shadow-sm transition-all"
          >
            <Store className="w-3.5 h-3.5 text-amber-600" />
            <span>Ver Tienda en Vivo</span>
          </Link>
          <button
            onClick={loadData}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-50 px-3.5 py-2 rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-zinc-200/80 p-4 rounded-xl shadow-sm">
          <p className="text-[11px] font-bold text-zinc-500 uppercase">Total Órdenes</p>
          <p className="text-2xl font-black text-zinc-900 mt-1">{orders.length}</p>
        </div>
        <div className="bg-white border border-zinc-200/80 p-4 rounded-xl shadow-sm">
          <p className="text-[11px] font-bold text-emerald-600 uppercase">Pagadas / Por Armar</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {orders.filter((o) => o.status === 'paid' || o.status === 'preparing').length}
          </p>
        </div>
        <div className="bg-white border border-zinc-200/80 p-4 rounded-xl shadow-sm">
          <p className="text-[11px] font-bold text-blue-600 uppercase">En Tránsito</p>
          <p className="text-2xl font-black text-blue-600 mt-1">
            {orders.filter((o) => o.status === 'shipped').length}
          </p>
        </div>
        <div className="bg-white border border-zinc-200/80 p-4 rounded-xl shadow-sm">
          <p className="text-[11px] font-bold text-zinc-500 uppercase">Facturación Total</p>
          <p className="text-2xl font-black text-zinc-900 mt-1 font-mono">
            ${orders.reduce((sum, o) => sum + o.total_amount, 0).toLocaleString('es-CL')}
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-zinc-200/80 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-sm border border-zinc-300 rounded-lg px-3 py-1.5 bg-zinc-50">
          <Search className="w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Buscar por cliente, teléfono o # orden..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Estado:
          </span>
          {['all', 'paid', 'preparing', 'shipped', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`text-xs px-3 py-1 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                filterStatus === st
                  ? 'bg-zinc-900 text-white'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {st === 'all' ? 'Todos' : st === 'paid' ? 'Pagados' : st === 'preparing' ? 'En Preparación' : st === 'shipped' ? 'Despachados' : 'Entregados'}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-zinc-200/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Orden</th>
                <th className="py-3 px-4">Cliente & Contacto</th>
                <th className="py-3 px-4">Destino</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones de Despacho</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-zinc-400">
                    No hay pedidos que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const whatsappUrl = `https://wa.me/${order.customer_phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Hola ${order.customer_name}, te escribimos de Mercenario Store sobre tu orden #${order.order_number}.`
                  )}`;

                  return (
                    <tr key={order.id} className="hover:bg-zinc-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-zinc-900">
                        #{order.order_number}
                        <span className="block text-[10px] font-sans font-normal text-zinc-400">
                          {new Date(order.created_at).toLocaleDateString('es-CL')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-zinc-900">{order.customer_name}</div>
                        <div className="text-[11px] text-zinc-500 flex items-center gap-2 mt-0.5">
                          <span>{order.customer_phone}</span>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#25D366] hover:scale-110 transition-transform"
                            title="Chatear por WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-zinc-600 max-w-xs">
                        <div className="font-semibold text-zinc-800">{order.shipping_address.city}</div>
                        <div className="text-[11px] text-zinc-500 truncate">{order.shipping_address.street}</div>
                      </td>

                      <td className="py-3.5 px-4 text-zinc-600">
                        <span className="font-bold text-zinc-900">{(order.items || []).length} piezas</span>
                        <div className="text-[11px] text-zinc-400 truncate max-w-[150px]">
                          {order.items?.map((i) => i.product_title).join(', ')}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-bold text-zinc-900">
                        ${order.total_amount.toLocaleString('es-CL')}
                        <span className="block text-[10px] uppercase font-sans text-amber-600 font-semibold">
                          {order.payment_gateway}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {getStatusBadge(order.status)}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-2">
                        {order.status === 'paid' && (
                          <button
                            onClick={() => handleStatusChange(order.id, 'preparing')}
                            disabled={updatingId === order.id}
                            className="bg-amber-100 text-amber-800 hover:bg-amber-200 font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer"
                          >
                            Armar Pedido
                          </button>
                        )}

                        {order.status === 'preparing' && (
                          <button
                            onClick={() =>
                              setDispatchModal({
                                order,
                                courier: 'Chilexpress',
                                trackingNumber: '',
                              })
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer shadow-sm"
                          >
                            Ingresar Tracking
                          </button>
                        )}

                        {order.status === 'shipped' && (
                          <button
                            onClick={() => handleStatusChange(order.id, 'delivered')}
                            className="bg-purple-100 text-purple-800 hover:bg-purple-200 font-bold px-2.5 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer"
                          >
                            Marcar Entregado
                          </button>
                        )}

                        {order.tracking_number && (
                          <span className="block text-[10px] font-mono text-zinc-500 mt-1">
                            {order.courier_name}: {order.tracking_number}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ingresar Despacho y Enviar WhatsApp */}
      {dispatchModal.order && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-zinc-200">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <h3 className="font-bold text-zinc-900 text-sm">
                Despachar Orden #{dispatchModal.order.order_number}
              </h3>
              <button
                onClick={() => setDispatchModal({ order: null, courier: 'Chilexpress', trackingNumber: '' })}
                className="text-zinc-400 hover:text-zinc-700 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-500">
              Al guardar, el sistema cambiará el estado a <strong>Despachado</strong> y disparará automáticamente la
              notificación con el número de seguimiento al WhatsApp de <strong>{dispatchModal.order.customer_name}</strong>.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Empresa Courier</label>
                <select
                  value={dispatchModal.courier}
                  onChange={(e) => setDispatchModal({ ...dispatchModal, courier: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2 text-xs text-zinc-800"
                >
                  <option value="Chilexpress">Chilexpress</option>
                  <option value="Starken">Starken</option>
                  <option value="Blue Express">Blue Express</option>
                  <option value="Correos de Chile">Correos de Chile</option>
                  <option value="Reparto Propio">Reparto Propio Mercenario</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 mb-1">Número de Seguimiento (Tracking Code)</label>
                <input
                  type="text"
                  placeholder="Ej. CHI-99882233"
                  value={dispatchModal.trackingNumber}
                  onChange={(e) => setDispatchModal({ ...dispatchModal, trackingNumber: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-300 rounded-lg p-2 text-xs text-zinc-800 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3">
              <button
                onClick={() => setDispatchModal({ order: null, courier: 'Chilexpress', trackingNumber: '' })}
                className="flex-1 bg-zinc-100 text-zinc-700 text-xs font-bold py-2.5 rounded-lg hover:bg-zinc-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDispatch}
                disabled={!dispatchModal.trackingNumber}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-black text-xs font-extrabold py-2.5 rounded-lg shadow-md disabled:opacity-50 cursor-pointer"
              >
                Confirmar y Enviar WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
