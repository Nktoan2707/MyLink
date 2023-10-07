import EatsScreen from "../screens/EatsScreen";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import NavigateCard from "./NavigateCard";
import RideOptionsCard from "./RideOptionsCard";
import FindingADriverScreen from "../screens/FindingADriverScreen";
import DriverOnTheWayScreen from "../screens/DriverOnTheWayScreen";

export type StackListApp = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  HomeScreen: undefined;
  MapScreen: undefined;
  EatsScreen: undefined;
  NavigateCard: undefined;
  RideOptionsCard: undefined;
  FindingADriverScreen: undefined;
  DriverOnTheWayScreen: undefined;
};

const Stack = createNativeStackNavigator<StackListApp>();

const AppNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EatsScreen"
        component={EatsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FindingADriverScreen"
        component={FindingADriverScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DriverOnTheWayScreen"
        component={DriverOnTheWayScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NavigateCard"
        component={NavigateCard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RideOptionsCard"
        component={RideOptionsCard}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigation;
