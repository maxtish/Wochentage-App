import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

interface ICountdownTimer {
  duration: number;
  onStop: () => void; // Добавляем колбэк onStop в интерфейс
}

export const CountdownTimer = ({ duration, onStop }: ICountdownTimer) => {
  const [isActive, setIsActive] = useState(true);
  const [remainingTime, setRemainingTime] = useState<number>(duration);
  useEffect(() => {
    let interval: any;
    if (isActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      // Вызываем колбэк onStop, когда отсчет завершен
      onStop();
    }

    return () => clearInterval(interval);
  }, [isActive, remainingTime, onStop]);

  const handleComplete = () => {
    setIsActive(false);
    // Действия, которые нужно выполнить по завершении таймера
  };

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        size={100}
        isPlaying
        duration={duration}
        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
        colorsTime={[7, 5, 2, 0]}
        onComplete={handleComplete} // Добавляем onComplete, чтобы обработать завершение таймера
      >
        {({ remainingTime }) => <Text style={styles.timerText}>{remainingTime}</Text>}
      </CountdownCircleTimer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 40,
    color: '#CCC',
  },
});
