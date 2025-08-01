 import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Tab components
import HomeTab from './tabs/HomeTab';
import ClubsTab from './tabs/ClubsTab';
import SearchTab from './tabs/SearchTab';
import ShopTab from './tabs/ShopTab';
import ChatTab from './tabs/ChatTab';

type TabType = 'home' | 'clubs' | 'search' | 'shop' | 'chat';

const MainScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'clubs':
        return <ClubsTab />;
      case 'search':
        return <SearchTab />;
      case 'shop':
        return <ShopTab />;
      case 'chat':
        return <ChatTab />;
      default:
        return <HomeTab />;
    }
  };

  const tabs = [
    { id: 'home', label: 'Trang chủ', icon: '🏠' },
    { id: 'clubs', label: 'Clubs', icon: '🏆' },
    { id: 'search', label: 'Tìm kiếm', icon: '🔍' },
    { id: 'shop', label: 'Shop', icon: '🛍️' },
    { id: 'chat', label: 'Chat', icon: '💬' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Hi Eva!</Text>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileButtonText}>View Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.iconText}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Text style={styles.iconText}>🛒</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {renderTabContent()}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab.id as TabType)}
          >
            <Text style={[
              styles.tabIcon,
              activeTab === tab.id && styles.activeTabIcon,
            ]}>
              {tab.icon}
            </Text>
            <Text style={[
              styles.tabLabel,
              activeTab === tab.id && styles.activeTabLabel,
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#6F42C1',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  profileButton: {
    borderWidth: 1,
    borderColor: '#6F42C1',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  profileButtonText: {
    color: '#495057',
    fontSize: 12,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    paddingBottom: 20,
    paddingTop: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeTabButton: {
    // Active state styling
  },
  tabIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.6,
  },
  activeTabIcon: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#6F42C1',
    fontWeight: '600',
  },
});

export default MainScreen; 