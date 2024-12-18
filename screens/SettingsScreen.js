import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      // Clear the user role from AsyncStorage
      await AsyncStorage.removeItem('admin');
      
      // Reset the navigation stack and navigate to the Login screen
      navigation.reset({
        index: 0, // Reset to the first route
        routes: [{ name: 'LoginScreen' }], // Ensure 'LoginScreen' is the correct route name
      });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>Manage settings here</Text>
      <Button title="Logout" onPress={handleLogout} color="#ff6b6b" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SettingsScreen;
