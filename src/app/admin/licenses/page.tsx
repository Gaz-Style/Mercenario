import React from 'react';
import { getLicensesAction } from './actions';
import LicensesClient from './LicensesClient';

export const dynamic = 'force-dynamic';

export default async function LicensesPage() {
    const licenses = await getLicensesAction();

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase tracking-wider text-zinc-900 font-mono">Empresas & Licencias</h1>
                <p className="text-zinc-500 font-mono text-sm mt-2">Gestiona el acceso y suscripción de tus clientes a Mercenario OS.</p>
            </div>
            
            <LicensesClient initialLicenses={licenses} />
        </div>
    );
}