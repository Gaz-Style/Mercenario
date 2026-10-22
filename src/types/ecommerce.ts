export type ProductVariant = {
  id: string;
  product_id: string;
  sku: string;
  title: string; // e.g. "Negro / M"
  attributes: Record<string, string>; // e.g. { color: "Negro", talla: "M" }
  price: number;
  compare_at_price?: number | null;
  stock?: number;
  is_active: boolean;
  created_at?: string;
};

export type Product = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  base_price: number;
  sale_price?: number | null;
  cost_price?: number | null;
  has_variants: boolean;
  is_active: boolean;
  featured: boolean;
  images: string[];
  variants?: ProductVariant[];
  total_stock?: number;
  seo_title?: string;
  seo_description?: string;
  created_at?: string;
  updated_at?: string;
};

export type CartItem = {
  variant_id: string;
  product_id: string;
  product_name: string;
  variant_title: string;
  sku: string;
  image: string;
  unit_price: number;
  quantity: number;
  max_stock: number;
};

export type CustomerSegment = 'new' | 'recurring' | 'vip' | 'inactive';

export type Customer = {
  id: string;
  rut_dni?: string;
  full_name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  region?: string;
  total_spent: number;
  orders_count: number;
  segment: CustomerSegment;
  last_order_at?: string;
  notes?: string;
  created_at?: string;
};

export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded' | 'failed';
export type PaymentGateway = 'webpay' | 'mercadopago' | 'transferencia';

export type OrderItem = {
  id?: string;
  order_id?: string;
  product_id: string;
  variant_id?: string;
  product_title: string;
  variant_title?: string;
  sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  image?: string;
};

export type Order = {
  id: string;
  order_number: number;
  customer_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  payment_gateway: PaymentGateway;
  payment_transaction_id?: string;
  subtotal: number;
  discount_amount: number;
  shipping_cost: number;
  total_amount: number;
  shipping_address: {
    street: string;
    city: string;
    region: string;
    notes?: string;
  };
  courier_name?: string;
  tracking_number?: string;
  tracking_url?: string;
  notes?: string;
  items?: OrderItem[];
  paid_at?: string;
  dispatched_at?: string;
  created_at: string;
};

export type InventoryStock = {
  id: string;
  variant_id: string;
  location_id: string;
  location_name: string;
  available_stock: number;
  reserved_stock: number;
  min_threshold: number;
};
