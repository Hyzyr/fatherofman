'use client';
import React from 'react';
import Scene from '../components/Scene';
import SceneItem from '../components/SceneItem';
import SceneVideo from '../components/SceneVideo';
import { screenVideos } from './constants';

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
          <SceneItem
            url={IMAGES_URL + 'vid-him-bleach.zip'}
            animate={animated}
            delay={1}
            addClass="vid left1"
            speed={0.135}
            fill
          />
          <SceneItem
            url={IMAGES_URL + 'vide-youre-not-him.zip'}
            animate={animated}
            delay={1}
            addClass="vid left2"
            speed={0.135}
            fill
          />
          <SceneItem
            url={IMAGES_URL + 'vid-pussy-destroyer.zip'}
            animate={animated}
            delay={1}
            addClass="vid left3"
            speed={0.135}
            fill
          />
          <SceneItem
            url={IMAGES_URL + 'vid-him-evangelion.zip'}
            animate={animated}
            delay={1}
            addClass="vid left4"
            speed={0.135}
            fill
          />

          <SceneItem
            url={IMAGES_URL + 'vid-i-am-father.zip'}
            animate={animated}
            delay={1}
            addClass="vid right1"
            speed={0.135}
            fill
          />
          <SceneItem
            url={IMAGES_URL + 'vid-not-a-movie.zip'}
            animate={animated}
            delay={1}
            addClass="vid right2"
            speed={0.135}
            fill
          />
          <SceneItem
            url={IMAGES_URL + 'vid-not-a-movie.zip'}
            animate={animated}
            delay={1}
            addClass="vid right3"
            speed={0.135}
            fill
          />
          <SceneItem
            url={IMAGES_URL + 'vid-him-fighter.zip'}
            animate={animated}
            delay={1}
            addClass="vid right4"
            speed={0.135}
            fill
          />
        </SceneItem>
        <SceneItem
          url={IMAGES_URL + 'flag.webp'}
          animate={animated}
          addClass="flag"
          controlHeight
        />
      </div>
      <div className="scene__front">
        <SceneItem
          url={IMAGES_URL + 'taxi-cropped.zip'}
          animate={animated}
          addClass="taxi"
          delay={2.5}
          fill
        />
        <SceneItem url={IMAGES_URL + 'building.webp'} addClass="building" fill>
          <SceneItem
            url={IMAGES_URL + 'vid-dont-copy-my-flow.zip'}
            animate={animated}
            delay={1}
            addClass="vid mid1"
            speed={0.135}
            fill
          />
          <SceneItem
            url={IMAGES_URL + 'vid-him-wukong.zip'}
            animate={animated}
            delay={1}
            addClass="vid mid2"
            speed={0.135}
            fill
          />
          <SceneItem
            url={IMAGES_URL + 'vid-him-the-last-aurabender.zip'}
            animate={animated}
            delay={1}
            addClass="vid mid3"
            speed={0.135}
            fill
          />
        </SceneItem>
        <SceneItem url={IMAGES_URL + 'ground.webp'} addClass="ground" fill />

        <SceneItem
          url={IMAGES_URL + 'officer.zip'}
          animate={animated}
          addClass="officer"
          controlHeight
          delay={1}
        />
        <SceneItem
          url={IMAGES_URL + 'people.zip'}
          animate={animated}
          addClass="people"
          delay={1}
          controlHeight
          // speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'character.zip'}
          animate={animated}
          addClass="character"
          clickable
          onClick={onCharClick}
          controlHeight
          delay={1}
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
        />
        <SceneItem
          url={IMAGES_URL + 'smoke.zip'}
          animate={animated}
          addClass="smokeL"
          controlHeight
        />
        <SceneItem
          url={IMAGES_URL + 'foreground.webp'}
          addClass="foreground"
          fill
        />
        {/* <SceneItem
          url={IMAGES_URL + 'walking-people.zip'}
          animate={animated}
          addClass="foreground2"
          fill
        /> */}
      </div>
    </Scene>
  );
};

export default NYCScene;
