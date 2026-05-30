'use client';
import React, { useMemo } from 'react';
import Scene from '../components/Scene';
import FrameScene from '../components/FrameScene';
import useMobile from '@/hooks/useMobile';
import { getEgyptLayers } from './layers';

const EgyptScene = ({ animated = true, onCharClick }) => {
  const isMobile = useMobile();
  const layers = useMemo(
    () => getEgyptLayers({ animated, onCharClick, isMobile }),
    [animated, isMobile, onCharClick]
  );

  return (
    <Scene name="egypt">
      <div className="scene__back"></div>
      <div className="scene__main">
        <FrameScene layers={layers} animated={animated} />
      </div>
      <div className="scene__front"></div>
    </Scene>
  );
};

export default EgyptScene;
