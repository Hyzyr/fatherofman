const IMAGES_URL = '/images/scenes/egypt/';

export const getEgyptLayers = ({ animated = true, onCharClick, isMobile = false, includeAllAssets = false } = {}) => {
  const showDesktopLayers = includeAllAssets || !isMobile;

  return [
    {
      id: 'birds',
      url: IMAGES_URL + 'birds.zip',
      animate: animated,
      visible: showDesktopLayers,
      bounds: { top: -0.01, right: 0, width: 0.3 },
      fit: 'contain',
    },
    {
      id: 'birds2',
      url: IMAGES_URL + 'birds-2.zip',
      animate: animated,
      bounds: { top: 0.03, left: 0.3, width: 0.35 },
      fit: 'contain',
    },
    {
      id: 'pyramids',
      url: IMAGES_URL + 'egypt-static.png',
      bounds: { right: -0.06, bottom: 0.14, width: 0.93, height: 0.465 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { right: 0.45, minWidthPx: 1200, translateX: 0.5 },
        },
        {
          maxWidth: 940,
          bounds: { right: 0.45, minWidthPx: 1400, translateX: 0.5 },
        },
      ],
      fit: 'fill',
    },
    {
      id: 'vawes',
      parentId: 'pyramids',
      url: IMAGES_URL + 'vawes.zip',
      animate: animated,
      visible: showDesktopLayers,
      speed: 0.06,
      bounds: { left: 0.098, top: 0.327, width: 0.142, height: 0.212 },
      fit: 'fill',
    },
    {
      id: 'sphinx',
      url: IMAGES_URL + 'sphinx2.webp',
      bounds: { bottom: 0.269, left: -0.061, width: 0.38 },
      variants: [
        {
          maxWidth: 940,
          bounds: { bottom: 0.289, left: -0.261, width: 0.85 },
        },
      ],
      fit: 'contain',
    },
    {
      id: 'ground',
      url: IMAGES_URL + 'sand.webp',
      bounds: { bottom: -0.02, left: -0.02, width: 1.04, height: 0.33 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 1400, translateX: -0.5 },
        },
      ],
      fit: 'fill',
    },
    {
      id: 'grass',
      url: IMAGES_URL + 'grass.zip',
      animate: animated,
      bounds: { left: 0.147, bottom: 0.044, width: 0.09 },
      variants: [
        {
          maxWidth: 940,
          bounds: { left: 0.007, bottom: -0.006, width: 0.26 },
        },
      ],
      fit: 'contain',
    },
    {
      id: 'cactus',
      url: IMAGES_URL + 'cactus-front.webp',
      bounds: { left: 0.05, bottom: -0.014, width: 0.89 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.05, width: 0.89, minWidthPx: 1400 },
        },
        {
          maxWidth: 940,
          bounds: { left: -0.028, bottom: 0, width: 1.45 },
        },
      ],
      fit: 'contain',
    },
    {
      id: 'foreground',
      url: IMAGES_URL + 'foreground-egypt.webp',
      bounds: { left: 0, bottom: -0.01, width: 1, height: 0.288 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 1400, translateX: -0.5 },
        },
      ],
      fit: 'fill',
    },
    {
      id: 'grass2',
      url: IMAGES_URL + 'grass.zip',
      animate: animated,
      speed: 0.1,
      bounds: { right: -0.01, bottom: 0.04, width: 0.09 },
      variants: [
        {
          maxWidth: 940,
          bounds: { right: -0.11, bottom: 0.18, width: 0.217 },
        },
      ],
      fit: 'contain',
    },
    {
      id: 'chararacter',
      url: IMAGES_URL + 'chararacter.zip',
      animate: animated,
      clickable: true,
      onClick: onCharClick,
      bounds: { left: 0.42, bottom: 0.09, height: 0.488 },
      variants: [
        {
          maxWidth: 940,
          bounds: { left: 0.5, bottom: 0.09, height: 0.488, translateX: -0.43 },
        },
      ],
      fit: 'contain',
    },
  ];
};
