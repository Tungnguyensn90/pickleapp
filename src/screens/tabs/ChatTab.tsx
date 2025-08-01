import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ChatTab: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>Messages</Text>
        <Text style={styles.chatSubtitle}>Connect with players and clubs</Text>
      </View>

      {/* Recent Chats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Chats</Text>
        <View style={styles.chatsList}>
          <TouchableOpacity style={styles.chatCard}>
            <View style={styles.chatAvatar}>
              <Text style={styles.chatAvatarText}>👤</Text>
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatHeaderRow}>
                <Text style={styles.chatName}>John Smith</Text>
                <Text style={styles.chatTime}>2m ago</Text>
              </View>
              <Text style={styles.chatLastMessage}>Hey! Are you free for a game tomorrow?</Text>
              <View style={styles.chatBadge}>
                <Text style={styles.chatBadgeText}>2</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatCard}>
            <View style={styles.chatAvatar}>
              <Text style={styles.chatAvatarText}>🏆</Text>
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatHeaderRow}>
                <Text style={styles.chatName}>PicklePro Elite</Text>
                <Text style={styles.chatTime}>1h ago</Text>
              </View>
              <Text style={styles.chatLastMessage}>Tournament registration is now open!</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatCard}>
            <View style={styles.chatAvatar}>
              <Text style={styles.chatAvatarText}>👤</Text>
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatHeaderRow}>
                <Text style={styles.chatName}>Sarah Johnson</Text>
                <Text style={styles.chatTime}>3h ago</Text>
              </View>
              <Text style={styles.chatLastMessage}>Great game today! Let's play again soon.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.chatCard}>
            <View style={styles.chatAvatar}>
              <Text style={styles.chatAvatarText}>🏆</Text>
            </View>
            <View style={styles.chatInfo}>
              <View style={styles.chatHeaderRow}>
                <Text style={styles.chatName}>Riverside Pickleball</Text>
                <Text style={styles.chatTime}>1d ago</Text>
              </View>
              <Text style={styles.chatLastMessage}>New beginner workshop this weekend!</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Group Chats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Group Chats</Text>
        <View style={styles.groupsList}>
          <TouchableOpacity style={styles.groupCard}>
            <View style={styles.groupAvatar}>
              <Text style={styles.groupAvatarText}>👥</Text>
            </View>
            <View style={styles.groupInfo}>
              <View style={styles.groupHeaderRow}>
                <Text style={styles.groupName}>Downtown Players</Text>
                <Text style={styles.groupTime}>5m ago</Text>
              </View>
              <Text style={styles.groupLastMessage}>Mike: Anyone up for a game tonight?</Text>
              <View style={styles.groupBadge}>
                <Text style={styles.groupBadgeText}>5</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.groupCard}>
            <View style={styles.groupAvatar}>
              <Text style={styles.groupAvatarText}>👥</Text>
            </View>
            <View style={styles.groupInfo}>
              <View style={styles.groupHeaderRow}>
                <Text style={styles.groupName}>Tournament Team</Text>
                <Text style={styles.groupTime}>2h ago</Text>
              </View>
              <Text style={styles.groupLastMessage}>Coach: Practice schedule updated</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👤</Text>
            <Text style={styles.actionText}>New Chat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👥</Text>
            <Text style={styles.actionText}>Create Group</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📞</Text>
            <Text style={styles.actionText}>Voice Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>📹</Text>
            <Text style={styles.actionText}>Video Call</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Online Players */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Online Players</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.onlinePlayer}>
            <View style={styles.onlineAvatar}>
              <Text style={styles.onlineAvatarText}>👤</Text>
              <View style={styles.onlineIndicator} />
            </View>
            <Text style={styles.onlineName}>John</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.onlinePlayer}>
            <View style={styles.onlineAvatar}>
              <Text style={styles.onlineAvatarText}>👤</Text>
              <View style={styles.onlineIndicator} />
            </View>
            <Text style={styles.onlineName}>Sarah</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.onlinePlayer}>
            <View style={styles.onlineAvatar}>
              <Text style={styles.onlineAvatarText}>👤</Text>
              <View style={styles.onlineIndicator} />
            </View>
            <Text style={styles.onlineName}>Mike</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.onlinePlayer}>
            <View style={styles.onlineAvatar}>
              <Text style={styles.onlineAvatarText}>👤</Text>
              <View style={styles.onlineIndicator} />
            </View>
            <Text style={styles.onlineName}>Lisa</Text>
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
  chatHeader: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  chatTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  chatSubtitle: {
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
  chatsList: {
    gap: 12,
  },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  chatAvatarText: {
    fontSize: 20,
  },
  chatInfo: {
    flex: 1,
  },
  chatHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
  chatTime: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  chatLastMessage: {
    fontSize: 14,
    color: '#6C757D',
  },
  chatBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#6F42C1',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  groupsList: {
    gap: 12,
  },
  groupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
  },
  groupAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  groupAvatarText: {
    fontSize: 20,
  },
  groupInfo: {
    flex: 1,
  },
  groupHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
  },
  groupTime: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  groupLastMessage: {
    fontSize: 14,
    color: '#6C757D',
  },
  groupBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#6F42C1',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  onlinePlayer: {
    alignItems: 'center',
    marginRight: 20,
  },
  onlineAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  onlineAvatarText: {
    fontSize: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#28A745',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  onlineName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#495057',
  },
});

export default ChatTab; 