'use client';
import React, { useRef } from 'react';
import Scene from './components/Scene';
import SceneItem from './components/SceneItem';
import useCameraAnimations from './hooks/useCameraAnimations';

const IMAGES_URL = '/images/scenes/egypt/';

const Egypt = ({ animated = true, onCharClick }) => {
  const ref = useRef(null);
  useCameraAnimations({ animated, wrapper: ref });

  return (
    <Scene name="egypt" forwardRef={ref}>
      <div className="scene__back">
        <SceneItem
          url={IMAGES_URL + 'birds.zip'}
          animate={animated}
          addClass="birds"
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'birds-2.zip'}
          animate={animated}
          addClass="birds2"
          speed={0.1}
        />
      </div>
      <div className="scene__main">
        <SceneItem
          url={IMAGES_URL + 'pyramids.zip'}
          animate={animated}
          addClass="pyramids"
          speed={0.16}
          fill
        />
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'sphinx.webp'} addClass="sphinx" />
        <SceneItem url={IMAGES_URL + 'sand.webp'} addClass="ground" fill />
        <SceneItem
          url={IMAGES_URL + 'grass.zip'}
          animate={animated}
          addClass="grass"
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'grass.zip'}
          animate={animated}
          addClass="grass2"
          speed={0.16}
        />
        <SceneItem
          url={IMAGES_URL + 'chararacter.zip'}
          animate={animated}
          addClass="chararacter"
          clickable
          onClick={onCharClick}
          speed={0.1}
        />
      </div>
    </Scene>
  );
};

export default Egypt;
