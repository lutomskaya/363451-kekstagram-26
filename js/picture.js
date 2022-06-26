import {imageDescription} from './data.js';
import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const otherUsers = imageDescription;

otherUsers.forEach((photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  fragment.appendChild(pictureElement);

  pictureElement.addEventListener('click', () => {
    openBigPicture(photo);
  });
});

pictureList.appendChild(fragment);

export {pictureList};
