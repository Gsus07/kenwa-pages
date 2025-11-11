import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function useGsapHoverLift({
  liftY = -2,
  shadow = '0 8px 20px rgba(46,139,87,0.25)',
  duration = 0.18
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onEnter = () => {
      gsap.to(el, { y: liftY, boxShadow: shadow, duration });
    };
    const onLeave = () => {
      gsap.to(el, { y: 0, boxShadow: 'none', duration });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [liftY, shadow, duration]);

  return ref;
}