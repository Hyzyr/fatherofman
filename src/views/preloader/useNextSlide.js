import { promiseLoadImageArr } from '@/utils/fetch';
import React, { useEffect, useState } from 'react';

const IMAGES_FOLDER = '/images/preloader/';

const useNextSlide = ({ data }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!data) return;
    setLoaded(false);
    setError(false);

    let images = [IMAGES_FOLDER + data.bg];
    images.push(...data.items.map((item) => IMAGES_FOLDER + item.img));

    promiseLoadImageArr(images)
      .then((respons) => {
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err.message);
        setError(true);
      });
  }, [data]);

  return {
    loaded,
    error,
  };
};

export default useNextSlide;
