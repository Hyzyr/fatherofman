'use client';
import React, { useEffect, useState } from 'react';
import Preloader from './Preloader';
import AnimatedImage from '@/components/animatedImage/AnimatedImage';
import { PRELOADERS } from './constants';

const PreloaderScreen = () => {
  const [activeIndex, setActiveIndex] = useState(9);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     let newIndex =
  //       activeIndex + 1 === PRELOADERS.length ? 0 : activeIndex + 1;
  //     console.log({ activeIndex, length: PRELOADERS.length });
  //     console.log(
  //       activeIndex + 1,
  //       activeIndex,
  //       activeIndex + 1 === PRELOADERS.length
  //     );
  //     setActiveIndex(newIndex);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, [activeIndex, setActiveIndex]);

  return (
    <div className="preloader">
      <div className="preloader-fog"></div>
      {activeIndex !== undefined && (
        <Preloader data={PRELOADERS[activeIndex]} />
      )}
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
