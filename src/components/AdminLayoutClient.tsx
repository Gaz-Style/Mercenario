'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Sidebar from './Sidebar';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Menu, ArrowLeft } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const moduleNames: Record<string, string> = {
  '/admin': 'Dashboard Central',
  '/admin/livechat': 'LiveChat WhatsApp',
  '/admin/pos': 'Punto de Venta',
  '/admin/ventas': 'Planilla de Ventas',
  '/admin/ecommerce/pedidos': 'Pedidos Online',
  '/admin/ecommerce/productos': 'Catálogo & Stock',
  '/admin/ecommerce/clientes': 'Clientes & CRM',
  '/admin/marketing': 'Growth & Marketing',
  '/admin/ecommerce/configuracion': 'Ajustes de Tienda',
};

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isLiveChat = pathname?.startsWith('/admin/livechat');
  const isFullHeight = isLiveChat;

  const currentModuleKey = Object.keys(moduleNames).find(key => 
    pathname === key || (key !== '/admin' && pathname?.startsWith(key))
  );
  const currentModuleName = currentModuleKey ? moduleNames[currentModuleKey] : 'Administración';

  return (
    <div className={cn(
      "flex w-full bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-200/60",
      isFullHeight ? "h-[100dvh] overflow-hidden" : "min-h-screen"
    )}>
      
      {/* ── Mobile Top Bar (Copiado de la arquitectura gaz_style) ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-zinc-200/80 z-40 flex items-center justify-between px-3.5 shadow-xs">
        <div className="flex items-center gap-2.5">
          {pathname !== '/admin' && (
            <Link 
              href="/admin" 
              className="flex items-center justify-center p-1.5 -ml-1 rounded-lg text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
          )}
          <div className="flex flex-col">
            <Link href="/admin" className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-400">MERCENARIO // ADMIN</span>
            </Link>
            <span className="text-xs font-bold text-zinc-900 tracking-tight leading-tight">{currentModuleName}</span>
          </div>
        </div>

        <button 
          onClick={() => setIsMobileOpen(true)}
          className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-black transition-colors"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ── Sidebar con soporte Móvil tipo Drawer ── */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* ── Contenedor Principal de Contenido ── */}
      <div 
        className={cn(
          "flex-1 transition-all duration-300 relative flex flex-col overflow-x-hidden pt-14 lg:pt-0",
          isFullHeight ? "h-[100dvh] lg:h-screen overflow-hidden" : "min-h-screen",
          isCollapsed ? "ml-0 lg:ml-[80px]" : "ml-0 lg:ml-[280px]"
        )}
      >
        <div className={cn("flex-1 min-h-0 flex flex-col w-full", isFullHeight && "h-full overflow-hidden")}>
          {children}
        </div>
      </div>
    </div>
  );
}
