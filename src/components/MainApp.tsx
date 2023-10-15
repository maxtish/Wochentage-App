// App.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  initData,
  delAll,
  ratingIncrement,
  ratingDecrement,
  addQueue,
  updateButtons,
  resetCount,
} from "../store/actions/actions"; // Путь к вашим действиям (actions)
import { stateCounts } from "../store/reducers/count";
import { TBazaArrayItem, TData, allData } from "../../constants";
import { IButtonsState, IDataState } from "../store/reducers/data";

export interface IState {
  stateCounts: stateCounts;
  stateData: IDataState;
}

const App: React.FC = () => {
  const defaultColorButton = "#B0C4DE";
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
    if (
      count === Object.values(state.stateData.queue).length &&
      Object.values(state.stateData.queue).length > 0
    ) {
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
    const newColor =
      state.stateData.button[id] === state.stateData.baza[queue].de
        ? isGoodColorButton
        : isBadColorButton;
    if (state.stateData.button[id] === state.stateData.baza[queue].de) {
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
  // уроки
  const renderItemLesson = ({ item }: { item: TData }) => (
    <Pressable
      style={styles.lessonButton}
      onPress={() => dispatch(initData(item))}
    >
      <Text>{item.name}</Text>
    </Pressable>
  );
  // отступы между кнопками
  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerClose}>
          <Text>Счетчик:{count}</Text>

          {Object.keys(state.stateData.baza).length > 0 && (
            <Pressable onPress={() => closeLesson()} style={styles.closeButton}>
              <Text style={styles.closeText}>Закрыть урок</Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.headerLesson}>Урок: {state.stateData.name}</Text>
      </View>
      {Object.keys(state.stateData.baza).length === 0 ? (
        <View>
          <Text style={styles.textLoadLesson}>Загрузка урока: </Text>
          <FlatList
            data={allData}
            renderItem={renderItemLesson}
            keyExtractor={(item) => item.name}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
      ) : (
        <View style={styles.wrapperMain}>
          <Text style={styles.itemQueue}>
            {state.stateData.baza[state.stateData.queue[count]]?.rus}
          </Text>
          <View style={styles.wrapperBottons}>
            {Object.keys(state.stateData.button).map((id) => {
              return (
                <Pressable
                  key={id}
                  onPress={() => {
                    checkButton(id);
                  }}
                  style={[
                    styles.buttons,
                    { backgroundColor: colorButtons[id] || defaultColorButton },
                  ]}
                >
                  <Text style={styles.buttonText}>
                    {state.stateData.button[id]}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },
  header: {
    width: "100%",
    flexDirection: "column",
  },
  headerClose: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerLesson: {
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#FF6347",
    borderRadius: 5,
  },
  closeText: {
    paddingHorizontal: 5,
    borderRadius: 20,
  },
  textLoadLesson: {
    marginBottom: 20,
  },
  separator: {
    height: 10,
  },
  lessonButton: {
    padding: 5,
    backgroundColor: "#B0C4DE",
    borderRadius: 5,
  },
  wrapperMain: {
    margin: "auto", /// вопрос и кнопки центр по высоте
    paddingBottom: 20,
  },
  itemQueue: {
    marginBottom: 40,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#AFEEEE",
    borderWidth: 2,
    borderColor: "#4682B4",
  },
  buttons: {
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "600",
  },
  wrapperBottons: {
    gap: 10,
  },
});

export default App;
