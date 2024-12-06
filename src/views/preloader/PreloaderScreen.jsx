'use client';
import React, { useEffect, useState } from 'react';
import AnimatedImage from '@/components/animatedImage/AnimatedImage';

import ProgressBar from '@/components/ProgressBar';
import PreloaderSlider from './PreloaderSlider';
import PreloaderPopup from './PreloaderPopup';
import useSounds from '@/hooks/useSounds';

const PreloaderScreen = ({ progress, granted, setGranted, completed }) => {
  const [hydrated, setHydrated] = useState(false);
  const [error, setError] = useState(false);
  const timeout = React.useRef(null);

  const { playSound } = useSounds();

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  const showError = () => {
    clearTimeout(timeout.current);
    setError(true);
    playSound('/sounds/beep-choice-no.mp3');
    timeout.current = setTimeout(() => setError(false), 2000);
  };

  return (
    <>
      {completed && !granted && (
        <PreloaderPopup
          onConfirm={() => setGranted(true)}
          onCancel={() => showError(false)}
        />
      )}
      <div className={`preloader`}>
        <PreloaderSlider />
        <div className="preloader__progress">
          {completed && (
            <div
              className={`preloader__progress-img  ${error ? '_error' : ''}`}>
              <img
                src="/images/cursor/cursor-helper/following-cursor-normal.webp"
                alt="completed"
              />
              <img
                src="/images/cursor/cursor-helper/following-cursor-clicked.webp"
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
    </>
  );
};

export default PreloaderScreen;
