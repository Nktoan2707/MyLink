import { FlatList, Text, TouchableOpacity, View } from "react-native";
import {
  selectOrigin,
  setDestination,
  setOrigin,
} from "../app/slices/navigationSlice";
import { useDispatch, useSelector } from "react-redux";

import { HomeScreenProp } from "./NavOptions";
import { Icon } from "react-native-elements";
import { Point } from "react-native-google-places-autocomplete";
import React from "react";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { StackList } from "./MapScreenNavigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const NavFavorites = ({ shouldSetOrigin }: { shouldSetOrigin?: boolean }) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation<HomeScreenProp>();
  const navigation1 = useNavigation<HomeScreenProp2>();

  return (
    <FlatList
      data={favoritesData.filter(
        // Checks to see if Home or Work is already selected
        (item) => shouldSetOrigin || origin?.location !== item.location
      )}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View
          style={[
            tailwind`bg-gray-200`,
            {
              height: 0.5,
            },
          ]}
        />
      )}
      renderItem={({ item: { name, icon, location, description } }) => (
        <TouchableOpacity
          style={tailwind`flex-row items-center py-5`}
          onPress={() => {
            if (shouldSetOrigin) {
              dispatch(
                setOrigin({
                  location,
                  description,
                })
              );
              navigation.navigate("MapScreen");
            } else {
              dispatch(
                setDestination({
                  location,
                  description,
                })
              );
              navigation1.navigate("RideOptionsCard");
            }
          }}
        >
          <Icon
            style={tailwind`mr-4 rounded-full bg-yellow-400 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tailwind`font-bold text-lg`}>{name}</Text>
            <Text style={tailwind`text-gray-500`}>{description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

type FavoritesData = {
  id: string;
  name: string;
  icon: string;
  location: Point;
  description: string;
}[];

const favoritesData: FavoritesData = [
  {
    id: "234",
    icon: "location",
    name: "Current location",
    location: { lat: 10.778365431730162, lng: 106.66544771277447 },
    description:
      "268 Đ. Tô Hiến Thành, Phường 15, Quận 10, Thành phố Hồ Chí Minh, Việt Nam",
  },
  {
    id: "235",
    icon: "location",
    name: "Trường Đại học Khoa Học Tự Nhiên - ĐHQG TPHCM",
    location: { lat: 10.76289, lng: 106.68248 },
    description:
      "227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh, Việt Nam",
  },
];

export type HomeScreenProp2 = NativeStackNavigationProp<
  StackList,
  "RideOptionsCard"
>;

export default NavFavorites;
