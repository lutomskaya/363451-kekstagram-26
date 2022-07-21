import { renderPhotos } from './picture.js';
import { debounce } from './util.js';

const NEW_PICTURES = 10;

const pictureList = document.querySelector('.pictures');
const filtersElement = document.querySelector('.img-filters');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');

const removeActiveClass = (buttonElement) => {
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  buttonElement.classList.add('img-filters__button--active');
};

const clearPictures = () => {
  pictureList.querySelectorAll('.picture').forEach((element) => {
    element.remove();
  });
};

const compareComments = (pictureA, pictureB) => {
  const rankA = pictureA.comments.length;
  const rankB = pictureB.comments.length;

  return rankB - rankA;
};

const getDefaultFilter = (pictures) => pictures.slice();

const getRandomFilter = (pictures) => {
  const copyPictures = pictures.slice();
  return copyPictures.sort(() => 0.5 - Math.random()).slice(0, NEW_PICTURES);
};

const getDiscussrdFilter = (pictures) => {
  const copyPictures = pictures.slice();
  return copyPictures.sort(compareComments);
};

const renderFilter = (pictures) => {
  clearPictures();
  renderPhotos(pictures);
};

const showFilters = (pictures) => {
  filtersElement.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', debounce((evt) => {
    removeActiveClass(evt.target);
    renderFilter(getDefaultFilter(pictures));
  }));
  randomButton.addEventListener('click', debounce((evt) => {
    removeActiveClass(evt.target);
    renderFilter(getRandomFilter(pictures));
  }));
  discussedButton.addEventListener('click', debounce((evt) => {
    removeActiveClass(evt.target);
    renderFilter(getDiscussrdFilter(pictures));
  }));
};

export {showFilters};
