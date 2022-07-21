import { renderPhotos } from './picture.js';
import { debounce } from './util.js';

const NEW_PICTURES = 10;
const RERENDER_DELAY = 500;
let photo;

const pictureList = document.querySelector('.pictures');
const imgFiltersForm = document.querySelector('.img-filters__form');
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

const getDiscussedFilter = (pictures) => {
  const copyPictures = pictures.slice();
  return copyPictures.sort(compareComments);
};

const renderFilter = debounce ((filterButton) => {
  clearPictures();

  if (filterButton === defaultButton) {
    renderPhotos(getDefaultFilter(photo));
  }

  if (filterButton === randomButton) {
    renderPhotos(getRandomFilter(photo));
  }

  if (filterButton === discussedButton) {
    renderPhotos(getDiscussedFilter(photo));
  }
}, RERENDER_DELAY);


const onFilterChanged = (evt) => {
  evt.preventDefault();
  removeActiveClass(evt.target);
  renderFilter(evt.target);
};

const showFilters = (pictures) => {
  photo = pictures;
  imgFiltersForm.addEventListener('click', onFilterChanged);
};

export {showFilters};
