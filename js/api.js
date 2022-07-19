import { openErrorMessage, showAlertMessage } from './messages.js';

const getData = (onSuccess) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((responce) => responce.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlertMessage('При загрузке данных с сервера произошла ошибка.');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((responce) => {
      if (responce.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      openErrorMessage();
    });
};

export { getData, sendData };
