import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeSwitcher from './ThemeSwitcher';

function Navbar({ onMainClick, onSortAZ, onSortByYear }) {
  const { theme } = useTheme();

  return (
    <>
      <nav
        className={`${theme.navbar} flex items-center justify-between px-8 py-3 transition-all duration-300`}
        style={{
          backgroundColor: theme.colors.primary,
        }}
      >
        <ul className="hidden md:flex gap-6 font-semibold">
          <li 
            onClick={onMainClick}
            className="cursor-pointer hover:opacity-75 transition-opacity"
          >
            🏠 Principal
          </li>
          <li 
            onClick={onSortAZ}
            className="cursor-pointer hover:opacity-75 transition-opacity"
          >
            📽️ Películas A-Z
          </li>
          <li 
            onClick={onSortByYear}
            className="cursor-pointer hover:opacity-75 transition-opacity"
          >
            📅 AÑO
          </li>
        </ul>

        <div className="flex justify-center items-center">
          <span className="text-2xl font-bold">CineWatch</span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
