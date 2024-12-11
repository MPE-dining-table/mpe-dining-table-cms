// src/screens/UsersScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UsersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <Text>Manage users here</Text>
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

export default UsersScreen;
