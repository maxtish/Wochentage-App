import { IDataItem, IDataState } from "./src/store/reducers/data";

export type TData = {
  rus: string[];
  de: string[];
};

export const daysOfWeek: TData = {
  rus: [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ],
  de: [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ],
};

/*
Montag - Понедельник
Dienstag - Вторник
Mittwoch - Среда
Donnerstag - Четверг
Freitag - Пятница
Samstag - Суббота
Sonntag - Воскресенье
*/

// Интерфейс для элемента массива bazaArray
export type TBazaArrayItem = Array<[string, IDataItem]>;
