-- MASTER SCRIPT - TODOS LOS MODULOS CONSOLIDADOS

-- ===================================
-- ARCHIVO: supabase_mercenario_saas.sql
-- ===================================

-- ============================================================
-- MERCENARIO OS - Módulos SaaS B2B
-- Ejecutar en el proyecto Supabase de Mercenario Admin
-- ============================================================

-- ============================================================
-- MÓDULO 0: LEADS DE CAPTACIÓN B2B (LANDING PAGE)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    challenge TEXT,
    budget TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS para leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to leads"
    ON public.leads FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Allow read access to authenticated users on leads"
    ON public.leads FOR SELECT
    USING (true);

-- ============================================================
-- MÓDULO 1: CONTROL DE LICENCIAS
-- Registra cada cliente, su plan contratado y estado de licencia
-- ============================================================
CREATE TABLE IF NOT EXISTS client_licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL UNIQUE,
    client_phone TEXT,
    niche_type TEXT NOT NULL, -- 'TEXTIL', 'SALUD', 'LOGISTICA', 'RETAIL', 'GASTRO', etc.
    plan_name TEXT NOT NULL DEFAULT 'starter', -- 'starter', 'pro', 'enterprise'
    plan_price_clp INTEGER NOT NULL DEFAULT 0,
    license_key UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','suspended','expired','cancelled')),
    instance_url TEXT, -- URL del sistema desplegado del cliente
    supabase_project_id TEXT, -- ID del proyecto Supabase dedicado del cliente
    activated_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MÓDULO 2: TABLERO DE TELEMETRÍA (Consumo mensual por cliente)
-- Registra el consumo de recursos para facturación variable
-- ============================================================
CREATE TABLE IF NOT EXISTS client_telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_id UUID REFERENCES client_licenses(id) ON DELETE CASCADE,
    period_month TEXT NOT NULL, -- Ej: '2026-06'
    whatsapp_messages_sent INTEGER DEFAULT 0,
    ai_tokens_consumed INTEGER DEFAULT 0,
    db_rows_used INTEGER DEFAULT 0,
    pos_transactions_count INTEGER DEFAULT 0,
    pos_transactions_volume_clp BIGINT DEFAULT 0, -- Volumen total facturado en POS
    last_pulse_at TIMESTAMPTZ, -- Último ping recibido del endpoint /api/pulse
    server_status TEXT DEFAULT 'online' CHECK (server_status IN ('online','offline','degraded')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(license_id, period_month)
);

-- ============================================================
-- MÓDULO 3: ÓRDENES DE DESPLIEGUE (ERP Técnico de Mercenario)
-- Controla las etapas de instalación del sistema de cada cliente
-- ============================================================
CREATE TABLE IF NOT EXISTS deployment_orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_id UUID REFERENCES client_licenses(id) ON DELETE CASCADE,
    assigned_tech TEXT, -- Nombre del técnico de Mercenario asignado
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
        'pending',          -- Pago confirmado, pendiente de inicio
        'db_provisioned',   -- Base de datos Supabase creada
        'repo_deployed',    -- Repositorio clonado y desplegado en Vercel
        'env_configured',   -- Variables de entorno configuradas
        'whatsapp_linked',  -- WhatsApp API vinculado y probado
        'payments_linked',  -- Pasarelas de pago vinculadas y probadas
        'ai_trained',       -- Bot de IA entrenado con datos del cliente
        'delivered'         -- Sistema entregado y Go Live confirmado
    )),
    notes TEXT, -- Notas del técnico durante el proceso
    started_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MÓDULO 4: MÉTRICAS SaaS (Para el BI del dueño de Mercenario)
