import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to generate a random password
const generatePassword = () => {
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const AdminsScreen = () => {
  const [admins, setAdmins] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    restaurantName: "",
    fullName: "",
    email: "",
    role: "admin",
    password: generatePassword(),
  });

  // Fetch token from async storage
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

  // Fetch list of admins with role "admin"
  const fetchAdmins = async () => {
    try {
      const token = await fetchToken();
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      const response = await axios.get(
        "https://mpe-backend-server.onrender.com/api/actions/get-admins",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: 1, limit: 10 }, // Fetch first 10 admins
        }
      );

      setAdmins(response.data.admins);
    } catch (error) {
      console.error("Error fetching admins:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to fetch admin list.");
    }
  };

  useEffect(() => {
    fetchAdmins(); // Fetch admins when the component mounts
  }, []);

  // Function to add new admin
  const addAdminToServer = async (adminToAdd) => {
    try {
      const token = await fetchToken();
      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      const response = await axios.post(
        "https://mpe-backend-server.onrender.com/api/actions/add-new-admin",
        {
          adminName: adminToAdd.fullName,
          email: adminToAdd.email,
          restuarentName: adminToAdd.restaurantName,
          password: adminToAdd.password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert("Success", response.data.message || "Admin added successfully!");
      fetchAdmins(); // Refresh the admin list
      setIsAddModalVisible(false);
      setNewAdmin({
        restaurantName: "",
        fullName: "",
        email: "",
        role: "admin",
        password: generatePassword(),
      });
    } catch (error) {
      console.error("Error adding admin:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to add the new admin.");
    }
  };

  const AdminCard = ({ item }) => (
    <View style={styles.adminCard}>
      <Text style={styles.adminCardText}>Restaurant: {item.restuarentName}</Text>
      <Text style={styles.adminCardText}>Full Name: {item.adminName}</Text>
      <Text style={styles.adminCardText}>Email: {item.email}</Text>
      <Text style={styles.adminCardText}>Role: {item.role}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Register New Admin</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={admins}
        renderItem={AdminCard}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.adminList}
      />

      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Admin</Text>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              <TextInput
                style={styles.input}
                placeholder="Restaurant Name"
                value={newAdmin.restaurantName}
                onChangeText={(text) =>
                  setNewAdmin({ ...newAdmin, restaurantName: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={newAdmin.fullName}
                onChangeText={(text) => setNewAdmin({ ...newAdmin, fullName: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={newAdmin.email}
                onChangeText={(text) => setNewAdmin({ ...newAdmin, email: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Generated Password"
                value={newAdmin.password}
                editable={false}
              />
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => addAdminToServer(newAdmin)}
                >
                  <Text style={styles.modalButtonText}>Add Admin</Text>
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
    backgroundColor: "#f0f0f0", // Light gray background
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff", // White background
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333", // Dark gray text
    fontFamily: "Arial", // Use a modern font if available
  },
  addButton: {
    backgroundColor: "#007bff", // Blue button
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  adminList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  adminCard: {
    backgroundColor: "#ffffff", // White background
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0", // Light gray border
  },
  adminCardText: {
    fontSize: 18,
    color: "#555", // Slightly lighter text
    marginBottom: 10,
    fontFamily: "Arial", // Use a modern font if available
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "90%",
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
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333", // Dark gray text
    fontFamily: "Arial", // Use a modern font if available
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#f9f9f9", // Light gray background
    color: "#333", // Dark gray text
    fontSize: 16,
    fontFamily: "Arial", // Use a modern font if available
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: "#007bff", // Blue button
    padding: 15,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: "#6c757d", // Gray button
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Arial", // Use a modern font if available
  },
});

export default AdminsScreen;
