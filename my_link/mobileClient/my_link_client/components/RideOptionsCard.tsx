import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Connection, Exchange, Queue } from "react-native-amqp"; // Import AMQP components

import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  selectDestination,
  selectOrigin,
  selectTravelTimeInfo,
} from "../app/slices/navigationSlice";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackListApp } from "./AppNavigation";

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const navigate = useNavigation<FindingADriverScreenProp>();

  const [selected, setSelected] = useState<RidesData[0] | null>(null);
  const travelTimeInformation = useSelector(selectTravelTimeInfo);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  const handleChooseRide = () => {
    let distance = 10;
    if (travelTimeInformation) {
      distance =
        parseFloat(travelTimeInformation!.distance.text.replace(" mi", "")) ??
        10;
    }

    axios
      .post("http://192.168.1.15:8080/api/booking", {
        customer: 1,
        address: origin?.description ?? "123 Nguyen Van Linh",
        phone: "010101111",
        destination: destination?.description ?? "125 Nguyen Van Linh",
      })
      .then(function (response) {
        console.log("book successfully", response.data);

        // const config = {
        //   host: "http://localhost",
        //   port: 5672,
        //   username: "guest",
        //   password: "guest",
        //   virtualhost: "/",
        // };

        // let connection = new Connection(config);
        // console.log("set up connection 1");

        // connection.connect();
        // console.log("set up connection");
        // let connected = false;
        // let queue;
        // let exchange;

        // connection.on("connected", (event) => {
        //   queue = new Queue(
        //     connection,
        //     {
        //       name: "send_to_user",
        //       passive: false,
        //       durable: true,
        //       exclusive: false,
        //       consumer_arguments: { "x-priority": 1 },
        //     },
        //     {}
        //   );

        //   exchange = new Exchange(connection, {
        //     name: "send_to_user",
        //     type: "direct",
        //     durable: true,
        //     autoDelete: false,
        //     internal: false,
        //   });

        //   queue.bind(exchange, "send_to_user");
        // });

        // connection.on("error", (event) => {
        //   connected = false;
        //   console.log(connection);
        //   console.log(event);
        // });

        // loading screen
        navigate.navigate("FindingADriverScreen");
      })
      .catch(function (error) {
        console.log("book failed", error);
      });
  };

  return (
    <SafeAreaView style={tailwind`bg-white h-full flex-1`}>
      <View style={tailwind``}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tailwind`absolute top-1 left-0 px-5 rounded-full`}
        >
          <Icon
            name={Platform.OS === "ios" ? "ios-chevron-back" : "md-arrow-back"}
            type="ionicon"
          />
        </TouchableOpacity>
        {/* {[
            (travelTimeInformation?.distance.value ?? 0) * 1.609344,
            // Add more calculations as needed
          ].map((result, index) =>
            index === 0 ? result.toFixed(2) : ` | ${result.toFixed(2)}`
          )} */}
        {travelTimeInformation && travelTimeInformation.distance ? (
          <Text style={tailwind`text-center mb-5 text-lg`}>
            Select a Ride -{" "}
            {(
              parseFloat(
                travelTimeInformation.distance.text.replace(" mi", "")
              ) * 1.609344
            ).toFixed(2)}{" "}
            km
          </Text>
        ) : null}
      </View>
      <FlatList
        data={ridesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tailwind.style(
              `flex-row justify-between items-center px-6`,
              id === selected?.id && "bg-yellow-100"
            )}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{
                uri: image,
              }}
            />
            <View style={tailwind`-ml-8`}>
              <Text style={tailwind`text-lg font-bold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text}</Text>
            </View>
            {travelTimeInformation && travelTimeInformation.distance ? (
              <Text style={tailwind`text-lg`}>
                {calculateTaxiPrice(travelTimeInformation.distance.text)} VNĐ
              </Text>
            ) : null}
          </TouchableOpacity>
        )}
      />
      <View style={tailwind`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tailwind.style(
            `bg-yellow-400 py-3 m-3`,
            !selected && "bg-gray-200"
          )}
        >
          <Text
            style={tailwind`text-center text-white text-lg`}
            onPress={handleChooseRide}
          >
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

type FindingADriverScreenProp = NativeStackNavigationProp<
  StackListApp,
  "FindingADriverScreen"
>;

function calculateTaxiPrice(distance: string): string {
  const distanceInKm = parseFloat(distance.replace(" mi", "")) * 1.609344;
  const basePricePerKm = 11000;
  const additionalPricePerKm = 9500;
  const highTrafficTimeAdditionalCharge = 2000; // Additional charge during high traffic times // API
  const thresholdDistanceKm = 30;

  const currentHour = new Date().getHours(); // Get the current hour

  let totalPrice;

  if (distanceInKm <= thresholdDistanceKm) {
    totalPrice = distanceInKm * basePricePerKm;
  } else {
    const priceForFirst30Km = thresholdDistanceKm * basePricePerKm;
    const additionalDistanceKm = distanceInKm - thresholdDistanceKm;
    const additionalPrice = additionalDistanceKm * additionalPricePerKm;
    totalPrice = priceForFirst30Km + additionalPrice;
  }

  // Check if the current hour is within the high traffic time ranges
  if (
    (currentHour >= 7 && currentHour < 9) || // 7AM to 9AM
    (currentHour >= 16 && currentHour < 19) // 16PM to 19PM
  ) {
    totalPrice += distanceInKm * highTrafficTimeAdditionalCharge;
  }

  // Round to the nearest integer and format with commas
  return totalPrice.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

type RidesData = {
  id: string;
  title: string;
  multiplier: number;
  image: string;
}[];

const ridesData: RidesData = [
  {
    id: "My-Link-Car-123",
    title: "My Link Car",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "My-Link-Car-456",
    title: "My Link Car XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "My-Link-Lux-789",
    title: "My Link Car LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;

export default RideOptionsCard;
