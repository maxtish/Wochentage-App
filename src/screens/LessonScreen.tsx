import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../routes/AppNavigator";
import { IState, Lesson } from "../components/Lesson";
import { useSelector } from "react-redux";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Lesson">;
type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Lesson"
>;

interface ILessonScreen {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}

const LessonScreen: React.FC<ILessonScreen> = ({ navigation }) => {
  const stateBaza = useSelector((state: IState) => state.stateData.baza);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Убрать стандартный заголовок
    });
  }, [navigation]);

  return <Lesson />;
};

export default LessonScreen;
