import React from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../routes/AppNavigator";
import { Lesson } from "../components/Lesson";

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
  return <Lesson />;
};

export default LessonScreen;
