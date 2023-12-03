///ФУНКЦИЯ БЕРЕТ ВСЕ СЛОВА И ВОЗРВЩАЕТ 3 СЛОВА ЗА ИСКЛЮЧЕНИЕМ ОДНОГО ЧТОБЫ НЕ ДУБЛИРОВАТЬ

import { iconAssets } from './iconAssets';

// Определите тип для слов
type Word = string;
const allWordsArr = Object.keys(iconAssets);
export function selectWords(excludedWord: Word): Word[] {
  // Создайте копию исходного массива, чтобы не изменять его
  const copyOfWords: Word[] = [...allWordsArr];

  // Исключите слово, которое пришло на вход
  const indexToExclude: number = copyOfWords.indexOf(excludedWord);
  if (indexToExclude !== -1) {
    copyOfWords.splice(indexToExclude, 1);
  }

  // Выберите 3 различных слова случайным образом
  const selectedWords: Word[] = [];
  while (selectedWords.length < 3) {
    const randomIndex: number = Math.floor(Math.random() * copyOfWords.length);
    const randomWord: Word = copyOfWords[randomIndex];
    if (!selectedWords.includes(randomWord)) {
      selectedWords.push(randomWord);
    }
  }

  return selectedWords;
}

/// ФУНКЦИЯ ПЕРЕМЕШИВАЕТ МАССИВ

export function shuffleWords(words: Word[]): Word[] {
  // Создайте копию массива слов, чтобы не изменять исходный массив
  const shuffledWords: Word[] = [...words];

  // Перемешайте массив
  for (let i = shuffledWords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
  }

  return shuffledWords;
}
