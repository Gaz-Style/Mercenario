import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/ecommerce/products';
import { getCategories } from '@/lib/ecommerce/categories';
import ProductCard from '@/components/ecommerce/ProductCard';
import StoreHeroVideo from '@/components/ecommerce/StoreHeroVideo';
import CategoryFilter from '@/components/ecommerce/CategoryFilter';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.categoria || 'all';
  const searchQuery = resolvedParams?.q || '';

  const [products, dbCategories] = await Promise.all([
    getProducts({
      category: currentCategory !== 'all' ? currentCategory : undefined,
      search: searchQuery || undefined,
    }),
    getCategories(),
  ]);

  const categories = [
    { label: 'Todos los Productos', value: 'all' },
    ...dbCategories.map((c) => ({ label: c.name, value: c.name })),
  ];

  const normalize = (s: string) =>
    s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');

  return (
    <div className="bg-white min-h-screen text-neutral-900 pb-28">
      {/* Cinematic Mountain Video Hero Header (Arc'teryx Style) */}
      <StoreHeroVideo />

      {/* Catalog Filter Tabs & Products Grid */}
      <section id="catalogo" className="max-w-7xl mx-auto px-0 sm:px-8 pt-6 sm:pt-10">
        {/* Dynamic Category Filter */}
        <div className="px-4 sm:px-0 mb-6">
          <CategoryFilter
            categories={categories}
            currentCategory={currentCategory}
            totalProducts={products.length}
          />
        </div>

        {/* Product Grid - Ancho Total Sin Bordes */}
        <div>
          {products.length === 0 ? (
            <div className="text-center py-24 text-neutral-400 space-y-3 px-4">
              <p className="text-sm font-mono uppercase text-black font-bold">
                No hay productos en esta categoría
              </p>
              <p className="text-xs text-neutral-500">
                Selecciona otra categoría en el menú superior o explora todas las piezas.
              </p>
              <Link
                href="/tienda"
                className="inline-block mt-4 text-xs font-mono uppercase tracking-widest text-black underline underline-offset-4"
              >
                Ver colección completa
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
