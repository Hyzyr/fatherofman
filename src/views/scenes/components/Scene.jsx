'use client';
import React from 'react';


const Scene = ({ name = '', forwardRef, children }) => {
  return (
    <div className={`scene ${name}`} ref={forwardRef}>
      {children}
    </div>
  );
};

export default Scene;
