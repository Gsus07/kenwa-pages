import React from 'react';
import { History, Database, LayoutDashboard, AlertTriangle } from 'lucide-react';
import useInView from '../hooks/useInView.js';
import useGsapFadeIn from '../hooks/useGsapFadeIn.js';
import useGsapScrollTrigger from '../hooks/useGsapScrollTrigger.js';

const FutureFeatures = () => {
  const futureFeatures = [
    {
      title: "Historial de niveles de estrés",
      description: "Registra y visualiza la evolución del estrés de cada usuario basado en sus tiempos de trabajo y descanso a lo largo del tiempo.",
      Icon: History,
      image: "/imgfuture/historic.webp",
      alt: "Historial de estrés"
    },
    {
      title: "Base de datos en la nube",
      description: "Integración con servicios cloud para mejorar la persistencia, seguridad y accesibilidad de la información desde cualquier dispositivo.",
      Icon: Database,
      image: "/imgfuture/cloud.webp",
      alt: "Base de datos en la nube"
    },
    {
      title: "Tableros de control para líderes",
      description: "Dashboard interactivo que permite a los líderes de equipo visualizar el nivel de estrés en su área con métricas detalladas y gráficos.",
      Icon: LayoutDashboard,
      image: "/imgfuture/dashb.webp",
      alt: "Tablero de control"
    },
    {
      title: "Alertas inteligentes de estrés",
      description: "Sistema de notificaciones que advierte a los líderes cuando los niveles de estrés están críticamente altos a nivel individual y global.",
      Icon: AlertTriangle,
      image: "/imgfuture/adv.webp",
      alt: "Alertas de estrés"
    }
  ];

  const { ref, inView } = useInView({ threshold: 0.35 });
  const gsapRef = useGsapFadeIn({ start: 'top 85%', duration: 0.9, y: 20 });
  const gridStaggerRef = useGsapScrollTrigger(({ el, gsap, ScrollTrigger }) => {
    const items = el.querySelectorAll('.future-feature-card');
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
    <section id="future-features" ref={gsapRef} className="py-14 sm:py-20 bg-[#fcffff] px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-[#413030] text-center mb-4 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-3'}`} style={inView ? { animationDelay: '0ms' } : undefined}>
          Funcionalidades futuras de la app
        </h2>
        <div className="mx-auto h-1 w-24 bg-[#2e8b57] rounded-full mb-6"></div>
        <p className={`text-base md:text-lg text-[#413030] text-center mb-10 md:mb-12 max-w-2xl mx-auto ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-3'}`} style={inView ? { animationDelay: '120ms' } : undefined}>
          Próximas actualizaciones que transformarán la experiencia de bienestar laboral
          con herramientas avanzadas de análisis, visualización de datos y alertas inteligentes
          para una gestión más efectiva del estrés en el lugar de trabajo.
        </p>
        
        <div ref={gridStaggerRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {futureFeatures.map((feature, index) => (
            <div
              key={index}
              className={"future-feature-card group bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 transition duration-300 hover:shadow-lg hover:-translate-y-1"}
            >
              <div className="relative h-56 sm:h-72 md:h-80">
                <img src={feature.image} alt={feature.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                <div className="absolute top-3 left-3 bg-white/90 rounded-full p-2 shadow">
                  <feature.Icon className="text-[#2e8b57]" size={24} strokeWidth={2} aria-hidden="true" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-[#413030] mb-3">
                  {feature.title}
                </h3>
                <p className="text-base text-[#413030]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureFeatures;
