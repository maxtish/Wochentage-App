import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { allWordsIncrement, allWordsInit, allWordsResetCount } from '../store/actions/actions';
import { iconAssets } from '../../iconAssets';
import * as Progress from 'react-native-progress';
import * as Speech from 'expo-speech';

export const NumberSpeak: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (time: string) => {
    if (!isNaN(Number(time))) {
      setInputValue(time); // Обновление состояния при вводе текста, если введено число
    }
  };

  const speakText = (text: string) => {
    Speech.speak(text, { language: 'de' });
  };

  return (
    <View>
      <Text>Введите значение задержки:</Text>
      <TextInput
        style={styles.input}
        inputMode="numeric"
        value={`${inputValue}`}
        onChangeText={handleInputChange}
        placeholder={`s`}
      />
      <Pressable style={styles.buttonsNavi} onPress={() => speakText(inputValue)}>
        <Text>Отправить</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonsNavi: {
    width: '50%',
    backgroundColor: '#20B2AA',
    borderRadius: 5,
  },
});
