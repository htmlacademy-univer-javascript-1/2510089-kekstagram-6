import { openBigPicture } from './big-picture.js';


const createThumbnailElement = (photoData) => {
  const template = document.querySelector('#picture');
  const thumbnail = template.content.querySelector('.picture').cloneNode(true);
  const imgElement = thumbnail.querySelector('.picture__img');

  imgElement.src = photoData.url;
  imgElement.alt = photoData.description;

  thumbnail.querySelector('.picture__likes').textContent = photoData.likes;
  thumbnail.querySelector('.picture__comments').textContent = photoData.comments.length;

  thumbnail.dataset.thumbnailId = photoData.id;


  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(photoData);
  });

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    fragment.appendChild(createThumbnailElement(photo));
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };
