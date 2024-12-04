import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { throttle } from '@/utils/debounce';
import { calcMouseFromCenter } from '@/utils/calcEvent';

const bgMove = 10;
const moveFactor = 1;
const moveFactorMain = 0.6;
const direction = 1;

const useCameraAnimations = ({ animated = true, wrapper: ref }) => {
  useGSAP(
    () => {
      if (!ref.current || typeof window === 'undefined') return;
      if (!animated) return;
      const main = ref.current.querySelector('.scene__main');
      const front = ref.current.querySelector('.scene__main');

      let tl = gsap.timeline();

      gsap.set(ref.current, {
        scale: 1 + bgMove / 100,
        xPercent: 0,
        yPercent: 0,
      });

      const debouncedMouseMove = throttle((event) => {
        const { percentageX, percentageY } = calcMouseFromCenter(event);
        tl.to(
          ref.current,
          {
            xPercent: -percentageX * (bgMove / 100 / 2),
            yPercent: -percentageY * (bgMove / 100 / 2),
            ease: 'Power2.easeOut',
            duration: 12,
            delay: 0.1,
          },
          '<'
        );
        tl.to(
          main,
          {
            xPercent: -percentageX * -direction * (moveFactorMain / 100 / 2),
            yPercent: -percentageY * -direction * (moveFactorMain / 100 / 2),
            ease: 'Power1.easeOut',
            duration: 16,
          },
          '<'
        );
        tl.to(
          front,
          {
            xPercent: -percentageX * direction * (moveFactor / 100 / 2),
            yPercent: -percentageY * direction * (moveFactor / 100 / 2),
            ease: 'Power4.easeOut',
            duration: 25,
          },
          '<'
        );
        // gsap.to(`.scene__front`, {
        //   xPercent: -percentageX * direction * (moveFactor / 100 / 2),
        //   yPercent: -percentageY * direction * (moveFactor / 100 / 2),
        //   ease: 'Power2.easeOut',
        //   duration,
        // });
      }, 80);
      window.tl = tl;

      document.addEventListener('mousemove', debouncedMouseMove);
      return () => {
        tl.to(ref.current, { xPercent: 0, yPercent: 0, duration: 0 }, '<');
        tl.to(main, { xPercent: 0, yPercent: 0, duration: 0 }, '<');
        tl.to(front, { xPercent: 0, yPercent: 0, duration: 0 }, '<');
        tl.pause();
        tl.kill();
        document.removeEventListener('mousemove', debouncedMouseMove);
      };
    },
    { scrope: ref, dependencies: [animated] }
  );
};

export default useCameraAnimations;
