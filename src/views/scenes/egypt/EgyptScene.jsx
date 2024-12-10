'use client';
import React, { useRef } from 'react';
import Scene from '../components/Scene';
import SceneItem from '../components/SceneItem';
import useMobile from '@/hooks/useMobile';

const IMAGES_URL = '/images/scenes/egypt/';

const EgyptScene = ({ animated = true, onCharClick }) => {
  const isMobile = useMobile();

  return (
    <Scene name="egypt">
      <div className="scene__back">
        {!isMobile && (
          <SceneItem
            url={IMAGES_URL + 'birds.zip'}
            animate={animated}
            addClass="birds"
          />
        )}
        <SceneItem
          url={IMAGES_URL + 'birds-2.zip'}
          animate={animated}
          addClass="birds2"
        />
      </div>
      <div className="scene__main">
        <SceneItem
          url={IMAGES_URL + 'egypt-static.png'}
          animate={animated}
          addClass="pyramids"
          fill>
          {!isMobile && (
            <SceneItem
              url={IMAGES_URL + 'vawes.zip'}
              addClass="vawes"
              fill
              speed={0.06}
            />
          )}
        </SceneItem>
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'sphinx2.webp'} addClass="sphinx" />
        <SceneItem url={IMAGES_URL + 'sand.webp'} addClass="ground" fill />
        <SceneItem
          url={IMAGES_URL + 'grass.zip'}
          animate={animated}
          addClass="grass"
        />
        <SceneItem url={IMAGES_URL + 'cactus-front.webp'} addClass="cactus" />
        <SceneItem
          url={IMAGES_URL + 'foreground-egypt.webp'}
          addClass="foreground"
          fill
        />

        <SceneItem
          url={IMAGES_URL + 'grass.zip'}
          animate={animated}
          addClass="grass2"
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'chararacter.zip'}
          animate={animated}
          addClass="chararacter"
          clickable
          controlHeight
          onClick={onCharClick}
        />
      </div>
    </Scene>
  );
};

export default EgyptScene;
