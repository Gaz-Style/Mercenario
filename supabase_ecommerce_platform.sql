-- ============================================================
-- PLATAFORMA E-COMMERCE AUTOADMINISTRABLE (MERCENARIO OS)
-- Script Maestro SQL para Supabase (PostgreSQL 16)
-- ============================================================

-- Extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA: CATEGORÍAS
CREATE TABLE IF NOT EXISTS public.ecommerce_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA: PRODUCTOS
CREATE TABLE IF NOT EXISTS public.ecommerce_products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    category_id UUID REFERENCES public.ecommerce_categories(id) ON DELETE SET NULL,
    category_name VARCHAR(100) DEFAULT 'General',
    base_price NUMERIC(12, 2) NOT NULL,
    sale_price NUMERIC(12, 2),
    cost_price NUMERIC(12, 2) DEFAULT 0,
    has_variants BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    images JSONB DEFAULT '[]'::jsonb,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA: VARIANTES DE PRODUCTO
CREATE TABLE IF NOT EXISTS public.ecommerce_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.ecommerce_products(id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
    price NUMERIC(12, 2) NOT NULL,
    compare_at_price NUMERIC(12, 2),
    stock INT NOT NULL DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ERP: SUCURSALES Y BODEGAS
CREATE TABLE IF NOT EXISTS public.ecommerce_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(30) UNIQUE NOT NULL,
    address TEXT,
    is_physical_store BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ERP: CONTROL DE STOCK MULTI-BODEGA
CREATE TABLE IF NOT EXISTS public.ecommerce_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id UUID REFERENCES public.ecommerce_variants(id) ON DELETE CASCADE,
    location_id UUID REFERENCES public.ecommerce_locations(id) ON DELETE CASCADE,
    available_stock INT NOT NULL DEFAULT 0,
    reserved_stock INT NOT NULL DEFAULT 0,
    min_threshold INT DEFAULT 5,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (variant_id, location_id)
);

-- 6. CRM: CLIENTES OMNICANAL
CREATE TABLE IF NOT EXISTS public.ecommerce_customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rut_dni VARCHAR(20) UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30) NOT NULL,
    shipping_addresses JSONB DEFAULT '[]'::jsonb,
    total_spent NUMERIC(14, 2) DEFAULT 0,
    orders_count INT DEFAULT 0,
    segment VARCHAR(50) DEFAULT 'new' CHECK (segment IN ('new', 'recurring', 'vip', 'inactive')),
    last_order_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ORDENES DE COMPRA
CREATE TABLE IF NOT EXISTS public.ecommerce_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number BIGSERIAL UNIQUE,
    customer_id UUID REFERENCES public.ecommerce_customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'preparing', 'shipped', 'delivered', 'cancelled')),
    payment_status VARCHAR(50) DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'refunded', 'failed')),
    payment_gateway VARCHAR(50) NOT NULL,
    payment_transaction_id VARCHAR(255),
    subtotal NUMERIC(12, 2) NOT NULL,
    discount_amount NUMERIC(12, 2) DEFAULT 0,
    shipping_cost NUMERIC(12, 2) DEFAULT 0,
    total_amount NUMERIC(12, 2) NOT NULL,
    shipping_address JSONB NOT NULL DEFAULT '{}'::jsonb,
    courier_name VARCHAR(100),
    tracking_number VARCHAR(100),
    tracking_url TEXT,
    notes TEXT,
    paid_at TIMESTAMPTZ,
    dispatched_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ITEMS DE LA ORDEN
CREATE TABLE IF NOT EXISTS public.ecommerce_order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.ecommerce_orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.ecommerce_products(id) ON DELETE SET NULL,
    variant_id UUID REFERENCES public.ecommerce_variants(id) ON DELETE SET NULL,
    product_title VARCHAR(255) NOT NULL,
    variant_title VARCHAR(255),
    sku VARCHAR(100) NOT NULL,
    image_url TEXT,
    quantity INT NOT NULL,
    unit_price NUMERIC(12, 2) NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL
);

