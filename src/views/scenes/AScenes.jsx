'use client';
import React, { useRef, useState } from 'react';
import Dynasty from './Dynasty';
import Egypt from './Egypt';
import NYC from './NYC';
import Prehystoric from './Prehystoric';
import WW2 from './WW2';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const SCENES = {
  DYNASTY: 'dynasty',
  EGYPT: 'egypt',
  NYC: 'nyc',
  PREHYSTORIC: 'prehystoric',
  WW2: 'ww2',
};
const sceneNamesArr = Object.values(SCENES);

const AScenes = () => {
  const [activeScene, setActive] = useState(SCENES.DYNASTY);
  const wrapper = useRef(null);
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
    console.log('transform to ', (100 / sceneNamesArr.length) * index);
    gsap.to(track, {
      xPercent: (100 / sceneNamesArr.length) * -index,
      duration: 2,
      ease: 'power3.out',
    });
  };

  const setActiveScene = (sceneName) => {
    setActive(sceneName);
    navTo(sceneNamesArr.indexOf(sceneName));
  };

  return (
    <div className="sceneController" ref={wrapper}>
      <div className="sceneController__track">
        <SceneWrapper active={SCENES.DYNASTY === activeScene}>
          <Dynasty
            animated={SCENES.DYNASTY === activeScene}
            onCharClick={() => setActiveScene(SCENES.EGYPT)}
          />
        </SceneWrapper>
        <SceneWrapper active={SCENES.EGYPT === activeScene}>
          <Egypt
            animated={SCENES.EGYPT === activeScene}
            onCharClick={() => setActiveScene(SCENES.NYC)}
          />
        </SceneWrapper>
        <SceneWrapper active={SCENES.NYC === activeScene}>
          <NYC
            animated={SCENES.NYC === activeScene}
            onCharClick={() => setActiveScene(SCENES.PREHYSTORIC)}
          />
        </SceneWrapper>
        <SceneWrapper active={SCENES.PREHYSTORIC === activeScene}>
          <Prehystoric
            animated={SCENES.PREHYSTORIC === activeScene}
            onCharClick={() => setActiveScene(SCENES.WW2)}
          />
        </SceneWrapper>
        <SceneWrapper active={SCENES.WW2 === activeScene}>
          <WW2
            animated={SCENES.WW2 === activeScene}
            onCharClick={() => setActiveScene(SCENES.DYNASTY)}
          />
        </SceneWrapper>
      </div>
    </div>
  );
};

const SceneWrapper = ({ active, children }) => {
  return (
    <div className={`sceneController__scene ${active ? 'active' : ''}`}>
      {children}
      <div className={`sceneController__scene-fog`}></div>
    </div>
  );
};

export default AScenes;
