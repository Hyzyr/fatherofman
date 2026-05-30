'use client';
import {
  FrameStage,
  useFrameStageControls,
} from 'frameloom/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { loadFrameLayer } from './frameSceneLoader';

const ROOT_RECT = { x: 0, y: 0, width: 1, height: 1 };
const DEFAULT_STAGE_SIZE = { width: 1920, height: 1080 };

const toRadians = (degrees = 0) => (degrees * Math.PI) / 180;

const getObjectFitRect = ({ sourceWidth, sourceHeight, width, height, fit }) => {
  if (fit === 'fill') return { x: 0, y: 0, width, height };

  const sourceAspect = sourceWidth / sourceHeight;
  const targetAspect = width / height;
  const shouldCover = fit === 'cover';
  const useWidth = shouldCover
    ? sourceAspect < targetAspect
    : sourceAspect > targetAspect;

  if (useWidth) {
    const nextHeight = width / sourceAspect;
    return { x: 0, y: (height - nextHeight) / 2, width, height: nextHeight };
  }

  const nextWidth = height * sourceAspect;
  return { x: (width - nextWidth) / 2, y: 0, width: nextWidth, height };
};

const renderFrame = ({ context, frame, width, height, fit = 'contain' }) => {
  const image = frame?.image;
  if (!image) return;

  const rect = getObjectFitRect({
    sourceWidth: frame.width || image.naturalWidth || image.width,
    sourceHeight: frame.height || image.naturalHeight || image.height,
    width,
    height,
    fit,
  });

  if (rect.width > 0 && rect.height > 0) {
    context.drawImage(image, rect.x, rect.y, rect.width, rect.height);
  }
};

const dispatchCharClick = () => {
  if (typeof window === 'undefined') return;

  const ev = new Event('charClick');
  window.dispatchEvent(ev);
};

const resolveBounds = (layer, stageWidth) =>
  (layer.variants || []).reduce(
    (bounds, variant) =>
      stageWidth <= variant.maxWidth ? { ...bounds, ...variant.bounds } : bounds,
    { ...(layer.bounds || {}) }
  );

const resolveDimension = ({
  bounds,
  parentRect,
  imageAspect,
  stageSize,
}) => {
  const stageAspect = stageSize.width / stageSize.height;
  let width = bounds.width == null ? null : bounds.width * parentRect.width;
  let height = bounds.height == null ? null : bounds.height * parentRect.height;

  if (width == null && height != null) {
    width = imageAspect ? height / imageAspect / stageAspect : height;
  }

  if (height == null && width != null) {
    height = imageAspect ? width * imageAspect * stageAspect : width;
  }

  if (bounds.minWidthPx != null) {
    const minWidth = bounds.minWidthPx / stageSize.width;
    width = Math.max(width ?? 0, minWidth);
  }

  if (bounds.minHeightPx != null) {
    const minHeight = bounds.minHeightPx / stageSize.height;
    height = Math.max(height ?? 0, minHeight);
  }

  return {
    width: width ?? parentRect.width,
    height: height ?? parentRect.height,
  };
};

const resolveLayerPlacement = ({ layer, parentRect, stageSize }) => {
  const bounds = resolveBounds(layer, stageSize.width);
  const imageAspect = layer.imageAspect || 1;
  const { width, height } = resolveDimension({
    bounds,
    parentRect,
    imageAspect,
    stageSize,
  });
  const anchorX = bounds.translateX ? -bounds.translateX : 0;
  const anchorY = bounds.translateY ? -bounds.translateY : 0;

  let x = parentRect.x;
  let y = parentRect.y;

  if (bounds.left != null) {
    x = parentRect.x + bounds.left * parentRect.width;
  } else if (bounds.right != null) {
    x = parentRect.x + parentRect.width - bounds.right * parentRect.width - width;
  }

  if (bounds.top != null) {
    y = parentRect.y + bounds.top * parentRect.height;
  } else if (bounds.bottom != null) {
    y = parentRect.y + parentRect.height - bounds.bottom * parentRect.height - height;
  }

  const placement = {
    x,
    y,
    width,
    height,
    anchorX,
    anchorY,
    rotation: toRadians(bounds.rotate),
    skewX: toRadians(bounds.skewX),
    skewY: toRadians(bounds.skewY),
    zIndex: layer.zIndex,
  };

  return {
    placement,
    rect: {
      x: x - width * anchorX,
      y: y - height * anchorY,
      width,
      height,
    },
  };
};

const useStageSize = () => {
  const ref = useRef(null);
  const [stageSize, setStageSize] = useState(DEFAULT_STAGE_SIZE);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateAspect = () => {
      const rect = element.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setStageSize((currentSize) => {
          if (
            Math.round(currentSize.width) === Math.round(rect.width) &&
            Math.round(currentSize.height) === Math.round(rect.height)
          ) {
            return currentSize;
          }

          return { width: rect.width, height: rect.height };
        });
      }
    };

    updateAspect();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateAspect);
      return () => window.removeEventListener('resize', updateAspect);
    }

    const observer = new ResizeObserver(updateAspect);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, stageSize };
};

