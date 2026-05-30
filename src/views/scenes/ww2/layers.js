const IMAGES_URL = '/images/scenes/ww2/';

export const getWW2Layers = ({ animated = true, onCharClick, isMobile = false, includeAllAssets = false } = {}) => {
  const showDesktopLayers = includeAllAssets || !isMobile;

  return [
    {
      id: 'mountain',
      url: IMAGES_URL + 'bg-2.webp',
      bounds: { left: 0.2, bottom: 0.33, width: 0.52, height: 0.67 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 800, translateX: -0.454, translateY: 0.25 },
        },
        {
          maxWidth: 940,
          bounds: { left: 0.5, minWidthPx: 800, translateX: -0.454, translateY: 0.04 },
        },
      ],
      fit: 'fill',
    },
    {
      id: 'forest',
      url: IMAGES_URL + 'forest-dust.zip',
      animate: animated,
      bounds: { left: 0.282, bottom: 0.2, width: 0.473 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 800, translateX: 0.5 },
        },
        {
          maxWidth: 940,
          bounds: { left: 0.5, minWidthPx: 742, translateX: -0.35 },
        },
      ],
      fit: 'contain',
    },
    {
      id: 'city',
      url: IMAGES_URL + 'bg.webp',
      bounds: { left: -0.025, bottom: -0.02, width: 1.05, height: 1.04 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 1400, translateX: -0.418 },
        },
      ],
      fit: 'fill',
    },
    {
      id: 'fire',
      url: IMAGES_URL + 'fire.zip',
      animate: animated,
      visible: showDesktopLayers,
      bounds: { left: 0, bottom: 0, width: 1, height: 0.8 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 1400, translateX: 0.5 },
        },
      ],
      fit: 'fill',
    },
    {
      id: 'smokeL',
      url: IMAGES_URL + 'smoke-l.zip',
      animate: animated,
      visible: showDesktopLayers,
      bounds: { left: -0.018, bottom: -0.009, width: 0.339 },
      fit: 'fill',
    },
    {
      id: 'smokeR',
      url: IMAGES_URL + 'smoke-r.zip',
      animate: animated,
      visible: showDesktopLayers,
      bounds: { right: -0.012, bottom: -0.03, width: 0.27, height: 1 },
      fit: 'fill',
    },
    {
      id: 'stone',
      url: IMAGES_URL + 'stone.webp',
      visible: showDesktopLayers,
      bounds: { right: 0.125, bottom: 0.008, width: 0.147 },
      fit: 'contain',
    },
    {
      id: 'soldier',
      url: IMAGES_URL + 'soldier.zip',
      animate: animated,
      visible: showDesktopLayers,
      speed: 0.1,
      bounds: { right: 0, bottom: -0.02, height: 0.523 },
      fit: 'contain',
    },
    {
      id: 'bullets',
      url: IMAGES_URL + 'bullets.zip',
      animate: animated,
      bounds: { left: 0, bottom: 0, width: 1, height: 0.8 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 1400, translateX: 0.5 },
        },
      ],
      fit: 'fill',
    },
    {
      id: 'soldiers',
      url: IMAGES_URL + 'soldiers.zip',
      animate: animated,
      bounds: { left: 0.245, bottom: 0.146, width: 0.46, height: 0.44 },
      variants: [
        { maxWidth: 940, bounds: { left: 0.015, bottom: 0.186, height: 0.33 } },
      ],
      fit: 'fill',
    },
    {
      id: 'character',
      url: IMAGES_URL + 'character.zip',
      animate: animated,
      clickable: true,
      onClick: onCharClick,
      bounds: { left: 0.435, bottom: 0.105, height: 0.507 },
      fit: 'contain',
    },
    {
      id: 'dust',
      url: IMAGES_URL + 'dust.zip',
      animate: animated,
      speed: 0.1,
      bounds: { left: 0, bottom: -0.23, width: 1, height: 0.8 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 1400, translateX: 0.5 },
        },
      ],
      fit: 'fill',
    },
    {
      id: 'sparks',
      url: IMAGES_URL + 'sparks.zip',
      animate: animated,
      speed: 0.1,
      bounds: { left: 0, bottom: -0.23, width: 1, height: 0.8 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 1400, translateX: 0.5 },
        },
      ],
      fit: 'fill',
    },
  ];
};
