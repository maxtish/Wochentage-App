import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store/store"; // Импортируйте store и persistor из store.ts
import MainApp from "./src/components/MainApp"; // Ваш корневой компонент приложения

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent("Wochentage", () => App);
export default App;
