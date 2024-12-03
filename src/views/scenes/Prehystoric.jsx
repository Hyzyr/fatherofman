'use client';
import React, { useRef } from 'react';
import Scene from './Scene';
import SceneItem from './SceneItem';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { throttle } from '@/utils/debounce';
import { calcMouseFromCenter } from '@/utils/calcEvent';

const bgMove = 12;
const moveFactor = 2;
const moveFactorMain = 1.5;
const direction = 1;
const IMAGES_URL = '/images/scenes/prehystoric/';

const Prehystoric = () => {
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
    <Scene name="prehystoric" forwardRef={ref}>
      <div className="scene__back">
        <SceneItem
          url={IMAGES_URL + 'ptero.zip'}
          addClass="ptero"
          speed={0.1}
        />
      </div>
      <div className="scene__main">
        <SceneItem
          url={IMAGES_URL + 'smoke.zip'}
          addClass="smoke"
          speed={0.1}
        />
        <SceneItem url={IMAGES_URL + 'volcano.webp'} addClass="volcano" fill />
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'ground.webp'} addClass="ground" fill />
        <SceneItem
          url={IMAGES_URL + 'dinos.zip'}
          addClass="dinos"
          speed={0.13}
        />
        <SceneItem url={IMAGES_URL + 'mid-ground.webp'} addClass="ground-mid" />
        <SceneItem
          url={IMAGES_URL + 'snake-tree.zip'}
          addClass="tree"
          controlHeight
          speed={0.13}
        />
        <SceneItem
          url={IMAGES_URL + 'character.zip'}
          addClass="character"
          clickable
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'palms.zip'}
          addClass="palms"
          speed={0.13}
        />
        <SceneItem
          url={IMAGES_URL + 'grass.zip'}
          addClass="grass"
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'silhouette-l.zip'}
          addClass="silhouetteL"
          speed={0.16}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'silhouette-r.zip'}
          addClass="silhouetteR"
          speed={0.16}
          fill
        />
      </div>
    </Scene>
  );
};

export default Prehystoric;
