import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
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
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Убрать стандартный заголовок
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>Это главный экран</Text>
      <Pressable
        style={styles.buttonsNavi}
        onPress={() => navigation.navigate("Lesson")}
      >
        <Text style={styles.buttonsText}>Уроки</Text>
      </Pressable>
      <Pressable
        style={styles.buttonsNavi}
        onPress={() => navigation.navigate("Words")}
      >
        <Text style={styles.buttonsText}>Слова</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    gap: 20,
    alignItems: "center",
  },
  buttonsNavi: {
    width: "50%",
    backgroundColor: "#777",
    borderRadius: 5,
  },
  buttonsText: {
    textAlign: "center",
    fontSize: 25,
  },
});
export default HomeScreen;
