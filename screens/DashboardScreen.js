import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; 
import { ProgressChart } from 'react-native-chart-kit'; 

const DashboardScreen = () => {
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
    data: [
      activeUsers / totalUsers, 
      inactiveUsers / totalUsers
    ],
  };

  // Bookings progress chart data
  const bookingsProgressChartData = {
    labels: ['Paid', 'Pending'], 
    data: [
      paidBookings / totalBookings,
      pendingBookings / totalBookings
    ],
  };

  // Users bar chart data
  const usersBarChartData = {
    labels: ['Active', 'Inactive', 'Total Users'],
    datasets: [
      {
        data: [activeUsers, inactiveUsers, totalUsers],
      },
    ],
  };

  // Bookings bar chart data
  const bookingsBarChartData = {
    labels: ['Paid', 'Pending', 'Total Bookings'],
    datasets: [
      {
        data: [paidBookings, pendingBookings, totalBookings],
      },
    ],
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
        <View style={styles.progressChartContainer}>
          <Text style={styles.title}>User Status Distribution</Text>
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
          <View style={styles.legendContainer}>
            {usersProgressChartData.labels.map((label, index) => (
              <View key={label} style={styles.legendItem}>
                <View 
                  style={[
                    styles.legendColor, 
                    { 
                      backgroundColor: index === 0 ? '#2196F3' : '#FF9800'
                    }
                  ]} 
                />
                <Text style={styles.legendText}>
                  {label}: {Math.round((usersProgressChartData.data[index] || 0) * 100)}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Users Bar Chart */}
        <View style={styles.barChartContainer}>
          <Text style={styles.title}>User Breakdown</Text>
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
        <View style={styles.progressChartContainer}>
          <Text style={styles.title}>Booking Status Distribution</Text>
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
          <View style={styles.legendContainer}>
            {bookingsProgressChartData.labels.map((label, index) => (
              <View key={label} style={styles.legendItem}>
                <View 
                  style={[
                    styles.legendColor, 
                    { 
                      backgroundColor: index === 0 ? '#4CAF50' : '#FFC107'
                    }
                  ]} 
                />
                <Text style={styles.legendText}>
                  {label}: {Math.round((bookingsProgressChartData.data[index] || 0) * 100)}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bookings Bar Chart */}
        <View style={styles.barChartContainer}>
          <Text style={styles.title}>Booking Breakdown</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  sectionContainer: {
    width: '100%',
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    elevation:0,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  statsBox: {
    padding: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    backgroundColor: '#3a3f47',
    borderLeftWidth: 5,
    borderLeftColor: 'grey',
    
  },
  statsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  activeBox: {
    backgroundColor: '#2196F3', // Blue for active users
  },
  inactiveBox: {
    backgroundColor: '#FF9800', // Orange for inactive users
  },
  paidBox: {
    backgroundColor: '#4CAF50', // Green for paid bookings
  },
  pendingBox: {
    backgroundColor: '#FFC107', // Amber for pending bookings
  },
  progressChartContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingRight: '10%',
  },
  barChartContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
});

export default DashboardScreen;