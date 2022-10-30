export const getRandomNumberInRange = (min = 0, max = 10) =>
  Math.floor(Math.random() * (max - min) + min);

export const getRandomArrayIndex = (arrLen: number) =>
  Math.floor(Math.random() * arrLen);

export const getRandomArrayElem = (arr: any[]) =>
  arr[getRandomArrayIndex(arr.length)];
