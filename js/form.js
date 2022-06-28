import { isEscapeKey } from './util.js';
import { pristine } from './form-validation.js';

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const bodyContainer = document.querySelector('body');
const uploadClose = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const stopPropagationEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  bodyContainer.classList.remove('modal-open');
  imgUploadForm.reset();
  pristine.reset();
  removeEvent();
};

const onEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
};

const onClosedForm = (evt) => {
  evt.preventDefault();
  closeUploadForm();
};

function removeEvent () {
  uploadClose.removeEventListener('click', onClosedForm);
  document.removeEventListener('keydown', onEscKeydown);
  textHashtags.removeEventListener('keydown', stopPropagationEsc);
  textDescription.removeEventListener('keydown', stopPropagationEsc);
}

const openUploadForm = () => {
  uploadFile.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    bodyContainer.classList.add('modal-open');
    uploadClose.addEventListener('click', onClosedForm);
    document.addEventListener('keydown', onEscKeydown);
    textHashtags.addEventListener('keydown', stopPropagationEsc);
    textDescription.addEventListener('keydown', stopPropagationEsc);
  });
};

export {openUploadForm, closeUploadForm};
