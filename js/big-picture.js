import { makeElement } from './util.js';
import { isEscapeKey } from './util.js';

const COMMENT_COUNT = 5;
const bigPicture = document.querySelector('.big-picture');
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

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  removeEvent();
};
const onPictureEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function removeEvent () {
  document.removeEventListener('keydown', onPictureEscKeydown);
}

const renderComment = (comment) => {
  const socialComment = makeElement('li', 'social__comment');
  const image = makeElement('img', 'social__picture');
  const p = makeElement('p', 'social__text');
  image.src = comment.avatar;
  image.alt = comment.name;
  image.width = '35';
  image.heigth = '35';
  socialComment.append(image);
  p.textContent = comment.message;
  socialComment.append(p);

  return socialComment;
};

const renderComments = (comments) => {
  let currentIndex = 0;
  commentList.innerHTML = '';
  commentCountElement.classList.remove('hidden');
  commentLoader.classList.remove('hidden');

  commentLoader.addEventListener('click', onLoaderClick);
  renderCommentsStep();

  function renderCommentsStep () {
    const lastIndex = Math.min(currentIndex + COMMENT_COUNT, comments.length);
    for (let i = currentIndex; i < lastIndex; i++) {
      commentList.appendChild(renderComment(comments[i]));
    }

    currentIndex = lastIndex;
    commentCountElement.textContent = `${currentIndex  } из ${  comments.length  } комментариев`;

    if (currentIndex === comments.length) {
      commentLoader.classList.add('hidden');
      commentLoader.removeEventListener('click', onLoaderClick);
    }
  }

  function onLoaderClick (evt) {
    evt.preventDefault();
    renderCommentsStep();
  }
};

const openBigPicture = (photo) => {
  urlPicture.src = photo.url;
  urlPicture.alt = photo.description;
  likeCount.textContent = photo.likes;
  description.textContent = photo.description;
  commentCount.textContent = photo.comments.length;
  renderComments(photo.comments);
  commentList.append(fragment);
  description.textContent = photo.description;
  bigPicture.classList.remove('hidden');
  bodyContainer.classList.add('modal-open');
  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onPictureEscKeydown);
};

export {openBigPicture};
