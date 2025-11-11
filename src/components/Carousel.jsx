import React, { useEffect, useState } from 'react';

// Ligero carrusel de ilustraciones ubicadas en /public/carousel
// Props:
// - images: rutas públicas de imágenes (por defecto las del directorio /carousel)
// - interval: milisegundos entre cambios
// - className: clases adicionales del contenedor
// - box: si true, coloca fondo suave y borde acorde a la paleta
const defaultImages = [
  '/carousel/co-workers.svg',
  '/carousel/dev-productivity.svg',
  '/carousel/exciting-news.svg',
  '/carousel/file-analysis.svg',
  '/carousel/fitness-influencer-avatar.svg',
  '/carousel/medicine.svg',
  '/carousel/mindfulness.svg',
  '/carousel/morning-workout.svg',
];

const Carousel = ({ images = defaultImages, interval = 7000, className = '', box = true }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  const containerBoxClasses = box ? 'bg-[#2e8b57]/8 border border-[#2e8b57]/20 rounded-xl' : '';
  const imagePaddingClass = box ? 'p-3' : 'p-0';

  return (
    <div
      className={`relative w-full overflow-hidden ${containerBoxClasses} ${className}`}
      aria-label="Carrusel decorativo"
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt="Ilustración"
          className={
            `absolute inset-0 w-full h-full object-contain ${imagePaddingClass} ` +
            `transition-opacity duration-700 ease-out transform ` +
            `${i === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`
          }
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  );
};

export default Carousel;