import { isEscapeKey } from './util.js';
import { pristine } from './form-validation.js';
import { scaleInput, imgUploadPreview, scaleUpButton, scaleDownButton, onScaleImgIn, onScaleImgOut } from './zoom.js';
import { changeEffects, getEffectStyle, } from './effect.js';

const DEFAULT_FILTER_VALUE = 100;
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgEffectsFieldset = document.querySelector('.img-upload__effects');
const bodyContainer = document.querySelector('body');
const uploadClose = document.querySelector('.img-upload__cancel');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const slider = document.querySelector('.effect-level__slider');

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
  imgEffectsFieldset.removeEventListener('change', changeEffects);
  slider.noUiSlider.destroy();
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

    const uiSlider = noUiSlider.create(slider, {
      range: {min: 0, max: 1,},
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return parseFloat(value);
        },
      },
    });

    uiSlider.on('update', getEffectStyle);
    imgEffectsFieldset.addEventListener('change', changeEffects);
  });
};

export {openUploadForm, closeUploadForm};
