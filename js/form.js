import { isEscapeKey } from './util.js';
import { pristine } from './form-validation.js';
import { scaleInput, imgUploadPreview, scaleUpButton, scaleDownButton, onScaleImgIn, onScaleImgOut } from './zoom.js';
import { changeEffects, getEffectStyle, uiSlider } from './effect.js';

const DEFAULT_FILTER_VALUE = 100;
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgEffectsFieldset = document.querySelector('.img-upload__effects');
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
  imgUploadPreview.style.transform = '';
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.className = 'none';
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
  scaleDownButton.removeEventListener('click', onScaleImgOut);
  scaleDownButton.removeEventListener('keydown', onScaleImgOut);
  scaleUpButton.removeEventListener('click', onScaleImgIn);
  scaleUpButton.removeEventListener('keydown', onScaleImgIn);
}

const openUploadForm = () => {
  uploadFile.addEventListener('change', () => {
    scaleInput.defaultValue = `${DEFAULT_FILTER_VALUE  }%`;
    uploadOverlay.classList.remove('hidden');
    bodyContainer.classList.add('modal-open');
    uploadClose.addEventListener('click', onClosedForm);
    document.addEventListener('keydown', onEscKeydown);
    textHashtags.addEventListener('keydown', stopPropagationEsc);
    textDescription.addEventListener('keydown', stopPropagationEsc);
    uiSlider.on('update', changeEffects);
    imgEffectsFieldset.addEventListener('change', getEffectStyle);
  });
};

export {openUploadForm, closeUploadForm};
