import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { throttle } from '@/utils/debounce';
import { calcMouseFromCenter } from '@/utils/calcEvent';

const bgMove = 13;
const moveFactor = 2;
const moveFactorMain = 0.6;
const direction = 1;

const useCameraAnimations = ({
  animated = true,
  wrapperSelector,
  scope = undefined,
}) => {
  const killAnimations = React.useRef(!animated);

  useGSAP(
    () => {
      if (!wrapperSelector || typeof window === 'undefined') return;
      if (!animated) return;
      killAnimations.current = false;

      const wrapper = document.querySelector(wrapperSelector);
      const main = wrapper.querySelector('.scene__main');
      const front = wrapper.querySelector('.scene__front');
      window.gsap = gsap;

      gsap.set(wrapper, {
        scale: 1 + bgMove / 100,
        xPercent: 0,
        yPercent: 0,
      });
      const tl = gsap.timeline();

      const debouncedMouseMove = (event) => {
        if (killAnimations.current) return;
        const { percentageX, percentageY } = calcMouseFromCenter(event);

        gsap.to(wrapper, {
          xPercent: -percentageX * (bgMove / 100 / 2),
          yPercent: -percentageY * (bgMove / 100 / 2),
          ease: 'Power2.easeOut',
          duration: 5,
          delay: 0.1,
        });
        gsap.to(main, {
          xPercent: -percentageX * -direction * (moveFactorMain / 100 / 2),
          yPercent: -percentageY * -direction * (moveFactorMain / 100 / 2),
          ease: 'Power1.easeOut',
          duration: 4,
        });
        gsap.to(front, {
          xPercent: -percentageX * direction * (moveFactor / 100 / 2),
          yPercent: -percentageY * direction * (moveFactor / 100 / 2),
          ease: 'Power4.easeOut',
          duration: 12,
        });
      };

      document.addEventListener('mousemove', debouncedMouseMove);
      return () => {
        document.removeEventListener('mousemove', debouncedMouseMove);

        killAnimations.current = true;
        tl.pause(0).kill();

        gsap.set(wrapper, { clearProps: 'all' });
        gsap.set(main, { clearProps: 'all' });
        gsap.set(front, { clearProps: 'all' });
      };
    },
    { scope, dependencies: [animated, wrapperSelector] }
  );
};

export default useCameraAnimations;
