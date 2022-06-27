import { isEscapeKey } from './util.js';
import {closeUploadForm} from './form.js';
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
const regularExpression = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const MAX_LENGHT_HASHTAG = 20;
const MAX_HASHTAG_NUMBERS = 5;
const MAX_LENGTH_DESCRIPTION = 140;

const getHashtags = (string) => string.split(' ').filter((item) => item !== '');

const checkHashtagsLength = (value) => value.length <= MAX_LENGHT_HASHTAG;

const checkHashtagsSymbols = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.every((element) => regularExpression.test(element));
};

const getUniqueHashtags = (value) => {
  const hashtags = getHashtags(value);
  const uniqueSet = new Set(hashtags);
  return hashtags.length === uniqueSet.size;
};

const checkQuantity = (string) => getHashtags(string).length <= MAX_HASHTAG_NUMBERS;

const getHashtagsToLowerCase = (string) => {
  const hashtags = getHashtags(string);
  return hashtags.map((element) => element.toLowerCase());
};

const checkCommentsLength = (value) => value.length <= MAX_LENGTH_DESCRIPTION;

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
});

pristine.addValidator(textDescription, checkCommentsLength, `Не более ${MAX_LENGTH_DESCRIPTION} символов`);
pristine.addValidator(textHashtags, checkHashtagsLength, `Не более ${MAX_LENGHT_HASHTAG} символов`);
pristine.addValidator(textHashtags, checkHashtagsSymbols, 'хэш-тег начинается с символа # (решётка), строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
pristine.addValidator(textHashtags, getUniqueHashtags, 'один и тот же хэш-тег не может быть использован дважды');
pristine.addValidator(textHashtags, checkQuantity, 'нельзя указать больше пяти хэш-тегов');
pristine.addValidator(textHashtags, getHashtagsToLowerCase, '');

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    imgUploadForm.submit();
  }
});

function onPopupEscPress(evt) {
  if (textDescription !== document.activeElement && textHashtags !== document.activeElement) {
    isEscapeKey(evt, closeUploadForm);
  }
}

export {onPopupEscPress};
