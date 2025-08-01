import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useForm, Controller } from 'react-hook-form';

interface SignInScreenProps {
    onNavigateToSignUp: () => void;
    onAuthenticate: () => void;
}

type FormData = {
    email: string;
    password: string;
};

const LoginScreen: React.FC<SignInScreenProps> = ({ onNavigateToSignUp, onAuthenticate }) => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        onAuthenticate();
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
            
            {/* Logo Section */}
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />

            <Text style={styles.title}>Sign in to your account</Text>

            {/* Email Field */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email format',
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email address"
                            placeholderTextColor="#FF8C42"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    )}
                />
                {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordContainer}>
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: 'Password is required' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Enter your password"
                                placeholderTextColor="#FF8C42"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={!showPassword}
                            />
                        )}
                    />
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.eyeIcon}
                    >
                        <Text style={styles.eyeIconText}>👁️</Text>
                    </TouchableOpacity>
                </View>
                {errors.password && (
                    <Text style={styles.errorText}>{errors.password.message}</Text>
                )}
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>

            {/* Divider */}
            <Text style={styles.dividerText}>OTHER WAY-TO SIGN IN</Text>

            {/* Social */}
            <View style={styles.socialContainer}>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../../../assets/images/google.png')} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                    <Image source={require('../../../assets/images/facebook.png')} style={styles.socialIcon} />
                </TouchableOpacity>
            </View>

            {/* Create Account */}
            <Text style={styles.createAccountText}>
                Don't have an account? <Text style={styles.link} onPress={onNavigateToSignUp}>Create Account</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 220,
        height: 220,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 60,
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    logoSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        width: '100%',
        justifyContent: 'space-between',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FF8C42',
        marginBottom: -5,
    },
    logoSubText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF8C42',
    },
    logoGraphics: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    speedObject: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    yellowCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFD700',
        borderWidth: 2,
        borderColor: '#FF8C42',
    },
    orangeStreaks: {
        width: 30,
        height: 8,
        backgroundColor: '#FF8C42',
        borderRadius: 4,
        marginLeft: -5,
    },
    smallYellowCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#FFD700',
        borderWidth: 1,
        borderColor: '#FF8C42',
    },
    avatarContainer: {
        marginLeft: 20,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FF8C42',
    },
    avatarText: {
        fontSize: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#008080',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputGroup: {
        width: '100%',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#008080',
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#F5F5DC',
        padding: 16,
        borderRadius: 12,
        borderWidth: 0,
        fontSize: 16,
        color: '#333',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5DC',
        borderRadius: 12,
        borderWidth: 0,
    },
    passwordInput: {
        flex: 1,
        padding: 16,
        fontSize: 16,
        color: '#333',
    },
    eyeIcon: {
        paddingHorizontal: 16,
    },
    eyeIconText: {
        fontSize: 20,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 30,
    },
    forgotText: {
        fontSize: 14,
        color: '#008080',
        fontWeight: '500',
    },
    signInButton: {
        backgroundColor: '#008080',
        width: '100%',
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    signInText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dividerText: {
        color: '#999',
        marginBottom: 20,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 30,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    socialIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    createAccountText: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
    link: {
        color: '#008080',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: 12,
        marginTop: 4,
    },
});

export default LoginScreen;
