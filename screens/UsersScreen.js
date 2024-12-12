import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList, 
  Modal, 
  TextInput, 
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UsersScreen = () => {
  // State to manage users and modal visibility
  const [users, setUsers] = useState([
    {
      id: '1',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890'
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '+0987654321'
    }
  ]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    id: '',
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  // Function to add a new user
  const addUser = () => {
    if (!newUser.fullName || !newUser.email || !newUser.phoneNumber) {
      alert('Please fill in all fields');
      return;
    }

    const userToAdd = {
      ...newUser,
      id: (users.length + 1).toString()
    };

    setUsers([...users, userToAdd]);
    setIsAddModalVisible(false);
    // Reset the new user form
    setNewUser({
      id: '',
      fullName: '',
      email: '',
      phoneNumber: ''
    });
  };

  // Render individual user card
  const UserCard = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.userCardText}>ID: {item.id}</Text>
      <Text style={styles.userCardText}>Full Name: {item.fullName}</Text>
      <Text style={styles.userCardText}>Email: {item.email}</Text>
      <Text style={styles.userCardText}>Phone Number: {item.phoneNumber}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* User List */}
      <FlatList
        data={users}
        renderItem={UserCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.userList}
      />

      {/* Add User Modal */}
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
                onChangeText={(text) => setNewUser({...newUser, fullName: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#888"
                value={newUser.email}
                onChangeText={(text) => setNewUser({...newUser, email: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#888"
                value={newUser.phoneNumber}
                onChangeText={(text) => setNewUser({...newUser, phoneNumber: text})}
              />

              {/* Modal Buttons */}
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                  style={styles.modalButton} 
                  onPress={addUser}
                >
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
  userList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  userCard: {
    backgroundColor: '#ffffff', // White background
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Light gray border
  },
  userCardText: {
    fontSize: 18,
    color: '#555', // Slightly lighter text
    marginBottom: 10,
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

export default UsersScreen;