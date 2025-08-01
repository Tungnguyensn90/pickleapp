import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChatTab: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Chat</Text>
        <Text style={styles.subtitle}>Connect with other players</Text>
        
        <View style={styles.chatCard}>
          <Text style={styles.chatIcon}>👤</Text>
          <Text style={styles.chatName}>John Smith</Text>
          <Text style={styles.chatMessage}>Hey! Are you free for a game tomorrow?</Text>
          <Text style={styles.chatTime}>2 hours ago</Text>
        </View>
        
        <View style={styles.chatCard}>
          <Text style={styles.chatIcon}>👤</Text>
          <Text style={styles.chatName}>PicklePro Club</Text>
          <Text style={styles.chatMessage}>New tournament announced! Check it out.</Text>
          <Text style={styles.chatTime}>1 day ago</Text>
        </View>
        
        <View style={styles.chatCard}>
          <Text style={styles.chatIcon}>👤</Text>
          <Text style={styles.chatName}>Sarah Johnson</Text>
          <Text style={styles.chatMessage}>Great game today! Let's play again soon.</Text>
          <Text style={styles.chatTime}>3 days ago</Text>
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
  chatCard: {
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
  chatIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  chatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C42',
    marginBottom: 4,
  },
  chatMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default ChatTab; 