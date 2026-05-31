'use client';
import React from 'react';

const Scene = ({ name = '', forwardRef, children, ...props }) => {
  return (
    <div className={`scene optimize ${name}`} ref={forwardRef} {...props}>
      {children}
    </div>
  );
};

export default Scene;
