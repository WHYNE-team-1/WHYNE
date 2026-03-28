// hooks/useScrollAnimate.ts
import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface ScrollAnimateOptions {
  // 들어올 때 애니메이션 옵션
  inAnimation?: Record<string, unknown>;
  // 나갈 때 애니메이션 옵션
  outAnimation?: Record<string, unknown>;
  // 요소가 몇 % 보일 때 실행할지 (0~1, 기본 0.2 = 20%)
  threshold?: number;
  // 들어올 때 duration (ms)
  inDuration?: number;
  // 나갈 때 duration (ms)
  outDuration?: number;
  // 들어올 때 delay (ms)
  inDelay?: number;
  // 나갈 때 delay (ms)
  outDelay?: number;
}

export function useScrollAnimate<T extends HTMLElement>({
  inAnimation = { opacity: [0, 1], translateY: [30, 0] },
  outAnimation = { opacity: 0, translateY: 30 },
  threshold = 0.2,
  inDuration = 800,
  outDuration = 400,
  inDelay = 0,
  outDelay = 0,
}: ScrollAnimateOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!ref.current) return;

          if (entry.isIntersecting) {
            animate(ref.current, {
              ...inAnimation,
              duration: inDuration,
              delay: inDelay,
              easing: 'easeOutExpo',
            });
          } else {
            animate(ref.current, {
              ...outAnimation,
              duration: outDuration,
              delay: outDelay,
              easing: 'easeInExpo',
            });
          }
        });
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return ref;
}
