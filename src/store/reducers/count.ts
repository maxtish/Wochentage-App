// reducers/count.ts
import { ActionTypes } from "../actions/actions";

export interface IState {
  stateCounts: IСount;
}

export interface IСount {
  count: number;
}

// Начальное состояние
const initialState: IСount = {
  count: 0,
};

const countReducer = (state: IСount = initialState, action: ActionTypes) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export default countReducer;
