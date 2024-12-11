// src/screens/AdminsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admins</Text>
      <Text>Manage other admins here</Text>
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

export default AdminsScreen;
