import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../app/slices/navigationSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY_PRIVATE } from "../config/private-constant";

const DriverOnTheWayScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef<MapView>(null);
  const driverInfo = {
    name: "Nguyễn Khánh Toàn",
    phoneNumber: "034567891",
    driverId: "59-1A 12345",
    driverImage:
      "https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-hipster-vector-stock-91462914.jpg", // Add the path to the driver's image
  };
  useEffect(() => {
    if (!origin || !destination) return;

    // Fit the map to the supplied markers
    mapRef.current?.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Image
          source={{ uri: driverInfo.driverImage }}
          style={styles.driverImage}
        />
        <Text style={styles.messageText}>
          Driver {driverInfo.name} ({driverInfo.driverId})
        </Text>
        <Text style={styles.messageText}>
          is coming in the next 10 minutes.
        </Text>
        <Text style={styles.messageText}>
          Contact: {driverInfo.phoneNumber}
        </Text>
      </View>
      {origin && destination && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: origin.location?.lat ?? 10.762622,
            longitude: origin.location?.lng ?? 106.660172,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          mapType="mutedStandard"
        >
          <Marker
            coordinate={{
              latitude: 10.762622,
              longitude: 106.660172,
            }}
            title="Origin"
            description={destination.description}
            identifier="origin"
          >
            {/* Add a callout for the origin marker */}
            <Callout tooltip={true}>
              <Text>Driver</Text>
            </Callout>
          </Marker>

          <Marker
            coordinate={{
              latitude: origin.location?.lat ?? 10.762622,
              longitude: origin.location?.lng ?? 106.660172,
            }}
            title="Destination"
            description={origin.description}
            identifier="destination"
          >
            {/* Add a callout for the origin marker */}
            <Callout tooltip={true}>
              <Text>You</Text>
            </Callout>
          </Marker>

          {/* Uncomment this section if you want to show directions */}
          {/* <MapViewDirections
            origin={origin.description}
            destination={destination.description}
            apikey={GOOGLE_MAPS_API_KEY_PRIVATE}
            strokeWidth={3}
            strokeColor="yellow"
            lineDashPattern={[0]}
          /> */}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  messageContainer: {
    backgroundColor: "lightyellow",
    padding: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column", // Display items vertically
  },
  driverImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make it circular
    marginBottom: 10, // Add spacing between image and text
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24, // Adjust line spacing as needed
  },
});

export default DriverOnTheWayScreen;
