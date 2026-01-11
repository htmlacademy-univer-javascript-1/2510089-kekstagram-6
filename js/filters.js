import { getRandomInteger, debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_DELAY = 500;
const FILTER_DEFAULT = 'filter-default';
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';

let selectedFilter = FILTER_DEFAULT;
let photos = [];
let renderCallback = null;
let debouncedRender = null;

const sortingCommentsCount = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const filteringPhotos = (photosArray) => {
  let photosForRendering = [];
  let temporaryStorage = [];

  switch (selectedFilter) {
    case FILTER_DISCUSSED:
      photosForRendering = photosArray.slice().sort(sortingCommentsCount);
      break;

    case FILTER_RANDOM:
      temporaryStorage = photosArray.slice();
      for (let i = 0; i < RANDOM_PHOTOS_COUNT && temporaryStorage.length > 0; i++) {
        const randomPhotoIndex = getRandomInteger(0, temporaryStorage.length - 1);
        photosForRendering.push(temporaryStorage[randomPhotoIndex]);
        temporaryStorage.splice(randomPhotoIndex, 1);
      }
      break;

    default:
      photosForRendering = photosArray;
      break;
  }

  return photosForRendering;
};

const onFilterClick = (evt) => {
  if (evt.target.id === selectedFilter) {
    return;
  }

  selectedFilter = evt.target.id;

  const filterBtns = document.querySelectorAll('.img-filters__button');
  filterBtns.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  evt.target.classList.add('img-filters__button--active');

  if (debouncedRender) {
    debouncedRender();
  }
};

const initFilters = (loadedPhotos, callback) => {
  photos = loadedPhotos;
  renderCallback = callback;

  debouncedRender = debounce(() => {
    const filteredPhotos = filteringPhotos(photos);
    if (renderCallback) {
      renderCallback(filteredPhotos);
    }
  }, DEBOUNCE_DELAY);

  const filterBtns = document.querySelectorAll('.img-filters__button');
  filterBtns.forEach((filterBtn) => {
    filterBtn.addEventListener('click', onFilterClick);
  });

  if (renderCallback) {
    renderCallback(photos);
  }
};

export { initFilters };
