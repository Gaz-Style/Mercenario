import { Product, Customer, Order } from '@/types/ecommerce';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-chanar-mujer-01',
    sku: 'CHAK-MUJET-1',
    name: 'Chaqueta con gorro Chañar Mujer',
    slug: 'chaqueta-con-gorro-chanar-mujer',
    description: 'Chaqueta técnica con gorro para mujer. Membrana cortaviento y térmica diseñada para climas fríos y senderismo en montaña.',
    category: 'Chaquetas & Abrigos',
    base_price: 59990,
    sale_price: 49990,
    cost_price: 25000,
    has_variants: false,
    is_active: true,
    featured: true,
    total_stock: 20,
    images: [
      '/uploads/products/1792615326517_Retrato_de_senderismo_en_los_Alpes.webp',
      '/uploads/products/1792615331620_Excursionista_ante_monta_as_nevadas.webp',
      '/uploads/products/1792615335916_Aventura_alpina_con_mochila_beige.webp'
    ],
    variants: [
      {
        id: 'v-chanar-01',
        product_id: 'prod-chanar-mujer-01',
        sku: 'CHAK-MUJET-1-STD',
        title: 'Estándar',
        attributes: {},
        price: 49990,
        compare_at_price: 59990,
        stock: 20,
        is_active: true
      }
    ],
    seo_title: 'Chaqueta con gorro Chañar Mujer | Mercenario'
  },
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    sku: 'PARKA-TACT-01',
    name: 'Chaqueta técnica Acacio Hombre',
    slug: 'chaqueta-tecnica-acacio-hombre',
    description: 'Chaqueta térmica para hombre con diseño técnico y versátil, ideal para climas fríos. Membrana impermeable 20.000mm y costuras termoselladas.',
    category: 'Chaquetas & Abrigos',
    base_price: 59990,
    sale_price: 49990,
    cost_price: 26000,
    has_variants: true,
    is_active: true,
    featured: true,
    total_stock: 10,
    images: [
      '/uploads/products/1792614911476_Aventura_alpina_con_chaqueta_amarilla.webp',
      '/uploads/products/1792615209190_Explorador_alpino_ante_monta_as_nevadas.webp',
      '/uploads/products/1792615217513_Hiker_amarillo_ante_monta_as_nevadas-1.webp'
    ],
    variants: [
      {
        id: 'v1111111-1111-1111-1111-111111111111',
        product_id: 'a1111111-1111-1111-1111-111111111111',
        sku: 'PARKA-BK-M',
        title: 'Talla M',
        attributes: { talla: 'M' },
        price: 49990,
        compare_at_price: 59990,
        stock: 5,
        is_active: true
      },
      {
        id: 'v1111111-1111-1111-1111-111111111112',
        product_id: 'a1111111-1111-1111-1111-111111111111',
        sku: 'PARKA-BK-L',
        title: 'Talla L',
        attributes: { talla: 'L' },
        price: 49990,
        compare_at_price: 59990,
        stock: 5,
        is_active: true
      }
    ],
    seo_title: 'Chaqueta técnica Acacio Hombre | Mercenario'
  },
  {
    id: 'a2222222-2222-2222-2222-222222222222',
    sku: 'BOTA-APEX-02',
    name: 'Botas Cordillera Apex Vibram',
    slug: 'botas-cordillera-apex-vibram',
    description: 'Botas de cuero nobuck hidrofugado con suela Vibram antideslizante y protección perimetral de caucho reforzado. Estabilidad absoluta en cualquier terreno montañoso o urbano.',
    category: 'Calzado & Botas',
    base_price: 169990,
    sale_price: null,
    cost_price: 72000,
    has_variants: true,
    is_active: true,
    featured: true,
    total_stock: 37,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000'
    ],
    variants: [
      {
        id: 'v2222222-2222-2222-2222-222222222221',
        product_id: 'a2222222-2222-2222-2222-222222222222',
        sku: 'BOTA-41',
        title: 'Talla 41 EU',
        attributes: { talla: '41' },
        price: 169990,
        stock: 12,
        is_active: true
      },
      {
        id: 'v2222222-2222-2222-2222-222222222222',
        product_id: 'a2222222-2222-2222-2222-222222222222',
        sku: 'BOTA-42',
        title: 'Talla 42 EU',
        attributes: { talla: '42' },
        price: 169990,
        stock: 18,
        is_active: true
      },
      {
        id: 'v2222222-2222-2222-2222-222222222223',
        product_id: 'a2222222-2222-2222-2222-222222222222',
        sku: 'BOTA-43',
        title: 'Talla 43 EU',
        attributes: { talla: '43' },
        price: 169990,
        stock: 7,
        is_active: true
      }
    ],
    seo_title: 'Botas Cordillera Apex Vibram | Mercenario'
  },
  {
    id: 'a3333333-3333-3333-3333-333333333333',
    sku: 'MOCHILA-STEALTH-03',
    name: 'Mochila Táctica Stealth 32L',
    slug: 'mochila-tactica-stealth-32l',
    description: 'Mochila de Cordura 1000D con recubrimiento DWR repelente al agua. Compartimento ergonómico acolchado para notebook de 16", cinchas de compresión y enganches modulares cortados con láser.',
    category: 'Accesorios Tácticos',
    base_price: 89990,
    sale_price: 79990,
    cost_price: 31000,
    has_variants: false,
    is_active: true,
    featured: true,
    total_stock: 24,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000'
    ],
    variants: [
      {
        id: 'v3333333-3333-3333-3333-333333333331',
        product_id: 'a3333333-3333-3333-3333-333333333333',
        sku: 'MOCHILA-32L',
        title: 'Talla Única (32L)',
        attributes: { capacidad: '32L' },
        price: 79990,
        compare_at_price: 89990,
        stock: 24,
        is_active: true
      }
    ],
    seo_title: 'Mochila Táctica Stealth 32L | Mercenario'
  },
  {
    id: 'a4444444-4444-4444-4444-444444444444',
    sku: 'CHALECO-THERMO-04',
    name: 'Chaleco Térmico Modular Softshell',
    slug: 'chaleco-termico-modular-softshell',
    description: 'Capa intermedia elástica cortaviento y transpirable. Cuello ergonómico con forro polar, 4 bolsillos con cremalleras estancas YKK y ajuste de cintura integrado.',
    category: 'Chaquetas & Abrigos',
    base_price: 69990,
    sale_price: null,
    cost_price: 26000,
    has_variants: true,
    is_active: true,
    featured: false,
    total_stock: 19,
    images: [
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000'
    ],
    variants: [
      {
        id: 'v4444444-4444-4444-4444-444444444441',
        product_id: 'a4444444-4444-4444-4444-444444444444',
        sku: 'CHAL-BK-M',
        title: 'Negro / M',
        attributes: { color: 'Negro', talla: 'M' },
        price: 69990,
        stock: 10,
        is_active: true
      },
      {
        id: 'v4444444-4444-4444-4444-444444444442',
        product_id: 'a4444444-4444-4444-4444-444444444444',
        sku: 'CHAL-BK-L',
        title: 'Negro / L',
        attributes: { color: 'Negro', talla: 'L' },
        price: 69990,
        stock: 9,
        is_active: true
      }
    ],
    seo_title: 'Chaleco Térmico Softshell | Mercenario'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    order_number: 1001,
    customer_id: 'c-101',
    customer_name: 'Rodrigo Valenzuela',
    customer_email: 'rodrigo.valenzuela@gmail.com',
    customer_phone: '+56987654321',
    status: 'paid',
    payment_status: 'paid',
    payment_gateway: 'webpay',
    subtotal: 149990,
    discount_amount: 0,
    shipping_cost: 0,
    total_amount: 149990,
    shipping_address: {
      street: 'Av. Las Condes 12450 Depto 502',
      city: 'Las Condes',
      region: 'Región Metropolitana',
      notes: 'Dejar en conserjería'
    },
    courier_name: 'Chilexpress',
    tracking_number: 'CHI-99824102',
    tracking_url: 'https://www.chilexpress.cl/tracking?rut=CHI-99824102',
    items: [
      {
        product_id: 'a1111111-1111-1111-1111-111111111111',
        variant_id: 'v1111111-1111-1111-1111-111111111111',
        product_title: 'Chaqueta técnica Acacio Hombre',
        variant_title: 'Talla M',
        sku: 'PARKA-BK-M',
        quantity: 1,
        unit_price: 49990,
        total_price: 49990,
        image: '/uploads/products/1792614911476_Aventura_alpina_con_chaqueta_amarilla.webp'
      }
    ],
    paid_at: '2026-10-20T14:32:00Z',
    created_at: '2026-10-20T14:30:00Z'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'c-101',
    rut_dni: '16.482.910-3',
    full_name: 'Rodrigo Valenzuela',
    email: 'rodrigo.valenzuela@gmail.com',
    phone: '+56987654321',
    address: 'Av. Las Condes 12450 Depto 502',
    city: 'Las Condes',
    region: 'Región Metropolitana',
    total_spent: 420000,
    orders_count: 3,
    segment: 'vip',
    last_order_at: '2026-10-20T14:32:00Z',
    notes: 'Cliente fiel. Prefiere despacho express.'
  }
];
