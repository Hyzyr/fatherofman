import React, { useState } from 'react';
import { screenVideos } from '../nyc/constants';
import { getRandomToN } from '@/utils/random';

const SceneVideo = ({
  addClass = '',
  controlHeight = false,
  fill = false,
  play = true,
  videoURL,
}) => {
  const [loaded, setLoaded] = useState(false);
  const video = React.useMemo(() => {
    if (videoURL) return videoURL;
    let index = getRandomToN(screenVideos.length);
    return screenVideos[index];
  }, [videoURL]);
  const ref = React.useRef(null);

  let className = `scene__video ${addClass}`;
  className += controlHeight ? ' _height' : '';
  className += fill ? ' _fill' : '';

  const onClickFunc = () => {
    if (clickable && onClick) onClick();
  };

  return (
    <div className={className} data-name={addClass} onClick={onClickFunc}>
      {!loaded && (
        <div className="scene__video-thumb">
          <img src={`/videos/thumb/${video?.thumb ?? ''}`} alt="video thumbn" />
        </div>
      )}
      {play && (
        <video
          ref={ref}
          src={`/videos/${video.src}`}
          muted
          loop
          autoPlay={play}
          onCanPlayThrough={() => {
            console.log('Video has loaded');
            setLoaded(true);
          }}
        />
      )}
    </div>
  );
};

export default SceneVideo;
