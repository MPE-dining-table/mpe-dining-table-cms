import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

// Import Screens
import Sidebar from './components/Sidebar';
import DashboardScreen from './screens/DashboardScreen';
import UsersScreen from './screens/UsersScreen';
import BookingsScreen from './screens/BookingsScreen';
import RestaurantsScreen from './screens/RestaurantScreen';
import AdminsScreen from './screens/AdminsScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <Sidebar {...props} />}
          initialRouteName="Login"
          screenOptions={({ route }) => ({
            // Hide the drawer on the Login screen
            drawerStyle: route.name === 'Login' ? { display: 'none' } : undefined,
            // Hide the hamburger menu (headerLeft) on Login screen
            headerLeft: route.name === 'Login' ? null : undefined,
            // Hide the drawer toggle button for the Login screen
            drawerType: route.name === 'Login' ? 'permanent' : undefined,
            // Hide the header for the Login screen
            headerShown: route.name !== 'Login',
            // Make the Login screen full screen
            contentStyle: route.name === 'Login' ? { flex: 1 } : undefined,
          })}
        >
          <Drawer.Screen name="Login" component={LoginScreen} />
          {/* <Drawer.Screen name="Signup" component={SignupScreen} /> */}
          <Drawer.Screen name="Dashboard" component={DashboardScreen} />
          <Drawer.Screen name="Users" component={UsersScreen} />
          <Drawer.Screen name="Bookings" component={BookingsScreen} />
          <Drawer.Screen name="Restaurants" component={RestaurantsScreen} />
          <Drawer.Screen name="Admins" component={AdminsScreen} />
          <Drawer.Screen name="Reviews" component={ReviewsScreen} />
          <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}