import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";

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
  const [heightScreen, setheightScreen] = useState(10);

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

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
    setheightScreen(SCREEN_HEIGHT);
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

    const fontSizeButton = heightScreen / 2 / 10;

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
            <Text style={[styles.textButton, { fontSize: fontSizeButton }]}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };
  const fontSizeTitle = heightScreen / 3 / 10;
  const fontSizeTag = heightScreen / 2.5 / 10;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.titleRus, { fontSize: fontSizeTitle }]}>
          Дни недели
        </Text>
        <Text style={[styles.titleDe, { fontSize: fontSizeTitle }]}>
          Wochentage
        </Text>
        <Text style={[styles.tag, { fontSize: fontSizeTag }]}>{tagRus}</Text>
      </View>
      <WochentageList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  header: {
    flex: 0.2,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  titleRus: {
    marginTop: 30,
  },

  titleDe: {
    color: "#008000",
  },

  tag: {
    alignItems: "center",
    backgroundColor: "#737171",
    paddingHorizontal: "5%",
    paddingVertical: "1%",
    borderRadius: 20,
    color: "#fff",
  },

  wrapButton: {
    flex: 0.75,
    width: "100%",
    paddingTop: 40,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },

  button: {
    minWidth: "70%",
    height: "10%",
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  textButton: {
    letterSpacing: 3,
    fontWeight: "600",
    color: "#361E2A",
  },
});
