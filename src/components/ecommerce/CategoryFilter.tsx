'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CategoryItem {
  label: string;
  value: string;
}

interface CategoryFilterProps {
  categories: CategoryItem[];
  currentCategory: string;
  totalProducts: number;
}

export default function CategoryFilter({
  categories,
  currentCategory,
  totalProducts,
}: CategoryFilterProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const normalize = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');

  const activeCategoryObj =
    categories.find((c) =>
      c.value === 'all'
        ? currentCategory === 'all'
        : normalize(currentCategory) === normalize(c.value) ||
          normalize(c.value).includes(normalize(currentCategory))
    ) || categories[0];

  return (
    <div className="pb-6 border-b border-neutral-200">
      {/* ──────────────── DESKTOP VIEW (Horizontal Pills - Inalterado) ──────────────── */}
      <div className="hidden md:flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive =
              cat.value === 'all'
                ? currentCategory === 'all'
                : normalize(currentCategory) === normalize(cat.value) ||
                  normalize(cat.value).includes(normalize(currentCategory));

            return (
              <Link
                key={cat.value}
                href={cat.value === 'all' ? '/tienda#catalogo' : `/tienda?categoria=${encodeURIComponent(cat.value)}#catalogo`}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
                  isActive
                    ? 'bg-black text-white font-bold'
                    : 'bg-[#F5F5F5] text-neutral-600 hover:bg-neutral-200 hover:text-black'
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ──────────────── MOBILE VIEW (Accordion Apilado Desplegable) ──────────────── */}
      <div className="md:hidden space-y-2">
        {/* Accordion Trigger Header */}
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full flex items-center justify-between p-3.5 bg-neutral-900 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer border border-neutral-900"
          aria-expanded={isAccordionOpen}
        >
          <div className="flex items-center gap-2 truncate pr-2">
            <span className="text-neutral-400 text-[10px]">CATEGORÍA:</span>
            <span className="font-bold text-white truncate">{activeCategoryObj.label}</span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[10px] text-neutral-400 font-mono">[{totalProducts}]</span>
            <ChevronDown
              className={`w-4 h-4 text-white transition-transform duration-200 ${
                isAccordionOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {/* Accordion Content (Stacked Category Buttons) */}
        <AnimatePresence>
          {isAccordionOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden border border-neutral-200 bg-[#FAFAFA]"
            >
              <div className="flex flex-col divide-y divide-neutral-200/80">
                {categories.map((cat) => {
                  const isActive =
                    cat.value === 'all'
                      ? currentCategory === 'all'
                      : normalize(currentCategory) === normalize(cat.value) ||
                        normalize(cat.value).includes(normalize(currentCategory));

                  return (
                    <Link
                      key={cat.value}
                      href={cat.value === 'all' ? '/tienda#catalogo' : `/tienda?categoria=${encodeURIComponent(cat.value)}#catalogo`}
                      onClick={() => setIsAccordionOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 text-xs font-mono tracking-wider uppercase transition-colors ${
                        isActive
                          ? 'bg-black text-white font-bold'
                          : 'bg-white hover:bg-neutral-100 text-neutral-700 hover:text-black'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {isActive && <Check className="w-4 h-4 text-white flex-shrink-0" />}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
