const SIZE_MIN = 25;
const SIZE_MAX = 100;
const SIZE_STEP = 25;
const DEFAULT_FILTER_VALUE = 100;

const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleInput = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const onReduceZoom = () => {
  let scale = parseInt(scaleInput.value, 10);
  if (scale > SIZE_MIN) {
    scale -= SIZE_STEP;
    scaleInput.value = `${scale}%`;
    imgUploadPreview.style = `transform: scale(${scale / 100})`;
  }
};

const onIncreaseZoom = () => {
  let scale = parseInt(scaleInput.value, 10);
  if (scale < SIZE_MAX) {
    scale += SIZE_STEP;
    scaleInput.value = `${scale}%`;
    imgUploadPreview.style = `transform: scale(${scale / 100})`;
  }
};

const setupZoom = () => {
  scaleInput.value = `${DEFAULT_FILTER_VALUE}%`;
  scaleDownButton.addEventListener('click', onReduceZoom);
  scaleUpButton.addEventListener('click', onIncreaseZoom);
};

const destroyZoom = () => {
  scaleInput.value = `${DEFAULT_FILTER_VALUE}%`;
  scaleDownButton.removeEventListener('click', onReduceZoom);
  scaleUpButton.removeEventListener('click', onIncreaseZoom);
};

export { setupZoom, destroyZoom };
