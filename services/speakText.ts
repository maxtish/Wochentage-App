import * as Speech from 'expo-speech';

export const speakText = (text: string) => {
  console.log('говорю - ', text);
  Speech.speak(text, { language: 'de' });
};
