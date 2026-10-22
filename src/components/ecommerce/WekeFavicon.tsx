'use client';

import { useEffect } from 'react';

/**
 * WekeFavicon
 * Dinámicamente actualiza el favicon del navegador al logo de WEKE Studio
 * cuando el usuario entra a /tienda y lo restaura a /icon.svg (Mercenario)
 * cuando sale o desmonta el layout.
 */
export default function WekeFavicon() {
  useEffect(() => {
    const iconLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>("link[rel~='icon'], link[rel='apple-touch-icon']")
    );

    const backupList = iconLinks.map((link) => ({
      link,
      originalHref: link.getAttribute('href') || '/icon.svg',
    }));

    // Reemplazar favicon por el logo de WEKE
    if (iconLinks.length > 0) {
      iconLinks.forEach((link) => {
        link.href = '/images/weke-logo.png';
      });
    } else {
      const newLink = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = '/images/weke-logo.png';
      document.head.appendChild(newLink);
    }

    return () => {
      // Restaurar el favicon original de Mercenario al salir de /tienda
      if (backupList.length > 0) {
        backupList.forEach(({ link, originalHref }) => {
          link.href = originalHref.includes('weke-logo') ? '/icon.svg' : originalHref;
        });
      } else {
        const link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
        if (link) link.href = '/icon.svg';
      }
    };
  }, []);

  return null;
}
