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
}) => {
  if (!url || typeof url !== 'string') return null;
  let className = `scene__item ${addClass}`;
  className += controlHeight ? ' _height' : '';
  className += clickable ? ' _event' : '';
  className += fill ? ' _fill' : '';

  return (
    <div className={className} data-name={url}>
      {url.endsWith('zip') && <AnimatedImage url={url} speed={speed}  delay={delay}/>}
      {!url.endsWith('zip') && <img src={url} alt={url.split('.')[0]} />}
    </div>
  );
};

export default SceneItem;
