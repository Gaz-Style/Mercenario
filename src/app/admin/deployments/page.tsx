import React from 'react';
import { getDeploymentsAction } from './actions';
import { getLicensesAction } from '../licenses/actions';
import DeploymentsClient from './DeploymentsClient';

export const dynamic = 'force-dynamic';

export default async function DeploymentsPage() {
    const deployments = await getDeploymentsAction();
    const licenses = await getLicensesAction(); // Para el modal de "Nuevo Despliegue"

    return (
        <div className="p-8 max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex flex-col">
            <div className="mb-6 flex-shrink-0">
                <h1 className="text-3xl font-black uppercase tracking-wider text-zinc-900 font-mono">Órdenes de Despliegue</h1>
                <p className="text-zinc-500 font-mono text-sm mt-2">Kanban técnico de instalación de software B2B en clientes.</p>
            </div>
            
            <DeploymentsClient initialDeployments={deployments} availableLicenses={licenses} />
        </div>
    );
}