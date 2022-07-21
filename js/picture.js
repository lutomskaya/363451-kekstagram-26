import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

const renderPhotos = (photos) => {
  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    fragment.append(pictureElement);

    pictureElement.addEventListener('click', () => {
      openBigPicture(photo);
    });
  });
  pictureList.querySelectorAll('.picture').forEach((item) => item.remove());
  pictureList.append(fragment);
};

export {renderPhotos};
