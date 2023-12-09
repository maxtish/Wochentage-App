import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { allNumberIncrement, allNumberInit } from '../store/actions/actions';
import { iconAssets } from '../../iconAssets';

import * as Speech from 'expo-speech';
import { randomNumberArr } from '@app/services/randomNumberArr';
import { IState } from '../store/store';
import { CustomNumericKeyboard } from './CustomNumericKeyboard';
import { speakText } from '@app/services/speakText';
import * as Progress from 'react-native-progress';
export const NumberSpeak: React.FC = () => {
  const state = useSelector((state: IState) => state.stateNumberSpeak);
  const [yes, setYes] = useState<boolean>();
  const [no, setNo] = useState<boolean>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (correctNubmer === undefined) {
      console.log(correctNubmer);
      dispatch(allNumberInit(randomNumberArr()));
    }
  }, []);

  const correctNubmer = state.allNumber[state.count];
  const nummberf: string = correctNubmer !== undefined ? correctNubmer.toString() : '-0';
  console.log(correctNubmer);

  const speak = useMemo(() => {
    return speakText(nummberf);
  }, [state.count, nummberf]);

  const handleNumberPress = (number: string) => {
    // Обработка введенной цифры
  };

  const handleFinishPress = (enteredNumber: string) => {
    // Обработка введенного числа при нажатии "Готово"
    console.log(`Entered number: ${enteredNumber}`);

    if (nummberf === enteredNumber) {
      console.log('ДА');
      setYes(true);

      setTimeout(() => {
        //код, который должен выполниться после задержки
        setYes(false);
        dispatch(allNumberIncrement());
      }, 1000);
    } else {
      console.log('НЕТ');
      setNo(true);
      setTimeout(() => {
        //код, который должен выполниться после задержки

        dispatch(allNumberInit(randomNumberArr()));
        setNo(false);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{state.count}</Text>
      <Progress.Bar
        style={styles.progress}
        progress={(state.count + 1) / state.allNumber.length}
        width={200}
        height={20}
        borderRadius={50}
      />

      {yes ? <Text style={styles.resultJa}> {nummberf}</Text> : <Text style={styles.resultJa}> </Text>}
      {no ? <Text style={styles.resultNein}>{nummberf}</Text> : <Text style={styles.resultNein}> </Text>}
      <View style={styles.containerKeyboard}>
        <CustomNumericKeyboard
          onNumberPress={handleNumberPress}
          onFinishPress={handleFinishPress}
        ></CustomNumericKeyboard>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerKeyboard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    marginVertical: 20,
  },
  resultJa: {
    color: 'green',
    fontSize: 50,
  },
  resultNein: {
    color: 'red',
    fontSize: 50,
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
