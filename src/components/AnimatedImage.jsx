'use client';
import React, { useId, useRef } from 'react';

const AnimatedPng = ({}) => {
  const ref = useRef();
  const id = useId();

  useEffect(() => {}, []);

  return (
    <div className="ratioImage" ref={ref}>
      <canvas id={`canvas-${id}`}></canvas>
    </div>
  );
};

export default AnimatedPng;
