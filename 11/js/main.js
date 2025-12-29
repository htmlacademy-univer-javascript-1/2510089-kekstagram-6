import './util.js';
import { generatePhotosArray } from './data.js';
import { renderThumbnails } from './thumbnail.js';
import './hashtags-pristine.js';
import './form.js';
import { initEffects } from './effects.js';

const generatedPhotos = generatePhotosArray();

renderThumbnails(generatedPhotos);
initEffects();
