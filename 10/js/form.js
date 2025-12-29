const form = document.querySelector('#upload-select-image');
const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const descriptionInput = form.querySelector('.text__description');
const submitButton = form.querySelector('#upload-submit');
const body = document.body;

const MAX_COMMENT_LENGTH = 140;

import { pristine } from './hashtags-pristine.js';

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
    if (evt.target === form.querySelector('.text__hashtags') ||
        evt.target === descriptionInput) {
      evt.stopPropagation();
      return;
    }

    evt.preventDefault();
    closeForm();
  }
};


function closeForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadCancel.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', onDocumentKeydown);

  form.reset();
  pristine.reset();
  uploadInput.value = '';

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

descriptionInput.addEventListener('input', validateForm);

uploadInput.addEventListener('change', () => {
  if (uploadInput.files.length > 0) {
    openForm();
  }
});

form.addEventListener('submit', (evt) => {

  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Отправляется...';

});


export { openForm, closeForm };
