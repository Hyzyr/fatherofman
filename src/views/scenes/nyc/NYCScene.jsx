'use client';
import React, { useRef } from 'react';
import Scene from '../components/Scene';
import SceneItem from '../components/SceneItem';
import SceneVideo from '../components/SceneVideo';

const IMAGES_URL = '/images/scenes/nyc/';

const NYCScene = ({ animated = true, onCharClick }) => {
  return (
    <Scene name="nyc">
      <div className="scene__back"></div>
      <div className="scene__main">
        <SceneItem
          url={IMAGES_URL + 'buildings.webp'}
          addClass="buildings"
          fill>
          <SceneVideo addClass="left1" />
          <SceneVideo addClass="left2" />
          <SceneVideo addClass="left3" />
          <SceneVideo addClass="right1" />
          <SceneVideo addClass="right2" />
          <SceneVideo addClass="right3" />
          <SceneVideo addClass="right4" />
        </SceneItem>
        <SceneItem
          url={IMAGES_URL + 'flag.zip'}
          animate={animated}
          addClass="flag"
          controlHeight
        />
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'building.webp'} addClass="building" fill>
          <SceneVideo addClass="mid1" />
          <SceneVideo addClass="mid2" />
          <SceneVideo addClass="mid3" />
          <SceneVideo addClass="mid4" />
        </SceneItem>
        <SceneItem url={IMAGES_URL + 'ground.webp'} addClass="ground" fill />
        <SceneItem
          url={IMAGES_URL + 'taxi.zip'}
          animate={animated}
          addClass="taxi"
          delay={1}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'officer.zip'}
          animate={animated}
          addClass="officer"
          controlHeight
        />
        <SceneItem
          url={IMAGES_URL + 'people.zip'}
          animate={animated}
          addClass="people"
          controlHeight
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'character.zip'}
          animate={animated}
          addClass="character"
          clickable
          onClick={onCharClick}
          controlHeight
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'person.zip'}
          animate={animated}
          addClass="person"
          controlHeight
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'smoke-r.zip'}
          animate={animated}
          addClass="smokeR"
          controlHeight
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'smoke.zip'}
          animate={animated}
          addClass="smokeL"
          controlHeight
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'foreground.webp'}
          addClass="foreground"
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'walking-people.zip'}
          animate={animated}
          addClass="foreground2"
          fill
        />
      </div>
    </Scene>
  );
};

export default NYCScene;
