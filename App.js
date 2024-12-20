import { useEffect, useState } from "react";
import { Text, ActivityIndicator, View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Sidebar from "./components/Sidebar";
import DashboardScreen from "./screens/DashboardScreen";
import UsersScreen from "./screens/UsersScreen";
import BookingsScreen from "./screens/BookingsScreen";
import RestaurantsScreen from "./screens/RestaurantScreen";
import AdminsScreen from "./screens/AdminsScreen";
import ReviewsScreen from "./screens/ReviewsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";



const Drawer = createDrawerNavigator();

export default function App() {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const storedData = await AsyncStorage.getItem("admin");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setRole(parsedData?.user?.role || null);
        }
      } catch (error) {
        console.error("Error fetching role from AsyncStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRole();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <Sidebar {...props} />}
          initialRouteName="Login"
          screenOptions={({ route }) => ({
            drawerStyle: route.name === "Login" ? { display: "none" } : undefined,
            headerShown: route.name !== "Login",
          })}
        >
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
          <Drawer.Screen name="Reviews" component={ReviewsScreen} />
          {role === "super-admin" && (
            <>
              <Drawer.Screen name="Restaurants" component={RestaurantsScreen} />
              <Drawer.Screen name="Users" component={UsersScreen} />
              <Drawer.Screen name="Admins" component={AdminsScreen} />
            </>
          )}
          {role === "admin" && (
            <>
              <Drawer.Screen name="Users" component={UsersScreen} />
              <Drawer.Screen name="Bookings" component={BookingsScreen} />
              <Drawer.Screen name="Restaurants" component={RestaurantsScreen} />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
