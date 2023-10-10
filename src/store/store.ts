// store.ts
import { createStore, combineReducers } from "redux";
import countReducer from "./reducers/count";

// Корневой редуктор, объединяющий все редукторы
const rootReducer = combineReducers({
  stateCounts: countReducer,
});

const store = createStore(rootReducer);

export default store;
