import { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import Screens
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
          if (parsedData?.user?.role) {
            setRole(parsedData.user.role);
          } else {
            console.warn("Invalid data structure in AsyncStorage");
          }
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
    // Add a loading indicator here if necessary
    return null; // Or replace with a loading spinner
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
          {/* Common Screens for All Roles */}
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />

          {/* Role-Specific Screens */}
          {role === "super-admin" && (
            <>
              <Drawer.Screen name="Restaurants" component={RestaurantsScreen} />
              <Drawer.Screen name="Users" component={UsersScreen} />
              <Drawer.Screen name="Admins" component={AdminsScreen} />
            </>
          )}

          {role === "admin" && (
            <>
              <Drawer.Screen name="Bookings" component={BookingsScreen} />
              <Drawer.Screen name="Reviews" component={ReviewsScreen} />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
