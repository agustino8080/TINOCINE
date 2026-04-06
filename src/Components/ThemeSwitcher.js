import React, { useState } from 'react';
import { useTheme, THEMES } from '../contexts/ThemeContext';

function ThemeSwitcher() {
  const { currentTheme, switchTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themesList = Object.values(THEMES);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-all hover:scale-110"
        title="Cambiar tema"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {currentTheme === 'darkNeon' ? (
            // Icono de luna para tema oscuro
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          ) : (
            // Icono de paleta para otros temas
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 rounded-lg shadow-xl z-50 min-w-max transition-all"
          style={{
            backgroundColor: '#1a1a1a',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div className="p-3 border-b" style={{ borderBottomColor: 'rgba(255, 255, 255, 0.1)' }}>
            <p className="text-sm font-semibold text-white">
              Selecciona un tema
            </p>
          </div>
          <div className="p-2 space-y-2">
            {themesList.map((themeObj) => (
              <button
                key={themeObj.id}
                onClick={() => {
                  switchTheme(themeObj.id);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-all text-left flex items-center gap-2 ${
                  currentTheme === themeObj.id
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
                style={{
                  backgroundColor: currentTheme === themeObj.id ? themeObj.colors.primary : 'rgba(255, 255, 255, 0.05)',
                  color: currentTheme === themeObj.id ? (themeObj.id === 'darkNeon' || themeObj.id === 'forest' ? '#000' : '#000') : 'inherit',
                }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2"
                  style={{
                    backgroundColor: themeObj.colors.primary,
                    borderColor: themeObj.colors.secondary,
                  }}
                />
                {themeObj.name}
                {currentTheme === themeObj.id && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeSwitcher;
