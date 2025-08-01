import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchTab: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>Find courts, players, and clubs</Text>
        
        <View style={styles.searchCard}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchTitle}>Search Courts</Text>
          <Text style={styles.searchDescription}>Find available courts near you</Text>
        </View>
        
        <View style={styles.searchCard}>
          <Text style={styles.searchIcon}>👥</Text>
          <Text style={styles.searchTitle}>Find Players</Text>
          <Text style={styles.searchDescription}>Connect with other players</Text>
        </View>
        
        <View style={styles.searchCard}>
          <Text style={styles.searchIcon}>🏆</Text>
          <Text style={styles.searchTitle}>Discover Clubs</Text>
          <Text style={styles.searchDescription}>Join local pickleball clubs</Text>
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
  searchCard: {
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
  searchIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C42',
    marginBottom: 4,
  },
  searchDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default SearchTab; 