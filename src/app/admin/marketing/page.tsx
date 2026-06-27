import React from 'react';
import { getLeadsAction } from './actions';
import MarketingClient from './MarketingClient';

export const dynamic = 'force-dynamic';

export default async function MarketingPage() {
    const leads = await getLeadsAction();

    return (
        <div className="min-h-screen bg-zinc-50/30 font-sans">
            <main className="max-w-7xl mx-auto px-6 md:px-8 py-8 space-y-8">
                <div className="pb-6 border-b border-zinc-200/80">
                    <div className="flex items-center gap-2 mb-1.5 text-violet-600">
                        <span className="text-[10px] uppercase tracking-widest font-bold">Mando Central → Growth & Marketing</span>
                    </div>
                    <h1 className="font-serif text-4xl text-zinc-900 tracking-tight font-semibold">Crecimiento & Marketing</h1>
                    <p className="text-zinc-500 text-xs mt-1">
                        5 Pilares Estratégicos · Checklist de Implementación · Leads B2B · AI Content Studio
                    </p>
                </div>
                <MarketingClient initialLeads={leads} />
            </main>
        </div>
    );
}
