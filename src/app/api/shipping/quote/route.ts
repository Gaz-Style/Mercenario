import { NextResponse } from 'next/server';

/**
 * POST /api/shipping/quote
 * ────────────────────────
 * Cotiza el costo de envío en tiempo real consultando la API de Shipit Chile.
 * Llamar desde el checkout cuando el cliente selecciona su comuna de destino.
 *
 * Body esperado:
 * {
 *   destiny_commune_id: number,
 *   weight: number,        // kg
 *   height: number,        // cm
 *   width: number,         // cm
 *   length: number         // cm
 * }
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { destiny_commune_id, weight, height, width, length } = body;

        if (!destiny_commune_id) {
            return NextResponse.json(
                { error: 'destiny_commune_id es requerido' },
                { status: 400 }
            );
        }

        const { quoteCourierRates } = await import('@/lib/shipit');

        const rates = await quoteCourierRates({
            destiny_commune_id: Number(destiny_commune_id),
            weight: Number(weight) || 1,
            height: Number(height) || 10,
            width: Number(width) || 15,
            length: Number(length) || 20,
        });

        if (!rates.length) {
            // Fallback: tarifa fija si Shipit no responde (sin credenciales aún)
            return NextResponse.json({
                rates: [
                    { courier_id: 1, courier_name: 'Starken', service_name: 'Estándar', total_price: 4990, estimated_days: 3 },
                    { courier_id: 2, courier_name: 'Chilexpress', service_name: 'Económico', total_price: 3990, estimated_days: 5 },
                ],
                fallback: true,
                message: 'Tarifas de referencia (API Shipit no configurada aún)',
            });
        }

        return NextResponse.json({ rates, fallback: false });
    } catch (err: any) {
        console.error('[/api/shipping/quote] Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
