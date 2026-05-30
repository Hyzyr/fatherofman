const IMAGES_URL = '/images/scenes/dynasty/';

export const getDynastyMainLayers = ({ animated = true } = {}) => [
  {
    id: 'ground',
    url: IMAGES_URL + 'ground2.webp',
    bounds: { left: -0.02, bottom: -0.011, width: 1.04, height: 1.024 },
    variants: [
      {
        maxWidth: 1160,
        bounds: { left: 0.5, minWidthPx: 1400, translateX: -0.5 },
      },
    ],
    fit: 'fill',
  },
  {
    id: 'warriors',
    url: IMAGES_URL + 'warriors-cropped.zip',
    animate: animated,
    bounds: { left: 0.228, bottom: 0.29, width: 0.547, height: 0.258 },
    variants: [
      {
        maxWidth: 1160,
        bounds: { width: null },
      },
    ],
    fit: 'fill',
  },
  {
    id: 'city',
    url: IMAGES_URL + 'city.webp',
    bounds: { left: 0.297, bottom: 0.409, width: 0.644 },
    variants: [
      {
        maxWidth: 940,
        bounds: { left: -0.24, bottom: 0.409, width: 1.164 },
      },
    ],
    fit: 'contain',
  },
  {
    id: 'flag1',
    parentId: 'city',
    url: IMAGES_URL + 'dynasty-flag.zip',
    animate: animated,
    speed: 0.04,
    bounds: { right: 0.146, bottom: 0.314, width: 0.015 },
    fit: 'fill',
  },
  {
    id: 'flag2',
    parentId: 'city',
    url: IMAGES_URL + 'dynasty-flag.zip',
    animate: animated,
    speed: 0.04,
    bounds: { right: 0.394, bottom: 0.45, width: 0.024 },
    fit: 'fill',
  },
  {
    id: 'flag3',
    parentId: 'city',
    url: IMAGES_URL + 'dynasty-flag.zip',
    animate: animated,
    speed: 0.04,
    bounds: { right: 0.48, bottom: 0.37, width: 0.021 },
    fit: 'fill',
  },
  {
    id: 'flag4',
    parentId: 'city',
    url: IMAGES_URL + 'dynasty-flag.zip',
    animate: animated,
    speed: 0.04,
    bounds: { left: 0.299, bottom: 0.144, width: 0.015 },
    fit: 'fill',
  },
];

export const getDynastyFrontLayers = ({ animated = true, onCharClick } = {}) => [
  {
    id: 'suntzu',
    url: IMAGES_URL + 'sun-tzu.webp',
    bounds: { right: 0.021, bottom: 0.388, height: 0.461 },
    variants: [
      {
        maxWidth: 1160,
        bounds: { height: 0.401 },
      },
      {
        maxWidth: 940,
        bounds: { right: -0.141, bottom: 0.288, height: 0.301 },
      },
    ],
    fit: 'contain',
  },
  {
    id: 'land',
    url: IMAGES_URL + 'grass.webp',
    bounds: { left: -0.02, bottom: -0.012, width: 1.04, height: 0.607 },
    variants: [
      {
        maxWidth: 1160,
        bounds: { left: 0.5, minWidthPx: 1400, translateX: -0.454 },
      },
    ],
    fit: 'fill',
  },
  {
    id: 'land-moving',
    url: IMAGES_URL + 'grass-moving.zip',
    animate: animated,
    speed: 0.06,
    bounds: { left: -0.02, bottom: -0.012, width: 1.04, height: 0.607 },
    variants: [
      {
        maxWidth: 1160,
        bounds: { left: 0.5, minWidthPx: 1400, translateX: -0.454 },
      },
    ],
    fit: 'fill',
  },
  {
    id: 'soldier',
    url: IMAGES_URL + 'dynasty-soldier.zip',
    animate: animated,
    clickable: true,
    onClick: onCharClick,
    bounds: { left: 0.5, bottom: 0.03, height: 0.7, translateX: -0.6 },
    arrow: { bottom: 0.88, left: 0.59 },
    fit: 'contain',
  },
  {
    id: 'glows',
    url: IMAGES_URL + 'glows.zip',
    animate: animated,
    bounds: { left: 0, bottom: 0.02, width: 1 },
    variants: [
      {
        maxWidth: 940,
        bounds: { bottom: 0.04, minWidthPx: 700 },
      },
    ],
    fit: 'contain',
  },
];

export const getDynastyLayers = (options = {}) => [
  ...getDynastyMainLayers(options),
  ...getDynastyFrontLayers(options),
];
