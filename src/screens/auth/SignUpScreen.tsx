import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import apiService from '../../services/api';
import ConfirmationModal from '../../components/ConfirmationModal';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
  agreeToTerms: boolean;
}

interface SignUpScreenProps {
  onNavigateToSignIn: () => void;
  onAuthenticate: (user: any) => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onNavigateToSignIn, onAuthenticate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { control, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    if (!data.agreeToTerms) {
      setErrorMessage('Vui lòng đồng ý với điều khoản và điều kiện');
      setIsErrorModalVisible(true);
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await apiService.signUp({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
      });
      console.log('Registration successful:', response);
      onAuthenticate(response.user);
    } catch (error: any) {
      console.error('Registration error:', error);
      setErrorMessage(error.message || 'Không thể tạo tài khoản. Vui lòng thử lại.');
      setIsErrorModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

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
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo Section */}
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />

        <Text style={styles.title}>Tạo tài khoản mới</Text>

        {/* First Name Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tên</Text>
          <Controller
            control={control}
            name="first_name"
            rules={{
              required: 'Tên là bắt buộc',
              minLength: {
                value: 2,
                message: 'Tên phải có ít nhất 2 ký tự',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Nhập tên của bạn"
                placeholderTextColor="#FF8C42"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!isLoading}
              />
            )}
          />
          {errors.first_name && <Text style={styles.errorText}>{errors.first_name.message}</Text>}
        </View>

        {/* Last Name Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Họ</Text>
          <Controller
            control={control}
            name="last_name"
            rules={{
              required: 'Họ là bắt buộc',
              minLength: {
                value: 2,
                message: 'Họ phải có ít nhất 2 ký tự',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Nhập họ của bạn"
                placeholderTextColor="#FF8C42"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!isLoading}
              />
            )}
          />
          {errors.last_name && <Text style={styles.errorText}>{errors.last_name.message}</Text>}
        </View>

        {/* Email Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Địa chỉ Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email là bắt buộc',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Định dạng email không hợp lệ',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Nhập địa chỉ email của bạn"
                placeholderTextColor="#FF8C42"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
            )}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
        </View>

        {/* Password Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mật khẩu</Text>
          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Mật khẩu là bắt buộc',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Nhập mật khẩu của bạn"
                  placeholderTextColor="#FF8C42"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                />
              )}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? 'visibility-off' : 'visibility'}
                size={24}
                color="#FF8C42"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
        </View>

        {/* Confirm Password Field */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Xác nhận mật khẩu</Text>
          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Xác nhận mật khẩu là bắt buộc',
                validate: (value) => value === password || 'Mật khẩu không khớp',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Nhập lại mật khẩu của bạn"
                  placeholderTextColor="#FF8C42"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showConfirmPassword}
                  editable={!isLoading}
                />
              )}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon
                name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                size={24}
                color="#FF8C42"
              />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
        </View>

        {/* Terms and Conditions Checkbox */}
        <View style={styles.checkboxContainer}>
          <Controller
            control={control}
            name="agreeToTerms"
            rules={{
              required: 'Vui lòng đồng ý với điều khoản và điều kiện',
            }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => onChange(!value)}
                disabled={isLoading}
              >
                <View style={[styles.checkbox, value && styles.checkboxChecked]}>
                  {value && <Icon name="check" size={16} color="#FFFFFF" />}
                </View>
                <View style={styles.checkboxTextContainer}>
                  <Text style={styles.checkboxText}>
                    Tôi đồng ý với{' '}
                    <Text style={styles.termsLink}>Điều khoản sử dụng</Text>
                    {' '}và{' '}
                    <Text style={styles.termsLink}>Chính sách bảo mật</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          {errors.agreeToTerms && <Text style={styles.errorText}>{errors.agreeToTerms.message}</Text>}
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={[styles.signUpButton, isLoading && styles.disabledButton]}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.signUpButtonText}>Đăng ký</Text>
          )}
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>hoặc</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../../assets/images/google.png')} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Image source={require('../../../assets/images/facebook.png')} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Đã có tài khoản? </Text>
          <TouchableOpacity onPress={onNavigateToSignIn}>
            <Text style={styles.signInLink}>Đăng nhập ngay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Error Modal */}
      <ConfirmationModal
        isVisible={isErrorModalVisible}
        title="Đăng ký thất bại"
        message={errorMessage}
        confirmText="OK"
        cancelText=""
        onConfirm={() => setIsErrorModalVisible(false)}
        onCancel={() => setIsErrorModalVisible(false)}
        type="danger"
        icon="error"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40, // Add some padding at the bottom for the last element
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingRight: 50,
    fontSize: 16,
    color: '#333',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  signUpButton: {
    backgroundColor: '#008080',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dividerText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  socialButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  signInLink: {
    color: '#008080',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  checkboxContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#FF8C42',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#FF8C42',
    borderColor: '#FF8C42',
  },
  checkboxTextContainer: {
    flex: 1,
  },
  checkboxText: {
    fontSize: 14,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  termsLink: {
    color: '#008080',
    textDecorationLine: 'underline',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default SignUpScreen; 