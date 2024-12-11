'use client';
import React, { useRef } from 'react';
import PreloaderImage from './PreloaderImage';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { calcMouseFromCenter } from '@/utils/calcEvent';
import { throttle } from '@/utils/debounce';

const Preloader = ({ data }) => {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (!ref.current || typeof window === 'undefined') return;
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
      return () => {
        document.removeEventListener('mousemove', debouncedMouseMove);
      };
    },
    { scope: ref }
  );

  if (!data) return null;

  return (
    <>
      <div className={`preloader__main ${data.id}`} ref={ref}>
        <img
          src={'/images/preloader/' + data.bg}
          className="preloader__main-bg"
          alt="preloader-bg"
          suppressHydrationWarning
        />
        {data.items.map(({ id, ...item }) => (
          <PreloaderImage key={id} id={id} {...item} />
        ))}
      </div>
    </>
  );
};

export default Preloader;
