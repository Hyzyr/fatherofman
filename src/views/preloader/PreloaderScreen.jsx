'use client';
import React, { useEffect, useState } from 'react';
import AnimatedImage from '@/components/animatedImage/AnimatedImage';

import ProgressBar from '@/components/ProgressBar';
import PreloaderSlider from './PreloaderSlider';

const PreloaderScreen = () => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <div className="preloader">
      <PreloaderSlider suppressHydrationWarning />
      <div className="preloader__progress">
        <div className="preloader__progress-spinner">
          <AnimatedImage
            url="/images/animations/loader-monkey.zip"
            speed={0.14}
          />
        </div>
        <ProgressBar />
      </div>
    </div>
  );
};

export default PreloaderScreen;
