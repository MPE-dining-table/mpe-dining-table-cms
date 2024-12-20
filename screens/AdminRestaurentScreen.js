import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AdminRestaurantsScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [role, setRole] = useState("admin");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const navigation = useNavigation();

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

  useEffect(() => {
    const fetchRestaurants = async () => {
      const token = await fetchToken();
      try {
        const response = await axios.get(
          "https://mpe-backend-server.onrender.com/api/actions/fetch-restuarent",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        alert("Failed to fetch restaurants. Please try again.");
      }
    };

    fetchRestaurants();

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

  const handleRestaurantSelect = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  if (selectedRestaurant) {
    return (
      <View style={styles.fullScreenContainer}>
        <Image
          source={{ uri: selectedRestaurant.image }}
          style={styles.fullScreenImage}
        />
        <ScrollView style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>{selectedRestaurant.restuarentName}</Text>
          <Text style={styles.detailsText}>
            Address: {selectedRestaurant.address}
          </Text>
          <Text style={styles.detailsText}>
            Cuisine: {selectedRestaurant.cuisine.join(", ")}
          </Text>
          <Text style={styles.detailsText}>{selectedRestaurant.about}</Text>
          <Text style={styles.detailsText}>
            Opening Hours: {selectedRestaurant.openingTime} -{" "}
            {selectedRestaurant.closingTime}
          </Text>
        </ScrollView>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedRestaurant(null)}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Restaurants</Text>
        {role === "super-admin" && (
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="white" />
            <Text style={styles.buttonText}>Add Restaurant</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Restaurant Cards */}
      <ScrollView contentContainerStyle={styles.restaurantList}>
        {restaurants.map((restaurant) => (
          <TouchableOpacity
            key={restaurant._id}
            style={styles.restaurantCard}
            onPress={() => handleRestaurantSelect(restaurant)}
          >
            <Image
              source={{ uri: restaurant.image }}
              style={styles.restaurantImage}
            />
            <View style={styles.restaurantInfo}>
              <Text style={styles.restaurantName}>
                {restaurant.restuarentName}
              </Text>
              <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
              <Text style={styles.restaurantCuisine}>
                {restaurant.cuisine.join(", ")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fullScreenImage: {
    width: "100%",
    height: 250,
  },
  detailsContainer: {
    padding: 15,
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 5,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 15,
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 25,
  },
});

export default AdminRestaurantsScreen;
