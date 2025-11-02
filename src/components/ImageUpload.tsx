'use client';

import { useState, useRef } from 'react';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import { uploadImage } from '@/lib/cloudinary';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
  folder?: string;
  maxSizeMB?: number;
  acceptedTypes?: string[];
  className?: string;
}

export default function ImageUpload({
  onImageUploaded,
  currentImage,
  folder = 'cleanconnect',
  maxSizeMB = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = ''
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      toast.error(`File size (${fileSizeMB.toFixed(2)}MB) must be less than ${maxSizeMB}MB`);
      return;
    }

    // Upload to Cloudinary
    setIsUploading(true);
    
    // Create preview immediately for better UX
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Try server-side upload first, fallback to client-side
      let imageUrl: string;
      
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data.url) {
          throw new Error('No URL returned from server');
        }
        
        imageUrl = data.url;
      } catch (serverError: any) {
        console.log('Server upload failed, trying client-side upload...', serverError);
        
        // Check if Cloudinary is configured for client-side upload
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        if (!cloudName) {
          throw new Error('Cloudinary not configured. Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable.');
        }
        
        try {
          imageUrl = await uploadImage(file, folder);
        } catch (clientError: any) {
          throw new Error(`Client-side upload failed: ${clientError?.message || 'Unknown error'}`);
        }
      }

      // Notify parent component
      onImageUploaded(imageUrl);
      toast.success('Image uploaded successfully!');
      
      // Reset preview and input to allow uploading more images
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage = error?.message || 'Failed to upload image. Please try again.';
      toast.error(errorMessage);
      setPreview(currentImage || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = () => {
    setPreview(null);
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {preview && !isUploading ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            aria-label="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : isUploading ? (
        <div className="relative">
          <div className="w-full h-48 border-2 border-dashed border-green-400 rounded-lg flex items-center justify-center bg-green-50">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-2" />
              <p className="text-green-600 font-medium">Uploading image...</p>
              <p className="text-sm text-green-500 mt-1">Please wait</p>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-colors"
        >
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <Camera className="w-8 h-8 text-gray-400" />
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-500">
              JPEG, PNG or WebP (max {maxSizeMB}MB)
            </p>
          </div>
        </div>
      )}

    </div>
  );
}