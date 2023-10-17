import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/store/store"; // Импортируйте store и persistor из store.ts
import AppNavigator from "./src/routes/AppNavigator";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent("Wochentage", () => App);
export default App;
