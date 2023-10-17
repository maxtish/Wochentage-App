import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import { IWord, wordsData } from "../../constants";

export const Words: React.FC = () => {
  const [visibleItemId, setVisibleItemId] = useState<string | null>(null);

  return (
    <FlatList
      data={wordsData}
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
                visibleItemId === wordsData[index].rus &&
                  styles.pressablePressed,
              ]}
            >
              {item.de}
            </Text>
          </Pressable>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
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
});
