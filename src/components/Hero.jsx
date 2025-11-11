import React from 'react';
import Carousel from './Carousel.jsx';
import useGsapTextReveal from '../hooks/useGsapTextReveal.js';
import useGsapScrollTrigger from '../hooks/useGsapScrollTrigger.js';
import useGsapTypewriter from '../hooks/useGsapTypewriter.js';

const Hero = () => {
  const titleRef = useGsapTextReveal({ split: 'chars', y: 24, stagger: 0.06, duration: 0.7 });
  const subtitleRef = useGsapTextReveal({ split: 'words', y: 20, stagger: 0.08, duration: 0.7 });
  const typeRef = useGsapTypewriter({ speed: 38, cursor: true, scrollStart: 'top 92%' });
  const bgRef = useGsapScrollTrigger(({ el, gsap }) => {
    const pattern = el.querySelector('.bg-pattern');
    const blob1 = el.querySelector('.bg-blob-1');
    const blob2 = el.querySelector('.bg-blob-2');
    gsap.to(pattern, {
      y: -30,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to(blob1, {
      y: -50,
      x: 20,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true }
    });
    gsap.to(blob2, {
      y: -35,
      x: -20,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true }
    });
  });

  return (
    <section className="relative min-h-screen flex items-center bg-linear-to-b from-[#fcffff] to-[#2e8b57]/10 px-4 overflow-hidden animate-fade-in">
      {/* decorativos */}
      <div ref={bgRef} className="absolute inset-0 -z-10">
        {/* patrón sutil de puntos */}
        <div
          className="bg-pattern absolute inset-0 opacity-15 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(46,139,87,0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            backgroundPosition: 'center',
          }}
        ></div>
        {/* manchas difusas */}
        <div className="bg-blob-1 absolute top-24 left-10 w-40 h-40 bg-[#2e8b57]/20 rounded-full blur-2xl"></div>
        <div className="bg-blob-2 absolute bottom-24 right-10 w-56 h-56 bg-[#2e8b57]/15 rounded-full blur-3xl"></div>
        {/* degradado inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#2e8b57]/10 to-transparent" aria-hidden="true"></div>
      </div>

      {/* Contenido en dos columnas: carrusel izquierda, texto derecha */}
      <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center gap-10">
        {/* Columna izquierda: Carrusel */}
        <div className="w-full md:w-7/12">
          <Carousel
            className="h-64 sm:h-80 md:h-112"
            interval={7000}
            box={false}
            images={[
              '/carouselapp/imageapp.webp',
              '/carouselapp/imageappconf.webp',
              '/carouselapp/imageappgood.webp',
              '/carouselapp/imageappmodal.webp',
              // Agrega más imágenes en /public/carouselapp y añádelas aquí
            ]}
          />
        </div>

        {/* Columna derecha: Texto e información existente */}
        <div className="w-full md:w-5/12 text-center md:text-left">
          <h1 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2e8b57] mb-6">
            Kenwa
          </h1>
          <p ref={subtitleRef} className="text-xl sm:text-2xl md:text-3xl text-[#413030] mb-8 tracking-wide">
            Salud y Armonía en el Trabajo
          </p>
          <p ref={typeRef} className="text-base sm:text-lg md:text-xl text-[#413030] mb-10 max-w-2xl md:max-w-none mx-auto md:mx-0">
            Transformamos los espacios laborales en entornos seguros, saludables y productivos 
            donde las personas pueden desarrollarse plenamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center">
            <a href="#download" className="bg-[#2e8b57] hover:bg-[#267349] text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.03] active:scale-[0.99] animate-pulse-soft">
              Descargar App
            </a>
            <a href="#services" className="border-2 border-[#2e8b57] text-[#2e8b57] hover:bg-[#2e8b57] hover:text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-[1.03] active:scale-[0.99]">
              Conocer Más
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
