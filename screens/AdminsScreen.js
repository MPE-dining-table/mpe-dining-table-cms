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

// Function to generate a random password
const generatePassword = () => {
  const length = 8; // Password length
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

const AdminsScreen = () => {
  // State to manage admins and modal visibility
  const [admins, setAdmins] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    id: '',
    restaurantName: '',
    fullName: '',
    email: '',
    role: '',
    password: '' // Auto-generated password
  });

  // Function to add a new admin
  const addAdmin = () => {
    if (!newAdmin.restaurantName || !newAdmin.fullName || !newAdmin.email || !newAdmin.role) {
      alert('Please fill in all fields');
      return;
    }

    // Generate a random password
    const generatedPassword = generatePassword();

    const adminToAdd = {
      ...newAdmin,
      id: (admins.length + 1).toString(),
      password: generatedPassword // Assign the generated password
    };

    setAdmins([...admins, adminToAdd]);
    setIsAddModalVisible(false);
    // Reset the new admin form
    setNewAdmin({
      id: '',
      restaurantName: '',
      fullName: '',
      email: '',
      role: '',
      password: ''
    });
  };

  // Render individual admin card
  const AdminCard = ({ item }) => (
    <View style={styles.adminCard}>
      <Text style={styles.adminCardText}>Restaurant: {item.restaurantName}</Text>
      <Text style={styles.adminCardText}>Full Name: {item.fullName}</Text>
      <Text style={styles.adminCardText}>Email: {item.email}</Text>
      <Text style={styles.adminCardText}>Role: {item.role}</Text>
      <Text style={styles.adminCardText}>Password: {item.password}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Admins</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Admin List */}
      <FlatList
        data={admins}
        renderItem={AdminCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.adminList}
      />

      {/* Add Admin Modal */}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Admin</Text>
            <ScrollView 
              contentContainerStyle={styles.scrollViewContent}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={styles.input}
                placeholder="Restaurant Name"
                placeholderTextColor="#888"
                value={newAdmin.restaurantName}
                onChangeText={(text) => setNewAdmin({...newAdmin, restaurantName: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#888"
                value={newAdmin.fullName}
                onChangeText={(text) => setNewAdmin({...newAdmin, fullName: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#888"
                value={newAdmin.email}
                onChangeText={(text) => setNewAdmin({...newAdmin, email: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Role"
                placeholderTextColor="#888"
                value={newAdmin.role}
                onChangeText={(text) => setNewAdmin({...newAdmin, role: text})}
              />

              {/* Modal Buttons */}
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity 
                  style={styles.modalButton} 
                  onPress={addAdmin}
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
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007bff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  adminList: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  adminCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adminCardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminsScreen;