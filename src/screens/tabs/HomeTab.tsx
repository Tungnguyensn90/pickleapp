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

const HomeTab: React.FC = () => {
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
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hành động nhanh</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="sports-tennis" size={32} color="#FF8C42" />
              <Text style={styles.actionTitle}>Tìm sân</Text>
              <Text style={styles.actionSubtitle}>Tìm sân chơi gần bạn</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="people" size={32} color="#FF8C42" />
              <Text style={styles.actionTitle}>Ghép đấu</Text>
              <Text style={styles.actionSubtitle}>Tìm người chơi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="emoji-events" size={32} color="#FF8C42" />
              <Text style={styles.actionTitle}>Giải đấu</Text>
              <Text style={styles.actionSubtitle}>Tham gia giải đấu</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="shopping-cart" size={32} color="#FF8C42" />
              <Text style={styles.actionTitle}>Cửa hàng</Text>
              <Text style={styles.actionSubtitle}>Mua dụng cụ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hoạt động gần đây</Text>
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Icon name="sports-tennis" size={20} color="#FF8C42" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Trận đấu với Nguyễn Văn A</Text>
                <Text style={styles.activityTime}>2 giờ trước</Text>
              </View>
              <Text style={styles.activityScore}>21-19</Text>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Icon name="emoji-events" size={20} color="#FF8C42" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Tham gia giải đấu mùa xuân</Text>
                <Text style={styles.activityTime}>1 ngày trước</Text>
              </View>
              <Text style={styles.activityScore}>Hạng 3</Text>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Icon name="people" size={20} color="#FF8C42" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Kết bạn với Trần Thị B</Text>
                <Text style={styles.activityTime}>3 ngày trước</Text>
              </View>
              <Text style={styles.activityScore}>Mới</Text>
            </View>
          </View>
        </View>

        {/* Featured Courts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sân nổi bật</Text>
          <View style={styles.courtList}>
            <TouchableOpacity style={styles.courtCard}>
              <View style={styles.courtImage}>
                <Icon name="sports-tennis" size={40} color="#FF8C42" />
              </View>
              <View style={styles.courtInfo}>
                <Text style={styles.courtName}>Sân Pickleball Hồ Tây</Text>
                <Text style={styles.courtLocation}>Hồ Tây, Hà Nội</Text>
                <Text style={styles.courtStatus}>Còn chỗ</Text>
              </View>
              <View style={styles.courtRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.courtCard}>
              <View style={styles.courtImage}>
                <Icon name="sports-tennis" size={40} color="#FF8C42" />
              </View>
              <View style={styles.courtInfo}>
                <Text style={styles.courtName}>Sân Pickleball Cầu Giấy</Text>
                <Text style={styles.courtLocation}>Cầu Giấy, Hà Nội</Text>
                <Text style={styles.courtStatus}>Đầy</Text>
              </View>
              <View style={styles.courtRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.6</Text>
              </View>
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
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  activityScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF8C42',
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
  courtLocation: {
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
});

export default HomeTab; 