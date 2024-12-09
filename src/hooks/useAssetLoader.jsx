import { checkImagesReadyness, preloadFiles } from '@/utils/fetch';
import { useEffect, useState } from 'react';

const checkAssetsAvailibility = async (setPercentage) => {
  if (typeof window === 'undefined') return;
  // setTimeout()
  const sceneController = document.querySelector('.sceneController');
  let images = sceneController.querySelectorAll('img');
  return await checkImagesReadyness(images, setPercentage);
};

const waitPromise = (wait = 300) =>
  new Promise((res) => {
    setTimeout(res, wait);
  });

const useAssetLoader = ({ assets }) => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [attached, setAttached] = useState(false);

  useEffect(() => {
    if (!assets || assets.length === 0) {
      setLoaded(true);
      return;
    }
    preloadFiles(assets, (percentage) => {
      setProgress(percentage);
    })
      .then(() => {
        setLoaded(true);
        return waitPromise();
      })
      .then(() => {
        setProgress(0);
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
