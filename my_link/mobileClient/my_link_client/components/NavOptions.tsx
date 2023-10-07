import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import { Icon } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StackList } from "./HomeNavigation";
import { selectOrigin } from "../app/slices/navigationSlice";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const NavOptions = () => {
  const navigation = useNavigation<HomeScreenProp>();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={navData}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={!origin && item.isSearch === true}
          onPress={() => navigation.navigate(item.screen)}
          style={tailwind`pr-2 pl-6 pt-4 pb-8 bg-yellow-200 mr-2 mb-5 w-40 rounded-md`}
        >
          <View
            style={tailwind.style(
              !origin && item.isSearch === true && "opacity-20"
            )}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
            <Text style={tailwind`mt-2 text-lg font-bold`}>{item.title}</Text>
            <Icon
              style={tailwind`p-2 bg-black rounded-full w-10 mt-6`}
              type="antdesign"
              color="white"
              name="arrowright"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

type NavData = {
  id: string;
  title: string;
  image: string;
  isSearch?: boolean;
  screen: keyof StackList;
}[];

export const navData: NavData = [
  {
    id: "123",
    title: "my link car",
    image: "https://links.papareact.com/3pn",
    isSearch: true,
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "my profile",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    isSearch: false,
    screen: "EatsScreen",
  },
];

export type HomeScreenProp = NativeStackNavigationProp<StackList, "HomeScreen">;

export default NavOptions;