-- Snapshot mensual de métricas de negocio SaaS
-- ============================================================
CREATE TABLE IF NOT EXISTS saas_metrics_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    period_month TEXT NOT NULL UNIQUE, -- Ej: '2026-06'
    mrr_clp BIGINT DEFAULT 0, -- Monthly Recurring Revenue total
    new_clients INTEGER DEFAULT 0, -- Clientes nuevos en el período
    churned_clients INTEGER DEFAULT 0, -- Clientes que cancelaron
    active_clients INTEGER DEFAULT 0, -- Total clientes activos
    churn_rate NUMERIC(5,2) DEFAULT 0, -- % de bajas sobre total activos
    infra_cost_clp BIGINT DEFAULT 0, -- Gasto en servidores + APIs Meta + IA
    gross_margin_clp BIGINT DEFAULT 0, -- MRR - Costo de infraestructura
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MÓDULO 5: PORTAL DE CLIENTE (Tickets de soporte y facturación)
-- Los clientes pueden consultar su estado y abrir tickets
-- ============================================================
CREATE TABLE IF NOT EXISTS client_support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_id UUID REFERENCES client_licenses(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low','normal','high','critical')),
    status TEXT DEFAULT 'open' CHECK (status IN ('open','in_progress','resolved','closed')),
    assigned_tech TEXT,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE client_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_telemetry ENABLE ROW LEVEL SECURITY;
ALTER TABLE deployment_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE saas_metrics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_support_tickets ENABLE ROW LEVEL SECURITY;

-- Solo el service_role puede leer y escribir estas tablas (admin únicamente)
CREATE POLICY "service_role_only" ON client_licenses FOR ALL TO service_role USING (true);
CREATE POLICY "service_role_only" ON client_telemetry FOR ALL TO service_role USING (true);
CREATE POLICY "service_role_only" ON deployment_orders FOR ALL TO service_role USING (true);
CREATE POLICY "service_role_only" ON saas_metrics_snapshots FOR ALL TO service_role USING (true);
CREATE POLICY "service_role_only" ON client_support_tickets FOR ALL TO service_role USING (true);


-- ===================================
-- ARCHIVO: supabase_settings_schema.sql
-- ===================================

-- Table: Company Settings (Global Cost Parameters)
CREATE TABLE IF NOT EXISTS public.company_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Initial default settings
INSERT INTO public.company_settings (key, value)
VALUES 
    ('cost_structure', '{
        "labor_hourly_rate": 25000,
        "operational_fixed_cost": 349000,
        "default_margin_percentage": 15
    }')
ON CONFLICT (key) DO NOTHING;


-- ===================================
-- ARCHIVO: supabase_MASTER_ERP_v2.sql
-- ===================================

-- ########################################################
-- # MASTER ERP SCHEMA v2.0 - ELENA ATELIER (WORLD CLASS)
-- ########################################################

-- 1. EXTENSIONS & SETUP
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. MASTER DATA: PROVIDERS & CUSTOMERS
CREATE TABLE IF NOT EXISTS public.providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rut TEXT UNIQUE NOT NULL,
    business_name TEXT NOT NULL, -- Razón Social
    commercial_activity TEXT, -- Giro
    address TEXT,
    phone TEXT,
    email TEXT,
    rating INTEGER DEFAULT 5, -- Calificación de cumplimiento
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    rut TEXT UNIQUE,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    birthday DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PRODUCT DESIGN & PLM (ESTILO-TALLA-COLOR)
CREATE TABLE IF NOT EXISTS public.styles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL, -- Código de Diseño
    name TEXT NOT NULL,
    season TEXT,
    description TEXT,
    tech_sheet_url TEXT, -- Link a ficha técnica (PDF/Img)
    base_price NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    style_id UUID REFERENCES public.styles(id) ON DELETE CASCADE,
    sku TEXT UNIQUE NOT NULL,
    size TEXT NOT NULL, -- S, M, L, XL, etc.
    color TEXT NOT NULL, -- Nombre o Pantone
    fabric_type TEXT,
    stock_qty DECIMAL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.bill_of_materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id UUID REFERENCES public.variants(id) ON DELETE CASCADE,
    item_name TEXT NOT NULL, -- Tela, Hilo, Botón
    required_qty DECIMAL NOT NULL,
    unit TEXT DEFAULT 'mts', -- mts, unidades, grs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. PRODUCTION & SHOP FLOOR CONTROL (QR DRIVEN)
CREATE TABLE IF NOT EXISTS public.production_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    variant_id UUID REFERENCES public.variants(id),
    order_number TEXT NOT NULL,
    qr_code TEXT UNIQUE NOT NULL,
    qty_pieces INTEGER NOT NULL,
    status TEXT DEFAULT 'pending', -- pending, cutting, sewing, quality_control, finished
    current_station TEXT,
    deadline DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.production_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.production_orders(id) ON DELETE CASCADE,
    operator_id UUID, -- Referencia a tabla de personal (por crear)
    station_name TEXT NOT NULL,
    event_type TEXT NOT NULL, -- start, pause, finish
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    efficiency_score DECIMAL -- Calculado en base a SAM
);

