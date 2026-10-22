'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  DollarSign,
  Package,
  ShoppingBag,
  Users,
  Store,
  ExternalLink,
  RefreshCw,
  ArrowUpRight,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  Settings,
  AlertCircle,
  CreditCard,
  FileSpreadsheet,
  Bot
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getOrders } from '@/lib/ecommerce/orders';
import { getCustomers } from '@/lib/ecommerce/orders';
import { getAllProductsAdmin } from '@/lib/ecommerce/products';
import { Order, Customer, Product } from '@/types/ecommerce';

export default function StoreAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const loadData = async () => {
    try {
      const [ordersData, customersData, productsData] = await Promise.all([
        getOrders(),
        getCustomers(),
        getAllProductsAdmin(),
      ]);
      setOrders(ordersData);
      setCustomers(customersData);
      setProducts(productsData);
    } catch (e) {
      console.warn('Dashboard fallback error', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Metrics
  const totalSales = orders.reduce((acc, o) => acc + (o.total_amount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'paid').length;
  const activeProducts = products.filter((p) => p.is_active).length;

  const recentOrders = orders.slice(0, 5);

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Pagado
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" /> En Preparación
          </span>
        );
      case 'shipped':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <Truck className="w-3 h-3 text-amber-600" /> En Camino
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-700 bg-zinc-100 px-2.5 py-0.5 rounded-full border border-zinc-200">
            <CheckCircle2 className="w-3 h-3 text-zinc-600" /> Entregado
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 bg-zinc-50 px-2.5 py-0.5 rounded-full border border-zinc-200">
            <Clock className="w-3 h-3 text-zinc-400" /> Pendiente
          </span>
        );
    }
  };

  const storeModules = [
    {
      title: 'Punto de Venta (POS)',
      desc: 'Terminal de caja para showroom y ventas presenciales con boleta térmica y arqueo.',
      href: '/admin/pos',
      icon: CreditCard,
      badge: 'Caja Showroom',
      cta: 'Abrir POS',
      borderAccent: 'hover:border-zinc-900',
    },
    {
      title: 'Planilla de Ventas',
      desc: 'Libro contable consolidado (Online + POS), desglose IVA 19% y exportación a Excel.',
      href: '/admin/ventas',
      icon: FileSpreadsheet,
      badge: 'Libro Contable',
      cta: 'Ver Planilla',
      borderAccent: 'hover:border-zinc-900',
    },
    {
      title: 'Pedidos Online',
      desc: 'Gestiona compras web, actualiza tracking de Chilexpress y notifica vía WhatsApp.',
      href: '/admin/ecommerce/pedidos',
      icon: Package,
      badge: `${pendingOrders} por despachar`,
      cta: 'Ver Pedidos',
      borderAccent: 'hover:border-zinc-900',
    },
    {
      title: 'Catálogo & Productos',
      desc: 'Crea categorías, sube fotografías de prendas, ajusta precios y controla inventario.',
      href: '/admin/ecommerce/productos',
      icon: ShoppingBag,
      badge: `${products.length} productos`,
      cta: 'Gestionar Catálogo',
      borderAccent: 'hover:border-zinc-900',
    },
    {
      title: 'Clientes & CRM',
      desc: 'Base de compradores, segmentación VIP/recurrentes y contacto directo vía WhatsApp.',
      href: '/admin/ecommerce/clientes',
      icon: Users,
      badge: `${customers.length} registrados`,
      cta: 'Ver Clientes',
      borderAccent: 'hover:border-zinc-900',
    },
    {
      title: 'Asistente Virtual IA',
      desc: 'Atención 24/7 en WhatsApp, asesoría en tallas, resolución de dudas y derivación a operador humano.',
      href: '/admin/asistente',
      icon: Bot,
      badge: 'IA Activa 24/7',
      cta: 'Abrir Asistente',
      borderAccent: 'hover:border-emerald-600',
    },
    {
      title: 'Ajustes de Tienda',
      desc: 'Nombre comercial, datos para transferencias bancarias y costos de despacho.',
      href: '/admin/ecommerce/configuracion',
      icon: Settings,
      badge: 'Configuración',
      cta: 'Ajustes',
      borderAccent: 'hover:border-zinc-900',
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50/40 font-sans text-zinc-900 pb-16">
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center p-2 flex-shrink-0">
              <img
                src="/images/weke-logo.png"
                alt="WEKE Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 text-zinc-500 font-mono text-[10px] uppercase tracking-widest font-bold">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span>Back-Office Tienda Online · Panel de Control</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950 font-sans">
                WEKE STUDIO
              </h1>
              <p className="text-zinc-500 text-xs mt-0.5">
                Centro de Operaciones, Ventas y Despachos en Tiempo Real.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRefreshing(true);
                loadData();
              }}
              disabled={refreshing}
              className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 transition-colors flex items-center gap-2 text-xs font-semibold shadow-sm cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Sincronizar</span>
            </button>

            <Link
              href="/tienda"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <Store className="w-4 h-4" />
              <span>Ver Tienda en Vivo</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
          </div>
        </div>

        {/* KPIs Principales */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border border-zinc-200/90 p-5 rounded-2xl shadow-sm">
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
              Ventas Totales
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-black text-zinc-900 font-mono">
                ${totalSales.toLocaleString('es-CL')}
              </p>
            </div>
            <p className="text-[11px] text-emerald-600 font-medium mt-1">
              ✓ Órdenes registradas
            </p>
          </Card>

          <Card className="bg-white border border-zinc-200/90 p-5 rounded-2xl shadow-sm">
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
              Pedidos Realizados
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-black text-zinc-900 font-mono">
                {orders.length}
              </p>
              {pendingOrders > 0 && (
                <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {pendingOrders} por despachar
                </span>
              )}
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Flujo de compras activas
            </p>
          </Card>

          <Card className="bg-white border border-zinc-200/90 p-5 rounded-2xl shadow-sm">
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
              Productos en Tienda
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-black text-zinc-900 font-mono">
                {activeProducts}
              </p>
              <span className="text-[10px] text-zinc-400 font-mono">
                / {products.length} total
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Stock visible a clientes
            </p>
          </Card>

          <Card className="bg-white border border-zinc-200/90 p-5 rounded-2xl shadow-sm">
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">
              Clientes en Base CRM
            </p>
            <div className="flex items-baseline gap-2 mt-2">
              <p className="text-2xl font-black text-zinc-900 font-mono">
                {customers.length}
              </p>
            </div>
            <p className="text-[11px] text-zinc-500 mt-1">
              Con historial y contacto
            </p>
          </Card>
        </section>

        {/* Módulos de Operación de la Tienda */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase font-mono tracking-widest font-bold text-zinc-400 flex items-center gap-2">
            <span className="w-1.5 h-3 bg-black rounded-full" />
            Módulos de Gestión de la Tienda
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {storeModules.map((mod) => (
              <Link key={mod.href} href={mod.href} className="block group">
                <Card className={`h-full bg-white border border-zinc-200/90 rounded-2xl p-5 hover:shadow-md transition-all duration-200 flex flex-col justify-between ${mod.borderAccent}`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800 group-hover:bg-black group-hover:text-white transition-colors">
                        <mod.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 bg-zinc-50 px-2 py-0.5 rounded border border-zinc-100">
                        {mod.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-900 group-hover:text-black">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-700 group-hover:text-black">
                    <span>{mod.cta}</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Tabla de Últimos Pedidos Recientes */}
        <section className="bg-white border border-zinc-200/90 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <div>
              <h2 className="text-base font-bold text-zinc-900">Últimos Pedidos Registrados</h2>
              <p className="text-xs text-zinc-500">Compras recientes realizadas en la tienda online.</p>
            </div>
            <Link
              href="/admin/ecommerce/pedidos"
              className="text-xs font-bold text-zinc-700 hover:text-black flex items-center gap-1 group"
            >
              <span>Ver todos los pedidos</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="text-xs text-zinc-400 py-6 text-center font-mono">
              No hay pedidos registrados aún. Realiza una compra de prueba en la tienda.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-400 font-mono uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Pedido</th>
                    <th className="py-3 px-3">Cliente</th>
                    <th className="py-3 px-3">Fecha</th>
                    <th className="py-3 px-3">Total</th>
                    <th className="py-3 px-3">Estado</th>
                    <th className="py-3 px-3 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-sans">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-zinc-50/70 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-zinc-900">
                        {order.order_number}
                      </td>
                      <td className="py-3 px-3 font-medium text-zinc-800">
                        {order.customer_name}
                      </td>
                      <td className="py-3 px-3 text-zinc-500 font-mono text-[11px]">
                        {new Date(order.created_at).toLocaleDateString('es-CL')}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-zinc-900">
                        ${order.total_amount?.toLocaleString('es-CL')}
                      </td>
                      <td className="py-3 px-3">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href="/admin/ecommerce/pedidos"
                          className="inline-flex items-center text-xs font-semibold text-zinc-600 hover:text-black"
                        >
                          Gestionar →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