-- 9. LOGS DE AUTOMATIZACIÓN Y NOTIFICACIONES
CREATE TABLE IF NOT EXISTS public.ecommerce_automation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.ecommerce_orders(id) ON DELETE CASCADE,
    channel VARCHAR(30) NOT NULL, -- 'whatsapp', 'email', 'push_admin'
    recipient VARCHAR(255) NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    payload JSONB,
    status VARCHAR(20) DEFAULT 'sent',
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- FUNCION ATÓMICA: RESERVAR STOCK CONCURRENTE
CREATE OR REPLACE FUNCTION reserve_stock_atomic(
    p_variant_id UUID,
    p_location_id UUID,
    p_quantity INT
) RETURNS BOOLEAN AS $$
DECLARE
    v_available INT;
BEGIN
    SELECT available_stock - reserved_stock INTO v_available
    FROM public.ecommerce_inventory
    WHERE variant_id = p_variant_id AND location_id = p_location_id
    FOR UPDATE;

    IF v_available >= p_quantity THEN
        UPDATE public.ecommerce_inventory
        SET reserved_stock = reserved_stock + p_quantity
        WHERE variant_id = p_variant_id AND location_id = p_location_id;
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER: ACTUALIZAR MÉTRICAS DEL CLIENTE AUTOMÁTICAMENTE
CREATE OR REPLACE FUNCTION update_customer_metrics_on_order()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payment_status = 'paid' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'paid') THEN
        UPDATE public.ecommerce_customers
        SET 
            total_spent = total_spent + NEW.total_amount,
            orders_count = orders_count + 1,
            last_order_at = NOW(),
            segment = CASE 
                WHEN (total_spent + NEW.total_amount) >= 300000 OR (orders_count + 1) >= 4 THEN 'vip'
                WHEN (orders_count + 1) >= 2 THEN 'recurring'
                ELSE 'new'
            END,
            updated_at = NOW()
        WHERE id = NEW.customer_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_update_customer_metrics ON public.ecommerce_orders;
CREATE TRIGGER tr_update_customer_metrics
AFTER UPDATE OF payment_status ON public.ecommerce_orders
FOR EACH ROW
EXECUTE FUNCTION update_customer_metrics_on_order();

-- HABILITAR ROW LEVEL SECURITY (RLS)
ALTER TABLE public.ecommerce_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecommerce_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecommerce_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecommerce_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecommerce_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ecommerce_customers ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública para catálogo
CREATE POLICY "Public Read Products" ON public.ecommerce_products FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Variants" ON public.ecommerce_variants FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Categories" ON public.ecommerce_categories FOR SELECT USING (true);

-- Políticas para checkout
CREATE POLICY "Public Insert Orders" ON public.ecommerce_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Order Items" ON public.ecommerce_order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Orders by ID" ON public.ecommerce_orders FOR SELECT USING (true);
CREATE POLICY "Public Read Order Items by Order" ON public.ecommerce_order_items FOR SELECT USING (true);
CREATE POLICY "Public Insert Customers" ON public.ecommerce_customers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Customers" ON public.ecommerce_customers FOR UPDATE USING (true);
CREATE POLICY "Public Read Customers" ON public.ecommerce_customers FOR SELECT USING (true);

-- ============================================================
-- SEED DATA: DATOS DE DEMOSTRACIÓN PARA LANZAMIENTO INMEDIATO
-- ============================================================

-- Ubicaciones
INSERT INTO public.ecommerce_locations (id, name, code, is_physical_store)
VALUES 
    ('11111111-1111-1111-1111-111111111111', 'Bodega Central Vitacura', 'BOD-CENTRAL', false),
    ('22222222-2222-2222-2222-222222222222', 'Tienda Showroom Tabancura', 'SHOWROOM-TAB', true)
ON CONFLICT (code) DO NOTHING;

-- Categorías
INSERT INTO public.ecommerce_categories (id, name, slug, description)
VALUES 
    ('33333333-3333-3333-3333-333333333333', 'Chaquetas & Abrigos', 'chaquetas-abrigos', 'Indumentaria técnica y urbana de alto estándar'),
    ('44444444-4444-4444-4444-444444444444', 'Calzado & Botas', 'calzado-botas', 'Calzado reforzado para montaña y ciudad'),
    ('55555555-5555-5555-5555-555555555555', 'Accesorios Tácticos', 'accesorios-tacticos', 'Mochilas, correas y complementos funcionales')
ON CONFLICT (slug) DO NOTHING;

