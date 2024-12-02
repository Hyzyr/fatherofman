import React, { useEffect, useRef, useState } from 'react';
import { PRELOADERS } from './constants';
import { getRandomToN } from '@/utils/random';
import Preloader from './Preloader';
import useNextSlide from './useNextSlide';
import gsap from 'gsap';

const initialIndex = getRandomToN(PRELOADERS.length);
const initialNextInex = getRandomToN(PRELOADERS.length, initialIndex);
const interval = 200;

const MIN_DELAY = 6;
const PreloaderSlider = () => {
  const timePrev = useRef(null);
  const timeline = useRef(null);
  const fogRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [nextIndex, setNextIndex] = useState(null);

  const { loaded, error } = useNextSlide({ data: PRELOADERS[nextIndex] });

  const getTimeline = () => {
    if (timeline.current === null) timeline.current = gsap.timeline();
    return timeline.current;
  };
  const getPrevTime = () => {
    if (timePrev.current === null) timePrev.current = new Date().getTime();
    return timePrev.current;
  };
  const updatePreloader = () => {
    const tl = getTimeline();

    tl.to(fogRef.current, {
      opacity: 1,
      duration: 0.7,
      onComplete: () => {
        setActiveIndex(nextIndex);
        setNextIndex(getRandomToN(PRELOADERS.length, nextIndex));
      },
    })
      .fromTo(
        document.querySelectorAll('.preloader__img'),
        { opacity: 1 },
        { opacity: 0, duration: 0.3, delay: 0.3 },
        '<'
      )
      .to(fogRef.current, {
        opacity: 0,
        duration: 0.5,
      });
  };

  useEffect(() => {
    if (nextIndex === null) setNextIndex(getRandomToN(PRELOADERS.length));
  }, []);

  useEffect(() => {
    const checkUpdates = () => {
      let lastCallTime = getPrevTime();
      const currentTime = new Date().getTime();
      if (activeIndex && currentTime - lastCallTime <= MIN_DELAY * 1000) return;

      if (error) setNextIndex(getRandomToN(PRELOADERS.length, activeIndex));
      if (loaded) {
        timePrev.current = new Date().getTime();
        clearInterval(interval);
        updatePreloader();
      }
    };

    const interval = setInterval(() => checkUpdates(), 100);
    return () => clearInterval(interval);
  }, [loaded, error, activeIndex]);

  return (
    <>
      <div className="preloader-fog" ref={fogRef}></div>
      <Preloader
        suppressHydrationWarning
        data={PRELOADERS[activeIndex]}
        key={`preloader-${activeIndex}`}
      />
    </>
  );
};

export default PreloaderSlider;
