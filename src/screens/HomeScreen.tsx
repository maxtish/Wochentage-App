import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/AppNavigator";

type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface HomeProps {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Это главный экран</Text>
      <Button title="Уроки" onPress={() => navigation.navigate("Lesson")} />
      <Button title="Слова" onPress={() => navigation.navigate("Words")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
});
export default HomeScreen;
