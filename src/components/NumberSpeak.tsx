import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { allWordsIncrement, allWordsInit, allWordsResetCount } from '../store/actions/actions';
import { iconAssets } from '../../iconAssets';
import * as Progress from 'react-native-progress';
import * as Speech from 'expo-speech';
import { randomNumberArr } from '@app/services/randomNumberArr';

export const NumberSpeak: React.FC = () => {
  const speakText = (text: string) => {
    Speech.speak(text, { language: 'de' });
  };

  const arr = randomNumberArr();

  console.log('arr', arr);

  return (
    <View>
      <Text>Введите значение задержки:</Text>

      <Pressable style={styles.buttonsNavi} onPress={() => {}}>
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
