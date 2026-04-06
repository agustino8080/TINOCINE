import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  principal: {
    name: 'Principal',
    id: 'principal',
    colors: {
      primary: '#69D6FF',
      secondary: '#0ea5e9',
      accent: '#3b82f6',
      dark: '#1e40af',
      bg: '#f5f5f5',
      text: '#1f2937',
      card: '#ffffff',
    },
    navbar: 'bg-[#69D6FF] text-white',
    button: 'bg-blue-500 hover:bg-blue-600',
    accent: 'text-blue-500',
  },
  darkNeon: {
    name: 'Dark Neon',
    id: 'darkNeon',
    colors: {
      primary: '#00ff88',
      secondary: '#ff00ff',
      accent: '#00ffff',
      dark: '#0a0e27',
      bg: '#0a0e27',
      text: '#e0e0e0',
      card: '#1a1f3a',
    },
    navbar: 'bg-[#0a0e27] text-[#00ff88] border-b-2 border-[#00ff88]',
    button: 'bg-[#00ff88] hover:bg-[#00dd77] text-black font-bold',
    accent: 'text-[#00ffff]',
  },
  sunset: {
    name: 'Sunset',
    id: 'sunset',
    colors: {
      primary: '#ff6b6b',
      secondary: '#ffa94d',
      accent: '#ff922b',
      dark: '#862e2e',
      bg: '#fef3f0',
      text: '#5c2e2e',
      card: '#fff8f6',
    },
    navbar: 'bg-gradient-to-r from-[#ff6b6b] to-[#ff922b] text-white',
    button: 'bg-[#ff6b6b] hover:bg-[#ff5252]',
    accent: 'text-[#ff922b]',
  },
  forest: {
    name: 'Forest',
    id: 'forest',
    colors: {
      primary: '#22c55e',
      secondary: '#16a34a',
      accent: '#86efac',
      dark: '#0f2e1e',
      bg: '#0f2e1e',
      text: '#d1fae5',
      card: '#1a4d3a',
    },
    navbar: 'bg-gradient-to-r from-[#0f2e1e] to-[#1a4d3a] text-[#86efac] border-b-2 border-[#22c55e]',
    button: 'bg-[#22c55e] hover:bg-[#16a34a]',
    accent: 'text-[#86efac]',
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cinewatch-theme');
        return saved || 'principal';
      } catch (err) {
        return 'principal';
      }
    }
    return 'principal';
  });

  useEffect(() => {
    try {
      localStorage.setItem('cinewatch-theme', currentTheme);
    } catch (err) {
      console.error('Error guardando tema:', err);
    }
  }, [currentTheme]);

  const theme = THEMES[currentTheme];

  const switchTheme = (themeId) => {
    if (THEMES[themeId]) {
      setCurrentTheme(themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, switchTheme, THEMES }}>
      <div
        style={{
          backgroundColor: theme.colors.bg,
          color: theme.colors.text,
          transition: 'background-color 0.3s, color 0.3s',
        }}
        className="min-h-screen"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de ThemeProvider');
  }
  return context;
}
