import { useEffect, useState } from 'react';
import { fetchArchiveImages, loadArchiveImageUrls } from '@/utils/fetch';

const useAnimatedImages = ({ url }) => {
  const [images, setImages] = useState(null);

  const updateImages = (images) => {
    setImages(images);
  };

  useEffect(() => {
    if (!url) return;

    let active = true;
    setImages(null);

    fetchArchiveImages(url)
      .then((zip) => loadArchiveImageUrls(zip))
      .then((images) => {
        if (active) updateImages(images);
      })
      .catch((err) => {
        if (!active) return;
        console.log('ERROR fetching : ', url);
        console.log(err.message);
      });

    return () => {
      active = false;
    };
  }, [url]);

  return { images };
};

export default useAnimatedImages;
