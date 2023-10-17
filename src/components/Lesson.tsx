// App.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
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
} from "../store/actions/actions";
import { stateCounts } from "../store/reducers/count";
import { TBazaArrayItem, TData, allData } from "../../constants";
import { IButtonsState, IDataState } from "../store/reducers/data";

export interface IState {
  stateCounts: stateCounts;
  stateData: IDataState;
}

export const Lesson: React.FC = () => {
  const defaultColorButton = "#B0C4DE";
  const isGoodColorButton = "#008000";
  const isBadColorButton = "#B22222";
  const dispatch = useDispatch();
  type TButtonEntry = [string, string];
  const { count } = useSelector((state: IState) => state.stateCounts);
  const stateBaza = useSelector((state: IState) => state.stateData.baza);
  const stateButton = useSelector((state: IState) => state.stateData.button);
  const stateName = useSelector((state: IState) => state.stateData.name);
  const stateQueue = useSelector((state: IState) => state.stateData.queue);

  // Создаем объект состояния для хранения цветов кнопок
  const [colorButtons, setColorButtons] = useState<Record<string, string>>({});
  const queue = stateQueue[count];

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
      count === Object.values(stateQueue).length &&
      Object.values(stateQueue).length > 0
    ) {
      // Преобразовать объект baza в массив пар ключ-значение
      const bazaArray: TBazaArrayItem = Object.entries(stateBaza);
      // Отсортировать массив по значению rating в порядке возрастания
      bazaArray.sort((a, b) => a[1].rating - b[1].rating);
      bazaArray[bazaArray.length - 1] = bazaArray[0];

      // bazaArray = [['id',{IDataItem}],['id',{IDataItem}] ....]
      dispatch(addQueue(bazaArray));
    }
  }, [count, stateBaza]);

  const checkButton = (id: string) => {
    const newColor =
      stateButton[id] === stateBaza[queue].de
        ? isGoodColorButton
        : isBadColorButton;
    if (stateButton[id] === stateBaza[queue].de) {
      console.log("YES");
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
        dispatch(updateButtons(shuffleButtons(stateButton)));
      }, 700);
    } else {
      // НЕ УГАДАЛ
      console.log("NO");
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

  interface ILessonButtonProps {
    onPress: () => void;
    text: string;
  }

  const LessonButton: React.FC<ILessonButtonProps> = ({ onPress, text }) => {
    return (
      <Pressable style={styles.lessonButton} onPress={onPress}>
        <Text>{text}</Text>
      </Pressable>
    );
  };

  const lessonButtons = allData.map((item: TData, index: number) => (
    <LessonButton
      key={index}
      text={item.name}
      onPress={() => dispatch(initData(item))}
    />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerClose}>
          <Text>Счетчик:{count}</Text>

          {Object.keys(stateBaza).length > 0 && (
            <Pressable onPress={() => closeLesson()} style={styles.closeButton}>
              <Text style={styles.closeText}>Закрыть урок</Text>
            </Pressable>
          )}
        </View>
        <Text style={styles.headerLesson}>Урок: {stateName}</Text>
      </View>
      {Object.keys(stateBaza).length === 0 ? (
        <ScrollView>
          <Text style={styles.textLoadLesson}>Загрузка урока: </Text>
          <View style={styles.gapLesson}>{lessonButtons}</View>
        </ScrollView>
      ) : (
        <View style={styles.wrapperMain}>
          <Text style={styles.itemQueue}>
            {stateBaza[stateQueue[count]]?.rus}
          </Text>
          <View style={styles.wrapperBottons}>
            {Object.keys(stateButton).map((id) => {
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
                  <Text style={styles.buttonText}>{stateButton[id]}</Text>
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
    paddingTop: 50,
    paddingHorizontal: 10,
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
    fontSize: 20,
    fontWeight: "600",
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
  gapLesson: {
    gap: 20,
  },
  lessonButton: {
    padding: 5,
    backgroundColor: "#B0C4DE",
    borderRadius: 5,
  },
  wrapperMain: {
    flex: 1,
    justifyContent: "space-around",
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
