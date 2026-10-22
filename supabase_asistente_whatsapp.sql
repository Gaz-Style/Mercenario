-- =======================================================================================
-- INFRAESTRUCTURA ASISTENTE VIRTUAL & WHATSAPP OMNICANAL (WEKE STUDIO / MERCENARIO)
-- =======================================================================================

-- 1. Tabla de Chats de WhatsApp
CREATE TABLE IF NOT EXISTS public.crm_whatsapp_chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone_number TEXT NOT NULL,
    customer_id UUID,
    lead_score NUMERIC DEFAULT 0,
    session_status TEXT NOT NULL CHECK (session_status IN ('bot', 'human_handoff', 'closed')) DEFAULT 'bot',
    last_message TEXT,
    last_interaction TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(phone_number)
);

-- 2. Historial de Mensajes de WhatsApp
CREATE TABLE IF NOT EXISTS public.crm_whatsapp_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID NOT NULL REFERENCES public.crm_whatsapp_chats(id) ON DELETE CASCADE,
    sender_type TEXT NOT NULL CHECK (sender_type IN ('customer', 'bot', 'human')),
    message_type TEXT NOT NULL CHECK (message_type IN ('text', 'image', 'audio', 'document', 'interactive', 'location')) DEFAULT 'text',
    content TEXT,
    media_url TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Habilitar RLS con políticas permisivas para lectura y escritura interna
ALTER TABLE public.crm_whatsapp_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_whatsapp_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Permitir todo en crm_whatsapp_chats" ON public.crm_whatsapp_chats;
CREATE POLICY "Permitir todo en crm_whatsapp_chats" ON public.crm_whatsapp_chats
FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Permitir todo en crm_whatsapp_messages" ON public.crm_whatsapp_messages;
CREATE POLICY "Permitir todo en crm_whatsapp_messages" ON public.crm_whatsapp_messages
FOR ALL USING (true) WITH CHECK (true);
