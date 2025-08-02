import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ClubsTab: React.FC = () => {
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
        {/* My Clubs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Câu lạc bộ của tôi</Text>
          <View style={styles.clubList}>
            <TouchableOpacity style={styles.clubCard}>
              <View style={styles.clubImage}>
                <Icon name="emoji-events" size={32} color="#FF8C42" />
              </View>
              <View style={styles.clubInfo}>
                <Text style={styles.clubName}>PicklePro Hà Nội</Text>
                <Text style={styles.clubMembers}>128 thành viên</Text>
                <Text style={styles.clubStatus}>Đang hoạt động</Text>
              </View>
              <View style={styles.clubRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.clubCard}>
              <View style={styles.clubImage}>
                <Icon name="emoji-events" size={32} color="#FF8C42" />
              </View>
              <View style={styles.clubInfo}>
                <Text style={styles.clubName}>Pickleball Việt Nam</Text>
                <Text style={styles.clubMembers}>256 thành viên</Text>
                <Text style={styles.clubStatus}>Đang hoạt động</Text>
              </View>
              <View style={styles.clubRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.7</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recommended Clubs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Câu lạc bộ đề xuất</Text>
          <View style={styles.clubList}>
            <TouchableOpacity style={styles.clubCard}>
              <View style={styles.clubImage}>
                <Icon name="emoji-events" size={32} color="#FF8C42" />
              </View>
              <View style={styles.clubInfo}>
                <Text style={styles.clubName}>Pickleball Cầu Giấy</Text>
                <Text style={styles.clubMembers}>64 thành viên</Text>
                <Text style={styles.clubStatus}>Mới</Text>
              </View>
              <View style={styles.clubRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.5</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.clubCard}>
              <View style={styles.clubImage}>
                <Icon name="emoji-events" size={32} color="#FF8C42" />
              </View>
              <View style={styles.clubInfo}>
                <Text style={styles.clubName}>Pickleball Hồ Tây</Text>
                <Text style={styles.clubMembers}>96 thành viên</Text>
                <Text style={styles.clubStatus}>Phổ biến</Text>
              </View>
              <View style={styles.clubRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.clubCard}>
              <View style={styles.clubImage}>
                <Icon name="emoji-events" size={32} color="#FF8C42" />
              </View>
              <View style={styles.clubInfo}>
                <Text style={styles.clubName}>Pickleball Đống Đa</Text>
                <Text style={styles.clubMembers}>72 thành viên</Text>
                <Text style={styles.clubStatus}>Đang phát triển</Text>
              </View>
              <View style={styles.clubRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sự kiện sắp tới</Text>
          <View style={styles.eventList}>
            <TouchableOpacity style={styles.eventCard}>
              <View style={styles.eventDate}>
                <Text style={styles.eventDay}>15</Text>
                <Text style={styles.eventMonth}>Th3</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>Giải đấu mùa xuân 2024</Text>
                <Text style={styles.eventLocation}>Sân Pickleball Hồ Tây</Text>
                <Text style={styles.eventTime}>09:00 - 17:00</Text>
              </View>
              <View style={styles.eventStatus}>
                <Text style={styles.statusText}>Đăng ký</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.eventCard}>
              <View style={styles.eventDate}>
                <Text style={styles.eventDay}>22</Text>
                <Text style={styles.eventMonth}>Th3</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>Hội thảo kỹ thuật</Text>
                <Text style={styles.eventLocation}>Trung tâm thể thao</Text>
                <Text style={styles.eventTime}>14:00 - 16:00</Text>
              </View>
              <View style={styles.eventStatus}>
                <Text style={styles.statusText}>Miễn phí</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Create Club Button */}
        <TouchableOpacity style={styles.createClubButton}>
          <Icon name="add" size={24} color="#FFFFFF" />
          <Text style={styles.createClubText}>Tạo câu lạc bộ mới</Text>
        </TouchableOpacity>
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
  clubList: {
    gap: 12,
  },
  clubCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  clubImage: {
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
  clubInfo: {
    flex: 1,
  },
  clubName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  clubMembers: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  clubStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
    fontWeight: '500',
  },
  clubRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF8C42',
    marginLeft: 4,
  },
  eventList: {
    gap: 12,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  eventDate: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#FF8C42',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eventMonth: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  eventLocation: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  eventTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  eventStatus: {
    backgroundColor: '#FF8C42',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  createClubButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C42',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  createClubText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default ClubsTab; 