import React from "react";

import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../routes/AppNavigator";
import { Words } from "../components/Words";

type DetailsScreenRouteProp = RouteProp<RootStackParamList, "Words">;
type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Words"
>;

interface ILessonScreen {
  route: DetailsScreenRouteProp;
  navigation: DetailsScreenNavigationProp;
}

const WordsScreen: React.FC<ILessonScreen> = ({ navigation }) => {
  return <Words />;
};

export default WordsScreen;
