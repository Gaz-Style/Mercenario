import { NextResponse } from 'next/server';

/**
 * Memoria compartida del servidor para configuración de la tienda.
 * En persistencia real se sincroniza con Supabase.
 */
let storeSettingsCache = {
  pickupEnabled: false,
  pickupAddress: 'Av. Providencia 1234, Oficina 601',
  pickupCommune: 'Providencia, Región Metropolitana',
  pickupSchedule: 'Lunes a Viernes de 10:00 a 19:00 hrs',
  pickupNote: 'Presentar cédula de identidad y número de pedido al retirar.',
};

export async function GET() {
  return NextResponse.json(storeSettingsCache);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    storeSettingsCache = {
      ...storeSettingsCache,
      ...body,
    };
    return NextResponse.json({ success: true, settings: storeSettingsCache });
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
