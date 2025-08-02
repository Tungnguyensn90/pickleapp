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
}

interface SignInScreenProps {
  onNavigateToSignUp: () => void;
  onAuthenticate: (user: any) => void;
}

const LoginScreen: React.FC<SignInScreenProps> = ({ onNavigateToSignUp, onAuthenticate }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        try {
            const response = await apiService.signIn(data);
            console.log('Login successful:', response);
            onAuthenticate(response.user);
        } catch (error: any) {
            console.error('Login error:', error);
            setErrorMessage(error.message || 'Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
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

                <Text style={styles.title}>Đăng nhập vào tài khoản</Text>

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

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                </TouchableOpacity>

                {/* Sign In Button */}
                <TouchableOpacity
                    style={[styles.signInButton, isLoading && styles.disabledButton]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#FFFFFF" size="small" />
                    ) : (
                        <Text style={styles.signInButtonText}>Đăng nhập</Text>
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

                {/* Sign Up Link */}
                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Chưa có tài khoản? </Text>
                    <TouchableOpacity onPress={onNavigateToSignUp}>
                        <Text style={styles.signUpLink}>Đăng ký ngay</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Error Modal */}
            <ConfirmationModal
                isVisible={isErrorModalVisible}
                title="Đăng nhập thất bại"
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
        width: 240,
        height: 240,
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 30,
    },
    forgotPasswordText: {
        color: '#FFFFFF',
        fontSize: 14,
        textDecorationLine: 'underline',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    signInButton: {
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
    signInButtonText: {
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
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        color: '#FFFFFF',
        fontSize: 16,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    signUpLink: {
        color: '#008080',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});

export default LoginScreen;
