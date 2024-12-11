import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

// Import Components and Screens
import Sidebar from './components/Sidebar';
import DashboardScreen from './screens/DashboardScreen';
import UsersScreen from './screens/UsersScreen';
import BookingsScreen from './screens/BookingsScreen';
import RestaurantsScreen from './screens/RestaurantScreen';
import AdminsScreen from './screens/AdminsScreen';
import ReviewsScreen from './screens/ReviewsScreen';
import SettingsScreen from './screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <Sidebar {...props} />}
          initialRouteName="Dashboard"
        >
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
