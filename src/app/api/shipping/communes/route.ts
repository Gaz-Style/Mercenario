import { NextResponse } from 'next/server';

/**
 * GET /api/shipping/communes
 * ──────────────────────────
 * Devuelve el listado de comunas habilitadas para despacho en Chile.
 * Intentará consultarlas desde Shipit; si no hay credenciales, devuelve un fallback.
 */
export async function GET() {
    try {
        const { getShipitCommunes } = await import('@/lib/shipit');
        const communes = await getShipitCommunes();

        if (communes.length > 0) {
            return NextResponse.json({ communes, source: 'shipit' });
        }

        // Si Shipit no responde (credenciales no configuradas), fallback vacío
        // El frontend ya tiene su propio fallback con las comunas más comunes
        return NextResponse.json({ communes: [], source: 'fallback' });
    } catch (err: any) {
        console.error('[/api/shipping/communes] Error:', err);
        return NextResponse.json({ communes: [], source: 'error', error: err.message });
    }
}
