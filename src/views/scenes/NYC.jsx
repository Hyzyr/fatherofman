'use client';
import React, { useRef } from 'react';
import Scene from './components/Scene';
import SceneItem from './components/SceneItem';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { throttle } from '@/utils/debounce';
import { calcMouseFromCenter } from '@/utils/calcEvent';

const bgMove = 12;
const moveFactor = 1.5;
const moveFactorMain = 0.35;
const direction = 1;
const IMAGES_URL = '/images/scenes/nyc/';

const NYC = () => {
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
          duration: 7,
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
    <Scene name="nyc" forwardRef={ref}>
      <div className="scene__back"></div>
      <div className="scene__main">
        <SceneItem
          url={IMAGES_URL + 'buildings.webp'}
          addClass="buildings"
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'flag.zip'}
          addClass="flag"
          controlHeight
        />
      </div>
      <div className="scene__front">
        <SceneItem
          url={IMAGES_URL + 'building.webp'}
          addClass="building"
          fill
        />
        <SceneItem url={IMAGES_URL + 'ground.webp'} addClass="ground" fill />
        <SceneItem
          url={IMAGES_URL + 'taxi.zip'}
          addClass="taxi"
          delay={1}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'officer.zip'}
          addClass="officer"
          controlHeight
        />
        <SceneItem
          url={IMAGES_URL + 'people.zip'}
          addClass="people"
          controlHeight
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'character.zip'}
          addClass="character"
          clickable
          controlHeight
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'person.zip'}
          addClass="person"
          controlHeight
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'smoke-r.zip'}
          addClass="smokeR"
          controlHeight
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'smoke.zip'}
          addClass="smokeL"
          controlHeight
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'foreground.webp'}
          addClass="foreground"
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'walking-people.zip'}
          addClass="foreground2"
          fill
        />
      </div>
    </Scene>
  );
};

export default NYC;
