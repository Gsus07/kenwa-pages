import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    gsap.set(el, { transformOrigin: '0% 50%', scaleX: 0 });

    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      onUpdate: (self) => {
        gsap.to(el, { scaleX: self.progress, duration: 0.1, ease: 'none' });
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: '#2e8b57',
        zIndex: 50,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ScrollProgress;