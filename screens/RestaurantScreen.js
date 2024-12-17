import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdminRestaurantsScreen from "./AdminRestaurentScreen";
import SuperAdminViewRestaurent from "./SuperAdminViewRestaurent";

const RestaurantScreen = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedData = await AsyncStorage.getItem("admin");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setRole(parsedData.user.role);
        }
      } catch (error) {
        console.error("Error fetching role from AsyncStorage:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {role === "admin" ? (
        <AdminRestaurantsScreen />
      ) : role === "super-admin" ? (
        <SuperAdminViewRestaurent />
      ) : (
        <Text style={styles.errorText}>Invalid role or no access</Text>
      )}
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
