import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, useNavigate } from "react-router-native";

const HomeScreen: React.ComponentType = () => {
  const navigate = useNavigate();

  const ToLesson = () => {
    navigate("/lesson"); // Переход на страницу "lesson"
  };

  const ToWords = () => {
    navigate("/words"); // Переход на страницу "words"
  };

  return (
    <View style={styles.container}>
      <Text>Это главный экран</Text>
      <Pressable style={styles.buttonsNavi} onPress={ToLesson}>
        <Text style={styles.buttonsText}>Уроки</Text>
      </Pressable>
      <Pressable style={styles.buttonsNavi} onPress={ToWords}>
        <Text style={styles.buttonsText}>Слова</Text>
      </Pressable>
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
    backgroundColor: "#777",
    borderRadius: 5,
  },
  buttonsText: {
    textAlign: "center",
    fontSize: 25,
  },
});
export default HomeScreen;
