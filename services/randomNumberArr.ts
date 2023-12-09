export const randomNumberArr = (): number[] => {
  let randomNumbersArr: number[] = [];

  const generateNumbersInInterval = (arr: number[], min: number, max: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      arr.push(randomNumber);
    }
    return arr;
  };

  // Генерация 5 случайных чисел от 0 до 10
  randomNumbersArr = generateNumbersInInterval(randomNumbersArr, 0, 10, 5);

  // Генерация 10 случайных чисел от 10 до 100
  randomNumbersArr = generateNumbersInInterval(randomNumbersArr, 10, 100, 10);

  // Генерация 20 случайных чисел от 100 до 1000
  randomNumbersArr = generateNumbersInInterval(randomNumbersArr, 100, 1000, 20);

  // Генерация 20 случайных чисел от 1000 до 1000000
  randomNumbersArr = generateNumbersInInterval(randomNumbersArr, 1000, 1000000, 20);

  // Пример использования

  return randomNumbersArr;
};
