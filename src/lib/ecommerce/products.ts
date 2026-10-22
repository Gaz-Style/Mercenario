'use server';

import { createClient } from '@/lib/supabase/server';
import { Product } from '@/types/ecommerce';
import { revalidatePath } from 'next/cache';
import path from 'path';
import fs from 'fs/promises';

const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'ecommerce_products.json');

// Leer productos persistentes desde JSON
async function readProductsFromFile(): Promise<Product[]> {
  try {
    const fileContent = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(fileContent);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('No se pudo leer ecommerce_products.json, devolviendo array vacío:', err);
    return [];
  }
}

// Guardar productos en JSON
async function writeProductsToFile(products: Product[]): Promise<void> {
  try {
    await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error escribiendo ecommerce_products.json:', err);
  }
}

export async function getProducts(options?: { category?: string; search?: string }): Promise<Product[]> {
  let products = await readProductsFromFile();

  // Intentar sincronizar con Supabase si está disponible
  try {
    const supabase = await createClient();
    const { data: dbProducts, error } = await supabase
      .from('ecommerce_products')
      .select('*, variants:ecommerce_variants(*)')
      .eq('is_active', true);

    if (!error && dbProducts && dbProducts.length > 0) {
      const mappedDbProducts: Product[] = dbProducts.map((item: any) => ({
        id: item.id,
        sku: item.sku,
        name: item.name,
        slug: item.slug,
        description: item.description,
        category: item.category_name,
        base_price: Number(item.base_price),
        sale_price: item.sale_price ? Number(item.sale_price) : null,
        cost_price: item.cost_price ? Number(item.cost_price) : null,
        has_variants: Boolean(item.has_variants),
        is_active: Boolean(item.is_active),
        featured: Boolean(item.featured),
        images: Array.isArray(item.images) ? item.images : JSON.parse(item.images || '[]'),
        variants: item.variants || [],
        total_stock: (item.variants || []).reduce((acc: number, v: any) => acc + (v.stock || 0), 0) || 10,
        seo_title: item.seo_title,
        seo_description: item.seo_description,
      }));

      // Unir evitando duplicados
      const existingIds = new Set(products.map((p) => p.id));
      mappedDbProducts.forEach((p) => {
        if (!existingIds.has(p.id)) products.push(p);
      });
    }
  } catch (err) {
    // Si Supabase falla, usamos los productos persistidos en el archivo JSON
  }

  // Filtrado
  let filtered = [...products];

  if (options?.category && options.category !== 'all') {
    const normalize = (str: string) =>
      str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');

    const target = normalize(options.category);

    filtered = filtered.filter((p) => {
      if (!p.category) return false;
      const prodCat = normalize(p.category);
      return (
        prodCat.includes(target) ||
        target.includes(prodCat) ||
        (target.includes('chaqueta') && (prodCat.includes('abrigo') || prodCat.includes('chaqueta'))) ||
        (target.includes('pantalon') && prodCat.includes('pantalon')) ||
        (target.includes('poleron') && (prodCat.includes('polar') || prodCat.includes('poleron'))) ||
        (target.includes('mochila') && (prodCat.includes('carga') || prodCat.includes('accesorio') || prodCat.includes('mochila')))
      );
    });
  }

  if (options?.search) {
    const s = options.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(s) ||
        p.description?.toLowerCase().includes(s) ||
        p.sku.toLowerCase().includes(s)
    );
  }

  return filtered;
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  return readProductsFromFile();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await readProductsFromFile();
  const product = products.find((p) => p.slug === slug);
  return product || null;
}

export async function saveProductAction(product: Product): Promise<{ success: boolean; product: Product }> {
  const products = await readProductsFromFile();
  const existingIndex = products.findIndex((p) => p.id === product.id);

  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.unshift(product);
  }

  await writeProductsToFile(products);

  // Intentar guardar en Supabase en segundo plano
  try {
    const supabase = await createClient();
    await supabase.from('ecommerce_products').upsert({
      id: product.id,
      sku: product.sku,
      name: product.name,
      slug: product.slug,
      description: product.description,
      category_name: product.category,
      base_price: product.base_price,
      sale_price: product.sale_price,
      is_active: product.is_active,
      featured: product.featured,
      images: product.images,
    });
  } catch (e) {
    console.warn('Could not sync to Supabase, persisted to local file:', e);
  }

  // Purgar caché de Next.js para que el storefront se actualice al instante
  revalidatePath('/tienda');
  revalidatePath(`/tienda/${product.slug}`);
  revalidatePath('/admin/ecommerce/productos');

  return { success: true, product };
}

export async function deleteProductAction(productId: string): Promise<{ success: boolean }> {
  let products = await readProductsFromFile();
  products = products.filter((p) => p.id !== productId);
  await writeProductsToFile(products);

  try {
    const supabase = await createClient();
    await supabase.from('ecommerce_products').delete().eq('id', productId);
  } catch (e) {
    // ignore
  }

  revalidatePath('/tienda');
  revalidatePath('/admin/ecommerce/productos');

  return { success: true };
}

export async function toggleProductActiveAction(productId: string): Promise<{ success: boolean; is_active: boolean }> {
  const products = await readProductsFromFile();
  const prod = products.find((p) => p.id === productId);
  if (!prod) return { success: false, is_active: false };

  prod.is_active = !prod.is_active;
  await writeProductsToFile(products);

  try {
    const supabase = await createClient();
    await supabase.from('ecommerce_products').update({ is_active: prod.is_active }).eq('id', productId);
  } catch (e) {
    // ignore
  }

  revalidatePath('/tienda');
  revalidatePath('/admin/ecommerce/productos');

  return { success: true, is_active: prod.is_active };
}
