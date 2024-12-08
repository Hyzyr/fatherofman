import React, { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { debounce, throttle } from '@/utils/debounce';
import { calcMouseFromCenter } from '@/utils/calcEvent';

const bgMove = 13;
const moveFactorMain = 2;
const moveFactor = 0.7;
const direction = 1;

const useCameraAnimations = ({
  animated = true,
  wrapperSelector,
  scope = undefined,
  killAnimations,
}) => {
  useEffect(() => {
    const wrappers = document.querySelectorAll(
      '.sceneController__scene .scene'
    );
    gsap.set(wrappers, {
      scale: 1 + bgMove / 100,
      xPercent: 0,
      yPercent: 0,
    });
  }, [animated]);

  useGSAP(
    () => {
      if (!wrapperSelector || typeof window === 'undefined') return;
      if (!animated) return;

      const debouncedMouseMove = (event) => {
        if (killAnimations?.current) return;
        const { percentageX, percentageY } = calcMouseFromCenter(event);
        const wrapper = document.querySelector(
          '.sceneController__scene.active .scene'
        );
        const main = wrapper.querySelector('.scene__main');
        const front = wrapper.querySelector('.scene__front');

        gsap.to(wrapper, {
          xPercent: -percentageX * (bgMove / 100 / 2),
          yPercent: -percentageY * (bgMove / 100 / 2),
          ease: 'Power2.easeOut',
          duration: 7,
          delay: 0.1,
        });
        gsap.to(main, {
          xPercent: -percentageX * -direction * (moveFactorMain / 100 / 2),
          yPercent: -percentageY * -direction * (moveFactorMain / 100 / 2),
          ease: 'Power1.easeOut',
          duration: 12,
        });
        gsap.to(front, {
          xPercent: -percentageX * direction * (moveFactor / 100 / 2),
          yPercent: -percentageY * direction * (moveFactor / 100 / 2),
          ease: 'Power3.easeIn',
          duration: 8,
        });
      };

      document.addEventListener('mousemove', debouncedMouseMove);
    },
    { scope, dependencies: [animated] }
  );
};

export default useCameraAnimations;
