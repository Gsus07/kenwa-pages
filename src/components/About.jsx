import React from 'react';
import Carousel from './Carousel.jsx';
import useInView from '../hooks/useInView.js';
import useGsapFadeIn from '../hooks/useGsapFadeIn.js';
import useGsapScrollTrigger from '../hooks/useGsapScrollTrigger.js';
import useGsapCounter from '../hooks/useGsapCounter.js';

const About = () => {
  const { ref, inView } = useInView({ threshold: 0.35 });
  const gsapRef = useGsapFadeIn({ start: 'top 85%', duration: 0.9, y: 20 });
  const pillarsRef = useGsapCounter({ to: 3, duration: 0.9 });
  const solutionsRef = useGsapCounter({ to: 6, duration: 1.1 });
  const benefitsRef = useGsapCounter({ to: 12, duration: 1.3 });
  const groupRef = useGsapScrollTrigger(({ el, gsap }) => {
    const items = el.children;
    gsap.from(items, {
      autoAlpha: 0,
      y: 24,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.16,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  return (
    <section id="about" ref={gsapRef} className="py-20 bg-white px-4">
      <div className="max-w-6xl mx-auto">
        <div ref={groupRef} className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-[#413030] mb-6">
              Sobre <span className="text-[#2e8b57]">Kenwa</span>
            </h2>
            <p className="text-lg text-[#413030] mb-6">
              En <span className="text-[#2e8b57]">Kenwa</span>, creemos que la verdadera productividad surge de entornos laborales donde 
              la salud y la seguridad son prioridades fundamentales.
            </p>
            <p className="text-lg text-[#413030] mb-6">
              Nuestro nombre combina los conceptos de "ken" (salud) y "wa" (armonía), reflejando 
              nuestra misión de crear espacios de trabajo donde las personas puedan desarrollarse 
              plenamente en un ambiente seguro y equilibrado.
            </p>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 bg-[#2e8b57] rounded-full flex items-center justify-center text-white font-bold">
                KW
              </div>
              <div>
                <p className="font-semibold text-[#413030]">Experiencia</p>
                <p className="text-sm text-[#413030]">Ayudando a empresas</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2e8b57]"><span ref={pillarsRef}>0</span></div>
                <p className="text-sm text-[#413030]">Pilares</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2e8b57]"><span ref={solutionsRef}>0</span></div>
                <p className="text-sm text-[#413030]">Soluciones</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#2e8b57]"><span ref={benefitsRef}>0</span></div>
                <p className="text-sm text-[#413030]">Beneficios</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Carousel
              className="h-48 sm:h-64 md:h-80 shadow-sm"
              interval={7000}
              images={[
                '/carousel/co-workers.svg',
                '/carousel/mindfulness.svg',
                '/carousel/exciting-news.svg',
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
