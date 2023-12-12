// store.ts

import { createStore, combineReducers } from 'redux';
import countReducer, { stateCounts } from './reducers/count'; // Импортируйте редюсер
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

const store = createStore(rootReducer);

export { store };
