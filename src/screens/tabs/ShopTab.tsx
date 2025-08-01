import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ShopTab: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Shop</Text>
        <Text style={styles.subtitle}>Get the best pickleball gear</Text>
        
        <View style={styles.productCard}>
          <Text style={styles.productIcon}>🏓</Text>
          <Text style={styles.productTitle}>Premium Paddles</Text>
          <Text style={styles.productDescription}>High-quality pickleball paddles</Text>
          <Text style={styles.productPrice}>From $89.99</Text>
        </View>
        
        <View style={styles.productCard}>
          <Text style={styles.productIcon}>👟</Text>
          <Text style={styles.productTitle}>Court Shoes</Text>
          <Text style={styles.productDescription}>Comfortable court footwear</Text>
          <Text style={styles.productPrice}>From $129.99</Text>
        </View>
        
        <View style={styles.productCard}>
          <Text style={styles.productIcon}>🎽</Text>
          <Text style={styles.productTitle}>Sportswear</Text>
          <Text style={styles.productDescription}>Performance athletic wear</Text>
          <Text style={styles.productPrice}>From $49.99</Text>
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
  productCard: {
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
  productIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF8C42',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#008080',
  },
});

export default ShopTab; 