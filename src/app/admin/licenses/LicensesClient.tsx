'use client';

import React, { useState, useTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Search, Plus, CheckCircle2, XCircle, Loader2, AlertTriangle } from 'lucide-react';
import { createLicenseAction, updateLicenseStatusAction } from './actions';

export default function LicensesClient({ initialLicenses }: { initialLicenses: any[] }) {
    const [licenses, setLicenses] = useState(initialLicenses);
    const [isPending, startTransition] = useTransition();
    const [showNewForm, setShowNewForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        startTransition(async () => {
            const result = await createLicenseAction(formData);
            if (result.success) {
                setShowNewForm(false);
                // Reload page to get new data
                window.location.reload();
            } else {
                alert('Error al crear licencia: ' + result.error);
            }
        });
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        startTransition(async () => {
            const result = await updateLicenseStatusAction(id, newStatus);
            if (result.success) {
                setLicenses(licenses.map(l => l.id === id ? { ...l, status: newStatus } : l));
            }
        });
    };

    const filteredLicenses = licenses.filter(l => 
        l.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.client_email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Setup Banner */}
            {licenses.length === 0 && (
                <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-amber-800">Base de datos no configurada</p>
                        <p className="text-xs text-amber-700 mt-1">
                            Las tablas de Mercenario OS no existen aún en Supabase. Para activar este módulo, ve al{' '}
                            <a href="https://supabase.com/dashboard/project/saxhhdsvkaaeeulmeuje/sql/new" target="_blank" rel="noopener noreferrer" className="underline font-bold">SQL Editor de Supabase</a>{' '}
                            y ejecuta el archivo <code className="bg-amber-100 px-1 rounded">supabase_mercenario_saas.sql</code> que está en la raíz del proyecto.
                        </p>
                    </div>
                </div>
            )}
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-zinc-200/80 shadow-sm">
                <div className="relative w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input 
                        type="text" 
                        placeholder="Buscar empresa..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    />
                </div>
                <button 
                    onClick={() => setShowNewForm(!showNewForm)}
                    className="flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nueva Licencia
                </button>
            </div>

            {showNewForm && (
                <Card className="border-emerald-500/20 bg-emerald-50/30">
                    <CardHeader>
                        <CardTitle className="text-lg font-mono">Registrar Nueva Empresa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Nombre de la Empresa</label>
                                <input required name="client_name" type="text" className="w-full p-2 border border-zinc-200 rounded-lg text-sm" placeholder="Ej: Clínica Alemana" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email de Contacto</label>
                                <input required name="client_email" type="email" className="w-full p-2 border border-zinc-200 rounded-lg text-sm" placeholder="admin@empresa.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Teléfono</label>
                                <input name="client_phone" type="text" className="w-full p-2 border border-zinc-200 rounded-lg text-sm" placeholder="+569..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Industria</label>
                                <select name="niche_type" className="w-full p-2 border border-zinc-200 rounded-lg text-sm">
                                    <option value="SALUD">Salud & Clínicas</option>
                                    <option value="RETAIL">Retail & E-commerce</option>
                                    <option value="LOGISTICA">Logística</option>
                                    <option value="GASTRO">Gastronomía</option>
                                    <option value="OTROS">Otros</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Plan Contratado</label>
                                <select name="plan_name" className="w-full p-2 border border-zinc-200 rounded-lg text-sm">
                                    <option value="starter">Starter</option>
                                    <option value="pro">Pro</option>
                                    <option value="enterprise">Enterprise</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">MRR (Precio Mensual CLP)</label>
                                <input required name="plan_price_clp" type="number" defaultValue="250000" className="w-full p-2 border border-zinc-200 rounded-lg text-sm" />
                            </div>
                            <div className="col-span-full flex justify-end gap-3 mt-4">
                                <button type="button" onClick={() => setShowNewForm(false)} className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-700">Cancelar</button>
                                <button type="submit" disabled={isPending} className="px-4 py-2 text-sm bg-zinc-900 text-white rounded-lg flex items-center gap-2">
                                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                    Guardar Licencia
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 gap-4">
                {filteredLicenses.length === 0 ? (
                    <div className="text-center py-12 text-zinc-400 font-mono">
                        No hay empresas registradas.
                    </div>
                ) : (
                    filteredLicenses.map(license => (
                        <div key={license.id} className="bg-white p-5 rounded-xl border border-zinc-200/80 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${license.status === 'active' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                    <Building2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg text-zinc-900">{license.client_name}</h3>
                                        <span className="text-[10px] font-mono uppercase bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">{license.niche_type}</span>
                                    </div>
                                    <div className="text-sm text-zinc-500 mt-1">
                                        {license.client_email} {license.client_phone && `• ${license.client_phone}`}
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6 w-full md:w-auto bg-zinc-50 md:bg-transparent p-3 md:p-0 rounded-lg">
                                <div className="text-right">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Plan {license.plan_name}</div>
                                    <div className="font-mono text-zinc-900 font-bold">${license.plan_price_clp.toLocaleString('es-CL')}</div>
                                </div>
                                
                                <div className="h-8 w-px bg-zinc-200 mx-2 hidden md:block" />

                                <div className="flex flex-col gap-1 items-end">
                                    {license.status === 'active' ? (
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Activa
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-md">
                                            <XCircle className="w-3.5 h-3.5" /> {license.status}
                                        </div>
                                    )}
                                    <select 
                                        className="text-[10px] bg-transparent text-zinc-500 border-none cursor-pointer outline-none"
                                        value={license.status}
                                        onChange={(e) => handleStatusChange(license.id, e.target.value)}
                                        disabled={isPending}
                                    >
                                        <option value="active">Marcar Activa</option>
                                        <option value="suspended">Suspender</option>
                                        <option value="cancelled">Cancelar</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
