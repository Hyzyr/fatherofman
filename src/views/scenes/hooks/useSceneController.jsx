import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const useSceneController = ({ wrapper, scenesCount }) => {
  const navTimeline = useRef(null);

  useGSAP(
    () => {
      if (!navTimeline.current) navTimeline.current = gsap.timeline();
      const scenes = wrapper.current.querySelectorAll(
        '.sceneController__scene'
      );

      gsap.set('.sceneController__scene', {
        width: window.innerWidth,
        height: window.innerHeight,
      });
      gsap.set('.sceneController__track', {
        width: window.innerWidth * scenes.length,
      });
    },
    {
      scope: wrapper,
    }
  );
  const navTo = (index) => {
    const track = wrapper.current.querySelector('.sceneController__track');
    console.log('transform to ', (100 / scenesCount) * index);
    gsap.to(track, {
      xPercent: (100 / scenesCount) * -index,
      duration: 2,
      ease: 'power3.out',
    });
  };
  return {
    navTo,
  };
};

export default useSceneController;
