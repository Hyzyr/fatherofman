import { getDynastyLayers } from './dynasty/layers';
import { getEgyptLayers } from './egypt/layers';
import { getNYCLayers } from './nyc/layers';
import { getPrehystoricLayers } from './prehystoric/layers';
import { getWW2Layers } from './ww2/layers';

export const getAllSceneLayers = (options = {}) => [
  ...getPrehystoricLayers(options),
  ...getEgyptLayers(options),
  ...getDynastyLayers(options),
  ...getWW2Layers(options),
  ...getNYCLayers(options),
];
