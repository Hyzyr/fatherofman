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

  const navTo = (index, isLong = false) => {
    const track = wrapper.current.querySelector('.sceneController__track');
    const fg = wrapper.current.querySelector('.sceneController__track-fg');
    const innerWidth = window.innerWidth;

    navTimeline.current //asdsad
      .to(fg, {
        x: -index * innerWidth,
        duration: isLong ? 1.2 : 1.4,
        ease: isLong
          ? 'power2.in'
          : CustomEase.create(
              'custom',
              'M0,0 C0.039,0.077 0.109,0.285 0.223,0.458 0.281,0.547 0.523,0.609 0.668,0.7 0.747,0.749 0.889,1.014 1,1 '
            ),
        //  CustomEase.create(
        //     'custom',
        //     'M0,0 C0.039,0.077 0.12,0.242 0.234,0.415 0.324,0.552 0.693,0.727 0.811,0.81 0.88,0.858 0.833,0.831 1,1 '
        //   ),
        // ease: CustomEase.create("custom", "M0,0 C0.039,0.077 0.12,0.242 0.234,0.415 0.324,0.552 0.423,0.561 0.55,0.671 0.619,0.731 0.651,0.782 0.769,0.865 0.838,0.913 0.839,0.905 1,1 "),
      })
      .to(
        track,
        {
          left: `${window.innerWidth * -index}px`,
          duration: 1,
          delay: isLong ? 0.3 : 0.1,
          // ease: CustomEase.create(
          //   'custom',
          //   'M0,0 C0.022,0.077 0.212,0.401 0.421,0.624 0.591,0.806 0.83,0.908 1,1 '
          // ),
          // ease: 'power3.out',
          ease: CustomEase.create(
            'custom',
            'M0,0 C0.083,0.294 0.094,0.556 0.361,0.746 0.491,0.839 0.752,1 1,1 '
          ),
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
    navTo(newIndex, Math.abs(currentIndex - newIndex) > 1);
    return sceneNames[newIndex];
  };
  const navPrev = () => {
    let currentIndex = [...sceneNames].indexOf(activeScene);
    let newIndex =
      currentIndex === 0 ? sceneNames.length - 1 : currentIndex - 1;
    navTo(newIndex, Math.abs(currentIndex - newIndex) > 1);
    return sceneNames[newIndex];
  };

  return {
    navTo,
    navNext,
    navPrev,
  };
};

export default useSceneController;
