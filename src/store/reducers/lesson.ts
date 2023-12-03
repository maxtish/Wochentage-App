// reducers/count.ts
import { IWordsLesson, TData } from "../../../constants";
import { ActionTypes } from "../actions/actions";

export interface stateLesson {
  lesson: number;
  guess: TData[];
  words: IWordsLesson[];
  menu: boolean;
  delay: number;
}

// Начальное состояние
const initialState: stateLesson = {
  lesson: 0,
  guess: [],
  words: [],
  menu: true,
  delay: 1,
};

const lessonReducer = (
  state: stateLesson = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case "LESSON_INIT":
      return { ...state, lesson: (state.lesson = action.lesson) };
    case "LESSON_QUESS_INIT":
      return { ...state, guess: action.guess };
    case "LESSON_WORDS_INIT":
      return { ...state, words: action.words };

    case "LESSON_RESET":
      return { ...state, guess: [], words: [] };
    case "LESSON_MENU_OPEN":
      return { ...state, menu: true };
    case "LESSON_MENU_CLOSE":
      return { ...state, menu: false };

    case "LESSON_DELAY_INIT":
      return { ...state, delay: action.delay };

    default:
      return state;
  }
};

export default lessonReducer;
