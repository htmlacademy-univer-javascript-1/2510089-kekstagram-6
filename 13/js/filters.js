import { getRandomInteger, debounce } from './util.js';

const RANDOM_PHOTOS_COUNT = 10;

let selectedFilter = 'filter-default';
let photos = [];
let filterBtns;

const sortingCommentsCount = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const filteringPhotos = (photosArray) => {
  let photosForRendering = [];
  let temporaryStorage = [];

  switch (selectedFilter) {
    case 'filter-discussed':
      photosForRendering = photosArray.slice().sort(sortingCommentsCount);
      break;

    case 'filter-random':
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

const filterBtnsAddEvent = (callback) => {
  filterBtns = document.querySelectorAll('.img-filters__button');

  filterBtns.forEach((filterBtn) => {
    filterBtn.addEventListener('click', (evt) => {
      selectedFilter = evt.target.id;

      filterBtns.forEach((button) => {
        button.classList.remove('img-filters__button--active');
      });

      evt.target.classList.add('img-filters__button--active');
      callback();
    });
  });
};

const initFilters = (loadedPhotos, renderCallback) => {
  photos = loadedPhotos;

  const debouncedRender = debounce(() => {
    const filteredPhotos = filteringPhotos(photos);
    renderCallback(filteredPhotos);
  }, 500);

  filterBtnsAddEvent(debouncedRender);

  renderCallback(photos);
};

export { initFilters };
