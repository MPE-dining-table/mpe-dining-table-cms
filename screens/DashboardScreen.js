import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart, ProgressChart } from 'react-native-chart-kit';

const DashboardScreen = () => {
  // Simulating user role (replace with real logic for checking the role)
  const isSuperAdmin = true; // Change this to dynamically check user roles

  // Users data
  const totalUsers = 500;
  const activeUsers = 375;
  const inactiveUsers = 125;

  // Bookings data
  const totalBookings = 45;
  const paidBookings = 30;
  const pendingBookings = 15;

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Users Container */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Users Overview</Text>

        {/* Users Stats */}
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

        {/* Users Progress Chart */}
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
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Blue for users
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            hideLegend={false}
          />
        </View>

        {/* Users Bar Chart */}
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
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`, // Blue color
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 12,
                fontWeight: 'bold',
              },
            }}
            fromZero
          />
        </View>
      </View>

      {/* Bookings Container */}
      {!isSuperAdmin && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bookings Overview</Text>

          {/* Bookings Stats */}
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

          {/* Bookings Progress Chart */}
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
                color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green for bookings
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              hideLegend={false}
            />
          </View>

          {/* Bookings Bar Chart */}
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
                color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`, // Green color
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForLabels: {
                  fontSize: 12,
                  fontWeight: 'bold',
                },
              }}
              fromZero
            />
          </View>
        </View>
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
    backgroundColor: '#e3f2fd', // Light blue
  },
  inactiveBox: {
    backgroundColor: '#ffebee', // Light red
  },
  paidBox: {
    backgroundColor: '#e8f5e9', // Light green
  },
  pendingBox: {
    backgroundColor: '#fff3e0', // Light orange
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