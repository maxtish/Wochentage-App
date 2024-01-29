import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, ScrollView, StatusBar } from 'react-native';
import { IWord, IWordsLesson } from '../../constants'; // Подключение ваших массивов
import { ButtonClose } from './ButtonClose';
import { speakText } from '@app/services/speakText';

export const Words: React.FC<{ lessonWorlds: IWordsLesson[] }> = ({ lessonWorlds }) => {
  const [visibleItemId, setVisibleItemId] = useState<string | null>(null);
  const [activeArray, setActiveArray] = useState(lessonWorlds[0].data);
  const [activeButton, setActiveButton] = useState(lessonWorlds[0].name); // Используем активную кнопку

  const handleArrayChange = (arr: IWord[], buttonName: string) => {
    setActiveArray(arr);
    setActiveButton(buttonName);
    setVisibleItemId(null);
  };
  const [buttonPressed, setButtonPressed] = useState(false); // Add this line

  return (
    <View style={styles.container}>
      <View style={styles.goBack}>
        <ButtonClose />
      </View>
      <View style={styles.buttonContainer}>
        <ScrollView horizontal={true}>
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
      </View>
      <View style={styles.buttonTexContainer}>
        <FlatList
          data={activeArray}
          renderItem={({ item, index }) => (
            <View key={index}>
              <Pressable
                onPress={() => {
                  setVisibleItemId(item.rus);
                  speakText(item.de, (isSpoken) => {
                    console.log('Текст произнесен:');
                    setButtonPressed(isSpoken);
                  });
                }}
                style={styles.row}
              >
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  buttonTexContainer: {},
  button: {
    backgroundColor: '#DCDCDC',
    fontWeight: '600',
    borderRadius: 5,
    marginRight: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  activeButton: {
    backgroundColor: '#888',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  goBack: {
    margin: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
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
});
