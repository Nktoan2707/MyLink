import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { navData } from "../components/NavOptions";

const EatsScreen = () => {
  // Sample user data (initial data)
  const [user, setUser] = useState({
    name: "Phú Nguyễn",
    email: "test@mail.com",
    profileImage: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    phone: "03356996430",
    rating: 4.5,
    tripsCompleted: 102,
    paymentMethod: "Cash",
  });

  // State to track changes in user data
  const [editedUser, setEditedUser] = useState({ ...user });

  // Function to handle user data updates
  const handleUserUpdate = () => {
    // Implement the logic to update user data on your backend
    // You can also validate the input data before updating
    setUser({ ...editedUser });
    // Display a success message to the user
    alert("Profile updated successfully");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: editedUser.profileImage }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{editedUser.name}</Text>
      <Text style={styles.email}>{editedUser.email}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={editedUser.name}
          onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={editedUser.email}
          onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Phone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={editedUser.phone}
          onChangeText={(text) => setEditedUser({ ...editedUser, phone: text })}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Payment Method:</Text>
        <RNPickerSelect
          onValueChange={(value) =>
            setEditedUser({ ...editedUser, paymentMethod: value })
          }
          value={editedUser.paymentMethod}
          items={[
            { label: "Credit Card", value: "Credit Card" },
            { label: "PayPal", value: "PayPal" },
            { label: "Cash", value: "Cash" },
          ]}
        />
      </View>

      <Button title="Save Changes" onPress={handleUserUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    marginTop: 100,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 8,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    width: "100%",
    height: 40,
    fontSize: 16,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
});

export default EatsScreen;
