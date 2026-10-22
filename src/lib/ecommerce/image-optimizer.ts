'use client';

/**
 * Optimizador de Imágenes en el Cliente
 * Convierte cualquier imagen (JPEG, PNG, etc.) a WebP de alta fidelidad,
 * reescala dimensiones excesivas y reduce el peso hasta un 90% antes de subir.
 */

export interface OptimizedImageResult {
  file: File;
  previewUrl: string;
  originalSize: number;
  optimizedSize: number;
  savingsPercent: number;
  width: number;
  height: number;
}

export async function optimizeImageToWebP(
  file: File,
  options: {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number; // 0.0 to 1.0 (default: 0.85)
  } = {}
): Promise<OptimizedImageResult> {
  const { maxWidth = 1600, maxHeight = 2000, quality = 0.85 } = options;
  const originalSize = file.size;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calcular nueva escala manteniendo proporción
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        // Crear canvas para el re-muestreo
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo inicializar el contexto del canvas'));
          return;
        }

        // Mejorar calidad de interpolación
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a WebP
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Fallo al comprimir a formato WebP'));
              return;
            }

            const cleanName = file.name.replace(/\.[^/.]+$/, '');
            const webpFile = new File([blob], `${cleanName}.webp`, {
              type: 'image/webp',
              lastModified: Date.now(),
            });

            const optimizedSize = webpFile.size;
            const savingsPercent = Math.max(
              0,
              Math.round(((originalSize - optimizedSize) / originalSize) * 100)
            );
            const previewUrl = URL.createObjectURL(blob);

            resolve({
              file: webpFile,
              previewUrl,
              originalSize,
              optimizedSize,
              savingsPercent,
              width,
              height,
            });
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => reject(new Error('Error al cargar la imagen original'));
      img.src = e.target?.result as string;
    };

    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