-- 5. BESPOKE (ALTA COSTURA A MEDIDA)
CREATE TABLE IF NOT EXISTS public.client_measurements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    version_name TEXT NOT NULL, -- Ej: 'Boda Mayo 2026'
    measurements JSONB NOT NULL, -- { busto: 90, cintura: 70, ... }
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

DROP TABLE IF EXISTS public.sales_ledger CASCADE;

CREATE TABLE IF NOT EXISTS public.sales_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    internal_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    seller_id TEXT,
    branch TEXT DEFAULT 'Presencial',
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    order_id UUID REFERENCES public.production_orders(id) ON DELETE SET NULL,
    net_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    tax_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'pending',
    payment_method TEXT,
    external_transaction_id TEXT,
    tax_document_type TEXT,
    tax_document_folio TEXT,
    invoice_status TEXT DEFAULT 'pending',
    invoice_url TEXT
);

-- 6. FINANCE & TAX LEDGER (CHILEAN COMPLIANT)
CREATE TABLE IF NOT EXISTS public.purchase_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    provider_id UUID REFERENCES public.providers(id),
    document_type TEXT NOT NULL, -- Factura, Boleta, Boleta Honorarios, Voucher
    document_number TEXT NOT NULL,
    description TEXT,
    net_amount NUMERIC NOT NULL DEFAULT 0,
    vat_amount NUMERIC NOT NULL DEFAULT 0, -- IVA 19%
    exempt_amount NUMERIC DEFAULT 0,
    withholding_amount NUMERIC DEFAULT 0, -- Retención 13.75%
    total_amount NUMERIC NOT NULL DEFAULT 0,
    category TEXT NOT NULL, -- variable, fixed
    payment_status TEXT DEFAULT 'pending', -- pending, paid, partial
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. SECURITY & ACCESS
ALTER TABLE public.providers DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.styles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.variants DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.bill_of_materials DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_measurements DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_ledger DISABLE ROW LEVEL SECURITY;

-- 8. SEED DATA: CORE PROVIDERS (EXAMPLES)
INSERT INTO public.providers (rut, business_name, commercial_activity) VALUES
('76.123.456-7', 'Telas Santiago S.A.', 'Distribución de Textiles'),
('77.987.654-K', 'Insumos Costura Ltda.', 'Venta de Hilos y Agujas')
ON CONFLICT (rut) DO NOTHING;


-- ===================================
-- ARCHIVO: supabase_migrations_erp_inventory.sql
-- ===================================

-- ==========================================
-- ELENA ATELIER: ERP INVENTORY & BOM (Fase 1)
-- ==========================================

