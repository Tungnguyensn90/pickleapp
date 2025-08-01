import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const HomeTab: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome to PickleMatch!</Text>
        <Text style={styles.welcomeSubtitle}>Find courts, players & clubs near you</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>🏟️</Text>
            <Text style={styles.actionTitle}>Find Courts</Text>
            <Text style={styles.actionSubtitle}>Discover nearby courts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>👥</Text>
            <Text style={styles.actionTitle}>Find Players</Text>
            <Text style={styles.actionSubtitle}>Connect with players</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>🏆</Text>
            <Text style={styles.actionTitle}>Join Clubs</Text>
            <Text style={styles.actionSubtitle}>Be part of community</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>🎾</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Game scheduled</Text>
              <Text style={styles.activitySubtitle}>Tomorrow at Central Court</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>👥</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New club member</Text>
              <Text style={styles.activitySubtitle}>John joined PicklePro Club</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>🏆</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Tournament announced</Text>
              <Text style={styles.activitySubtitle}>Spring Championship 2024</Text>
              <Text style={styles.activityTime}>3 days ago</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Featured Courts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Courts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.courtCard}>
            <View style={styles.courtImage}>
              <Text style={styles.courtImageText}>🏟️</Text>
            </View>
            <Text style={styles.courtName}>Central Park Courts</Text>
            <Text style={styles.courtLocation}>Downtown • 2.3 km away</Text>
            <Text style={styles.courtStatus}>🟢 Available now</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.courtCard}>
            <View style={styles.courtImage}>
              <Text style={styles.courtImageText}>🏟️</Text>
            </View>
            <Text style={styles.courtName}>Riverside Complex</Text>
            <Text style={styles.courtLocation}>Riverside • 5.1 km away</Text>
            <Text style={styles.courtStatus}>🟡 2 players waiting</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.courtCard}>
            <View style={styles.courtImage}>
              <Text style={styles.courtImageText}>🏟️</Text>
            </View>
            <Text style={styles.courtName}>Community Center</Text>
            <Text style={styles.courtLocation}>Westside • 1.8 km away</Text>
            <Text style={styles.courtStatus}>🟢 Available now</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6C757D',
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'center',
  },
  activityList: {
    gap: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIconText: {
    fontSize: 18,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 2,
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  courtCard: {
    width: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  courtImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  courtImageText: {
    fontSize: 40,
  },
  courtName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  courtLocation: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  courtStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default HomeTab; 