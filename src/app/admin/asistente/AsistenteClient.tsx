'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Send,
  Bot,
  User,
  Phone,
  Search,
  RefreshCw,
  X,
  Plus,
  Sparkles,
  Settings,
  ShieldCheck,
  CheckCheck,
  Clock,
  ExternalLink,
  Sliders,
  Copy,
  Check,
  ShoppingBag,
  Zap,
  Smile,
  FileText,
  Code,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import {
  getWhatsAppChatsAction,
  getWhatsAppMessagesAction,
  sendWhatsAppMessageAction,
  toggleBotSessionAction,
  createOrStartChatAction,
  testAIAssistantAction,
  simulateCustomerMessageAction,
  triggerHumanHandoffTemplateAction,
  sendOfficialMetaTemplateAction,
} from './actions';
import {
  OFFICIAL_META_TEMPLATES,
  buildMetaTemplatePayload,
  type MetaTemplateSpec,
} from '@/lib/whatsapp/meta-templates-catalog';

// Icono Oficial de WhatsApp SVG
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function AsistenteClient({ initialChats = [] }: { initialChats?: any[] }) {
  const safeChats = Array.isArray(initialChats) ? initialChats : [];
  const [chats, setChats] = useState<any[]>(safeChats);
  const [selectedChat, setSelectedChat] = useState<any>(safeChats[0] || null);
  const [messages, setMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sending, setSending] = useState(false);
  const [autoRevertSeconds, setAutoRevertSeconds] = useState<number | null>(null);
  const [showRightPanel, setShowRightPanel] = useState<'crm' | 'simulator' | 'config' | 'templates' | null>('crm');
  const [showMobileList, setShowMobileList] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Modal para iniciar nuevo chat
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [newPhoneInput, setNewPhoneInput] = useState('');
  const [creatingChat, setCreatingChat] = useState(false);

  // Simulador IA con Motor RAC
  const [simQuery, setSimQuery] = useState('');
  const [simLoading, setSimLoading] = useState(false);
  const [simHistory, setSimHistory] = useState<
    Array<{
      role: 'user' | 'assistant';
      text: string;
      provider?: string;
      sources?: Array<{ id: string; title: string; category: string }>;
    }>
  >([
    {
      role: 'assistant',
      text: '¡Hola! Soy el simulador del Asistente Virtual de WEKE operando bajo arquitectura RAC (Retrieval-Augmented Context). Haz una consulta sobre la historia de Vidalina Díaz, el Guanaco, la línea inclusiva, el sistema de 3 capas o despacho para ver los fragmentos de conocimiento recuperados.',
      provider: 'weke_rac_engine',
      sources: [
        { id: 'weke-01-nombre-guanaco', title: 'Significado de WEKE', category: 'origen_nombre' },
        { id: 'weke-06-linea-inclusiva', title: 'Línea Inclusiva', category: 'inclusivo' },
      ],
    },
  ]);

  // Copiado de credenciales
  const [copiedEnv, setCopiedEnv] = useState(false);

  // Plantillas Oficiales de Meta Cloud API
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>('asistencia_humana_weke');
  const [templateInputs, setTemplateInputs] = useState<Record<string, string[]>>({});
  const [sendingTemplate, setSendingTemplate] = useState(false);
  const [copiedTemplateJson, setCopiedTemplateJson] = useState(false);
  const [templateFeedback, setTemplateFeedback] = useState<{
    success: boolean;
    mode?: string;
    message: string;
  } | null>(null);
  const [showJsonPayload, setShowJsonPayload] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const autoRevertRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const AUTO_REVERT_SECS = 180; // 3 minutos

  const clearAutoRevert = () => {
    if (autoRevertRef.current) clearInterval(autoRevertRef.current);
    autoRevertRef.current = null;
    setAutoRevertSeconds(null);
  };

  const startAutoRevert = (chatId: string) => {
    clearAutoRevert();
    setAutoRevertSeconds(AUTO_REVERT_SECS);
    let remaining = AUTO_REVERT_SECS;
    autoRevertRef.current = setInterval(async () => {
      remaining -= 1;
      setAutoRevertSeconds(remaining);
      if (remaining <= 0) {
        clearAutoRevert();
        await toggleBotSessionAction(chatId, true);
        setSelectedChat((prev: any) =>
          prev?.id === chatId ? { ...prev, session_status: 'bot' } : prev
        );
        refreshChats();
      }
    }, 1000);
  };

  const refreshChats = async () => {
    const data = await getWhatsAppChatsAction();
    setChats(data);
    if (selectedChat) {
      const match = data.find((c: any) => c.id === selectedChat.id);
      if (match) setSelectedChat(match);
    }
  };

  // Cargar mensajes al seleccionar un chat
  useEffect(() => {
    if (!selectedChat?.id) return;
    const loadMessages = async () => {
      const msgs = await getWhatsAppMessagesAction(selectedChat.id);
      setMessages(msgs);
    };
    loadMessages();
  }, [selectedChat?.id]);

  // Controlar auto-revert si está en modo humano
  useEffect(() => {
    if (selectedChat?.id && selectedChat.session_status !== 'bot') {
      startAutoRevert(selectedChat.id);
    } else {
      clearAutoRevert();
    }
    return () => clearAutoRevert();
  }, [selectedChat?.id, selectedChat?.session_status]);

  // Auto-scroll al final del chat
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 80);
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages.length, selectedChat?.id]);

  // Cerrar selector de emojis al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showEmojiPicker &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  const handleSelectChat = (chat: any) => {
    setSelectedChat(chat);
    setShowMobileList(false);
  };

  // Enviar mensaje
  const handleSendMessage = async (textToSend?: string) => {
    const content = textToSend || replyText;
    if (!content.trim() || !selectedChat || sending) return;

    setSending(true);
    if (!textToSend) setReplyText('');

    // Optimista
    const tempMsg = {
      id: `temp-${Date.now()}`,
      chat_id: selectedChat.id,
      sender_type: 'human',
      message_type: 'text',
      content: content.trim(),
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);
    scrollToBottom();

    try {
      await sendWhatsAppMessageAction(selectedChat.id, content.trim());
      const msgs = await getWhatsAppMessagesAction(selectedChat.id);
      setMessages(msgs);

      if (selectedChat.session_status === 'bot') {
        setSelectedChat({ ...selectedChat, session_status: 'human_handoff' });
        refreshChats();
      } else {
        startAutoRevert(selectedChat.id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  // ── Simular Mensaje Entrante de Cliente (Prueba en Vivo del Bot) ───────────
  const handleSimulateCustomerMessage = async (customText?: string) => {
    const text = customText || replyText;
    if (!text.trim() || !selectedChat || sending) return;

    setSending(true);
    if (!customText) setReplyText('');

    // Inserción optimista del mensaje del cliente
    const tempMsg = {
      id: `temp-cust-${Date.now()}`,
      chat_id: selectedChat.id,
      sender_type: 'customer',
      message_type: 'text',
      content: text.trim(),
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempMsg]);
    scrollToBottom();

    try {
      const res = await simulateCustomerMessageAction(selectedChat.id, text.trim());
      if (res.success && res.messages) {
        setMessages(res.messages);
      }
      refreshChats();
    } catch (e) {
      console.error('Error simulando mensaje:', e);
    } finally {
      setSending(false);
    }
  };

  // Toggle Bot Activo / Inactivo
  const handleToggleBot = async () => {
    if (!selectedChat) return;
    const isBot = selectedChat.session_status === 'bot';
    const nextStatus = !isBot;
    await toggleBotSessionAction(selectedChat.id, nextStatus);
    setSelectedChat({
      ...selectedChat,
      session_status: nextStatus ? 'bot' : 'human_handoff',
    });
    refreshChats();
  };

  // Modificar variables de la plantilla activa
  const handleTemplateVariableChange = (templateKey: string, index: number, value: string) => {
    const spec = OFFICIAL_META_TEMPLATES[templateKey];
    const currentVars = templateInputs[templateKey]
      ? [...templateInputs[templateKey]]
      : [...(spec?.sampleVariables || [])];
    currentVars[index] = value;
    setTemplateInputs((prev) => ({
      ...prev,
      [templateKey]: currentVars,
    }));
  };

  const handleResetTemplateVariables = (templateKey: string) => {
    const spec = OFFICIAL_META_TEMPLATES[templateKey];
    if (!spec) return;
    setTemplateInputs((prev) => ({
      ...prev,
      [templateKey]: [...spec.sampleVariables],
    }));
  };

  const handleCopyTemplateJson = (templateKey: string) => {
    const spec = OFFICIAL_META_TEMPLATES[templateKey];
    if (!spec) return;
    const payload = buildMetaTemplatePayload(spec);
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedTemplateJson(true);
    setTimeout(() => setCopiedTemplateJson(false), 2500);
  };

  // Enviar cualquier plantilla oficial seleccionada
  const handleSendSelectedTemplate = async () => {
    if (!selectedChat || sendingTemplate) return;
    setSendingTemplate(true);
    setTemplateFeedback(null);
    try {
      const spec = OFFICIAL_META_TEMPLATES[selectedTemplateKey];
      if (!spec) return;
      const vars = templateInputs[selectedTemplateKey] || spec.sampleVariables;

      const res = await sendOfficialMetaTemplateAction({
        chatId: selectedChat.id,
        templateKey: selectedTemplateKey,
        variables: vars,
      });

      if (res.success) {
        if (res.messages) {
          setMessages(res.messages);
        }
        if (selectedTemplateKey === 'asistencia_humana_weke') {
          setSelectedChat({
            ...selectedChat,
            session_status: 'human_handoff',
          });
        }
        setTemplateFeedback({
          success: true,
          mode: res.mode,
          message:
            res.mode === 'template'
              ? `Plantilla oficial '${spec.title}' enviada con éxito mediante Meta Cloud API.`
              : `Plantilla '${spec.title}' enviada en modo respaldo seguro (texto estructurado) a ${selectedChat.phone_number}.`,
        });
        refreshChats();
      } else {
        setTemplateFeedback({
          success: false,
          message: res.error || 'No se pudo despachar la plantilla',
        });
      }
    } catch (err: any) {
      setTemplateFeedback({
        success: false,
        message: err.message || 'Error de conexión',
      });
    } finally {
      setSendingTemplate(false);
    }
  };

  // Enviar Plantilla Oficial Meta de Asistencia Humana rápida
  const handleSendHandoffTemplate = async () => {
    setSelectedTemplateKey('asistencia_humana_weke');
    setShowRightPanel('templates');
  };

  // Iniciar nuevo chat
  const handleStartChat = async (phoneToUse?: string) => {
    const rawTarget = phoneToUse !== undefined ? phoneToUse : newPhoneInput;
    const phone = rawTarget.trim();
    if (!phone) {
      alert('Por favor ingresa un número de teléfono válido.');
      return;
    }

    setCreatingChat(true);
    try {
      const res = await createOrStartChatAction(phone);
      if (res.success && res.chat) {
        await refreshChats();
        setSelectedChat(res.chat);
        setShowMobileList(false);
        setSearchQuery('');
        setNewPhoneInput('');
        setIsNewChatModalOpen(false);
      }
    } catch (err: any) {
      alert(err.message || 'Error iniciando chat');
    } finally {
      setCreatingChat(false);
    }
  };

  // Enviar pregunta al simulador IA
  const handleSendSimulator = async () => {
    if (!simQuery.trim() || simLoading) return;
    const q = simQuery.trim();
    setSimQuery('');
    setSimHistory((prev) => [...prev, { role: 'user', text: q }]);
    setSimLoading(true);

    try {
      const res = await testAIAssistantAction(q);
      setSimHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: res.reply || 'Sin respuesta',
          provider: res.provider,
          sources: res.rac?.sources || [],
        },
      ]);
    } catch (err) {
      setSimHistory((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Error conectando con el motor de IA.',
          provider: 'error',
        },
      ]);
    } finally {
      setSimLoading(false);
    }
  };

  const copyEnvSnippet = () => {
    const snippet = `# Variables para Asistente Virtual & WhatsApp (WEKE Studio)
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key

# Proveedor de IA (Cualquiera de los 3 es compatible, DeepSeek recomendado)
DEEPSEEK_API_KEY=sk-tu-clave-deepseek
OPENAI_API_KEY=sk-tu-clave-openai
GEMINI_API_KEY=tu-clave-gemini

# Meta WhatsApp Cloud API (Oficial)
WHATSAPP_API_TOKEN=EAA...tu_token_meta
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_VERIFY_TOKEN=weke_studio_secure_token`;

    navigator.clipboard.writeText(snippet);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 3000);
  };

  const formatTime = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    } catch {
      return '';
    }
  };

  const filteredChats = (chats || []).filter((c) => {
    if (!c) return false;
    const q = (searchQuery || '').toLowerCase();
    const name = (c.customers?.full_name || c.phone_number || '').toLowerCase();
    const phone = (c.phone_number || '').toLowerCase();
    return name.includes(q) || phone.includes(q);
  });

  return (
    <div className="h-screen lg:h-full w-full bg-[#f0f2f5] text-zinc-800 flex flex-col font-sans overflow-hidden select-none">
      {/* ── BARRA SUPERIOR DE CONTROL WHATSAPP & IA ───────────────────────── */}
      <header className="h-14 bg-[#075E54] text-white px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-md z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/90 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Volver al Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Panel</span>
          </Link>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2.5">
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-wide">Asistente Virtual & LiveChat</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-100 border border-emerald-400/40 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                IA Activa 24/7
              </span>
            </div>
          </div>
        </div>

        {/* Acciones Superiores */}
        <div className="flex items-center gap-2">
          {/* Botón Simulador IA */}
          <button
            onClick={() =>
              setShowRightPanel(showRightPanel === 'simulator' ? null : 'simulator')
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showRightPanel === 'simulator'
                ? 'bg-amber-400 text-black shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulador IA</span>
          </button>

          {/* Botón Plantillas Meta */}
          <button
            onClick={() =>
              setShowRightPanel(showRightPanel === 'templates' ? null : 'templates')
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showRightPanel === 'templates'
                ? 'bg-emerald-400 text-black shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Plantillas Meta</span>
          </button>

          {/* Botón Conexión & Credenciales */}
          <button
            onClick={() =>
              setShowRightPanel(showRightPanel === 'config' ? null : 'config')
            }
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showRightPanel === 'config'
                ? 'bg-white text-[#075E54] shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Conexión API</span>
          </button>

          {/* Botón Nuevo Chat */}
          <button
            onClick={() => setIsNewChatModalOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nuevo Chat</span>
          </button>

          {/* Botón Refrescar */}
          <button
            onClick={refreshChats}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
            title="Refrescar conversaciones"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── CUERPO PRINCIPAL OMNICANAL TIPO WHATSAPP WEB ───────────────────── */}
      <div className="flex-1 flex w-full overflow-hidden bg-white relative">
        {/* ── COLUMNA 1: LISTADO DE CHATS ── */}
        <aside
          className={`w-full md:w-[340px] lg:w-[380px] border-r border-[#e9edef] flex flex-col bg-white shrink-0 z-10 ${
            !showMobileList ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Buscador */}
          <div className="p-3 bg-[#f0f2f5] border-b border-[#e9edef]">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#54656f] absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar cliente o número..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.replace(/\D/g, '').length >= 8) {
                    handleStartChat(searchQuery);
                  }
                }}
                className="w-full bg-white border border-[#e9edef] focus:border-[#00a884] rounded-lg pl-9 pr-8 py-2 text-xs text-zinc-800 placeholder-[#667781] outline-none shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-zinc-400 hover:text-zinc-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Si detecta número en la búsqueda */}
          {searchQuery.replace(/\D/g, '').length >= 8 && (
            <div className="p-3 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                  <WhatsAppIcon className="w-3 h-3 text-emerald-600" /> Iniciar con número
                </span>
                <span className="text-xs font-mono font-bold text-zinc-900 block truncate">
                  {searchQuery}
                </span>
              </div>
              <button
                onClick={() => handleStartChat(searchQuery)}
                disabled={creatingChat}
                className="px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center gap-1 transition-all shadow-sm shrink-0 cursor-pointer"
              >
                <Send className="w-3 h-3" />
                Abrir
              </button>
            </div>
          )}

          {/* Lista de Conversaciones */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#f0f2f5] bg-white">
            {filteredChats.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-zinc-400">
                <Bot className="w-10 h-10 mb-2 text-zinc-300" />
                <p className="text-xs font-semibold text-zinc-600">No hay chats coincidentes</p>
                <p className="text-[11px] text-zinc-400 mt-1">Usa &quot;Nuevo Chat&quot; para iniciar una conversación.</p>
              </div>
            ) : (
              filteredChats.map((chat) => {
                const isSelected = selectedChat?.id === chat.id;
                const isBot = chat.session_status === 'bot';

                return (
                  <div
                    key={chat.id}
                    onClick={() => handleSelectChat(chat)}
                    className={`w-full px-3.5 py-3 text-left transition-colors flex items-center gap-3 cursor-pointer relative ${
                      isSelected ? 'bg-[#f0f2f5]' : 'hover:bg-[#f8f9fa]'
                    }`}
                  >
                    {/* Avatar con Badge de WhatsApp */}
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-700 overflow-hidden">
                        {chat.customers?.full_name ? (
                          chat.customers.full_name.charAt(0)
                        ) : (
                          <User className="w-5 h-5 text-zinc-400" />
                        )}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-[2px] shadow-xs">
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                      </div>
                    </div>

                    {/* Datos del Chat */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="font-bold text-zinc-900 truncate text-[13px]">
                          {chat.customers?.full_name || chat.phone_number}
                        </h4>
                        <span className="text-[10px] text-zinc-400 shrink-0 font-mono">
                          {formatTime(chat.last_message_at)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-zinc-500 truncate flex-1 font-normal">
                          {chat.last_message || 'Conversación iniciada'}
                        </p>
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold uppercase shrink-0 ${
                            isBot
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}
                        >
                          {isBot ? '🤖 IA' : '👤 Humano'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </aside>

        {/* ── COLUMNA 2: ÁREA CENTRAL DE CONVERSACIÓN ── */}
        <main
          className={`flex-1 flex flex-col h-full bg-[#EFEAE2] relative overflow-hidden ${
            showMobileList ? 'hidden md:flex' : 'flex'
          }`}
        >
          {selectedChat ? (
            <>
              {/* Header de la Conversación */}
              <div className="h-14 bg-[#f0f2f5] border-b border-[#e9edef] px-4 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    onClick={() => setShowMobileList(true)}
                    className="md:hidden p-1.5 -ml-1 text-zinc-600 hover:text-black cursor-pointer"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="w-9 h-9 rounded-full bg-zinc-300 flex items-center justify-center font-bold text-xs text-zinc-800 shrink-0">
                    {selectedChat.customers?.full_name?.charAt(0) || 'C'}
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-bold text-sm text-zinc-900 truncate leading-tight">
                      {selectedChat.customers?.full_name || selectedChat.phone_number}
                    </h2>
                    <p className="text-[11px] text-zinc-500 font-mono truncate">
                      {selectedChat.phone_number} • {selectedChat.customers?.city || 'Santiago'}
                    </p>
                  </div>
                </div>

                {/* Switch de Control: IA vs Humano */}
                <div className="flex items-center gap-3">
                  {selectedChat.session_status !== 'bot' && autoRevertSeconds !== null && (
                    <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-mono font-bold">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>
                        Reversión a IA en {Math.floor(autoRevertSeconds / 60)}:
                        {String(autoRevertSeconds % 60).padStart(2, '0')}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={handleToggleBot}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                      selectedChat.session_status === 'bot'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                    title={
                      selectedChat.session_status === 'bot'
                        ? 'Pausar IA y tomar control humano'
                        : 'Reactivar respuestas automáticas de IA'
                    }
                  >
                    {selectedChat.session_status === 'bot' ? (
                      <>
                        <Bot className="w-4 h-4" />
                        <span className="hidden sm:inline">IA Atendiendo</span>
                      </>
                    ) : (
                      <>
                        <User className="w-4 h-4" />
                        <span className="hidden sm:inline">Control Humano</span>
                      </>
                    )}
                  </button>

                  {/* Botón Catálogo de Plantillas Meta Oficiales */}
                  <button
                    onClick={() =>
                      setShowRightPanel(showRightPanel === 'templates' ? null : 'templates')
                    }
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                      showRightPanel === 'templates'
                        ? 'bg-emerald-700 text-white shadow-md'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                    title="Catálogo Oficial de Plantillas Homologadas de Meta WhatsApp"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Plantillas Meta</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-800/80 text-white text-[10px] font-mono font-bold">
                      8
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      setShowRightPanel(showRightPanel === 'crm' ? null : 'crm')
                    }
                    className="p-1.5 rounded-lg border border-zinc-300 hover:bg-zinc-200 text-zinc-700 transition-colors cursor-pointer"
                    title="Ver Ficha CRM del Cliente"
                  >
                    <Sliders className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mensajes del Chat */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
                {/* Separador de Fecha */}
                <div className="flex justify-center my-2">
                  <span className="bg-white/90 text-zinc-600 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-md shadow-xs">
                    Hoy • WhatsApp Oficial
                  </span>
                </div>

                {messages.map((m) => {
                  const isCustomer = m.sender_type === 'customer';
                  const isBot = m.sender_type === 'bot';

                  return (
                    <div
                      key={m.id}
                      className={`flex ${isCustomer ? 'justify-start' : 'justify-end'} group`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm text-xs relative ${
                          isCustomer
                            ? 'bg-white text-zinc-900 rounded-tl-none border border-neutral-200/50'
                            : isBot
                            ? 'bg-[#d9fdd3] text-zinc-900 rounded-tr-none border border-emerald-200/60'
                            : 'bg-[#d9fdd3] text-zinc-900 rounded-tr-none border border-emerald-300/80'
                        }`}
                      >
                        {/* Etiqueta del Remitente */}
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <span
                            className={`text-[10px] font-bold ${
                              isCustomer
                                ? 'text-zinc-500'
                                : isBot
                                ? 'text-blue-700 font-mono'
                                : 'text-emerald-800 font-mono'
                            }`}
                          >
                            {isCustomer ? 'Cliente' : isBot ? '🤖 Asistente IA' : '👤 Operador WEKE'}
                          </span>
                        </div>

                        {/* Contenido del Mensaje */}
                        <p className="leading-relaxed whitespace-pre-wrap text-[13px]">{m.content}</p>

                        {/* Timestamp y Vistos */}
                        <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-zinc-400 font-mono">
                          <span>{formatTime(m.created_at)}</span>
                          {!isCustomer && (
                            <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Barra Inferior: Input limpio estilo WhatsApp Web con Selector de Emojis */}
              <div className="bg-[#f0f2f5] border-t border-[#e9edef] px-4 py-3 shrink-0 relative">
                {/* Selector de Emojis Popover (Estilo WhatsApp Web / GazStyle) */}
                {showEmojiPicker && (
                  <div
                    ref={emojiPickerRef}
                    className="absolute bottom-[66px] left-4 bg-white rounded-2xl shadow-2xl border border-zinc-200/90 p-3 z-50 w-[320px] max-w-[calc(100vw-32px)] max-h-[280px] overflow-y-auto no-scrollbar animate-fadeIn"
                  >
                    {[
                      {
                        label: 'Frecuentes',
                        emojis: ['😊', '👍', '❤️', '🙏', '✨', '🎉', '💯', '🔥', '👏', '😍', '🏔️', '🥾'],
                      },
                      {
                        label: 'Ropa & Montaña',
                        emojis: ['🏔️', '⛰️', '🧥', '🥾', '🧤', '🎒', '🧗', '🏕️', '🌲', '☀️', '❄️', '🌧️'],
                      },
                      {
                        label: 'Caras & Expresiones',
                        emojis: ['😀', '😄', '😁', '😆', '🥹', '😅', '😂', '🙂', '😉', '😌', '🤔', '😎'],
                      },
                      {
                        label: 'Gestos & Comercio',
                        emojis: ['👋', '🤝', '✌️', '👌', '🫶', '🙌', '💳', '📦', '🚚', '💬', '📍', '⭐'],
                      },
                    ].map((cat) => (
                      <div key={cat.label} className="mb-2.5">
                        <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold mb-1 px-1 font-mono">
                          {cat.label}
                        </p>
                        <div className="grid grid-cols-6 gap-1">
                          {cat.emojis.map((emoji) => (
                            <button
                              key={emoji}
                              type="button"
                              onClick={() => {
                                setReplyText((prev) => prev + emoji);
                                textareaRef.current?.focus();
                              }}
                              className="w-8 h-8 flex items-center justify-center text-lg hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {/* Cápsula de Texto WhatsApp */}
                  <div className="flex-1 bg-white rounded-2xl flex items-center px-2 min-h-[44px] shadow-xs border border-[#e9edef] focus-within:border-[#00a884]">
                    {/* Botón Emojis */}
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className={`p-2 rounded-xl transition-colors shrink-0 cursor-pointer ${
                        showEmojiPicker
                          ? 'text-[#00a884] bg-emerald-50'
                          : 'text-[#54656f] hover:text-zinc-800'
                      }`}
                      title="Insertar emoji"
                    >
                      <Smile className="w-5 h-5" />
                    </button>

                    <textarea
                      ref={textareaRef}
                      rows={1}
                      value={replyText}
                      onChange={(e) => {
                        setReplyText(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                      }}
                      onFocus={() => setShowEmojiPicker(false)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          setShowEmojiPicker(false);
                          if (selectedChat.session_status === 'bot') {
                            handleSimulateCustomerMessage();
                          } else {
                            handleSendMessage();
                          }
                        }
                      }}
                      placeholder={
                        selectedChat.session_status === 'bot'
                          ? 'Escribe un mensaje para probar el Asistente IA (Enter para enviar)...'
                          : 'Escribe tu respuesta como operador humano (Enter para enviar)...'
                      }
                      className="w-full py-2.5 px-2 text-xs bg-transparent outline-none resize-none max-h-[120px] leading-snug text-zinc-900 placeholder-zinc-400 no-scrollbar overflow-hidden"
                    />
                  </div>

                  {/* Botón Circular WhatsApp de Envío */}
                  <button
                    onClick={() => {
                      setShowEmojiPicker(false);
                      if (selectedChat.session_status === 'bot') {
                        handleSimulateCustomerMessage();
                      } else {
                        handleSendMessage();
                      }
                    }}
                    disabled={!replyText.trim() || sending}
                    title={
                      selectedChat.session_status === 'bot'
                        ? 'Enviar mensaje (IA responderá en vivo)'
                        : 'Enviar mensaje como operador'
                    }
                    className="w-11 h-11 rounded-full bg-[#00a884] hover:bg-[#008f6f] disabled:bg-zinc-200 disabled:text-zinc-400 text-white flex items-center justify-center transition-all shadow-md shrink-0 cursor-pointer disabled:cursor-not-allowed active:scale-95"
                  >
                    {sending ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-400">
              <Bot className="w-16 h-16 text-zinc-300 mb-3" />
              <h3 className="text-base font-bold text-zinc-700">Selecciona una conversación</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                Monitorea cómo el Asistente Virtual atiende preguntas de prendas, stock y tallas en tiempo real.
              </p>
            </div>
          )}
        </main>

        {/* ── COLUMNA 3: DRAWER LATERAL (CRM / SIMULADOR / CONFIGURACIÓN / PLANTILLAS META) ──── */}
        {showRightPanel && (
          <aside className="w-full md:w-[380px] lg:w-[440px] border-l border-zinc-200 bg-white flex flex-col shrink-0 z-20 overflow-y-auto animate-fadeIn">
            {/* Header del Panel Lateral */}
            <div className="h-14 bg-zinc-50 border-b border-zinc-200 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {showRightPanel === 'crm' && (
                  <>
                    <User className="w-4 h-4 text-zinc-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                      Ficha CRM del Cliente
                    </span>
                  </>
                )}
                {showRightPanel === 'simulator' && (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                      Simulador de IA en Vivo
                    </span>
                  </>
                )}
                {showRightPanel === 'config' && (
                  <>
                    <Settings className="w-4 h-4 text-zinc-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                      Conexión & Credenciales
                    </span>
                  </>
                )}
                {showRightPanel === 'templates' && (
                  <>
                    <FileText className="w-4 h-4 text-[#00a884]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                      Plantillas Meta Cloud API (8)
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowRightPanel(null)}
                className="p-1 rounded-lg hover:bg-zinc-200 text-zinc-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Contenido según la pestaña activa */}
            <div className="p-5 space-y-6">
              {/* 1. FICHA CRM */}
              {showRightPanel === 'crm' && selectedChat && (
                <div className="space-y-5 text-xs">
                  <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-base">
                      {selectedChat.customers?.full_name?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-zinc-900">
                        {selectedChat.customers?.full_name || 'Sin nombre asignado'}
                      </h3>
                      <p className="text-zinc-500 font-mono text-[11px]">{selectedChat.phone_number}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                        Interés Principal
                      </span>
                      <p className="font-bold text-zinc-900">
                        {selectedChat.customers?.interest || 'Equipamiento Outdoor'}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                          Talla Sugerida
                        </span>
                        <p className="font-bold text-zinc-900 font-mono">
                          {selectedChat.customers?.preferred_size || 'M'}
                        </p>
                      </div>

                      <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-1">
                        <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                          Compras Totales
                        </span>
                        <p className="font-bold text-zinc-900 font-mono">
                          ${(selectedChat.customers?.total_spent || 0).toLocaleString('es-CL')} CLP
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                        Ciudad / Región
                      </span>
                      <p className="font-bold text-zinc-900">
                        {selectedChat.customers?.city || 'Santiago, Chile'}
                      </p>
                    </div>

                    <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200/80 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                        Correo Electrónico
                      </span>
                      <p className="font-mono text-zinc-700">
                        {selectedChat.customers?.email || 'contacto@cliente.cl'}
                      </p>
                    </div>
                  </div>

                  {/* Acciones directas */}
                  <div className="pt-2 space-y-2">
                    <Link
                      href="/admin/pos"
                      className="w-full py-2 px-3 bg-zinc-900 hover:bg-black text-white rounded-lg text-center font-bold uppercase tracking-wider block transition-colors"
                    >
                      Generar Venta POS para este Cliente
                    </Link>
                  </div>
                </div>
              )}

              {/* 2. SIMULADOR IA CON RAC */}
              {showRightPanel === 'simulator' && (
                <div className="space-y-4">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Sandbox de Pruebas Motor RAC</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-amber-800">
                      Prueba la recuperación contextual aumentada (RAC / RAG) en tiempo real. La IA busca dinámicamente en la base de conocimiento de WEKE y responde basándose estrictamente en los fragmentos pertinentes.
                    </p>
                  </div>

                  {/* Chat del Simulador */}
                  <div className="border border-zinc-200 rounded-xl p-3 bg-zinc-50/50 h-72 overflow-y-auto space-y-2.5 text-xs">
                    {simHistory.map((s, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl ${
                          s.role === 'user'
                            ? 'bg-zinc-900 text-white ml-6'
                            : 'bg-white border border-zinc-200 text-zinc-800 mr-4'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-[10px] font-mono uppercase opacity-75">
                            {s.role === 'user' ? 'Pregunta de Prueba' : `🤖 Respuesta (${s.provider || 'RAC'})`}
                          </p>
                        </div>
                        <p className="leading-relaxed">{s.text}</p>

                        {/* Etiquetas de Fragmentos RAC Recuperados */}
                        {s.role === 'assistant' && s.sources && s.sources.length > 0 && (
                          <div className="mt-2 pt-1.5 border-t border-zinc-100 flex flex-wrap gap-1 items-center">
                            <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                              RAC:
                            </span>
                            {s.sources.map((src, i) => (
                              <span
                                key={i}
                                className="text-[9px] text-zinc-600 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200 truncate max-w-[200px]"
                                title={src.title}
                              >
                                {src.title}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {simLoading && (
                      <div className="p-2.5 bg-white border border-zinc-200 rounded-xl mr-4 flex items-center gap-2 text-zinc-500 text-xs">
                        <RefreshCw className="w-3 h-3 animate-spin text-amber-500" />
                        <span>Recuperando fragmentos RAC y generando respuesta...</span>
                      </div>
                    )}
                  </div>

                  {/* Input del Simulador */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={simQuery}
                      onChange={(e) => setSimQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSendSimulator();
                      }}
                      placeholder="Ej: ¿Qué significa WEKE y qué animal representa?"
                      className="flex-1 bg-white border border-zinc-200 focus:border-black rounded-lg px-3 py-2 text-xs outline-none"
                    />
                    <button
                      onClick={handleSendSimulator}
                      disabled={simLoading || !simQuery.trim()}
                      className="px-3 py-2 bg-black hover:bg-zinc-800 disabled:bg-zinc-300 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Probar RAC
                    </button>
                  </div>
                </div>
              )}

              {/* 3. CONFIGURACIÓN & CONEXIÓN */}
              {showRightPanel === 'config' && (
                <div className="space-y-4 text-xs">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Maqueta 100% Conectable</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-blue-800">
                      Para activar el envío y recepción 100% en vivo hacia WhatsApp de clientes, solo necesitas configurar estas variables en tu archivo <code>.env.local</code>.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-zinc-800">Snippet .env.local:</span>
                      <button
                        onClick={copyEnvSnippet}
                        className="text-[11px] font-bold text-zinc-600 hover:text-black flex items-center gap-1 cursor-pointer"
                      >
                        {copiedEnv ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">¡Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar Variables</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-3 bg-zinc-900 text-zinc-200 rounded-xl font-mono text-[10px] overflow-x-auto leading-relaxed">
{`# 1. Base de Datos Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=ey...

# 2. Motor IA (DeepSeek / OpenAI / Gemini)
DEEPSEEK_API_KEY=sk-...
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=AIza...

# 3. Meta WhatsApp Cloud API
WHATSAPP_API_TOKEN=EAA...
WHATSAPP_PHONE_NUMBER_ID=1092837465
WHATSAPP_VERIFY_TOKEN=weke_token`}
                    </pre>
                  </div>

                  <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
                    <span className="font-bold text-zinc-900 block">Flujo de Conexión:</span>
                    <ol className="list-decimal pl-4 space-y-1 text-zinc-600 text-[11px]">
                      <li>Crea tu aplicación en <strong>developers.facebook.com</strong> con producto WhatsApp.</li>
                      <li>Copia el <code>Phone Number ID</code> y el <code>Access Token</code> temporal o permanente.</li>
                      <li>Apunta el Webhook a <code>https://tudominio.cl/api/whatsapp/webhook</code>.</li>
                    </ol>
                  </div>
                </div>
              )}

              {/* 4. CATÁLOGO COMPLETO DE PLANTILLAS OFICIALES META CLOUD API (8) */}
              {showRightPanel === 'templates' && (() => {
                const spec =
                  OFFICIAL_META_TEMPLATES[selectedTemplateKey] ||
                  OFFICIAL_META_TEMPLATES.asistencia_humana_weke;
                const currentVars =
                  templateInputs[selectedTemplateKey] || spec.sampleVariables;

                // Construir texto del cuerpo reemplazando {{1}}, {{2}}, etc. para preview
                const renderPreviewBody = () => {
                  const parts: React.ReactNode[] = [];
                  const text = spec.body;
                  const regex = /\{\{(\d+)\}\}/g;
                  let lastIndex = 0;
                  let match;

                  while ((match = regex.exec(spec.body)) !== null) {
                    const varIndex = parseInt(match[1], 10) - 1;
                    const val = currentVars[varIndex] || `{{${match[1]}}}`;
                    if (match.index > lastIndex) {
                      parts.push(text.substring(lastIndex, match.index));
                    }
                    parts.push(
                      <span
                        key={match.index}
                        className="font-bold text-emerald-800 bg-emerald-100/80 px-1 py-0.5 rounded border border-emerald-300"
                      >
                        {val}
                      </span>
                    );
                    lastIndex = regex.lastIndex;
                  }
                  if (lastIndex < text.length) {
                    parts.push(text.substring(lastIndex));
                  }
                  return parts;
                };

                return (
                  <div className="space-y-4 text-xs">
                    {/* Banner de Contexto de Envío */}
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                          <FileText className="w-4 h-4 text-[#00a884]" />
                          <span>Meta Cloud API Homologada</span>
                        </div>
                        <span
                          className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                            spec.category === 'MARKETING'
                              ? 'bg-purple-100 text-purple-900 border border-purple-200'
                              : 'bg-emerald-200/80 text-emerald-900 border border-emerald-300'
                          }`}
                        >
                          {spec.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-900 leading-snug">
                        {selectedChat ? (
                          <>
                            Destinatario activo:{' '}
                            <strong className="text-black font-semibold">
                              {selectedChat.customers?.full_name || selectedChat.phone_number}
                            </strong>{' '}
                            (<span className="font-mono">{selectedChat.phone_number}</span>)
                          </>
                        ) : (
                          <span className="text-emerald-700 italic">
                            Selecciona una conversación a la izquierda para despachar esta plantilla en vivo.
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Selector de Plantilla */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 block">
                        Seleccionar Plantilla Homologada (8 disponibles):
                      </label>
                      <div className="relative">
                        <select
                          value={selectedTemplateKey}
                          onChange={(e) => {
                            setSelectedTemplateKey(e.target.value);
                            setTemplateFeedback(null);
                          }}
                          className="w-full px-3 py-2 text-xs bg-zinc-50 border border-zinc-300 rounded-xl font-medium text-zinc-900 outline-none focus:border-emerald-600 cursor-pointer appearance-none pr-8 shadow-2xs"
                        >
                          {Object.entries(OFFICIAL_META_TEMPLATES).map(([key, t]) => (
                            <option key={key} value={key}>
                              {t.category === 'MARKETING' ? '📢' : '⚙️'} {t.title}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-2.5 top-2.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Ficha Técnica de la Plantilla */}
                    <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <code className="font-mono font-bold text-zinc-900 text-[11px]">
                          {spec.name}
                        </code>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          Idioma: <strong>{spec.language}</strong>
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-600 leading-snug">
                        {spec.description}
                      </p>
                      <div className="flex items-center gap-3 pt-1 text-[10px] text-zinc-500 font-mono border-t border-zinc-200">
                        <span>Variables: <strong>{spec.sampleVariables.length}</strong></span>
                        <span>Botones: <strong>{spec.buttons?.length || 0}</strong></span>
                        <span>Tipo: <strong>{spec.category}</strong></span>
                      </div>
                    </div>

                    {/* Editor de Variables Dinámicas */}
                    {spec.sampleVariables.length > 0 && (
                      <div className="space-y-2 border border-zinc-200 rounded-xl p-3 bg-white shadow-2xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-zinc-800 text-[11px] flex items-center gap-1.5">
                            <Sliders className="w-3.5 h-3.5 text-zinc-600" />
                            Variables Dinámicas ({spec.sampleVariables.length})
                          </span>
                          <button
                            onClick={() => handleResetTemplateVariables(selectedTemplateKey)}
                            className="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 hover:underline cursor-pointer"
                          >
                            Restablecer Ejemplos
                          </button>
                        </div>

                        <div className="space-y-2 pt-1">
                          {spec.sampleVariables.map((sample, idx) => {
                            const currentVal = currentVars[idx] ?? sample;
                            return (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between items-center text-[10px] text-zinc-500">
                                  <span className="font-mono font-bold text-zinc-700">
                                    {`{{${idx + 1}}}`}
                                  </span>
                                  <span className="truncate max-w-[200px] text-zinc-400 italic">
                                    Ej: {sample}
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  value={currentVal}
                                  onChange={(e) =>
                                    handleTemplateVariableChange(
                                      selectedTemplateKey,
                                      idx,
                                      e.target.value
                                    )
                                  }
                                  placeholder={sample}
                                  className="w-full px-2.5 py-1.5 text-xs bg-zinc-50 border border-zinc-200 rounded-lg outline-none focus:border-emerald-600 text-zinc-900 font-mono shadow-2xs"
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Vista Previa WhatsApp */}
                    <div className="space-y-1.5">
                      <span className="font-bold text-zinc-800 text-[11px] block">
                        Vista Previa en WhatsApp del Destinatario:
                      </span>
                      <div className="bg-[#efeae2] p-4 rounded-2xl border border-zinc-300 shadow-inner">
                        <div className="bg-white rounded-2xl rounded-tl-none p-3.5 shadow-sm space-y-2 max-w-[290px] border border-zinc-100 text-zinc-900">
                          {/* Header */}
                          {spec.header && (
                            <p className="font-bold text-xs text-zinc-900 border-b border-zinc-100 pb-1.5 leading-tight">
                              {spec.header}
                            </p>
                          )}

                          {/* Body */}
                          <div className="text-[11px] leading-relaxed text-zinc-800 whitespace-pre-line">
                            {renderPreviewBody()}
                          </div>

                          {/* Footer */}
                          {spec.footer && (
                            <p className="text-[9px] text-zinc-400 font-sans pt-1 border-t border-zinc-100 leading-tight">
                              {spec.footer}
                            </p>
                          )}

                          {/* Botones Interactivos */}
                          {spec.buttons && spec.buttons.length > 0 && (
                            <div className="pt-2 space-y-1.5 border-t border-zinc-100">
                              {spec.buttons.map((btn, bIdx) => (
                                <div
                                  key={bIdx}
                                  className="w-full py-1.5 px-2 text-center text-[10px] font-bold text-[#00a884] bg-emerald-50/70 hover:bg-emerald-100 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                                >
                                  {btn.type === 'PHONE_NUMBER' && <Phone className="w-3 h-3" />}
                                  {btn.type === 'URL' && <ExternalLink className="w-3 h-3" />}
                                  {btn.type === 'QUICK_REPLY' && <MessageSquare className="w-3 h-3" />}
                                  <span>{btn.text}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <span className="text-[9px] text-zinc-400 block text-right font-mono">
                            12:00 <span className="text-[#53bdeb]">✓✓</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Feedback Banner */}
                    {templateFeedback && (
                      <div
                        className={`p-3 rounded-xl border text-[11px] leading-snug flex items-start gap-2 ${
                          templateFeedback.success
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-red-50 border-red-200 text-red-900'
                        }`}
                      >
                        {templateFeedback.success ? (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-bold">{templateFeedback.message}</p>
                          {templateFeedback.mode === 'text_fallback' && (
                            <p className="text-[10px] text-emerald-700 mt-1">
                              Meta WhatsApp Manager: la plantilla está en proceso de revisión oficial; se utilizó el fallback a texto con variables dinámicas para evitar pérdida de contacto.
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Acciones: Disparar y Copiar JSON */}
                    <div className="space-y-2 pt-1">
                      <button
                        onClick={handleSendSelectedTemplate}
                        disabled={!selectedChat || sendingTemplate}
                        className="w-full py-2.5 px-3 bg-[#00a884] hover:bg-[#008f6f] disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98 disabled:cursor-not-allowed"
                      >
                        {sendingTemplate ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Despachando Plantilla...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>
                              {selectedChat
                                ? `Disparar a ${selectedChat.customers?.full_name || selectedChat.phone_number}`
                                : 'Selecciona un chat para disparar'}
                            </span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => handleCopyTemplateJson(selectedTemplateKey)}
                        className="w-full py-2 px-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-zinc-200"
                      >
                        {copiedTemplateJson ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">¡JSON Copiado al Portapapeles!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-zinc-600" />
                            <span>Copiar JSON para Meta Business Suite</span>
                          </>
                        )}
                      </button>

                      {/* Botón Acordeón Ver JSON Oficial */}
                      <button
                        onClick={() => setShowJsonPayload(!showJsonPayload)}
                        className="w-full py-1 text-center text-[11px] text-zinc-500 hover:text-black flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Code className="w-3 h-3" />
                        <span>{showJsonPayload ? 'Ocultar Estructura JSON' : 'Ver Payload JSON Oficial (Graph API)'}</span>
                        {showJsonPayload ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      {showJsonPayload && (
                        <pre className="p-3 bg-zinc-900 text-emerald-400 rounded-xl font-mono text-[10px] overflow-x-auto max-h-56 select-all border border-zinc-800 leading-relaxed">
                          {JSON.stringify(buildMetaTemplatePayload(spec), null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </aside>
        )}
      </div>

      {/* ── MODAL: NUEVO CHAT ────────────────────────────────────────────── */}
      {isNewChatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-zinc-200 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                <h3 className="font-bold text-sm text-zinc-900">Iniciar Nuevo Chat WhatsApp</h3>
              </div>
              <button
                onClick={() => setIsNewChatModalOpen(false)}
                className="text-zinc-400 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-zinc-500">
              Ingresa el número con código de país (ej: <code>+56 9 8402 1940</code>) para abrir una nueva conversación directa.
            </p>

            <input
              type="text"
              value={newPhoneInput}
              onChange={(e) => setNewPhoneInput(e.target.value)}
              placeholder="+56 9 1234 5678"
              className="w-full px-3.5 py-2.5 text-xs bg-zinc-50 border border-zinc-200 focus:border-black rounded-xl outline-none font-mono"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsNewChatModalOpen(false)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleStartChat()}
                disabled={creatingChat || !newPhoneInput.trim()}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#00a884] hover:bg-[#008f6f] disabled:bg-zinc-300 transition-colors shadow-sm cursor-pointer"
              >
                {creatingChat ? 'Abriendo...' : 'Iniciar Conversación'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
