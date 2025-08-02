import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ShopTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF8C42', '#FFD700']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
          <View style={styles.productGrid}>
            <TouchableOpacity style={styles.productCard}>
              <View style={styles.productImage}>
                <Icon name="sports-tennis" size={32} color="#FF8C42" />
              </View>
              <Text style={styles.productName}>Vợt Pickleball Pro</Text>
              <Text style={styles.productPrice}>2,500,000đ</Text>
              <View style={styles.productRating}>
                <Icon name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.productCard}>
              <View style={styles.productImage}>
                <Icon name="sports-tennis" size={32} color="#FF8C42" />
              </View>
              <Text style={styles.productName}>Bóng Pickleball</Text>
              <Text style={styles.productPrice}>150,000đ</Text>
              <View style={styles.productRating}>
                <Icon name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.6</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.productCard}>
              <View style={styles.productImage}>
                <Icon name="checkroom" size={32} color="#FF8C42" />
              </View>
              <Text style={styles.productName}>Giày Pickleball</Text>
              <Text style={styles.productPrice}>1,800,000đ</Text>
              <View style={styles.productRating}>
                <Icon name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.7</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.productCard}>
              <View style={styles.productImage}>
                <Icon name="checkroom" size={32} color="#FF8C42" />
              </View>
              <Text style={styles.productName}>Túi đựng vợt</Text>
              <Text style={styles.productPrice}>450,000đ</Text>
              <View style={styles.productRating}>
                <Icon name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.5</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danh mục</Text>
          <View style={styles.categoryList}>
            <TouchableOpacity style={styles.categoryCard}>
              <Icon name="sports-tennis" size={32} color="#FF8C42" />
              <Text style={styles.categoryName}>Vợt</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryCard}>
              <Icon name="sports-tennis" size={32} color="#FF8C42" />
              <Text style={styles.categoryName}>Bóng</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryCard}>
              <Icon name="checkroom" size={32} color="#FF8C42" />
              <Text style={styles.categoryName}>Giày</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryCard}>
              <Icon name="checkroom" size={32} color="#FF8C42" />
              <Text style={styles.categoryName}>Phụ kiện</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Best Sellers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bán chạy nhất</Text>
          <View style={styles.bestSellerList}>
            <TouchableOpacity style={styles.bestSellerCard}>
              <View style={styles.bestSellerImage}>
                <Icon name="sports-tennis" size={40} color="#FF8C42" />
              </View>
              <View style={styles.bestSellerInfo}>
                <Text style={styles.bestSellerName}>Vợt Pickleball Premium</Text>
                <Text style={styles.bestSellerPrice}>3,200,000đ</Text>
                <Text style={styles.bestSellerSales}>Đã bán: 156</Text>
              </View>
              <View style={styles.bestSellerRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.bestSellerCard}>
              <View style={styles.bestSellerImage}>
                <Icon name="checkroom" size={40} color="#FF8C42" />
              </View>
              <View style={styles.bestSellerInfo}>
                <Text style={styles.bestSellerName}>Giày Pickleball Pro</Text>
                <Text style={styles.bestSellerPrice}>2,100,000đ</Text>
                <Text style={styles.bestSellerSales}>Đã bán: 89</Text>
              </View>
              <View style={styles.bestSellerRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Special Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ưu đãi đặc biệt</Text>
          <View style={styles.offerList}>
            <TouchableOpacity style={styles.offerCard}>
              <View style={styles.offerBadge}>
                <Text style={styles.offerText}>-20%</Text>
              </View>
              <View style={styles.offerImage}>
                <Icon name="sports-tennis" size={32} color="#FF8C42" />
              </View>
              <View style={styles.offerInfo}>
                <Text style={styles.offerName}>Bộ vợt + bóng</Text>
                <Text style={styles.offerPrice}>2,800,000đ</Text>
                <Text style={styles.offerOriginalPrice}>3,500,000đ</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.offerCard}>
              <View style={styles.offerBadge}>
                <Text style={styles.offerText}>-15%</Text>
              </View>
              <View style={styles.offerImage}>
                <Icon name="checkroom" size={32} color="#FF8C42" />
              </View>
              <View style={styles.offerInfo}>
                <Text style={styles.offerName}>Giày + túi</Text>
                <Text style={styles.offerPrice}>1,900,000đ</Text>
                <Text style={styles.offerOriginalPrice}>2,250,000đ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
    zIndex: -1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
    marginHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C42',
    marginBottom: 4,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF8C42',
    marginLeft: 4,
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '23%',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  bestSellerList: {
    gap: 12,
  },
  bestSellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  bestSellerImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  bestSellerInfo: {
    flex: 1,
  },
  bestSellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bestSellerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C42',
    marginTop: 2,
  },
  bestSellerSales: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  bestSellerRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerList: {
    gap: 12,
  },
  offerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    position: 'relative',
  },
  offerBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B6B',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  offerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  offerImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  offerInfo: {
    flex: 1,
  },
  offerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  offerPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF8C42',
    marginTop: 2,
  },
  offerOriginalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
});

export default ShopTab; 