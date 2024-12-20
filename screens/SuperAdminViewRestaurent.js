import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import axios from "axios";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SuperAdminViewRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    address: "",
    cuisine: "",
    about: "",
    image: "",
    timeSlot: "",
  });

  const handleInputChange = (field, value) => {
    setNewRestaurant((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAddRestaurant = () => {
    const newRestaurantWithId = {
      ...newRestaurant,
      id: String(restaurants.length + 1),
    };
    setRestaurants([...restaurants, newRestaurantWithId]);
    setModalVisible(false);
    setNewRestaurant({
      name: "",
      address: "",
      cuisine: "",
      about: "",
      image: "",
      timeSlot: "",
    });
  };

  const fetchToken = async () => {
    try {
      const adminData = await AsyncStorage.getItem("admin");
      if (adminData) {
        const parsedData = JSON.parse(adminData);
        return parsedData.token;
      }
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  };

  const fetchRes = async () => {
    try {
      const response = await axios.get(
        "https://mpe-backend-server.onrender.com/api/actions/fetch-restuarents"
      );
      setRestaurants(response.data.restuarents);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch restaurants.");
    }
  };

  useEffect(() => {
    fetchRes();
  }, [restaurants]);

  const handleDeleteRestaurant = async (id) => {
    const token = await fetchToken();
    // console.log("item id", id);
    try {
      await axios.delete(
        `https://mpe-backend-server.onrender.com/api/actions/delete-restuarent/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRestaurants((prevRestaurants) =>
        prevRestaurants.filter((restaurant) => restaurant.id !== id)
      );
      Alert.alert("Success", "Restaurant deleted");

      fetchRes();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to delete the restaurant.");
    }
  };

  const RestaurantCard = ({ item, onDelete }) => {
    const renderRightActions = () => (
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );

    return (
      <View>
        <TouchableOpacity style={styles.card} onPress={()=> handleDeleteRestaurant(item._id)}>
          <Image
            source={{ uri: item.image || "https://via.placeholder.com/150" }}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.restaurantName}</Text>
            <Text style={styles.cardSubtitle}>{item.cuisine}</Text>
            <Text style={styles.cardAddress}>{item.address}</Text>
            <Text style={styles.cardAbout} numberOfLines={2}>
              {item.about}
            </Text>
            <Text style={styles.cardTimeSlot}>
              Opened from: {item.openingTime}am - {item.closingTime}pm
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurants</Text>

      <FlatList
        data={restaurants}
        renderItem={({ item }) => (
          <RestaurantCard item={item} onDelete={handleDeleteRestaurant} />
        )}
        keyExtractor={(item, index) => index}
        contentContainerStyle={styles.flatListContent}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal for adding new restaurant */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Add New Restaurant</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                ></TouchableOpacity>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Restaurant Name"
                value={newRestaurant.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={newRestaurant.address}
                onChangeText={(text) => handleInputChange("address", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Cuisine"
                value={newRestaurant.cuisine}
                onChangeText={(text) => handleInputChange("cuisine", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="About"
                value={newRestaurant.about}
                onChangeText={(text) => handleInputChange("about", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Image URL"
                value={newRestaurant.image}
                onChangeText={(text) => handleInputChange("image", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Time Slot"
                value={newRestaurant.timeSlot}
                onChangeText={(text) => handleInputChange("timeSlot", text)}
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

export default SuperAdminViewRestaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Light gray background
    padding: 15,
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Dark gray text
    marginBottom: 20,
    textAlign: "center",
  },
  flatListContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff", // White background
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0", // Light gray border
  },
  cardImage: {
    width: 120,
    height: "auto",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: "90%",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#888",
    marginTop: 4,
  },
  cardAddress: {
    fontSize: 16,
    color: "#555",
    marginTop: 8,
  },
  cardAbout: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
  },
  cardTimeSlot: {
    fontSize: 14,
    color: "#777",
    marginTop: 8,
  },
  addButton: {
    backgroundColor: "#007bff", // Blue button
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContent: {
    top: "10%",
    width: "100%",
    maxHeight: "90%",
    backgroundColor: "#ffffff", // White background
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {},
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#f9f9f9", // Light gray background
    color: "#333",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#007bff", // Blue button
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#6c757d", // Gray button
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
