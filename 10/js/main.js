import './util.js';
import { generatePhotosArray } from './data.js';
import { renderThumbnails } from './thumbnail.js';
import './hashtags-pristine.js';
import './form.js';

const generatedPhotos = generatePhotosArray();

renderThumbnails(generatedPhotos);

