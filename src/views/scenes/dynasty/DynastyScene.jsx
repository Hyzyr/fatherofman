'use client';
import React, { useMemo } from 'react';
import Scene from '../components/Scene';
import FrameScene from '../components/FrameScene';
import { getDynastyLayers } from './layers';

const DynastyScene = ({ animated = true, onCharClick }) => {
  const layers = useMemo(
    () => getDynastyLayers({ animated, onCharClick }),
    [animated, onCharClick]
  );

  return (
    <Scene name="dynasty" id="dynasty">
      <div className="scene__back"></div>
      <div className="scene__main">
        <FrameScene layers={layers} animated={animated} />
      </div>
      <div className="scene__front"></div>
    </Scene>
  );
};

export default DynastyScene;
