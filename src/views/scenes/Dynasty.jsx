'use client';
import React, { useRef } from 'react';
import Scene from './components/Scene';
import SceneItem from './components/SceneItem';

const IMAGES_URL = '/images/scenes/dynasty/';

const Dynasty = ({ animated = true, onCharClick }) => {
  return (
    <Scene name="dynasty">
      <div className="scene__back"></div>
      <div className="scene__main">
        <SceneItem
          url={IMAGES_URL + 'arrows.zip'}
          animate={animated}
          addClass="arrows"
          speed={0.1}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'city.zip'}
          animate={animated}
          addClass="city"
          speed={0.12}
          fill
        />
        <SceneItem url={IMAGES_URL + 'ground.webp'} addClass="ground" fill />
        <SceneItem
          url={IMAGES_URL + 'warriors.zip'}
          animate={animated}
          addClass="warriors"
          speed={0.12}
        />
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'road.webp'} addClass="road" fill />
        <SceneItem
          url={IMAGES_URL + 'sun-tzu.webp'}
          addClass="suntzu"
          controlHeight
        />
        <SceneItem
          url={IMAGES_URL + 'grass.zip'}
          animate={animated}
          speed={0.1}
          addClass="land"
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'dynasty-soldier.zip'}
          animate={animated}
          addClass="soldier"
          clickable
          onClick={onCharClick}
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'glows.zip'}
          animate={animated}
          addClass="glwos"
          speed={0.1}
        />
      </div>
    </Scene>
  );
};

export default Dynasty;
