'use client';
import React, { useEffect, useState } from 'react';
import AnimatedImage from '@/components/animatedImage/AnimatedImage';

import ProgressBar from '@/components/ProgressBar';
import PreloaderSlider from './PreloaderSlider';

const PreloaderScreen = ({ progress, error, completed }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <div className={`preloader`}>
      <PreloaderSlider />
      <div className="preloader__progress">
        {completed && (
          <div className={`preloader__progress-img  ${error ? '_error' : ''}`}>
            <img
              src="/images/cursor/cursor-helper/following-cursor-normal.png"
              alt="completed"
            />
            <img
              src="/images/cursor/cursor-helper/following-cursor-clicked.png"
              alt="completed"
            />
          </div>
        )}
        {!completed && (
          <div className="preloader__progress-spinner">
            <AnimatedImage
              url="/images/animations/loader-monkey.zip"
              speed={0.14}
            />
          </div>
        )}
        <ProgressBar percentage={progress} />
      </div>
    </div>
  );
};

export default PreloaderScreen;
