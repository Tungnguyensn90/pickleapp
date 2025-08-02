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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const ChatTab: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF8C42', '#FFD700']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <ScrollView
        style={[styles.scrollView, { paddingTop: insets.top }]}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Recent Chats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trò chuyện gần đây</Text>
          <View style={styles.chatList}>
            <TouchableOpacity style={styles.chatCard}>
              <View style={styles.chatAvatar}>
                <Icon name="person" size={24} color="#FF8C42" />
              </View>
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>Nguyễn Văn A</Text>
                <Text style={styles.chatLastMessage}>Bạn có muốn chơi tối nay không?</Text>
                <Text style={styles.chatTime}>2 giờ trước</Text>
              </View>
              <View style={styles.chatBadge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.chatCard}>
              <View style={styles.chatAvatar}>
                <Icon name="person" size={24} color="#FF8C42" />
              </View>
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>Trần Thị B</Text>
                <Text style={styles.chatLastMessage}>Cảm ơn bạn đã chơi cùng!</Text>
                <Text style={styles.chatTime}>1 ngày trước</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.chatCard}>
              <View style={styles.chatAvatar}>
                <Icon name="group" size={24} color="#FF8C42" />
              </View>
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>PicklePro Hà Nội</Text>
                <Text style={styles.chatLastMessage}>Thông báo: Giải đấu tuần tới</Text>
                <Text style={styles.chatTime}>3 ngày trước</Text>
              </View>
              <View style={styles.chatBadge}>
                <Text style={styles.badgeText}>5</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Online Players */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Người chơi trực tuyến</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.onlineList}>
              <TouchableOpacity style={styles.onlinePlayer}>
                <View style={styles.onlineAvatar}>
                  <Icon name="person" size={20} color="#FF8C42" />
                  <View style={styles.onlineIndicator} />
                </View>
                <Text style={styles.onlineName}>Nguyễn Văn A</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.onlinePlayer}>
                <View style={styles.onlineAvatar}>
                  <Icon name="person" size={20} color="#FF8C42" />
                  <View style={styles.onlineIndicator} />
                </View>
                <Text style={styles.onlineName}>Trần Thị B</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.onlinePlayer}>
                <View style={styles.onlineAvatar}>
                  <Icon name="person" size={20} color="#FF8C42" />
                  <View style={styles.onlineIndicator} />
                </View>
                <Text style={styles.onlineName}>Lê Văn C</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.onlinePlayer}>
                <View style={styles.onlineAvatar}>
                  <Icon name="person" size={20} color="#FF8C42" />
                  <View style={styles.onlineIndicator} />
                </View>
                <Text style={styles.onlineName}>Phạm Thị D</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hành động nhanh</Text>
          <View style={styles.actionList}>
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="group" size={32} color="#FF8C42" />
              <Text style={styles.actionTitle}>Tạo nhóm</Text>
              <Text style={styles.actionSubtitle}>Tạo nhóm chat mới</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="person-add" size={32} color="#FF8C42" />
              <Text style={styles.actionTitle}>Thêm bạn</Text>
              <Text style={styles.actionSubtitle}>Kết bạn với người chơi</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="event" size={32} color="#FF8C42" />
              <Text style={styles.actionTitle}>Sự kiện</Text>
              <Text style={styles.actionSubtitle}>Xem sự kiện sắp tới</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <Icon name="emoji-events" size={32} color="#FF8C42" />
              <Text style={styles.actionTitle}>Giải đấu</Text>
              <Text style={styles.actionSubtitle}>Tham gia giải đấu</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông báo</Text>
          <View style={styles.notificationList}>
            <TouchableOpacity style={styles.notificationCard}>
              <View style={styles.notificationIcon}>
                <Icon name="emoji-events" size={20} color="#FF8C42" />
              </View>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationTitle}>Giải đấu mùa xuân 2024</Text>
                <Text style={styles.notificationMessage}>Đăng ký mở từ hôm nay</Text>
                <Text style={styles.notificationTime}>1 giờ trước</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.notificationCard}>
              <View style={styles.notificationIcon}>
                <Icon name="group" size={20} color="#FF8C42" />
              </View>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationTitle}>PicklePro Hà Nội</Text>
                <Text style={styles.notificationMessage}>Chào mừng bạn đến với câu lạc bộ!</Text>
                <Text style={styles.notificationTime}>2 giờ trước</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.notificationCard}>
              <View style={styles.notificationIcon}>
                <Icon name="person" size={20} color="#FF8C42" />
              </View>
              <View style={styles.notificationInfo}>
                <Text style={styles.notificationTitle}>Nguyễn Văn A</Text>
                <Text style={styles.notificationMessage}>Đã chấp nhận lời mời kết bạn</Text>
                <Text style={styles.notificationTime}>1 ngày trước</Text>
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
  chatList: {
    gap: 12,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  chatAvatar: {
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
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chatLastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  chatBadge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  onlineList: {
    flexDirection: 'row',
    gap: 15,
  },
  onlinePlayer: {
    alignItems: 'center',
    width: 80,
  },
  onlineAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  onlineName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  actionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  actionTitle: {
    fontSize: 14,
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
  notificationList: {
    gap: 12,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  notificationIcon: {
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
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
});

export default ChatTab; 