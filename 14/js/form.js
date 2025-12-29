import { pristine } from './hashtags-pristine.js';
import { sendDataToServer } from './api.js';
import { resetEffects } from './effects.js';

const form = document.querySelector('#upload-select-image');
const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const descriptionInput = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');
const body = document.body;
const hashtagInput = form.querySelector('.text__hashtags');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const MAX_COMMENT_LENGTH = 140;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

pristine.addValidator(
  descriptionInput,
  (value) => value.length <= MAX_COMMENT_LENGTH,
  `Максимальная длина комментария - ${MAX_COMMENT_LENGTH} символов`
);

const validateForm = () => {
  const isValid = pristine.validate();
  submitButton.disabled = !isValid;
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
    if (evt.target === hashtagInput || evt.target === descriptionInput) {
      evt.stopPropagation();
      return;
    }
    evt.preventDefault();
    closeForm();
  }
};

function showMessage(type, errorMessage = '') {
  const template = document.querySelector(`#${type}`).content.querySelector(`.${type}`);
  const message = template.cloneNode(true);
  const messageButton = message.querySelector('button');

  if (errorMessage && message.querySelector('.error__title')) {
    message.querySelector('.error__title').textContent = errorMessage;
  }

  function closeMessage() {
    message.remove();
    document.removeEventListener('keydown', onMessageEscKeyDown);
    message.removeEventListener('click', onMessageClick);
  }

  function onMessageEscKeyDown(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }

  function onMessageClick(evt) {
    if (evt.target === message) {
      closeMessage();
    }
  }

  messageButton.addEventListener('click', closeMessage);
  message.addEventListener('click', onMessageClick);
  document.addEventListener('keydown', onMessageEscKeyDown);
  document.body.append(message);

  if (type === 'error') {
    messageButton.focus();
  }
}

const showSuccessMessage = () => showMessage('success');
const showErrorMessage = (errorMessage) => showMessage('error', errorMessage);

function closeForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancel.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onDocumentKeydown);

  form.reset();
  pristine.reset();
  uploadInput.value = '';
  resetEffects();

  imagePreview.src = 'img/upload-default-image.jpg';

  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

function openForm() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancel.addEventListener('click', closeForm);
  document.addEventListener('keydown', onDocumentKeydown);
  validateForm();
}

const loadUserImage = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (!matches) {
    uploadInput.value = '';
    return;
  }

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    imagePreview.src = reader.result;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${reader.result})`;
    });
  });

  reader.readAsDataURL(file);
};

descriptionInput.addEventListener('input', validateForm);
hashtagInput.addEventListener('input', validateForm);

uploadInput.addEventListener('change', () => {
  if (uploadInput.files.length > 0) {
    loadUserImage();
    openForm();
  }
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (!isValid) {
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Отправляется...';

  const formData = new FormData(form);

  const onUploadSuccess = () => {
    closeForm();
    showSuccessMessage();
  };

  const onUploadFail = (errorMessage) => {
    showErrorMessage(errorMessage);
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
  };

  sendDataToServer(onUploadSuccess, onUploadFail, formData);
});

form.addEventListener('reset', () => {
  pristine.reset();
  resetEffects();
  imagePreview.src = 'img/upload-default-image.jpg';
});

uploadCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
});
