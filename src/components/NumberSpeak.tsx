import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Text, Pressable, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { allWordsIncrement, allWordsInit, allWordsResetCount } from '../store/actions/actions';
import { iconAssets } from '../../iconAssets';
import * as Progress from 'react-native-progress';
import * as Speech from 'expo-speech';

export const NumberSpeak: React.FC = () => {
  const speakText = (text: string) => {
    Speech.speak(text, { language: 'de' });
  };

  return (
    <View style={styles.container}>
      <Text>dfsfsdf</Text>
      <Pressable onPress={() => speakText('Hallo')}>
        <Text>BUTTON</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
  },
});
