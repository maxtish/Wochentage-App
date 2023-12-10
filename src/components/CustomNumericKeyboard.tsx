import React, { useState, FC, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Vibration } from 'react-native';
import { IState } from '../store/store';
import { useSelector } from 'react-redux';

interface CustomNumericKeyboardProps {
  onNumberPress?: (number: string) => void;
  onFinishPress?: (enteredNumber: string) => void;
  isTextSpoken?: boolean;
  onNumberChange?: (enteredNumber: string) => void;
}

export const CustomNumericKeyboard: FC<CustomNumericKeyboardProps> = ({
  onNumberPress,
  onFinishPress,
  isTextSpoken,
}) => {
  const [enteredNumber, setEnteredNumber] = useState('');
  console.log('isTextSpoken', isTextSpoken);
  const handleNumberPress = (number: string) => {
    Vibration.vibrate([0, 20]); //  (пауза после клика, время вибраци, )
    setEnteredNumber(enteredNumber + number);
    onNumberPress && onNumberPress(enteredNumber + number);
  };

  const state = useSelector((state: IState) => state.stateNumberSpeak);

  useEffect(() => {
    setEnteredNumber('');
  }, [state.count]);

  const handleNumberDel = () => {
    Vibration.vibrate([0, 20]);
    const stringWithoutLastCharacter = enteredNumber.slice(0, -1);
    setEnteredNumber(stringWithoutLastCharacter);
  };

  const handleFinishPress = () => {
    Vibration.vibrate([0, 20]);
    onFinishPress && onFinishPress(enteredNumber);
    setEnteredNumber('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerNumber}>
        <Text style={styles.textNumber}>{enteredNumber}</Text>
        <Pressable
          onPress={() => handleNumberDel()}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Text style={styles.buttonTextDel}> &lt;-- </Text>
        </Pressable>
      </View>
      <View style={styles.containerKeyboard}>
        <View style={styles.row}>
          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
            onPress={() => handleNumberPress('1')}
          >
            <Text style={styles.buttonText}>1</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('2')}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>2</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('3')}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>3</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable
            onPress={() => handleNumberPress('4')}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>4</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('5')}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>5</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('6')}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>6</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable
            onPress={() => handleNumberPress('7')}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>7</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('8')}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>8</Text>
          </Pressable>
          <Pressable
            onPress={() => handleNumberPress('9')}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>9</Text>
          </Pressable>
        </View>
        <View style={styles.row}>
          <Pressable
            onPress={() => handleNumberPress('0')}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonText}>0</Text>
          </Pressable>
          <Pressable
            onPress={handleFinishPress}
            disabled={!isTextSpoken}
            style={({ pressed }) => [
              styles.finishButton,
              pressed && styles.buttonPressed,
              !isTextSpoken && styles.finishButtonDisabled, // Стиль для неактивного состояния
            ]}
          >
            <Text style={styles.buttonText}>Готово</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerKeyboard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerNumber: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 50,
  },
  textNumber: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#CCCCCC',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 40,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: '#CCC',
  },
  finishButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  finishButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
  buttonTextDel: {
    color: '#ffffff',
    fontSize: 18,
  },
});
