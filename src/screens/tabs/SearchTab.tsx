import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const SearchTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <Text style={styles.searchTitle}>Tìm kiếm</Text>
        <Text style={styles.searchSubtitle}>Find courts, players, and clubs</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for courts, players, clubs..."
            placeholderTextColor="#ADB5BD"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Quick Filters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Filters</Text>
        <View style={styles.filtersContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>🏟️</Text>
            <Text style={styles.filterText}>Courts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>👥</Text>
            <Text style={styles.filterText}>Players</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>🏆</Text>
            <Text style={styles.filterText}>Clubs</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterIcon}>🎾</Text>
            <Text style={styles.filterText}>Events</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Popular Searches */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Searches</Text>
        <View style={styles.popularSearches}>
          <TouchableOpacity style={styles.searchTag}>
            <Text style={styles.searchTagText}>Indoor courts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchTag}>
            <Text style={styles.searchTagText}>Beginner friendly</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchTag}>
            <Text style={styles.searchTagText}>Tournaments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchTag}>
            <Text style={styles.searchTagText}>Free courts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchTag}>
            <Text style={styles.searchTagText}>Professional training</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchTag}>
            <Text style={styles.searchTagText}>Weekend games</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Searches */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Searches</Text>
        <View style={styles.recentSearches}>
          <TouchableOpacity style={styles.recentSearchItem}>
            <Text style={styles.recentSearchIcon}>🔍</Text>
            <Text style={styles.recentSearchText}>Central Park Courts</Text>
            <Text style={styles.recentSearchTime}>2 hours ago</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.recentSearchItem}>
            <Text style={styles.recentSearchIcon}>🔍</Text>
            <Text style={styles.recentSearchText}>PicklePro Elite Club</Text>
            <Text style={styles.recentSearchTime}>1 day ago</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.recentSearchItem}>
            <Text style={styles.recentSearchIcon}>🔍</Text>
            <Text style={styles.recentSearchText}>John Smith (Player)</Text>
            <Text style={styles.recentSearchTime}>3 days ago</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Results (if query exists) */}
      {searchQuery.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Results</Text>
          <View style={styles.searchResults}>
            <TouchableOpacity style={styles.resultItem}>
              <View style={styles.resultIcon}>
                <Text style={styles.resultIconText}>🏟️</Text>
              </View>
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle}>Central Park Courts</Text>
                <Text style={styles.resultSubtitle}>Downtown • 2.3 km away</Text>
                <Text style={styles.resultStatus}>🟢 Available now</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.resultItem}>
              <View style={styles.resultIcon}>
                <Text style={styles.resultIconText}>🏆</Text>
              </View>
              <View style={styles.resultInfo}>
                <Text style={styles.resultTitle}>Central Pickleball Club</Text>
                <Text style={styles.resultSubtitle}>Downtown • 156 members</Text>
                <Text style={styles.resultStatus}>⭐ 4.8 rating</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  searchHeader: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  searchTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  searchSubtitle: {
    fontSize: 16,
    color: '#6C757D',
  },
  searchSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#495057',
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
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  filterIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  popularSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  searchTag: {
    backgroundColor: '#E9ECEF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchTagText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  recentSearches: {
    gap: 12,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  recentSearchIcon: {
    fontSize: 16,
    marginRight: 12,
    opacity: 0.6,
  },
  recentSearchText: {
    flex: 1,
    fontSize: 16,
    color: '#495057',
  },
  recentSearchTime: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  searchResults: {
    gap: 12,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
  },
  resultIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  resultIconText: {
    fontSize: 20,
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 4,
  },
  resultStatus: {
    fontSize: 12,
    color: '#28A745',
    fontWeight: '500',
  },
});

export default SearchTab; 