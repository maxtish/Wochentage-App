import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  allNumberInit,
  allNumbersResetCount,
  allWordsIncrement,
  allWordsInit,
  allWordsResetCount,
} from '../store/actions/actions';
import { iconAssets } from '../../iconAssets';
import * as Progress from 'react-native-progress';
import * as Speech from 'expo-speech';
import { randomNumberArr } from '@app/services/randomNumberArr';
import { IState } from '../store/store';
import { CustomNumericKeyboard } from './CustomNumericKeyboard';

export const NumberSpeak: React.FC = () => {
  const state = useSelector((state: IState) => state.stateNumberSpeak);
  const correctNubmer = state.allNumber[state.count];

  const dispatch = useDispatch();

  useEffect(() => {
    if (correctNubmer === undefined) {
      dispatch(allNumberInit(randomNumberArr()));
      dispatch(allNumbersResetCount());
    }
  }, []);

  const speakText = (text: string) => {
    Speech.speak(text, { language: 'de' });
  };

  const arr = randomNumberArr();

  console.log('arr', arr);

  const handleNumberPress = (number: string) => {
    // Обработка введенной цифры
    console.log(`Pressed number: ${number}`);
  };

  const handleFinishPress = (enteredNumber: string) => {
    // Обработка введенного числа при нажатии "Готово"
    console.log(`Entered number: ${enteredNumber}`);
  };
  return (
    <View>
      <CustomNumericKeyboard
        onNumberPress={handleNumberPress}
        onFinishPress={handleFinishPress}
      ></CustomNumericKeyboard>
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
