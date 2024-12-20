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
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";

const AdminRestaurantsScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [role, setRole] = useState("admin");

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
    // Fetch restaurants
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "https://mpe-backend-server.onrender.com/api/actions//fetch-restuarents"
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        alert("Failed to fetch restaurants. Please try again.");
      }
    };

    fetchRestaurants();

    // Fetch role (simulated)
    const fetchRole = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setRole(parsedData.role);
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    fetchRole();
  }, []);

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

      {/* Restaurant List */}
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.restaurantCard}>
            <Image source={{ uri: item.image }} style={styles.restaurantImage} />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantAddress}>{item.address}</Text>
              <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.restaurantList}
      />

      {/* Add Restaurant Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        {/* Modal Content */}
        {/* Similar modal implementation from your original code */}
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
  restaurantList: {
    padding: 10,
  },
  restaurantCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  restaurantInfo: {
    marginLeft: 10,
    justifyContent: "center",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  restaurantAddress: {
    fontSize: 14,
    color: "#666",
  },
  restaurantCuisine: {
    fontSize: 14,
    color: "#666",
  },
});

export default AdminRestaurantsScreen;
