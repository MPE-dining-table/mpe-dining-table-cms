import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { BarChart, ProgressChart } from 'react-native-chart-kit';
import AsyncStorage from "@react-native-async-storage/async-storage";

const DashboardScreen = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Users data
  const totalUsers = 500;
  const activeUsers = 375;
  const inactiveUsers = 125;

  // Bookings data
  const totalBookings = 45;
  const paidBookings = 30;
  const pendingBookings = 15;

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

  // Users progress chart data
  const usersProgressChartData = {
    labels: ['Active', 'Inactive'],
    data: [activeUsers / totalUsers, inactiveUsers / totalUsers],
  };

  // Bookings progress chart data
  const bookingsProgressChartData = {
    labels: ['Paid', 'Pending'],
    data: [paidBookings / totalBookings, pendingBookings / totalBookings],
  };

  // Users bar chart data
  const usersBarChartData = {
    labels: ['Active', 'Inactive', 'Total Users'],
    datasets: [{ data: [activeUsers, inactiveUsers, totalUsers] }],
  };

  // Bookings bar chart data
  const bookingsBarChartData = {
    labels: ['Paid', 'Pending', 'Total Bookings'],
    datasets: [{ data: [paidBookings, pendingBookings, totalBookings] }],
  };

  const UsersOverviewSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Users Overview</Text>

      <View style={styles.statsContainer}>
        <View style={[styles.statsBox, styles.activeBox]}>
          <Text style={styles.statsText}>Active Users</Text>
          <Text style={styles.statsValue}>{activeUsers}</Text>
        </View>
        <View style={[styles.statsBox, styles.inactiveBox]}>
          <Text style={styles.statsText}>Inactive Users</Text>
          <Text style={styles.statsValue}>{inactiveUsers}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>User Status Distribution</Text>
        <ProgressChart
          data={usersProgressChartData}
          width={300}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          hideLegend={false}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>User Breakdown</Text>
        <BarChart
          data={usersBarChartData}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForLabels: { fontSize: 12, fontWeight: 'bold' },
          }}
          fromZero
        />
      </View>
    </View>
  );

  const BookingsOverviewSection = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Bookings Overview</Text>

      <View style={styles.statsContainer}>
        <View style={[styles.statsBox, styles.paidBox]}>
          <Text style={styles.statsText}>Paid Bookings</Text>
          <Text style={styles.statsValue}>{paidBookings}</Text>
        </View>
        <View style={[styles.statsBox, styles.pendingBox]}>
          <Text style={styles.statsText}>Pending Bookings</Text>
          <Text style={styles.statsValue}>{pendingBookings}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Booking Status Distribution</Text>
        <ProgressChart
          data={bookingsProgressChartData}
          width={300}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          hideLegend={false}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Booking Breakdown</Text>
        <BarChart
          data={bookingsBarChartData}
          width={300}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForLabels: { fontSize: 12, fontWeight: 'bold' },
          }}
          fromZero
        />
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {role === 'super-admin' ? (
        <UsersOverviewSection />
      ) : role === 'admin' ? (
        <>
          <UsersOverviewSection />
          <BookingsOverviewSection />
        </>
      ) : (
        <Text style={styles.errorText}>Invalid role or no access</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statsBox: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeBox: {
    backgroundColor: '#e3f2fd',
  },
  inactiveBox: {
    backgroundColor: '#ffebee',
  },
  paidBox: {
    backgroundColor: '#e8f5e9',
  },
  pendingBox: {
    backgroundColor: '#fff3e0',
  },
  statsText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
  },
  statsValue: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 10,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
});

export default DashboardScreen;