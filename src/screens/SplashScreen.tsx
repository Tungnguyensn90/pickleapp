import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FONTS, FONT_STYLES } from '../constants/fonts';

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;
  const chibiBounce = useRef(new Animated.Value(0)).current;
  const chibiRotate = useRef(new Animated.Value(0)).current;
  const paddleBounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      // Chibi bounce animation - longer duration
      Animated.loop(
        Animated.sequence([
          Animated.timing(chibiBounce, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(chibiBounce, {
            toValue: 0,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Paddle bounce animation - longer duration
      Animated.loop(
        Animated.sequence([
          Animated.timing(paddleBounce, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(paddleBounce, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Chibi rotation - longer duration
      Animated.loop(
        Animated.timing(chibiRotate, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        })
      ).start();

      // Main sequence with longer delays
      Animated.sequence([
        // Initial delay
        Animated.delay(500),
        
        // Logo animation - longer duration
        Animated.parallel([
          Animated.timing(logoScale, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
        
        // Delay before text animation
        Animated.delay(800),
        
        // Text animation - longer duration
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        
        // Delay before loading animation
        Animated.delay(600),
        
        // Loading animation - longer duration
        Animated.timing(loadingOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        
        // Final delay to keep splash screen longer
        Animated.delay(2000),
      ]).start();
    };

    animate();
  }, []);

  const chibiTranslateY = chibiBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const chibiRotation = chibiRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const paddleTranslateY = paddleBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -8],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      <View style={styles.content}>
        {/* Chibi Character */}
        <Animated.View
          style={[
            styles.chibiContainer,
            {
              opacity: logoOpacity,
              transform: [
                { translateY: chibiTranslateY },
                { rotate: chibiRotation },
              ],
            },
          ]}
        >
          <Text style={styles.chibiText}>👾</Text>
        </Animated.View>

        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <View style={styles.logoBackground}>
            <Animated.View
              style={{
                transform: [{ translateY: paddleTranslateY }],
              }}
            >
              <Text style={styles.logoText}>🏓</Text>
            </Animated.View>
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
          <Text style={styles.appName}>PickleMatch</Text>
          <Text style={styles.tagline}>Find Courts, Players & Clubs</Text>
        </Animated.View>

        {/* Loading Indicator */}
        <Animated.View style={[styles.loadingContainer, { opacity: loadingOpacity }]}>
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </Animated.View>

        {/* Floating Elements */}
        <Animated.View style={[styles.floatingElement, styles.floating1, { opacity: logoOpacity }]}>
          <Text style={styles.floatingText}>🎾</Text>
        </Animated.View>
        <Animated.View style={[styles.floatingElement, styles.floating2, { opacity: logoOpacity }]}>
          <Icon name="emoji-events" size={60} color="#FFD700" style={styles.floatingText} />
        </Animated.View>
        <Animated.View style={[styles.floatingElement, styles.floating3, { opacity: logoOpacity }]}>
          <Text style={styles.floatingText}>🤝</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  chibiContainer: {
    position: 'absolute',
    top: 100,
    right: 40,
    zIndex: 2,
  },
  chibiText: {
    fontSize: 50,
    fontFamily: FONTS.CHIBI_PRIMARY,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 60,
    fontFamily: FONTS.CHIBI_PRIMARY,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  appName: {
    ...FONT_STYLES.CHIBI_TITLE,
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    ...FONT_STYLES.CHIBI_SUBTITLE,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 100,
  },
  loadingDots: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
  },
  dot1: {
    opacity: 0.6,
  },
  dot2: {
    opacity: 0.8,
  },
  dot3: {
    opacity: 1,
  },
  floatingElement: {
    position: 'absolute',
    zIndex: 1,
  },
  floating1: {
    top: 150,
    left: 30,
  },
  floating2: {
    top: 200,
    right: 30,
  },
  floating3: {
    bottom: 200,
    left: 50,
  },
  floatingText: {
    fontSize: 24,
    opacity: 0.7,
    fontFamily: FONTS.CHIBI_PRIMARY,
  },
});

export default SplashScreen; 