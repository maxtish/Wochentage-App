import * as Speech from 'expo-speech';

type SpeakCallback = (isSpoken: boolean) => void;

export const speakText = async (text: string, callback: SpeakCallback): Promise<void> => {
  try {
    await Speech.speak(text, {
      language: 'de', // для немецкого
      onDone: () => {
        callback(true); // вызывается, когда произношение завершено успешно
      },
      onStart: () => {
        callback(false); // вызывается, когда начал произношение
      },
    });
  } catch (error) {
    console.error('Ошибка при произнесении:', error);
    callback(false);
  }
};
