import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedNavProps {
  onAdminClick: () => void;
  isEditMode?: boolean;
  logo?: string;
  onLogoChange?: (logo: string) => void;
  brandName?: string;
  onBrandNameChange?: (name: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export function AnimatedNav({ 
  onAdminClick, 
  isEditMode = false,
  logo,
  onLogoChange,
  brandName = 'Rilan',
  onBrandNameChange
}: AnimatedNavProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditingBrand, setIsEditingBrand] = useState(false);
  const [editBrandName, setEditBrandName] = useState(brandName);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.id);
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onLogoChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrandSave = () => {
    onBrandNameChange?.(editBrandName);
    setIsEditingBrand(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-500 ${
              isScrolled 
                ? 'glass shadow-lg shadow-purple-500/10' 
                : 'bg-transparent'
            }`}
          >
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Logo Image or Icon */}
              <div className="relative">
                {isEditMode ? (
                  <div 
                    className="relative cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    {logo ? (
                      <img 
                        src={logo} 
                        alt="Logo" 
                        className="h-8 w-8 object-contain rounded"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center border-2 border-dashed border-purple-500/50 hover:border-purple-500 transition-colors">
                        <Upload className="h-4 w-4 text-purple-400" />
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                      <Upload className="h-2 w-2 text-white" />
                    </div>
                  </div>
                ) : (
                  <>
                    {logo ? (
                      <img 
                        src={logo} 
                        alt="Logo" 
                        className="h-8 w-8 object-contain rounded"
                      />
                    ) : (
                      <Sparkles className="h-6 w-6 text-purple-500" />
                    )}
                    {!isEditMode && (
                      <motion.div
                        className="absolute inset-0 bg-purple-500 rounded-full blur-lg"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/svg+xml,image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </div>
              
              {/* Brand Name */}
              {isEditMode ? (
                isEditingBrand ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editBrandName}
                      onChange={(e) => setEditBrandName(e.target.value)}
                      onBlur={handleBrandSave}
                      onKeyDown={(e) => e.key === 'Enter' && handleBrandSave()}
                      className="text-xl font-bold bg-purple-500/20 border border-purple-500 rounded px-2 py-1 outline-none w-32"
                      autoFocus
                    />
                  </div>
                ) : (
                  <span 
                    className="text-xl font-bold gradient-text-animated cursor-pointer hover:bg-purple-500/20 px-2 py-1 rounded transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingBrand(true);
                      setEditBrandName(brandName);
                    }}
                  >
                    {brandName}
                  </span>
                )
              ) : (
                <span className="text-xl font-bold gradient-text-animated">
                  {brandName}
                </span>
              )}
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-muted-foreground hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onAdminClick}
                className="text-muted-foreground hover:text-white"
              >
                Admin
              </Button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  onClick={() => scrollToSection('contact')}
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0"
                >
                  Let's Talk
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-4 right-4 glass rounded-2xl p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white'
                        : 'text-muted-foreground hover:text-white hover:bg-white/5'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600"
                    onClick={() => scrollToSection('contact')}
                  >
                    Let's Talk
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full mt-2"
                    onClick={() => { onAdminClick(); setIsMobileMenuOpen(false); }}
                  >
                    Admin Panel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
