import './form.js';
/* import { onSubmitForm } from './form-validation.js';
import { closeUploadForm } from './form.js'; */
import { getData } from './api.js';
import { renderPhotos } from './picture.js';
import { showFilters } from './filter.js';
/* import { debounce } from './util.js';
const RERENDER_DELAY = 500; */

getData((photos) => {
  renderPhotos(photos);
  showFilters(photos);
  /* showFilters(debounce(
    () => renderPhotos(photos),
    RERENDER_DELAY,
  )); */
});
