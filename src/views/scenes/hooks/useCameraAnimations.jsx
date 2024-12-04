import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { throttle } from '@/utils/debounce';
import { calcMouseFromCenter } from '@/utils/calcEvent';

const bgMove = 12;
const moveFactor = 1.5;
const moveFactorMain = 0.35;
const direction = 1;

const useCameraAnimations = ({ animated = true, wrapper: ref }) => {
  useGSAP(
    () => {
      if (!ref.current || typeof window === 'undefined') return;
      if (!animated) return;
      const bg = ref.current.querySelector('.scene__main');

      gsap.set(ref.current, {
        scale: 1 + bgMove / 100,
      });

      const debouncedMouseMove = throttle((event) => {
        const { percentageX, percentageY } = calcMouseFromCenter(event);
        gsap.to(ref.current, {
          xPercent: -percentageX * (bgMove / 100 / 2),
          yPercent: -percentageY * (bgMove / 100 / 2),
          ease: 'Power2.easeOut',
          duration: 7,
          delay: 0.1,
        });
        gsap.to(`.scene__main`, {
          xPercent: -percentageX * -direction * (moveFactorMain / 100 / 2),
          yPercent: -percentageY * -direction * (moveFactorMain / 100 / 2),
          ease: 'Power1.easeOut',
          duration: 14,
        });
        gsap.to(`.scene__front`, {
          xPercent: -percentageX * direction * (moveFactor / 100 / 2),
          yPercent: -percentageY * direction * (moveFactor / 100 / 2),
          ease: 'Power4.easeOut',
          duration: 25,
        });
        // gsap.to(`.scene__front`, {
        //   xPercent: -percentageX * direction * (moveFactor / 100 / 2),
        //   yPercent: -percentageY * direction * (moveFactor / 100 / 2),
        //   ease: 'Power2.easeOut',
        //   duration,
        // });
      }, 80);

      document.addEventListener('mousemove', debouncedMouseMove);
      return () => {
        document.removeEventListener('mousemove', debouncedMouseMove);
      };
    },
    { scrope: ref, dependencies: [animated] }
  );
};

export default useCameraAnimations;
