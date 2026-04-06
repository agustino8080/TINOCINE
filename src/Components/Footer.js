import React from "react";
import { Facebook, X, Instagram, Youtube } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="text-white transition-all duration-300" style={{ backgroundColor: theme.colors.dark }}>
      {/* Contendio principal */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Columna 1: info */}
          <div>
              <h3 className="text-4xl font-bold mb-4" style={{ color: theme.colors.primary }}>Atencion</h3>
              <h3 className="text-4xl font-bold mb-4" style={{ color: theme.colors.primary }}>Telefonica</h3>
              <p className="text-4xl font-bold mb-6" style={{ color: theme.colors.primary }}>555-555</p>

              {/* Redes sociales */}
              <div className="flex gap-4">
                <button
                  type="button"
                  className="w-12 h-12 rounded-full border-2 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                  style={{
                    borderColor: theme.colors.primary,
                    color: theme.colors.primary,
                  }}
                  aria-label="Facebook"
                >
                  <Facebook size={20}/>
                </button>
                <button
                  type="button"
                  className="w-12 h-12 rounded-full border-2 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                  style={{
                    borderColor: theme.colors.primary,
                    color: theme.colors.primary,
                  }}
                  aria-label="X"
                >
                  <X size={20}/>
                </button>
                <button
                  type="button"
                  className="w-12 h-12 rounded-full border-2 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                  style={{
                    borderColor: theme.colors.primary,
                    color: theme.colors.primary,
                  }}
                  aria-label="Instagram"
                >
                  <Instagram size={20}/>
                </button>
                <button
                  type="button"
                  className="w-12 h-12 rounded-full border-2 flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                  style={{
                    borderColor: theme.colors.primary,
                    color: theme.colors.primary,
                  }}
                  aria-label="Youtube"
                >
                  <Youtube size={20}/>
                </button>
              </div>
          </div>
          {/* Columna 2: Links */}
          <div className="md:pl-8">
            <ul>
              <li><button type="button" onClick={() => {}} className="hover:opacity-75 transition-opacity cursor-pointer text-left" style={{ color: theme.colors.accent }}>Acerca de Nosotros</button></li>
              <li><button type="button" onClick={() => {}} className="hover:opacity-75 transition-opacity cursor-pointer text-left" style={{ color: theme.colors.accent }}>Factura electronica</button></li>
              <li><button type="button" onClick={() => {}} className="hover:opacity-75 transition-opacity cursor-pointer text-left" style={{ color: theme.colors.accent }}>Politicas</button></li>
            </ul>
          </div>

          {/* Columna 3: Información adicional */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold mb-4" style={{ color: theme.colors.primary }}>Más información</h3>
            <p className="text-sm leading-relaxed" style={{ color: theme.colors.text }}>Descubre las últimas películas en cartelera y todas las promociones especiales para disfrutar el cine al máximo.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
