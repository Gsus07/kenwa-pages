import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Hook genérico para configurar animaciones con GSAP + ScrollTrigger usando una función de setup.
export default function useGsapScrollTrigger(setup) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    if (!el) return;

    // gsap.context asegura un scope limpio y revertible para React
    const ctx = gsap.context(() => {
      setup({ el, gsap, ScrollTrigger });
    }, el);

    return () => ctx.revert();
  }, [setup]);

  return ref;
}