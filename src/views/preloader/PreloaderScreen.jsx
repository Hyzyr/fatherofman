'use client';
import React from 'react';
import Preloader from './Preloader';
import AnimatedImage from '@/components/animatedImage/AnimatedImage';

const PreloaderScreen = () => {
  return (
    <div className="preloader">
      <div className="preloader-fog"></div>
      <Preloader />
      <div className="preloader__spinner">
        <AnimatedImage
          url="/images/animations/loader-monkey.zip"
          speed={0.095}
        />
      </div>
    </div>
  );
};

export default PreloaderScreen;
