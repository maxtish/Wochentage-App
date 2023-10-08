import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

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
  interface Itage {
    [key: string]: string;
  }
  const [tag, setTag] = useState<Itage>({ loading: "loading" });
  const [wochentageList, setWochentageList] = useState<string[]>([]);

  const getRandomDay = (data: Wochentage): Itage => {
    const keys = Object.keys(data);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomDay = keys[randomIndex];

    const randomDaydata = {
      [randomDay]: data[randomDay as keyof Wochentage],
    };

    return randomDaydata;
  };

  const getRandomWochentage = (data: Wochentage): string[] => {
    const wochentageKeys = Object.keys(data);

    // Создаем копию массива
    const shuffledWochentageKeys = [...wochentageKeys].sort(
      () => Math.random() - 0.5
    );

    return shuffledWochentageKeys;
  };

  const resetGame = () => {
    // Задержка в 3 секунды перед сбросом игры
    setTimeout(() => {
      setTag(getRandomDay(wochentage));
      setWochentageList(getRandomWochentage(wochentage));
    }, 1000);
  };

  useEffect(() => {
    setTag(getRandomDay(wochentage));

    setWochentageList(getRandomWochentage(wochentage));
  }, []);
  const tagDe = Object.keys(tag)[0];
  const tagRus = tag[tagDe];

  const WochentageList = () => {
    const defaultColor: string = "#94BCD6";

    // Создаем объект состояния для хранения цветов кнопок
    const [colorButtons, setColorButtons] = useState<Record<string, string>>(
      {}
    );

    const handleButtonClick = (key: string) => {
      // Генерируем цвет для данной кнопки
      const newColor = key === tagDe ? "#35A941" : "#CF0000";
      // Обновляем состояние, чтобы сохранить цвет для данной кнопки
      setColorButtons((prevState) => ({
        ...prevState,
        [key]: newColor,
      }));

      if (key === tagDe) {
        resetGame(); // Сброс игры после угадывания
      }
    };

    return (
      <View style={styles.wrapButton}>
        {wochentageList.map((key) => (
          <Pressable
            style={[
              styles.button,
              { backgroundColor: colorButtons[key] || defaultColor },
            ]}
            key={key}
            onPress={() => handleButtonClick(key)}
          >
            <Text style={styles.textButton}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleRus}>Дни недели</Text>
      <Text style={styles.titleDe}>Wochentage</Text>
      <Text style={styles.tag}>{tagRus}</Text>
      <WochentageList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  titleRus: {
    fontSize: 15,
  },
  titleDe: {
    fontSize: 30,
    color: "#008000",
    marginBottom: 50,
  },

  tag: {
    fontSize: 30,
    marginBottom: 50,
    backgroundColor: "#737171",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    color: "#fff",
    alignItems: "center",
  },

  wrapButton: {
    flexDirection: "column",
    gap: 10,
  },

  button: {
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
  },

  textButton: {
    fontSize: 30,
    letterSpacing: 3,
    fontWeight: "600",
    color: "#361E2A",
  },
});
