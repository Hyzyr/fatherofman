'use client';
import React, { useMemo } from 'react';
import Scene from '../components/Scene';
import FrameScene from '../components/FrameScene';
import useMobile from '@/hooks/useMobile';
import { getWW2Layers } from './layers';

const WW2Scene = ({ animated = true, onCharClick }) => {
  const isMobile = useMobile();
  const layers = useMemo(
    () => getWW2Layers({ animated, onCharClick, isMobile }),
    [animated, isMobile, onCharClick]
  );

  return (
    <Scene name="ww2">
      <div className="scene__back"></div>
      <div className="scene__main">
        <FrameScene layers={layers} animated={animated} />
      </div>
      <div className="scene__front"></div>
    </Scene>
  );
};

export default WW2Scene;
