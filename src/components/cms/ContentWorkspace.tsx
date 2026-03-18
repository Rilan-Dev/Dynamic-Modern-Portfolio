import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Plus, FileText, Folder, Save, Trash2, Edit3
} from 'lucide-react';
import { MarkdownEditor } from './MarkdownEditor';
import { ImageUpload } from './ImageUpload';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  category?: string;
  tags?: string[];
  date?: string;
  type: 'projects' | 'blog' | 'experience';
}

interface ContentWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onUpdate: (data: any) => void;
}

export function ContentWorkspace({ isOpen, onClose, data, onUpdate }: ContentWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'blog' | 'experience'>('projects');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'blog', label: 'Blog Posts', icon: FileText },
    { id: 'experience', label: 'Experience', icon: Edit3 },
  ];

  const getItems = () => {
    switch (activeTab) {
      case 'projects':
        return data.projects || [];
      case 'blog':
        return data.blogPosts || [];
      case 'experience':
        return data.experience || [];
      default:
        return [];
    }
  };

  const handleSaveItem = (updatedItem: ContentItem) => {
    const key = activeTab === 'blog' ? 'blogPosts' : activeTab;
    const items = data[key] || [];
    const index = items.findIndex((i: any) => i.id === updatedItem.id);
    
    if (index >= 0) {
      items[index] = updatedItem;
    } else {
      items.push({ ...updatedItem, id: Date.now().toString() });
    }
    
    onUpdate({ ...data, [key]: items });
    setIsEditing(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    const key = activeTab === 'blog' ? 'blogPosts' : activeTab;
    const items = data[key] || [];
    onUpdate({ ...data, [key]: items.filter((i: any) => i.id !== id) });
    setSelectedItem(null);
    setIsEditing(false);
  };

  const handleCreateNew = () => {
    const newItem: ContentItem = {
      id: Date.now().toString(),
      title: 'New Item',
      content: '',
      type: activeTab,
      date: new Date().toISOString().split('T')[0],
    };
    setSelectedItem(newItem);
    setIsEditing(true);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold gradient-text">Content Workspace</h2>
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSelectedItem(null);
                    setIsEditing(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-500/20 text-purple-400'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 transition-all"
            >
              <Plus className="h-4 w-4" />
              New
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar - Item List */}
          <div className="w-80 border-r border-purple-500/20 overflow-y-auto">
            <div className="p-4 space-y-2">
              {getItems().map((item: any) => (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    setSelectedItem(item);
                    setIsEditing(false);
                  }}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedItem?.id === item.id
                      ? 'bg-purple-500/20 border border-purple-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                  whileHover={{ x: 5 }}
                >
                  <h4 className="font-medium truncate">{item.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {item.excerpt || item.description || 'No description'}
                  </p>
                  {item.date && (
                    <span className="text-xs text-purple-400 mt-2 block">
                      {item.date}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedItem ? (
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Editor Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">
                    {isEditing ? 'Edit' : 'View'} {activeTab.slice(0, -1)}
                  </h3>
                  <div className="flex gap-2">
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteItem(selectedItem.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <EditorForm
                    item={selectedItem}
                    onSave={handleSaveItem}
                    onCancel={() => setIsEditing(false)}
                  />
                ) : (
                  <ViewMode item={selectedItem} />
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Folder className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>Select an item to view or edit</p>
                  <p className="text-sm mt-2">or create a new one</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function EditorForm({ 
  item, 
  onSave, 
  onCancel
}: { 
  item: ContentItem; 
  onSave: (item: ContentItem) => void; 
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(item);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 text-white outline-none focus:border-purple-500"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-medium mb-2">Image</label>
        <ImageUpload
          src={formData.image || ''}
          onChange={(src) => setFormData({ ...formData, image: src })}
          aspectRatio="video"
          className="w-full"
        />
      </div>

      {/* Category/Tags */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            type="text"
            value={formData.category || ''}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 text-white outline-none focus:border-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            value={formData.date || ''}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 text-white outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block text-sm font-medium mb-2">Excerpt/Description</label>
        <textarea
          value={formData.excerpt || ''}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 text-white outline-none focus:border-purple-500 resize-none"
        />
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
        <MarkdownEditor
          value={formData.content}
          onChange={(content) => setFormData({ ...formData, content })}
          height="400px"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => onSave(formData)}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:from-purple-700 hover:to-cyan-700 transition-all flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-3 rounded-xl bg-white/5 text-muted-foreground hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function ViewMode({ item }: { item: ContentItem }) {
  return (
    <div className="space-y-6">
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full aspect-video object-cover rounded-xl"
        />
      )}
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {item.category && (
          <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
            {item.category}
          </span>
        )}
        {item.date && <span>{item.date}</span>}
      </div>

      <h1 className="text-3xl font-bold">{item.title}</h1>

      {item.excerpt && (
        <p className="text-lg text-muted-foreground">{item.excerpt}</p>
      )}

      <div className="prose prose-invert prose-purple max-w-none">
        <div dangerouslySetInnerHTML={{ 
          __html: item.content 
            ? item.content
                .replace(/#{1,6} (.+)/g, '<h$1 class="text-2xl font-bold mb-4">$1</h$1>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
                .replace(/`(.+?)`/g, '<code class="px-2 py-1 bg-purple-500/20 rounded text-purple-300">$1</code>')
                .replace(/\n/g, '<br/>')
            : '<p class="text-muted-foreground italic">No content</p>'
        }} />
      </div>
    </div>
  );
}
