import { Image, View, Text } from "react-native";
import { setDestination, setOrigin } from "../app/slices/navigationSlice";

import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import NavFavorites from "../components/NavFavorites";
import NavOptions from "../components/NavOptions";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tailwind from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { GOOGLE_MAPS_API_KEY_PRIVATE } from "../config/private-constant";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={tailwind`p-5`}>
        {/* <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        /> */}
        <Text style={tailwind`mt-2 mb-2 text-4xl font-bold`}>my link</Text>
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where from?"
          enablePoweredByContainer={false}
          minLength={2}
          fetchDetails={true}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry.location,
                description: data.description,
              })
            );
            dispatch(setDestination(null));
          }}
          query={{
            key: GOOGLE_MAPS_API_KEY_PRIVATE,
            language: "vi",
            components: "country:vn",
          }}
          styles={{
            container: {
              flex: 0,
            },
          }}
        />

        <NavOptions />
        <Text style={tailwind`mt-2 text-lg font-bold`}>Favorites</Text>
        <NavFavorites shouldSetOrigin />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
