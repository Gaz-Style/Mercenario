'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, AlertCircle, X, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { optimizeImageToWebP, formatFileSize, OptimizedImageResult } from '@/lib/ecommerce/image-optimizer';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
}

export default function ImageUploader({ onImageUploaded, currentImageUrl }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [optimizationStats, setOptimizationStats] = useState<OptimizedImageResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl || '');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const rawFile = files[0];

    if (!rawFile.type.startsWith('image/')) {
      setErrorMessage('Por favor selecciona un archivo de imagen válido (JPEG, PNG, etc.).');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);

    try {
      // 1. Optimización y Compresión en Cliente a WebP
      const optimized = await optimizeImageToWebP(rawFile, {
        maxWidth: 1600,
        maxHeight: 2000,
        quality: 0.85,
      });

      setOptimizationStats(optimized);
      setPreviewUrl(optimized.previewUrl);

      // 2. Subida del archivo WebP optimizado al servidor / Supabase Storage
      const formData = new FormData();
      formData.append('file', optimized.file);

      const res = await fetch('/api/ecommerce/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setPreviewUrl(data.url);
        onImageUploaded(data.url);
      } else {
        throw new Error(data.error || 'Error al guardar la imagen en el servidor');
      }
    } catch (err: any) {
      console.error('Error optimizando o subiendo imagen:', err);
      setErrorMessage(err.message || 'Error durante la optimización');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl('');
    setOptimizationStats(null);
    onImageUploaded('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-3 font-sans">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {/* Drag & Drop Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed transition-all cursor-pointer p-6 flex flex-col items-center justify-center text-center ${
          isDragging
            ? 'border-black bg-neutral-100'
            : previewUrl
            ? 'border-neutral-300 bg-[#FAFAFA]'
            : 'border-neutral-300 hover:border-black bg-[#FAFAFA] hover:bg-white'
        }`}
      >
        {isProcessing ? (
          <div className="py-6 space-y-3 flex flex-col items-center">
            <Loader2 className="w-8 h-8 animate-spin text-black" />
            <div className="space-y-1">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                Optimizando a formato WebP...
              </p>
              <p className="text-[11px] font-mono text-neutral-500">
                Reescalando dimensiones y reduciendo peso para web retail
              </p>
            </div>
          </div>
        ) : previewUrl ? (
          <div className="relative group w-full flex flex-col sm:flex-row items-center gap-4">
            <div className="w-24 h-28 bg-neutral-200 overflow-hidden flex-shrink-0 border border-neutral-300">
              <img
                src={previewUrl}
                alt="Vista previa optimizada"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className="text-left flex-1 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-black uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Imagen WebP Lista para Publicar</span>
              </div>

              {optimizationStats && (
                <div className="text-[11px] font-mono text-neutral-600 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400">Original:</span>
                    <span>{formatFileSize(optimizationStats.originalSize)}</span>
                    <ArrowRight className="w-3 h-3 text-neutral-400" />
                    <span className="font-bold text-black">
                      WebP: {formatFileSize(optimizationStats.optimizedSize)}
                    </span>
                  </div>
                  <div className="text-emerald-700 font-bold">
                    Ahorro de ancho de banda: -{optimizationStats.savingsPercent}% ({optimizationStats.width}x{optimizationStats.height}px)
                  </div>
                </div>
              )}

              <p className="text-[10px] font-mono text-neutral-400 truncate max-w-xs">
                {previewUrl}
              </p>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="absolute top-0 right-0 p-1.5 bg-neutral-200 hover:bg-black hover:text-white transition-colors cursor-pointer text-neutral-600"
              title="Quitar imagen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="py-4 space-y-2">
            <div className="w-10 h-10 mx-auto rounded-none bg-neutral-100 flex items-center justify-center text-black border border-neutral-200">
              <UploadCloud className="w-5 h-5 stroke-[1.5]" />
            </div>

            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                Arrastra tu foto aquí o haz clic para subir
              </p>
              <p className="text-[11px] text-neutral-500 font-light mt-0.5">
                Conversión automática a <strong>WebP ultra-ligero</strong> de alta fidelidad
              </p>
            </div>

            <div className="inline-flex items-center gap-1 text-[10px] font-mono text-neutral-400 uppercase tracking-widest pt-1">
              <Sparkles className="w-3 h-3 text-neutral-700" />
              <span>JPG, PNG o HEIC • Reducción hasta 90% sin pérdida perceptible</span>
            </div>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-mono">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
