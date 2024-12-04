'use client';
import React, { useRef } from 'react';
import Scene from './components/Scene';
import SceneItem from './components/SceneItem';
import useCameraAnimations from './hooks/useCameraAnimations';

const IMAGES_URL = '/images/scenes/ww2/';

const WW2 = ({ animated = true, onCharClick }) => {
  const ref = useRef(null);
  useCameraAnimations({ animated, wrapper: ref });

  return (
    <Scene name="ww2" forwardRef={ref}>
      <div className="scene__back"></div>
      <div className="scene__main">
        <SceneItem url={IMAGES_URL + 'bg-2.webp'} addClass="mountain" fill />
        <SceneItem
          url={IMAGES_URL + 'trees.zip'}
          addClass="trees"
          speed={0.13}
          animate={animated}
        />
        <SceneItem
          url={IMAGES_URL + 'smoke-bg.zip'}
          addClass="smoke-bg"
          speed={0.1}
          animate={animated}
        />
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'bg.webp'} addClass="city" fill />
        <SceneItem
          url={IMAGES_URL + 'fire.zip'}
          addClass="fire"
          speed={0.13}
          animate={animated}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'smoke-l.zip'}
          addClass="smokeL"
          speed={0.08}
          animate={animated}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'smoke-r.zip'}
          addClass="smokeR"
          speed={0.08}
          animate={animated}
          fill
        />{' '}
        <SceneItem
          url={IMAGES_URL + 'bullets.zip'}
          addClass="bullets"
          speed={0.16}
          animate={animated}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'soldiers.zip'}
          addClass="soldiers"
          speed={0.1}
          animate={animated}
          fill
        />
        <SceneItem url={IMAGES_URL + 'stone.webp'} addClass="stone" />
        <SceneItem
          url={IMAGES_URL + 'soldier.zip'}
          addClass="soldier"
          speed={0.13}
          animate={animated}
        />
        <SceneItem
          url={IMAGES_URL + 'character.zip'}
          addClass="character"
          clickable
          onClick={onCharClick}
          speed={0.1}
          animate={animated}
        />
        <SceneItem
          url={IMAGES_URL + 'dust.zip'}
          addClass="dust"
          speed={0.1}
          animate={animated}
        />
        <SceneItem
          url={IMAGES_URL + 'sparks.zip'}
          addClass="sparks"
          speed={0.1}
          animate={animated}
        />
      </div>
    </Scene>
  );
};

export default WW2;
