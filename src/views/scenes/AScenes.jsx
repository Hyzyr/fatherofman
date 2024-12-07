'use client';
import React, { useEffect, useRef, useState } from 'react';
import Dynasty from './dynasty/Dynasty';
import Egypt from './egypt/Egypt';
import NYC from './nyc/NYC';
import Prehystoric from './prehystoric/Prehystoric';
import WW2 from './ww2/WW2';
import useSceneController from './hooks/useSceneController';
import Nav, { NAV_ITEMS, NavArrow, NavItem } from '@/components/Nav';
import Social from './components/Social';
import DropBox from './components/DropBox';
import useCameraAnimations from './hooks/useCameraAnimations';

import gsap from 'gsap';
import CopyBar from './components/CopyBar';
import MuteButton from './components/MuteButton';
import SceneWrapper from './SceneWrapper';

const SCENES = {
  PREHYSTORIC: 'prehystoric',
  EGYPT: 'egypt',
  DYNASTY: 'dynasty',
  WW2: 'ww2',
  NYC: 'nyc',
};
const sceneNamesArr = Object.values(SCENES);
const IMAGES_URL = '/images/scenes/';

const AScenes = () => {
  const [scrolling, setScrolling] = useState(false);
  const [activeScene, setActive] = useState(sceneNamesArr[0]);
  const wrapper = useRef(null);
  const killAnimations = useRef(false);

  const { navTo, navNext, navPrev } = useSceneController({
    wrapper,
    activeScene,
    sceneNames: sceneNamesArr,
    setScrolling: (state) => {
      killAnimations.current = state;
      setScrolling(state);
      if (state) showAllScenes();
      else hideUnusedScenes();
    },
  });
  useCameraAnimations({
    animated: !scrolling,
    wrapperSelector: `.sceneController`,
    scope: wrapper,
    killAnimations,
  });

  useEffect(() => {
    setActiveScene(activeScene);
  }, []);

  const showAllScenes = () => {
    let wrapperEl = wrapper.current;

    gsap.set(wrapperEl.querySelectorAll('.sceneController__scene .scene'), {
      clearProps: 'display',
    });
  };
  const hideUnusedScenes = () => {
    let wrapperEl = wrapper.current;
    setTimeout(
      () =>
        wrapperEl
          .querySelectorAll('.sceneController__scene')
          .forEach((scene) => {
            console.log(scene, scene.classList.contains('active'));
            if (!scene.classList.contains('active'))
              gsap.set(scene.querySelector('.scene'), { display: 'none' });
          }),
      100
    );
  };
  const setActiveScene = (sceneName) => {
    setActive(sceneName);
    navTo(sceneNamesArr.indexOf(sceneName));
  };
  const navNextScene = () => {
    let newSceneName = navNext();
    setActive(newSceneName);
  };
  const navPrevScene = () => {
    let newSceneName = navPrev();
    setActive(newSceneName);
  };

  return (
    <>
      <div className="uicontrols">
        <Nav>
          <NavItem
            type={NAV_ITEMS.PREHYSTORIC}
            active={!scrolling && activeScene === SCENES.PREHYSTORIC}
            onClick={() => setActiveScene(SCENES.PREHYSTORIC)}
          />
          <NavItem
            type={NAV_ITEMS.EGYPT}
            active={!scrolling && activeScene === SCENES.EGYPT}
            onClick={() => setActiveScene(SCENES.EGYPT)}
          />
          <NavItem
            type={NAV_ITEMS.DYNASTY}
            active={!scrolling && activeScene === SCENES.DYNASTY}
            onClick={() => setActiveScene(SCENES.DYNASTY)}
          />
          <NavItem
            type={NAV_ITEMS.WW2}
            active={!scrolling && activeScene === SCENES.WW2}
            onClick={() => setActiveScene(SCENES.WW2)}
          />
          <NavItem
            type={NAV_ITEMS.NYC}
            active={!scrolling && activeScene === SCENES.NYC}
            onClick={() => setActiveScene(SCENES.NYC)}
          />
        </Nav>
        <NavArrow prev onClick={navPrevScene} />
        <NavArrow next onClick={navNextScene} />
        <Social />
        <DropBox />
        <CopyBar />
        <MuteButton />
      </div>
      <div className="sceneController" ref={wrapper}>
        <div className="scene__bg">
          <img src={IMAGES_URL + 'sky.webp'} alt="sky" />
        </div>
        <div className="sceneController__track">
          <SceneWrapper active={SCENES.PREHYSTORIC === activeScene}>
            <Prehystoric
              animated={SCENES.PREHYSTORIC === activeScene}
              // onCharClick={() => setActiveScene(SCENES.WW2)}
            />
          </SceneWrapper>
          <SceneWrapper active={SCENES.EGYPT === activeScene}>
            <Egypt
              animated={SCENES.EGYPT === activeScene}
              // onCharClick={() => setActiveScene(SCENES.NYC)}
            />
          </SceneWrapper>
          <SceneWrapper active={SCENES.DYNASTY === activeScene}>
            <Dynasty
              animated={SCENES.DYNASTY === activeScene}
              // onCharClick={() => setActiveScene(SCENES.EGYPT)}
            />
          </SceneWrapper>
          <SceneWrapper active={SCENES.WW2 === activeScene}>
            <WW2
              animated={SCENES.WW2 === activeScene}
              // onCharClick={() => setActiveScene(SCENES.DYNASTY)}
            />
          </SceneWrapper>
          <SceneWrapper active={SCENES.NYC === activeScene}>
            <NYC
              animated={SCENES.NYC === activeScene}
              // onCharClick={() => setActiveScene(SCENES.PREHYSTORIC)}
            />
          </SceneWrapper>
        </div>
      </div>
    </>
  );
};

export default AScenes;
