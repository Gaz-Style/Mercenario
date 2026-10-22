'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    ShoppingBag,
    Users,
    Activity,
    Calendar,
    Wallet,
    DollarSign,
    Package,
    Settings,
    ChevronLeft,
    ChevronRight,
    Scissors,
    Receipt,
    BrainCircuit,
    LineChart,
    ExternalLink,
    Store,
    CreditCard,
    FileSpreadsheet,
    Bot,
    Sparkles
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sidebarItems = [
    { name: 'Panel General', href: '/admin', icon: LayoutDashboard },
    { name: 'Punto de Venta (POS)', href: '/admin/pos', icon: CreditCard },
    { name: 'Planilla de Ventas', href: '/admin/ventas', icon: FileSpreadsheet },
    { name: 'Pedidos Online', href: '/admin/ecommerce/pedidos', icon: Package },
    { name: 'Catálogo & Stock', href: '/admin/ecommerce/productos', icon: ShoppingBag },
    { name: 'Clientes & CRM', href: '/admin/ecommerce/clientes', icon: Users },
    { name: 'Asistente Virtual', href: '/admin/asistente', icon: Bot, badge: 'IA 24/7' },
    { name: 'Growth & Marketing', href: '/admin/marketing', icon: LineChart },
    { name: 'Ajustes de Tienda', href: '/admin/ecommerce/configuracion', icon: Settings },
];

export default function Sidebar({ 
    isCollapsed, 
    setIsCollapsed 
}: { 
    isCollapsed: boolean, 
    setIsCollapsed: (v: boolean) => void 
}) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 280 }}
            className="hidden lg:flex h-screen bg-white border-r border-zinc-200/80 flex-col fixed left-0 top-0 z-50 shadow-sm"
        >
            <div className="flex items-center justify-between p-5 border-b border-zinc-100 h-[80px]">
                <AnimatePresence mode="wait">
                    {!isCollapsed ? (
                        <motion.div
                            key="expanded-brand"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex items-center gap-3 overflow-hidden whitespace-nowrap"
                        >
                            <img
                                src="/images/weke-logo.png"
                                alt="WEKE Logo"
                                className="w-10 h-10 object-contain flex-shrink-0"
                            />
                            <div className="flex flex-col">
                                <span className="font-sans font-black text-xl text-zinc-950 tracking-tight uppercase leading-none">
                                    WEKE
                                </span>
                                <span className="text-[9px] uppercase text-zinc-400 font-mono font-bold tracking-widest mt-1">
                                    Back-Office Tienda
                                </span>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="collapsed-brand"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mx-auto"
                        >
                            <img
                                src="/images/weke-logo.png"
                                alt="WEKE Logo"
                                className="w-8 h-8 object-contain"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {!isCollapsed && (
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-500 hover:text-zinc-900 transition-colors ml-auto flex-shrink-0 cursor-pointer"
                    >
                        <ChevronLeft size={16} />
                    </button>
                )}
                {isCollapsed && (
                    <button 
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="p-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-500 hover:text-zinc-900 transition-colors mx-auto mt-2 flex-shrink-0 cursor-pointer"
                    >
                        <ChevronRight size={16} />
                    </button>
                )}
            </div>

            {/* Quick Action: Ver Tienda en Vivo */}
            <div className="px-3 pt-4 pb-1">
                <Link
                    href="/tienda"
                    target="_blank"
                    title="Ver Tienda Pública en Vivo"
                    className={cn(
                        "flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-zinc-50 hover:bg-black hover:border-black text-zinc-700 hover:text-white transition-all duration-200 group text-xs font-bold tracking-wider uppercase",
                        isCollapsed ? "p-3 justify-center" : "px-3.5 py-2.5 justify-between"
                    )}
                >
                    <div className="flex items-center gap-2.5">
                        <Store size={16} className="text-zinc-500 group-hover:text-white transition-colors flex-shrink-0" />
                        {!isCollapsed && <span>Ver Tienda</span>}
                    </div>
                    {!isCollapsed && <ExternalLink size={13} className="text-zinc-400 group-hover:text-zinc-300" />}
                </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1.5 scrollbar-hide">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname?.startsWith(item.href));
                    
                    return (
                        <Link key={item.href} href={item.href} className="block">
                            <div className={cn(
                                "flex items-center gap-4 px-3.5 py-3 rounded-xl transition-all duration-200 group cursor-pointer relative overflow-hidden",
                                isActive ? "text-zinc-900 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-zinc-100/50" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                            )}>
                                <item.icon size={18} className={cn("flex-shrink-0 transition-colors relative z-10", isActive ? "text-zinc-900" : "text-zinc-400 group-hover:text-zinc-700")} />
                                
                                <AnimatePresence mode="wait">
                                    {!isCollapsed && (
                                        <motion.div
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="flex items-center justify-between flex-1 min-w-0 relative z-10"
                                        >
                                            <span className="text-[13px] font-medium whitespace-nowrap">
                                                {item.name}
                                            </span>
                                            {(item as any).badge && (
                                                <span className="ml-2 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                                    {(item as any).badge}
                                                </span>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {isActive && (
                                    <motion.div layoutId="sidebar-active" className="absolute inset-0 bg-zinc-100/60 z-0 rounded-xl" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />
                                )}
                            </div>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-zinc-100 bg-zinc-50/50">
                <div className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}>
                    <div className="w-9 h-9 rounded-full bg-white border border-zinc-200 flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden p-1">
                        <img src="/images/weke-logo.png" alt="WEKE" className="w-full h-full object-contain" />
                    </div>
                    {!isCollapsed && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col overflow-hidden"
                        >
                            <span className="text-xs font-bold text-zinc-900">Admin Tienda</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span> 
                                <span className="text-[10px] text-emerald-600 font-medium">Tienda Operativa</span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.aside>
    );
}
