'use client';

import React, { useState, useTransition } from 'react';
import { Plus, CheckCircle2, Loader2, ArrowRight, Server, Database, Code, Shield, MessageSquare, CreditCard, Rocket } from 'lucide-react';
import { createDeploymentAction, updateDeploymentStatusAction } from './actions';

const DEPLOYMENT_STAGES = [
    { id: 'pending', label: 'Pendiente', icon: Server, color: 'text-zinc-500' },
    { id: 'db_provisioned', label: 'BD Creada', icon: Database, color: 'text-sky-500' },
    { id: 'repo_deployed', label: 'Repo Vercel', icon: Code, color: 'text-purple-500' },
    { id: 'env_configured', label: 'Variables Env', icon: Shield, color: 'text-amber-500' },
    { id: 'whatsapp_linked', label: 'WhatsApp', icon: MessageSquare, color: 'text-emerald-500' },
    { id: 'payments_linked', label: 'Pasarelas', icon: CreditCard, color: 'text-blue-500' },
    { id: 'delivered', label: 'Entregado (Go Live)', icon: Rocket, color: 'text-rose-500' }
];

export default function DeploymentsClient({ initialDeployments, availableLicenses }: { initialDeployments: any[], availableLicenses: any[] }) {
    const [deployments, setDeployments] = useState(initialDeployments);
    const [isPending, startTransition] = useTransition();
    const [showNewModal, setShowNewModal] = useState(false);

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const license_id = formData.get('license_id') as string;
        const assigned_tech = formData.get('assigned_tech') as string;
        
        startTransition(async () => {
            const result = await createDeploymentAction(license_id, assigned_tech);
            if (result.success) {
                setShowNewModal(false);
                window.location.reload();
            } else {
                alert('Error: ' + result.error);
            }
        });
    };

    const handleMoveForward = async (id: string, currentStatus: string) => {
        const currentIndex = DEPLOYMENT_STAGES.findIndex(s => s.id === currentStatus);
        if (currentIndex < DEPLOYMENT_STAGES.length - 1) {
            const nextStatus = DEPLOYMENT_STAGES[currentIndex + 1].id;
            startTransition(async () => {
                const result = await updateDeploymentStatusAction(id, nextStatus);
                if (result.success) {
                    setDeployments(deployments.map(d => d.id === id ? { ...d, status: nextStatus } : d));
                }
            });
        }
    };

    return (
        <div className="flex-grow flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-6">
                <div className="text-sm font-mono text-zinc-500">
                    Proyectos activos: {deployments.filter(d => d.status !== 'delivered').length}
                </div>
                <button 
                    onClick={() => setShowNewModal(true)}
                    className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nueva Orden de Despliegue
                </button>
            </div>

            {/* KANBAN BOARD */}
            <div className="flex-grow overflow-x-auto flex gap-4 pb-4">
                {DEPLOYMENT_STAGES.map(stage => {
                    const stageDeployments = deployments.filter(d => d.status === stage.id);
                    const StageIcon = stage.icon;
                    
                    return (
                        <div key={stage.id} className="w-[300px] flex-shrink-0 flex flex-col bg-zinc-100/50 rounded-xl border border-zinc-200/50">
                            <div className="p-4 border-b border-zinc-200/50 flex items-center justify-between bg-white/50 rounded-t-xl">
                                <div className="flex items-center gap-2 font-mono font-bold text-sm text-zinc-700">
                                    <StageIcon className={`w-4 h-4 ${stage.color}`} />
                                    {stage.label}
                                </div>
                                <span className="text-xs bg-zinc-200 text-zinc-600 px-2 py-0.5 rounded-full font-bold">
                                    {stageDeployments.length}
                                </span>
                            </div>
                            
                            <div className="p-3 flex-grow overflow-y-auto space-y-3">
                                {stageDeployments.map(dep => (
                                    <div key={dep.id} className="bg-white p-4 rounded-lg border border-zinc-200 shadow-sm hover:shadow-md transition-shadow group">
                                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">
                                            {dep.license?.niche_type || 'B2B'}
                                        </div>
                                        <h4 className="font-bold text-zinc-900 mb-2">{dep.license?.client_name || 'Desconocido'}</h4>
                                        <div className="text-xs text-zinc-500 font-mono mb-4">
                                            Técnico: {dep.assigned_tech || 'Sin asignar'}
                                        </div>
                                        
                                        {stage.id !== 'delivered' && (
                                            <button 
                                                onClick={() => handleMoveForward(dep.id, dep.status)}
                                                disabled={isPending}
                                                className="w-full flex items-center justify-center gap-2 text-xs font-bold bg-zinc-900 text-white py-2 rounded-md hover:bg-zinc-800 disabled:opacity-50"
                                            >
                                                {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Avanzar Fase'}
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {stageDeployments.length === 0 && (
                                    <div className="text-center p-4 text-xs font-mono text-zinc-400 border-2 border-dashed border-zinc-200 rounded-lg">
                                        Vacío
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MODAL NUEVA ORDEN */}
            {showNewModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <h2 className="text-xl font-bold font-mono mb-4">Nueva Orden de Despliegue</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Empresa Cliente</label>
                                <select name="license_id" required className="w-full p-2 border border-zinc-200 rounded-lg text-sm bg-zinc-50">
                                    <option value="">Selecciona una empresa...</option>
                                    {availableLicenses.filter(l => l.status === 'active').map(l => (
                                        <option key={l.id} value={l.id}>{l.client_name} ({l.niche_type})</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">Técnico Asignado</label>
                                <input name="assigned_tech" required type="text" placeholder="Ej: DevOps Team" className="w-full p-2 border border-zinc-200 rounded-lg text-sm bg-zinc-50" />
                            </div>
                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setShowNewModal(false)} className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-700">Cancelar</button>
                                <button type="submit" disabled={isPending} className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg flex items-center gap-2">
                                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                    Crear Orden
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
