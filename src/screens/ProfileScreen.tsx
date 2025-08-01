import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A5568" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Information Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>Itunuoluwa Abidoye</Text>
              <Text style={styles.userHandle}>@itunuoluwa</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Management Section */}
        <View style={styles.section}>
          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text style={styles.iconText}>👤</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>My Account</Text>
              <Text style={styles.menuSubtitle}>Make changes to your account</Text>
            </View>
            <View style={styles.menuRight}>
              <View style={styles.alertBadge}>
                <Text style={styles.alertText}>!</Text>
              </View>
              <Text style={styles.arrowIcon}>›</Text>
            </View>
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text style={styles.iconText}>👤</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Saved Beneficiary</Text>
              <Text style={styles.menuSubtitle}>Manage your saved account</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text style={styles.iconText}>🔒</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Face ID / Touch ID</Text>
              <Text style={styles.menuSubtitle}>Manage your device security</Text>
            </View>
            <View style={styles.toggleSwitch}>
              <View style={styles.toggleOff} />
            </View>
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text style={styles.iconText}>🛡️</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Two-Factor Authentication</Text>
              <Text style={styles.menuSubtitle}>Further secure your account for safety</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text style={styles.iconText}>🚪</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Log out</Text>
              <Text style={styles.menuSubtitle}>Sign out of your account</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </View>
        </View>

        {/* More Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text style={styles.iconText}>🔔</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Help & Support</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text style={styles.iconText}>❤️</Text>
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>About App</Text>
            </View>
            <Text style={styles.arrowIcon}>›</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#4A5568',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF8C42',
  },
  avatarText: {
    fontSize: 30,
  },
  userDetails: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 14,
    color: '#E2E8F0',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 18,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  iconText: {
    fontSize: 18,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  alertText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 2,
  },
  toggleOff: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default ProfileScreen; 