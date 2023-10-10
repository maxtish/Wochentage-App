import React from "react";
import { Provider } from "react-redux";
import store from "./src/store/store"; // Путь к вашему Redux хранилищу
import MainApp from "./src/components/MainApp"; // Ваш корневой компонент приложения

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
