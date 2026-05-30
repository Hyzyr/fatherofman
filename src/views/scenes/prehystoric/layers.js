const IMAGES_URL = '/images/scenes/prehystoric/';

export const getPrehystoricLayers = ({ animated = true, onCharClick, isMobile = false, includeAllAssets = false } = {}) => {
  const showDesktopLayers = includeAllAssets || !isMobile;

  return [
    {
      id: 'ptero',
      url: IMAGES_URL + 'ptero.zip',
      animate: animated,
      speed: 0.06,
      bounds: { top: 0, left: 0, width: 0.35 },
      fit: 'contain',
    },
    {
      id: 'smoke',
      url: IMAGES_URL + 'smoke.zip',
      animate: animated,
      bounds: { top: -0.02, left: 0.398, width: 0.22, height: 0.453 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 200, translateX: -0.54 },
        },
      ],
      fit: 'fill',
    },
    {
      id: 'volcano',
      url: IMAGES_URL + 'volcano.webp',
      bounds: { left: 0.02, bottom: -0.011, width: 1, height: 0.88 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 1200, translateX: -0.5, height: 0.88 },
        },
      ],
      fit: 'fill',
    },
    {
      id: 'ground',
      url: IMAGES_URL + 'ground-2.webp',
      bounds: { left: -0.02, bottom: -0.02, width: 1.04, height: 0.69 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 1400, translateX: -0.5 },
        },
      ],
      fit: 'fill',
    },
    {
      id: 'ground-mid',
      url: IMAGES_URL + 'mid-ground.webp',
      bounds: { left: 0.04, bottom: 0.08, width: 0.75 },
      variants: [
        {
          maxWidth: 1160,
          bounds: { left: 0.5, minWidthPx: 1200, translateX: -0.5 },
        },
      ],
      fit: 'contain',
    },
    {
      id: 'brachiosaurus',
      url: IMAGES_URL + 'brachiosaurus.zip',
      animate: animated,
      delay: 0.2,
      bounds: { left: 0.35, bottom: 0.339, width: 0.07 },
      variants: [
        { maxWidth: 1160, bounds: { left: 0.28, bottom: 0.35, width: 0.07 } },
      ],
      fit: 'contain',
    },
    {
      id: 'raptor-small',
      url: IMAGES_URL + 'small-raptor-cropped.zip',
      animate: animated,
      delay: 0.2,
      bounds: { right: 0.361, bottom: 0.29, width: 0.074 },
      variants: [
        { maxWidth: 1160, bounds: { right: 0.25, bottom: 0.29, width: 0.12 } },
      ],
      fit: 'contain',
    },
    {
      id: 'trex',
      url: IMAGES_URL + 'trex.zip',
      animate: animated,
      delay: 0.2,
      bounds: { right: 0.156, bottom: 0.17, width: 0.25 },
      variants: [
        { maxWidth: 1160, bounds: { right: -0.03, bottom: 0.17, width: 0.35 } },
      ],
      fit: 'contain',
    },
    {
      id: 'raptor',
      url: IMAGES_URL + 'yellow-raptor.zip',
      animate: animated,
      delay: 0.2,
      bounds: { left: 0.188, bottom: 0.224, width: 0.121 },
      variants: [
        { maxWidth: 1160, bounds: { left: 0.015, bottom: 0.224, width: 0.25 } },
      ],
      fit: 'contain',
    },
    {
      id: 'tree',
      url: IMAGES_URL + 'snake-tree.zip',
      animate: animated,
      visible: showDesktopLayers,
      speed: 0.1,
      bounds: { right: -0.015, top: -0.023, height: 0.97 },
      variants: [
        { maxWidth: 1160, bounds: { right: 0, top: -0.023, height: 0.97, translateX: 0.5 } },
      ],
      fit: 'contain',
    },
    {
      id: 'character2',
      url: IMAGES_URL + 'character.zip',
      animate: animated,
      clickable: true,
      onClick: onCharClick,
      delay: 0.6,
      speed: 0.06,
      bounds: { left: 0.5, bottom: 0.043, height: 0.516, translateX: -0.56 },
      variants: [
        { maxWidth: 1160, bounds: { left: 0.5, bottom: 0.079, height: 0.54, translateX: -0.56 } },
      ],
      fit: 'contain',
    },
    {
      id: 'palms',
      url: IMAGES_URL + 'palms.zip',
      animate: animated,
      bounds: { left: -0.012, bottom: -0.03, width: 0.44 },
      variants: [
        { maxWidth: 1160, bounds: { left: -0.05, bottom: 0.03, width: 0.55 } },
      ],
      fit: 'contain',
    },
    {
      id: 'silhouetteR',
      url: IMAGES_URL + 'silhouette-r.zip',
      animate: animated,
      speed: 0.1,
      bounds: { right: -0.012, bottom: -0.03, width: 0.44 },
      fit: 'fill',
    },
    {
      id: 'grass',
      url: IMAGES_URL + 'grass.zip',
      animate: animated,
      visible: showDesktopLayers,
      bounds: { left: -0.02, bottom: -0.02, width: 1.04 },
      fit: 'contain',
    },
    {
      id: 'silhouetteL',
      url: IMAGES_URL + 'silhouette-l.zip',
      animate: animated,
      visible: showDesktopLayers,
      speed: 0.1,
      bounds: { left: -0.012, bottom: -0.03, width: 0.44 },
      fit: 'fill',
    },
  ];
};
