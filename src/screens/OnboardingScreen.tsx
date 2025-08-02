import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
    title: 'Tìm Sân Chơi',
    subtitle: 'Khám phá các sân pickleball gần bạn',
    description: 'Tìm kiếm sân chơi trong khu vực, kiểm tra tình trạng và nhận chỉ đường đến trận đấu tiếp theo. Tìm cả sân trong nhà và ngoài trời.',
    icon: '🏟️',
    color: '#4A90E2',
    chibi: '🏃‍♂️',
  },
  {
    id: 2,
    title: 'Ghép Đấu',
    subtitle: 'Kết nối với các người chơi khác',
    description: 'Tìm người chơi cùng trình độ, lên lịch trận đấu và xây dựng cộng đồng pickleball của bạn. Tham gia trận đấu hoặc tạo trận đấu riêng.',
    icon: '🤝',
    color: '#F5A623',
    chibi: '👥',
  },
  {
    id: 3,
    title: 'Tham Gia Câu Lạc Bộ',
    subtitle: 'Trở thành một phần của cộng đồng',
    description: 'Khám phá các câu lạc bộ pickleball địa phương, tham gia giải đấu và tham dự các sự kiện có tổ chức. Giữ hoạt động và cạnh tranh.',
    icon: '🏆',
    color: '#4CAF50',
    chibi: '🎉',
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const animatedValues = useRef({
    iconPulse: new Animated.Value(1),
    chibiTranslateY: new Animated.Value(0),
    floatingElements: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
    ],
  }).current;

  const { iconPulse, chibiTranslateY, floatingElements } = animatedValues;

  React.useEffect(() => {
    // Icon pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(iconPulse, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(iconPulse, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // Chibi floating animation
    const chibiAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(chibiTranslateY, {
          toValue: -15,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(chibiTranslateY, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    chibiAnimation.start();

    // Floating elements animation
    floatingElements.forEach((element, index) => {
      const delay = index * 500;
      const floatAnimation = Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(element, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(element, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );
      floatAnimation.start();
    });

    return () => {
      pulseAnimation.stop();
      chibiAnimation.stop();
      floatingElements.forEach(element => element.stopAnimation());
    };
  }, []);

  const handleNext = () => {
    if (currentPage < onboardingPages.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      scrollViewRef.current?.scrollTo({
        x: nextPage * width,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

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
            <Text style={styles.floatingText}>🎯</Text>
          </Animated.View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF8C42', '#FFD700']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Bỏ qua</Text>
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
        style={styles.scrollView}
      >
        {onboardingPages.map((page, index) => renderPage(page, index))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.paginationContainer}>
        {onboardingPages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentPage && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>

      {/* Next/Get Started Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentPage === onboardingPages.length - 1 ? 'Bắt đầu' : 'Tiếp theo'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width,
    height,
  },
  pageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  pageContent: {
    alignItems: 'center',
    position: 'relative',
  },
  chibiContainer: {
    marginBottom: 30,
  },
  chibiText: {
    fontSize: 80,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  iconText: {
    fontSize: 60,
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  floatingElement: {
    position: 'absolute',
  },
  floating1: {
    top: '20%',
    left: '10%',
  },
  floating2: {
    top: '30%',
    right: '15%',
  },
  floating3: {
    bottom: '25%',
    left: '20%',
  },
  floatingText: {
    fontSize: 30,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
    width: 30,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
  nextButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    borderRadius: 25,
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
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C42',
  },
});

export default OnboardingScreen; 