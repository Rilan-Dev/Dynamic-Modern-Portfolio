import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X, Check, Monitor, Sun, Moon, Briefcase, Leaf, Waves, Sunset } from 'lucide-react';
import { themes, getThemeById } from '@/data/themes';

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(currentTheme);

  useEffect(() => {
    setSelectedTheme(currentTheme);
  }, [currentTheme]);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    onThemeChange(themeId);
    setIsOpen(false);
  };

  const getThemeIcon = (category: string) => {
    switch (category) {
      case 'professional': return Briefcase;
      case 'modern': return Monitor;
      case 'formal': return Sun;
      case 'minimal': return Moon;
      case 'creative':
        return selectedTheme.includes('ocean') ? Waves :
               selectedTheme.includes('forest') ? Leaf :
               selectedTheme.includes('sunset') ? Sunset : Palette;
      default: return Palette;
    }
  };

  const theme = getThemeById(currentTheme);
  const ThemeIcon = getThemeIcon(theme.category);

  return (
    <>
      {/* Theme Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[150] p-4 rounded-full glass shadow-lg hover:bg-purple-500/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Change Theme"
      >
        <Palette className="h-5 w-5 text-purple-400" />
      </motion.button>

      {/* Theme Selector Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="glass-card rounded-2xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold gradient-text">Choose Theme</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select a template that matches your style
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Theme Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {themes.map((theme) => {
                  const Icon = getThemeIcon(theme.category);
                  const isSelected = selectedTheme === theme.id;

                  return (
                    <motion.button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? 'border-purple-500 bg-purple-500/20'
                          : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Preview */}
                      <div
                        className="h-24 rounded-lg mb-3 overflow-hidden"
                        style={{ background: theme.colors.background }}
                      >
                        <div className="h-full flex items-center justify-center gap-2">
                          <div
                            className="w-8 h-8 rounded-full"
                            style={{ background: theme.colors.primary }}
                          />
                          <div
                            className="w-8 h-8 rounded-full"
                            style={{ background: theme.colors.secondary }}
                          />
                          <div
                            className="w-8 h-8 rounded-full"
                            style={{ background: theme.colors.accent }}
                          />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex items-start gap-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{ background: `${theme.colors.primary}20` }}
                        >
                          <Icon
                            className="h-4 w-4"
                            style={{ color: theme.colors.primary }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{theme.name}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {theme.description}
                          </p>
                          <span
                            className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full capitalize"
                            style={{
                              background: `${theme.colors.primary}20`,
                              color: theme.colors.primary,
                            }}
                          >
                            {theme.category}
                          </span>
                        </div>
                      </div>

                      {/* Selected Indicator */}
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center"
                        >
                          <Check className="h-4 w-4 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Current Theme Info */}
              <div className="mt-6 p-4 rounded-xl bg-white/5">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${theme.colors.primary}20` }}
                  >
                    <ThemeIcon
                      className="h-6 w-6"
                      style={{ color: theme.colors.primary }}
                    />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Theme</p>
                    <p className="font-semibold">{theme.name}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
