'use client';
import React, { useMemo } from 'react';
import Scene from '../components/Scene';
import FrameScene from '../components/FrameScene';
import useMobile from '@/hooks/useMobile';
import { getNYCLayers } from './layers';

const NYCScene = ({ animated = true, onCharClick }) => {
  const isMobile = useMobile();
  const layers = useMemo(
    () => getNYCLayers({ animated, onCharClick, isMobile }),
    [animated, isMobile, onCharClick]
  );

  return (
    <Scene name="nyc">
      <div className="scene__back"></div>
      <div className="scene__main">
        <FrameScene layers={layers} animated={animated} />
      </div>
      <div className="scene__front"></div>
    </Scene>
  );
};

export default NYCScene;
