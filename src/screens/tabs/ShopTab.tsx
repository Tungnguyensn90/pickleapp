import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ShopTab: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Shop Header */}
      <View style={styles.shopHeader}>
        <Text style={styles.shopTitle}>Pickleball Shop</Text>
        <Text style={styles.shopSubtitle}>Premium equipment and gear</Text>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>🏓</Text>
            <Text style={styles.categoryTitle}>Paddles</Text>
            <Text style={styles.categorySubtitle}>Professional & beginner</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>🎾</Text>
            <Text style={styles.categoryTitle}>Balls</Text>
            <Text style={styles.categorySubtitle}>Indoor & outdoor</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>👕</Text>
            <Text style={styles.categoryTitle}>Apparel</Text>
            <Text style={styles.categorySubtitle}>Performance wear</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryCard}>
            <Text style={styles.categoryIcon}>👟</Text>
            <Text style={styles.categoryTitle}>Shoes</Text>
            <Text style={styles.categorySubtitle}>Court shoes</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Featured Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.productCard}>
            <View style={styles.productImage}>
              <Text style={styles.productImageText}>🏓</Text>
            </View>
            <Text style={styles.productName}>Pro Paddle Elite</Text>
            <Text style={styles.productPrice}>$89.99</Text>
            <Text style={styles.productRating}>⭐ 4.8 (124 reviews)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.productCard}>
            <View style={styles.productImage}>
              <Text style={styles.productImageText}>🎾</Text>
            </View>
            <Text style={styles.productName}>Tournament Balls (12pk)</Text>
            <Text style={styles.productPrice}>$24.99</Text>
            <Text style={styles.productRating}>⭐ 4.6 (89 reviews)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.productCard}>
            <View style={styles.productImage}>
              <Text style={styles.productImageText}>👕</Text>
            </View>
            <Text style={styles.productName}>Performance Shirt</Text>
            <Text style={styles.productPrice}>$34.99</Text>
            <Text style={styles.productRating}>⭐ 4.7 (56 reviews)</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Deals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Deals</Text>
        <View style={styles.dealsList}>
          <TouchableOpacity style={styles.dealCard}>
            <View style={styles.dealBadge}>
              <Text style={styles.dealBadgeText}>-20%</Text>
            </View>
            <View style={styles.dealImage}>
              <Text style={styles.dealImageText}>🏓</Text>
            </View>
            <View style={styles.dealInfo}>
              <Text style={styles.dealName}>Beginner Paddle Set</Text>
              <Text style={styles.dealPrice}>
                <Text style={styles.originalPrice}>$59.99</Text>
                <Text style={styles.discountPrice}> $47.99</Text>
              </Text>
              <Text style={styles.dealTime}>Ends in 6 hours</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.dealCard}>
            <View style={styles.dealBadge}>
              <Text style={styles.dealBadgeText}>-15%</Text>
            </View>
            <View style={styles.dealImage}>
              <Text style={styles.dealImageText}>👟</Text>
            </View>
            <View style={styles.dealInfo}>
              <Text style={styles.dealName}>Court Shoes Pro</Text>
              <Text style={styles.dealPrice}>
                <Text style={styles.originalPrice}>$129.99</Text>
                <Text style={styles.discountPrice}> $110.49</Text>
              </Text>
              <Text style={styles.dealTime}>Ends in 12 hours</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* My Orders */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Orders</Text>
        <View style={styles.ordersList}>
          <TouchableOpacity style={styles.orderCard}>
            <View style={styles.orderIcon}>
              <Text style={styles.orderIconText}>📦</Text>
            </View>
            <View style={styles.orderInfo}>
              <Text style={styles.orderTitle}>Order #12345</Text>
              <Text style={styles.orderDate}>March 10, 2024</Text>
              <Text style={styles.orderStatus}>🟢 Delivered</Text>
            </View>
            <Text style={styles.orderTotal}>$89.99</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.orderCard}>
            <View style={styles.orderIcon}>
              <Text style={styles.orderIconText}>🚚</Text>
            </View>
            <View style={styles.orderInfo}>
              <Text style={styles.orderTitle}>Order #12344</Text>
              <Text style={styles.orderDate}>March 8, 2024</Text>
              <Text style={styles.orderStatus}>🟡 In Transit</Text>
            </View>
            <Text style={styles.orderTotal}>$47.99</Text>
          </TouchableOpacity>
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
  shopHeader: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  shopTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 8,
  },
  shopSubtitle: {
    fontSize: 16,
    color: '#6C757D',
  },
  section: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 15,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'center',
  },
  productCard: {
    width: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  productImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  productImageText: {
    fontSize: 40,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6F42C1',
    marginBottom: 4,
  },
  productRating: {
    fontSize: 12,
    color: '#6C757D',
  },
  dealsList: {
    gap: 15,
  },
  dealCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    position: 'relative',
  },
  dealBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#DC3545',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dealBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dealImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  dealImageText: {
    fontSize: 24,
  },
  dealInfo: {
    flex: 1,
  },
  dealName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 4,
  },
  dealPrice: {
    fontSize: 16,
    marginBottom: 4,
  },
  originalPrice: {
    color: '#6C757D',
    textDecorationLine: 'line-through',
  },
  discountPrice: {
    color: '#DC3545',
    fontWeight: 'bold',
  },
  dealTime: {
    fontSize: 12,
    color: '#ADB5BD',
  },
  ordersList: {
    gap: 12,
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
  },
  orderIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  orderIconText: {
    fontSize: 20,
  },
  orderInfo: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 2,
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6F42C1',
  },
});

export default ShopTab; 