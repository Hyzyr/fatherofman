'use client';
import React, { memo } from 'react';

const PreloaderImage = ({ img, id, children, ...style }) => {
  const getStyles = () => {
    return {
      top: style.top ? `${style.top}%` : 'unset',
      right: style.right ? `${style.right}%` : 'unset',
      bottom: style.bottom ? `${style.bottom}%` : 'unset',
      left: style.left ? `${style.left}%` : 'unset',
      width: style.width ? `${style.width}%` : 'auto',
      height: style.height ? `${style.height}%` : 'auto',
    };
  };

  return (
    <div className="preloader__img" id={id} style={getStyles()}>
      {img && <img src={img} alt="preloader-bg" />}
      {children && children}
    </div>
  );
};

export default memo(PreloaderImage);
