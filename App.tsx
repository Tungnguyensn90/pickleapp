/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

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

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!hasSeenOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return (
    <>
      <StatusBar 
        barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
        backgroundColor="#4A90E2"
      />
      {/* Main app content will go here */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