-- 1. Inventario del Atelier (Telas, Hilos, Avíos)
CREATE TABLE public.erp_inventory (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    sku TEXT UNIQUE,
    category TEXT,
    color TEXT,
    composition TEXT,
    stock_qty NUMERIC NOT NULL DEFAULT 0,
    unit TEXT NOT NULL,
    cost_per_unit NUMERIC NOT NULL DEFAULT 0,
    supplier_info TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS para erp_inventory
ALTER TABLE public.erp_inventory ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for authenticated users" ON public.erp_inventory FOR ALL USING (true);

-- 2. Ficha Técnica / Bill of Materials (BOM)
-- Relaciona las órdenes de producción del CRM con los insumos del ERP
CREATE TABLE public.erp_order_bom (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES public.production_orders(id) ON DELETE CASCADE,
    item_id UUID REFERENCES public.erp_inventory(id) ON DELETE RESTRICT,
    estimated_qty NUMERIC NOT NULL DEFAULT 0,
    used_qty NUMERIC,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS para erp_order_bom
ALTER TABLE public.erp_order_bom ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable all access for authenticated users" ON public.erp_order_bom FOR ALL USING (true);

-- ==========================================
-- TRIGGERS DE INVENTARIO
-- ==========================================

-- Trigger para descontar stock automáticamente cuando la orden pasa a 'En Corte'
-- Nota: La tabla actual se llama `production_orders` y su campo es `status`.
CREATE OR REPLACE FUNCTION deduct_inventory_on_cut()
RETURNS TRIGGER AS $$
DECLARE
    bom_record RECORD;
BEGIN
    -- Si la orden cambia al estado 'En Corte' (y antes no lo estaba)
    IF NEW.status = 'En Corte' AND OLD.status != 'En Corte' THEN
        -- Recorrer todos los materiales de la ficha técnica de esta orden
        FOR bom_record IN 
            SELECT item_id, COALESCE(used_qty, estimated_qty) as qty_to_deduct 
            FROM public.erp_order_bom 
            WHERE order_id = NEW.id
        LOOP
            -- Descontar del inventario
            UPDATE public.erp_inventory
            SET stock_qty = stock_qty - bom_record.qty_to_deduct
            WHERE id = bom_record.item_id;
        END LOOP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_order_cutting
    AFTER UPDATE ON public.production_orders
    FOR EACH ROW
    EXECUTE FUNCTION deduct_inventory_on_cut();


-- ===================================
-- ARCHIVO: supabase_migrations_hr_payroll.sql
-- ===================================

-- =======================================================================================
-- FASE 2: RRHH Y LIQUIDACIÓN POR DESTAJO (NATIVO EN SUPABASE)
-- =======================================================================================

-- 1. Creamos la tabla base de personal (atelier_operators)
CREATE TABLE IF NOT EXISTS public.atelier_operators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    rut TEXT UNIQUE,
    phone TEXT,
    email TEXT,
    role TEXT DEFAULT 'operator',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 1.5 Ampliamos la tabla existente de operarios (atelier_operators) para soportar tipos de contrato
ALTER TABLE public.atelier_operators 
ADD COLUMN IF NOT EXISTS contract_type TEXT CHECK (contract_type IN ('fixed', 'piecework', 'percentage')) DEFAULT 'fixed',
ADD COLUMN IF NOT EXISTS base_salary NUMERIC DEFAULT 0, -- Sueldo base mensual si aplica
ADD COLUMN IF NOT EXISTS commission_percentage NUMERIC DEFAULT 0; -- % de comisión si aplica

-- 2. Tabla para registrar las asignaciones y comisiones por prenda (Liquidación a destajo)
CREATE TABLE IF NOT EXISTS public.hrm_garment_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES public.atelier_operators(id) ON DELETE CASCADE,
    production_order_id UUID NOT NULL REFERENCES public.production_orders(id) ON DELETE CASCADE,
    
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    
    payment_type TEXT NOT NULL CHECK (payment_type IN ('fixed_piece', 'percentage')),
    calculated_amount NUMERIC NOT NULL DEFAULT 0, -- Monto a pagar por esta prenda específica
    status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'paid')) DEFAULT 'pending',
    
    UNIQUE(operator_id, production_order_id)
);

-- 3. Trigger para calcular automáticamente la comisión cuando una prenda se marca como "completed"
CREATE OR REPLACE FUNCTION public.calculate_piecework_payroll()
RETURNS TRIGGER AS $$
DECLARE
    op_contract TEXT;
    op_pct NUMERIC;
    order_sale_price NUMERIC;
    calculated_pay NUMERIC := 0;
BEGIN
    -- Solo actuar si el estado cambia a 'ready' o 'delivered' y hay un operador asignado
    IF (NEW.status = 'ready' OR NEW.status = 'delivered') AND OLD.status NOT IN ('ready', 'delivered') AND NEW.assigned_operator_id IS NOT NULL THEN
        
        -- Obtener datos del operador
        SELECT contract_type, commission_percentage 
        INTO op_contract, op_pct 
        FROM public.atelier_operators 
        WHERE id = NEW.assigned_operator_id;

        IF op_contract = 'percentage' THEN
            -- Calcular en base al precio de la orden (requiere join con sales_ledger o un estimado)
            -- Asumiremos que tenemos el valor en la orden o buscaremos en sales_ledger
            SELECT (total_amount / (SELECT count(*) FROM production_orders WHERE sale_id = NEW.sale_id))
            INTO order_sale_price
            FROM sales_ledger WHERE id = NEW.sale_id;

            IF order_sale_price IS NOT NULL THEN
                calculated_pay := (order_sale_price * op_pct) / 100;
            END IF;

            -- Registrar o actualizar la asignación
            INSERT INTO public.hrm_garment_assignments (
                operator_id, production_order_id, payment_type, calculated_amount, status, completed_at
            ) VALUES (
                NEW.assigned_operator_id, NEW.id, 'percentage', calculated_pay, 'completed', NOW()
            )
            ON CONFLICT (operator_id, production_order_id) DO UPDATE 
            SET calculated_amount = EXCLUDED.calculated_amount,
                status = 'completed',
                completed_at = NOW();

        ELSIF op_contract = 'piecework' THEN
            -- Destajo fijo por prenda (se asume tarifa fija por horas o complejidad)
            -- Ejemplo: Tarifa base por hora del taller * estimated_hours
            calculated_pay := NEW.estimated_hours * 5000; -- Valor ejemplo por hora

            INSERT INTO public.hrm_garment_assignments (
                operator_id, production_order_id, payment_type, calculated_amount, status, completed_at
            ) VALUES (
                NEW.assigned_operator_id, NEW.id, 'fixed_piece', calculated_pay, 'completed', NOW()
            )
            ON CONFLICT (operator_id, production_order_id) DO UPDATE 
            SET calculated_amount = EXCLUDED.calculated_amount,
                status = 'completed',
                completed_at = NOW();
        END IF;

    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_calculate_payroll ON public.production_orders;
