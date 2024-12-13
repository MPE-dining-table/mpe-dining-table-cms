import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic for authentication (e.g., Firebase Auth or other)
    console.log("Logging in with:", email, password);
    navigation.navigate('Dashboard'); // Navigate to Dashboard on successful login
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
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
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign Up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  leftBackground: {
    flex: 1,
    backgroundColor: '#6A5ACD', // Left side color (e.g., Slate Blue)
  },
  rightBackground: {
    flex: 1,
    backgroundColor: '#FF6347', // Right side color (e.g., Tomato)
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent', // Ensures the content is transparent
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff', // White text for contrast
  },
  subHeader: {
    fontSize: 16,
    color: '#f5f5f5', // Light gray text for contrast
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#fff', // White background for inputs
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    color: '#f5f5f5', // Light gray text for contrast
    fontSize: 16,
  },
  signupLink: {
    color: '#fff', // White text for contrast
    fontWeight: 'bold',
  },
});

export default LoginScreen;