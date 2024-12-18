import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-native';
import {
  lessonDelayInit,
  lessonInit,
  lessonMenuOpen,
  lessonQuessInit,
  lessonWordsInit,
} from '../store/actions/actions';
import {
  Lesson1Quess,
  Lesson6Quess,
  Lesson7Quess,
  Lesson8Quess,
  Lesson9Quess,
  Lesson10Quess,
  lesson1Words,
  lesson6Words,
  lesson7Words,
  lesson8Words,
  lesson9Words,
  lesson10Words,
} from '../../constants';
import { IState } from '../components/Lesson';
import { useSelector } from 'react-redux';
import { persistor } from '../store/store';
import { useBackHandler } from '@app/services/backHandler';

const HomeScreen: React.ComponentType = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClearCache = () => {
    persistor.purge().then(() => {
      // Очистка кэша
    });
  };

  useBackHandler();

  const ToLesson = (name: string, numLesson: number) => {
    dispatch(lessonInit(numLesson));
    dispatch(lessonMenuOpen());

    if (numLesson === 1) {
      dispatch(lessonQuessInit(Lesson1Quess));
      dispatch(lessonWordsInit(lesson1Words));
    }

    if (numLesson === 6) {
      dispatch(lessonQuessInit(Lesson6Quess));
      dispatch(lessonWordsInit(lesson6Words));
    }

    if (numLesson === 7) {
      dispatch(lessonQuessInit(Lesson7Quess));
      dispatch(lessonWordsInit(lesson7Words));
    }

    if (numLesson === 8) {
      dispatch(lessonQuessInit(Lesson8Quess));
      dispatch(lessonWordsInit(lesson8Words));
    }
    if (numLesson === 9) {
      dispatch(lessonQuessInit(Lesson9Quess));
      dispatch(lessonWordsInit(lesson9Words));
    }

    if (numLesson === 10) {
      dispatch(lessonQuessInit(Lesson10Quess));
      dispatch(lessonWordsInit(lesson10Words));
    }

    navigate('/lesson', { state: { lesson: name } });
  };

  const [inputValue, setInputValue] = useState(''); // Состояние для хранения введенного значения
  const stateDelay = useSelector((state: IState) => state.stateLesson.delay);

  const handleInputChange = (time: string) => {
    if (!isNaN(Number(time))) {
      setInputValue(time); // Обновление состояния при вводе текста, если введено число
    }
  };

  const handleSubmit = () => {
    dispatch(lessonDelayInit(Number(inputValue)));
    setInputValue('');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Это главный экран</Text>
        <Pressable style={styles.buttonsNavi} onPress={() => ToLesson('Урок 1', 1)}>
          <Text style={styles.buttonsText}>Урок 1</Text>
          <Text style={styles.buttonsTextDescription}>Всякое разное</Text>
        </Pressable>
        <Pressable style={styles.buttonsNavi} onPress={() => ToLesson('Урок 6', 6)}>
          <Text style={styles.buttonsText}>Урок 6</Text>
          <Text style={styles.buttonsTextDescription}>Модальные глаголы</Text>
        </Pressable>
        <Pressable style={styles.buttonsNavi} onPress={() => ToLesson('Урок 7', 7)}>
          <Text style={styles.buttonsText}>Урок 7</Text>
          <Text style={styles.buttonsTextDescription}>Притяжательные местоимения</Text>
        </Pressable>
        <Pressable style={styles.buttonsNavi} onPress={() => ToLesson('Урок 8', 8)}>
          <Text style={styles.buttonsText}>Урок 8</Text>
          <Text style={styles.buttonsTextDescription}>Вопросы</Text>
        </Pressable>
        <Pressable style={styles.buttonsNavi} onPress={() => ToLesson('Урок 9', 9)}>
          <Text style={styles.buttonsText}>Урок 9</Text>
          <Text style={styles.buttonsTextDescription}>Akkusativ – винительный падеж.</Text>
        </Pressable>
        <Pressable style={styles.buttonsNavi} onPress={() => ToLesson('Урок 10', 10)}>
          <Text style={styles.buttonsText}>Урок 10</Text>
          <Text style={styles.buttonsTextDescription}>Dativ - дательный падеж.</Text>
        </Pressable>

        <View>
          <Text>Введите значение задержки:</Text>
          <TextInput
            style={styles.input}
            inputMode="numeric"
            value={`${inputValue}`}
            onChangeText={handleInputChange}
            placeholder={`Задержка: ${stateDelay} сек`}
          />
          <Pressable style={styles.buttonsNavi} onPress={handleSubmit}>
            <Text>Отправить</Text>
          </Pressable>
        </View>
        <Pressable style={styles.buttonsNavi} onPress={() => navigate('/theoryScreen')}>
          <Text style={styles.buttonsText}>Теория</Text>
        </Pressable>
        <Pressable style={styles.buttonsNavi} onPress={() => navigate('/imagesAndWords')}>
          <Text style={styles.buttonsText}>Угадай картинку</Text>
        </Pressable>

        <Pressable style={styles.buttonsNavi} onPress={() => navigate('/homeScreen')}>
          <Text style={styles.buttonsText}>Числа на слух</Text>
        </Pressable>

        <Pressable style={styles.buttonClearCache} onPress={handleClearCache}>
          <Text style={styles.buttonsText}>Очистить кэш</Text>
        </Pressable>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flexGrow: 1,
    alignItems: 'center',
    gap: 20,
  },
  buttonsNavi: {
    width: '50%',
    backgroundColor: '#20B2AA',
    borderRadius: 5,
  },

  buttonClearCache: {
    width: '50%',
    backgroundColor: 'red',
    borderRadius: 5,
  },

  buttonsText: {
    textAlign: 'center',
    fontSize: 25,
  },
  buttonsTextDescription: {
    textAlign: 'center',
    fontSize: 15,
  },

  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});
export default HomeScreen;
