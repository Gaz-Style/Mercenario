import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        // Ejecutamos una consulta ultra ligera solo para registrar actividad
        // y evitar que la base de datos de Supabase entre en pausa por inactividad.
        const { error } = await supabase.from('leads').select('id').limit(1);
        
        if (error) {
            console.error('Error en pulso a Supabase:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Pulse enviado a Supabase correctamente_' });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}
