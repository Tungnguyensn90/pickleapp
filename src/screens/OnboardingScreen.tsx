import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import { FONTS, FONT_STYLES } from '../constants/fonts';

const { width, height } = Dimensions.get('window');

interface OnboardingPage {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  chibi: string;
}

interface OnboardingScreenProps {
  onComplete: () => void;
}

const onboardingPages: OnboardingPage[] = [
  {
    id: 1,
    title: 'Find Courts',
    subtitle: 'Discover nearby pickleball courts',
    description: 'Locate courts in your area, check availability, and get directions to your next game. Find both indoor and outdoor courts.',
    icon: '🏟️',
    color: '#4A90E2',
    chibi: '🏃‍♂️',
  },
  {
    id: 2,
    title: 'Match Players',
    subtitle: 'Connect with fellow players',
    description: 'Find players of your skill level, schedule games, and build your pickleball community. Join games or create your own.',
    icon: '🤝',
    color: '#F5A623',
    chibi: '👥',
  },
  {
    id: 3,
    title: 'Join Clubs',
    subtitle: 'Be part of the community',
    description: 'Discover local pickleball clubs, join tournaments, and participate in organized events. Stay active and competitive.',
    icon: '🏆',
    color: '#4CAF50',
    chibi: '🎉',
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const chibiBounce = useRef(new Animated.Value(0)).current;
  const iconPulse = useRef(new Animated.Value(1)).current;
  const floatingElements = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;
  const dotAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    // Chibi bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(chibiBounce, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(chibiBounce, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Icon pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconPulse, {
          toValue: 1.2,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(iconPulse, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Floating elements animation
    floatingElements.forEach((element, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(element, {
            toValue: 1,
            duration: 1500 + index * 200,
            useNativeDriver: true,
          }),
          Animated.timing(element, {
            toValue: 0,
            duration: 1500 + index * 200,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });

    // Dot animations
    dotAnimations.forEach((dot, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: 1,
            duration: 1200 + index * 300,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 1200 + index * 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  const handleNext = () => {
    if (currentPage < onboardingPages.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      scrollViewRef.current?.scrollTo({
        x: nextPage * width,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleGetStarted = () => {
    onComplete();
  };

  const chibiTranslateY = chibiBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -15],
  });

  const renderPage = (page: OnboardingPage, index: number) => (
    <View key={page.id} style={styles.page}>
      <View style={[styles.pageBackground, { backgroundColor: page.color }]}>
        <View style={styles.pageContent}>
          {/* Chibi Character */}
          <Animated.View
            style={[
              styles.chibiContainer,
              {
                transform: [{ translateY: chibiTranslateY }],
              },
            ]}
          >
            <Text style={styles.chibiText}>{page.chibi}</Text>
          </Animated.View>

          {/* Icon */}
          <Animated.View 
            style={[
              styles.iconContainer,
              {
                transform: [{ scale: iconPulse }],
              },
            ]}
          >
            <Text style={styles.iconText}>{page.icon}</Text>
          </Animated.View>

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{page.title}</Text>
            <Text style={styles.subtitle}>{page.subtitle}</Text>
            <Text style={styles.description}>{page.description}</Text>
          </View>

          {/* Floating Elements */}
          <Animated.View 
            style={[
              styles.floatingElement,
              styles.floating1,
              {
                opacity: floatingElements[0],
                transform: [{ translateY: floatingElements[0].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -20],
                })}],
              },
            ]}
          >
            <Text style={styles.floatingText}>🎾</Text>
          </Animated.View>
          <Animated.View 
            style={[
              styles.floatingElement,
              styles.floating2,
              {
                opacity: floatingElements[1],
                transform: [{ translateY: floatingElements[1].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -15],
                })}],
              },
            ]}
          >
            <Text style={styles.floatingText}>🏓</Text>
          </Animated.View>
          <Animated.View 
            style={[
              styles.floatingElement,
              styles.floating3,
              {
                opacity: floatingElements[2],
                transform: [{ translateY: floatingElements[2].interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -25],
                })}],
              },
            ]}
          >
            <Text style={styles.floatingText}>⭐</Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Pages */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentPage(pageIndex);
        }}
      >
        {onboardingPages.map((page, index) => renderPage(page, index))}
      </ScrollView>

      {/* Enhanced Pagination Dots */}
      <View style={styles.paginationContainer}>
        {onboardingPages.map((_, index) => {
          const isActive = index === currentPage;
          const dotScale = dotAnimations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.3],
          });
          
          return (
            <Animated.View
              key={index}
              style={[
                styles.paginationDotContainer,
                {
                  transform: [{ scale: isActive ? dotScale : 1 }],
                },
              ]}
            >
              <View
                style={[
                  styles.paginationDot,
                  isActive && styles.paginationDotActive,
                ]}
              >
                {isActive && (
                  <Animated.View
                    style={[
                      styles.paginationDotInner,
                      {
                        opacity: dotAnimations[index],
                      },
                    ]}
                  />
                )}
              </View>
              {isActive && (
                <Animated.View
                  style={[
                    styles.paginationDotGlow,
                    {
                      opacity: dotAnimations[index],
                    },
                  ]}
                />
              )}
            </Animated.View>
          );
        })}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        {currentPage === onboardingPages.length - 1 ? (
          <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
            <View style={styles.getStartedGradient}>
              <Text style={styles.getStartedText}>Start Playing</Text>
              <Text style={styles.arrowText}>→</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  skipText: {
    ...FONT_STYLES.CHIBI_BUTTON,
    color: '#666666',
  },
  page: {
    width,
    height,
  },
  pageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  chibiContainer: {
    position: 'absolute',
    top: 80,
    right: 40,
    zIndex: 3,
  },
  chibiText: {
    fontSize: 60,
    fontFamily: FONTS.CHIBI_PRIMARY,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconText: {
    fontSize: 80,
    fontFamily: FONTS.CHIBI_PRIMARY,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    ...FONT_STYLES.CHIBI_TITLE,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    ...FONT_STYLES.CHIBI_SUBTITLE,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    ...FONT_STYLES.CHIBI_BODY,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  floatingElement: {
    position: 'absolute',
    zIndex: 2,
  },
  floating1: {
    top: 120,
    left: 30,
  },
  floating2: {
    top: 180,
    right: 40,
  },
  floating3: {
    bottom: 150,
    left: 50,
  },
  floatingText: {
    fontSize: 28,
    opacity: 0.8,
    fontFamily: FONTS.CHIBI_PRIMARY,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  paginationDotContainer: {
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    width: 16,
    height: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  paginationDotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4A90E2',
  },
  paginationDotGlow: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 3,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  nextText: {
    ...FONT_STYLES.CHIBI_BUTTON,
    color: '#4A90E2',
    marginRight: 8,
  },
  getStartedButton: {
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  getStartedGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
  },
  getStartedText: {
    ...FONT_STYLES.CHIBI_BUTTON,
    color: '#FFFFFF',
    marginRight: 8,
  },
  arrowText: {
    fontSize: 20,
    color: '#4A90E2',
    fontWeight: 'bold',
    fontFamily: FONTS.CHIBI_PRIMARY,
  },
});

export default OnboardingScreen; 