// reducers/count.ts
import { ActionTypes } from "../actions/actions";

export interface stateImageAndText {
  allWords: string[];
  count: number;
}

// Начальное состояние
const initialState: stateImageAndText = {
  allWords: [],
  count: 0,
};

const imageAndTextReducer = (
  state: stateImageAndText = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case "ALL_WORDS_INIT":
      return { ...state, allWords: action.allWords };

    case "ALL_WORDS_INCREMENT": {
      if (state.count + 1 === state.allWords.length) {
        console.log("Закончили");
        return { ...state, count: state.count };
      } else {
        return { ...state, count: state.count + 1 };
      }
    }

    case "ALL_WORDS_DECREMENT":
      return { ...state, count: state.count - 1 };

    case "ALL_WORDS_RESET_COUNT":
      return { ...state, count: 0 };

    default:
      return state;
  }
};

export default imageAndTextReducer;
