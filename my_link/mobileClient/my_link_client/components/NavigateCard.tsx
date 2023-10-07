import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NavFavorites from "./NavFavorites";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackList } from "./MapScreenNavigation";
import { setDestination, setOrigin } from "../app/slices/navigationSlice";
import tailwind from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_MAPS_API_KEY_PRIVATE } from "../config/private-constant";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigateCardProp>();

  return (
    <SafeAreaView style={tailwind`bg-white h-full flex-1 justify-between`}>
      <View style={tailwind`flex-shrink`}>
        <Text style={tailwind`text-center text-lg p-4`}>
          {getGreetingByTime()}, Phú Nguyễn
        </Text>

        <View style={tailwind`border-t border-gray-200 `}>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            debounce={400}
            fetchDetails={true}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            styles={toInputBoxStyles}
            query={{
              key: GOOGLE_MAPS_API_KEY_PRIVATE,
              language: "vi",
              components: "country:vn",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>
        <View style={tailwind`px-5`}>
          <NavFavorites />
        </View>
      </View>
      {/* <View
        style={tailwind`flex-row bg-white justify-evenly py-2 border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tailwind`bg-black flex-row w-24 justify-between items-center py-3 px-4 rounded-full`}
          onPress={() => navigation.navigate("RideOptionsCard")}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tailwind`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind`flex-row w-24 justify-between py-3 px-4 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tailwind`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const homePlace = {
  description: "Home",
  geometry: { location: { lat: 10.76289, lng: 106.68248 } },
};
const workPlace = {
  description: "Work",
  geometry: { location: { lat: 10.761180451253423, lng: 106.6632721862139 } },
};

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 5,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#FDF9E1",
    borderRadius: 0,
    fontSize: 16,
  },
  textInputContainer: {
    paddingHorizontal: 10,
    paddingBottom: 0,
  },
});

function getGreetingByTime(): string {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else if (currentHour >= 18 && currentHour <= 24) {
    return "Good evening";
  } else {
    return "Good night"; // Fallback greeting
  }
}

type NavigateCardProp = NativeStackNavigationProp<StackList, "NavigateCard">;

export default NavigateCard;
