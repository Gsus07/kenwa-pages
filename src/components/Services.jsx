import React from 'react';
import { Smartphone, Gauge, BellRing, BarChart3 } from 'lucide-react';
import Carousel from './Carousel.jsx';
import useInView from '../hooks/useInView.js';
import useGsapFadeIn from '../hooks/useGsapFadeIn.js';
import useGsapScrollTrigger from '../hooks/useGsapScrollTrigger.js';

const Services = () => {
  const services = [
    {
      title: "Gestión del estado anímico",
      description: "Registra y acompaña el estado emocional diario de cada colaborador desde la app.",
      Icon: Smartphone
    },
    {
      title: "Estresómetro inteligente",
      description: "Mide el nivel de estrés combinando pausas activas registradas y el estado anímico.",
      Icon: Gauge
    },
    {
      title: "Recordatorios de pausas activas",
      description: "Envía notificaciones tipo alarma para realizar pausas y cuidar salud y rendimiento.",
      Icon: BellRing
    },
    {
      title: "Panel y reportes para líderes (En proximas versiones)",
      description: "Visualiza tendencias, alertas y métricas para tomar decisiones de bienestar oportunas.",
      Icon: BarChart3
    }
  ];

  const { ref, inView } = useInView({ threshold: 0.35 });
  const gsapRef = useGsapFadeIn({ start: 'top 85%', duration: 0.9, y: 20 });
  const gridStaggerRef = useGsapScrollTrigger(({ el, gsap, ScrollTrigger }) => {
    const items = el.querySelectorAll('.service-card');
    // Animación por tarjeta con disparo independiente para mayor confiabilidad
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          delay: i * 0.12,
          scrollTrigger: {
            trigger: item,
            start: 'top 95%',
            toggleActions: 'play none none none',
            // markers: true, // Descomentar para depurar posiciones
          },
        }
      );
    });
    // Refrescar posiciones por si hay imágenes que cambian el layout
    ScrollTrigger.refresh();
  });

  return (
    <section id="services" ref={gsapRef} className="py-20 bg-[#fcffff] px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl md:text-4xl font-bold text-[#413030] text-center mb-4 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-3'}`} style={inView ? { animationDelay: '0ms' } : undefined}>
          Lo que podrás hacer con la app móvil
        </h2>
        <div className="mx-auto h-1 w-24 bg-[#2e8b57] rounded-full mb-6"></div>
        <p className={`text-lg text-[#413030] text-center mb-12 max-w-2xl mx-auto ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-3'}`} style={inView ? { animationDelay: '120ms' } : undefined}>
          Desde la app que descargarás podrás gestionar el estado anímico diario,
          medir el estrés con un estresómetro basado en pausas activas,
          recibir recordatorios tipo alarma y acceder a reportes que impulsan el bienestar
          y el rendimiento laboral.
        </p>
        {/* Carrusel decorativo para esta sección */}
        <div className={`max-w-3xl mx-auto mb-12 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-3'}`} style={inView ? { animationDelay: '240ms' } : undefined}>
          <Carousel
            className="h-40 sm:h-56 md:h-64 shadow"
            interval={7000}
            images={[
              '/carousel/medicine.svg',
              '/carousel/fitness-influencer-avatar.svg',
              '/carousel/morning-workout.svg',
            ]}
          />
        </div>
        
        <div ref={gridStaggerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={"service-card bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition duration-300"}
            >
              <div className="mb-4">
                <service.Icon className="text-[#2e8b57]" size={40} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-[#413030] mb-3">
                {service.title}
              </h3>
              <p className="text-[#413030]">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;