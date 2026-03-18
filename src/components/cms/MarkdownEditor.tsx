import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useEditMode } from './EditModeProvider';
import { 
  Pencil, Eye, X, Bold, Italic, 
  Heading, List, Link as LinkIcon, Code, Quote,
  Image as ImageIcon, Save
} from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write your content in Markdown...',
  height = '400px',
}: MarkdownEditorProps) {
  const { isEditMode, setHasChanges } = useEditMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

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

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editValue.substring(start, end);
    const newText = editValue.substring(0, start) + before + selectedText + after + editValue.substring(end);
    
    setEditValue(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown('**', '**'), label: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), label: 'Italic' },
    { icon: Heading, action: () => insertMarkdown('## '), label: 'Heading' },
    { icon: List, action: () => insertMarkdown('- '), label: 'List' },
    { icon: LinkIcon, action: () => insertMarkdown('[', '](url)'), label: 'Link' },
    { icon: ImageIcon, action: () => insertMarkdown('![alt](', ')'), label: 'Image' },
    { icon: Code, action: () => insertMarkdown('```\n', '\n```'), label: 'Code' },
    { icon: Quote, action: () => insertMarkdown('> '), label: 'Quote' },
  ];

  // View mode - render markdown
  if (!isEditMode || !isEditing) {
    return (
      <div className="relative group">
        <div className="prose prose-invert prose-purple max-w-none">
          {value ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children }) => <h1 className="text-3xl font-bold mb-4 gradient-text">{children}</h1>,
                h2: ({ children }) => <h2 className="text-2xl font-bold mb-3 text-purple-400">{children}</h2>,
                h3: ({ children }) => <h3 className="text-xl font-bold mb-2 text-cyan-400">{children}</h3>,
                p: ({ children }) => <p className="mb-4 text-muted-foreground leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="mb-4 space-y-2 list-disc list-inside">{children}</ul>,
                ol: ({ children }) => <ol className="mb-4 space-y-2 list-decimal list-inside">{children}</ol>,
                li: ({ children }) => <li className="text-muted-foreground">{children}</li>,
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className="px-2 py-1 bg-purple-500/20 rounded text-purple-300 text-sm">{children}</code>
                  ) : (
                    <pre className="p-4 bg-black/50 rounded-lg overflow-x-auto mb-4 border border-purple-500/20">
                      <code className="text-sm text-cyan-300">{children}</code>
                    </pre>
                  );
                },
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-purple-500 pl-4 italic text-muted-foreground mb-4">
                    {children}
                  </blockquote>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="text-purple-400 hover:text-cyan-400 underline transition-colors">
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => (
                  <img src={src} alt={alt} className="rounded-lg max-w-full h-auto my-4" />
                ),
              }}
            >
              {value}
            </ReactMarkdown>
          ) : (
            <p className="text-muted-foreground/50 italic">{placeholder}</p>
          )}
        </div>
        
        {isEditMode && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsEditing(true)}
            className="absolute top-0 right-0 p-2 rounded-lg bg-purple-500/20 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-500/30"
          >
            <Pencil className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    );
  }

  // Edit mode
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-2 border-purple-500/30 rounded-xl overflow-hidden bg-black/30"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-purple-500/20 bg-purple-500/5">
        <div className="flex items-center gap-1">
          {toolbarButtons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.action}
              className="p-2 rounded hover:bg-purple-500/20 text-muted-foreground hover:text-white transition-colors"
              title={btn.label}
            >
              <btn.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('write')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              activeTab === 'write' 
                ? 'bg-purple-500 text-white' 
                : 'text-muted-foreground hover:text-white'
            }`}
          >
            Write
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              activeTab === 'preview' 
                ? 'bg-purple-500 text-white' 
                : 'text-muted-foreground hover:text-white'
            }`}
          >
            <Eye className="h-4 w-4 inline mr-1" />
            Preview
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div style={{ height }}>
        {activeTab === 'write' ? (
          <textarea
            id="markdown-textarea"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full p-4 bg-transparent text-white resize-none outline-none font-mono text-sm leading-relaxed"
            spellCheck={false}
          />
        ) : (
          <div className="w-full h-full p-4 overflow-auto">
            <div className="prose prose-invert prose-purple max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {editValue || '*Nothing to preview*'}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-3 border-t border-purple-500/20 bg-purple-500/5">
        <span className="text-xs text-muted-foreground">
          Supports Markdown formatting
        </span>
        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save
          </button>
        </div>
      </div>
    </motion.div>
  );
}
