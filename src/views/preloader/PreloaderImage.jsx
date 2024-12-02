'use client';
import React from 'react';

const PreloaderImage = ({ img, id, children, ...style }) => {
  const getStyles = () => {
    return {
      top: style.top !== undefined ? `${style.top}%` : 'unset',
      right: style.right !== undefined ? `${style.right}%` : 'unset',
      bottom: style.bottom !== undefined ? `${style.bottom}%` : 'unset',
      left: style.left !== undefined ? `${style.left}%` : 'unset',
      width: style.width !== undefined ? `${style.width}%` : 'auto',
      height: style.height !== undefined ? `${style.height}%` : 'auto',
    };
  };

  return (
    <div className="preloader__img" id={id} style={getStyles()}>
      {img && (
        <img
          suppressHydrationWarning
          src={'/images/preloader/' + img}
          alt="preloader-bg"
          style={{
            width: style.width !== undefined ? `100%` : 'auto',
            height: style.height !== undefined ? `100%` : 'auto',
          }}
        />
      )}
      {children && children}
    </div>
  );
};

export default PreloaderImage;
