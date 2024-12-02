import React, { useEffect, useState } from 'react';
import { fetchArchiveImages, loadArchiveImages } from '@/utils/fetch';

const useAnimatedImages = ({ url }) => {
  const [images, setImages] = useState(null);

  const updateImages = (images) => {
    setImages(images);
  };

  useEffect(() => {
    fetchArchiveImages(url)
      .then((zip) => loadArchiveImages(zip))
      .then((images) => updateImages(images));

    return () => {};
  }, []);

  return { images };
};

export default useAnimatedImages;
