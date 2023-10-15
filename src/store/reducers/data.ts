// reducers/data.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActionTypes } from "../actions/actions";
import { v4 as uuidv4 } from "uuid";

export interface IDataItem {
  rus: string;
  de: string;
  rating: number;
}

interface IBaza {
  [key: string]: IDataItem;
}

export interface IButtonsState {
  [key: string]: string;
}
export interface IDataState {
  name: string;
  baza: IBaza;
  queue: { [key: string]: string }; //очередь для угадывания
  button: IButtonsState; //объект для кнопок
}

// Начальное состояние
const initialState: IDataState = {
  name: "",
  baza: {},
  queue: {},
  button: {},
};
const dataReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case "INIT_DATA":
      //инициализация базы -  удаляет старую и вствляет новую
      const newState: IDataState = {
        name: action.data.name,
        baza: {},
        queue: {},
        button: {},
      };
      const length: number = action.data.de.length;
      for (let key = 0; key < length; key++) {
        const uuId = uuidv4();
        const newId = `id_${key}-${uuId}`;
        newState.baza[newId] = {
          rus: action.data.rus[key],
          de: action.data.de[key],
          rating: 0,
        };
        //добавляем сразу в очередь для угадывания
        newState.queue[key] = newId;
        //добавляем сразу и для кнопок
        newState.button[newId] = action.data.de[key];
      }
      return newState;

    case "DEL_ALL":
      const nullState: IDataState = {
        name: "",
        baza: {},
        queue: {},
        button: {},
      };
      AsyncStorage.clear(); //очищает кэш
      return nullState;

    case "RATING_INCREMENT":
      // Создаем копию состояния
      const incrementRatingBaze = { ...state.baza };
      // Увеличиваем рейтинг для конкретного элемента
      incrementRatingBaze[action.id].rating += 1;
      return { ...state, baza: incrementRatingBaze };

    case "RATING_DECREMENT":
      // Создаем копию состояния
      const decrementRatingBaze = { ...state.baza };
      // уменьшаем рейтинг для конкретного элемента
      decrementRatingBaze[action.id].rating -= 1;
      return { ...state, baza: decrementRatingBaze };

    case "ADD_QUEUE":
      // добавляем в очередь
      // Создаем копию состояния
      let i = 0;
      const oldState = { ...state };
      const lengthQueueArr: number = action.queueArr.length; //7
      const lengthOldQueueArr: number = Object.keys(state.queue).length; ///13
      for (
        let key = lengthOldQueueArr;
        key < lengthQueueArr + lengthOldQueueArr;
        key++
      ) {
        //добавляем сразу в очередь для угадывания
        oldState.queue[key] = action.queueArr[i][0];
        i++;
      }
      return oldState;

    case "SHUFFLED_BUTTONS":
      return { ...state, button: action.shuffledButtonsObj };

    default:
      return state;
  }
};

export default dataReducer;
