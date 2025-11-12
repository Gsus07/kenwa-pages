import React from 'react';
import Carousel from './Carousel.jsx';
import useInView from '../hooks/useInView.js';
import useGsapFadeIn from '../hooks/useGsapFadeIn.js';
import useGsapScrollTrigger from '../hooks/useGsapScrollTrigger.js';
import useGsapTextReveal from '../hooks/useGsapTextReveal.js';
import useGsapHoverLift from '../hooks/useGsapHoverLift.js';

const Download = () => {
  const { ref, inView } = useInView({ threshold: 0.35 });
  const gsapRef = useGsapFadeIn({ start: 'top 85%', duration: 0.9, y: 20 });
  const gsapCardRef = useGsapScrollTrigger(({ el, gsap }) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: 24,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      }
    });
  });
  const parallaxRef = useGsapScrollTrigger(({ el, gsap }) => {
    gsap.fromTo(
      el,
      { y: 0 },
      {
        y: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });
  const paragraphRef = useGsapTextReveal({ split: 'words', y: 16, stagger: 0.06, duration: 0.7, scrollStart: 'top 90%' });
  const apkBtnRef = useGsapHoverLift({ liftY: -2, shadow: '0 8px 20px rgba(46,139,87,0.25)', duration: 0.18 });

  return (
    <section id="download" ref={gsapRef} className="py-20 bg-[#fcffff] px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className={"text-3xl md:text-4xl font-bold text-[#413030] text-center mb-4"}>
          Descarga la App Móvil
        </h2>
        <div className="mx-auto h-1 w-24 bg-[#2e8b57] rounded-full mb-6"></div>
        <p ref={paragraphRef} className={"text-lg text-[#413030] text-center mb-12 max-w-2xl mx-auto"}>
          Lleva <span className="text-[#2e8b57]">Kenwa</span> contigo. Gestiona salud y seguridad laboral desde tu dispositivo móvil.
        </p>
        
        <div ref={gsapCardRef} className={"bg-white rounded-2xl shadow-lg p-8 border border-[#2e8b57]/10"}>
          <div ref={parallaxRef} className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <p className="text-[#413030] mb-4">
                Descarga la versión para Android en formato APK. Pronto disponible en Play Store y App Store.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/InflvxDev/kenwa_releases/releases/download/1.0.3/kenwa1.0.3.apk"
                  download
                  ref={apkBtnRef}
                  className="inline-flex items-center justify-center bg-[#2e8b57] hover:bg-[#267349] text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.03] active:scale-[0.99]"
                >
                  Descargar APK
                </a>
                <a
                  href="#"
                  aria-disabled="true"
                  className="inline-flex items-center justify-center border-2 border-[#2e8b57] text-[#2e8b57] font-semibold py-3 px-6 rounded-lg transition duration-300 opacity-50 cursor-not-allowed pointer-events-none"
                >
                  Próximamente en Play/App Store
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <Carousel
                className="h-40 sm:h-48 md:h-56"
                interval={7000}
                images={[
                  '/carousel/file-analysis.svg',
                  '/carousel/dev-productivity.svg',
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Download;