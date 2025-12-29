import './util.js';
import { generatePhotosArray } from './data.js';
import { renderThumbnails } from './thumbnail.js';

const generatedPhotos = generatePhotosArray();

renderThumbnails(generatedPhotos);

