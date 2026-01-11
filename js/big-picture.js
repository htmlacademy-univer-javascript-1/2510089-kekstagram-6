import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const pictureCancel = bigPicture.querySelector('#picture-cancel');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const COMMENTS_PER_PAGE = 5;

let currentComments = [];
let commentsShown = 0;

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  commentElement.appendChild(img);
  commentElement.appendChild(text);

  return commentElement;
};

const renderComments = () => {
  socialComments.innerHTML = '';
  const totalComments = currentComments.length;

  if (totalComments === 0) {
    const noComments = document.createElement('li');
    noComments.classList.add('social__comment');
    noComments.textContent = 'Пока нет комментариев';
    socialComments.appendChild(noComments);
    commentsLoader.classList.add('hidden');
    commentCountBlock.classList.add('hidden');
    return;
  }

  commentCountBlock.classList.remove('hidden');

  const commentsToShow = Math.min(commentsShown + COMMENTS_PER_PAGE, totalComments);

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsToShow; i++) {
    fragment.appendChild(createCommentElement(currentComments[i]));
  }

  socialComments.appendChild(fragment);

  commentCountBlock.innerHTML = `
    <span class="social__comment-shown-count">${commentsToShow}</span>
    из
    <span class="social__comment-total-count">${totalComments}</span>
    комментариев
  `;

  commentsShown = commentsToShow;

  if (commentsShown >= totalComments) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

function onCommentsLoaderClick() {
  renderComments();
}

const openBigPicture = (photoData) => {
  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  socialCaption.textContent = photoData.description;

  currentComments = photoData.comments || [];
  commentsShown = 0;

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  commentCountBlock.innerHTML = '';

  renderComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  currentComments = [];
  commentsShown = 0;
};

function onBigPictureKeydown(evt) {
  if (isEscapeKey(evt) && !bigPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onPictureCancelClick() {
  closeBigPicture();
}

function onBigPictureClick(evt) {
  if (evt.target === bigPicture) {
    closeBigPicture();
  }
}

pictureCancel.addEventListener('click', onPictureCancelClick);
commentsLoader.addEventListener('click', onCommentsLoaderClick);
bigPicture.addEventListener('click', onBigPictureClick);
document.addEventListener('keydown', onBigPictureKeydown);

export { openBigPicture };
export { closeBigPicture };
