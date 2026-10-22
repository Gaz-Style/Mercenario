import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, fullName, interests = [], phone } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Debes ingresar un correo electrónico válido.' },
        { status: 400 }
      );
    }

    // Guardar en Supabase si la base de datos está disponible
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (url && key) {
        const supabase = createClient(url, key);
        // Intentar registrar suscriptor
        await supabase.from('newsletter_subscribers').upsert(
          [
            {
              email: email.trim().toLowerCase(),
              full_name: fullName?.trim() || null,
              phone: phone?.trim() || null,
              interests: Array.isArray(interests) ? interests : [],
              source: 'web_comunidad_weke',
              subscribed_at: new Date().toISOString(),
            },
          ],
          { onConflict: 'email' }
        );
      }
    } catch (dbErr) {
      // Si la tabla aún no fue creada en Supabase, registrar log para persistencia
      console.warn('Registro local de suscriptor (tabla Supabase pendiente):', {
        email,
        fullName,
        interests,
      });
    }

    return NextResponse.json({
      success: true,
      message: '¡Bienvenido a la Comunidad WEKE! Te has suscrito exitosamente a la Bitácora Andina.',
      discountCode: 'COMUNIDAD-WEKE-10',
    });
  } catch (error: any) {
    console.error('Error en newsletter API:', error);
    return NextResponse.json(
      { error: 'Error procesando tu suscripción. Intenta nuevamente.' },
      { status: 500 }
    );
  }
}
