import { IDataItem } from "./src/store/reducers/data";

export type TData = {
  name: string;
  rus: string[];
  de: string[];
};

export const allData: TData[] = [
  {
    name: "Дни недели",
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
  },
  {
    name: "Времена года",
    rus: ["Весна", "Лето", "Осень", "Зима"],
    de: ["Frühling", "Sommer", "Herbst", "Winter"],
  },
  {
    name: "Habe",
    rus: ["Ich", "Du", "Er/Sie/Es", "Wir", "Ihr", "Sie"],
    de: ["habe", "hast", "hat", "haben", "habt", "haben"],
  },
  {
    name: "Bist",
    rus: ["Ich", "Du", "Er/Sie/Es", "Wir", "Ihr", "Sie"],
    de: ["bin", "bist", "ist", "sind", "seid", "sind"],
  },
  {
    name: "Dürfen - Мочь",
    rus: ["Ich", "Du", "Er/Sie/Es", "Wir", "Ihr", "Sie"],
    de: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
  },
  {
    name: "Können - Уметь",
    rus: ["Ich", "Du", "Er/Sie/Es", "Wir", "Ihr", "Sie"],
    de: ["kann", "kannst", "kann", "können", "könnt", "können"],
  },
  {
    name: "Sollen - Обязан",
    rus: ["Ich", "Du", "Er/Sie/Es", "Wir", "Ihr", "Sie"],
    de: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
  },
  {
    name: "Müssen - Быть должным",
    rus: ["Ich", "Du", "Er/Sie/Es", "Wir", "Ihr", "Sie"],
    de: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
  },
  {
    name: "Möchten - Хотеть(вежл.)",
    rus: ["Ich", "Du", "Er/Sie/Es", "Wir", "Ihr", "Sie"],
    de: ["möchte", "möchtest", "möchte", "möchten", "möchtet", "möchten"],
  },
  {
    name: "Wollen - Хотеть",
    rus: ["Ich", "Du", "Er/Sie/Es", "Wir", "Ihr", "Sie"],
    de: ["will", "willst", "will", "wollen", "wollt", "wollen"],
  },
  {
    name: "Mögen - Нравиться",
    rus: ["Ich", "Du", "Er/Sie/Es", "Wir", "Ihr", "Sie"],
    de: ["mag", "magst", "mag", "mögen", "mögt", "mögen"],
  },
  {
    name: "Wissen - Знать/Помнить",
    rus: ["Ich", "Du", "Er/Sie/Es", "Wir", "Ihr", "Sie"],
    de: ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"],
  },
];

// Интерфейс для элемента массива bazaArray
export type TBazaArrayItem = Array<[string, IDataItem]>;
