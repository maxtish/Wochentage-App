import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { delAll, lessonMenuOpen, resetCount } from "../store/actions/actions";

export const ButtonClose: React.FC = () => {
  const dispatch = useDispatch();
  const closeLesson = () => {
    dispatch(delAll());
    dispatch(resetCount());
    dispatch(lessonMenuOpen());
  };
  return (
    <Pressable onPress={() => closeLesson()} style={styles.closeButton}>
      <Text style={styles.closeText}>Закрыть</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: "#FF6347",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  closeText: {},
});