CREATE TRIGGER trigger_calculate_payroll
AFTER UPDATE ON public.production_orders
FOR EACH ROW
EXECUTE FUNCTION public.calculate_piecework_payroll();


-- ===================================
-- ARCHIVO: supabase_catalog_schema.sql
-- ===================================

-- Table: Catalog (Products and Services)
CREATE TABLE IF NOT EXISTS public.catalog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL,
    category TEXT NOT NULL, -- Servicio, Confección, Suministro, etc.
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert real data from notebook
INSERT INTO public.catalog (name, description, price, category)
VALUES 
    ('Basta Máquina', 'Dobladillo estándar realizado a máquina', 8000, 'Bastas'),
    ('Basta Postizo', 'Dobladillo con pieza de tela adicional', 12000, 'Bastas'),
    ('Basta a Mano', 'Dobladillo artesanal invisible hecho a mano', 12000, 'Bastas'),
    ('Basta Sesgo', 'Terminación de basta con cinta de sesgo', 15000, 'Bastas'),
    ('Basta Vestido con Cola', 'Ajuste de largo para vestido con cola', 35000, 'Bastas'),
    ('Basta Vestido s/Cola', 'Ajuste de largo para vestido sin cola', 20000, 'Bastas'),
    ('Basta Vestido Simple', 'Ajuste de largo para vestido recto o simple', 18000, 'Bastas'),
    ('Basta Chaqueta s/Forro', 'Ajuste de largo en chaqueta sin forro interno', 20000, 'Bastas'),
    ('Basta Chaqueta c/Forro', 'Ajuste de largo en chaqueta con forro técnico', 25000, 'Bastas'),
    ('Basta Abrigo / Chaquetón', 'Ajuste de largo para prendas de abrigo pesadas', 25000, 'Bastas'),
    ('Confección Base', 'Servicio base de confección por prenda', 35000, 'Confección'),
    ('Confección Falda', 'Confección completa de falda a medida', 45000, 'Confección'),
    ('Confección Pantalón', 'Confección completa de pantalón a medida', 50000, 'Confección'),
    ('Confección Vestido Simple', 'Confección de vestido recto o básico', 75000, 'Confección'),
    ('Vestido Fiesta s/Cola', 'Confección de vestido de fiesta sin cola', 180000, 'Gala/Novias'),
    ('Vestido Graduación c/Cola', 'Confección de vestido de graduación con cola', 240000, 'Gala/Novias'),
    ('Vestido Madrina s/Cola', 'Confección de vestido de madrina sin cola', 260000, 'Gala/Novias'),
    ('Vestido Madrina c/Cola', 'Confección de vestido de madrina con cola', 310000, 'Gala/Novias'),
    ('Vestido Novia (Base)', 'Confección base de vestido de novia artesanal', 400000, 'Gala/Novias')
ON CONFLICT DO NOTHING;

-- Actualizaci�n para Cat�logo Inteligente
ALTER TABLE public.catalog ADD COLUMN IF NOT EXISTS production_time_minutes INTEGER DEFAULT 0;
ALTER TABLE public.catalog ADD COLUMN IF NOT EXISTS material_cost NUMERIC DEFAULT 0;
ALTER TABLE public.catalog ADD COLUMN IF NOT EXISTS suggested_price NUMERIC DEFAULT 0;



