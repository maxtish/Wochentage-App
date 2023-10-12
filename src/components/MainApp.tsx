// App.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  initData,
  delAll,
} from "../store/actions/actions"; // Путь к вашим действиям (actions)
import { stateCounts } from "../store/reducers/count";
import { daysOfWeek } from "../../constants";
import { IDataState } from "../store/reducers/data";

export interface IState {
  stateCounts: stateCounts;
  stateData: IDataState;
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state: IState) => state.stateCounts);
  const state = useSelector((state: IState) => state);
  console.log(state);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Text>Счетчик:{count}</Text>
      <Text>Слово:{Object.values(state.stateData.queue)[count]}</Text>
      <Button title="Увеличить" onPress={() => dispatch(increment())} />
      <Button title="Уменьшить" onPress={() => dispatch(decrement())} />
      <Button
        title="Добавить базу"
        onPress={() => dispatch(initData(daysOfWeek))}
      />
      <Button title="Удалить всю базу" onPress={() => dispatch(delAll())} />
      {Object.keys(state.stateData.button).map((id) => {
        return (
          <Button
            key={id}
            onPress={() => {
              console.log(id);
            }}
            title={state.stateData.button[id]}
          />
        );
      })}
    </View>
  );
};

export default App;
