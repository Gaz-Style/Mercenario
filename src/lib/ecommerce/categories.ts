'use server';

import { revalidatePath } from 'next/cache';
import path from 'path';
import fs from 'fs/promises';

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

const CATEGORIES_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'ecommerce_categories.json');
const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'ecommerce_products.json');

const DEFAULT_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat-chaquetas',
    name: 'Chaquetas & Abrigos',
    slug: 'chaquetas-abrigos',
    description: 'Tercera capa impermeable y cortaviento para alta montaña'
  },
  {
    id: 'cat-pantalones',
    name: 'Pantalones Técnicos',
    slug: 'pantalones-tecnicos',
    description: 'Pantalones reforzados de trekking y escalada'
  },
  {
    id: 'cat-polerones',
    name: 'Polerones & Polar',
    slug: 'polerones-polar',
    description: 'Segunda capa térmica y transpirable'
  },
  {
    id: 'cat-calzado',
    name: 'Calzado Técnico',
    slug: 'calzado-tecnico',
    description: 'Botas de montaña con suela Vibram y zapatillas trail'
  },
  {
    id: 'cat-accesorios',
    name: 'Mochilas & Cargas',
    slug: 'mochilas-cargas',
    description: 'Mochilas técnicas, arneses y accesorios tácticos'
  }
];

export async function getCategories(): Promise<CategoryItem[]> {
  try {
    const fileContent = await fs.readFile(CATEGORIES_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(fileContent);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CATEGORIES;
  } catch (err) {
    return DEFAULT_CATEGORIES;
  }
}

export async function createCategory(name: string, description?: string): Promise<{ success: boolean; category?: CategoryItem; error?: string }> {
  try {
    const trimmed = name.trim();
    if (!trimmed) return { success: false, error: 'El nombre de la categoría es requerido' };

    const categories = await getCategories();
    const slug = trimmed
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = categories.find((c) => c.slug === slug || c.name.toLowerCase() === trimmed.toLowerCase());
    if (existing) {
      return { success: true, category: existing };
    }

    const newCategory: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: trimmed,
      slug,
      description: description || `Colección técnica de ${trimmed}`,
    };

    const updated = [...categories, newCategory];
    await fs.writeFile(CATEGORIES_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');

    revalidatePath('/tienda');
    revalidatePath('/admin/ecommerce/productos');

    return { success: true, category: newCategory };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error al crear categoría' };
  }
}

export async function updateCategory(
  id: string,
  newName: string,
  newDescription?: string
): Promise<{ success: boolean; category?: CategoryItem; error?: string }> {
  try {
    const trimmed = newName.trim();
    if (!trimmed) return { success: false, error: 'El nombre no puede estar vacío' };

    let categories = await getCategories();
    const catIndex = categories.findIndex((c) => c.id === id);
    if (catIndex === -1) return { success: false, error: 'Categoría no encontrada' };

    const oldName = categories[catIndex].name;
    const newSlug = trimmed
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    categories[catIndex] = {
      ...categories[catIndex],
      name: trimmed,
      slug: newSlug,
      description: newDescription !== undefined ? newDescription : categories[catIndex].description,
    };

    await fs.writeFile(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2), 'utf-8');

    // Sincronizar automáticamente en productos que tenían el nombre antiguo
    try {
      const prodsContent = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
      const products = JSON.parse(prodsContent);
      let modified = false;

      products.forEach((p: any) => {
        if (p.category === oldName) {
          p.category = trimmed;
          modified = true;
        }
      });

      if (modified) {
        await fs.writeFile(PRODUCTS_FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');
      }
    } catch (e) {
      console.warn('No se pudieron actualizar los productos con la categoría modificada:', e);
    }

    revalidatePath('/tienda');
    revalidatePath('/admin/ecommerce/productos');

    return { success: true, category: categories[catIndex] };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error al actualizar categoría' };
  }
}

export async function deleteCategory(categoryId: string): Promise<{ success: boolean }> {
  try {
    let categories = await getCategories();
    categories = categories.filter((c) => c.id !== categoryId);
    await fs.writeFile(CATEGORIES_FILE_PATH, JSON.stringify(categories, null, 2), 'utf-8');

    revalidatePath('/tienda');
    revalidatePath('/admin/ecommerce/productos');
    return { success: true };
  } catch (err) {
    return { success: false };
  }
}