-- ===================================
-- ARCHIVO: supabase_finance_schema.sql
-- ===================================

-- Extension for financial modules
CREATE TABLE IF NOT EXISTS public.sales_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES public.production_orders(id),
    customer_id UUID REFERENCES public.customers(id),
    amount DECIMAL(12,2) NOT NULL,
    tax_amount DECIMAL(12,2) NOT NULL, -- 19% IVA in Chile
    payment_method TEXT, -- mercado_pago, transfer, credit_card
    invoice_status TEXT DEFAULT 'pending', -- pending, generated, sent
    invoice_url TEXT, -- SimpleAPI link
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Expenses
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category TEXT NOT NULL, -- fabrics, utilities, rent, salaries
    amount DECIMAL(12,2) NOT NULL,
    description TEXT,
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Financial Goals
CREATE TABLE IF NOT EXISTS public.financial_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    month DATE NOT NULL,
    target_sales DECIMAL(12,2) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table: Employees (Buk Sync)
CREATE TABLE IF NOT EXISTS public.employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    buk_id TEXT UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT,
    salary DECIMAL(12,2),
    status TEXT DEFAULT 'active',
    last_sync TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);


-- ===================================
-- ARCHIVO: supabase_migrations_erp_finances.sql
-- ===================================

-- ==========================================
-- ELENA ATELIER: ERP FINANCES (Fase 1)
-- ==========================================

-- Expandimos la tabla sales_ledger actual para registrar costos internos
ALTER TABLE public.sales_ledger
ADD COLUMN IF NOT EXISTS materials_cost NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS labor_cost NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS profit_margin NUMERIC DEFAULT 0;

-- Podemos crear una vista o función para calcular el profit_margin automáticamente
-- (Total Amount - Taxes) - (Materials Cost + Labor Cost) = Profit Margin

CREATE OR REPLACE FUNCTION update_profit_margin()
RETURNS TRIGGER AS $$
BEGIN
    NEW.profit_margin := (NEW.net_amount) - (COALESCE(NEW.materials_cost, 0) + COALESCE(NEW.labor_cost, 0));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_sales_ledger_costs_update ON public.sales_ledger;

CREATE TRIGGER on_sales_ledger_costs_update
    BEFORE INSERT OR UPDATE OF net_amount, materials_cost, labor_cost
    ON public.sales_ledger
    FOR EACH ROW
    EXECUTE FUNCTION update_profit_margin();


-- ===================================
-- ARCHIVO: supabase_migrations_sales_ledger.sql
-- ===================================

-- La tabla sales_ledger ya fue creada arriba con todos los campos necesarios.

-- Enable RLS
ALTER TABLE public.sales_ledger ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Enable read access for all authenticated users" 
ON public.sales_ledger FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" 
ON public.sales_ledger FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update access for all users" 
ON public.sales_ledger FOR UPDATE USING (true);

-- Add foreign key to production_orders
ALTER TABLE public.production_orders
ADD COLUMN IF NOT EXISTS sale_id UUID REFERENCES public.sales_ledger(id) ON DELETE SET NULL;


-- ===================================
-- ARCHIVO: supabase_migrations_payments.sql
-- ===================================

-- Agregar columnas necesarias para la gestión de pagos en el POS
ALTER TABLE public.production_orders 
ADD COLUMN IF NOT EXISTS pos_order_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_method TEXT;

-- Crear un índice opcional en pos_order_id para búsquedas más rápidas en el webhook
CREATE INDEX IF NOT EXISTS idx_production_orders_pos_order_id ON public.production_orders(pos_order_id);


-- ===================================
-- ARCHIVO: supabase_marketing_module.sql
-- ===================================

-- ========================================================
-- SISTEMA DE MARKETING & POSICIONAMIENTO - MERCENARIO OS
-- ========================================================

-- 1. Eliminar la tabla si existe para reiniciar los datos limpios
DROP TABLE IF EXISTS public.marketing_tasks;

