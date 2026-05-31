import { loadFramesFromArchive, loadFramesFromUrls } from 'frameloom';

export const isFrameArchive = (url) => url?.endsWith('.zip');

export const loadFrameLayerAsset = async (url, { preloadConcurrency = 6 } = {}) => {
  if (!url) {
    return {
      frames: [],
      frameUrls: [],
      imageAspect: 1,
      release: () => {},
    };
  }

  const archive = isFrameArchive(url);
  const frameUrls = archive
    ? await loadFramesFromArchive(url, { useCache: false })
    : [url];
  let frames = [];

  try {
    frames = await loadFramesFromUrls(frameUrls, {
      cache: false,
      concurrency: preloadConcurrency,
      decode: false,
    });
  } catch (error) {
    if (archive) frameUrls.forEach((frameUrl) => URL.revokeObjectURL(frameUrl));
    throw error;
  }

  const [image] = frames;
  let released = false;

  return {
    frames,
    frameUrls,
    imageAspect: image?.width ? image.height / image.width : 1,
    release: () => {
      if (released) return;
      released = true;
      frames.forEach((frame) => frame.release());
      if (archive) frameUrls.forEach((frameUrl) => URL.revokeObjectURL(frameUrl));
    },
  };
};

export const loadFrameLayer = async (layer) => {
  const asset = await loadFrameLayerAsset(layer.url, {
    preloadConcurrency: layer.preloadConcurrency,
  });

  return {
    ...layer,
    ...asset,
  };
};
