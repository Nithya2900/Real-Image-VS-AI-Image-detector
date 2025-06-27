import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: File | null;
  onRemoveImage: () => void;
  isProcessing: boolean;
}

export function ImageUpload({ onImageUpload, uploadedImage, onRemoveImage, isProcessing }: ImageUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onImageUpload(imageFile);
    }
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  if (uploadedImage) {
    return (
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded"
            className="w-full h-64 object-cover"
          />
          {!isProcessing && (
            <button
              onClick={onRemoveImage}
              className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-white/80 text-sm">
            {uploadedImage.name} ({Math.round(uploadedImage.size / 1024)}KB)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
        isDragOver
          ? 'border-blue-400 bg-blue-400/10 scale-105'
          : 'border-white/30 hover:border-white/50 hover:bg-white/5'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
            <Upload size={32} className="text-white" />
          </div>
          <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full">
            <ImageIcon size={16} className="text-gray-700" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Drop your image here
          </h3>
          <p className="text-white/70 text-sm">
            or click to browse • JPG, PNG, WebP up to 10MB
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-white/50">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
            Secure
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
            Fast
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-1"></div>
            Private
          </div>
        </div>
      </div>
    </div>
  );
}