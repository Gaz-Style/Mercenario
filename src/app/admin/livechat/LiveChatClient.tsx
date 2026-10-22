'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Send, Bot, User, Phone, Search, 
  ToggleLeft, ToggleRight, MessageSquare, 
  RefreshCw, X, Plus, Smile, Sparkles, Store
} from 'lucide-react';
import { 
  getWhatsAppChatsAction, 
  getWhatsAppMessagesAction, 
  sendWhatsAppMessageAction, 
  toggleBotSessionAction,
  createOrStartChatAction,
  simulateCustomerMessageAction
} from './actions';

// Icono Oficial de WhatsApp SVG
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function LiveChatClient({ initialChats = [] }: { initialChats?: any[] }) {
  const safeChats = Array.isArray(initialChats) ? initialChats : [];
  const [chats, setChats] = useState<any[]>(safeChats);
  const [selectedChat, setSelectedChat] = useState<any>(safeChats[0] || null);
  const [messages, setMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [autoRevertSeconds, setAutoRevertSeconds] = useState<number | null>(null);
  const [showCRM, setShowCRM] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMobileList, setShowMobileList] = useState(true);
  const [showSimulator, setShowSimulator] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [customSimText, setCustomSimText] = useState('');

  // Modal para iniciar nuevo chat
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [newPhoneInput, setNewPhoneInput] = useState('');
  const [creatingChat, setCreatingChat] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
        setSelectedChat((prev: any) => prev?.id === chatId ? { ...prev, session_status: 'bot' } : prev);
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

  // Poll chats periodically
  useEffect(() => {
    refreshChats();
    const interval = setInterval(refreshChats, 10000);
    return () => clearInterval(interval);
  }, []);

  // Poll messages for selected chat
  useEffect(() => {
    if (!selectedChat?.id) return;
    
    const loadMessages = async () => {
      const msgs = await getWhatsAppMessagesAction(selectedChat.id);
      setMessages(msgs);
    };

    loadMessages();
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [selectedChat?.id]);

  // Manage auto-revert timer
  useEffect(() => {
    if (selectedChat?.id && selectedChat.session_status !== 'bot') {
      startAutoRevert(selectedChat.id);
    } else {
      clearAutoRevert();
    }
    return () => clearAutoRevert();
  }, [selectedChat?.id, selectedChat?.session_status]);

  // Scroll to bottom
  const scrollToBottom = (instant = false) => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: instant ? 'auto' : 'smooth' });
    }, 80);
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom(true);
    }
  }, [messages.length, selectedChat?.id]);

  const handleSelectChat = (chat: any) => {
    setSelectedChat(chat);
    setShowMobileList(false);
  };

  const handleBackToList = () => {
    setShowMobileList(true);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const content = textToSend || replyText;
    if (!content.trim() || !selectedChat || sending) return;

    setSending(true);
    setSendError(null);
    if (!textToSend) {
      setReplyText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }

    const optimisticMsg = {
      id: `temp-${Date.now()}`,
      chat_id: selectedChat.id,
      sender_type: 'human',
      message_type: 'text',
      content: content.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    scrollToBottom();

    const res = await sendWhatsAppMessageAction(selectedChat.id, content.trim());
    setSending(false);

    if (res.success) {
      setSelectedChat((prev: any) => ({ ...prev, session_status: 'human_handoff' }));
      startAutoRevert(selectedChat.id);
      refreshChats();
    } else {
      setSendError(res.error || 'No se pudo enviar el mensaje');
    }
  };

  const handleSimulateMessage = async (text: string) => {
    if (!selectedChat?.id || !text.trim() || simulating) return;
    setSimulating(true);
    try {
      const res = await simulateCustomerMessageAction(selectedChat.id, text.trim());
      if (res.success && res.messages) {
        setMessages(res.messages);
        setCustomSimText('');
        refreshChats();
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } catch (err) {
      console.error('Error simulando mensaje:', err);
    } finally {
      setSimulating(false);
    }
  };

  const handleToggleBot = async () => {
    if (!selectedChat) return;
    const isBot = selectedChat.session_status === 'bot';
    const nextStatus = !isBot;

    const res = await toggleBotSessionAction(selectedChat.id, nextStatus);
    if (res.success) {
      setSelectedChat((prev: any) => ({ ...prev, session_status: res.status }));
      if (!nextStatus) {
        startAutoRevert(selectedChat.id);
      } else {
        clearAutoRevert();
      }
      refreshChats();
    }
  };

  const handleStartChat = async (phoneNumber?: string) => {
    const raw = phoneNumber || newPhoneInput;
    if (!raw.trim()) return;

    setCreatingChat(true);
    const res = await createOrStartChatAction(raw.trim());
    setCreatingChat(false);

    if (res.success && res.chat) {
      setIsNewChatModalOpen(false);
      setNewPhoneInput('');
      setSearchQuery('');
      await refreshChats();
      setSelectedChat(res.chat);
      setShowMobileList(false);
    } else {
      alert(res.error || 'Error al iniciar conversación');
    }
  };

  const filteredChats = chats.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const name = (c.customers?.full_name || '').toLowerCase();
    const phone = (c.phone_number || '').toLowerCase();
    const lastMsg = (c.last_message || '').toLowerCase();
    return name.includes(q) || phone.includes(q) || lastMsg.includes(q);
  });

  const formatTimeDigits = (isoDate?: string) => {
    if (!isoDate) return '';
    try {
      const d = new Date(isoDate);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } catch {
      return '';
    }
  };

  const formatLastInteraction = (isoDate?: string) => {
    if (!isoDate) return '';
    try {
      const d = new Date(isoDate);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays === 0) return formatTimeDigits(isoDate);
      if (diffDays === 1) return 'Ayer';
      if (diffDays < 7) return d.toLocaleDateString([], { weekday: 'short' });
      return d.toLocaleDateString([], { day: '2-digit', month: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#f0f2f5] overflow-hidden select-none">
      
      {/* ── TOPBAR WHATSAPP BUSINESS OFICIAL ────────────────────────── */}
      <header className="h-14 bg-[#075e54] text-white flex items-center justify-between px-3.5 sm:px-5 shrink-0 z-20 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
            <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-xs sm:text-sm font-bold tracking-tight">WhatsApp Business Live</h1>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/15 text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" /> Conectado
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => {
              setNewPhoneInput(searchQuery || '');
              setIsNewChatModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-white text-[#075e54] hover:bg-white/95 font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer text-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nuevo Chat</span>
          </button>
          <button 
            onClick={refreshChats}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white/90 hover:text-white transition-colors cursor-pointer"
            title="Refrescar conversaciones"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── CUERPO PRINCIPAL WHATSAPP WEB ───────────────────────────── */}
      <div className="flex-1 flex w-full max-w-[1700px] mx-auto overflow-hidden bg-white shadow-lg border-x border-slate-200 relative">
        
        {/* ── COLUMNA 1: LISTADO DE CHATS (Móvil toggleable) ── */}
        <aside className={`w-full md:w-[350px] lg:w-[390px] border-r border-[#e9edef] flex flex-col bg-white shrink-0 z-10 ${!showMobileList ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Buscador de Chats */}
          <div className="p-2.5 bg-[#f0f2f5] border-b border-[#e9edef]">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[#54656f] absolute left-3 pointer-events-none" />
              <input
                type="text"
                placeholder="Busca un chat o escribe un número..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && searchQuery.replace(/\D/g, '').length >= 8) {
                    handleStartChat(searchQuery);
                  }
                }}
                className="w-full bg-white border border-[#e9edef] focus:border-[#00a884] rounded-lg pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-[#667781] outline-none shadow-xs transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Detección directa de número en la búsqueda */}
          {searchQuery.replace(/\D/g, '').length >= 8 && (
            <div className="p-2.5 bg-emerald-50 border-b border-emerald-200 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                  <WhatsAppIcon className="w-3 h-3 text-emerald-600" /> WhatsApp directo
                </div>
                <div className="text-xs font-mono font-bold text-slate-900 truncate">
                  {searchQuery}
                </div>
              </div>
              <button
                onClick={() => handleStartChat(searchQuery)}
                disabled={creatingChat}
                className="px-3 py-1.5 rounded-lg bg-[#00a884] hover:bg-[#008f6f] text-white font-bold text-xs flex items-center gap-1 transition-all shadow-xs shrink-0 cursor-pointer"
              >
                {creatingChat ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                Abrir
              </button>
            </div>
          )}

          {/* Lista de Chats */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#f0f2f5] bg-white no-scrollbar">
            {filteredChats.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-8 text-center text-[#667781]">
                <MessageSquare className="w-10 h-10 mb-2 text-[#d1d7db]" />
                <p className="text-xs font-semibold text-slate-700">No hay conversaciones</p>
                {searchQuery.replace(/\D/g, '').length >= 8 && (
                  <button
                    onClick={() => handleStartChat(searchQuery)}
                    className="mt-3 px-4 py-2 bg-[#00a884] text-white text-xs font-bold rounded-lg shadow-sm hover:bg-[#008f6f] transition-all cursor-pointer"
                  >
                    Iniciar chat con {searchQuery}
                  </button>
                )}
              </div>
            ) : (
              filteredChats.map(chat => {
                const isSelected = selectedChat?.id === chat.id;
                const isBot = chat.session_status === 'bot';

                return (
                  <div
                    key={chat.id}
                    onClick={() => handleSelectChat(chat)}
                    className={`w-full px-3.5 py-3 text-left transition-colors flex items-center gap-3 cursor-pointer relative ${
                      isSelected ? 'bg-[#f0f2f5]' : 'hover:bg-[#f5f6f6]'
                    }`}
                  >
                    {/* Avatar con Insignia WhatsApp */}
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-full bg-[#dfe5e7] flex items-center justify-center font-bold text-sm text-[#54656f] overflow-hidden">
                        {chat.customers?.full_name ? chat.customers.full_name.charAt(0) : <User className="w-5 h-5 text-[#8696a0]" />}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-[2px] shadow-xs">
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                      </div>
                    </div>

                    {/* Datos del Contacto */}
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h4 className="font-semibold text-slate-900 truncate text-[13.5px]">
                          {chat.customers?.full_name || chat.phone_number}
                        </h4>
                        <span className="text-[11px] text-[#667781] shrink-0 font-sans">
                          {formatLastInteraction(chat.last_message_at || chat.last_interaction)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[12.5px] text-[#667781] truncate flex-1 font-light">
                          {chat.last_message || 'Conversación iniciada'}
                        </p>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium shrink-0 ${
                          isBot ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        }`}>
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

        {/* ── COLUMNA 2: ÁREA CENTRAL DE CONVERSACIÓN WHATSAPP ── */}
        <main className={`flex-1 flex flex-col bg-[#efeae2] relative h-full min-w-0 overflow-hidden ${showMobileList ? 'hidden md:flex' : 'flex'}`}>
          
          {/* Trama de Fondo WhatsApp */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.05]" 
            style={{ 
              backgroundImage: 'url("https://w0.peakpx.com/wallpaper/508/887/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp-thumbnail.jpg")', 
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }} 
          />

          {selectedChat ? (
            <>
              {/* Header de la Conversación */}
              <div className="h-14 px-3 sm:px-4 border-b border-[#e9edef] bg-[#f0f2f5] flex items-center justify-between shrink-0 z-10 sticky top-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button 
                    onClick={handleBackToList}
                    className="md:hidden p-1.5 -ml-1 text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
                    title="Volver a lista de chats"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="w-9 h-9 rounded-full bg-[#dfe5e7] flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-[#54656f]" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3 className="font-semibold text-slate-900 text-xs sm:text-sm leading-tight truncate">
                      {selectedChat.customers?.full_name || selectedChat.phone_number}
                    </h3>
                    <p className="text-[10.5px] text-[#667781] font-mono leading-tight truncate">
                      {selectedChat.phone_number}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {selectedChat.session_status !== 'bot' && autoRevertSeconds !== null && (
                    <span className="hidden sm:inline-block text-[10px] text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-medium animate-pulse">
                      IA reanuda en {autoRevertSeconds}s
                    </span>
                  )}

                  {/* Toggle Bot / Humano (Copiado de gaz_style) */}
                  <button 
                    onClick={handleToggleBot}
                    className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-all border shadow-xs cursor-pointer ${
                      selectedChat.session_status === 'bot' 
                        ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50' 
                        : 'bg-[#00a884] text-white border-[#00a884] hover:bg-[#008f6f]'
                    }`}
                  >
                    {selectedChat.session_status === 'bot' ? <ToggleRight className="w-4 h-4 text-[#00a884]" /> : <ToggleLeft className="w-4 h-4 text-white" />}
                    <span className="hidden sm:inline">{selectedChat.session_status === 'bot' ? 'Modo IA Activa' : 'Modo Operador Humano'}</span>
                    <span className="sm:hidden">{selectedChat.session_status === 'bot' ? 'IA' : 'Humano'}</span>
                  </button>

                  {/* Botón Simulador de Prueba del Bot */}
                  <button
                    onClick={() => setShowSimulator(!showSimulator)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all border shadow-xs cursor-pointer ${
                      showSimulator 
                        ? 'bg-purple-600 text-white border-purple-600' 
                        : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
                    }`}
                    title="Simulador de Preguntas y Respuestas del Bot"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Probar Bot</span>
                  </button>

                  {/* Botón Alternar Ficha CRM */}
                  <button
                    onClick={() => setShowCRM(!showCRM)}
                    className={`p-2 rounded-full border text-xs transition-colors cursor-pointer ${
                      showCRM ? 'bg-black text-white border-black font-bold' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                    title="Alternar Ficha Cliente CRM"
                  >
                    <User className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Historial de Mensajes con Burbujas WhatsApp */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-2.5 z-10 scroll-smooth no-scrollbar">
                {messages.map((msg, index) => {
                  const isCustomer = msg.sender_type === 'customer' || msg.sender_type === 'client';

                  return (
                    <div key={msg.id || index} className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}>
                      <div 
                        className={`relative max-w-[85%] sm:max-w-[70%] rounded-xl shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] px-3 py-1.5 ${
                          isCustomer 
                            ? 'bg-white text-slate-900 rounded-tl-none before:absolute before:top-0 before:-left-[8px] before:w-0 before:h-0 before:border-r-[8px] before:border-r-white before:border-b-[12px] before:border-b-transparent' 
                            : 'bg-[#dcf8c6] text-slate-900 rounded-tr-none after:absolute after:top-0 after:-right-[8px] after:w-0 after:h-0 after:border-l-[8px] after:border-l-[#dcf8c6] after:border-b-[12px] after:border-b-transparent'
                        }`}
                      >
                        {/* Indicador de quién responde (Operador / IA) */}
                        {!isCustomer && (
                          <div className="flex items-center gap-1 mb-0.5 text-[#075e54]">
                            {msg.sender_type === 'bot' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                            <span className="text-[10px] font-bold">
                              {msg.sender_type === 'bot' ? 'Asistente IA WEKE' : 'Operador Mercenario'}
                            </span>
                          </div>
                        )}

                        {/* Contenido del Mensaje */}
                        <p className="text-[13.5px] leading-[18px] whitespace-pre-wrap break-words pb-2.5">
                          {msg.content}
                          <span className="inline-block w-12 h-1"></span>
                        </p>

                        {/* Hora y Doble Check Azul */}
                        <div className={`absolute bottom-1 right-2 text-[10px] flex items-center gap-1 ${
                          isCustomer ? 'text-[#667781]' : 'text-[#54656f]'
                        }`}>
                          {formatTimeDigits(msg.created_at)}
                          {!isCustomer && <span className="text-[#53bdeb] font-bold">✓✓</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} className="h-2" />
              </div>

              {/* Simulador de Pruebas IA */}
              {showSimulator && (
                <div className="bg-purple-50/95 border-t border-purple-200 p-2.5 sm:p-3 z-20 shrink-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      Simulador de Pruebas en Vivo (Motor RAC)
                    </span>
                    <button 
                      onClick={() => setShowSimulator(false)} 
                      className="text-purple-400 hover:text-purple-700 text-xs cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      disabled={simulating}
                      onClick={() => handleSimulateMessage("Hola, me gustaría saber sobre la chaqueta Andes Gore y qué talla me recomiendan")}
                      className="px-2.5 py-1 bg-white hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
                    >
                      🏔️ Preguntar por Chaqueta WEKE
                    </button>
                    <button
                      type="button"
                      disabled={simulating}
                      onClick={() => handleSimulateMessage("Hola, ¿cuánto cuesta el sistema de software Mercenario y qué incluye?")}
                      className="px-2.5 py-1 bg-white hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
                    >
                      💼 Preguntar por Sistema Mercenario
                    </button>
                    <button
                      type="button"
                      disabled={simulating}
                      onClick={() => handleSimulateMessage("Quiero hablar con una persona por favor")}
                      className="px-2.5 py-1 bg-white hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
                    >
                      👤 Pedir Humano
                    </button>
                  </div>

                  <div className="flex gap-2 pt-0.5">
                    <input
                      type="text"
                      value={customSimText}
                      onChange={(e) => setCustomSimText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSimulateMessage(customSimText);
                        }
                      }}
                      placeholder="Escribe una consulta como cliente..."
                      className="flex-1 bg-white border border-purple-200 focus:border-purple-500 rounded-lg px-3 py-1.5 text-xs text-slate-800 outline-none"
                    />
                    <button
                      type="button"
                      disabled={!customSimText.trim() || simulating}
                      onClick={() => handleSimulateMessage(customSimText)}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1 cursor-pointer"
                    >
                      {simulating ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      <span>Enviar</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Input WhatsApp con Cápsula Inferior */}
              <div className="bg-[#f0f2f5] p-2 sm:p-2.5 z-20 shrink-0 border-t border-[#e9edef]">
                {sendError && (
                  <div className="mb-2 text-xs text-red-600 text-center bg-red-50 border border-red-200 py-1 rounded-lg">
                    ⚠️ {sendError}
                  </div>
                )}

                <div className="flex items-end gap-2 max-w-5xl mx-auto relative">
                  
                  {/* Selector de Emojis */}
                  {showEmojiPicker && (
                    <div className="absolute bottom-[56px] left-0 sm:left-2 bg-white rounded-xl shadow-2xl border border-slate-200 p-3 z-50 w-[290px] max-w-[calc(100vw-32px)] max-h-[250px] overflow-y-auto no-scrollbar">
                      {[
                        { label: 'Frecuentes', emojis: ['😊', '👍', '❤️', '🙏', '✨', '🎉', '💯', '🔥', '👏', '😍'] },
                        { label: 'Retail & Tienda', emojis: ['👕', '🧥', '🥾', '🎒', '📦', '💳', '🏷️', '🚚', '⭐', '📍'] },
                        { label: 'Gestos', emojis: ['👋', '🤝', '✌️', '🤞', '👌', '🫶', '🙌', '👀', '💬', '📸'] },
                      ].map((cat) => (
                        <div key={cat.label} className="mb-2">
                          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1 px-1">{cat.label}</p>
                          <div className="grid grid-cols-5 gap-1">
                            {cat.emojis.map((emoji) => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => {
                                  setReplyText(prev => prev + emoji);
                                  textareaRef.current?.focus();
                                }}
                                className="w-8 h-8 flex items-center justify-center text-lg hover:bg-slate-100 rounded cursor-pointer"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Cápsula de Texto */}
                  <div className="flex-1 bg-white rounded-3xl flex items-center px-2 min-h-[42px] shadow-xs border border-slate-200 focus-within:border-[#00a884]">
                    <button
                      type="button"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className={`p-2 rounded-full transition-colors shrink-0 cursor-pointer ${showEmojiPicker ? 'text-[#00a884]' : 'text-[#54656f] hover:text-slate-800'}`}
                      title="Emojis"
                    >
                      <Smile className="w-5 h-5" />
                    </button>

                    <textarea
                      ref={textareaRef}
                      value={replyText}
                      onChange={(e) => {
                        setReplyText(e.target.value);
                        setSendError(null);
                        e.target.style.height = 'auto';
                        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                        if (selectedChat?.id && selectedChat?.session_status !== 'bot') {
                          startAutoRevert(selectedChat.id);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      onFocus={() => setShowEmojiPicker(false)}
                      placeholder="Escribe un mensaje por WhatsApp..."
                      className="w-full py-2.5 px-2 text-[13.5px] bg-transparent outline-none resize-none max-h-[120px] leading-snug text-slate-900 no-scrollbar overflow-hidden"
                      rows={1}
                    />
                  </div>

                  {/* Botón Circular de Enviar WhatsApp */}
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!replyText.trim() || sending}
                    className="bg-[#00a884] hover:bg-[#008f6f] text-white rounded-full w-[42px] h-[42px] flex items-center justify-center shrink-0 transition-transform active:scale-95 disabled:opacity-50 shadow-md cursor-pointer"
                    title="Enviar mensaje"
                  >
                    {sending ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 ml-0.5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Estado Vacío Estilo WhatsApp Web */
            <div className="hidden md:flex flex-1 flex-col items-center justify-center text-center p-8 bg-[#f0f2f5] z-10 border-b-8 border-[#00a884]">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#25D366] mb-4 shadow-xs">
                <WhatsAppIcon className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-light text-[#41525d] mb-1">WhatsApp Web Live Chat</h2>
              <p className="text-xs text-[#667781] max-w-sm leading-relaxed">
                Selecciona una conversación del listado o haz clic en <strong>+ Nuevo Chat</strong> para contactar directamente a cualquier cliente.
              </p>
            </div>
          )}
        </main>

        {/* ── COLUMNA 3: FICHA CLIENTE CRM (DRAWER LATERAL) ── */}
        {showCRM && selectedChat && (
          <>
            <div 
              onClick={() => setShowCRM(false)}
              className="2xl:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-40"
            />
            <aside className="fixed inset-y-0 right-0 z-50 w-full sm:w-80 2xl:static 2xl:z-auto border-l border-[#e9edef] bg-white p-5 space-y-5 overflow-y-auto shrink-0 text-xs shadow-2xl 2xl:shadow-none animate-in slide-in-from-right duration-200 h-full">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-bold text-[#075e54] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5" /> Ficha Cliente CRM
                </span>
                <button 
                  onClick={() => setShowCRM(false)} 
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selectedChat.customers ? (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Identificación</span>
                    <p className="font-bold text-slate-900 text-sm">{selectedChat.customers.full_name}</p>
                    <p className="text-slate-600 text-xs">{selectedChat.customers.email || 'Sin correo registrado'}</p>
                    <p className="text-[#008069] font-mono font-bold text-xs">{selectedChat.customers.phone}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">Datos Comerciales &amp; Perfil</span>
                    
                    <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                      <span className="text-slate-600">Ciudad:</span>
                      <strong className="text-slate-900">{selectedChat.customers.city || 'Santiago'}</strong>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                      <span className="text-slate-600">Talla Habitual:</span>
                      <strong className="text-black">{selectedChat.customers.preferred_size || 'Talla M'}</strong>
                    </div>

                    <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                      <span className="text-slate-600">Total Pedidos:</span>
                      <strong className="text-emerald-700">{selectedChat.customers.total_orders || 1} compras</strong>
                    </div>

                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-600">Interés:</span>
                      <strong className="text-black">{selectedChat.customers.interest || 'Prendas Técnicas'}</strong>
                    </div>
                  </div>

                  <Link
                    href="/admin/ecommerce/clientes"
                    className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white font-bold rounded-xl text-center block transition-colors shadow-xs"
                  >
                    Ver en Base de Clientes →
                  </Link>
                </div>
              ) : (
                <div className="p-6 text-center text-slate-500 space-y-2">
                  <User className="w-8 h-8 mx-auto opacity-30" />
                  <p className="font-medium">Número no registrado en la base de clientes.</p>
                  <p className="text-[11px] text-slate-400">Al registrar una compra o consulta formal, se vinculará automáticamente.</p>
                </div>
              )}
            </aside>
          </>
        )}

      </div>

      {/* ── MODAL: NUEVA CONVERSACIÓN DE WHATSAPP ─────────────────── */}
      {isNewChatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setIsNewChatModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#25D366]">
                <WhatsAppIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">Iniciar Conversación WhatsApp</h3>
                <p className="text-xs text-slate-500">Línea Oficial WhatsApp Cloud API</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Ingresa el número al que deseas contactar. Si es de Chile, puedes escribir los 9 dígitos (ej: <span className="text-[#008069] font-mono font-bold">957958467</span>) o con código de país (<span className="text-[#008069] font-mono font-bold">+56957958467</span>).
            </p>

            <form
              onSubmit={e => {
                e.preventDefault();
                handleStartChat();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[11px] font-mono text-slate-600 uppercase tracking-wider mb-1.5 font-bold">
                  Número de Teléfono / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="957958467 ó +56957958467"
                    value={newPhoneInput}
                    onChange={e => setNewPhoneInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-[#00a884] focus:bg-white rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 font-mono placeholder-slate-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 text-[#075e54] font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> Vinculación de base de datos
                </div>
                <p>
                  Si este número ya tiene compras registradas en WEKE Store, se vinculará su historial y ficha de cliente automáticamente.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewChatModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={creatingChat || !newPhoneInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-[#00a884] hover:bg-[#008f6f] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  {creatingChat ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Conectando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Abrir Chat</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
