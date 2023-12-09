import { IWordsLesson, TBazaArrayItem, TData } from '../../../constants';
import { IButtonsState } from '../reducers/data';

// actions.ts
export const increment = () => ({
  type: 'INCREMENT' as const,
});

export const decrement = () => ({
  type: 'DECREMENT' as const,
});

export const initData = (data: TData) => ({
  type: 'INIT_DATA' as const,
  data,
});

export const delAll = () => ({
  type: 'DEL_ALL' as const,
});

export const ratingIncrement = (id: string) => ({
  type: 'RATING_INCREMENT' as const,
  id,
});

export const ratingDecrement = (id: string) => ({
  type: 'RATING_DECREMENT' as const,
  id,
});

export const addQueue = (queueArr: TBazaArrayItem) => ({
  type: 'ADD_QUEUE' as const,
  queueArr,
});

export const updateButtons = (shuffledButtonsObj: IButtonsState) => ({
  type: 'SHUFFLED_BUTTONS' as const,
  shuffledButtonsObj,
});

export const resetCount = () => ({
  type: 'RESET_COUNT' as const,
});

export const lessonInit = (lesson: number) => ({
  type: 'LESSON_INIT' as const,
  lesson,
});

export const lessonReset = () => ({
  type: 'LESSON_RESET' as const,
});

export const lessonQuessInit = (guess: TData[]) => ({
  type: 'LESSON_QUESS_INIT' as const,
  guess,
});

export const lessonWordsInit = (words: IWordsLesson[]) => ({
  type: 'LESSON_WORDS_INIT' as const,
  words,
});

export const lessonMenuOpen = () => ({
  type: 'LESSON_MENU_OPEN' as const,
});

export const lessonMenuClose = () => ({
  type: 'LESSON_MENU_CLOSE' as const,
});

export const lessonDelayInit = (delay: number) => ({
  type: 'LESSON_DELAY_INIT' as const,
  delay,
});

export const allWordsInit = (allWords: string[]) => ({
  type: 'ALL_WORDS_INIT' as const,
  allWords,
});

export const allWordsIncrement = () => ({
  type: 'ALL_WORDS_INCREMENT' as const,
});

export const allWordsDecrement = () => ({
  type: 'ALL_WORDS_DECREMENT' as const,
});
export const allWordsResetCount = () => ({
  type: 'ALL_WORDS_RESET_COUNT' as const,
});
/// numberSpeakReducer
export const allNumberInit = (allNumber: string[]) => ({
  type: 'ALL_NUMBER_INIT' as const,
  allNumber,
});

export const allNumberIncrement = () => ({
  type: 'ALL_NUMBER_INCREMENT' as const,
});

export const allNumbersDecrement = () => ({
  type: 'ALL_NUMBER_DECREMENT' as const,
});
export const allNumbersResetCount = () => ({
  type: 'ALL_NUMBER_RESET_COUNT' as const,
});

export type ActionTypes = ReturnType<
  | typeof increment
  | typeof decrement
  | typeof initData
  | typeof delAll
  | typeof ratingIncrement
  | typeof ratingDecrement
  | typeof addQueue
  | typeof updateButtons
  | typeof resetCount
  | typeof lessonInit
  | typeof lessonReset
  | typeof lessonQuessInit
  | typeof lessonWordsInit
  | typeof lessonMenuOpen
  | typeof lessonMenuClose
  | typeof lessonDelayInit
  | typeof allWordsInit
  | typeof allWordsIncrement
  | typeof allWordsDecrement
  | typeof allWordsResetCount
  | typeof allNumberInit
  | typeof allNumberIncrement
  | typeof allNumbersDecrement
  | typeof allNumbersResetCount
>;
