'use client';
import React, { useRef } from 'react';
import Scene from '../components/Scene';
import SceneItem from '../components/SceneItem';
import useMobile from '@/hooks/useMobile';

const IMAGES_URL = '/images/scenes/prehystoric/';

const PrehystoricScene = ({ animated = true, onCharClick }) => {
  const isMobile = useMobile();

  return (
    <Scene name="prehystoric">
      <div className="scene__back"></div>
      <div className="scene__main">
        <SceneItem
          url={IMAGES_URL + 'ptero.zip'}
          animate={animated}
          addClass="ptero"
          speed={0.06}
        />
        <SceneItem
          url={IMAGES_URL + 'smoke.zip'}
          animate={animated}
          addClass="smoke"
          fill
        />
        <SceneItem url={IMAGES_URL + 'volcano.webp'} addClass="volcano" fill />
      </div>
      <div className="scene__front">
        <SceneItem url={IMAGES_URL + 'ground-2.webp'} addClass="ground" fill />
        <SceneItem url={IMAGES_URL + 'mid-ground.webp'} addClass="ground-mid" />
        <SceneItem
          url={IMAGES_URL + 'brachiosaurus.zip'}
          animate={animated}
          controlHeight={isMobile}
          addClass="brachiosaurus"
          delay={0.2}
        />
        <SceneItem
          url={IMAGES_URL + 'small-raptor-cropped.zip'}
          animate={animated}
          controlHeight={isMobile}
          addClass="raptor-small"
          delay={0.2}
        />
        <SceneItem
          url={IMAGES_URL + 'trex.zip'}
          animate={animated}
          controlHeight={isMobile}
          addClass="trex"
          delay={0.2}
        />
        <SceneItem
          url={IMAGES_URL + 'yellow-raptor.zip'}
          animate={animated}
          controlHeight={isMobile}
          addClass="raptor"
          delay={0.2}
        />
        {!isMobile && (
          <SceneItem
            url={IMAGES_URL + 'snake-tree.zip'}
            animate={animated}
            addClass="tree"
            controlHeight
            speed={0.1}
          />
        )}
        <SceneItem
          url={IMAGES_URL + 'character.zip'}
          animate={animated}
          addClass="character2"
          controlHeight
          clickable
          onClick={onCharClick}
          delay={0.6}
          speed={0.06}
        />
        <SceneItem
          url={IMAGES_URL + 'palms.zip'}
          animate={animated}
          addClass="palms"
        />
        <SceneItem
          url={IMAGES_URL + 'silhouette-r.zip'}
          animate={animated}
          addClass="silhouetteR"
          speed={0.1}
          fill
        />
        {!isMobile && (
          <>
            <SceneItem
              url={IMAGES_URL + 'grass.zip'}
              animate={animated}
              addClass="grass"
            />
            <SceneItem
              url={IMAGES_URL + 'silhouette-l.zip'}
              animate={animated}
              addClass="silhouetteL"
              speed={0.1}
              fill
            />
          </>
        )}
      </div>
    </Scene>
  );
};

export default PrehystoricScene;
