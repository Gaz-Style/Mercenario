import { Product } from '@/types/ecommerce';

export interface PosSession {
  id: string;
  isOpen: boolean;
  openedAt: string;
  closedAt?: string;
  cashierName: string;
  initialCash: number;
  expectedCash: number;
  totalCardSales: number;
  totalCashSales: number;
  totalTransferSales: number;
  totalSalesAmount: number;
  salesCount: number;
}

export interface PosSaleItem {
  productId: string;
  productName: string;
  variantTitle?: string;
  sku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  image?: string;
}

export interface PosSale {
  id: string;
  receiptNumber: string; // e.g. BOL-10482
  timestamp: string;
  channel: 'pos';
  cashier: string;
  customerName: string;
  customerRut?: string;
  customerEmail?: string;
  items: PosSaleItem[];
  subtotalNeto: number; // sin IVA
  ivaAmount: number; // 19%
  totalAmount: number;
  paymentMethod: 'tarjeta' | 'efectivo' | 'transferencia';
  amountTendered?: number; // lo que pagó en efectivo
  changeGiven?: number; // vuelto
  status: 'completed' | 'cancelled';
}

const STORAGE_SESSION_KEY = 'weke_pos_session';
const STORAGE_SALES_KEY = 'weke_pos_sales';

// Ventas iniciales de demostración para que la planilla no esté vacía al mostrar a clientes
export const INITIAL_POS_SALES: PosSale[] = [
  {
    id: 'sale-pos-001',
    receiptNumber: 'BOL-10480',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    channel: 'pos',
    cashier: 'Matías Silva',
    customerName: 'Rodrigo Araya',
    customerRut: '18.421.390-2',
    customerEmail: 'rodrigo.araya@gmail.com',
    items: [
      {
        productId: 'prod-chanar-mujer-01',
        productName: 'Chaqueta con gorro Chañar Mujer',
        variantTitle: 'Negro / M',
        sku: 'CHAK-MUJET-1',
        unitPrice: 49990,
        quantity: 1,
        totalPrice: 49990,
        image: '/uploads/products/1792615326517_Retrato_de_senderismo_en_los_Alpes.webp',
      },
    ],
    subtotalNeto: 42008,
    ivaAmount: 7982,
    totalAmount: 49990,
    paymentMethod: 'tarjeta',
    status: 'completed',
  },
  {
    id: 'sale-pos-002',
    receiptNumber: 'BOL-10481',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    channel: 'pos',
    cashier: 'Matías Silva',
    customerName: 'Cliente Showroom',
    customerRut: '66.666.666-6',
    items: [
      {
        productId: 'a1111111-1111-1111-1111-111111111111',
        productName: 'Chaqueta técnica Acacio Hombre',
        variantTitle: 'Amarillo Mostaza / L',
        sku: 'PARKA-TACT-01',
        unitPrice: 49990,
        quantity: 1,
        totalPrice: 49990,
        image: '/uploads/products/1792614911476_Aventura_alpina_con_chaqueta_amarilla.webp',
      },
    ],
    subtotalNeto: 42008,
    ivaAmount: 7982,
    totalAmount: 49990,
    paymentMethod: 'efectivo',
    amountTendered: 50000,
    changeGiven: 10,
    status: 'completed',
  },
  {
    id: 'sale-pos-003',
    receiptNumber: 'BOL-10482',
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    channel: 'pos',
    cashier: 'Matías Silva',
    customerName: 'Valentina Lagos',
    customerRut: '19.823.102-K',
    customerEmail: 'valentina.lagos@outlook.com',
    items: [
      {
        productId: 'd4444444-4444-4444-4444-444444444444',
        productName: 'Mochila M30 Quintral',
        variantTitle: 'Negro / 30L',
        sku: 'MOCHILA-STEALTH-03',
        unitPrice: 34990,
        quantity: 1,
        totalPrice: 34990,
        image: '/uploads/products/1792615415707_Excursionista_con_mochila_en_la_monta_a.webp',
      },
    ],
    subtotalNeto: 29403,
    ivaAmount: 5587,
    totalAmount: 34990,
    paymentMethod: 'transferencia',
    status: 'completed',
  },
];

export function getPosSession(): PosSession {
  if (typeof window === 'undefined') {
    return {
      id: 'sess-default',
      isOpen: true,
      openedAt: new Date().toISOString(),
      cashierName: 'Administrador WEKE',
      initialCash: 50000,
      expectedCash: 99990,
      totalCardSales: 49990,
      totalCashSales: 49990,
      totalTransferSales: 34990,
      totalSalesAmount: 134970,
      salesCount: 3,
    };
  }

  const stored = localStorage.getItem(STORAGE_SESSION_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading POS session', e);
    }
  }

  const defaultSession: PosSession = {
    id: 'sess-' + Date.now(),
    isOpen: true,
    openedAt: new Date().toISOString(),
    cashierName: 'Administrador WEKE',
    initialCash: 50000,
    expectedCash: 99990,
    totalCardSales: 49990,
    totalCashSales: 49990,
    totalTransferSales: 34990,
    totalSalesAmount: 134970,
    salesCount: 3,
  };
  localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(defaultSession));
  return defaultSession;
}

export function savePosSession(session: PosSession): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
}

export function getPosSales(): PosSale[] {
  if (typeof window === 'undefined') return INITIAL_POS_SALES;
  const stored = localStorage.getItem(STORAGE_SALES_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading POS sales', e);
    }
  }
  localStorage.setItem(STORAGE_SALES_KEY, JSON.stringify(INITIAL_POS_SALES));
  return INITIAL_POS_SALES;
}

export function registerPosSale(sale: Omit<PosSale, 'id' | 'receiptNumber' | 'timestamp' | 'channel'>): PosSale {
  const allSales = getPosSales();
  const nextNumber = 10483 + allSales.length;
  const newSale: PosSale = {
    ...sale,
    id: 'pos-' + Date.now(),
    receiptNumber: `BOL-${nextNumber}`,
    timestamp: new Date().toISOString(),
    channel: 'pos',
  };

  const updatedSales = [newSale, ...allSales];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_SALES_KEY, JSON.stringify(updatedSales));

    // Update active session
    const session = getPosSession();
    if (session.isOpen) {
      session.salesCount += 1;
      session.totalSalesAmount += newSale.totalAmount;
      if (newSale.paymentMethod === 'tarjeta') session.totalCardSales += newSale.totalAmount;
      if (newSale.paymentMethod === 'efectivo') {
        session.totalCashSales += newSale.totalAmount;
        session.expectedCash += newSale.totalAmount;
      }
      if (newSale.paymentMethod === 'transferencia') session.totalTransferSales += newSale.totalAmount;
      savePosSession(session);
    }
  }

  return newSale;
}
