import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useEditMode } from './EditModeProvider';
import { Pencil, Check, X } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

export function EditableText({
  value,
  onChange,
  className = '',
  multiline = false,
  placeholder = 'Click to edit...',
  as: Component = 'span',
}: EditableTextProps) {
  const { isEditMode, setHasChanges } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue !== value) {
      onChange(editValue);
      setHasChanges(true);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditMode) {
    return <Component className={className}>{value}</Component>;
  }

  if (isEditing) {
    return (
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative inline-flex items-center gap-2"
      >
        {multiline ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={`${className} bg-purple-500/20 border-2 border-purple-500 rounded-lg px-3 py-2 outline-none resize-none min-h-[100px]`}
            placeholder={placeholder}
            rows={4}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            className={`${className} bg-purple-500/20 border-2 border-purple-500 rounded-lg px-3 py-1 outline-none`}
            placeholder={placeholder}
          />
        )}
        <div className="flex gap-1">
          <button
            onClick={handleSave}
            className="p-1 rounded bg-green-500/20 text-green-400 hover:bg-green-500/30"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="group relative inline-flex items-center gap-2 cursor-pointer"
      onClick={() => setIsEditing(true)}
      whileHover={{ scale: 1.01 }}
    >
      <Component className={className}>{value}</Component>
      <motion.span
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-1 rounded bg-purple-500/20 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="h-3 w-3" />
      </motion.span>
    </motion.div>
  );
}
