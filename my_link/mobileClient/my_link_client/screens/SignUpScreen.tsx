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

const SignupScreen = () => {
  const navigation1 = useNavigation<HomeScreenProp1>();
  const navigation2 = useNavigation<HomeScreenProp2>();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const handleSignup = () => {
    let isSignUpSuccessful = false;
    if (email === "" || password === "") {
      isSignUpSuccessful = false;
    }
    if (password === passwordAgain) {
      isSignUpSuccessful = true;
    }

    if (isSignUpSuccessful) {
      navigation2.navigate("LoginScreen"); // Navigate to HomeScreen on successful login
    } else {
      alert("Invalid confirmation password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={tailwind`mt-2 mb-2 text-4xl font-bold`}>my link</Text>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setName}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={setPhone}
        value={phone}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Password Confirmation"
        secureTextEntry
        onChangeText={setPasswordAgain}
        value={passwordAgain}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation1.navigate("LoginScreen")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
  "SignUpScreen"
>;
export type HomeScreenProp2 = NativeStackNavigationProp<
  StackListApp,
  "LoginScreen"
>;
export default SignupScreen;
