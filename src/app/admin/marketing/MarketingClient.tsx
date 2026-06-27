'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ArrowLeft, Target, BarChart3, MessageSquare, Search, Award, TrendingUp,
    CheckCircle2, Circle, Clock, Check, ListTodo, SlidersHorizontal, BookOpen,
    Sparkles, Plus, Calendar, Users, Zap, Globe, Building2
} from 'lucide-react';
import { getMarketingTasks, updateMarketingTaskStatus } from './actions';

interface Task {
    id: string;
    title: string;
    description: string;
    category: 'SEO & GEO' | 'Meta Ads' | 'Influencer Loop' | 'Automatización CRM' | 'Viral Loop (Referidos)';
    status: 'completed' | 'in_progress' | 'pending';
    date: string;
    impact: 'Alto' | 'Medio' | 'Bajo';
}

// ─── LOS 5 PILARES DE MARKETING QUE MERCENARIO VENDE Y EJECUTA ────────────────
const marketingPillars = [
    {
        title: '1. SEO & GEO (Generative Engine)',
        focus: 'Que los LLMs (ChatGPT, Gemini, Perplexity) y Google Maps recomienden a las empresas clientes de forma orgánica y local.',
        metrics: 'Schema JSON-LD indexado, Autocompletado local, Posicionamiento top en búsquedas por industria.',
        icon: Search,
        color: 'border-blue-200 bg-blue-50/30',
    },
    {
        title: '2. Meta Ads & LinkedIn B2B',
        focus: 'Pauta segmentada por industria y tamaño de empresa. Campañas de retargeting para dueños de negocios que visitaron la landing.',
        metrics: 'ROAS objetivo 4x+, segmentación por cargo (Dueño/Gerente), CPL < $15.000 CLP.',
        icon: Target,
        color: 'border-pink-200 bg-pink-50/30',
    },
    {
        title: '3. Influencer Loop & Red de Referidos',
        focus: 'Programa de referidos entre empresas clientes activas. Cada cliente satisfecho recibe incentivos por traer nuevos prospectos B2B.',
        metrics: 'Proyección: 20% de adquisición mensual vía referidos, cupones QR de trazabilidad.',
        icon: Award,
        color: 'border-purple-200 bg-purple-50/30',
    },
    {
        title: '4. Automatización de CRM',
        focus: 'Flujos automatizados de WhatsApp que nutren leads desde el primer contacto hasta el cierre. Seguimiento de demos, cotizaciones y onboarding.',
        metrics: '15% conversión lead→demo, alertas automáticas de seguimiento, pipelines activos.',
        icon: MessageSquare,
        color: 'border-emerald-200 bg-emerald-50/30',
    },
    {
        title: '5. Viral Loop (Casos de Éxito)',
        focus: 'Documentar y publicar los resultados reales de cada cliente implementado. Los casos de éxito se convierten en el principal activo de ventas B2B.',
        metrics: 'Videos de caso, testimonios en landing, ROI documentado por industria.',
        icon: TrendingUp,
        color: 'border-amber-200 bg-amber-50/30',
    },
];

const categories = ['Todas', 'SEO & GEO', 'Meta Ads', 'Influencer Loop', 'Automatización CRM', 'Viral Loop (Referidos)'];

