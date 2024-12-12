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
  Picker
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const RestaurantsScreen = () => {
  // State to manage restaurants and modal visibility
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
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    address: '',
    cuisine: '',
    about: '',
    image: '',
    openingTime: '06:00 AM', // Default opening time
    closingTime: '10:00 PM', // Default closing time
  });

  // Function to pick an image from the phone's gallery
  const pickImage = async () => {
    // Request permission to access the gallery
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      setNewRestaurant({...newRestaurant, image: result.assets[0].uri});
    }
  };

  // Function to generate time options (06:00 AM to 12:00 AM)
  const generateTimeOptions = () => {
    const times = [];
    const startHour = 6; // 6 AM
    const endHour = 24; // 12 AM

    for (let hour = startHour; hour <= endHour; hour++) {
      // Add full hour (e.g., 6:00 AM, 7:00 AM)
      times.push(`${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`);

      // Add half-hour (e.g., 6:30 AM, 7:30 AM)
      times.push(`${hour % 12 === 0 ? 12 : hour % 12}:30 ${hour < 12 ? 'AM' : 'PM'}`);
    }

    return times;
  };

  // Function to add a new restaurant
  const addRestaurant = () => {
    if (!newRestaurant.name || !newRestaurant.address) {
      alert('Please fill in at least the name and address');
      return;
    }

    const restaurantToAdd = {
      ...newRestaurant,
      id: (restaurants.length + 1).toString(),
      timeSlot: `${newRestaurant.openingTime} - ${newRestaurant.closingTime}`
    };

    setRestaurants([...restaurants, restaurantToAdd]);
    setIsAddModalVisible(false);
    // Reset the new restaurant form
    setNewRestaurant({
      name: '',
      address: '',
      cuisine: '',
      about: '',
      image: '',
      openingTime: '06:00 AM',
      closingTime: '10:00 PM',
    });
  };

  // Render individual restaurant card
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
        <Text style={styles.cardTimeSlot}>{item.timeSlot}</Text> {/* Display time slot */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Restaurants</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Restaurant Grid */}
      <FlatList
        data={restaurants}
        renderItem={RestaurantCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
      />

      {/* Add Restaurant Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Restaurant</Text>
            <ScrollView 
              contentContainerStyle={styles.scrollViewContent}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={styles.input}
                placeholder="Restaurant Name"
                placeholderTextColor="#888"
                value={newRestaurant.name}
                onChangeText={(text) => setNewRestaurant({...newRestaurant, name: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                placeholderTextColor="#888"
                value={newRestaurant.address}
                onChangeText={(text) => setNewRestaurant({...newRestaurant, address: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Cuisine"
                placeholderTextColor="#888"
                value={newRestaurant.cuisine}
                onChangeText={(text) => setNewRestaurant({...newRestaurant, cuisine: text})}
              />
              <TextInput
                style={[styles.input, styles.multilineInput]}
                placeholder="About"
                placeholderTextColor="#888"
                multiline
                value={newRestaurant.about}
                onChangeText={(text) => setNewRestaurant({...newRestaurant, about: text})}
              />
              
              {/* Time Slot Section */}
              <View style={styles.timeSlotContainer}>
                <Text style={styles.label}>Opening Time</Text>
                <Picker
                  selectedValue={newRestaurant.openingTime}
                  onValueChange={(itemValue) => setNewRestaurant({...newRestaurant, openingTime: itemValue})}
                  style={styles.picker}
                >
                  {generateTimeOptions().map((time, index) => (
                    <Picker.Item key={index} label={time} value={time} />
                  ))}
                </Picker>

                <Text style={styles.label}>Closing Time</Text>
                <Picker
                  selectedValue={newRestaurant.closingTime}
                  onValueChange={(itemValue) => setNewRestaurant({...newRestaurant, closingTime: itemValue})}
                  style={styles.picker}
                >
                  {generateTimeOptions().map((time, index) => (
                    <Picker.Item key={index} label={time} value={time} />
                  ))}
                </Picker>
              </View>

              {/* Image Upload Section */}
              <View style={styles.imageUploadContainer}>
                {newRestaurant.image ? (
                  <Image 
                    source={{ uri: newRestaurant.image }} 
                    style={styles.uploadedImage} 
                  />
                ) : (
                  <Text style={styles.imageUploadText}>No image selected</Text>
                )}
                <TouchableOpacity 
                  style={styles.imageUploadButton} 
                  onPress={pickImage}
                >
                  <Ionicons name="image" size={24} color="white" />
                  <Text style={styles.imageUploadButtonText}>Choose Image</Text>
                </TouchableOpacity>
              </View>

              {/* Modal Buttons */}
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                  style={styles.modalButton} 
                  onPress={addRestaurant}
                >
                  <Text style={styles.modalButtonText}>Add Restaurant</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]} 
                  onPress={() => setIsAddModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Light gray background
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff', // White background
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Dark gray text
    fontFamily: 'Arial', // Use a modern font if available
  },
  addButton: {
    backgroundColor: '#007bff', // Blue button
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  grid: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#ffffff', // White background
    borderRadius: 15,
    width: '48%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light gray border
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Dark gray text
    fontFamily: 'Arial', // Use a modern font if available
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666', // Slightly lighter text
    marginTop: 5,
    fontFamily: 'Arial', // Use a modern font if available
  },
  cardAddress: {
    fontSize: 14,
    color: '#888', // Even lighter text
    marginTop: 5,
    fontFamily: 'Arial', // Use a modern font if available
  },
  cardAbout: {
    fontSize: 14,
    color: '#444', // Dark gray text
    marginTop: 5,
    fontFamily: 'Arial', // Use a modern font if available
  },
  cardTimeSlot: {
    fontSize: 14,
    color: '#666', // Slightly lighter text
    marginTop: 5,
    fontFamily: 'Arial', // Use a modern font if available
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#ffffff', // White background
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Dark gray text
    fontFamily: 'Arial', // Use a modern font if available
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9', // Light gray background
    color: '#333', // Dark gray text
    fontSize: 16,
    fontFamily: 'Arial', // Use a modern font if available
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  timeSlotContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Dark gray text
    fontFamily: 'Arial', // Use a modern font if available
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9', // Light gray background
  },
  imageUploadContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  uploadedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  imageUploadText: {
    fontSize: 16,
    color: '#888', // Light gray text
    marginBottom: 10,
    fontFamily: 'Arial', // Use a modern font if available
  },
  imageUploadButton: {
    flexDirection: 'row',
    backgroundColor: '#28a745', // Green button
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  imageUploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Arial', // Use a modern font if available
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#007bff', // Blue button
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: '#6c757d', // Gray button
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Arial', // Use a modern font if available
  },
});


export default RestaurantsScreen;