import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ClubsTab: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Pickleball Clubs</Text>
        <Text style={styles.headerSubtitle}>Join clubs and connect with players</Text>
      </View>

      {/* Featured Clubs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Clubs</Text>
        <View style={styles.clubsList}>
          <TouchableOpacity style={styles.clubCard}>
            <View style={styles.clubImage}>
              <Text style={styles.clubImageText}>🏆</Text>
            </View>
            <View style={styles.clubInfo}>
              <Text style={styles.clubName}>PicklePro Elite</Text>
              <Text style={styles.clubLocation}>Downtown • 156 members</Text>
              <Text style={styles.clubDescription}>Professional training and tournaments</Text>
              <View style={styles.clubStats}>
                <Text style={styles.clubStat}>⭐ 4.8</Text>
                <Text style={styles.clubStat}>🎾 12 courts</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clubCard}>
            <View style={styles.clubImage}>
              <Text style={styles.clubImageText}>🏆</Text>
            </View>
            <View style={styles.clubInfo}>
              <Text style={styles.clubName}>Riverside Pickleball</Text>
              <Text style={styles.clubLocation}>Riverside • 89 members</Text>
              <Text style={styles.clubDescription}>Friendly community for all levels</Text>
              <View style={styles.clubStats}>
                <Text style={styles.clubStat}>⭐ 4.6</Text>
                <Text style={styles.clubStat}>🎾 6 courts</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clubCard}>
            <View style={styles.clubImage}>
              <Text style={styles.clubImageText}>🏆</Text>
            </View>
            <View style={styles.clubInfo}>
              <Text style={styles.clubName}>Westside Warriors</Text>
              <Text style={styles.clubLocation}>Westside • 203 members</Text>
              <Text style={styles.clubDescription}>Competitive league and training</Text>
              <View style={styles.clubStats}>
                <Text style={styles.clubStat}>⭐ 4.9</Text>
                <Text style={styles.clubStat}>🎾 8 courts</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* My Clubs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Clubs</Text>
        <View style={styles.myClubsList}>
          <TouchableOpacity style={styles.myClubCard}>
            <View style={styles.myClubIcon}>
              <Text style={styles.myClubIconText}>🏆</Text>
            </View>
            <View style={styles.myClubInfo}>
              <Text style={styles.myClubName}>PicklePro Elite</Text>
              <Text style={styles.myClubRole}>Member • 2 years</Text>
              <Text style={styles.myClubActivity}>Last activity: 2 days ago</Text>
            </View>
            <View style={styles.myClubBadge}>
              <Text style={styles.myClubBadgeText}>Active</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.myClubCard}>
            <View style={styles.myClubIcon}>
              <Text style={styles.myClubIconText}>🏆</Text>
            </View>
            <View style={styles.myClubInfo}>
              <Text style={styles.myClubName}>Riverside Pickleball</Text>
              <Text style={styles.myClubRole}>Member • 6 months</Text>
              <Text style={styles.myClubActivity}>Last activity: 1 week ago</Text>
            </View>
            <View style={styles.myClubBadge}>
              <Text style={styles.myClubBadgeText}>Active</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Upcoming Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <View style={styles.eventsList}>
          <TouchableOpacity style={styles.eventCard}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>15</Text>
              <Text style={styles.eventMonth}>MAR</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Spring Championship</Text>
              <Text style={styles.eventLocation}>PicklePro Elite • Downtown</Text>
              <Text style={styles.eventTime}>9:00 AM - 5:00 PM</Text>
            </View>
            <View style={styles.eventStatus}>
              <Text style={styles.eventStatusText}>Registered</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.eventCard}>
            <View style={styles.eventDate}>
              <Text style={styles.eventDay}>22</Text>
              <Text style={styles.eventMonth}>MAR</Text>
            </View>
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>Beginner Workshop</Text>
              <Text style={styles.eventLocation}>Riverside Pickleball</Text>
              <Text style={styles.eventTime}>2:00 PM - 4:00 PM</Text>
            </View>
            <View style={styles.eventStatus}>
              <Text style={styles.eventStatusText}>Open</Text>
            </View>
          </TouchableOpacity>
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
  headerSection: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  headerSubtitle: {
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
  clubsList: {
    gap: 15,
  },
  clubCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
  },
  clubImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  clubImageText: {
    fontSize: 24,
  },
  clubInfo: {
    flex: 1,
  },
  clubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  clubLocation: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 4,
  },
  clubDescription: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  clubStats: {
    flexDirection: 'row',
    gap: 15,
  },
  clubStat: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  myClubsList: {
    gap: 12,
  },
  myClubCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
  },
  myClubIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  myClubIconText: {
    fontSize: 20,
  },
  myClubInfo: {
    flex: 1,
  },
  myClubName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 2,
  },
  myClubRole: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 2,
  },
  myClubActivity: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  myClubBadge: {
    backgroundColor: '#28A745',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  myClubBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  eventsList: {
    gap: 12,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
  },
  eventDate: {
    width: 50,
    height: 50,
    backgroundColor: '#6F42C1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  eventDay: {
    fontSize: 16,
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
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 2,
  },
  eventLocation: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  eventStatus: {
    backgroundColor: '#28A745',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  eventStatusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ClubsTab; 