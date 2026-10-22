'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X, Star, Loader2, Plus, CheckCircle2 } from 'lucide-react';
import { optimizeImageToWebP, formatFileSize } from '@/lib/ecommerce/image-optimizer';

interface MultiImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function MultiImageUploader({
  images = [],
  onChange,
  maxImages = 8,
}: MultiImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage('');
    setIsProcessing(true);

    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      setErrorMessage('Por favor selecciona archivos de imagen válidos (JPG, PNG, HEIC).');
      setIsProcessing(false);
      return;
    }

    const availableSlots = maxImages - images.length;
    const filesToProcess = validFiles.slice(0, availableSlots);

    const newUrls: string[] = [];

    for (let i = 0; i < filesToProcess.length; i++) {
      const file = filesToProcess[i];
      setUploadStatus(`Optimizando imagen ${i + 1} de ${filesToProcess.length} a WebP...`);

      try {
        // 1. Optimizar en navegador a WebP
        const optimized = await optimizeImageToWebP(file, {
          maxWidth: 1600,
          maxHeight: 2000,
          quality: 0.85,
        });

        // 2. Subir al servidor
        const formData = new FormData();
        formData.append('file', optimized.file);

        const res = await fetch('/api/ecommerce/upload-image', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          newUrls.push(data.url);
        }
      } catch (err: any) {
        console.error('Error procesando imagen:', err);
      }
    }

    if (newUrls.length > 0) {
      onChange([...images, ...newUrls]);
    }

    setIsProcessing(false);
    setUploadStatus('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const handleSetPrimary = (indexToPrimary: number) => {
    if (indexToPrimary === 0) return;
    const selected = images[indexToPrimary];
    const rest = images.filter((_, idx) => idx !== indexToPrimary);
    onChange([selected, ...rest]);
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

  return (
    <div className="space-y-3 font-sans">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
        className="hidden"
      />

      {/* Grid de imágenes existentes + slot para añadir más */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {images.map((url, idx) => (
          <div
            key={idx}
            className={`relative group aspect-[4/5] bg-neutral-100 border overflow-hidden ${
              idx === 0 ? 'border-black ring-1 ring-black' : 'border-neutral-200'
            }`}
          >
            <img
              src={url}
              alt={`Foto ${idx + 1}`}
              className="w-full h-full object-cover object-center"
            />

            {/* Badge Principal */}
            {idx === 0 ? (
              <span className="absolute top-1.5 left-1.5 bg-black text-white font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5">
                Principal
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handleSetPrimary(idx)}
                className="absolute top-1.5 left-1.5 bg-white/90 hover:bg-black hover:text-white text-neutral-700 font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border border-neutral-300"
                title="Hacer foto de portada"
              >
                Hacer Principal
              </button>
            )}

            {/* Botón Quitar */}
            <button
              type="button"
              onClick={() => handleRemoveImage(idx)}
              className="absolute top-1.5 right-1.5 p-1 bg-white/90 hover:bg-red-600 hover:text-white text-neutral-600 transition-colors cursor-pointer border border-neutral-300"
              title="Eliminar foto"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Overlay WebP format tag */}
            <div className="absolute inset-x-0 bottom-0 p-1 bg-black/60 text-white font-mono text-[9px] text-center opacity-0 group-hover:opacity-100 transition-opacity">
              WebP Optimizado
            </div>
          </div>
        ))}

        {/* Slot para añadir más fotos */}
        {images.length < maxImages && (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`aspect-[4/5] border-2 border-dashed flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-black bg-neutral-100'
                : 'border-neutral-300 hover:border-black bg-[#FAFAFA] hover:bg-white'
            }`}
          >
            {isProcessing ? (
              <div className="space-y-2 flex flex-col items-center">
                <Loader2 className="w-6 h-6 animate-spin text-black" />
                <span className="text-[10px] font-mono text-neutral-600 font-bold">
                  Procesando...
                </span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-none bg-neutral-100 border border-neutral-200 flex items-center justify-center mx-auto text-black">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
                <p className="text-[11px] font-mono font-bold uppercase text-black">
                  Añadir Foto
                </p>
                <p className="text-[9px] font-mono text-neutral-400">
                  {images.length}/{maxImages} fotos
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Barra de progreso de optimización */}
      {isProcessing && uploadStatus && (
        <div className="p-3 bg-neutral-100 border border-neutral-200 flex items-center gap-2 text-xs font-mono text-neutral-800">
          <Loader2 className="w-4 h-4 animate-spin text-black" />
          <span>{uploadStatus}</span>
        </div>
      )}

      {/* Tip explicativo */}
      <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pt-1">
        <span>Puedes subir varias fotos a la vez. Cada una se optimiza a WebP automáticamente.</span>
        <span>Máx. {maxImages} fotos</span>
      </div>

      {errorMessage && (
        <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
