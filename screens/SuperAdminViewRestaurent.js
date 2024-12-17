import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Image, 
  Modal, 
  TextInput, 
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

const SuperAdminViewRestaurent = () => {
    const [restaurants, setRestaurants] = useState([
        {
          id: '1',
          name: 'Pasta Paradise',
          address: '123 Main St, Foodville',
          cuisine: 'Italian',
          about: 'Authentic Italian cuisine with a modern twist',
          image: 'https://example.com/pasta-restaurant.jpg',
          timeSlot: '10:00 AM - 10:00 PM' // Example time slot
        },
        {
          id: '2',
          name: 'Sushi Sensation',
          address: '456 Ocean Ave, Seafood City',
          cuisine: 'Japanese',
          about: 'Fresh sushi and traditional Japanese dishes',
          image: 'https://example.com/sushi-restaurant.jpg',
          timeSlot: '11:00 AM - 9:00 PM' // Example time slot
        }
      ]);

      const RestaurantCard = ({ item }) => (
        <View style={styles.card}>
          <Image 
            source={{ uri: item.image || 'https://via.placeholder.com/150' }} 
            style={styles.cardImage} 
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.cuisine}</Text>
            <Text style={styles.cardAddress}>{item.address}</Text>
            <Text style={styles.cardAbout} numberOfLines={2}>{item.about}</Text>
            <Text style={styles.cardTimeSlot}>{item.timeSlot}</Text>
            
          </View>
        </View>
      );

  return (
    <View>
      <Text>ViewRestaurent</Text>
    </View>
  )
}

export default SuperAdminViewRestaurent

const styles = StyleSheet.create({})