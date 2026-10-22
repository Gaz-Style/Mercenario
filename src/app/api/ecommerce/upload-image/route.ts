import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const finalFilename = `${timestamp}_${sanitizedName}`;

    // 1. Intentar subir a Supabase Storage (Bucket: ecommerce-products)
    let publicUrl: string | null = null;
    try {
      const supabase = await createClient();
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('ecommerce-products')
        .upload(`products/${finalFilename}`, buffer, {
          contentType: file.type || 'image/webp',
          upsert: true,
        });

      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage
          .from('ecommerce-products')
          .getPublicUrl(`products/${finalFilename}`);
        publicUrl = urlData.publicUrl;
      }
    } catch (supabaseErr) {
      console.warn('Supabase Storage no disponible o bucket no creado, usando almacenamiento local:', supabaseErr);
    }

    // 2. Si no se pudo en Supabase, guardar localmente en /public/uploads/products/
    if (!publicUrl) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, finalFilename);
      await fs.writeFile(filePath, buffer);
      publicUrl = `/uploads/products/${finalFilename}`;
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename: finalFilename,
      size: buffer.length,
      mimeType: file.type || 'image/webp',
    });
  } catch (error: any) {
    console.error('Error al procesar subida de imagen:', error);
    return NextResponse.json(
      { error: error.message || 'Error interno al guardar la imagen' },
      { status: 500 }
    );
  }
}
