// store.ts

import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import countReducer from "./reducers/count"; // Импортируйте редюсер
import { Persistor } from "redux-persist/es/types";

// Создайте корневой редюсер
const rootReducer = combineReducers({
  stateCounts: countReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor: Persistor = persistStore(store);

export { store, persistor };
