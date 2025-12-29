// big-picture.js
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const pictureCancel = bigPicture.querySelector('#picture-cancel');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');


let currentComments = [];
let commentsShown = 0;
const COMMENTS_PER_PAGE = 5;


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

  commentCountBlock.innerHTML = `${commentsToShow} из <span class="comments-count">${totalComments}</span> комментариев`;

  commentsShown = commentsToShow;

  if (commentsShown >= totalComments) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const loadMoreComments = () => {
  renderComments();
};

const openBigPicture = (photoData) => {

  bigPictureImg.src = photoData.url;
  bigPictureImg.alt = photoData.description;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments ? photoData.comments.length : 0;
  socialCaption.textContent = photoData.description;

  currentComments = photoData.comments || [];
  commentsShown = 0;

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

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

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
    evt.preventDefault();
    closeBigPicture();
  }
};

pictureCancel.addEventListener('click', () => {
  closeBigPicture();
});

commentsLoader.addEventListener('click', loadMoreComments);

bigPicture.addEventListener('click', (evt) => {
  if (evt.target === bigPicture) {
    closeBigPicture();
  }
});

document.addEventListener('keydown', onDocumentKeydown);

export { openBigPicture };
export { closeBigPicture };

