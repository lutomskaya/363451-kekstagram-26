import { makeElement } from './util.js';
const ESC_KEYCODE = 27;
const bigPicture = document.querySelector('.big-picture');
const miniPictures = document.querySelectorAll('.picture');
const bodyContainer = document.querySelector('body');
const urlPicture = bigPicture.querySelector('.big-picture__img img');
const likeCount = bigPicture.querySelector('.likes-count');
const commentList = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.comments-count');
const commentCountElement = bigPicture.querySelector('.social__comment-count');
const commentLoader = bigPicture.querySelector('.comments-loader');
const description = document.querySelector('.social__caption');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const fragment = document.createDocumentFragment();

const getClosedPictureEsc = (evt) => {
  if(evt.keyCode === ESC_KEYCODE) {
    bigPicture.classList.add('hidden');
    bodyContainer.classList.remove('modal-open');
  }
};

const getClosedPicture = () => {
  bigPicture.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
};

const openBigPicture = (photo) => {
  for (let i = 0; i<miniPictures.length; i++) {
    miniPictures[i].addEventListener('click', () => {
      const currentPhoto = photo[i];
      urlPicture.src = currentPhoto.url;
      likeCount.textContent = currentPhoto.likes;
      description.textContent = currentPhoto.description;
      commentCount.textContent = currentPhoto.comments.length;

      for (let j = 0; j < currentPhoto.comments.length; j++) {
        const socialComment = makeElement('li', 'social__comment');
        const image = makeElement('img', 'social__picture');
        image.src = currentPhoto[j].comments.avatar;
        image.alt = currentPhoto.comments[j].name;
        image.width = '35';
        image.heigth = '35';
        socialComment.append(image);
        const p = makeElement('p', 'social__text');
        p.textContent = currentPhoto.comments[j].message;
        socialComment.append(p);

        fragment.append(socialComment);
      }

      commentList.innerHTML = '';
      commentList.append(fragment);
      bigPicture.classList.remove('hidden');
      bodyContainer.classList.add('modal-open');
      closeButton.addEventListener('click', getClosedPicture);
      document.addEventListener('keydown', getClosedPictureEsc);
      commentCountElement.classList.add('hidden');
      commentLoader.classList.add('hidden');
    });
  }
};

const showBigPicture = () => {
  miniPictures.addEventListener('click', openBigPicture);
};

showBigPicture();
