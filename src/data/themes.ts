// Theme Templates for Portfolio
export interface Theme {
  id: string;
  name: string;
  description: string;
  category: 'professional' | 'modern' | 'formal' | 'creative' | 'minimal';
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    card: string;
    border: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  effects: {
    particles: boolean;
    gradients: boolean;
    glassmorphism: boolean;
    animations: boolean;
  };
}

export const themes: Theme[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Dark futuristic theme with neon accents',
    category: 'creative',
    colors: {
      background: '#0b0e18',
      foreground: '#ffffff',
      primary: '#8b5cf6',
      secondary: '#06b6d4',
      accent: '#22d3ee',
      muted: '#1e293b',
      card: 'rgba(15, 23, 42, 0.8)',
      border: 'rgba(139, 92, 246, 0.2)',
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
    },
    effects: {
      particles: true,
      gradients: true,
      glassmorphism: true,
      animations: true,
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean corporate theme for business portfolios',
    category: 'professional',
    colors: {
      background: '#ffffff',
      foreground: '#1e293b',
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#3b82f6',
      muted: '#f1f5f9',
      card: '#ffffff',
      border: '#e2e8f0',
    },
    fonts: {
      heading: 'Georgia, serif',
      body: 'Inter, system-ui, sans-serif',
    },
    effects: {
      particles: false,
      gradients: false,
      glassmorphism: false,
      animations: true,
    },
  },
  {
    id: 'modern',
    name: 'Modern Dark',
    description: 'Sleek dark theme with subtle accents',
    category: 'modern',
    colors: {
      background: '#0f172a',
      foreground: '#f8fafc',
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#a855f7',
      muted: '#1e293b',
      card: 'rgba(30, 41, 59, 0.8)',
      border: 'rgba(99, 102, 241, 0.2)',
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
    },
    effects: {
      particles: false,
      gradients: true,
      glassmorphism: true,
      animations: true,
    },
  },
  {
    id: 'formal',
    name: 'Formal Elegant',
    description: 'Classic elegant theme for formal presentations',
    category: 'formal',
    colors: {
      background: '#fafaf9',
      foreground: '#292524',
      primary: '#78350f',
      secondary: '#92400e',
      accent: '#b45309',
      muted: '#f5f5f4',
      card: '#ffffff',
      border: '#e7e5e4',
    },
    fonts: {
      heading: 'Playfair Display, Georgia, serif',
      body: 'Source Sans Pro, system-ui, sans-serif',
    },
    effects: {
      particles: false,
      gradients: false,
      glassmorphism: false,
      animations: false,
    },
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Ultra minimal design with focus on content',
    category: 'minimal',
    colors: {
      background: '#ffffff',
      foreground: '#171717',
      primary: '#171717',
      secondary: '#525252',
      accent: '#171717',
      muted: '#f5f5f5',
      card: '#ffffff',
      border: '#e5e5e5',
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
    },
    effects: {
      particles: false,
      gradients: false,
      glassmorphism: false,
      animations: false,
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    description: 'Calming blue-green gradient theme',
    category: 'creative',
    colors: {
      background: '#0c4a6e',
      foreground: '#f0f9ff',
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#22d3ee',
      muted: '#164e63',
      card: 'rgba(22, 78, 99, 0.8)',
      border: 'rgba(14, 165, 233, 0.3)',
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
    },
    effects: {
      particles: true,
      gradients: true,
      glassmorphism: true,
      animations: true,
    },
  },
  {
    id: 'sunset',
    name: 'Sunset Warm',
    description: 'Warm orange-pink gradient theme',
    category: 'creative',
    colors: {
      background: '#431407',
      foreground: '#fff7ed',
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#fdba74',
      muted: '#7c2d12',
      card: 'rgba(124, 45, 18, 0.8)',
      border: 'rgba(249, 115, 22, 0.3)',
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
    },
    effects: {
      particles: true,
      gradients: true,
      glassmorphism: true,
      animations: true,
    },
  },
  {
    id: 'forest',
    name: 'Forest Nature',
    description: 'Green nature-inspired theme',
    category: 'creative',
    colors: {
      background: '#052e16',
      foreground: '#f0fdf4',
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#4ade80',
      muted: '#14532d',
      card: 'rgba(20, 83, 45, 0.8)',
      border: 'rgba(34, 197, 94, 0.3)',
    },
    fonts: {
      heading: 'Inter, system-ui, sans-serif',
      body: 'Inter, system-ui, sans-serif',
    },
    effects: {
      particles: true,
      gradients: true,
      glassmorphism: true,
      animations: true,
    },
  },
];

export const defaultTheme = themes[0];

export function getThemeById(id: string): Theme {
  return themes.find(t => t.id === id) || defaultTheme;
}
