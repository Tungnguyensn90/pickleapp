import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute, RouteProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
// import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import apiService from '../services/api';
import ConfirmationModal from '../components/ConfirmationModal';

type ProfileScreenRouteProp = RouteProp<{
  Profile: { onLogout?: () => void; onProfileUpdate?: (updatedUser: any) => void };
}, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<ProfileScreenRouteProp>();
  const { onLogout, onProfileUpdate } = route.params || {};
  
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isDeleteAvatarModalVisible, setIsDeleteAvatarModalVisible] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    location: '',
    player_rank: '',
    elo: '',
    description: '',
  });

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      // Check if we have a valid token before making the request
      const token = apiService.getToken();
      if (!token) {
        setErrorMessage('Không có token xác thực. Vui lòng đăng nhập lại.');
        setIsErrorModalVisible(true);
        return;
      }

      const response = await apiService.getProfile();
      setUser(response.user);
    } catch (error: any) {
      console.error('Failed to load profile:', error);
      // If it's an authentication error, redirect to login
      if (error.message && error.message.includes('access denied') || error.message.includes('no token')) {
        setErrorMessage('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        setIsErrorModalVisible(true);
        // Clear the invalid token
        apiService.removeToken();
        // Call logout after a short delay
        setTimeout(() => {
          if (onLogout) {
            onLogout();
          }
        }, 2000);
      } else {
        setErrorMessage('Không thể tải dữ liệu hồ sơ');
        setIsErrorModalVisible(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPress = () => {
    setEditForm({
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      location: user?.location || '',
      player_rank: user?.player_rank || '',
      elo: user?.elo?.toString() || '',
      description: user?.description || '',
    });
    setIsEditModalVisible(true);
  };

  const handleSaveProfile = async () => {
    try {
      setIsUpdating(true);
      const updateData = {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        location: editForm.location,
        player_rank: editForm.player_rank,
        elo: parseInt(editForm.elo) || 1000,
        description: editForm.description,
      };

      const response = await apiService.updateProfile(updateData);
      setUser(response.user);
      setIsEditModalVisible(false);
      setSuccessMessage('Cập nhật hồ sơ thành công');
      setIsSuccessModalVisible(true);
      if (onProfileUpdate) {
        onProfileUpdate(response.user);
      }
    } catch (error: any) {
      console.error('Profile update error:', error);
      setErrorMessage('Không thể cập nhật hồ sơ');
      setIsErrorModalVisible(true);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const handleLogoutPress = () => {
    setIsLogoutModalVisible(true);
  };

  const handleLogoutConfirm = async () => {
    setIsLogoutModalVisible(false);
    try {
      // First, clear the token immediately to prevent any further API calls
      apiService.removeToken();
      
      // Then try to call the logout API (but don't wait for it)
      apiService.logout().catch(error => {
        console.error('Logout API error:', error);
        // Ignore API errors during logout
      });
      
      console.log('Logged out successfully');
      // Call the parent's logout handler
      if (onLogout) {
        onLogout();
      }
    } catch (error: any) {
      console.error('Logout error:', error);
      // Even if there's an error, still logout locally
      if (onLogout) {
        onLogout();
      }
    }
  };

  const handleAvatarUpload = async () => {
    try {
      const options = {
        mediaType: 'photo' as const,
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      const result = await launchImageLibrary(options);

      if (result.assets && result.assets[0]) {
        setIsUpdating(true);
        
        const response = await apiService.uploadAvatar(result.assets[0]);
        setUser(response.user);
        setSuccessMessage('Tạo chibi avatar thành công!');
        
        setIsSuccessModalVisible(true);
        if (onProfileUpdate) {
          onProfileUpdate(response.user);
        }
      }
    } catch (error: any) {
      console.error('Avatar upload error:', error);
      setErrorMessage('Không thể tải lên ảnh đại diện');
      setIsErrorModalVisible(true);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAvatarPress = () => {
    setIsDeleteAvatarModalVisible(true);
  };

  const handleDeleteAvatarConfirm = async () => {
    setIsDeleteAvatarModalVisible(false);
    try {
      setIsUpdating(true);
      const response = await apiService.deleteAvatar();
      setUser(response.user);
      setSuccessMessage('Xóa ảnh đại diện thành công');
      setIsSuccessModalVisible(true);
      if (onProfileUpdate) {
        onProfileUpdate(response.user);
      }
    } catch (error: any) {
      console.error('Avatar delete error:', error);
      setErrorMessage('Không thể xóa ảnh đại diện');
      setIsErrorModalVisible(true);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF8C42" />
        <Text style={styles.loadingText}>Đang tải hồ sơ...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#FF8C42', '#FFD700']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />


      <ScrollView
        style={[styles.scrollView]}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Information Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarUpload}>
              {user?.avatar ? (
                <Image source={{ uri: `http://10.0.2.2:3000${user.avatar}` }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Icon name="person" size={30} color="#FF8C42" />
                </View>
              )}
              {isUpdating && (
                <View style={styles.avatarOverlay}>
                  <ActivityIndicator color="#FFFFFF" size="small" />
            </View>
              )}
            </TouchableOpacity>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>
                {user?.first_name && user?.last_name
                  ? `${user.first_name} ${user.last_name}`
                  : user?.email || 'Người dùng'}
              </Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              {user?.player_rank && (
                <View style={styles.rankContainer}>
                  <Text style={styles.rankText}>{user.player_rank}</Text>
                  {user?.elo && <Text style={styles.eloText}>ELO: {user.elo}</Text>}
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
              <Icon name="edit" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* Avatar Actions */}
          <View style={styles.avatarActions}>
            <TouchableOpacity style={styles.avatarAction} onPress={handleAvatarUpload} disabled={isUpdating}>
              <Icon name="photo-camera" size={16} color="#FF8C42" />
              <Text style={styles.avatarActionText}>Tạo chibi avatar</Text>
            </TouchableOpacity>
            {user?.avatar && (
              <TouchableOpacity style={styles.avatarAction} onPress={handleDeleteAvatarPress} disabled={isUpdating}>
                <Icon name="delete" size={16} color="#FF6B6B" />
                <Text style={[styles.avatarActionText, { color: '#FF6B6B' }]}>Xóa</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Account Management Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quản lý tài khoản</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Icon name="person" size={18} color="#FF8C42" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Tài khoản của tôi</Text>
              <Text style={styles.menuSubtitle}>Quản lý cài đặt tài khoản</Text>
            </View>
            <View style={styles.menuRight}>
              <View style={styles.alertBadge}>
                <Text style={styles.alertText}>!</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#999" />
            </View>
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Icon name="security" size={18} color="#FF8C42" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Face ID / Touch ID</Text>
              <Text style={styles.menuSubtitle}>Quản lý bảo mật thiết bị</Text>
            </View>
            <View style={styles.menuRight}>
              <View style={styles.alertBadge}>
                <Text style={styles.alertText}>!</Text>
              </View>
              <Icon name="chevron-right" size={20} color="#999" />
            </View>
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Icon name="verified-user" size={18} color="#FF8C42" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Xác thực hai yếu tố</Text>
              <Text style={styles.menuSubtitle}>Bảo mật tài khoản thêm cho an toàn</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#999" />
          </View>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogoutPress}>
            <View style={styles.menuIcon}>
              <Icon name="logout" size={18} color="#FF8C42" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Đăng xuất</Text>
              <Text style={styles.menuSubtitle}>Đăng xuất khỏi tài khoản</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* More Options Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tùy chọn khác</Text>
          
          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Icon name="help" size={18} color="#FF8C42" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Trợ giúp & Hỗ trợ</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#999" />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Icon name="info" size={18} color="#FF8C42" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Về ứng dụng</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#999" />
          </View>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancelEdit}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#FF8C42', '#FFD700']}
            style={styles.modalContent}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleCancelEdit} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Hủy</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Chỉnh sửa hồ sơ</Text>
              <TouchableOpacity 
                onPress={handleSaveProfile} 
                style={styles.saveButton}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.saveButtonText}>Lưu</Text>
                )}
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScrollContent} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Tên</Text>
                <TextInput
                  style={styles.textInput}
                  value={editForm.first_name}
                  onChangeText={(text) => setEditForm({ ...editForm, first_name: text })}
                  placeholder="Nhập tên"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Họ</Text>
                <TextInput
                  style={styles.textInput}
                  value={editForm.last_name}
                  onChangeText={(text) => setEditForm({ ...editForm, last_name: text })}
                  placeholder="Nhập họ"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Địa điểm</Text>
                <TextInput
                  style={styles.textInput}
                  value={editForm.location}
                  onChangeText={(text) => setEditForm({ ...editForm, location: text })}
                  placeholder="Nhập địa điểm của bạn"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Cấp độ người chơi</Text>
                <TextInput
                  style={styles.textInput}
                  value={editForm.player_rank}
                  onChangeText={(text) => setEditForm({ ...editForm, player_rank: text })}
                  placeholder="VD: Người mới, Trung cấp, Nâng cao"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Điểm ELO</Text>
                <TextInput
                  style={styles.textInput}
                  value={editForm.elo}
                  onChangeText={(text) => setEditForm({ ...editForm, elo: text })}
                  placeholder="Nhập điểm ELO"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Mô tả</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={editForm.description}
                  onChangeText={(text) => setEditForm({ ...editForm, description: text })}
                  placeholder="Hãy kể về bản thân"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isVisible={isLogoutModalVisible}
        title="Đăng xuất"
        message="Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?"
        confirmText="Đăng xuất"
        cancelText="Hủy"
        onConfirm={handleLogoutConfirm}
        onCancel={() => setIsLogoutModalVisible(false)}
        type="danger"
        icon="logout"
      />

      {/* Delete Avatar Confirmation Modal */}
      <ConfirmationModal
        isVisible={isDeleteAvatarModalVisible}
        title="Xóa ảnh đại diện"
        message="Bạn có chắc chắn muốn xóa ảnh đại diện? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleDeleteAvatarConfirm}
        onCancel={() => setIsDeleteAvatarModalVisible(false)}
        type="danger"
        icon="delete"
      />

      {/* Error Modal */}
      <ConfirmationModal
        isVisible={isErrorModalVisible}
        title="Lỗi"
        message={errorMessage}
        confirmText="OK"
        cancelText=""
        onConfirm={() => setIsErrorModalVisible(false)}
        onCancel={() => setIsErrorModalVisible(false)}
        type="danger"
        icon="error"
      />

      {/* Success Modal */}
      <ConfirmationModal
        isVisible={isSuccessModalVisible}
        title="Thành công"
        message={successMessage}
        confirmText="OK"
        cancelText=""
        onConfirm={() => setIsSuccessModalVisible(false)}
        onCancel={() => setIsSuccessModalVisible(false)}
        type="info"
        icon="check-circle"
      />
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
  header: {
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#4A5568',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF8C42',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#E2E8F0',
    marginBottom: 4,
  },
  rankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginRight: 5,
  },
  eloText: {
    fontSize: 12,
    color: '#E2E8F0',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    fontSize: 18,
  },
  avatarActions: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    gap: 10,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  avatarAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5DC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  avatarActionText: {
    fontSize: 12,
    color: '#FF8C42',
    marginLeft: 5,
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5DC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  iconText: {
    fontSize: 18,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  alertText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
  },
  toggleSwitch: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 2,
  },
  toggleOff: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8C42',
  },
  loadingText: {
    marginTop: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#008080',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputGroup: {
    // marginBottom: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 14,
  },
  modalScrollContent: {
    // flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default ProfileScreen; 