// reducers/data.ts
import { ActionTypes } from "../actions/actions";
import { v4 as uuidv4 } from "uuid";

export interface IDataItem {
  rus: string;
  de: string;
}

export interface IDataState {
  baza: { [key: string]: IDataItem };
  queue: { [key: string]: string }; //очередь для угадывания
  button: { [key: string]: string }; //объект для кнопок
}

// Начальное состояние
const initialState: IDataState = { baza: {}, queue: {}, button: {} };
const dataReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    //инициализация базы -  удаляет старую и вствляет новую
    case "INIT_DATA":
      const newState: IDataState = { baza: {}, queue: {}, button: {} };
      const length: number = action.data.de.length;
      for (let key = 0; key < length; key++) {
        const uuId = uuidv4();
        const newId = `id_${key}-${uuId}`;
        newState.baza[newId] = {
          rus: action.data.rus[key],
          de: action.data.de[key],
        };
        //добавляем сразу в очередь для угадывания
        newState.queue[newId] = action.data.rus[key];

        //добавляем сразу и для кнопок
        newState.button[newId] = action.data.de[key];
      }

      return newState;

    case "DELL_ALL":
      const nullState: IDataState = { baza: {}, queue: {}, button: {} };
      return nullState;

    default:
      return state;
  }
};

export default dataReducer;
