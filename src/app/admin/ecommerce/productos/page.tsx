'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import {
  getAllProductsAdmin,
  saveProductAction,
  deleteProductAction,
  toggleProductActiveAction,
} from '@/lib/ecommerce/products';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  CategoryItem,
} from '@/lib/ecommerce/categories';
import MultiImageUploader from '@/components/ecommerce/MultiImageUploader';
import {
  ShoppingBag,
  Plus,
  Search,
  ExternalLink,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  Check,
  Images,
  RefreshCw,
  Loader2,
  Tag,
  FolderPlus,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [showModal, setShowModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Category inline form
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  // Edit Category state
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState('');
  const [editingCategoryDesc, setEditingCategoryDesc] = useState('');
  const [isSavingCategory, setIsSavingCategory] = useState(false);

  // New product form
  const [newProd, setNewProd] = useState({
    name: '',
    sku: '',
    category: 'Chaquetas & Abrigos',
    base_price: 59990,
    sale_price: '',
    description: '',
    images: [] as string[],
    stock: 20,
  });

  const loadData = async () => {
    setLoading(true);
    const [prodsData, catsData] = await Promise.all([
      getAllProductsAdmin(),
      getCategories(),
    ]);
    setProducts(prodsData);
    setCategories(catsData);
    if (catsData.length > 0 && !newProd.category) {
      setNewProd((prev) => ({ ...prev, category: catsData[0].name }));
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setIsCreatingCategory(true);

    const res = await createCategory(newCategoryName, newCategoryDesc);
    if (res.success && res.category) {
      const updatedCats = await getCategories();
      setCategories(updatedCats);
      // Auto-seleccionar la nueva categoría en el formulario activo
      setNewProd((prev) => ({ ...prev, category: res.category!.name }));
      if (editingProduct) {
        setEditingProduct((prev) => (prev ? { ...prev, category: res.category!.name } : null));
      }
      setNewCategoryName('');
      setNewCategoryDesc('');
    }
    setIsCreatingCategory(false);
  };

  const handleDeleteCategory = async (catId: string) => {
    if (confirm('¿Eliminar esta categoría? Los productos asociados permanecerán pero ya no aparecerá como filtro.')) {
      await deleteCategory(catId);
      const updatedCats = await getCategories();
      setCategories(updatedCats);
    }
  };

  const handleStartEditCategory = (cat: CategoryItem) => {
    setEditingCategoryId(cat.id);
    setEditingCategoryName(cat.name);
    setEditingCategoryDesc(cat.description || '');
  };

  const handleSaveCategoryEdit = async (catId: string) => {
    if (!editingCategoryName.trim()) return;
    setIsSavingCategory(true);
    await updateCategory(catId, editingCategoryName, editingCategoryDesc);
    const [updatedCats, updatedProds] = await Promise.all([
      getCategories(),
      getAllProductsAdmin(),
    ]);
    setCategories(updatedCats);
    setProducts(updatedProds);
    setIsSavingCategory(false);
    setEditingCategoryId(null);
  };

  const handleToggleActive = async (productId: string) => {
    const res = await toggleProductActiveAction(productId);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, is_active: res.is_active } : p))
    );
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const defaultImages =
      newProd.images.length > 0
        ? newProd.images
        : ['https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1000'];

    const created: Product = {
      id: `prod-${Date.now()}`,
      sku: newProd.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newProd.name,
      slug: newProd.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
      description: newProd.description || 'Prenda técnica de alto rendimiento.',
      category: newProd.category || (categories[0]?.name || 'General'),
      base_price: Number(newProd.base_price),
      sale_price: newProd.sale_price ? Number(newProd.sale_price) : null,
      has_variants: false,
      is_active: true,
      featured: false,
      images: defaultImages,
      total_stock: Number(newProd.stock),
      variants: [
        {
          id: `v-${Date.now()}`,
          product_id: `prod-${Date.now()}`,
          sku: `${newProd.sku || 'SKU'}-STD`,
          title: 'Estándar',
          attributes: {},
          price: newProd.sale_price ? Number(newProd.sale_price) : Number(newProd.base_price),
          stock: Number(newProd.stock),
          is_active: true,
        },
      ],
    };

    await saveProductAction(created);
    await loadData();
    setIsSaving(false);
    setShowModal(false);
    setNewProd({
      name: '',
      sku: '',
      category: categories[0]?.name || 'Chaquetas & Abrigos',
      base_price: 59990,
      sale_price: '',
      description: '',
      images: [],
      stock: 20,
    });
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setIsSaving(true);

    await saveProductAction(editingProduct);
    await loadData();
    setIsSaving(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('¿Estás seguro de eliminar este producto del catálogo?')) {
      await deleteProductAction(productId);
      await loadData();
      setEditingProduct(null);
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto font-sans bg-white min-h-screen text-neutral-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-500 bg-neutral-100 px-2 py-0.5">
              // BACK-OFFICE PROPIETARIO
            </span>
            <span className="text-xs text-neutral-500 font-mono">Gestor de Catálogo & Categorías</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-black tracking-tight uppercase mt-1">
            Catálogo & Categorías
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5 font-light">
            Crea categorías personalizadas y sube productos. Todo cambio se refleja inmediatamente en la tienda pública.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Botón Gestionar Categorías */}
          <button
            onClick={() => setShowCategoryModal(true)}
            className="inline-flex items-center gap-1.5 border border-neutral-300 hover:border-black text-black font-mono text-xs uppercase tracking-wider px-3.5 py-2.5 transition-all cursor-pointer bg-white"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>Categorías ({categories.length})</span>
          </button>

          {/* Botón Actualizar */}
          <button
            onClick={loadData}
            className="inline-flex items-center gap-1.5 border border-neutral-300 hover:border-black text-black font-mono text-xs uppercase tracking-wider px-3 py-2.5 transition-all cursor-pointer bg-white"
            title="Recargar catálogo"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>

          {/* Botón Nuevo Producto */}
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider px-4 py-2.5 transition-all cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Producto</span>
          </button>
        </div>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#FAFAFA] p-4 border border-neutral-200">
        <div className="flex items-center gap-2 w-full sm:w-80 border border-neutral-300 px-3 py-1.5 bg-white">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, SKU o categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-xs text-black placeholder-neutral-400 focus:outline-none"
          />
        </div>

        <div className="text-xs font-mono text-neutral-500">
          [ <strong className="text-black">{filtered.length}</strong> DE {products.length} PRODUCTOS • {categories.length} CATEGORÍAS ]
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FAFAFA] border-b border-neutral-200 text-neutral-500 font-mono font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Producto</th>
                <th className="py-3 px-4">Categoría</th>
                <th className="py-3 px-4">Precio Normal</th>
                <th className="py-3 px-4">Precio Oferta</th>
                <th className="py-3 px-4">Variantes & Stock</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 font-mono">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-black" />
                    Cargando catálogo en tiempo real...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 font-mono">
                    No hay productos registrados. Haz clic en "Nuevo Producto" para agregar uno.
                  </td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-14 bg-neutral-100 flex-shrink-0 border border-neutral-200 overflow-hidden">
                          <img
                            src={prod.images[0] || 'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1000'}
                            alt={prod.name}
                            className="w-full h-full object-cover"
                          />
                          {prod.images.length > 1 && (
                            <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-white font-mono text-[9px] px-1 py-0.2">
                              +{prod.images.length - 1}
                            </span>
                          )}
                        </div>
                        <div>
                          <span className="font-bold text-black block tracking-tight">{prod.name}</span>
                          <span className="text-[10px] font-mono text-neutral-400 uppercase">{prod.sku}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-600 font-mono text-[11px]">
                      <span className="bg-neutral-100 px-2 py-0.5 border border-neutral-200 text-neutral-800">
                        {prod.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-black">
                      ${prod.base_price.toLocaleString('es-CL')}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-neutral-700 font-bold">
                      {prod.sale_price ? `$${prod.sale_price.toLocaleString('es-CL')}` : '—'}
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-black">{prod.total_stock} u.</span>
                      <span className="block text-[10px] text-neutral-400">
                        {prod.variants?.length ? `${prod.variants.length} variantes` : 'Estándar'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(prod.id)}
                        className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 cursor-pointer transition-colors border ${
                          prod.is_active
                            ? 'bg-neutral-100 text-black border-neutral-300'
                            : 'bg-neutral-50 text-neutral-400 border-neutral-200 line-through'
                        }`}
                      >
                        {prod.is_active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        <span>{prod.is_active ? 'Activo' : 'Pausado'}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingProduct({ ...prod, images: [...prod.images] })}
                          className="inline-flex items-center gap-1 bg-black hover:bg-neutral-800 text-white font-mono text-[11px] uppercase tracking-wider px-2.5 py-1.5 transition-colors cursor-pointer"
                          title="Editar producto"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Editar</span>
                        </button>

                        <Link
                          href={`/tienda/${prod.slug}`}
                          target="_blank"
                          className="inline-flex items-center text-neutral-400 hover:text-black p-1.5 border border-neutral-200 hover:border-black transition-colors"
                          title="Ver en tienda pública"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Gestionar Categorías */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 space-y-4 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  // NAVEGACIÓN & FILTROS
                </span>
                <h3 className="font-black text-black text-sm uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-4 h-4 text-black" />
                  Gestionar Categorías del Catálogo
                </h3>
              </div>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-neutral-400 hover:text-black font-mono text-sm"
              >
                ✕
              </button>
            </div>

            {/* Formulario Crear Nueva Categoría */}
            <form onSubmit={handleCreateCategory} className="p-4 bg-[#FAFAFA] border border-neutral-200 space-y-3">
              <p className="text-xs font-mono font-bold uppercase text-black flex items-center gap-1.5">
                <FolderPlus className="w-3.5 h-3.5" />
                Crear Nueva Categoría
              </p>
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  placeholder="Ej. Pantalones Técnicos, Polerones, Escalada..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full bg-white border border-neutral-300 p-2 text-xs text-black focus:outline-none focus:border-black"
                />
                <input
                  type="text"
                  placeholder="Descripción breve (opcional)"
                  value={newCategoryDesc}
                  onChange={(e) => setNewCategoryDesc(e.target.value)}
                  className="w-full bg-white border border-neutral-300 p-2 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>
              <button
                type="submit"
                disabled={isCreatingCategory || !newCategoryName.trim()}
                className="w-full bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider py-2.5 font-bold cursor-pointer disabled:opacity-50"
              >
                {isCreatingCategory ? 'Creando...' : '+ Agregar Categoría'}
              </button>
            </form>

            {/* Lista de Categorías Existentes */}
            <div className="space-y-2 pt-2">
              <label className="block text-[11px] font-mono uppercase text-neutral-500 font-bold">
                Categorías Activas en la Tienda ({categories.length}):
              </label>
              <div className="divide-y divide-neutral-200 border border-neutral-200">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-3 hover:bg-neutral-50/80 transition-colors">
                    {editingCategoryId === cat.id ? (
                      <div className="space-y-2 bg-neutral-100 p-2.5 border border-neutral-300">
                        <label className="block text-[10px] font-mono uppercase text-neutral-500 font-bold">
                          Editar Nombre de Categoría:
                        </label>
                        <input
                          type="text"
                          value={editingCategoryName}
                          onChange={(e) => setEditingCategoryName(e.target.value)}
                          className="w-full bg-white border border-neutral-300 p-1.5 text-xs text-black focus:outline-none focus:border-black font-semibold"
                        />
                        <input
                          type="text"
                          placeholder="Descripción (opcional)"
                          value={editingCategoryDesc}
                          onChange={(e) => setEditingCategoryDesc(e.target.value)}
                          className="w-full bg-white border border-neutral-300 p-1.5 text-xs text-black focus:outline-none focus:border-black"
                        />
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setEditingCategoryId(null)}
                            className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-mono text-[11px] uppercase tracking-wider px-3 py-1 cursor-pointer"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            disabled={isSavingCategory || !editingCategoryName.trim()}
                            onClick={() => handleSaveCategoryEdit(cat.id)}
                            className="bg-black hover:bg-neutral-800 text-white font-mono text-[11px] uppercase tracking-wider px-3.5 py-1 font-bold cursor-pointer disabled:opacity-50"
                          >
                            {isSavingCategory ? 'Guardando...' : 'Guardar'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-black block">{cat.name}</span>
                          <span className="text-[10px] font-mono text-neutral-400">/{cat.slug}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStartEditCategory(cat)}
                            className="text-neutral-500 hover:text-black p-1.5 cursor-pointer transition-colors border border-neutral-200 hover:border-black"
                            title="Editar nombre de categoría"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="text-neutral-400 hover:text-red-600 p-1.5 cursor-pointer transition-colors border border-neutral-200 hover:border-red-600"
                            title="Eliminar categoría"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-200 flex justify-end">
              <button
                type="button"
                onClick={() => setShowCategoryModal(false)}
                className="bg-black text-white font-mono text-xs uppercase tracking-wider py-2.5 px-6 font-bold"
              >
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Editar Producto */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  // EDICIÓN EN TIEMPO REAL
                </span>
                <h3 className="font-black text-black text-sm uppercase tracking-wider flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-black" />
                  Editar Producto: {editingProduct.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-neutral-400 hover:text-black font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {/* Multi-Image Uploader Component */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1.5 font-bold flex items-center gap-1.5">
                  <Images className="w-4 h-4 text-black" />
                  Galería de Fotos ({editingProduct.images?.length || 0}/8) • Optimización WebP
                </label>
                <MultiImageUploader
                  images={editingProduct.images || []}
                  onChange={(newImages) =>
                    setEditingProduct({
                      ...editingProduct,
                      images: newImages,
                    })
                  }
                  maxImages={8}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                      slug: e.target.value
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, ''),
                    })
                  }
                  className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={editingProduct.sku}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, sku: e.target.value })
                    }
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black font-mono"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-mono uppercase text-neutral-600 font-bold">
                      Categoría
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      className="text-[10px] font-mono text-black underline cursor-pointer"
                    >
                      + Nueva
                    </button>
                  </div>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category: e.target.value })
                    }
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                    Precio Normal ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.base_price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        base_price: Number(e.target.value),
                      })
                    }
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                    Precio Oferta ($)
                  </label>
                  <input
                    type="number"
                    placeholder="Sin oferta"
                    value={editingProduct.sale_price ?? ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        sale_price: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                    Stock Total
                  </label>
                  <input
                    type="number"
                    value={editingProduct.total_stock ?? 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        total_stock: Number(e.target.value),
                      })
                    }
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                  Descripción Técnica
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(editingProduct.id)}
                  className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-800 font-mono text-xs uppercase cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Eliminar Producto</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="bg-neutral-100 text-neutral-700 font-mono text-xs uppercase tracking-wider py-2.5 px-4 hover:bg-neutral-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider py-2.5 px-5 font-bold shadow-md cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Nuevo Producto */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="font-black text-black text-sm uppercase tracking-wider flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-black" />
                Crear Nuevo Producto Técnico
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-neutral-400 hover:text-black font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              {/* Multi-Image Uploader Component */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1.5 font-bold flex items-center gap-1.5">
                  <Images className="w-4 h-4 text-black" />
                  Galería de Fotos ({newProd.images.length}/8) • Optimización WebP
                </label>
                <MultiImageUploader
                  images={newProd.images}
                  onChange={(newImages) => setNewProd({ ...newProd, images: newImages })}
                  maxImages={8}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                  Nombre del Producto *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Cortaviento Técnico Cordillera"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                    SKU de Referencia
                  </label>
                  <input
                    type="text"
                    placeholder="WIND-COR-01"
                    value={newProd.sku}
                    onChange={(e) => setNewProd({ ...newProd, sku: e.target.value })}
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-mono uppercase text-neutral-600 font-bold">
                      Categoría
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCategoryModal(true)}
                      className="text-[10px] font-mono text-black underline cursor-pointer"
                    >
                      + Nueva
                    </button>
                  </div>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                    Precio Base ($) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newProd.base_price}
                    onChange={(e) => setNewProd({ ...newProd, base_price: Number(e.target.value) })}
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                    Precio Oferta ($)
                  </label>
                  <input
                    type="number"
                    placeholder="Opcional"
                    value={newProd.sale_price}
                    onChange={(e) => setNewProd({ ...newProd, sale_price: e.target.value })}
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                    Stock Bodega
                  </label>
                  <input
                    type="number"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                    className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-600 mb-1 font-bold">
                  Descripción Técnica y Materiales
                </label>
                <textarea
                  rows={2}
                  placeholder="Membrana tricapa, transpirabilidad, costuras selladas..."
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  className="w-full bg-white border border-neutral-300 p-2.5 text-xs text-black"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-neutral-100 text-neutral-700 font-mono text-xs uppercase tracking-wider py-3 hover:bg-neutral-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-wider py-3 shadow-md cursor-pointer font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{isSaving ? 'Guardando...' : 'Publicar en Tienda'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