-- 2. Crear tabla de tareas de marketing (Las 22 herramientas B2B)
CREATE TABLE public.marketing_tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('SEO & GEO', 'Meta Ads', 'Influencer Loop', 'Automatización CRM', 'Viral Loop (Referidos)')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('completed', 'in_progress', 'pending')),
    target_date TEXT NOT NULL,
    impact TEXT NOT NULL CHECK (impact IN ('Alto', 'Medio', 'Bajo')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Habilitar RLS
ALTER TABLE public.marketing_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on marketing_tasks"
    ON public.marketing_tasks
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- 4. Poblar datos iniciales reales (El Checklist de 22 Herramientas)
INSERT INTO public.marketing_tasks (title, description, category, status, target_date, impact) VALUES
-- PILAR 1: SEO & GEO
('Optimización de Metadatos B2B', 'Implementar el título premium y la meta descripción optimizada para Google.', 'SEO & GEO', 'completed', 'Logrado', 'Alto'),
('Schema LocalBusiness Estructurado', 'Inyección de JSON-LD con coordenadas y servicios clave para IA.', 'SEO & GEO', 'completed', 'Logrado', 'Alto'),
('Ficha de Google Business Profile', 'Modificar el nombre oficial y alinear la dirección física.', 'SEO & GEO', 'completed', 'Logrado', 'Alto'),
('Campaña de Reseñas Automáticas', 'Flujo de envío automatizado utilizando el enlace de reseña directa.', 'SEO & GEO', 'in_progress', 'En Curso', 'Alto'),
('Programmatic SEO de Nicho', 'Generación masiva de cientos de landing pages por industria B2B.', 'SEO & GEO', 'pending', 'Pendiente', 'Alto'),

-- PILAR 2: Meta Ads
('Anuncios B2B en LinkedIn Ads', 'Pauta segmentada directa a dueños de clínicas y retail.', 'Meta Ads', 'in_progress', 'En Curso', 'Alto'),
('Reels ASMR & Casos de Uso', 'Videos estéticos de 15 segundos mostrando la infraestructura en acción.', 'Meta Ads', 'in_progress', 'En Curso', 'Medio'),
('Geofencing Ads en Polos Financieros', 'Configurar anuncios con radio ultra-acotado en El Golf y Nueva Las Condes.', 'Meta Ads', 'pending', 'Pendiente', 'Alto'),
('Retargeting a Visitas Landing', 'Campañas de remarketing exclusivas para quienes iniciaron la auditoría.', 'Meta Ads', 'pending', 'Pendiente', 'Alto'),
('Asistente de Contenido IA para Ads', 'Módulo interno para crear copys automáticos basados en métricas.', 'Meta Ads', 'pending', 'Pendiente', 'Medio'),

-- PILAR 3: Influencer Loop
('Programa "Early Adopters VIP"', 'Identificar a 5 CEOs locales para darles acceso a costo cero a cambio de casos de éxito.', 'Influencer Loop', 'pending', 'Pendiente', 'Alto'),
('Alianzas B2B con Consultoras', 'Asociarse con firmas contables para ofrecer Mercenario como solución ERP.', 'Influencer Loop', 'pending', 'Pendiente', 'Alto'),
('Webinars con Referentes B2B', 'Organizar charlas online sobre infraestructura tecnológica con líderes de industria.', 'Influencer Loop', 'pending', 'Pendiente', 'Medio'),
('UGC B2B (User Generated Content)', 'Capturar reacciones en vivo de gerentes al usar el dashboard de BI.', 'Influencer Loop', 'pending', 'Pendiente', 'Alto'),

-- PILAR 4: Automatización CRM
('Flujos de Correo Enriquecidos (Drip)', 'Conectar formularios a Resend para correos hiper-personalizados por industria.', 'Automatización CRM', 'pending', 'Pendiente', 'Alto'),
('Alerta WhatsApp Tiempo Real', 'Conectar el pipeline con alertas instantáneas al agendar una demo.', 'Automatización CRM', 'pending', 'Pendiente', 'Alto'),
('Newsletter Editorial "Growth B2B"', 'Boletín automatizado con tácticas de escalamiento para prospectos.', 'Automatización CRM', 'pending', 'Pendiente', 'Medio'),
('Reactivación de Leads Fríos', 'Cron job semanal para contactar a dueños que no respondieron en 30 días.', 'Automatización CRM', 'pending', 'Pendiente', 'Medio'),

-- PILAR 5: Viral Loop
('Programa de Referidos B2B', 'Descuento cruzado: la empresa recomendada y la recomendadora ganan 2 meses gratis.', 'Viral Loop (Referidos)', 'pending', 'Pendiente', 'Alto'),
('Tarjetas NFC de Bienvenida', 'Tarjetas metálicas inteligentes que las empresas pueden mostrar a sus socios.', 'Viral Loop (Referidos)', 'pending', 'Pendiente', 'Medio'),
('Leaderboard de Adopción', 'Gamificación interna mostrando qué clientes tienen mejor uso del ecosistema.', 'Viral Loop (Referidos)', 'pending', 'Pendiente', 'Bajo'),
('Sello "Powered by Mercenario"', 'Widget en las facturas y correos de las empresas clientes llevando a nuestra landing.', 'Viral Loop (Referidos)', 'pending', 'Pendiente', 'Alto');


-- ===================================
-- ARCHIVO: supabase_migrations_ai_agents.sql
-- ===================================

-- =======================================================================================
-- FASE 3: INFRAESTRUCTURA MULTI-AGENTE (IA) Y CRM WHATSAPP
-- =======================================================================================

-- 1. Tabla de Mensajería y Memoria de WhatsApp (CRM)
CREATE TABLE IF NOT EXISTS public.crm_whatsapp_chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number TEXT NOT NULL,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    
    -- Manejo de estado conversacional
    session_status TEXT NOT NULL CHECK (session_status IN ('bot', 'human_handoff', 'closed')) DEFAULT 'bot',
    lead_score NUMERIC DEFAULT 0, -- 0 a 100 (probabilidad de venta)
    last_interaction TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Contexto JSON para el Agente (memoria corta)
    context JSONB DEFAULT '{}'::jsonb,
    
    UNIQUE(phone_number)
);

