'use client';
import React, { useRef } from 'react';
import Scene from '../components/Scene';
import SceneItem from '../components/SceneItem';

const IMAGES_URL = '/images/scenes/dynasty/';

const DynastyScene = ({ animated = true, onCharClick }) => {
  return (
    <Scene name="dynasty" id="dynasty">
      <div className="scene__back"></div>
      <div className="scene__main">
        <SceneItem url={IMAGES_URL + 'ground2.webp'} addClass="ground" fill />
        <SceneItem
          url={IMAGES_URL + 'warriors-cropped.zip'}
          animate={animated}
          addClass="warriors"
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'city.png'}
          animate={animated}
          addClass="city">
          <SceneItem
            url={IMAGES_URL + 'dynasty-flag.zip'}
            animate={animated}
            addClass="flag flag1"
            speed={0.04}
            fill
          />
          <SceneItem
            url={IMAGES_URL + 'dynasty-flag.zip'}
            animate={animated}
            addClass="flag flag2"
            speed={0.04}
            fill
          />
          <SceneItem
            url={IMAGES_URL + 'dynasty-flag.zip'}
            animate={animated}
            addClass="flag flag3"
            speed={0.04}
            fill
          />
          <SceneItem
            url={IMAGES_URL + 'dynasty-flag.zip'}
            animate={animated}
            addClass="flag flag4"
            speed={0.04}
            fill
          />
        </SceneItem>
       
        {/* <SceneItem
          url={IMAGES_URL + 'arrows.zip'}
          animate={animated}
          addClass="arrows"
          speed={0.04}
          fill
        /> */}
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'road.webp'} addClass="road" fill />
        <SceneItem
          url={IMAGES_URL + 'sun-tzu.webp'}
          addClass="suntzu"
          controlHeight
        />
        <SceneItem
          url={IMAGES_URL + 'grass.webp'}
          animate={animated}
          addClass="land"
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'grass-moving.zip'}
          animate={animated}
          speed={0.06}
          addClass="land"
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'dynasty-soldier.zip'}
          animate={animated}
          addClass="soldier"
          clickable
          controlHeight
          onClick={onCharClick}
        />
        <SceneItem
          url={IMAGES_URL + 'glows.zip'}
          animate={animated}
          addClass="glows"
        />
      </div>
    </Scene>
  );
};

export default DynastyScene;
