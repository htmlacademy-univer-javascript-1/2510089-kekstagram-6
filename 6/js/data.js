import {getRandomArrayElement, getRandomInteger, createIdGenerator} from './util.js';


const MESSAGES = [ 'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const DESCRIPTIONS = [
  'Красивый закат на море.',
  'Мой любимый кот спит на диване.',
  'Цветы в саду после дождя.',
  'Горы и чистое небо.',
  'Чашка кофе утром.',
  'Дети играют в парке.',
  'Старый дом с зелёной крышей.',
  'Пёс бежит по полю.',
  'Первый снег в этом году.',
  'Радуга после дождя.',
  'Летний пикник в лесу.',
  'Велосипед у подъезда.',
  'Рыбак на озере на рассвете.',
  'Смешной момент с друзьями.',
  'Тихий вечер на балконе.',
  'Пирожное из новой кондитерской.',
  'Полевые ромашки в вазе.',
  'Дождь за окном и плед.',
  'Смешной котёнок в коробке.',
  'Прогулка по осеннему парку.'
];

const NAMES = [
  'Анна',
  'Иван',
  'Мария',
  'Алексей',
  'Елена',
  'Дмитрий',
  'Ольга',
  'Сергей',
  'Наталья',
  'Павел',
];

const commentGenerator = () => ({
  id: createIdGenerator(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});


const generateComments = Array.from({length: getRandomInteger(0,30)}, commentGenerator);


const generatePhoto = () => {
  const id = createIdGenerator();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15,200),
    comments: generateComments
  };
};

const generatePhotosArray = Array.from({length: 25}, generatePhoto);

export{generatePhotosArray};
