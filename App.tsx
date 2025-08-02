/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import apiService from './src/services/api';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import MainScreen from './src/screens/MainScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('signin');
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      setIsLoading(true);
      const token = apiService.getToken();
      
      if (!token) {
        setIsAuthenticated(false);
        setCurrentScreen('signin');
        setIsLoading(false);
        return;
      }

      const userData = await apiService.getCurrentUser();
      if (userData) {
        setUser(userData.user);
        setIsAuthenticated(true);
        setCurrentScreen('main');
      } else {
        setIsAuthenticated(false);
        setCurrentScreen('signin');
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
      setCurrentScreen('signin');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthentication = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentScreen('main');
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setCurrentScreen('signin');
    }
  };

  const handleProfileUpdate = (updatedUser: any) => {
    setUser(updatedUser);
  };

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
    setCurrentScreen('signin');
  };

  const handleNavigateToSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleNavigateToSignIn = () => {
    setCurrentScreen('signin');
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!hasSeenOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar 
            barStyle="light-content" 
            backgroundColor="transparent"
            translucent={true}
          />

          {isAuthenticated ? (
            <MainScreen user={user} onLogout={handleLogout} onProfileUpdate={handleProfileUpdate} />
          ) : currentScreen === 'signin' ? (
            <SignInScreen onNavigateToSignUp={handleNavigateToSignUp} onAuthenticate={handleAuthentication} />
          ) : (
            <SignUpScreen onNavigateToSignIn={handleNavigateToSignIn} onAuthenticate={handleAuthentication} />
          )}
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