-- 2. Historial de mensajes individuales (Memoria Larga)
CREATE TABLE IF NOT EXISTS public.crm_whatsapp_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID NOT NULL REFERENCES public.crm_whatsapp_chats(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('customer', 'bot', 'human')),
    message_type TEXT NOT NULL CHECK (message_type IN ('text', 'image', 'audio', 'document', 'interactive')),
    content TEXT,
    media_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Cola de Tareas Asíncronas (Orquestador Multi-Agente)
CREATE TABLE IF NOT EXISTS public.ai_agent_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_role TEXT NOT NULL CHECK (agent_role IN ('whatsapp_closer', 'hr_manager', 'erp_analyst', 'marketing_seo')),
    
    payload JSONB NOT NULL, -- Datos de entrada para el agente
    
    status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')) DEFAULT 'pending',
    result JSONB, -- Respuesta o acción generada por el agente
    error_log TEXT,
    
    prompt_tokens INTEGER DEFAULT 0,
    completion_tokens INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

-- 4. Notificaciones push al dashboard
CREATE TABLE IF NOT EXISTS public.system_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('ai_insight', 'payment', 'hr_alert', 'whatsapp')),
    read BOOLEAN DEFAULT false,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Trigger: Cuando entra un mensaje de WhatsApp nuevo (o cambia el chat), generar una tarea para el orquestador
CREATE OR REPLACE FUNCTION public.enqueue_whatsapp_agent_task()
RETURNS TRIGGER AS $$
BEGIN
    -- Si es un mensaje del cliente, encolamos tarea para el bot (solo si el chat está en modo bot)
    IF NEW.sender_type = 'customer' THEN
        IF (SELECT session_status FROM public.crm_whatsapp_chats WHERE id = NEW.chat_id) = 'bot' THEN
            INSERT INTO public.ai_agent_tasks (agent_role, payload)
            VALUES ('whatsapp_closer', jsonb_build_object('chat_id', NEW.chat_id, 'message_id', NEW.id, 'content', NEW.content));
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_enqueue_whatsapp ON public.crm_whatsapp_messages;
CREATE TRIGGER trigger_enqueue_whatsapp
AFTER INSERT ON public.crm_whatsapp_messages
FOR EACH ROW
EXECUTE FUNCTION public.enqueue_whatsapp_agent_task();


-- ===================================
-- ARCHIVO: supabase_migrations_system_logs.sql
-- ===================================

CREATE TABLE IF NOT EXISTS public.system_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()) NOT NULL,
    service TEXT NOT NULL, -- e.g., 'MercadoPago Webhook', 'Transbank'
    level TEXT NOT NULL, -- 'INFO', 'WARN', 'ERROR'
    message TEXT NOT NULL,
    payload JSONB
);

-- Enable RLS
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Enable read access for all authenticated users" 
ON public.system_logs FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" 
ON public.system_logs FOR INSERT WITH CHECK (true);


