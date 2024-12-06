import AnimatedImage from '@/components/animatedImage/AnimatedImage';
import React, { useEffect, useState } from 'react';
import { videosData } from '../nyc/constants';
import { getRandomToN } from '@/utils/random';

const SceneVideo = ({
  addClass = '',
  controlHeight = false,
  fill = false,
  animate = true,
}) => {
  const [loaded, setLoaded] = useState(false);
  const video = React.useMemo(() => {
    let index = getRandomToN(videosData.length);
    return videosData[index];
  }, []);
  const ref = React.useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    console.log('add load listener');
    const onload = () => {
      console.log('Video has loaded');
      setLoaded(true);
    };
    ref.current.addEventListener('loadeddata', onload);
    return () => ref.current.removeEventListener('loadeddata', onload);
  }, []);

  let className = `scene__video ${addClass}`;
  className += controlHeight ? ' _height' : '';
  className += fill ? ' _fill' : '';

  const onClickFunc = () => {
    if (clickable && onClick) onClick();
  };

  return (
    <div className={className} data-name={addClass} onClick={onClickFunc}>
      {/* {!loaded && (
        <div className="scene__video-thumb">
          <img src={`/videos/thumb/${video.img}`} alt="video thumbn" />
        </div>
      )} */}
      <video
        ref={ref}
        src={`/videos/${video.video}`}
        muted
        loop
        autoPlay
        onLoad={() => {
          console.log('Video has loaded');
          setLoaded(true);
        }}
      />
    </div>
  );
};

export default SceneVideo;
