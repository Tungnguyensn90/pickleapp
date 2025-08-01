/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import MainScreen from './src/screens/MainScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'signin' | 'signup' | 'main'>('signin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate splash screen delay - increased to match longer animations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000); // Increased from 3000ms to 7000ms

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setHasSeenOnboarding(true);
  };

  const handleNavigateToSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleNavigateToSignIn = () => {
    setCurrentScreen('signin');
  };

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    setCurrentScreen('main');
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
          <MainScreen />
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
