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
      }
    };
    fetchRole();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <Sidebar {...props} />}
          initialRouteName="Login"
          screenOptions={({ route }) => ({
            drawerStyle:
              route.name === "Login" ? { display: "none" } : undefined,
            headerLeft: route.name === "Login" ? null : undefined,
            drawerType: route.name === "Login" ? "permanent" : undefined,
            headerShown: route.name !== "Login",
            contentStyle: route.name === "Login" ? { flex: 1 } : undefined,
          })}
        >
          {/* Both super-admin and admin can see these screens */}
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />

          {/* Only super-admin can see */}
          {role === "super-admin" && (
            <>
              <Drawer.Screen name="Users" component={UsersScreen} />
              <Drawer.Screen name="Restaurants" component={RestaurantsScreen} />
              <Drawer.Screen name="Admins" component={AdminsScreen} />
            </>
          )}

          {/* Only admin can see */}
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
