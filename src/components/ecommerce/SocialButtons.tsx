'use client';

import React from 'react';

export interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  color: string;
  hoverBg: string;
  borderColor: string;
  badge?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@wekeoutdoor_',
    url: 'https://www.instagram.com/wekeoutdoor_?srtk=MXgzb3hubjJ0ODBnNw==',
    color: '#E4405F',
    hoverBg: 'hover:bg-[#E4405F]/10 hover:border-[#E4405F]/40',
    borderColor: 'border-neutral-200',
    badge: 'Lookbook & Rutas',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    handle: '@weke.studio',
    url: 'https://tiktok.com/@weke.studio',
    color: '#000000',
    hoverBg: 'hover:bg-neutral-100 hover:border-black',
    borderColor: 'border-neutral-200',
    badge: 'Drops & Outfits',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    handle: '+56 9 5795 8467',
    url: 'https://wa.me/56957958467?text=Hola%20WEKE%20Studio%2C%20quisiera%20consultar%20al%20asistente%20virtual',
    color: '#25D366',
    hoverBg: 'hover:bg-[#25D366]/10 hover:border-[#25D366]/40',
    borderColor: 'border-neutral-200',
    badge: 'Asistente IA 24/7 (RAC)',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    handle: 'WEKE Studio',
    url: 'https://youtube.com/@weke.studio',
    color: '#FF0000',
    hoverBg: 'hover:bg-[#FF0000]/10 hover:border-[#FF0000]/40',
    borderColor: 'border-neutral-200',
    badge: 'Producción & Campañas',
  },
];

function SocialIcon({ id }: { id: string }) {
  if (id === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  if (id === 'tiktok') {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.298 0 .59.04.87.12V9.4a6.33 6.33 0 00-.87-.06A6.34 6.34 0 003.11 15.7a6.34 6.34 0 0010.82 4.47 6.27 6.27 0 001.86-4.47V8.71a8.21 8.21 0 004.8 1.54V6.8a4.78 4.78 0 01-1-.11z" />
      </svg>
    );
  }
  if (id === 'whatsapp') {
    return (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    );
  }
  // youtube
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function SocialButtons({
  variant = 'cards',
  className = '',
}: {
  variant?: 'cards' | 'icons' | 'minimal';
  className?: string;
}) {
  if (variant === 'icons') {
    return (
      <div className={`flex items-center gap-2.5 ${className}`}>
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar nuestro canal en ${social.name}`}
            title={`${social.name}: ${social.handle}`}
            className="w-9 h-9 rounded-full border border-neutral-200/90 hover:border-neutral-900 flex items-center justify-center text-neutral-600 hover:text-black transition-all hover:scale-105 active:scale-95 bg-white shadow-xs cursor-pointer"
          >
            <SocialIcon id={social.id} />
          </a>
        ))}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        {SOCIAL_LINKS.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-700 hover:text-black hover:border-black text-[11px] font-bold tracking-wider uppercase transition-all bg-white hover:bg-neutral-50"
          >
            <span style={{ color: social.color }}><SocialIcon id={social.id} /></span>
            <span>{social.name}</span>
          </a>
        ))}
      </div>
    );
  }

  // Default: High-converting luxury cards layout
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ${className}`}>
      {SOCIAL_LINKS.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center gap-3.5 p-3.5 rounded-xl border bg-white ${social.borderColor} ${social.hoverBg} transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer`}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm"
            style={{ backgroundColor: social.color }}
          >
            <SocialIcon id={social.id} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 group-hover:text-black">
                {social.name}
              </span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-neutral-400">
                ↗
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 truncate font-mono mt-0.5">
              {social.handle}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
