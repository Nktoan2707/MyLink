import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StackListApp } from "../components/AppNavigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tailwind from "tailwind-react-native-classnames";

const LoginScreen = () => {
  const navigation1 = useNavigation<HomeScreenProp1>();
  const navigation2 = useNavigation<HomeScreenProp2>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Simulate a successful login for demonstration purposes
    // In a real app, you would perform authentication here
    let isLoginSuccessful = false;
    if (email === "" || password === "") {
      isLoginSuccessful = false;
    }
    if (email === "test@mail.com" && password === "test") {
      isLoginSuccessful = true;
    }

    if (isLoginSuccessful) {
      navigation1.navigate("HomeScreen"); // Navigate to HomeScreen on successful login
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={tailwind`mt-2 mb-2 text-4xl font-bold`}>my link</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation2.navigate("SignUpScreen")}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  linkText: {
    marginTop: 10,
    color: "blue",
  },
});

export type HomeScreenProp1 = NativeStackNavigationProp<
  StackListApp,
  "HomeScreen"
>;
export type HomeScreenProp2 = NativeStackNavigationProp<
  StackListApp,
  "SignUpScreen"
>;

export default LoginScreen;
