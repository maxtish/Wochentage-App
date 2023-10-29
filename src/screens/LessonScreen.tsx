import React, { useState } from "react";
import { IState, Lesson } from "../components/Lesson";
import { Pressable, Text, StyleSheet, View } from "react-native";

import { useDispatch } from "react-redux";
import { lessonMenuClose } from "../store/actions/actions";
import { Words } from "../components/Words";
import { useLocation, useParams } from "react-router-native";
import { useSelector } from "react-redux";
import { ButtonGoBack } from "../components/ButtonGoBack";

const LessonScreen: React.ComponentType = () => {
  //определяем какой урок открыть
  const location = useLocation();
  const dispatch = useDispatch();

  const { lesson, guess, words, menu } = useSelector(
    (state: IState) => state.stateLesson
  );

  const [selectLesson, setSelectLesson] = useState<"guess" | "words">();

  const selectionLesson = (select: "guess" | "words") => {
    dispatch(lessonMenuClose());
    setSelectLesson(select);
  };

  return (
    <>
      {menu ? (
        <View style={styles.container}>
          <Text>{location.state.lesson}</Text>
          <Pressable
            style={styles.buttonsNavi}
            onPress={() => selectionLesson("guess")}
          >
            <Text style={styles.buttonsText}>Отгадать</Text>
          </Pressable>
          <Pressable
            style={styles.buttonsNavi}
            onPress={() => selectionLesson("words")}
          >
            <Text style={styles.buttonsText}>Слова / фразы</Text>
          </Pressable>
          <ButtonGoBack />
        </View>
      ) : guess?.length > 0 && selectLesson === "guess" ? (
        <Lesson lessonData={guess} />
      ) : words?.length > 0 && selectLesson === "words" ? (
        <Words lessonWorlds={words} />
      ) : (
        <Text>Нет данных</Text>
      )}
    </>
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
    backgroundColor: "#008B8B",
    borderRadius: 5,
  },
  buttonsText: {
    textAlign: "center",
    fontSize: 25,
  },
});

export default LessonScreen;
