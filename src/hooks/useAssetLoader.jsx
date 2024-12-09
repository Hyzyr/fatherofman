import { preloadFiles } from '@/utils/fetch';
import { useEffect, useState } from 'react';

const useAssetLoader = ({ assets }) => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!assets || assets.length === 0) {
      setLoaded(true);
      return;
    }
    preloadFiles(assets, (percentage) => {
      setProgress(percentage);
      if (percentage >= 100) setLoaded(true);
    });
  }, []);

  return {
    progress,
    loaded,
  };
};

export default useAssetLoader;
