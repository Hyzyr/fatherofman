import { loadFramesFromUrls } from 'frameloom';
import {
  fetchArchiveImages,
  loadArchiveImageUrls,
  promiseLoadImage,
} from '@/utils/fetch';

const frameAssetCache = new Map();
const framePreloadCache = new Map();

export const isFrameArchive = (url) => url?.endsWith('.zip');

export const loadFrameLayerAsset = (url) => {
  if (!url) return Promise.resolve({ images: [], imageAspect: 1 });

  if (!frameAssetCache.has(url)) {
    const promise = (isFrameArchive(url)
      ? fetchArchiveImages(url).then((zip) => loadArchiveImageUrls(zip))
      : Promise.resolve([url])
    ).then(async (images) => {
      const image = images[0] ? await promiseLoadImage(images[0]) : null;

      return {
        images,
        imageAspect: image?.width ? image.height / image.width : 1,
      };
    });

    frameAssetCache.set(url, promise);
  }

  return frameAssetCache.get(url);
};

const preloadFrameLayerFrames = (url) => {
  if (!framePreloadCache.has(url)) {
    const promise = loadFrameLayerAsset(url).then(async (asset) => ({
      ...asset,
      frames:
        asset.images.length > 0
          ? await loadFramesFromUrls(asset.images, { decode: false })
          : [],
    }));

    framePreloadCache.set(url, promise);
  }

  return framePreloadCache.get(url);
};

export const loadFrameLayer = async (layer) => {
  const asset = await preloadFrameLayerFrames(layer.url);

  return {
    ...layer,
    ...asset,
  };
};

export const preloadFrameSceneLayers = async (layers = [], callback = () => {}) => {
  const urls = [...new Set(layers.filter(Boolean).map((layer) => layer.url))];
  const total = urls.length;

  if (total === 0) {
    callback(100);
    return;
  }

  let loaded = 0;
  await Promise.all(
    urls.map((url) =>
      preloadFrameLayerFrames(url)
        .catch((error) => {
          console.log('Error loading frame scene asset: %s\n', url, error);
        })
        .then(() => {
          loaded += 1;
          callback(Math.ceil((loaded / total) * 100));
        })
    )
  );
};
