import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

const useSceneController = ({
  wrapper,
  setScrolling,
  activeScene,
  sceneNames,
}) => {
  const navTimeline = useRef(null);

  useGSAP(
    () => {
      if (!navTimeline.current) navTimeline.current = gsap.timeline();
      const scenes = wrapper.current.querySelectorAll(
        '.sceneController__scene'
      );

      gsap.set('.sceneController__scene, .sceneController__scene .scene', {
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
    const fg = wrapper.current.querySelector('.sceneController__track-fg');
    const innerWidth = window.innerWidth;

    navTimeline.current //asdsad
      .to(fg, {
        x: -index * innerWidth,
        duration: 2.4,
        ease: CustomEase.create('custom', 'M0,0 C0.155,0.262 0.586,0.847 1,1 '),
      })
      .to(
        track,
        {
          left: `${window.innerWidth * -index}px`,
          duration: 1.2,
          ease: CustomEase.create(
            'custom',
            'M0,0 C0.354,0.217 0.754,0.583 1,1 '
          ),
          delay: 0.3,
          onStart: () => {
            gsap.set(track, { willChange: 'auto' });
            if (setScrolling) setScrolling(true);
          },
          onComplete: () => {
            gsap.set(track, { willChange: 'unset' });
            if (setScrolling) setScrolling(false);
          },
        },
        '<'
      );
  };
  const navNext = () => {
    let currentIndex = [...sceneNames].indexOf(activeScene);
    let newIndex =
      currentIndex + 1 === sceneNames.length ? 0 : currentIndex + 1;
    navTo(newIndex);
    return sceneNames[newIndex];
  };
  const navPrev = () => {
    let currentIndex = [...sceneNames].indexOf(activeScene);
    let newIndex =
      currentIndex === 0 ? sceneNames.length - 1 : currentIndex - 1;
    navTo(newIndex);
    return sceneNames[newIndex];
  };

  return {
    navTo,
    navNext,
    navPrev,
  };
};

export default useSceneController;
