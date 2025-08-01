import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ClubsTab: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Clubs</Text>
        <Text style={styles.subtitle}>Find and join pickleball clubs near you</Text>
        
        <View style={styles.clubCard}>
          <Text style={styles.clubIcon}>🏆</Text>
          <Text style={styles.clubName}>PicklePro Club</Text>
          <Text style={styles.clubLocation}>Downtown • 45 members</Text>
          <Text style={styles.clubStatus}>🟢 Active now</Text>
        </View>
        
        <View style={styles.clubCard}>
          <Text style={styles.clubIcon}>🏆</Text>
          <Text style={styles.clubName}>Riverside Pickleball</Text>
          <Text style={styles.clubLocation}>Riverside • 32 members</Text>
          <Text style={styles.clubStatus}>🟡 2 events today</Text>
        </View>
        
        <View style={styles.clubCard}>
          <Text style={styles.clubIcon}>🏆</Text>
          <Text style={styles.clubName}>Community Champions</Text>
          <Text style={styles.clubLocation}>Westside • 28 members</Text>
          <Text style={styles.clubStatus}>🟢 Active now</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  clubCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  clubIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C42',
    marginBottom: 4,
  },
  clubLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  clubStatus: {
    fontSize: 12,
    fontWeight: '500',
    color: '#008080',
  },
});

export default ClubsTab; 