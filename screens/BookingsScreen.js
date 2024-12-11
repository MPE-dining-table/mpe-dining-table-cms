// src/screens/BookingsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookings</Text>
      <Text>View and manage bookings here</Text>
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

export default BookingsScreen;
