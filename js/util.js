const getRandom = (min, max) =>  {
  const minNumber = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const maxNumber = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (minNumber - maxNumber + 1) + maxNumber;
  return Math.floor(result);
};

const checkStringLength = (text, maxLength) => (text.length <= maxLength);

checkStringLength('Какой-то комментарий', 140);

const getRandomArrayElement = (elements) => elements[getRandom(0, elements.length - 1)];

export {getRandom};
export {getRandomArrayElement};
