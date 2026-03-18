import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditMode } from './EditModeProvider';
import { Upload, Image as ImageIcon, Trash2 } from 'lucide-react';

interface ImageUploadProps {
  src: string;
  onChange: (src: string) => void;
  alt?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  placeholder?: string;
}

export function ImageUpload({
  src,
  onChange,
  alt = 'Image',
  className = '',
  aspectRatio = 'auto',
  placeholder = 'Upload Image',
}: ImageUploadProps) {
  const { isEditMode, setHasChanges } = useEditMode();
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemove = () => {
    onChange('');
    setHasChanges(true);
  };

  if (!isEditMode) {
    if (!src) {
      return (
        <div className={`${aspectRatioClasses[aspectRatio]} ${className} bg-gradient-to-br from-purple-500/10 to-cyan-500/10 flex items-center justify-center rounded-xl`}>
          <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
        </div>
      );
    }
    return (
      <img
        src={src}
        alt={alt}
        className={`${className} ${aspectRatioClasses[aspectRatio]} object-cover rounded-xl`}
      />
    );
  }

  // Edit mode
  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {src ? (
        <>
          <img
            src={src}
            alt={alt}
            className={`${aspectRatioClasses[aspectRatio]} object-cover rounded-xl w-full`}
          />
          <AnimatePresence>
            {isHovering && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center gap-3"
              >
                <button
                  onClick={() => inputRef.current?.click()}
                  className="p-3 rounded-full bg-purple-500 text-white hover:bg-purple-600 transition-colors"
                >
                  <Upload className="h-5 w-5" />
                </button>
                <button
                  onClick={handleRemove}
                  className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`
            ${aspectRatioClasses[aspectRatio]} 
            min-h-[200px]
            border-2 border-dashed rounded-xl 
            flex flex-col items-center justify-center gap-3
            cursor-pointer transition-colors
            ${isDragging 
              ? 'border-purple-500 bg-purple-500/20' 
              : 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50 hover:bg-purple-500/10'
            }
          `}
        >
          <div className="p-4 rounded-full bg-purple-500/20">
            <Upload className="h-8 w-8 text-purple-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-purple-400">{placeholder}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Drag & drop or click to browse
            </p>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}

// Gallery upload for multiple images
interface GalleryUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function GalleryUpload({ images, onChange, maxImages = 10 }: GalleryUploadProps) {
  const { isEditMode, setHasChanges } = useEditMode();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = maxImages - images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    Promise.all(
      filesToProcess.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          })
      )
    ).then((newImages) => {
      onChange([...images, ...newImages]);
      setHasChanges(true);
    });
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
    setHasChanges(true);
  };

  if (!isEditMode) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index + 1}`}
            className="aspect-square object-cover rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((src, index) => (
        <motion.div
          key={index}
          layout
          className="relative group aspect-square"
          draggable
        >
          <img
            src={src}
            alt={`Gallery ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <button
              onClick={() => handleRemove(index)}
              className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      ))}
      {images.length < maxImages && (
        <button
          onClick={() => inputRef.current?.click()}
          className="aspect-square border-2 border-dashed border-purple-500/30 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors"
        >
          <Upload className="h-8 w-8 text-purple-400" />
          <span className="text-xs text-muted-foreground">Add Image</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
