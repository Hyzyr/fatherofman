'use client';
import React, { useRef } from 'react';
import PreloaderImage from './PreloaderImage';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { calcMouseFromCenter } from '@/utils/calcEvent';
import { throttle } from '@/utils/debounce';

const PRELOADER_DATA = {
  bg: '/images/preloader/abraham-monke-bg.webp',
  bgpos: 'bottom',
  bgMove: 4,
  items: [
    {
      id: 'abraham-monkey',
      bottom: 20,
      left: 32.2,
      width: 30,
      img: '/images/preloader/abraham-monke-alpha.webp',
      direction: 1,
      speed: 0.35,
      move: 8,
    },
  ],
};

const Preloader = () => {
  const data = PRELOADER_DATA;
  const ref = useRef(null);

  useGSAP(
    () => {
      const bg = ref.current.querySelector('.preloader__main-bg');

      gsap.set(bg, {
        scale: 1 + data.bgMove / 100,
        objectPosition: data.bgpos,
      });

      const debouncedMouseMove = throttle((event) => {
        const { percentageX, percentageY } = calcMouseFromCenter(event);
        gsap.to(bg, {
          xPercent: -percentageX * (data.bgMove / 100 / 2),
          yPercent: -percentageY * (data.bgMove / 100 / 2),
          ease: 'Power2.easeOut',
          duration: 0.4,
        });

        data.items.forEach((img) => {
          const direction = img.direction ?? 1;
          const duration = img.speed ?? 0.25;
          const moveFactor = img.move ?? 0.25;

          gsap.to(`#${img.id}`, {
            xPercent: -percentageX * direction * (moveFactor / 100 / 2),
            yPercent: -percentageY * direction * (moveFactor / 100 / 2),
            ease: 'Power2.easeOut',
            duration,
          });
        });
      }, 80);

      document.addEventListener('mousemove', debouncedMouseMove);
    },
    { scrope: ref }
  );

  return (
    <>
      <div className="preloader__main" ref={ref}>
        <img src={data.bg} className="preloader__main-bg" alt="preloader-bg" />
        {data.items.map(({ id, ...item }) => (
          <PreloaderImage key={id} id={id} {...item} />
        ))}
      </div>
    </>
  );
};

export default Preloader;
