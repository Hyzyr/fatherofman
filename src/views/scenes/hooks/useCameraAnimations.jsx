import React, { useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { calcMouseFromCenter } from '@/utils/calcEvent';
import useMobile from '@/hooks/useMobile';

const bgMove = 6;
const moveFactorMain = 1.6;
const moveFactor = 0.7;
const direction = 1;

const useCameraAnimations = ({
  animated = true,
  wrapperSelector,
  scope = undefined,
  killAnimations,
}) => {
  const isMobile = useMobile();

  useEffect(() => {
    const wrappers = document.querySelectorAll(
      '.sceneController__scene .scene.optimize'
    );
    if (animated && !isMobile)
      gsap.set(wrappers, {
        scale: 1 + bgMove / 100,
        xPercent: 0,
        yPercent: 0,
      });
  }, [animated, isMobile]);

  useGSAP(
    () => {
      if (!wrapperSelector || typeof window === 'undefined' || isMobile) return;
      if (!animated) return;

      const debouncedMouseMove = (event) => {
        if (killAnimations?.current) return;
        const { percentageX, percentageY } = calcMouseFromCenter(event);
        const wrapper = document.querySelector(
          '.sceneController__scene.active .scene.optimize'
        );
        if (!wrapper) return;
        const main = wrapper.querySelector('.scene__main');
        const front = wrapper.querySelector('.scene__front');

        gsap.to(wrapper, {
          xPercent: -percentageX * (bgMove / 100 / 2),
          yPercent: -percentageY * (bgMove / 100 / 2),
          ease: 'power4.out',
          duration: 5,
          delay: 0.1,
        });
        if (main) {
          gsap.to(main, {
            xPercent: -percentageX * -direction * (moveFactorMain / 100 / 2),
            yPercent: -percentageY * -direction * (moveFactorMain / 100 / 2),
            ease: 'power1.in',
            duration: 7,
          });
        }
        if (front) {
          gsap.to(front, {
            xPercent: -percentageX * direction * (moveFactor / 100 / 2),
            yPercent: -percentageY * direction * (moveFactor / 100 / 2),
            ease: 'power4.out',
            duration: 3,
          });
        }
      };

      document.addEventListener('mousemove', debouncedMouseMove);
      return () =>
        document.removeEventListener('mousemove', debouncedMouseMove);
    },
    { scope, dependencies: [animated, isMobile] }
  );
};

export default useCameraAnimations;
