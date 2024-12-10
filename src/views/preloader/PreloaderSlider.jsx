import React, { useEffect, useRef, useState } from 'react';
import { PRELOADERS } from './constants';
import Preloader from './Preloader';
import useNextSlide from './useNextSlide';
import gsap from 'gsap';

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
  const updatePreloader = () => {
    const tl = getTimeline();

    tl.to(fogRef.current, {
      opacity: 1,
      duration: 0.7,
      onComplete: () => {
        setActiveIndex(nextIndex);
        setNextIndex(getNextIndex(nextIndex));
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
        delay: 0.1,
      });
  };
  const getNextIndex = (currentIndex = activeIndex) => {
    return currentIndex + 1 === PRELOADERS.length ? 0 : currentIndex + 1;
  };

  useEffect(() => {
    if (nextIndex === null) setNextIndex(0);
  }, []);

  useEffect(() => {
    const checkUpdates = () => {
      if (window.pausePreloader) return;
      let lastCallTime = timePrev.current;
      const currentTime = new Date().getTime();
      if (
        activeIndex !== null &&
        lastCallTime &&
        currentTime - lastCallTime <= MIN_DELAY * 1000
      )
        return;
      if (error) setNextIndex(getNextIndex(nextIndex));
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
