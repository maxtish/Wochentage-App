// reducers/count.ts
import { ActionTypes } from "../actions/actions";

export interface stateCounts {
  count: number;
}

// Начальное состояние
const initialState: stateCounts = {
  count: 0,
};

const countReducer = (
  state: stateCounts = initialState,
  action: ActionTypes
) => {
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