-- Productos
INSERT INTO public.ecommerce_products (
    id, sku, name, slug, description, category_name, base_price, sale_price, cost_price, has_variants, is_active, featured, images, seo_title
) VALUES 
(
    'a1111111-1111-1111-1111-111111111111',
    'PARKA-TACT-01',
    'Parka Alpina Mercenario StormProof',
    'parka-alpina-mercenario-stormproof',
    'Parka con membrana tricapa impermeable 20.000mm, costuras termoselladas y aislamiento térmico ligero. Diseñada para soportar condiciones extremas con estética minimalista de alta gama.',
    'Chaquetas & Abrigos',
    189990,
    149990,
    65000,
    true,
    true,
    true,
    '["https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1000&auto=format&fit=crop", "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop"]'::jsonb,
    'Parka Alpina StormProof | Mercenario'
),
(
    'a2222222-2222-2222-2222-222222222222',
    'BOTA-APEX-02',
    'Botas Cordillera Apex Vibram',
    'botas-cordillera-apex-vibram',
    'Botas de cuero nobuck hidrofugado con suela Vibram antideslizante y protección perimetral de caucho reforzado. Estabilidad absoluta en cualquier terreno.',
    'Calzado & Botas',
    169990,
    null,
    72000,
    true,
    true,
    true,
    '["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"]'::jsonb,
    'Botas Cordillera Apex | Mercenario'
),
(
    'a3333333-3333-3333-3333-333333333333',
    'MOCHILA-STEALTH-03',
    'Mochila Táctica Stealth 32L',
    'mochila-tactica-stealth-32l',
    'Mochila de Cordura 1000D resistente al agua y a la abrasión con compartimento acolchado para laptop 16" y sistema MOLLE cortado en láser.',
    'Accesorios Tácticos',
    89990,
    79990,
    31000,
    false,
    true,
    true,
    '["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop"]'::jsonb,
    'Mochila Stealth 32L | Mercenario'
)
ON CONFLICT (slug) DO NOTHING;

-- Variantes para la Parka
INSERT INTO public.ecommerce_variants (id, product_id, sku, title, attributes, price, compare_at_price, stock)
VALUES 
    ('v1111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 'PARKA-BK-M', 'Negro Mate / M', '{"color": "Negro", "talla": "M"}'::jsonb, 149990, 189990, 15),
    ('v1111111-1111-1111-1111-111111111112', 'a1111111-1111-1111-1111-111111111111', 'PARKA-BK-L', 'Negro Mate / L', '{"color": "Negro", "talla": "L"}'::jsonb, 149990, 189990, 22),
    ('v1111111-1111-1111-1111-111111111113', 'a1111111-1111-1111-1111-111111111111', 'PARKA-OL-M', 'Verde Oliva / M', '{"color": "Oliva", "talla": "M"}'::jsonb, 149990, 189990, 8)
ON CONFLICT (sku) DO NOTHING;

-- Variantes para las Botas
INSERT INTO public.ecommerce_variants (id, product_id, sku, title, attributes, price, compare_at_price, stock)
VALUES 
    ('v2222222-2222-2222-2222-222222222221', 'a2222222-2222-2222-2222-222222222222', 'BOTA-41', 'Talla 41 EU', '{"talla": "41"}'::jsonb, 169990, null, 12),
    ('v2222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 'BOTA-42', 'Talla 42 EU', '{"talla": "42"}'::jsonb, 169990, null, 18),
    ('v2222222-2222-2222-2222-222222222223', 'a2222222-2222-2222-2222-222222222223', 'BOTA-43', 'Talla 43 EU', '{"talla": "43"}'::jsonb, 169990, null, 7)
ON CONFLICT (sku) DO NOTHING;

-- Stock en bodega
INSERT INTO public.ecommerce_inventory (variant_id, location_id, available_stock, reserved_stock)
VALUES 
    ('v1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 15, 0),
    ('v1111111-1111-1111-1111-111111111112', '11111111-1111-1111-1111-111111111111', 22, 0),
    ('v1111111-1111-1111-1111-111111111113', '11111111-1111-1111-1111-111111111111', 8, 0),
    ('v2222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 12, 0),
    ('v2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 18, 0),
    ('v2222222-2222-2222-2222-222222222223', '11111111-1111-1111-1111-111111111111', 7, 0)
ON CONFLICT (variant_id, location_id) DO NOTHING;
