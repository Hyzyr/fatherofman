'use client';
import React, { useRef } from 'react';
import Scene from '../components/Scene';
import SceneItem from '../components/SceneItem';

const IMAGES_URL = '/images/scenes/prehystoric/';

const PrehystoricScene = ({ animated = true, onCharClick }) => {
  return (
    <Scene name="prehystoric">
      <div className="scene__back"></div>
      <div className="scene__main">
        <SceneItem
          url={IMAGES_URL + 'ptero.zip'}
          animate={animated}
          addClass="ptero"
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'smoke.zip'}
          animate={animated}
          addClass="smoke"
          speed={0.08}
        />
        <SceneItem url={IMAGES_URL + 'volcano.webp'} addClass="volcano" fill />
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'ground-2.webp'} addClass="ground" fill />
        <SceneItem url={IMAGES_URL + 'mid-ground.webp'} addClass="ground-mid" />
        <SceneItem
          url={IMAGES_URL + 'dinos.zip'}
          animate={animated}
          addClass="dinos"
          speed={0.1}
          delay={0.2}
        />
        <SceneItem
          url={IMAGES_URL + 'snake-tree.zip'}
          animate={animated}
          addClass="tree"
          controlHeight
          speed={0.13}
        />
        <SceneItem
          url={IMAGES_URL + 'character.zip'}
          animate={animated}
          addClass="character"
          clickable
          onClick={onCharClick}
          delay={0.6}
          speed={0.06}
        />
        <SceneItem
          url={IMAGES_URL + 'palms.zip'}
          animate={animated}
          addClass="palms"
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'grass.zip'}
          animate={animated}
          addClass="grass"
          speed={0.08}
        />
        <SceneItem
          url={IMAGES_URL + 'silhouette-l.zip'}
          animate={animated}
          addClass="silhouetteL"
          speed={0.16}
          fill
        />
        <SceneItem
          url={IMAGES_URL + 'silhouette-r.zip'}
          animate={animated}
          addClass="silhouetteR"
          speed={0.16}
          fill
        />
      </div>
    </Scene>
  );
};

export default PrehystoricScene;
