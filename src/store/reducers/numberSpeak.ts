// reducers/count.ts
import { ActionTypes } from '../actions/actions';

export interface stateNumberSpeak {
  allNumber: number[];
  count: number;
}

// Начальное состояние
const initialState: stateNumberSpeak = {
  allNumber: [],
  count: 0,
};

const numberSpeakReducer = (state: stateNumberSpeak = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'ALL_NUMBER_INIT':
      return { ...state, allNumber: action.allNumber, count: 0 };

    case 'ALL_NUMBER_INCREMENT': {
      if (state.count + 1 === state.allNumber.length) {
        console.log('Закончили');
        return { ...state, count: state.count };
      } else {
        return { ...state, count: state.count + 1 };
      }
    }

    case 'ALL_NUMBER_DECREMENT':
      return { ...state, count: state.count - 1 };

    case 'ALL_NUMBER_RESET_COUNT':
      return { ...state, count: 0 };

    default:
      return state;
  }
};

export default numberSpeakReducer;
