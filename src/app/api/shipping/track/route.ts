import { NextResponse } from 'next/server';

/**
 * GET /api/shipping/track?tracking=XYZ123
 * ─────────────────────────────────────────
 * Consulta el estado de un envío en tiempo real.
 * Usado tanto por el panel de admin como para actualizar al cliente.
 */
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const tracking = searchParams.get('tracking');

        if (!tracking) {
            return NextResponse.json({ error: 'Parámetro "tracking" requerido' }, { status: 400 });
        }

        const { getShipitTracking } = await import('@/lib/shipit');
        const result = await getShipitTracking(tracking);

        if (!result.success) {
            return NextResponse.json({ error: result.error }, { status: 502 });
        }

        return NextResponse.json(result);
    } catch (err: any) {
        console.error('[/api/shipping/track] Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
