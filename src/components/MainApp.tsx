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
} from "../store/actions/actions"; // Путь к вашим действиям (actions)
import { stateCounts } from "../store/reducers/count";
import { TBazaArrayItem, daysOfWeek } from "../../constants";
import { IDataItem, IDataState } from "../store/reducers/data";

export interface IState {
  stateCounts: stateCounts;
  stateData: IDataState;
}

const App: React.FC = () => {
  const defaultColorButton = "#8FBC8F";
  const isGoodColorButton = "#008000";
  const isBadColorButton = "#B22222";
  const dispatch = useDispatch();
  const { count } = useSelector((state: IState) => state.stateCounts);
  const state = useSelector((state: IState) => state);
  console.log(state);
  // Создаем объект состояния для хранения цветов кнопок
  const [colorButtons, setColorButtons] = useState<Record<string, string>>({});
  const queue = state.stateData.queue[count];

  useEffect(() => {
    dispatch(delAll());
  }, []);

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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text>Счетчик:{count}</Text>
      <Text>
        Слово:
        {state.stateData.baza[state.stateData.queue[count]]?.rus}
      </Text>

      <Pressable onPress={() => dispatch(initData(daysOfWeek))}>
        <Text>Добавить базу</Text>
      </Pressable>
      <Pressable onPress={() => dispatch(delAll())}>
        <Text>Удалить всю базу</Text>
      </Pressable>
      <Pressable onPress={() => dispatch(decrement())}>
        <Text>Минус</Text>
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
