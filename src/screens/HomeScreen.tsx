import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-native";
import {
  lessonDelayInit,
  lessonInit,
  lessonMenuOpen,
  lessonQuessInit,
  lessonWordsInit,
} from "../store/actions/actions";
import {
  Lesson1Quess,
  Lesson6Quess,
  Lesson7Quess,
  Lesson8Quess,
  lesson1Words,
  lesson6Words,
  lesson7Words,
  lesson8Words,
} from "../../constants";
import { IState } from "../components/Lesson";
import { useSelector } from "react-redux";

const HomeScreen: React.ComponentType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ToLesson = (name: string, numLesson: number) => {
    dispatch(lessonInit(numLesson));
    dispatch(lessonMenuOpen());

    if (numLesson === 1) {
      dispatch(lessonQuessInit(Lesson1Quess));
      dispatch(lessonWordsInit(lesson1Words));
    }

    if (numLesson === 6) {
      dispatch(lessonQuessInit(Lesson6Quess));
      dispatch(lessonWordsInit(lesson6Words));
    }

    if (numLesson === 7) {
      dispatch(lessonQuessInit(Lesson7Quess));
      dispatch(lessonWordsInit(lesson7Words));
    }

    if (numLesson === 8) {
      dispatch(lessonQuessInit(Lesson8Quess));
      dispatch(lessonWordsInit(lesson8Words));
    }

    navigate("/lesson", { state: { lesson: name } });
  };
  const [inputValue, setInputValue] = useState(""); // Состояние для хранения введенного значения
  const stateDelay = useSelector((state: IState) => state.stateLesson.delay);

  const handleInputChange = (time: string) => {
    setInputValue(time); // Обновление состояния при вводе текста
  };

  const handleSubmit = () => {
    dispatch(lessonDelayInit(Number(inputValue)));
    setInputValue("");
  };

  return (
    <View style={styles.container}>
      <Text>Это главный экран</Text>
      <Pressable
        style={styles.buttonsNavi}
        onPress={() => ToLesson("Урок 1", 1)}
      >
        <Text style={styles.buttonsText}>Урок 1</Text>
        <Text style={styles.buttonsTextDescription}>Всякое разное</Text>
      </Pressable>
      <Pressable
        style={styles.buttonsNavi}
        onPress={() => ToLesson("Урок 6", 6)}
      >
        <Text style={styles.buttonsText}>Урок 6</Text>
        <Text style={styles.buttonsTextDescription}>Модальные глаголы</Text>
      </Pressable>
      <Pressable
        style={styles.buttonsNavi}
        onPress={() => ToLesson("Урок 7", 7)}
      >
        <Text style={styles.buttonsText}>Урок 7</Text>
        <Text style={styles.buttonsTextDescription}>
          Притяжательные местоимения
        </Text>
      </Pressable>
      <Pressable
        style={styles.buttonsNavi}
        onPress={() => ToLesson("Урок 8", 8)}
      >
        <Text style={styles.buttonsText}>Урок 8</Text>
        <Text style={styles.buttonsTextDescription}>Вопросы</Text>
      </Pressable>

      <View>
        <Text>Введите значение задержки:</Text>
        <TextInput
          style={styles.input}
          value={`${inputValue}`}
          onChangeText={handleInputChange}
          placeholder={`Задержка: ${stateDelay} сек`}
        />
        <Pressable style={styles.buttonsNavi} onPress={handleSubmit}>
          <Text>Отправить</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    gap: 20,
    alignItems: "center",
  },
  buttonsNavi: {
    width: "50%",
    backgroundColor: "#20B2AA",
    borderRadius: 5,
  },
  buttonsText: {
    textAlign: "center",
    fontSize: 25,
  },
  buttonsTextDescription: {
    textAlign: "center",
    fontSize: 15,
  },

  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
});
export default HomeScreen;