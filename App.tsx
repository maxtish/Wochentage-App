import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store/store"; // Импортируйте store и persistor из store.ts
import { NativeRouter, Route, Routes } from "react-router-native";
import HomeScreen from "./src/screens/HomeScreen";
import LessonScreen from "./src/screens/LessonScreen";
import WordsScreen from "./src/screens/WordsScreen";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeRouter>
          <Routes>
            <Route path="/" Component={HomeScreen} />
            <Route path="/lesson" Component={LessonScreen} />
            <Route path="/words" Component={WordsScreen} />
          </Routes>
        </NativeRouter>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent("Wochentage", () => App);
export default App;
