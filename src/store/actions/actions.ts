import { TBazaArrayItem, TData } from "../../../constants";
import { IButtonsState, IDataItem } from "../reducers/data";

// actions.ts
export const increment = () => ({
  type: "INCREMENT" as const,
});

export const decrement = () => ({
  type: "DECREMENT" as const,
});

export const initData = (data: TData) => ({
  type: "INIT_DATA" as const,
  data,
});

export const delAll = () => ({
  type: "DEL_ALL" as const,
});

export const ratingIncrement = (id: string) => ({
  type: "RATING_INCREMENT" as const,
  id,
});

export const ratingDecrement = (id: string) => ({
  type: "RATING_DECREMENT" as const,
  id,
});

export const addQueue = (queueArr: TBazaArrayItem) => ({
  type: "ADD_QUEUE" as const,
  queueArr,
});

export const updateButtons = (shuffledButtonsObj: IButtonsState) => ({
  type: "SHUFFLED_BUTTONS" as const,
  shuffledButtonsObj,
});

export const resetCount = () => ({
  type: "RESET_COUNT" as const,
});

export type ActionTypes = ReturnType<
  | typeof increment
  | typeof decrement
  | typeof initData
  | typeof delAll
  | typeof ratingIncrement
  | typeof ratingDecrement
  | typeof addQueue
  | typeof updateButtons
  | typeof resetCount
>;
