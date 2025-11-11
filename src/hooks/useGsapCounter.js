import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useGsapCounter({
  from = 0,
  to = 0,
  duration = 1,
  ease = 'power2.out',
  prefix = '',
  suffix = '',
  scrollStart = 'top 85%'
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const state = { value: from };
    const anim = gsap.to(state, {
      value: to,
      duration,
      ease,
      scrollTrigger: {
        trigger: el,
        start: scrollStart,
        toggleActions: 'play none none none'
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.floor(state.value)}${suffix}`;
      }
    });

    return () => {
      anim.kill();
    };
  }, [from, to, duration, ease, prefix, suffix, scrollStart]);

  return ref;
}