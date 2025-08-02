import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF8C42', '#FFD700']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Tìm kiếm sân, người chơi, câu lạc bộ..."
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Quick Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bộ lọc nhanh</Text>
          <View style={styles.filterButtons}>
            <TouchableOpacity style={styles.filterButton}>
              <Icon name="sports-tennis" size={20} color="#FF8C42" />
              <Text style={styles.filterText}>Sân chơi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.filterButton}>
              <Icon name="people" size={20} color="#FF8C42" />
              <Text style={styles.filterText}>Người chơi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.filterButton}>
              <Icon name="emoji-events" size={20} color="#FF8C42" />
              <Text style={styles.filterText}>Câu lạc bộ</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.filterButton}>
              <Icon name="event" size={20} color="#FF8C42" />
              <Text style={styles.filterText}>Sự kiện</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nearby Courts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sân gần đây</Text>
          <View style={styles.courtList}>
            <TouchableOpacity style={styles.courtCard}>
              <View style={styles.courtImage}>
                <Icon name="sports-tennis" size={32} color="#FF8C42" />
              </View>
              <View style={styles.courtInfo}>
                <Text style={styles.courtName}>Sân Pickleball Hồ Tây</Text>
                <Text style={styles.courtDistance}>0.5 km</Text>
                <Text style={styles.courtStatus}>Còn chỗ</Text>
              </View>
              <View style={styles.courtRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.courtCard}>
              <View style={styles.courtImage}>
                <Icon name="sports-tennis" size={32} color="#FF8C42" />
              </View>
              <View style={styles.courtInfo}>
                <Text style={styles.courtName}>Sân Pickleball Cầu Giấy</Text>
                <Text style={styles.courtDistance}>1.2 km</Text>
                <Text style={styles.courtStatus}>Đầy</Text>
              </View>
              <View style={styles.courtRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.6</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.courtCard}>
              <View style={styles.courtImage}>
                <Icon name="sports-tennis" size={32} color="#FF8C42" />
              </View>
              <View style={styles.courtInfo}>
                <Text style={styles.courtName}>Sân Pickleball Đống Đa</Text>
                <Text style={styles.courtDistance}>2.1 km</Text>
                <Text style={styles.courtStatus}>Còn chỗ</Text>
              </View>
              <View style={styles.courtRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.4</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Players */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Người chơi nổi bật</Text>
          <View style={styles.playerList}>
            <TouchableOpacity style={styles.playerCard}>
              <View style={styles.playerAvatar}>
                <Icon name="person" size={24} color="#FF8C42" />
              </View>
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>Nguyễn Văn A</Text>
                <Text style={styles.playerLevel}>Trung cấp</Text>
                <Text style={styles.playerLocation}>Hà Nội</Text>
              </View>
              <View style={styles.playerStats}>
                <Text style={styles.playerElo}>ELO: 1200</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.playerCard}>
              <View style={styles.playerAvatar}>
                <Icon name="person" size={24} color="#FF8C42" />
              </View>
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>Trần Thị B</Text>
                <Text style={styles.playerLevel}>Nâng cao</Text>
                <Text style={styles.playerLocation}>Hà Nội</Text>
              </View>
              <View style={styles.playerStats}>
                <Text style={styles.playerElo}>ELO: 1500</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.playerCard}>
              <View style={styles.playerAvatar}>
                <Icon name="person" size={24} color="#FF8C42" />
              </View>
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>Lê Văn C</Text>
                <Text style={styles.playerLevel}>Người mới</Text>
                <Text style={styles.playerLocation}>Hà Nội</Text>
              </View>
              <View style={styles.playerStats}>
                <Text style={styles.playerElo}>ELO: 800</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
          <View style={styles.recentList}>
            <TouchableOpacity style={styles.recentItem}>
              <Icon name="history" size={16} color="#666" />
              <Text style={styles.recentText}>Sân Pickleball Hồ Tây</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.recentItem}>
              <Icon name="history" size={16} color="#666" />
              <Text style={styles.recentText}>Nguyễn Văn A</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.recentItem}>
              <Icon name="history" size={16} color="#666" />
              <Text style={styles.recentText}>PicklePro Hà Nội</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  scrollView: {
    flex: 1,
  },
  searchSection: {
    marginBottom: 20,
    marginHorizontal: 15,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  section: {
    marginBottom: 20,
    marginHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },
  courtList: {
    gap: 12,
  },
  courtCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  courtImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  courtInfo: {
    flex: 1,
  },
  courtName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  courtDistance: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  courtStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
    fontWeight: '500',
  },
  courtRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF8C42',
    marginLeft: 4,
  },
  playerList: {
    gap: 12,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  playerLevel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  playerLocation: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  playerStats: {
    alignItems: 'flex-end',
  },
  playerElo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF8C42',
  },
  recentList: {
    gap: 8,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  recentText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
});

export default SearchTab; 