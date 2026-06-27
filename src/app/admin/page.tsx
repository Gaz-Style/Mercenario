'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
    DollarSign, Users, Activity, RefreshCw, Box, Database, Webhook,
    LineChart, BrainCircuit, Shield, LifeBuoy, ArrowUpRight
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getDetailedDashboardData } from '@/app/admin/actions';
import CrmMetricsCard from '@/app/admin/components/DashboardCards/CrmMetricsCard';
import AiAgentStatusCard from '@/app/admin/components/DashboardCards/AiAgentStatusCard';

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 26 } }
};

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

type Module = {
    title: string;
    desc: string;
    href: string;
    icon: React.ElementType;
    cta: string;
    hoverBorder: string;
    hoverBg: string;
    iconAccent: string;
};

function ModuleCard({ mod }: { mod: Module }) {
    return (
        <motion.div variants={itemVariants} className="h-full">
            <Link href={mod.href} className="block h-full">
                <Card className={`bg-white border border-zinc-200/80 hover:shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition-all duration-300 rounded-xl h-full flex flex-col justify-between group cursor-pointer relative overflow-hidden ${mod.hoverBorder}`}>
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${mod.hoverBg}`} />
                    <CardHeader className="p-5 pb-2 relative">
                        <div className={`w-9 h-9 rounded-lg bg-zinc-50 border border-zinc-200/60 flex items-center justify-center text-zinc-400 transition-all duration-300 ${mod.iconAccent}`}>
                            <mod.icon className="w-4 h-4" />
                        </div>
                        <CardTitle className="text-sm font-semibold text-zinc-800 mt-4 group-hover:text-zinc-950 transition-colors">
                            {mod.title}
                        </CardTitle>
                        <CardDescription className="text-xs text-zinc-500 mt-1.5 leading-relaxed font-light">
                            {mod.desc}
                        </CardDescription>
                    </CardHeader>
                    <div className="p-5 pt-0 mt-auto flex items-center justify-end text-[10px] text-zinc-400 font-bold uppercase tracking-wider group-hover:text-zinc-700 transition-colors gap-1 relative">
                        <span>{mod.cta}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                </Card>
            </Link>
        </motion.div>
    );
}

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [detailedData, setDetailedData] = useState<any>(null);

    const fetchData = async () => {
        try {
            const detailed = await getDetailedDashboardData();
            setDetailedData(detailed);
        } catch (e) {
            console.error('Error loading dashboard data:', e);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const operationalModules: Module[] = [
        {
            title: 'Empresas & Licencias', href: '/admin/licenses', icon: Users, cta: 'Gestionar',
            desc: 'CRM interno B2B: controla acceso, planes y suspensión de empresas clientes.',
            hoverBorder: 'hover:border-emerald-200', hoverBg: 'bg-emerald-500/5',
            iconAccent: 'group-hover:text-emerald-600 group-hover:bg-emerald-50 group-hover:border-emerald-200',
        },
        {
            title: 'Órdenes de Despliegue', href: '/admin/deployments', icon: Box, cta: 'Ver Kanban',
            desc: 'Tablero técnico de fases: BD → Vercel → WhatsApp → Go Live.',
            hoverBorder: 'hover:border-rose-200', hoverBg: 'bg-rose-500/5',
            iconAccent: 'group-hover:text-rose-600 group-hover:bg-rose-50 group-hover:border-rose-200',
        },
        {
            title: 'Telemetría & Uso', href: '/admin/telemetry', icon: Activity, cta: 'Monitorear',
            desc: 'Consumo en tiempo real de WhatsApp, IA y base de datos por empresa activa.',
            hoverBorder: 'hover:border-sky-200', hoverBg: 'bg-sky-500/5',
            iconAccent: 'group-hover:text-sky-600 group-hover:bg-sky-50 group-hover:border-sky-200',
        },
    ];

    const growthModules: Module[] = [
        {
            title: 'Growth & Marketing', href: '/admin/marketing', icon: LineChart, cta: 'Ver Funnel',
            desc: 'Leads B2B captados, campañas activas (Meta/Google Ads) y métricas de conversión.',
            hoverBorder: 'hover:border-violet-200', hoverBg: 'bg-violet-500/5',
            iconAccent: 'group-hover:text-violet-600 group-hover:bg-violet-50 group-hover:border-violet-200',
        },
        {
            title: 'Orquestador IA', href: '/admin/ai-agents', icon: BrainCircuit, cta: 'Ver Agentes',
            desc: 'Estado de bots de automatización: WhatsApp, clasificadores de leads y pipelines de IA.',
            hoverBorder: 'hover:border-purple-200', hoverBg: 'bg-purple-500/5',
            iconAccent: 'group-hover:text-purple-600 group-hover:bg-purple-50 group-hover:border-purple-200',
        },
    ];

    const governanceModules: Module[] = [
        {
            title: 'Facturación SaaS', href: '/admin/billing', icon: DollarSign, cta: 'Ver Cobros',
            desc: 'Suscripciones mensuales, MRR consolidado y estado de pagos recurrentes.',
            hoverBorder: 'hover:border-amber-200', hoverBg: 'bg-amber-500/5',
            iconAccent: 'group-hover:text-amber-600 group-hover:bg-amber-50 group-hover:border-amber-200',
        },
        {
            title: 'Soporte B2B', href: '/admin/support', icon: LifeBuoy, cta: 'Ver Tickets',
            desc: 'Tickets de atención técnica y seguimiento de problemas de empresas clientes.',
            hoverBorder: 'hover:border-teal-200', hoverBg: 'bg-teal-500/5',
            iconAccent: 'group-hover:text-teal-600 group-hover:bg-teal-50 group-hover:border-teal-200',
        },
        {
            title: 'Seguridad & Accesos', href: '/admin/security', icon: Shield, cta: 'Auditar',
            desc: 'Revisión de roles, RLS de base de datos e intentos de acceso a infraestructura.',
            hoverBorder: 'hover:border-red-200', hoverBg: 'bg-red-500/5',
            iconAccent: 'group-hover:text-red-600 group-hover:bg-red-50 group-hover:border-red-200',
        },
        {
            title: 'Logs del Sistema', href: '/admin/logs', icon: Webhook, cta: 'Ver Logs',
            desc: 'Monitoreo en vivo de webhooks de pago, eventos API y errores de infraestructura.',
            hoverBorder: 'hover:border-zinc-300', hoverBg: 'bg-zinc-500/5',
            iconAccent: 'group-hover:text-zinc-700 group-hover:bg-zinc-100 group-hover:border-zinc-300',
        },
    ];

    return (
        <div className="min-h-screen bg-zinc-50/30 font-sans text-zinc-800">
            <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 space-y-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-zinc-200/80">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5 text-emerald-600">
                            <Database className="w-4 h-4" />
                            <span className="text-[10px] uppercase tracking-widest font-bold">Mando Central SaaS</span>
                        </div>
                        <h1 className="font-serif text-4xl text-zinc-900 tracking-tight font-semibold">Mercenario OS Admin</h1>
                        <p className="text-zinc-500 text-xs mt-1">Centro de Operaciones y Telemetría B2B</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => { setRefreshing(true); fetchData(); }}
                            disabled={refreshing}
                            className="p-2 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 transition-colors flex items-center gap-2 text-xs shadow-sm"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
                            <span>Sincronizar</span>
                        </button>
                        <div className="text-right">
                            <p className="text-[9px] uppercase text-zinc-400 font-bold tracking-widest">Estado</p>
                            <p className="text-xs text-emerald-600 font-bold flex items-center justify-end gap-1.5 mt-0.5">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                                </span>
                                Health Check OK
                            </p>
                        </div>
                    </div>
                </div>

                {/* KPIs */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'MRR (Ingreso Mensual)', value: '$4.500.000', trend: '+12% este mes' },
                        { label: 'Empresas Activas', value: '15', trend: 'Nodos online' },
                        { label: 'ARPU', value: '$300.000', trend: 'Ticket Promedio' },
                        { label: 'Tasa de Churn', value: '0%', trend: 'Sin bajas' },
                    ].map((stat, i) => (
                        <Card key={i} className="bg-white border border-zinc-200/80 p-4 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                            {loading ? (
                                <div className="space-y-2">
                                    <div className="h-3 w-16 bg-zinc-100 rounded animate-pulse" />
                                    <div className="h-6 w-24 bg-zinc-100 rounded animate-pulse" />
                                </div>
                            ) : (
                                <>
                                    <p className="text-[9px] uppercase text-zinc-400 tracking-widest font-bold">{stat.label}</p>
                                    <div className="flex items-baseline gap-2 mt-1.5">
                                        <p className="text-xl font-semibold text-zinc-800">{stat.value}</p>
                                        <span className="text-[9px] text-zinc-400 uppercase">{stat.trend}</span>
                                    </div>
                                </>
                            )}
                        </Card>
                    ))}
                </section>

                {/* Real-Time Cards */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CrmMetricsCard data={detailedData?.crm} isLoading={loading} />
                    <AiAgentStatusCard data={detailedData?.ai} isLoading={loading} />
                </section>

                {/* All Modules */}
                <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-10">

                    {/* Operación de Clientes B2B */}
                    <div className="space-y-4">
                        <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-2">
                            <span className="w-1 h-3 bg-emerald-500 rounded-full" />
                            Operación de Clientes B2B
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {operationalModules.map(mod => <ModuleCard key={mod.href} mod={mod} />)}
                        </div>
                    </div>

                    {/* Crecimiento e Inteligencia */}
                    <div className="space-y-4">
                        <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-2">
                            <span className="w-1 h-3 bg-violet-500 rounded-full" />
                            Crecimiento e Inteligencia
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {growthModules.map(mod => <ModuleCard key={mod.href} mod={mod} />)}
                        </div>
                    </div>

                    {/* Finanzas y Gobernanza */}
                    <div className="space-y-4">
                        <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-2">
                            <span className="w-1 h-3 bg-amber-500 rounded-full" />
                            Finanzas, Soporte y Gobernanza
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {governanceModules.map(mod => <ModuleCard key={mod.href} mod={mod} />)}
                        </div>
                    </div>

                </motion.div>
            </main>
        </div>
    );
}
