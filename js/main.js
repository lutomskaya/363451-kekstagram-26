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

const getRandom = (min, max) =>  {
  const minNumber = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const maxNumber = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (minNumber - maxNumber + 1) + maxNumber;
  return Math.floor(result);
};

const checkStringLength = (text, maxLength) => (text.length <= maxLength);

checkStringLength('Какой-то комментарий', 140);

const getRandomArrayElement = (elements) => elements[getRandom(0, elements.length - 1)];

const imageId = [];
for (let i=1; i<=IMAGE_QUANTITY; i++) {
  imageId.push(i);
}

const imageIdComments = [];
for (let i=1; i<=500; i++) {
  imageIdComments.push(i);
}

const getCommentObject = () => {
  const comments = [];

  for (let i=0; i<=getRandom(1, 6); i++) {
    comments.push({
      id: imageIdComments.shift(),
      avatar: `img/avatar-${  getRandom (AVATARS_MIN, AVATARS_MAX)  }.svg`,
      message: getRandomArrayElement(COMMENTS),
      name: getRandomArrayElement(NAMES),
    });
  }
  return comments;
};

const getImageObject = () => ({
  id: imageId.shift(),
  url: `photos/${  getRandom (1, 25)  }.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandom (LIKES_MIN, LIKES_MAX),
  comments: getCommentObject()
});

const imageDescription = Array.from({length: IMAGE_QUANTITY}, getImageObject);

// eslint-disable-next-line no-console
console.log(imageDescription);
