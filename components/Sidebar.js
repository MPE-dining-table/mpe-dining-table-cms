import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../assets/Mpelogo.png';

const Sidebar = () => {
  const navigation = useNavigation();
  const [activeRoute, setActiveRoute] = useState('Dashboard'); // Track active route
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedData = await AsyncStorage.getItem('admin');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setRole(parsedData?.user?.role || null);
        }
      } catch (error) {
        console.error('Error fetching role from AsyncStorage:', error);
      }
    };
    fetchRole();
  }, []);

  const handleNavigation = (route) => {
    setActiveRoute(route); // Update active route
    navigation.navigate(route);
  };

  return (
    <View style={styles.container}>
      {/* App Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={logo} // Replace with your logo path
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Common Menu Items */}
      <TouchableOpacity
        style={[styles.menuItem, activeRoute === 'Dashboard' && styles.menuItemActive]}
        onPress={() => handleNavigation('Dashboard')}>
        <Text style={styles.menuText}>📊 Dashboard</Text>
      </TouchableOpacity>

      {role === 'super-admin' && (
        <>
          <TouchableOpacity
            style={[styles.menuItem, activeRoute === 'UsersScreen' && styles.menuItemActive]}
            onPress={() => handleNavigation('Users')}>
            <Text style={styles.menuText}>👥 Users</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, activeRoute === 'Restaurants' && styles.menuItemActive]}
            onPress={() => handleNavigation('Restaurants')}>
            <Text style={styles.menuText}>🍴 Restaurants</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, activeRoute === 'Admins' && styles.menuItemActive]}
            onPress={() => handleNavigation('Admins')}>
            <Text style={styles.menuText}>🛠 Admins</Text>
          </TouchableOpacity>
        </>
      )}

      {role === 'admin' && (
        <>
          <TouchableOpacity
            style={[styles.menuItem, activeRoute === 'Bookings' && styles.menuItemActive]}
            onPress={() => handleNavigation('Bookings')}>
            <Text style={styles.menuText}>📅 Bookings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, activeRoute === 'Reviews' && styles.menuItemActive]}
            onPress={() => handleNavigation('Reviews')}>
            <Text style={styles.menuText}>⭐ Reviews</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Common Menu Items */}
      <TouchableOpacity
        style={[styles.menuItem, activeRoute === 'Settings' && styles.menuItemActive]}
        onPress={() => handleNavigation('Settings')}>
        <Text style={styles.menuText}>⚙️ Settings</Text>
      </TouchableOpacity>

      <View style={styles.horizontalBar} />

      {/* Beta Version */}
      <Text style={styles.betaVersion}>Beta Version 1.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#282c34',
    borderRightWidth: 1,
    borderRightColor: '#444',
    width: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    right: '36%',
    top: 10,
  },
  logo: {
    width: 100, // Adjust based on your logo size
    height: 100,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#3a3f47',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  menuItemActive: {
    backgroundColor: '#ff6b6b',
  },
  menuText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  horizontalBar: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 15,
    width: '100%',
    top: '20%',
  },
  betaVersion: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
    top: '20%',
  },
});

export default Sidebar;
