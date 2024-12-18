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

  const [modalVisible, setModalVisible] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    address: '',
    cuisine: '',
    about: '',
    image: '',
    timeSlot: '',
  });

  const handleInputChange = (field, value) => {
    setNewRestaurant((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAddRestaurant = () => {
    const newRestaurantWithId = { ...newRestaurant, id: String(restaurants.length + 1) };
    setRestaurants([...restaurants, newRestaurantWithId]);
    setModalVisible(false);
    setNewRestaurant({
      name: '',
      address: '',
      cuisine: '',
      about: '',
      image: '',
      timeSlot: '',
    });
  };

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
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants</Text>

      <FlatList 
        data={restaurants}
        renderItem={({ item }) => <RestaurantCard item={item} />}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>Add New Restaurant</Text>
      </TouchableOpacity>

      {/* Modal for adding new restaurant */}
      <Modal 
        visible={modalVisible} 
        animationType="slide" 
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <TextInput 
                style={styles.input} 
                placeholder="Restaurant Name"
                value={newRestaurant.name}
                onChangeText={(text) => handleInputChange('name', text)}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Address"
                value={newRestaurant.address}
                onChangeText={(text) => handleInputChange('address', text)}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Cuisine"
                value={newRestaurant.cuisine}
                onChangeText={(text) => handleInputChange('cuisine', text)}
              />
              <TextInput 
                style={styles.input} 
                placeholder="About"
                value={newRestaurant.about}
                onChangeText={(text) => handleInputChange('about', text)}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Image URL"
                value={newRestaurant.image}
                onChangeText={(text) => handleInputChange('image', text)}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Time Slot"
                value={newRestaurant.timeSlot}
                onChangeText={(text) => handleInputChange('timeSlot', text)}
              />
              <TouchableOpacity 
                style={styles.submitButton} 
                onPress={handleAddRestaurant}
              >
                <Text style={styles.submitButtonText}>Add Restaurant</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.cancelButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default SuperAdminViewRestaurent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  cardContent: {
    padding: 10,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  cardAddress: {
    fontSize: 14,
    marginVertical: 5,
  },
  cardAbout: {
    fontSize: 14,
    color: '#555',
  },
  cardTimeSlot: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    marginVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#f44336',
  },
});
