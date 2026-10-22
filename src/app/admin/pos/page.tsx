'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Banknote,
  Smartphone,
  Search,
  Plus,
  Minus,
  Trash2,
  Printer,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ShoppingBag,
  ExternalLink,
  Store,
  DollarSign,
  User,
  X,
  FileText
} from 'lucide-react';
import { getAllProductsAdmin } from '@/lib/ecommerce/products';
import { Product } from '@/types/ecommerce';
import {
  PosSession,
  PosSale,
  PosSaleItem,
  getPosSession,
  savePosSession,
  registerPosSale,
} from '@/lib/ecommerce/pos';

export default function PosTerminalPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<PosSession | null>(null);

  // Cart / Current Sale state
  const [cartItems, setCartItems] = useState<PosSaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Checkout modal state
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'tarjeta' | 'efectivo' | 'transferencia'>('tarjeta');
  const [amountTendered, setAmountTendered] = useState<number>(0);
  const [customerName, setCustomerName] = useState('Cliente Showroom');
  const [customerRut, setCustomerRut] = useState('66.666.666-6');

  // Receipt modal state
  const [completedSale, setCompletedSale] = useState<PosSale | null>(null);

  // Open/Close Cash register modal
  const [showOpenRegisterModal, setShowOpenRegisterModal] = useState(false);
  const [showCloseRegisterModal, setShowCloseRegisterModal] = useState(false);
  const [initialCashInput, setInitialCashInput] = useState(50000);
  const [cashierInput, setCashierInput] = useState('Admin WEKE');

  useEffect(() => {
    async function init() {
      const prods = await getAllProductsAdmin();
      setProducts(prods);
      const sess = getPosSession();
      setSession(sess);
      setLoading(false);
    }
    init();
  }, []);

  // Filter products
  const categories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);
  const filteredProducts = products.filter((p) => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCat && matchSearch && p.is_active;
  });

  // Cart operations
  const addToCart = (product: Product) => {
    const price = product.sale_price || product.base_price;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product.id);
      if (existing) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.unitPrice }
            : item
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          productName: product.name,
          sku: product.sku,
          unitPrice: price,
          quantity: 1,
          totalPrice: price,
          image: product.images?.[0],
        },
      ];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return { ...item, quantity: newQty, totalPrice: newQty * item.unitPrice };
          }
          return item;
        })
        .filter(Boolean) as PosSaleItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Totals
  const totalAmount = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const subtotalNeto = Math.round(totalAmount / 1.19);
  const ivaAmount = totalAmount - subtotalNeto;
  const changeDue = Math.max(0, amountTendered - totalAmount);

  const handleStartCheckout = () => {
    if (cartItems.length === 0) return;
    setAmountTendered(totalAmount);
    setShowCheckoutModal(true);
  };

  const handleCompleteSale = () => {
    if (!session || !session.isOpen) {
      alert('La caja está cerrada. Por favor abre la caja primero.');
      return;
    }

    const sale = registerPosSale({
      cashier: session.cashierName,
      customerName: customerName || 'Cliente Showroom',
      customerRut: customerRut || '66.666.666-6',
      items: cartItems,
      subtotalNeto,
      ivaAmount,
      totalAmount,
      paymentMethod,
      amountTendered: paymentMethod === 'efectivo' ? amountTendered : undefined,
      changeGiven: paymentMethod === 'efectivo' ? changeDue : undefined,
      status: 'completed',
    });

    setCompletedSale(sale);
    setSession(getPosSession());
    setShowCheckoutModal(false);
    clearCart();
  };

  const handleOpenRegister = () => {
    const newSession: PosSession = {
      id: 'sess-' + Date.now(),
      isOpen: true,
      openedAt: new Date().toISOString(),
      cashierName: cashierInput || 'Admin WEKE',
      initialCash: Number(initialCashInput) || 0,
      expectedCash: Number(initialCashInput) || 0,
      totalCardSales: 0,
      totalCashSales: 0,
      totalTransferSales: 0,
      totalSalesAmount: 0,
      salesCount: 0,
    };
    savePosSession(newSession);
    setSession(newSession);
    setShowOpenRegisterModal(false);
  };

  const handleCloseRegister = () => {
    if (!session) return;
    const closed: PosSession = {
      ...session,
      isOpen: false,
      closedAt: new Date().toISOString(),
    };
    savePosSession(closed);
    setSession(closed);
    setShowCloseRegisterModal(false);
  };

  return (
    <div className="min-h-screen bg-zinc-100/60 font-sans text-zinc-900 flex flex-col">
      {/* Header / Barra de Turno del POS */}
      <header className="bg-white border-b border-zinc-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center p-1.5 shadow-sm">
            <img src="/images/weke-logo.png" alt="WEKE" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-black text-lg tracking-tight uppercase">WEKE POS</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                session?.isOpen
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${session?.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                {session?.isOpen ? 'Caja Abierta' : 'Caja Cerrada'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">
              Terminal Showroom · Cajero: <strong className="text-zinc-800">{session?.cashierName || 'No asignado'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {session?.isOpen ? (
            <>
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-3.5 py-1.5 text-right font-mono">
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 block font-bold">Caja Efectivo</span>
                <span className="text-sm font-bold text-zinc-900">${session.expectedCash.toLocaleString('es-CL')}</span>
              </div>
              <button
                onClick={() => setShowCloseRegisterModal(true)}
                className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-700 bg-white border border-zinc-300 hover:border-black rounded-xl transition-all shadow-sm cursor-pointer"
              >
                Cerrar Caja / Arqueo
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowOpenRegisterModal(true)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-black hover:bg-zinc-800 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Abrir Caja Diaria
            </button>
          )}

          <Link
            href="/admin/ventas"
            className="px-3 py-2 text-xs font-semibold text-zinc-600 hover:text-black flex items-center gap-1.5 border border-zinc-200 bg-zinc-50 rounded-xl hover:bg-white transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Planilla de Ventas</span>
          </Link>
        </div>
      </header>

      {/* Cuerpo Principal del Terminal POS */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Columna Izquierda: Catálogo Rápido */}
        <div className="flex-1 p-5 lg:p-6 overflow-y-auto space-y-5">
          {/* Barra de Filtros y Búsqueda */}
          <div className="bg-white p-3.5 rounded-2xl border border-zinc-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Buscar prenda por nombre o código SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-black transition-all"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-hide">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-black text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-black text-white'
                      : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grilla de Productos */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white h-48 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => {
                const price = product.sale_price || product.base_price;
                return (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="bg-white border border-zinc-200/90 rounded-2xl p-3 text-left hover:border-black hover:shadow-md transition-all duration-200 flex flex-col justify-between group active:scale-98 cursor-pointer relative overflow-hidden"
                  >
                    <div className="aspect-square w-full rounded-xl bg-zinc-50 overflow-hidden mb-2.5 relative border border-zinc-100">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-300">
                          <ShoppingBag className="w-8 h-8" />
                        </div>
                      )}
                      <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow-sm text-zinc-700">
                        Stock: {product.total_stock || 12}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-400 block truncate">
                        {product.sku}
                      </span>
                      <h4 className="text-xs font-bold text-zinc-900 group-hover:text-black line-clamp-1 mt-0.5">
                        {product.name}
                      </h4>
                      <p className="text-sm font-black text-zinc-900 font-mono mt-1.5">
                        ${price.toLocaleString('es-CL')}
                      </p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-bold text-emerald-600">
                      <span>+ Agregar</span>
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Columna Derecha: Ticket de Venta / Carro del POS */}
        <div className="w-full lg:w-96 bg-white border-l border-zinc-200 flex flex-col h-[calc(100vh-69px)] sticky top-[69px] shadow-lg">
          <div className="p-4 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-zinc-800" />
              <h3 className="font-bold text-sm uppercase tracking-wider text-zinc-900">Ticket de Venta</h3>
              <span className="bg-zinc-100 text-zinc-700 text-[11px] font-mono font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
              >
                Vaciar
              </button>
            )}
          </div>

          {/* Lista de ítems en el ticket */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-zinc-100">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-400 space-y-2">
                <ShoppingBag className="w-10 h-10 stroke-1 text-zinc-300" />
                <p className="text-xs font-semibold">El ticket está vacío</p>
                <p className="text-[11px] text-zinc-400">
                  Selecciona prendas del catálogo para iniciar una venta presencial.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.productId} className="pt-3 first:pt-0 flex items-center gap-3">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-11 h-11 rounded-lg object-cover border border-zinc-100 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0 text-zinc-400">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-zinc-900 truncate">{item.productName}</h5>
                    <p className="text-[11px] font-mono text-zinc-500">
                      ${item.unitPrice.toLocaleString('es-CL')} c/u
                    </p>
                  </div>

                  {/* Controles de Cantidad */}
                  <div className="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.productId, -1)}
                      className="w-5 h-5 flex items-center justify-center text-zinc-500 hover:text-black rounded hover:bg-zinc-200 cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold font-mono px-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, 1)}
                      className="w-5 h-5 flex items-center justify-center text-zinc-500 hover:text-black rounded hover:bg-zinc-200 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right font-mono font-bold text-xs text-zinc-900 min-w-[70px]">
                    ${item.totalPrice.toLocaleString('es-CL')}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desglose de Totales & Cobro */}
          <div className="p-4 border-t border-zinc-200 bg-zinc-50/70 space-y-3">
            <div className="space-y-1.5 text-xs text-zinc-600 font-mono">
              <div className="flex justify-between">
                <span>Subtotal Neto:</span>
                <span>${subtotalNeto.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between">
                <span>IVA Débito Fiscal (19%):</span>
                <span>${ivaAmount.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between text-base font-black text-zinc-950 pt-2 border-t border-zinc-200">
                <span>TOTAL A COBRAR:</span>
                <span>${totalAmount.toLocaleString('es-CL')}</span>
              </div>
            </div>

            <button
              disabled={cartItems.length === 0}
              onClick={handleStartCheckout}
              className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                cartItems.length > 0
                  ? 'bg-black hover:bg-zinc-800 text-white active:scale-98'
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Cobrar (${totalAmount.toLocaleString('es-CL')})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Cobro & Emisión de Boleta */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-100">
              <div>
                <h3 className="font-bold text-lg text-zinc-900">Procesar Venta POS</h3>
                <p className="text-xs text-zinc-500">Selecciona el método de pago y emite la boleta.</p>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 text-center space-y-1">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 font-bold">Total a Cancelar</span>
              <p className="text-3xl font-black font-mono text-zinc-950">${totalAmount.toLocaleString('es-CL')}</p>
            </div>

            {/* Selector de Método de Pago */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">
                Método de Pago
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('tarjeta')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'tarjeta'
                      ? 'border-black bg-black text-white'
                      : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-xs font-bold">Tarjeta POS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('efectivo')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'efectivo'
                      ? 'border-black bg-black text-white'
                      : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
                  }`}
                >
                  <Banknote className="w-5 h-5" />
                  <span className="text-xs font-bold">Efectivo</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('transferencia')}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    paymentMethod === 'transferencia'
                      ? 'border-black bg-black text-white'
                      : 'border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="text-xs font-bold">Transferencia</span>
                </button>
              </div>
            </div>

            {/* Si es efectivo: Monto entregado y vuelto */}
            {paymentMethod === 'efectivo' && (
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block">
                  Monto Entregado por el Cliente
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={amountTendered}
                    onChange={(e) => setAmountTendered(Number(e.target.value))}
                    className="flex-1 px-3.5 py-2.5 text-base font-mono font-bold bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-black"
                  />
                  <div className="flex gap-1.5">
                    {[10000, 20000, 50000].map((quick) => (
                      <button
                        key={quick}
                        type="button"
                        onClick={() => setAmountTendered(quick)}
                        className="px-2.5 py-2 text-xs font-bold font-mono bg-white border border-zinc-200 hover:border-black rounded-lg transition-colors cursor-pointer"
                      >
                        ${quick / 1000}k
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-zinc-200">
                  <span className="text-zinc-600">Vuelto a entregar:</span>
                  <span className={`text-base font-mono font-black ${changeDue >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                    ${changeDue.toLocaleString('es-CL')}
                  </span>
                </div>
              </div>
            )}

            {/* Datos del Cliente */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold text-zinc-600 block mb-1">Nombre Cliente</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="font-bold text-zinc-600 block mb-1">RUT Cliente</label>
                <input
                  type="text"
                  value={customerRut}
                  onChange={(e) => setCustomerRut(e.target.value)}
                  className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:border-black font-mono"
                />
              </div>
            </div>

            <button
              onClick={handleCompleteSale}
              className="w-full py-3.5 bg-black hover:bg-zinc-800 text-white rounded-xl font-bold uppercase tracking-wider text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Emitir Boleta & Finalizar Venta</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal / Vista de Boleta Electrónica Térmica Generada */}
      {completedSale && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
              <span className="text-xs font-bold uppercase text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Venta Registrada
              </span>
              <button
                onClick={() => setCompletedSale(null)}
                className="w-7 h-7 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-black cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Simulación Boleta Térmica */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 font-mono text-[11px] text-zinc-800 space-y-3">
              <div className="text-center space-y-1 pb-2 border-b border-dashed border-zinc-300">
                <img src="/images/weke-logo.png" alt="WEKE" className="w-10 h-10 object-contain mx-auto" />
                <h4 className="font-bold text-sm text-zinc-950 uppercase tracking-wider">WEKE STUDIO SPA</h4>
                <p className="text-[10px] text-zinc-500">R.U.T.: 77.890.123-K</p>
                <p className="text-[10px] text-zinc-500">GIRO: VENTA PRENDAS TÉCNICAS</p>
                <p className="text-[10px] text-zinc-500">VITACURA, SANTIAGO · CHILE</p>
                <div className="border border-zinc-800 p-1.5 rounded mt-2">
                  <p className="font-bold text-xs uppercase">BOLETA ELECTRÓNICA</p>
                  <p className="font-black text-sm">{completedSale.receiptNumber}</p>
                </div>
              </div>

              <div className="text-[10px] space-y-0.5 pb-2 border-b border-dashed border-zinc-300 text-zinc-600">
                <p>FECHA: {new Date(completedSale.timestamp).toLocaleString('es-CL')}</p>
                <p>CAJERO: {completedSale.cashier}</p>
                <p>CLIENTE: {completedSale.customerName}</p>
                <p>RUT: {completedSale.customerRut || '66.666.666-6'}</p>
              </div>

              <div className="space-y-1.5 pb-2 border-b border-dashed border-zinc-300">
                {completedSale.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <span className="truncate max-w-[170px]">{item.quantity}x {item.productName}</span>
                    <span className="font-bold">${item.totalPrice.toLocaleString('es-CL')}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1 pt-1 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>Neto:</span>
                  <span>${completedSale.subtotalNeto.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>IVA (19%):</span>
                  <span>${completedSale.ivaAmount.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between font-black text-sm text-zinc-950 pt-1 border-t border-zinc-200">
                  <span>TOTAL:</span>
                  <span>${completedSale.totalAmount.toLocaleString('es-CL')}</span>
                </div>
                <div className="flex justify-between text-[10px] text-zinc-500 pt-1 uppercase">
                  <span>MEDIO PAGO:</span>
                  <span className="font-bold text-zinc-800">{completedSale.paymentMethod}</span>
                </div>
                {completedSale.amountTendered && (
                  <>
                    <div className="flex justify-between text-[10px] text-zinc-500">
                      <span>PAGÓ CON:</span>
                      <span>${completedSale.amountTendered.toLocaleString('es-CL')}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-zinc-900">
                      <span>VUELTO:</span>
                      <span>${completedSale.changeGiven?.toLocaleString('es-CL')}</span>
                    </div>
                  </>
                )}
              </div>

              <p className="text-center text-[9px] text-zinc-400 pt-2 border-t border-dashed border-zinc-300">
                TIMBRE ELECTRÓNICO S.I.I. · RESOLUCIÓN N° 80
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir</span>
              </button>
              <button
                onClick={() => setCompletedSale(null)}
                className="flex-1 py-2.5 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Nueva Venta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Apertura de Caja */}
      {showOpenRegisterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <h3 className="font-bold text-lg text-zinc-900">Apertura de Turno de Caja</h3>
            <p className="text-xs text-zinc-500">
              Registra el fondo de sencillo en efectivo y el nombre del cajero responsable del turno.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1.5">
                  Fondo Inicial en Efectivo ($ CLP)
                </label>
                <input
                  type="number"
                  value={initialCashInput}
                  onChange={(e) => setInitialCashInput(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-sm font-mono font-bold bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1.5">
                  Nombre del Cajero / Operador
                </label>
                <input
                  type="text"
                  value={cashierInput}
                  onChange={(e) => setCashierInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowOpenRegisterModal(false)}
                className="flex-1 py-2.5 border border-zinc-200 text-zinc-700 rounded-xl text-xs font-bold hover:bg-zinc-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleOpenRegister}
                className="flex-1 py-2.5 bg-black hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Abrir Turno
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cierre de Caja / Arqueo */}
      {showCloseRegisterModal && session && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <h3 className="font-bold text-lg text-zinc-900">Cierre de Caja & Cuadratura</h3>
            <p className="text-xs text-zinc-500">
              Resumen de transacciones acumuladas en el turno actual de ventas.
            </p>

            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Fondo Inicial:</span>
                <span>${session.initialCash.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Ventas en Efectivo:</span>
                <span>${session.totalCashSales.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Ventas con Tarjeta POS:</span>
                <span>${session.totalCardSales.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Ventas por Transferencia:</span>
                <span>${session.totalTransferSales.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between font-bold text-zinc-950 pt-2 border-t border-zinc-200">
                <span>Total Ventas Turno:</span>
                <span>${session.totalSalesAmount.toLocaleString('es-CL')} ({session.salesCount} ventas)</span>
              </div>
              <div className="flex justify-between font-black text-sm text-emerald-600 pt-2 border-t border-zinc-200">
                <span>EFECTIVO ESPERADO EN CAJA:</span>
                <span>${session.expectedCash.toLocaleString('es-CL')}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowCloseRegisterModal(false)}
                className="flex-1 py-2.5 border border-zinc-200 text-zinc-700 rounded-xl text-xs font-bold hover:bg-zinc-50 transition-colors"
              >
                Volver
              </button>
              <button
                onClick={handleCloseRegister}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Confirmar Cierre
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
