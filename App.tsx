/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import MainScreen from './src/screens/MainScreen';
import apiService from './src/services/api';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'signin' | 'signup' | 'main'>('signin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      const token = apiService.getToken();
      if (!token) {
        console.log('No token found');
        setIsAuthenticated(false);
        setCurrentScreen('signin');
        return;
      }

      // Try to get current user data
      const response = await apiService.getCurrentUser();
      setUser(response.user);
      setIsAuthenticated(true);
      setCurrentScreen('main');
    } catch (error: any) {
      console.log('Authentication check failed:', error.message);
      // Clear any invalid token
      apiService.removeToken();
      setIsAuthenticated(false);
      setCurrentScreen('signin');
    } finally {
      // Simulate splash screen delay
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
  };

  const handleNavigateToSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleNavigateToSignIn = () => {
    setCurrentScreen('signin');
  };

  const handleAuthentication = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
    setCurrentScreen('main');
  };

  const handleLogout = async () => {
    try {
      await apiService.logout();
      setUser(null);
      setIsAuthenticated(false);
      setCurrentScreen('signin');
    } catch (error: any) {
      console.error('Logout error:', error);
      // Force logout even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      setCurrentScreen('signin');
    }
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!hasSeenOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor="transparent"
          translucent={true}
        />

        {isAuthenticated ? (
          <MainScreen user={user} onLogout={handleLogout} />
        ) : currentScreen === 'signin' ? (
          <SignInScreen onNavigateToSignUp={handleNavigateToSignUp} onAuthenticate={handleAuthentication} />
        ) : (
          <SignUpScreen onNavigateToSignIn={handleNavigateToSignIn} onAuthenticate={handleAuthentication} />
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
