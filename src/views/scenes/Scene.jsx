'use client';
import React from 'react';

const IMAGES_URL = '/images/scenes/';

const Scene = React.forwardRef(({ name = '', children }, ref) => {
  return (
    <div className={`scene ${name}`} ref={ref}>
      <div className="scene__bg">
        <img src={IMAGES_URL + 'sky.webp'} alt="sky" />
      </div>
      {children}
    </div>
  );
});

export default Scene;
