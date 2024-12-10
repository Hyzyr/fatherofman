import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { debounce } from '@/utils/debounce';

const ScenecFg = () => {
  let wrapper = useRef();

  useGSAP(
    () => {
      if (!wrapper.current) return;

      const resetSize = debounce(() => {
        const items = wrapper.current.querySelectorAll('._emptyspace, img');
        gsap.set(items, {
          width: window.innerWidth,
          height: window.innerHeight,
        });
        gsap.set(wrapper.current, {
          width: window.innerWidth * items.length,
          x: 0,
        });
      }, 100);
      resetSize();
      window.addEventListener('resize', resetSize);
      return () => window.removeEventListener('resize', resetSize);
    },
    {
      scope: wrapper,
    }
  );
  return (
    <div className="sceneController__track-fg" ref={wrapper}>
      <div className="_emptyspace"></div>
      <img src="/images/scenes/scene-1-to-2.webp" alt="scene-midd-siluate" />
      <div className="_emptyspace"></div>
      <img src="/images/scenes/scene-2-to-3.webp" alt="scene-midd-siluate" />
      <div className="_emptyspace"></div>
      <img src="/images/scenes/scene-3-to-4.webp" alt="scene-midd-siluate" />
      <div className="_emptyspace"></div>
      <img src="/images/scenes/scene-4-to-5.webp" alt="scene-midd-siluate" />
    </div>
  );
};

export default ScenecFg;
