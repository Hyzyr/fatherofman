'use client';
import { FrameSequence, useFrameSequenceControls } from 'frameloom/react';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useAnimatedImages from './useAnimatedImages';

const AnimatedImage = ({
  url,
  speed = 0.04,
  delay = 0,
  animate = true,
  layout = 'width',
  objectFit = 'contain',
  className = '',
  style,
  ...props
}) => {
  const { images } = useAnimatedImages({ url });
  const sequence = useFrameSequenceControls();
  const timeout = useRef(null);
  const [loadedSequenceKey, setLoadedSequenceKey] = useState('');
  const [aspectRatio, setAspectRatio] = useState(null);
  const frameUrls = useMemo(() => images || [], [images]);
  const sequenceKey = useMemo(() => frameUrls.join('\n'), [frameUrls]);
  const canvasClassName = ['animatedCanvas', className].filter(Boolean).join(' ');
  const canvasStyle = useMemo(() => {
    const layoutStyle =
      layout === 'fill'
        ? { width: '100%', height: '100%' }
        : layout === 'height'
          ? { width: 'auto', height: '100%' }
          : { width: '100%', height: 'auto' };

    return {
      ...layoutStyle,
      ...(aspectRatio ? { aspectRatio } : {}),
      ...style,
    };
  }, [aspectRatio, layout, style]);

  const stopAnimation = useCallback(() => {
    clearTimeout(timeout.current);
    timeout.current = null;
    sequence.ref.current?.pause();
  }, [sequence]);

  const startAnimation = useCallback(() => {
    stopAnimation();

    const frameCount = frameUrls.length;
    let frame = 0;
    const interval = Math.max(0, speed) * 1000;
    const loopDelay = Math.max(0, delay) * 1000;

    const showFrame = () => {
      sequence.ref.current?.setFrame(frame);

      if (!animate || frameCount <= 1) return;

      const isLastFrame = frame >= frameCount - 1;
      frame = isLastFrame ? 0 : frame + 1;
      timeout.current = setTimeout(
        showFrame,
        interval + (isLastFrame ? loopDelay : 0)
      );
    };

    showFrame();
  }, [animate, delay, frameUrls.length, sequence, speed, stopAnimation]);

  useEffect(() => {
    if (!sequenceKey || loadedSequenceKey !== sequenceKey) return;

    startAnimation();
    return stopAnimation;
  }, [loadedSequenceKey, sequenceKey, startAnimation, stopAnimation]);

  if (!url) return null;

  if (frameUrls.length === 0) {
    return (
      <canvas
        className={canvasClassName}
        aria-hidden="true"
        style={canvasStyle}
        {...props}
      />
    );
  }

  return (
    <FrameSequence
      ref={sequence.ref}
      images={frameUrls}
      loading="preload"
      objectFit={objectFit}
      className={canvasClassName}
      style={canvasStyle}
      decorative
      onLoadComplete={(frames) => {
        const [firstFrame] = frames;

        if (firstFrame?.width && firstFrame?.height) {
          setAspectRatio(`${firstFrame.width} / ${firstFrame.height}`);
        }

        setLoadedSequenceKey(sequenceKey);
      }}
      onLoadError={(err) => {
        console.log('ERROR rendering sequence : ', url);
        console.log(err.message);
      }}
      {...props}
    />
  );
};

export default memo(AnimatedImage);
