import {getRandomArrayElement} from './util.js';
import { getRandom } from './util.js';

const DESCRIPTION = [
  'Не спеши взрослеть. Взросление – это ловушка.',
  'Необязательно всем нравится. Не все люди имеют значение.',
  'Молодые, дикие, свободные.',
  'Счастье никогда не выйдет из моды.',
  'Я обещаю, что это не последнее фото, которое я публикую сегодня.',
  'Красиво жить не запретишь.'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Карл',
  'Даня',
  'Паша',
  'Стас',
  'Рома',
  'Таня',
  'Лена',
  'Маша',
];

const IMAGE_QUANTITY = 25;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
const AVATARS_MIN = 1;
const AVATARS_MAX = 6;

const imageIdComments = [];
for (let i=1; i<=500; i++) {
  imageIdComments.push(i);
}

const getCommentObject = () => {
  const comments = [];

  for (let i=0; i<=getRandom(1, 6); i++) {
    comments.push({
      id: imageIdComments[i],
      avatar: `img/avatar-${  getRandom (AVATARS_MIN, AVATARS_MAX)  }.svg`,
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(NAMES),
    });
  }
  return comments;
};

const imageId = [];
for (let i=1; i<=IMAGE_QUANTITY; i++) {
  imageId.push(i);
}

const getImageObject = (number) => {
  const photos = [];

  for (let i = 0; i <= number; i++) {
    photos.push({
      id: imageId[i],
      url: `photos/${  getRandom (1, 25)  }.jpg`,
      description: getRandomArrayElement(DESCRIPTION),
      likes: getRandom (LIKES_MIN, LIKES_MAX),
      comments: getCommentObject()
    });
  }

  return photos;
};

const imageDescription = getImageObject(IMAGE_QUANTITY);

export {imageDescription};
