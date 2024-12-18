import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const AdminRestaurantsScreen = () => {
  // State to manage restaurants, modal visibility, and user role
  const [restaurants, setRestaurants] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [role, setRole] = useState("admin"); // Replace with logic to fetch role dynamically

  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    address: "",
    cuisine: "",
    about: "",
    image: "",
    openingTime: "06:00 AM",
    closingTime: "10:00 PM",
  });

  useEffect(() => {
    // Simulate fetching role dynamically
    const fetchRole = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setRole(parsedData.role); // Assuming the role is stored in user data
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };
    fetchRole();
  }, []);

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewRestaurant({ ...newRestaurant, image: result.assets[0].uri });
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    const startHour = 6;
    const endHour = 24;

    for (let hour = startHour; hour <= endHour; hour++) {
      times.push(
        `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`
      );
    }

    return times;
  };

  const addRestaurant = async () => {
    if (!newRestaurant.name || !newRestaurant.address || !newRestaurant.image) {
      alert("Please fill in all required fields and choose an image");
      return;
    }

    // Add restaurant using axios (replace with your actual API)
    try {
      await axios.post("your-api-endpoint", newRestaurant);
      alert("Restaurant added successfully");
      setIsAddModalVisible(false);
      setNewRestaurant({
        name: "",
        address: "",
        cuisine: "",
        about: "",
        image: "",
        openingTime: "06:00 AM",
        closingTime: "10:00 PM",
      }); // Reset form
    } catch (error) {
      console.error("Error adding restaurant:", error);
      alert("Failed to add restaurant. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Restaurants</Text>
        {role === "super-admin" ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddModalVisible(true)}
          >
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.buttonText}>Add Restaurant</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.viewButton}>
            <Text style={styles.buttonText}>View Your Restaurant</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Add Restaurant Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Restaurant</Text>
              <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Restaurant Name"
                  placeholderTextColor="#888"
                  value={newRestaurant.name}
                  onChangeText={(text) =>
                    setNewRestaurant({ ...newRestaurant, name: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  placeholderTextColor="#888"
                  value={newRestaurant.address}
                  onChangeText={(text) =>
                    setNewRestaurant({ ...newRestaurant, address: text })
                  }
                />

                <Picker
                  selectedValue={newRestaurant.cuisine}
                  onValueChange={(itemValue) =>
                    setNewRestaurant({ ...newRestaurant, cuisine: itemValue })
                  }
                  style={styles.input}
                >
                  <Picker.Item label="Select Cuisine" value="" />
                  <Picker.Item label="Italian" value="italian" />
                  <Picker.Item label="Indian" value="indian" />
                  {/* Add more options here */}
                </Picker>

                <Picker
                  selectedValue={newRestaurant.openingTime}
                  onValueChange={(itemValue) =>
                    setNewRestaurant({ ...newRestaurant, openingTime: itemValue })
                  }
                  style={styles.input}
                >
                  {generateTimeOptions().map((time, index) => (
                    <Picker.Item key={index} label={time} value={time} />
                  ))}
                </Picker>

                <Picker
                  selectedValue={newRestaurant.closingTime}
                  onValueChange={(itemValue) =>
                    setNewRestaurant({ ...newRestaurant, closingTime: itemValue })
                  }
                  style={styles.input}
                >
                  {generateTimeOptions().map((time, index) => (
                    <Picker.Item key={index} label={time} value={time} />
                  ))}
                </Picker>

                <TextInput
                  style={styles.input}
                  placeholder="About"
                  placeholderTextColor="#888"
                  value={newRestaurant.about}
                  onChangeText={(text) =>
                    setNewRestaurant({ ...newRestaurant, about: text })
                  }
                />

                {/* Image Picker */}
                <TouchableOpacity
                  style={styles.imageButton}
                  onPress={pickImage}
                >
                  <Text style={styles.imageButtonText}>Pick Image</Text>
                </TouchableOpacity>

                {newRestaurant.image ? (
                  <Image
                    source={{ uri: newRestaurant.image }}
                    style={styles.imagePreview}
                  />
                ) : null}

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={addRestaurant}
                >
                  <Text style={styles.saveButtonText}>Save Restaurant</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
  },
  viewButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  imageButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  imageButtonText: {
    color: "white",
    textAlign: "center",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AdminRestaurantsScreen;
