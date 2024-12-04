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
const IMAGES_URL = '/images/scenes/ww2/';

const WW2 = () => {
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
    <Scene name="ww2" forwardRef={ref}>
      <div className="scene__back"></div>
      <div className="scene__main">
        <SceneItem url={IMAGES_URL + 'bg-2.webp'} addClass="mountain" fill />
        <SceneItem
          url={IMAGES_URL + 'trees.zip'}
          addClass="trees"
          speed={0.13}
        />
        <SceneItem
          url={IMAGES_URL + 'smoke-bg.zip'}
          addClass="smoke-bg"
          speed={0.1}
        />
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'bg.webp'} addClass="city" fill />
        <SceneItem
          url={IMAGES_URL + 'fire.zip'}
          addClass="fire"
          speed={0.13}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'smoke-l.zip'}
          addClass="smokeL"
          speed={0.08}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'smoke-r.zip'}
          addClass="smokeR"
          speed={0.08}
          fill
        />{' '}
        <SceneItem
          url={IMAGES_URL + 'bullets.zip'}
          addClass="bullets"
          speed={0.16}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'soldiers.zip'}
          addClass="soldiers"
          speed={0.1}
          fill
        />
        <SceneItem url={IMAGES_URL + 'stone.webp'} addClass="stone" />
        <SceneItem
          url={IMAGES_URL + 'soldier.zip'}
          addClass="soldier"
          speed={0.13}
        />
        <SceneItem
          url={IMAGES_URL + 'character.zip'}
          addClass="character"
          clickable
          speed={0.1}
        />
        <SceneItem url={IMAGES_URL + 'dust.zip'} addClass="dust" speed={0.1} />
        <SceneItem
          url={IMAGES_URL + 'sparks.zip'}
          addClass="sparks"
          speed={0.1}
        />
      </div>
    </Scene>
  );
};

export default WW2;
