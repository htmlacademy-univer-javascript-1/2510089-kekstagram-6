const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;

const form = document.querySelector('.img-upload__form');
const zoomOutBtnElement = form.querySelector('.scale__control--smaller');
const zoomInBtnElement = form.querySelector('.scale__control--bigger');
const scaleValueElement = form.querySelector('.scale__control--value');
const imageElement = form.querySelector('.img-upload__preview img');
const effectsPreviews = document.querySelectorAll('.effects__preview');

const effectsListElement = form.querySelector('.effects__list');
const sliderContainer = form.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValueElement = document.querySelector('.effect-level__value');

const Effects = {
  none: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: '',
    unit: ''
  },
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: ''
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: 'sepia',
    unit: ''
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    filter: 'invert',
    unit: '%'
  },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px'
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    filter: 'brightness',
    unit: ''
  }
};

let currentEffect = 'none';

function applyScale(value) {
  const scale = value / 100;
  imageElement.style.transform = `scale(${scale})`;
  scaleValueElement.value = `${value}%`;
}

zoomOutBtnElement.addEventListener('click', () => {
  const value = Math.max(parseInt(scaleValueElement.value, 10) - STEP_SCALE, MIN_SCALE);
  applyScale(value);
});

zoomInBtnElement.addEventListener('click', () => {
  const value = Math.min(parseInt(scaleValueElement.value, 10) + STEP_SCALE, MAX_SCALE);
  applyScale(value);
});

function initScale() {
  applyScale(100);
}

function applyEffect() {
  if (currentEffect === 'none') {
    imageElement.style.filter = '';
    sliderContainer.classList.add('hidden');
    effectValueElement.value = '';
    return;
  }

  const sliderValue = sliderElement.noUiSlider.get();
  const effect = Effects[currentEffect];
  const filterValue = `${effect.filter}(${sliderValue}${effect.unit})`;

  imageElement.style.filter = filterValue;
  effectValueElement.value = sliderValue;
}

function createSlider() {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  const effect = Effects[currentEffect];

  if (currentEffect === 'none') {
    sliderContainer.classList.add('hidden');
    imageElement.style.filter = '';
    effectValueElement.value = '';
    return;
  }

  sliderContainer.classList.remove('hidden');

  noUiSlider.create(sliderElement, {
    range: effect.range,
    start: effect.start,
    step: effect.step,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', applyEffect);
}

function onEffectChange(evt) {
  if (!evt.target.matches('input[type="radio"]')) {
    return;
  }

  currentEffect = evt.target.value;
  createSlider();

  if (currentEffect !== 'none') {
    const effect = Effects[currentEffect];
    const filterValue = `${effect.filter}(${effect.start}${effect.unit})`;
    imageElement.style.filter = filterValue;
    effectValueElement.value = effect.start;
  }
}

function resetEffects() {
  currentEffect = 'none';
  initScale();

  const noneRadio = document.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
  }

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }

  sliderContainer.classList.add('hidden');
  imageElement.style.filter = '';
  effectValueElement.value = '';
  imageElement.style.transform = 'scale(1)';

  effectsPreviews.forEach((preview) => {
    preview.style.backgroundImage = 'url("img/upload-default-image.jpg")';
  });
}

function initEffects() {
  initScale();
  sliderContainer.classList.add('hidden');
  effectsListElement.addEventListener('change', onEffectChange);
  createSlider();
}

export { initEffects, resetEffects };
