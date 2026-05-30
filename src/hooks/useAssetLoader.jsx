import { allAssetFiles, assetsNotUsedInMob } from '@/contants/Assets';
import { preloadFrameSceneLayers } from '@/views/scenes/components/frameSceneLoader';
import { getAllSceneLayers } from '@/views/scenes/layers';
import { checkImagesReadyness, preloadFiles } from '@/utils/fetch';
import { useEffect, useState } from 'react';

const checkAssetsAvailibility = async (setPercentage) => {
  if (typeof window === 'undefined') return;
  // setTimeout()
  const sceneController = document.querySelector('.sceneController');
  if (!sceneController) return;
  let images = sceneController.querySelectorAll('img');
  await checkImagesReadyness(images, (percentage) => {
    setPercentage(Math.floor(percentage * 0.5));
  });
  return await checkFrameScenesReadyness((percentage) => {
    setPercentage(50 + Math.floor(percentage * 0.5));
  });
};

const checkFrameScenesReadyness = async (callback) => {
  const frameScenes = document.querySelectorAll('[data-frame-scene="true"]');
  const totalFiles = frameScenes.length;
  if (totalFiles === 0) {
    callback(100);
    return;
  }

  let loaded = 0;
  const updatePercentage = () => {
    loaded += 1;
    callback(Math.ceil((loaded / totalFiles) * 100));
  };

  return await Promise.all(
    Array.from(frameScenes).map((frameScene) =>
      promiseCheckFrameSceneReadyness(frameScene, updatePercentage)
    )
  );
};

const promiseCheckFrameSceneReadyness = (frameScene, callback) =>
  new Promise((resolve) => {
    if (frameScene.dataset.frameSceneReady === 'true') {
      callback();
      resolve();
      return;
    }

    const observer = new MutationObserver(() => {
      if (frameScene.dataset.frameSceneReady !== 'true') return;
      observer.disconnect();
      clearTimeout(timeout);
      callback();
      resolve();
    });
    const timeout = setTimeout(() => {
      observer.disconnect();
      callback();
      resolve();
    }, 15000);

    observer.observe(frameScene, {
      attributes: true,
      attributeFilter: ['data-frame-scene-ready'],
    });
  });

const waitPromise = (wait = 300) =>
  new Promise((res) => {
    setTimeout(res, wait);
  });

const getAssets = () => {
  if (window.innerWidth < 940)
    return allAssetFiles.filter(
      (url) => assetsNotUsedInMob.indexOf(url) === -1
    );
  return allAssetFiles;
};

const getFrameSceneLayers = () =>
  getAllSceneLayers({
    animated: false,
    isMobile: window.innerWidth < 940,
    includeAllAssets: true,
  });

const useAssetLoader = () => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    const assets = getAssets();
    console.log({ assets });
    if (!assets || assets.length === 0) {
      setLoaded(true);
      return;
    }
    preloadFiles(assets, (percentage) => {
      setProgress(Math.floor(percentage * 0.75));
    })
      .then(() =>
        preloadFrameSceneLayers(getFrameSceneLayers(), (percentage) => {
          setProgress(75 + Math.floor(percentage * 0.25));
        })
      )
      .then(() => {
        setLoaded(true);
        setProgress(0);
        return waitPromise();
      })
      .then(() => {
        return checkAssetsAvailibility(setProgress);
      })
      .then(() => {
        setProgress(100);
        setAttached(true);
      });
  }, []);

  return {
    progress,
    loaded,
    attached,
  };
};

export default useAssetLoader;
