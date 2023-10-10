// App.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../store/actions/actions"; // Путь к вашим действиям (actions)
import store from "../store/store"; // Путь к вашему хранилищу (store)
import { IState } from "../store/reducers/count";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state: IState) => state.stateCounts);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Счетчик:{count}</Text>

      <Button title="Увеличить" onPress={() => dispatch(increment())} />
      <Button title="Уменьшить" onPress={() => dispatch(decrement())} />
    </View>
  );
};

export default App;
