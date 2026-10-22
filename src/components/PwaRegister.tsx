'use client';

import React, { useEffect, useState } from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PwaRegister() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // 1. In development / localhost, do NOT register service worker and purge any existing caches
    if (typeof window !== 'undefined') {
      const isDev = process.env.NODE_ENV !== 'production' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isDev) {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            for (const registration of registrations) {
              registration.unregister();
            }
          });
        }
        if ('caches' in window) {
          caches.keys().then((keys) => {
            keys.forEach((key) => caches.delete(key));
          });
        }
      } else if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/sw.js')
            .then((reg) => {
              console.log('PWA: Service Worker registrado con éxito:', reg.scope);
            })
            .catch((err) => {
              console.warn('PWA: Error registrando Service Worker:', err);
            });
        });
      }
    }

    // 2. Check if already installed in standalone mode
    if (typeof window !== 'undefined') {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);

      // Session storage allows showing the feature again in new demo sessions
      const dismissed = sessionStorage.getItem('weke_pwa_dismissed');
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        if (!dismissed && !isStandaloneMode) {
          setShowInstallBanner(true);
        }
      };

      window.addEventListener('beforeinstallprompt', handler);

      // En navegadores o entornos donde el evento tarda o ya está listo, mostrar el banner demostrativo tras 1.5s
      const timer = setTimeout(() => {
        if (!dismissed && !isStandaloneMode) {
          setShowInstallBanner(true);
        }
      }, 1500);

      return () => {
        window.removeEventListener('beforeinstallprompt', handler);
        clearTimeout(timer);
      };
    }
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        console.log('PWA: El usuario aceptó la instalación');
        setShowInstallBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback amigable si el navegador requiere instalación manual (Safari iOS / escritorio)
      alert('Para instalar en iPhone/iPad: Presiona el botón Compartir y selecciona "Agregar al inicio". En PC/Android: Presiona el icono de instalar en la barra del navegador.');
    }
  };

  const handleDismiss = () => {
    setShowInstallBanner(false);
    sessionStorage.setItem('weke_pwa_dismissed', 'true');
  };

  if (!showInstallBanner || isStandalone) {
    return null;
  }

  return (
    <aside
      aria-label="Instalación de Aplicación"
      className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-[#111111]/95 text-white backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-start gap-3.5">
        <div className="w-12 h-12 rounded-xl bg-white border border-white/20 flex items-center justify-center p-2 flex-shrink-0 shadow-sm">
          <img src="/images/weke-logo.png" alt="WEKE" className="w-full h-full object-contain" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-neutral-300 text-[10px] uppercase font-mono tracking-wider font-bold">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>App Oficial WEKE · Todo en Uno</span>
          </div>
          <h4 className="text-sm font-bold text-white tracking-tight mt-0.5">
            Instalar Aplicación Web (PWA)
          </h4>
          <p className="text-[11px] text-neutral-400 leading-snug mt-1">
            Tienda online, terminal POS y sistema operativo instalables en tu celular o tablet sin pasar por app stores.
          </p>

          <div className="flex items-center gap-2.5 mt-3">
            <button
              onClick={handleInstallClick}
              className="px-4 py-2 bg-white hover:bg-neutral-200 text-black rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Instalar App</span>
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 text-neutral-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Ahora no
            </button>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="text-neutral-500 hover:text-white transition-colors p-1 cursor-pointer"
          aria-label="Cerrar aviso"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
