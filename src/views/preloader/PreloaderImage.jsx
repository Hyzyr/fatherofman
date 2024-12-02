'use client';
import React, { memo } from 'react';

const PreloaderImage = memo(({ img, id, ...style }) => {
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
  const getImgStyles = () => {
    return {
      //   width: style.width ? `${style.width}%` : 'auto',
      //   height: style.height ? `${style.height}%` : 'auto',
    };
  };

  return (
    <div className="preloader__img" id={id} style={getStyles()}>
      <img src={img} alt="preloader-bg" style={getImgStyles()} />
    </div>
  );
});

export default PreloaderImage;
