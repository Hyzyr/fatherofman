'use client';
import React, { useRef } from 'react';
import Scene from './components/Scene';
import SceneItem from './components/SceneItem';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { throttle } from '@/utils/debounce';
import { calcMouseFromCenter } from '@/utils/calcEvent';

const bgMove = 12;
const moveFactor = 2;
const moveFactorMain = 1.5;
const direction = 1;
const IMAGES_URL = '/images/scenes/dynasty/';

const Dynasty = () => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current || typeof window === 'undefined') return;
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
          duration: 4,
          delay: 0.1,
        });
        gsap.to(`.scene__main`, {
          xPercent: -percentageX * -direction * (moveFactorMain / 100 / 2),
          yPercent: -percentageY * -direction * (moveFactorMain / 100 / 2),
          ease: 'Power1.easeOut',
          duration: 15,
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
    { scrope: ref }
  );

  return (
    <Scene name="dynasty" forwardRef={ref}>
      <div className="scene__back"></div>
      <div className="scene__main">
        <SceneItem
          url={IMAGES_URL + 'arrows.zip'}
          addClass="arrows"
          speed={0.1}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'city.zip'}
          addClass="city"
          speed={0.16}
          fill
        />
        <SceneItem url={IMAGES_URL + 'ground.webp'} addClass="ground" fill />
        <SceneItem
          url={IMAGES_URL + 'warriors.zip'}
          addClass="warriors"
          speed={0.16}
        />
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'road.webp'} addClass="road" fill />
        <SceneItem
          url={IMAGES_URL + 'sun-tzu.webp'}
          addClass="suntzu"
          controlHeight
        />
        <SceneItem
          url={IMAGES_URL + 'grass.zip'}
          speed={0.16}
          addClass="land"
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'dynasty-soldier.zip'}
          addClass="soldier"
          clickable
          speed={0.16}
        />
        <SceneItem
          url={IMAGES_URL + 'glows.zip'}
          addClass="glwos"
          speed={0.1}
        />
      </div>
    </Scene>
  );
};

export default Dynasty;
