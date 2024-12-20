import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    id: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "user", // Assuming role is set to 'user' by default
  });

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

  const fetchUsers = async () => {
    const token = await fetchToken();
    try {
      const response = await axios.get(
        "https://mpe-backend-server.onrender.com/api/actions/get-users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to fetch restaurants.");
    }
  };

  const handleDeleteUser = async (id) => {
    const token = await fetchToken();
    try {
      await axios.delete(
        `https://mpe-backend-server.onrender.com/api/actions/delete-user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Alert.alert("Success", "User deleted");
      fetchUsers();
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to delete the user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = () => {
    if (!newUser.fullName || !newUser.email || !newUser.phoneNumber) {
      alert("Please fill in all fields");
      return;
    }

    const userToAdd = {
      ...newUser,
      id: (users.length + 1).toString(), // Generate ID dynamically
    };

    setUsers([...users, userToAdd]);
    setIsAddModalVisible(false);
    setNewUser({
      id: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      role: "user", // Reset role to user after adding
    });
  };

  const UserCard = ({ item, handleDeleteUser }) => (
    <View>
      <TouchableOpacity
        style={styles.userCard}
        onPress={() => handleDeleteUser(item._id)}
      >
        <Text style={styles.userCardText}>Full Name: {item.firstName}</Text>
        <Text style={styles.userCardText}>Last Name: {item.lastName}</Text>
        <Text style={styles.userCardText}>Email: {item.email}</Text>
        <Text style={styles.userCardText}>Phone Number: {item.cellphone}</Text>
        <Text style={styles.userCardText}>Role: {item.role}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <UserCard item={item} handleDeleteUser={handleDeleteUser} />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.userList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No users available.</Text>
        }
      />

      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New User</Text>
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#888"
                value={newUser.fullName}
                onChangeText={(text) =>
                  setNewUser({ ...newUser, fullName: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#888"
                value={newUser.email}
                onChangeText={(text) => setNewUser({ ...newUser, email: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#888"
                value={newUser.phoneNumber}
                onChangeText={(text) =>
                  setNewUser({ ...newUser, phoneNumber: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Role (user or admin)"
                placeholderTextColor="#888"
                value={newUser.role}
                onChangeText={(text) => setNewUser({ ...newUser, role: text })}
              />

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={addUser}>
                  <Text style={styles.modalButtonText}>Add User</Text>
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
    backgroundColor: "#f0f0f0",
    padding: 15,
  },
  userList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  userCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  userCardText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    color: "#333",
    fontSize: 16,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default UsersScreen;