export default function MarketingClient({ initialLeads }: { initialLeads: any[] }) {
    const [activeTab, setActiveTab] = useState<'plan' | 'ai-studio' | 'leads'>('plan');
    const [copiedLink, setCopiedLink] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [selectedStatus, setSelectedStatus] = useState('Todos');
    const [leads] = useState(initialLeads);

    useEffect(() => {
        const loadData = async () => {
            const tasksData = await getMarketingTasks();
            setTasks(tasksData.map((t: any) => ({
                id: t.id,
                title: t.title,
                description: t.description,
                category: t.category,
                status: t.status,
                date: t.target_date,
                impact: t.impact,
            })));
        };
        loadData();
    }, []);

    const handleToggleStatus = async (taskId: string) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;
        let newStatus: 'completed' | 'in_progress' | 'pending';
        if (task.status === 'pending') newStatus = 'in_progress';
        else if (task.status === 'in_progress') newStatus = 'completed';
        else newStatus = 'pending';
        const newDate = newStatus === 'completed' ? 'Hoy' : newStatus === 'in_progress' ? 'En Curso' : 'Pendiente';
        setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus, date: newDate } : t));
        await updateMarketingTaskStatus(taskId, newStatus, newDate);
    };

    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;

    const categoryProgress = categories.filter(c => c !== 'Todas').map(cat => {
        const catTasks = tasks.filter(t => t.category === cat);
        const catCompleted = catTasks.filter(t => t.status === 'completed').length;
        const total = catTasks.length || 1;
        const rate = catTasks.length > 0 ? Math.round((catCompleted / total) * 100) : 0;
        return { name: cat, completed: catCompleted, total: catTasks.length, rate };
    });

    const filteredTasks = tasks.filter(t => {
        const categoryMatch = selectedCategory === 'Todas' || t.category === selectedCategory;
        const statusMatch = selectedStatus === 'Todos' ||
            (selectedStatus === 'Logrados' && t.status === 'completed') ||
            (selectedStatus === 'En Curso' && t.status === 'in_progress') ||
            (selectedStatus === 'Pendientes' && t.status === 'pending');
        return categoryMatch && statusMatch;
    });

    const tabClass = (tab: string) =>
        `py-4 px-6 font-medium text-xs uppercase tracking-widest border-b-2 transition-all duration-300 flex items-center gap-2 ${activeTab === tab
            ? 'border-zinc-900 text-zinc-900 font-bold'
            : 'border-transparent text-zinc-400 hover:text-zinc-700 hover:border-zinc-300'}`;

    return (
        <div className="space-y-8">
            {/* Tabs */}
            <div className="flex border-b border-zinc-200">
                <button onClick={() => setActiveTab('plan')} className={tabClass('plan')}>
                    <ListTodo className="w-4 h-4" /> Plan & Checklist
                </button>
                <button onClick={() => setActiveTab('leads')} className={tabClass('leads')}>
                    <Users className="w-4 h-4" /> Leads B2B ({leads.length})
                </button>
                <button onClick={() => setActiveTab('ai-studio')} className={tabClass('ai-studio')}>
                    <Sparkles className="w-4 h-4" /> AI Content Studio
                </button>
            </div>

            {/* ── TAB: PLAN & CHECKLIST ─────────────────────────────── */}
            {activeTab === 'plan' && (
                <div className="space-y-10">
                    {/* Progress Banner */}
                    <div className="bg-white p-8 rounded-xl border border-zinc-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="space-y-3 max-w-xl">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-violet-50 text-violet-700 text-[10px] uppercase tracking-widest rounded-full font-bold border border-violet-200">
                                <Sparkles className="w-3 h-3" /> Estrategia 360° Activa
                            </span>
                            <h2 className="text-2xl font-serif text-zinc-900">Plan de Crecimiento & Posicionamiento B2B</h2>
                            <p className="text-sm text-zinc-500 leading-relaxed">
                                Estrategia integral para posicionar a Mercenario OS como el referente de infraestructura unificada para empresas en Chile, optimizado para algoritmos de respuesta generativa (IAs) y conversión B2B de alto valor.
                            </p>
                        </div>
                        <div className="flex-1 w-full flex flex-col gap-3 p-6 bg-zinc-50/80 border border-zinc-100 rounded-xl">
                            <p className="text-[10px] uppercase tracking-widest text-zinc-700 font-bold mb-1">Progreso por Módulo Estratégico</p>
                            {categoryProgress.map(cat => (
                                <div key={cat.name} className="flex flex-col gap-1">
                                    <div className="flex justify-between text-[9px] uppercase tracking-widest font-semibold text-zinc-400">
                                        <span>{cat.name}</span>
                                        <span className={cat.rate === 100 ? 'text-emerald-600' : ''}>{cat.rate}% ({cat.completed}/{cat.total})</span>
                                    </div>
                                    <div className="w-full bg-white h-1.5 rounded-full overflow-hidden border border-zinc-200/60">
                                        <div className="bg-zinc-800 h-full transition-all duration-500" style={{ width: `${cat.rate}%` }} />
                                    </div>
                                </div>
                            ))}
                            {tasks.length === 0 && (
                                <p className="text-[10px] text-zinc-400 italic mt-2">Ejecuta el SQL de Supabase para activar el checklist.</p>
                            )}
                        </div>
                    </div>

                    {/* Status Stats */}
                    <div className="flex gap-4 flex-wrap text-xs">
                        <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-100 font-medium">✓ {completedTasks} Logrados</span>
                        <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-lg border border-amber-100 font-medium">⏱ {inProgressTasks} En Curso</span>
                        <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-lg border border-zinc-200 font-medium">○ {pendingTasks} Pendientes</span>
                    </div>

                    {/* 5 Pillars */}
                    <div className="space-y-5">
                        <h3 className="text-sm font-bold text-zinc-800 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-violet-600" /> Los 5 Pilares de la Estrategia de Marketing
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {marketingPillars.map((p, idx) => (
                                <div key={idx} className={`p-5 border rounded-xl hover:shadow-md transition-all duration-300 flex flex-col justify-between ${p.color}`}>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[10px] uppercase font-bold tracking-widest text-violet-600">Pilar {idx + 1}</p>
                                            <p.icon className="w-4 h-4 text-zinc-400" />
                                        </div>
                                        <h4 className="text-xs font-bold text-zinc-800 tracking-tight">{p.title}</h4>
                                        <p className="text-[11px] text-zinc-500 leading-relaxed">{p.focus}</p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-zinc-200/50">
                                        <p className="text-[8px] uppercase tracking-widest text-zinc-400 font-bold">Métrica Clave</p>
                                        <p className="text-[10px] text-zinc-700 font-semibold mt-1">{p.metrics}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checklist */}
                    <div className="bg-white p-8 rounded-xl border border-zinc-200/80 shadow-sm space-y-6">
                        <div className="border-b border-zinc-100 pb-5">
                            <h3 className="text-xl font-serif text-zinc-900 flex items-center gap-2">
                                <ListTodo className="w-5 h-5 text-violet-600" /> Checklist de Implementación
                            </h3>
                            <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Haz clic en las tareas para alternar su estado</p>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col md:flex-row justify-between gap-4 pb-2 border-b border-zinc-100/50">
                            <div className="flex flex-wrap gap-2 items-center">
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mr-1 flex items-center gap-1">
                                    <SlidersHorizontal className="w-3 h-3" /> Filtrar:
                                </span>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-lg border transition-all ${selectedCategory === cat
                                            ? 'bg-zinc-900 text-white border-zinc-900 font-bold'
                                            : 'bg-white text-zinc-500 border-zinc-200 hover:border-zinc-300'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                {['Todos', 'Logrados', 'En Curso', 'Pendientes'].map(stat => (
                                    <button
                                        key={stat}
                                        onClick={() => setSelectedStatus(stat)}
                                        className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-lg transition-all ${selectedStatus === stat
                                            ? 'bg-violet-600 text-white font-bold'
                                            : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'}`}
                                    >
                                        {stat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Task Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                            {filteredTasks.length > 0 ? filteredTasks.map(t => (
                                <div
                                    key={t.id}
                                    onClick={() => handleToggleStatus(t.id)}
                                    className={`p-6 border rounded-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:scale-[1.01] hover:shadow-sm ${t.status === 'completed'
                                        ? 'border-emerald-200 bg-emerald-50/20'
                                        : t.status === 'in_progress'
                                            ? 'border-amber-200 bg-amber-50/20'
                                            : 'border-zinc-200 bg-white hover:border-zinc-300'}`}
                                >
                                    <div className="space-y-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                <div className="shrink-0">
                                                    {t.status === 'completed' ? (
                                                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                                                            <Check className="w-3 h-3 stroke-[3px]" />
                                                        </div>
                                                    ) : t.status === 'in_progress' ? (
                                                        <Clock className="w-5 h-5 text-amber-500" />
                                                    ) : (
                                                        <Circle className="w-5 h-5 text-zinc-300 hover:text-violet-500 transition-colors" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className={`text-sm font-bold ${t.status === 'completed' ? 'line-through text-zinc-400' : 'text-zinc-800'}`}>
                                                        {t.title}
                                                    </h4>
                                                    <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-mono">{t.category}</span>
                                                </div>
                                            </div>
                                            <span className={`text-[9px] uppercase tracking-widest px-2 py-1 rounded-full font-bold flex-shrink-0 ${t.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : t.status === 'in_progress' ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-600'}`}>
                                                {t.status === 'completed' ? 'Logrado' : t.status === 'in_progress' ? 'En Curso' : 'Pendiente'}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-zinc-500 leading-relaxed ml-8">{t.description}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-5 pt-3 border-t border-zinc-100/60 ml-8 text-[9px] uppercase tracking-wider text-zinc-400 font-semibold">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{t.date}</span>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-md ${t.impact === 'Alto' ? 'bg-red-50 text-red-600 font-bold' : t.impact === 'Medio' ? 'bg-amber-50 text-amber-600' : 'bg-zinc-50 text-zinc-500'}`}>
                                            {t.impact}
                                        </span>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-2 py-12 text-center border border-dashed border-zinc-200 rounded-xl">
                                    <p className="text-zinc-400 text-sm">
                                        {tasks.length === 0 ? 'Ejecuta el SQL de Supabase para poblar el checklist de tareas.' : 'Sin resultados para los filtros actuales.'}
                                    </p>
                                    {tasks.length > 0 && (
                                        <button onClick={() => { setSelectedCategory('Todas'); setSelectedStatus('Todos'); }} className="mt-2 text-xs text-violet-600 uppercase tracking-wider font-bold hover:underline">
                                            Restablecer filtros
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── TAB: LEADS B2B ───────────────────────────────────── */}
            {activeTab === 'leads' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Leads Captados', value: leads.length, color: 'text-sky-600' },
                            { label: 'Conversión', value: leads.length > 0 ? `${((leads.length / 150) * 100).toFixed(1)}%` : '0%', color: 'text-emerald-600' },
                            { label: 'Campañas Activas', value: '3', color: 'text-violet-600' },
                            { label: 'CPL Promedio', value: '$12.400', color: 'text-amber-600' },
                        ].map((s, i) => (
                            <div key={i} className="bg-white border border-zinc-200/80 rounded-xl p-4">
                                <p className="text-[9px] uppercase text-zinc-400 tracking-widest font-bold">{s.label}</p>
                                <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white rounded-xl border border-zinc-200/80 shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-zinc-100">
                            <h2 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Prospectos B2B desde Landing</h2>
                            <p className="text-[11px] text-zinc-400 mt-0.5">Empresas que completaron el formulario de auditoría.</p>
                        </div>
                        <div className="divide-y divide-zinc-100 max-h-[500px] overflow-y-auto">
                            {leads.length === 0 ? (
                                <div className="text-center py-16 space-y-2">
                                    <Users className="w-8 h-8 text-zinc-300 mx-auto" />
                                    <p className="text-sm text-zinc-400">Sin leads aún. Ejecuta el SQL de Supabase para activar la tabla.</p>
                                </div>
                            ) : leads.map((lead: any) => (
                                <div key={lead.id} className="p-5 hover:bg-zinc-50/50 transition-colors flex justify-between items-start gap-4">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-bold text-zinc-900">{lead.name}</span>
                                            <span className="text-[10px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">{lead.email}</span>
                                            {lead.budget && (
                                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                                                    {lead.budget}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-[11px] text-zinc-500 leading-relaxed">{lead.challenge}</p>
                                    </div>
                                    <div className="text-[10px] text-zinc-400 flex items-center gap-1 flex-shrink-0">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(lead.created_at).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ── TAB: AI CONTENT STUDIO ───────────────────────────── */}
            {activeTab === 'ai-studio' && (
                <div className="space-y-8">
                    <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 p-8 rounded-xl shadow-xl text-white relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h2 className="text-3xl font-serif flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 text-violet-400" /> AI Content Studio
                                </h2>
                                <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
                                    Genera copys B2B persuasivos para LinkedIn, Meta Ads y emails de prospección. Adaptados al tono técnico-ejecutivo de Mercenario OS.
                                </p>
                            </div>
                            <button className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl uppercase tracking-widest text-[10px] font-bold transition-all flex items-center gap-2">
                                <Sparkles className="w-4 h-4" /> Analizar Tendencias de Mercado
                            </button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Email Campaigns */}
                        <div className="bg-white p-8 rounded-xl border border-zinc-200/80 shadow-sm flex flex-col">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-100">
                                <MessageSquare className="w-5 h-5 text-violet-600" />
                                <h3 className="text-xl font-serif text-zinc-900">Campañas de Email B2B Segmentadas</h3>
                            </div>
                            <div className="space-y-6 flex-grow">
                                <p className="text-xs text-zinc-500">Borradores generados por IA, listos para tu revisión y envío a prospectos.</p>
                                {/* Segmento 1 */}
                                <div className="border border-violet-100 bg-violet-50/30 rounded-xl overflow-hidden hover:shadow-md transition-all">
                                    <div className="px-5 py-3 border-b border-violet-100 flex justify-between items-center bg-white/70">
                                        <div>
                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 text-white text-[9px] uppercase tracking-widest rounded-full font-bold mb-1">
                                                Dueños de Clínicas & Centros de Salud
                                            </span>
                                            <p className="text-[10px] uppercase tracking-wider text-zinc-400 mt-1">Intereses: Automatización de Citas & CRM</p>
                                        </div>
                                        <span className="text-xs font-mono bg-zinc-100 px-3 py-1 rounded-lg text-zinc-700 font-bold">8 Prospectos</span>
                                    </div>
                                    <div className="p-5 space-y-4">
                                        <div>
                                            <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">Asunto Sugerido</label>
                                            <input type="text" className="w-full mt-1 p-3 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500" defaultValue="¿Tu clínica pierde pacientes por no dar seguimiento automático?" />
                                        </div>
                                        <div>
                                            <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-400">Cuerpo del Correo</label>
                                            <textarea className="w-full mt-1 h-28 p-3 bg-white border border-zinc-200 rounded-lg text-sm text-zinc-500 leading-relaxed focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                                                defaultValue="Hola {nombre}, implementamos en su clínica un sistema de agendamiento autónomo conectado a WhatsApp que redujo el ausentismo en un 35%..." />
                                        </div>
                                        <div className="flex justify-end gap-3 pt-1">
                                            <button className="px-4 py-2 border border-zinc-200 text-zinc-500 hover:bg-zinc-50 rounded-lg uppercase tracking-widest text-[9px] font-bold transition-all">Descartar</button>
                                            <button className="bg-zinc-900 hover:bg-violet-600 text-white px-4 py-2 rounded-lg uppercase tracking-widest text-[9px] font-bold transition-all flex items-center gap-2">
                                                <CheckCircle2 className="w-3 h-3" /> Aprobar y Enviar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Segmento 2 */}
                                <div className="border border-zinc-200 bg-zinc-50/50 rounded-xl overflow-hidden opacity-60">
                                    <div className="px-5 py-3 border-b border-zinc-200 flex justify-between items-center">
                                        <div>
                                            <span className="inline-flex px-2.5 py-1 bg-zinc-200 text-zinc-600 text-[9px] uppercase tracking-widest rounded-full font-bold mb-1">Dueños de Retail & E-commerce</span>
                                            <p className="text-[10px] uppercase tracking-wider text-zinc-400 mt-1">Intereses: POS & Inventario Omnicanal</p>
                                        </div>
                                        <span className="text-xs font-mono bg-white border border-zinc-200 px-3 py-1 rounded-lg text-zinc-500 font-bold">12 Prospectos</span>
                                    </div>
                                    <div className="p-5 flex items-center justify-center h-20">
                                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Esperando análisis de la IA...</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media AI */}
                        <div className="bg-zinc-900 p-8 rounded-xl shadow-xl flex flex-col relative overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-700">
                                    <Sparkles className="w-5 h-5 text-violet-400" />
                                    <h3 className="text-xl font-serif text-white">Asistente de Copy B2B para RRSS</h3>
                                </div>
                                <div className="space-y-5 flex-grow flex flex-col">
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        Genera copys persuasivos para LinkedIn y Meta Ads orientados a dueños de empresas. Describe el caso de éxito o el ángulo de venta.
                                    </p>
                                    <div className="flex-grow flex flex-col gap-4">
                                        <div className="space-y-2 flex-grow flex flex-col">
                                            <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-500">Contexto o Caso de Éxito</label>
                                            <textarea className="w-full flex-grow min-h-[150px] p-4 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none resize-none text-sm placeholder-zinc-600"
                                                placeholder="Ej: Implementamos en una clínica de Providencia un sistema de agendamiento + CRM que redujo el ausentismo un 35% en 30 días..." />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-500">Plataforma</label>
                                                <select className="w-full p-3 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-xs">
                                                    <option>LinkedIn Post</option>
                                                    <option>Meta Ads Copy</option>
                                                    <option>Email Prospección</option>
                                                    <option>Instagram Reel</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] uppercase tracking-widest font-bold text-zinc-500">Tono</label>
                                                <select className="w-full p-3 bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-xs">
                                                    <option>Técnico-Ejecutivo B2B</option>
                                                    <option>Storytelling de Caso</option>
                                                    <option>Urgencia / Problema-Solución</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-4 rounded-xl uppercase tracking-widest text-[10px] font-bold transition-all w-full flex items-center justify-center gap-2 mt-4">
                                        <Sparkles className="w-4 h-4" /> Generar Copy B2B
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
