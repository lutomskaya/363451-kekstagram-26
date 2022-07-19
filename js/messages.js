import { isEscapeKey } from './util.js';
import { bodyContainer } from './form.js';

const ALERT_SHOW_TIME = 5000;

const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);
const errorButton = errorElement.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const successButton = successElement.querySelector('.success__button');
const uploadFormOverlayElement = document.querySelector('.img-upload__overlay');
const photoUploadElement = document.querySelector('#upload-file');

const onErrorEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeErrorMessage();
  }
};

const onErrorModalClick = (evt) => {
  if (evt.target.matches('.error')) {
    closeErrorMessage();
  }
};

const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeSuccessMessage();
  }
};

const onSuccessModalClick = (evt) => {
  if (evt.target.matches('.success')) {
    closeSuccessMessage();
  }
};

const openErrorMessage = () => {
  errorElement.style.zIndex = '100';
  bodyContainer.append(errorElement);
  errorButton.addEventListener('click', () => {closeErrorMessage();});
  document.addEventListener('click', onErrorModalClick);
  document.addEventListener('keydown', onErrorEscKeydown);
};


function closeErrorMessage() {
  const modal = document.querySelector('.error');
  modal.remove();
  photoUploadElement.value = '';
  uploadFormOverlayElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('click', onErrorModalClick);
  document.removeEventListener('keydown', onErrorEscKeydown);
}

const openSuccessMessage = () => {
  bodyContainer.append(successElement);
  bodyContainer.classList.add('modal-open');
  successButton.addEventListener('click', () => {closeSuccessMessage();});
  document.addEventListener('click', onSuccessModalClick);
  document.addEventListener('keydown', onSuccessEscKeydown);
};

function closeSuccessMessage() {
  const modal = document.querySelector('.success');
  modal.remove();
  document.body.classList.remove('modal-open');
  document.removeEventListener('click', onSuccessModalClick);
  document.removeEventListener('keydown', onSuccessEscKeydown);
}

const showAlertMessage = (message) => {
  const alertBlock = document.createElement('div');
  alertBlock.style.zIndex = 1000;
  alertBlock.style.position = 'absolute';
  alertBlock.style.left = 0;
  alertBlock.style.top = '10px';
  alertBlock.style.right = 0;
  alertBlock.style.padding = '10px 3px';
  alertBlock.style.fontSize = '24px';
  alertBlock.style.fontWeight = '600';
  alertBlock.style.textAlign = 'center';
  alertBlock.style.backgroundColor = 'red';
  alertBlock.style.color = 'black';

  alertBlock.textContent = message;

  document.body.append(alertBlock);

  setTimeout(() => {
    alertBlock.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlertMessage, openErrorMessage, openSuccessMessage };


