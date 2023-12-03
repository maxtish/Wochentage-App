import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, ScrollView } from 'react-native';
import { IWord, IWordsLesson } from '../../constants'; // Подключение ваших массивов
import { ButtonClose } from './ButtonClose';

export const Words: React.FC<{ lessonWorlds: IWordsLesson[] }> = ({ lessonWorlds }) => {
  const [visibleItemId, setVisibleItemId] = useState<string | null>(null);
  const [activeArray, setActiveArray] = useState(lessonWorlds[0].data);
  const [activeButton, setActiveButton] = useState(lessonWorlds[0].name); // Используем активную кнопку

  const handleArrayChange = (arr: IWord[], buttonName: string) => {
    setActiveArray(arr);
    setActiveButton(buttonName);
    setVisibleItemId(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.goBack}>
        <ButtonClose />
      </View>
      <ScrollView horizontal={true} style={styles.buttonContainer}>
        {lessonWorlds.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={[styles.button, activeButton === item.name && styles.activeButton]}
              onPress={() => handleArrayChange(item.data, item.name)}
            >
              <Text style={styles.buttonText}>{item.name}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <FlatList
        data={activeArray}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Pressable onPress={() => setVisibleItemId(item.rus)} style={styles.row}>
              <Text style={styles.itemsRus}> {item.rus} - </Text>
              <Text
                style={[
                  styles.itemsDe,
                  styles.ButtonItemsDe,
                  visibleItemId === activeArray[index].rus && styles.pressablePressed,
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
    backgroundColor: '#FFE4B5',
    marginTop: 10,
    flexDirection: 'row',
    borderColor: '#BDB76B',
    borderWidth: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  ButtonItemsDe: {
    opacity: 0,
    paddingLeft: 5,
  },
  itemsDe: {
    fontWeight: '600',
    fontSize: 25,
  },
  itemsRus: {
    fontSize: 20,
  },
  pressablePressed: {
    opacity: 1,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#DCDCDC',
    fontWeight: '600',
    fontSize: 20,
    borderRadius: 5,
    marginRight: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeButton: {
    backgroundColor: '#888',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBack: {
    margin: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  },
});
