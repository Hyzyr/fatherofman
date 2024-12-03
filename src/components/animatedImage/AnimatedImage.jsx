'use client';
import React, { memo, useEffect, useRef } from 'react';
import useAnimatedImages from './useAnimatedImages';

const AnimatedImage = ({ url, speed, ...props }) => {
  const index = useRef(0);
  const ref = useRef();

  const { images } = useAnimatedImages({ url });
  const updateCanvas = (img) => {
    const canvas = ref.current;
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
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
      updateCanvas(images[currentImage]);

      index.current += 1;
      timout = setTimeout(showNextImage, speed * 1000);
    }
    showNextImage();
    return () => clearTimeout(timout);
  }, [images]);
  if (!url) return null;

  return <canvas ref={ref} />;
};

export default memo(AnimatedImage);
