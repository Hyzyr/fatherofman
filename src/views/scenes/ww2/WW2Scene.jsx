'use client';
import React, { useRef } from 'react';
import Scene from '../components/Scene';
import SceneItem from '../components/SceneItem';
import useMobile from '@/hooks/useMobile';

const IMAGES_URL = '/images/scenes/ww2/';

const WW2Scene = ({ animated = true, onCharClick }) => {
  const isMobile = useMobile();

  return (
    <Scene name="ww2">
      <div className="scene__back"></div>
      <div className="scene__main">
        <SceneItem url={IMAGES_URL + 'bg-2.webp'} addClass="mountain" fill />
        <SceneItem
          url={IMAGES_URL + 'forest-dust.zip'}
          addClass="forest"
          animate={animated}
        />
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'bg.webp'} addClass="city" fill />
        {!isMobile && (
          <>
            <SceneItem
              url={IMAGES_URL + 'fire.zip'}
              addClass="fire"
              animate={animated}
              fill
            />
            <SceneItem
              url={IMAGES_URL + 'smoke-l.zip'}
              addClass="smokeL"
              animate={animated}
              fill
            />
            <SceneItem
              url={IMAGES_URL + 'smoke-r.zip'}
              addClass="smokeR"
              animate={animated}
              fill
            />
            <SceneItem url={IMAGES_URL + 'stone.webp'} addClass="stone" />
            <SceneItem
              url={IMAGES_URL + 'soldier.zip'}
              addClass="soldier"
              speed={0.1}
              animate={animated}
            />
          </>
        )}
        <SceneItem
          url={IMAGES_URL + 'bullets.zip'}
          addClass="bullets"
          animate={animated}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'soldiers.zip'}
          addClass="soldiers"
          animate={animated}
          fill
        />

        <SceneItem
          url={IMAGES_URL + 'character.zip'}
          addClass="character"
          clickable
          controlHeight
          onClick={onCharClick}
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

export default WW2Scene;
