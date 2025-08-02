import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens
import HomeTab from '../screens/tabs/HomeTab';
import ClubsTab from '../screens/tabs/ClubsTab';
import SearchTab from '../screens/tabs/SearchTab';
import ShopTab from '../screens/tabs/ShopTab';
import ChatTab from '../screens/tabs/ChatTab';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface TabNavigatorProps {
  onLogout?: () => void;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ onLogout }) => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E9ECEF',
        paddingBottom: 20,
        paddingTop: 10,
        height: 80,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      },
      tabBarActiveTintColor: '#FF8C42',
      tabBarInactiveTintColor: '#999',
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '500',
        marginTop: 4,
      },
      tabBarIconStyle: {
        marginBottom: 4,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeTab}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Clubs"
      component={ClubsTab}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="emoji-events" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchTab}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="search" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Shop"
      component={ShopTab}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="shopping-cart" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Chat"
      component={ChatTab}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="chat" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

interface RootNavigatorProps {
  onLogout?: () => void;
}

const RootNavigator: React.FC<RootNavigatorProps> = ({ onLogout }) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen name="Profile" component={ProfileScreen} initialParams={{ onLogout }} />
  </Stack.Navigator>
);

export default RootNavigator;
