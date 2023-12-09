// store.ts

import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import countReducer, { stateCounts } from './reducers/count'; // Импортируйте редюсер
import { Persistor } from 'redux-persist/es/types';
import dataReducer, { IDataState } from './reducers/data';
import lessonReducer, { stateLesson } from './reducers/lesson';
import imageAndTextReducer, { stateImageAndText } from './reducers/imageAndText';
import numberSpeakReducer, { stateNumberSpeak } from './reducers/numberSpeak';

// Создайте корневой редюсер
const rootReducer = combineReducers({
  stateCounts: countReducer,
  stateData: dataReducer,
  stateLesson: lessonReducer,
  stateImageAndText: imageAndTextReducer,
  stateNumberSpeak: numberSpeakReducer,
});

export interface IState {
  stateCounts: stateCounts;
  stateData: IDataState;
  stateLesson: stateLesson;
  stateImageAndText: stateImageAndText;
  stateNumberSpeak: stateNumberSpeak;
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);
const persistor: Persistor = persistStore(store);

export { store, persistor };
