import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function useGsapFadeIn({ start = 'top 85%', duration = 0.9, y = 20, delay = 0, once = true, ease = 'power3.out' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { autoAlpha: 0, y },
      { autoAlpha: 1, y: 0, duration, ease, delay }
    );

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => tween.play(),
      once,
    });

    return () => {
      st.kill();
      tween.kill();
    };
  }, [start, duration, y, delay, once, ease]);

  return ref;
}