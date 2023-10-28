import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { wordsData, roomItems, IWord, lesson7 } from "../../constants"; // Подключение ваших массивов
import { useNavigate } from "react-router-native";
import { ButtonGoBack } from "./ButtonGoBack";

export const Words: React.FC = () => {
  const [visibleItemId, setVisibleItemId] = useState<string | null>(null);
  const [activeArray, setActiveArray] = useState(roomItems);
  const [activeButton, setActiveButton] = useState("im Zimmer"); // Используем активную кнопку

  const handleArrayChange = (arr: IWord[], buttonName: string) => {
    setActiveArray(arr);
    setActiveButton(buttonName);
    setVisibleItemId(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.goBack}>
        <ButtonGoBack />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            activeButton === "Alle" && styles.activeButton,
          ]}
          onPress={() => handleArrayChange(wordsData, "Alle")}
        >
          <Text style={styles.buttonText}>Alle</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            activeButton === "im Zimmer" && styles.activeButton,
          ]}
          onPress={() => handleArrayChange(roomItems, "im Zimmer")}
        >
          <Text style={styles.buttonText}>im Zimmer</Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            activeButton === "Lektion 7" && styles.activeButton,
          ]}
          onPress={() => handleArrayChange(lesson7, "Lektion 7")}
        >
          <Text style={styles.buttonText}>Lektion 7</Text>
        </Pressable>
      </View>

      <FlatList
        data={activeArray}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Pressable
              onPress={() => setVisibleItemId(item.rus)}
              style={styles.row}
            >
              <Text style={styles.itemsRus}> {item.rus} - </Text>
              <Text
                style={[
                  styles.itemsDe,
                  styles.ButtonItemsDe,
                  visibleItemId === activeArray[index].rus &&
                    styles.pressablePressed,
                ]}
              >
                {item.de}
              </Text>
            </Pressable>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  row: {
    paddingVertical: 5,
    backgroundColor: "#FFE4B5",
    marginTop: 10,
    flexDirection: "row",
    borderColor: "#BDB76B",
    borderWidth: 1,
    flexWrap: "wrap",
    alignItems: "center",
  },
  ButtonItemsDe: {
    opacity: 0,
    paddingLeft: 5,
  },
  itemsDe: {
    fontWeight: "600",
    fontSize: 25,
  },
  itemsRus: {
    fontSize: 20,
  },
  pressablePressed: {
    opacity: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#DCDCDC",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#888",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  goBack: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
});
