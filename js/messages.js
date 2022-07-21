import { isEscapeKey } from './util.js';
import { bodyContainer } from './form.js';

const ALERT_SHOW_TIME = 5000;

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const uploadFormOverlayElement = document.querySelector('.img-upload__overlay');
const photoUploadElement = document.querySelector('#upload-file');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeMessage();
  }
};

const onMessageClick = () => {
  closeMessage();
  window.removeEventListener('click', onMessageClick);
};

const messageType = {
  success: 'success',
  error: 'error'
};

const openMessage = (type) => {
  let template;

  switch (type) {
    case messageType.success:
      template = successTemplate;
      break;
    case messageType.error:
      template = errorTemplate;
      break;
  }

  const messageElement = template.cloneNode(true);
  bodyContainer.appendChild(messageElement);
  messageElement.style.zIndex = 5;
  document.addEventListener('keydown', onEscKeydown);
  messageElement.addEventListener('click', onMessageClick);
};

function closeMessage() {
  const modalError = bodyContainer.querySelector('.error');
  const modalSuccess = bodyContainer.querySelector('.success');
  if (modalError) {
    modalError.remove();
  } else {
    modalSuccess.remove();
    uploadFormOverlayElement.classList.add('hidden');
  }

  photoUploadElement.value = '';
  document.removeEventListener('keydown', onEscKeydown);
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

export {showAlertMessage, openMessage };


