'use client';
import React, { memo, useEffect, useRef } from 'react';
import useAnimatedImages from './useAnimatedImages';

const useCanvas = false;
const AnimatedImage = ({
  url,
  speed = 0.04,
  delay = 0,
  animate = true,
  ...props
}) => {
  const index = useRef(0);
  const ref = useRef();

  const { images } = useAnimatedImages({ url });
  const updateCanvas = (img) => {
    const canvas = ref.current;
    canvas.width = img.width;
    canvas.height = img.height;
    if (!useCanvas) canvas.src = img.src;
    else {
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
    }
  };

  useEffect(() => {
    let timout = null;
    if (!images || images.length === 0) return;

    function showNextImage() {
      let currentImage = index.current;
      if (currentImage === images.length) {
        currentImage = 0;
        index.current = 0;
      }
      requestAnimationFrame(() => updateCanvas(images[currentImage]));

      index.current += 1;
      let addDelay = 0;
      if (index.current === images.length - 1) addDelay = delay;
      if (!animate) return;
      timout = setTimeout(showNextImage, speed * 1000 + addDelay * 1000);
    }
    showNextImage();
    return () => clearTimeout(timout);
  }, [images, animate]);
  if (!url) return null;

  if (useCanvas) return <canvas className={'animatedCanvas'} ref={ref} />;
  return <img className={'animatedCanvas'} ref={ref} />;
};

export default memo(AnimatedImage);
