import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function useGsapTypewriter({
  speed = 35, // chars per second
  cursor = true,
  cursorColor = '#2e8b57',
  scrollStart = 'top 90%'
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fullText = (el.textContent || '').trim();
    el.textContent = '';

    const contentSpan = document.createElement('span');
    el.appendChild(contentSpan);

    let caretSpan;
    let caretAnim;
    if (cursor) {
      caretSpan = document.createElement('span');
      caretSpan.setAttribute('aria-hidden', 'true');
      caretSpan.style.display = 'inline-block';
      caretSpan.style.width = '1px';
      caretSpan.style.height = '1em';
      caretSpan.style.verticalAlign = 'text-bottom';
      caretSpan.style.marginLeft = '2px';
      caretSpan.style.backgroundColor = cursorColor;
      el.appendChild(caretSpan);
      caretAnim = gsap.to(caretSpan, { autoAlpha: 0, duration: 0.6, repeat: -1, yoyo: true, ease: 'power1.inOut' });
    }

    const duration = fullText.length / Math.max(1, speed);
    const state = { i: 0 };
    const tween = gsap.to(state, {
      i: fullText.length,
      duration,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: scrollStart,
        toggleActions: 'play none none none',
      },
      onUpdate: () => {
        contentSpan.textContent = fullText.slice(0, Math.floor(state.i));
      },
      onComplete: () => {
        contentSpan.textContent = fullText;
        if (caretSpan) {
          gsap.to(caretSpan, { autoAlpha: 0, duration: 0.2 });
        }
      }
    });

    return () => {
      tween.kill();
      if (caretAnim) caretAnim.kill();
    };
  }, [speed, cursor, cursorColor, scrollStart]);

  return ref;
}