import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { selectWords, shuffleWords } from "../../service";
import { IState } from "./Lesson";
import { useDispatch } from "react-redux";
import {
  allWordsIncrement,
  allWordsInit,
  allWordsResetCount,
} from "../store/actions/actions";
import { ButtonGoBack } from "./ButtonGoBack";
import { iconAssets } from "../../iconAssets";
import { ImageGen } from "./ImageGen";

export const ImageAndText: React.FC = () => {
  const stateDelay = useSelector((state: IState) => state.stateLesson.delay);
  const allWords = useSelector(
    (state: IState) => state.stateImageAndText.allWords
  );

  const count = useSelector((state: IState) => state.stateImageAndText.count);

  const dispatch = useDispatch();

  useEffect(() => {
    if (correctWord === undefined) {
      dispatch(allWordsInit(Object.keys(iconAssets)));
      dispatch(allWordsResetCount());
    }
  }, []);
  const correctWord = allWords[count];
  const defaultColorButton = "#B0C4DE";
  const isGoodColorButton = "#008000";
  const isBadColorButton = "#B22222";

  // Создаем объект состояния для хранения цветов кнопок
  const [colorButtons, setColorButtons] = useState<Record<string, string>>({});

  const onPress = (item: string) => {
    const newColor =
      correctWord === item ? isGoodColorButton : isBadColorButton;

    if (item === correctWord) {
      console.log("da");
      setColorButtons((prevState) => ({
        ...prevState,
        [item]: newColor,
      }));

      setTimeout(() => {
        //код, который должен выполниться после задержки
        dispatch(allWordsIncrement());
        setColorButtons({});
      }, stateDelay * 1000);
    } else {
      setColorButtons((prevState) => ({
        ...prevState,
        [item]: newColor,
      }));
    }
  };

  const shuffledButtonNameArr = useMemo(() => {
    const buttonNameArr = selectWords(correctWord);
    buttonNameArr.push(correctWord);
    return shuffleWords(buttonNameArr);
  }, [correctWord]);

  return (
    <View style={styles.container}>
      <Text>{count + 1}</Text>
      <ImageGen name={correctWord} />
      <View style={styles.wrapperButons}>
        {shuffledButtonNameArr.map((item, index) => (
          <Pressable
            key={index}
            style={[
              styles.buttons,
              { backgroundColor: colorButtons[item] || defaultColorButton },
            ]}
            onPress={() => onPress(item)}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}

        <Pressable
          style={[styles.buttons, styles.buttonsReset]}
          onPress={() => dispatch(allWordsResetCount())}
        >
          <Text>Начать заново</Text>
        </Pressable>

        <ButtonGoBack />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
  wrapperButons: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  buttons: {
    padding: 5,
    marginTop: 10,
    width: "50%",
    backgroundColor: "#20B2AA",
    borderRadius: 5,
  },
  buttonsReset: {
    marginTop: 30,
    marginBottom: 20,
  },
  correctButton: {
    backgroundColor: "green", // Зеленый цвет для правильного ответа
  },
  isCorrectButton: {
    backgroundColor: "red", // Зеленый цвет для правильного ответа
  },
});
