import AnimatedImage from '@/components/animatedImage/AnimatedImage';
import React from 'react';

const SceneItem = ({
  url,
  speed = 0.1,
  delay = 0,
  addClass = '',
  controlHeight = false,
  fill = false,
  clickable = false,
  onClick,
  animate = true,
}) => {
  if (!url || typeof url !== 'string') return null;
  let className = `scene__item ${addClass}`;
  className += controlHeight ? ' _height' : '';
  className += clickable ? ' _event' : '';
  className += fill ? ' _fill' : '';

  const onClickFunc = () => {
    if (clickable && onClick) onClick();
  };

  return (
    <div className={className} data-name={url} onClick={onClickFunc}>
      {url.endsWith('zip') && (
        <AnimatedImage
          url={url}
          speed={speed}
          delay={delay}
          animate={animate}
        />
      )}
      {clickable && (
        <div className="scene__item-arrow">
          <img src={'/images/components/click-him.webp'} alt="arrow" />
        </div>
      )}
      {!url.endsWith('zip') && <img src={url} alt={url.split('.')[0]} />}
    </div>
  );
};

export default SceneItem;
