import { isEscapeKey } from './util';
import { bodyContainer } from './form';
import { closeUploadForm } from './form';

const ALERT_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successElement = successTemplate.cloneNode(true);
const successButton = successElement.querySelector('.success__button');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorElement = errorTemplate.cloneNode(true);
const errorButton = errorElement.querySelector('.error__button');

const openErrorMessage = () => {
  bodyContainer.append(errorElement);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onErrorMessageAnyClickClose);
};

const closeErrorMessage = () => {
  errorElement.remove();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onErrorMessageAnyClickClose);
};

errorButton.addEventListener('click', () => closeErrorMessage());

const openSuccessMessage = () => {
  bodyContainer.append(successElement);
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onErrorMessageAnyClickClose);
};

const closeSuccessMessage = () => {
  errorElement.remove();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onErrorMessageAnyClickClose);
};

successButton.addEventListener('click', () => closeSuccessMessage());

function onEscKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorMessage();
    closeSuccessMessage();
  }
}

function onErrorMessageAnyClickClose (evt) {
  if (evt.target === errorElement || evt.target === successElement) {
    closeErrorMessage();
    closeSuccessMessage();
  }
}

const uploadSuccessSubmit = () => {
  closeUploadForm();
  openSuccessMessage();
};

const uploadErrorSubmit = () => {
  openErrorMessage();
};

const showAlertMessage = (message) => {
  const alertBlock = document.createElement('div');
  alertBlock.style.zIndex = 10;
  alertBlock.style.position = 'absolute';
  alertBlock.style.left = 0;
  alertBlock.style.top = '10px';
  alertBlock.style.right = 0;
  alertBlock.style.padding = '10px 3px';
  alertBlock.style.fontSize = '24px';
  alertBlock.style.fontWeight = '600';
  alertBlock.style.textAlign = 'center';
  alertBlock.style.backgroundColor = 'red';

  alertBlock.textContent = message;

  document.body.append(alertBlock);

  setTimeout(() => {
    alertBlock.remove();
  }, ALERT_SHOW_TIME);
};

export {showAlertMessage, uploadSuccessSubmit, uploadErrorSubmit};
