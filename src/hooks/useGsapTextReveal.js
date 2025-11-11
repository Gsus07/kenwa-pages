import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Split y animación de texto por letras o palabras con GSAP.
// Opciones:
// - split: 'chars' | 'words'
// - y, opacityFrom, duration, ease, stagger
// - scrollStart: string | null (si se define, usa ScrollTrigger con ese start)
export default function useGsapTextReveal({
  split = 'chars',
  y = 16,
  opacityFrom = 0,
  duration = 0.6,
  ease = 'power3.out',
  stagger = 0.04,
  scrollStart = null,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const el = ref.current;
    if (!el) return;

    const original = el.textContent;
    if (!original) return;

    // Limpiar hijos y crear spans
    el.textContent = '';

    const targets = [];

    if (split === 'words') {
      const words = original.split(' ');
      words.forEach((word, idx) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.whiteSpace = 'pre';
        el.appendChild(span);
        targets.push(span);
        if (idx < words.length - 1) {
          el.appendChild(document.createTextNode(' '));
        }
      });
    } else {
      // chars
      [...original].forEach((ch) => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.style.display = 'inline-block';
        span.style.whiteSpace = 'pre';
        el.appendChild(span);
        targets.push(span);
      });
    }

    const animationConfig = {
      opacity: 1,
      y: 0,
      duration,
      ease,
      stagger,
    };

    // Estado inicial
    gsap.set(targets, { opacity: opacityFrom, y });

    let tween;
    if (scrollStart) {
      tween = gsap.to(targets, {
        ...animationConfig,
        scrollTrigger: {
          trigger: el,
          start: scrollStart,
          toggleActions: 'play none none none',
        },
      });
    } else {
      tween = gsap.to(targets, animationConfig);
    }

    return () => {
      tween && tween.kill();
    };
  }, [split, y, opacityFrom, duration, ease, stagger, scrollStart]);

  return ref;
}