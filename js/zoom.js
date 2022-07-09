const SIZE_MIN = 25;
const SIZE_MAX = 100;
const SIZE_STEP = 25;
let currentIndex;
let currentScaleValue = SIZE_MAX;

const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleInput = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const setImagePreviewScale = (value) => {
  imgUploadPreview.style.transform = `scale(${  value / 100  })`;
  currentIndex = `${value  }%`;
  scaleInput.setAttribute('value', currentIndex);
};

const reduceZoom = () => {
  currentScaleValue -= SIZE_STEP;
  setImagePreviewScale(currentScaleValue);
};

const increaseZoom = () => {
  currentScaleValue += SIZE_STEP;
  setImagePreviewScale(currentScaleValue);
};

const onScaleImgOut = () => {
  if (currentScaleValue > SIZE_MIN) {
    reduceZoom();
  }
};

const onScaleImgIn = () => {
  if (currentScaleValue < SIZE_MAX) {
    increaseZoom();
  }
};

scaleDownButton.addEventListener('click', onScaleImgOut);

scaleDownButton.addEventListener('keydown', onScaleImgOut);

scaleUpButton.addEventListener('click', onScaleImgIn);

scaleUpButton.addEventListener('keydown', onScaleImgIn);

export {scaleInput, imgUploadPreview, scaleDownButton, scaleUpButton, onScaleImgIn, onScaleImgOut};
