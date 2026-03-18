import { motion, AnimatePresence } from 'framer-motion';
import { useEditMode } from './EditModeProvider';
import { 
  Edit, Eye, Save, RotateCcw, Lock, Unlock
} from 'lucide-react';
import { useState, useEffect } from 'react';

export function EditModeBar() {
  const { isEditMode, toggleEditMode, hasChanges, saveChanges } = useEditMode();
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('portfolioEditAuth') === 'true';
    setIsAuthenticated(auth);
  }, []);

  const handleToggle = () => {
    if (!isAuthenticated && !isEditMode) {
      setShowLogin(true);
      return;
    }
    toggleEditMode();
  };

  const handleLogin = () => {
    if (password === 'rilan2025') {
      localStorage.setItem('portfolioEditAuth', 'true');
      setIsAuthenticated(true);
      setShowLogin(false);
      setPassword('');
      toggleEditMode();
    } else {
      alert('Incorrect password');
    }
  };

  const handleSave = () => {
    saveChanges();
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 bg-green-500 text-white rounded-full shadow-lg z-[200] animate-bounce';
    toast.textContent = 'Changes saved!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all changes?')) {
      window.location.reload();
    }
  };

  // Only show edit bar when authenticated
  if (!isAuthenticated && !isEditMode) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => setShowLogin(true)}
        className="fixed bottom-6 right-6 z-[150] p-4 rounded-full glass shadow-lg hover:bg-purple-500/20 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Enter Edit Mode"
      >
        <Edit className="h-5 w-5 text-purple-400" />
      </motion.button>
    );
  }

  return (
    <>
      {/* Main Edit Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[150]"
      >
        <div className="flex items-center gap-2 glass rounded-full px-4 py-3 shadow-2xl shadow-purple-500/20">
          {/* Edit Mode Toggle */}
          <motion.button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
              isEditMode
                ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isEditMode ? (
              <>
                <Eye className="h-4 w-4" />
                <span>View Mode</span>
              </>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                <span>Edit Site</span>
              </>
            )}
          </motion.button>

          <AnimatePresence>
            {isEditMode && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <div className="w-px h-6 bg-white/20" />
                
                {/* Save Button */}
                <motion.button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                    hasChanges
                      ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                      : 'bg-white/5 text-muted-foreground'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!hasChanges}
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </motion.button>

                {/* Reset Button */}
                <motion.button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </motion.button>

                {/* Edit Indicator */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                  <Unlock className="h-3 w-3" />
                  <span>Editing</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Edit Mode Indicator (Top) */}
      <AnimatePresence>
        {isEditMode && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[150]"
          >
            <div className="flex items-center gap-3 px-6 py-3 glass rounded-full border border-purple-500/30">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-purple-400">
                Edit Mode Active - Click any text to edit
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowLogin(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl p-8 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Enter Edit Mode</h3>
                <p className="text-muted-foreground">Enter password to edit the site</p>
              </div>

              <div className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-purple-500/30 text-white placeholder:text-muted-foreground outline-none focus:border-purple-500"
                />
                <button
                  onClick={handleLogin}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:from-purple-700 hover:to-cyan-700 transition-all"
                >
                  Unlock Editing
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className="w-full py-3 rounded-xl bg-white/5 text-muted-foreground hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>

              <p className="text-center text-xs text-muted-foreground mt-4">
                Default password: rilan2025
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
