import { ActivityIndicator, View, StyleSheet, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import tailwind from "tailwind-react-native-classnames/dist/tailwind";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackListApp } from "../components/AppNavigation";

const FindingADriverScreen = () => {
  const navigation = useNavigation<HomeScreenProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("DriverOnTheWayScreen");
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#000000" />
      <Text style={styles.text}>Finding a driver...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10, // Adjust the spacing between the loading indicator and text
    fontSize: 16,
    textAlign: "center", // Center the text horizontally
  },
});
export type HomeScreenProp = NativeStackNavigationProp<
  StackListApp,
  "DriverOnTheWayScreen"
>;

export default FindingADriverScreen;
