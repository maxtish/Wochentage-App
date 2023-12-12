import React from 'react';
import { AppRegistry, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { NativeRouter, Route, Routes } from 'react-router-native';
import HomeScreen from './src/screens/HomeScreen';
import LessonScreen from './src/screens/LessonScreen';
import ImagesAndWords from './src/screens/ImagesAndWords';
import NumberSpeakScreen from './src/screens/NumberSpeakScreen';

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NativeRouter>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          <Routes>
            <Route path="/" Component={HomeScreen} />
            <Route path="/lesson" Component={LessonScreen} />
            <Route path="/imagesAndWords" Component={ImagesAndWords} />
            <Route path="/homeScreen" Component={NumberSpeakScreen} />
          </Routes>
        </NativeRouter>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
AppRegistry.registerComponent('Dawai-Dawai', () => App);
export default App;
