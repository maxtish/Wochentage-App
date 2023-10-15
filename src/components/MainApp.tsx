// App.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  initData,
  delAll,
  ratingIncrement,
  ratingDecrement,
  addQueue,
  updateButtons,
  resetCount,
} from "../store/actions/actions"; // Путь к вашим действиям (actions)
import { stateCounts } from "../store/reducers/count";
import { TBazaArrayItem, daysOfWeek, seasons } from "../../constants";
import { IButtonsState, IDataItem, IDataState } from "../store/reducers/data";

export interface IState {
  stateCounts: stateCounts;
  stateData: IDataState;
}

const App: React.FC = () => {
  const defaultColorButton = "#8FBC8F";
  const isGoodColorButton = "#008000";
  const isBadColorButton = "#B22222";
  const dispatch = useDispatch();
  type TButtonEntry = [string, string];
  const { count } = useSelector((state: IState) => state.stateCounts);
  const state = useSelector((state: IState) => state);
  console.log(state);

  // Создаем объект состояния для хранения цветов кнопок
  const [colorButtons, setColorButtons] = useState<Record<string, string>>({});
  const queue = state.stateData.queue[count];

  // Функция перемешивания кнопок
  const shuffleButtons = (buttons: IButtonsState): IButtonsState => {
    const entries: TButtonEntry[] = Object.entries(buttons);
    const shuffledEntries: TButtonEntry[] = shuffleArray(entries); // Перемешиваем массив пар ключ-значение
    const shuffledButtons: IButtonsState = {};
    shuffledEntries.forEach(([key, value]) => {
      shuffledButtons[key] = value; // Создаем новый объект кнопок с перемешанными ключами и значениями
    });
    return shuffledButtons;
  };

  // Функция перемешивания массива
  const shuffleArray = (arr: TButtonEntry[]): TButtonEntry[] => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Добавляем в очередь
  useEffect(() => {
    if (count === Object.values(state.stateData.queue).length) {
      // Преобразовать объект baza в массив пар ключ-значение
      const bazaArray: TBazaArrayItem = Object.entries(state.stateData.baza);
      // Отсортировать массив по значению rating в порядке возрастания
      bazaArray.sort((a, b) => a[1].rating - b[1].rating);
      bazaArray[bazaArray.length - 1] = bazaArray[0];
      console.log(bazaArray);
      // bazaArray = [['id',{IDataItem}],['id',{IDataItem}] ....]
      dispatch(addQueue(bazaArray));
    }
  }, [count, state.stateData.baza]);

  const checkButton = (id: string) => {
    const newColor = id === queue ? isGoodColorButton : isBadColorButton;
    if (id === queue) {
      console.log("DA");
      // УГАДАЛ
      // Обновляем цвет кнопки
      setColorButtons((prevState) => ({
        ...prevState,
        [id]: newColor,
      }));

      setTimeout(() => {
        //код, который должен выполниться после задержки
        dispatch(ratingIncrement(queue));
        setColorButtons({});
        dispatch(increment());
        dispatch(updateButtons(shuffleButtons(state.stateData.button)));
      }, 2000);
    } else {
      // НЕ УГАДАЛ
      console.log("net");
      dispatch(ratingDecrement(queue));
      // Обновляем цвет кнопки
      setColorButtons((prevState) => ({
        ...prevState,
        [id]: newColor,
      }));
    }
  };

  const closeLesson = () => {
    dispatch(delAll());
    dispatch(resetCount());
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {Object.keys(state.stateData.baza).length === 0 ? (
        <>
          <Text>Загрузка урока</Text>
          <Pressable
            onPress={() => dispatch(initData(seasons, "Времена года"))}
          >
            <Text>Времена года</Text>
          </Pressable>
          <Pressable
            onPress={() => dispatch(initData(daysOfWeek, "Дни недели"))}
          >
            <Text>Дни недели</Text>
          </Pressable>
        </>
      ) : (
        <Text>Урок: {state.stateData.name}</Text>
      )}

      <Text>Счетчик:{count}</Text>
      <Text>
        Слово:
        {state.stateData.baza[state.stateData.queue[count]]?.rus}
      </Text>

      <Pressable onPress={() => closeLesson()}>
        <Text>Закрыть урок</Text>
      </Pressable>

      {Object.keys(state.stateData.button).map((id) => {
        return (
          <Pressable
            key={id}
            onPress={() => {
              checkButton(id);
            }}
            style={[
              { backgroundColor: colorButtons[id] || defaultColorButton },
            ]}
          >
            <Text>{state.stateData.button[id]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default App;
