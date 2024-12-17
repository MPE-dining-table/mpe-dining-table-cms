import React, { Fragment, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const LoginScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const validate = () => {
    let errors = {};
    if (!userInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.email)) {
      errors.email = "Invalid email format";
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!userInfo.password || !passwordRegex.test(userInfo.password)) {
      errors.password =
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          "https://mpe-backend-server.onrender.com/api/auth/admin-login",
          userInfo
        );

        // const { user, token } = response.data;

        // dispatch(setUser({ user, token }));

        AsyncStorage.setItem("admin", JSON.stringify(response.data));

        Alert.alert("Success", "Admin login successfully!");
        setUserInfo({
          email: "",
          password: "",
        });
        setErrors({});
        navigation.navigate("Dashboard"); // Navigate to Dashboard on successful login
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        Alert.alert(
          "Error",
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  };

  // const handleLogin = () => {
  //   // Logic for authentication (e.g., Firebase Auth or other)
  //   console.log("Logging in with:", email, password);
  //   navigation.navigate('Dashboard'); // Navigate to Dashboard on successful login
  // };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    // >
    <Fragment>
      <View style={styles.background}>
        <View style={styles.leftBackground} />
        <View style={styles.rightBackground} />
      </View>
      <View style={styles.content}>
        <Text style={styles.header}>Welcome Back</Text>
        <Text style={styles.subHeader}>Please sign in to your account</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          // value={email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Password"
          // value={password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
          autoCapitalize="none"
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {/* <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
        </Text> */}
      </View>
    </Fragment>
    // {/* </KeyboardAvoidingView> */}
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
  },
  leftBackground: {
    flex: 1,
    backgroundColor: "#6A5ACD", // Left side color (e.g., Slate Blue)
  },
  rightBackground: {
    flex: 1,
    backgroundColor: "#FF6347", // Right side color (e.g., Tomato)
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "transparent", // Ensures the content is transparent
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#fff", // White text for contrast
  },
  subHeader: {
    fontSize: 16,
    color: "#f5f5f5", // Light gray text for contrast
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: "#fff", // White background for inputs
    fontSize: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#007BFF",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    color: "#f5f5f5", // Light gray text for contrast
    fontSize: 16,
  },
  signupLink: {
    color: "#fff", // White text for contrast
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -5,
    marginBottom: 10,
  },
});

export default LoginScreen;
