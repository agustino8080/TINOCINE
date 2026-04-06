import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';

function VideoPlayer({ movie, isOpen, onClose }) {
  const { theme } = useTheme();
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const [error, setError] = useState(null);

  // Inicializar Video.js cuando se abre el modal
  useEffect(() => {
    if (isOpen && videoRef.current && !playerRef.current) {
      try {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: false,
          preload: 'auto',
          fluid: true,
          responsive: true,
          playbackRates: [0.5, 1, 1.5, 2],
          controlBar: {
            currentTimeDisplay: true,
            durationDisplay: true,
            timeDivider: true,
            progressControl: true,
            volumePanel: true,
            fullscreenToggle: true,
          },
        });

        // Cargar el video
        playerRef.current.src({
          src: movie.url,
          type: 'video/mp4',
        });

        // Manejo de errores
        playerRef.current.on('error', () => {
          console.error('Error al cargar el video');
          setError('No se pudo cargar el video. Verifica la URL.');
        });

        playerRef.current.on('play', () => {
          setError(null);
        });
      } catch (err) {
        console.error('Error inicializando Video.js:', err);
        setError('Error al inicializar reproductor');
      }
    }

    // Cleanup
    return () => {
      if (!isOpen && playerRef.current) {
        try {
          playerRef.current.dispose();
          playerRef.current = null;
        } catch (err) {
          console.warn('Error cleanup Video.js:', err);
        }
      }
    };
  }, [isOpen, movie?.url]);

  if (!isOpen || !movie) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: theme.colors.dark,
        }}
      >
        {/* Video Container */}
        <div className="relative w-full bg-black" style={{ paddingBottom: '56.25%', height: 0 }}>
          <div className="absolute inset-0">
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black z-40">
                <div className="text-center text-white max-w-md">
                  <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-bold mb-2">Error en reproducción</p>
                  <p className="text-sm opacity-75">{error}</p>
                  <p className="text-xs opacity-50 mt-4 break-all">URL: {movie.url}</p>
                </div>
              </div>
            )}
            <video
              ref={videoRef}
              className="video-js vjs-default-skin"
              height="100%"
              width="100%"
            />
          </div>
        </div>

        {/* Información de la película */}
        <div className="p-6" style={{ backgroundColor: theme.colors.card, color: theme.colors.text }}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
              <div className="flex gap-4 text-sm opacity-75">
                {movie.duration && <span>⏱️ {movie.duration}</span>}
                {movie.rating && <span>📊 {movie.rating}</span>}
                {movie.status && <span>📽️ {movie.status}</span>}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:opacity-75 transition-opacity"
              title="Cerrar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {movie.description && (
            <p className="text-sm opacity-75 line-clamp-2">{movie.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;