import './form.js';
import { getData } from './api.js';
import { renderPhotos } from './picture.js';
import { showFilters } from './filter.js';

getData((photos) => {
  renderPhotos(photos);
  showFilters(photos);
});
