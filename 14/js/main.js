import { renderThumbnails } from './thumbnail.js';
import './hashtags-pristine.js';
import './form.js';
import { initEffects } from './effects.js';
import { getDataFromServer } from './api.js';
import { initFilters } from './filters.js';

let photos = [];

const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => thumbnail.remove());
};

const renderFilteredPhotos = (filteredPhotos) => {
  clearThumbnails();
  renderThumbnails(filteredPhotos);
};

const onSuccess = (data) => {
  photos = data.slice();

  const filtersContainer = document.querySelector('.img-filters');
  filtersContainer.classList.remove('img-filters--inactive');

  initFilters(photos, renderFilteredPhotos);
};

const onFail = (errorMessage) => {
  const messageAlert = document.createElement('div');
  messageAlert.style.position = 'fixed';
  messageAlert.style.left = '50%';
  messageAlert.style.top = '50%';
  messageAlert.style.transform = 'translate(-50%, -50%)';
  messageAlert.style.zIndex = '1000';
  messageAlert.style.backgroundColor = 'white';
  messageAlert.style.border = '2px solid red';
  messageAlert.style.borderRadius = '10px';
  messageAlert.style.padding = '20px';
  messageAlert.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
  messageAlert.style.textAlign = 'center';
  messageAlert.style.minWidth = '300px';

  const title = document.createElement('h2');
  title.textContent = 'Ошибка';
  title.style.marginTop = '0';
  title.style.color = 'red';

  const text = document.createElement('p');
  text.textContent = errorMessage;
  text.style.margin = '20px 0';

  const button = document.createElement('button');
  button.textContent = 'Закрыть';
  button.style.padding = '10px 20px';
  button.style.backgroundColor = '#ff4e4e';
  button.style.color = 'white';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.cursor = 'pointer';

  button.addEventListener('click', () => {
    messageAlert.remove();
  });

  messageAlert.appendChild(title);
  messageAlert.appendChild(text);
  messageAlert.appendChild(button);
  document.body.appendChild(messageAlert);

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      messageAlert.remove();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  document.addEventListener('keydown', onEscKeyDown);

  messageAlert.addEventListener('click', (evt) => {
    if (evt.target === messageAlert) {
      messageAlert.remove();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  });
};

const initApp = () => {
  getDataFromServer(onSuccess, onFail);
  initEffects();
};

initApp();

export { photos };
