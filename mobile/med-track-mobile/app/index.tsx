import ApiService from "@/services/api-service";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  email: string;
  password: string;
}

export default function AuthScreen({}) {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });

  const handleInputChange = (id: string, value: string) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  const handleLogIn = async () => {
    try {
      await AsyncStorage.removeItem("token");
      const response = await ApiService.post("/auth/login", userData);
      await AsyncStorage.setItem("token", response.data.token);
      router.push("/tabs");
    } catch (error) {
      alert("Email or Password Incorrect");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.authContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => handleInputChange("password", text)}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={handleLogIn}>
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  authContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  bottomContainer: {
    marginTop: 20,
  },
});
