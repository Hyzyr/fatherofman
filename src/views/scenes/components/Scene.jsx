'use client';
import React from 'react';

const IMAGES_URL = '/images/scenes/';

const Scene = ({ name = '', forwardRef, children }) => {
  return (
    <div className={`scene ${name}`} ref={forwardRef}>
      <div className="scene__bg">
        <img src={IMAGES_URL + 'sky.webp'} alt="sky" />
      </div>
      {children}
    </div>
  );
};

export default Scene;
