-- ============================================================
-- MERCENARIO OS - Módulos SaaS B2B
-- Ejecutar en el proyecto Supabase de Mercenario Admin
-- ============================================================

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
