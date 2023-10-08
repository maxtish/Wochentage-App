import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";

export default function App() {
  type Wochentage = {
    montag: "Понедельник";
    dienstag: "Вторник";
    mittwoch: "Среда";
    donnerstag: "Четверг";
    freitag: "Пятница";
    samstag: "Суббота";
    sonntag: "Воскресенье";
  };

  const wochentage: Wochentage = {
    montag: "Понедельник",
    dienstag: "Вторник",
    mittwoch: "Среда",
    donnerstag: "Четверг",
    freitag: "Пятница",
    samstag: "Суббота",
    sonntag: "Воскресенье",
  };

  const WochentageList = () => {
    const defaultColor: string = "#841584";

    const [colorButton, setColorButton] = useState(defaultColor);

    // Создаем массив ключей из объекта wochentage
    const wochentageKeys = Object.keys(wochentage);
    // Создаем копию массива и перемешиваем массив
    const shuffledWochentageKeys = [...wochentageKeys].sort(
      () => Math.random() - 0.5
    );
    return (
      <View style={styles.button}>
        {shuffledWochentageKeys.map((key) => (
          <Button
            key={key}
            onPress={() => {
              console.log(`${key}`);
            }}
            title={`${key}`}
            color={colorButton}
            accessibilityLabel={key as keyof Wochentage}
          ></Button>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Дни недели</Text>
      <Text>{wochentage.dienstag}</Text>
      <WochentageList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flexDirection: "column",
    gap: 10,
  },
});