const FrameScene = ({ layers = [], animated = true, className = '' }) => {
  const stage = useFrameStageControls();
  const { ref, stageSize } = useStageSize();
  const timers = useRef([]);
  const frameIndexes = useRef(new Map());
  const [loadedLayers, setLoadedLayers] = useState([]);
  const [sceneLoadComplete, setSceneLoadComplete] = useState(false);
  const visibleLayers = useMemo(
    () => layers.filter((layer) => layer && layer.visible !== false),
    [layers]
  );
  const layerKey = useMemo(
    () => visibleLayers.map((layer) => `${layer.id}:${layer.url}`).join('|'),
    [visibleLayers]
  );

  useEffect(() => {
    let active = true;
    setLoadedLayers([]);
    setSceneLoadComplete(false);
    frameIndexes.current.clear();

    Promise.all(
      visibleLayers.map((layer) =>
        loadFrameLayer(layer).catch((err) => {
          console.log('ERROR loading frame scene layer asset : ', layer.id);
          console.log(err.message);
          return null;
        })
      )
    )
      .then((nextLayers) => {
        if (!active) return;
        setLoadedLayers(nextLayers.filter(Boolean));
        setSceneLoadComplete(true);
      });

    return () => {
      active = false;
    };
  }, [visibleLayers]);

  const resolvedLayers = useMemo(() => {
    const rects = new Map();

    return loadedLayers.map((layer, index) => {
      const parentRect = layer.parentId
        ? rects.get(layer.parentId) || ROOT_RECT
        : ROOT_RECT;
      const { placement, rect } = resolveLayerPlacement({
        layer: { ...layer, zIndex: layer.zIndex ?? index },
        parentRect,
        stageSize,
      });

      rects.set(layer.id, rect);

      return {
        ...layer,
        placement,
        rect,
        zIndex: layer.zIndex ?? index,
      };
    });
  }, [loadedLayers, stageSize]);

  const stageLayers = useMemo(
    () =>
      resolvedLayers.map((layer) => ({
        id: layer.id,
        type: 'custom',
        placement: layer.placement,
        render: (context, { width, height }) => {
          const frameIndex = frameIndexes.current.get(layer.id) || 0;
          const frame = layer.frames[Math.min(frameIndex, layer.frames.length - 1)];
          renderFrame({
            context,
            frame,
            width,
            height,
            fit: layer.fit || 'contain',
          });
        },
      })),
    [resolvedLayers]
  );
  const isReady =
    visibleLayers.length === 0 || sceneLoadComplete;

  useEffect(() => {
    if (stageLayers.length === 0) return;
    stage.render();
  }, [isReady, stage, stageLayers.length, stageSize]);

  useEffect(() => {
    timers.current.forEach((timer) => clearTimeout(timer));
    timers.current = [];

    if (!isReady) return;

    resolvedLayers.forEach((layer) => {
      const shouldAnimate = animated && layer.animate !== false;
      const frameCount = layer.frames.length;
      let frame = 0;
      const interval = Math.max(0, layer.speed ?? 0.08) * 1000;
      const loopDelay = Math.max(0, layer.delay ?? 0) * 1000;

      const showFrame = () => {
        frameIndexes.current.set(layer.id, frame);
        stage.render();

        if (!shouldAnimate || frameCount <= 1) return;

        const isLastFrame = frame >= frameCount - 1;
        frame = isLastFrame ? 0 : frame + 1;
        timers.current.push(
          setTimeout(showFrame, interval + (isLastFrame ? loopDelay : 0))
        );
      };

      showFrame();
    });

    return () => {
      timers.current.forEach((timer) => clearTimeout(timer));
      timers.current = [];
    };
  }, [animated, isReady, layerKey, resolvedLayers, stage]);

  const hitboxes = resolvedLayers.filter((layer) => layer.clickable);

  return (
    <div
      ref={ref}
      data-frame-scene="true"
      data-frame-scene-ready={isReady ? 'true' : 'false'}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}>
      {stageLayers.length > 0 && (
        <FrameStage
          ref={stage.ref}
          layers={stageLayers}
          decorative
          fallback="Layered animated scene"
          style={{ width: '100%', height: '100%' }}
          onLoadComplete={() => {
            stage.render();
          }}
          onLoadError={(err, layerId) => {
            console.log('ERROR rendering frame scene layer : ', layerId);
            console.log(err.message);
          }}
        />
      )}
      {hitboxes.map((layer) => {
        const arrow = layer.arrow || { bottom: 0.93, left: 0.443 };

        return (
          <div
            key={`${layer.id}-hitbox`}
            role="button"
            tabIndex={0}
            onClick={() => {
              layer.onClick?.();
              dispatchCharClick();
            }}
            onKeyDown={(event) => {
              if (event.key !== 'Enter' && event.key !== ' ') return;
              layer.onClick?.();
              dispatchCharClick();
            }}
            style={{
              position: 'absolute',
              left: `${layer.rect.x * 100}%`,
              top: `${layer.rect.y * 100}%`,
              width: `${layer.rect.width * 100}%`,
              height: `${layer.rect.height * 100}%`,
              pointerEvents: 'all',
              cursor: 'pointer',
            }}>
            <div
              style={{
                position: 'absolute',
                bottom: `${arrow.bottom * 100}%`,
                left: `${arrow.left * 100}%`,
                transform: 'translate(-50%)',
                width: '12vw',
                aspectRatio: '1 / 1',
                animation: 'arrow 0.5s ease infinite alternate',
                backgroundImage: 'url(/images/components/click-him.webp)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FrameScene;
