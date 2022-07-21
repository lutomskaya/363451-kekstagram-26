const ESCAPE = 'Escape';

const makeElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscapeKey = (evt) => evt.key === ESCAPE;

const checkStringLength = (text, maxLength) => (text.length <= maxLength);

export { makeElement, isEscapeKey, checkStringLength, debounce};
