'use client';
import React, { useRef } from 'react';
import Scene from './components/Scene';
import SceneItem from './components/SceneItem';
import useCameraAnimations from './hooks/useCameraAnimations';

const IMAGES_URL = '/images/scenes/prehystoric/';

const Prehystoric = ({ animated = true, onCharClick }) => {
  const ref = useRef(null);
  useCameraAnimations({ animated, wrapper: ref });

  return (
    <Scene name="prehystoric" forwardRef={ref}>
      <div className="scene__back">
        <SceneItem
          url={IMAGES_URL + 'ptero.zip'}
          animate={animated}
          addClass="ptero"
          speed={0.1}
        />
      </div>
      <div className="scene__main">
        <SceneItem
          url={IMAGES_URL + 'smoke.zip'}
          animate={animated}
          addClass="smoke"
          speed={0.1}
        />
        <SceneItem url={IMAGES_URL + 'volcano.webp'} addClass="volcano" fill />
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'ground.webp'} addClass="ground" fill />
        <SceneItem
          url={IMAGES_URL + 'dinos.zip'}
          animate={animated}
          addClass="dinos"
          speed={0.13}
        />
        <SceneItem url={IMAGES_URL + 'mid-ground.webp'} addClass="ground-mid" />
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
          speed={0.1}
        />
        <SceneItem
          url={IMAGES_URL + 'palms.zip'}
          animate={animated}
          addClass="palms"
          speed={0.13}
        />
        <SceneItem
          url={IMAGES_URL + 'grass.zip'}
          animate={animated}
          addClass="grass"
          speed={0.1}
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

export default Prehystoric;
