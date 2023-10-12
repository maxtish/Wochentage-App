import { TData } from "../../../constants";
import { IDataItem } from "../reducers/data";

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
  type: "DELL_ALL" as const,
});

export type ActionTypes = ReturnType<
  typeof increment | typeof decrement | typeof initData | typeof delAll
>;
