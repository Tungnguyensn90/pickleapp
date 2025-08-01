import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useForm, Controller } from 'react-hook-form';

interface SignUpScreenProps {
    onNavigateToSignIn: () => void;
    onAuthenticate: () => void;
}

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onNavigateToSignIn, onAuthenticate }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const password = watch('password');

    const onSubmit = (data: FormData) => {
        if (data.password !== data.confirmPassword) {
            Alert.alert('Passwords do not match.');
            return;
        }
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
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Logo Section */}
                <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />

                <Text style={styles.title}>Create your account</Text>

                {/* First Name Field */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>First Name</Text>
                    <Controller
                        control={control}
                        name="firstName"
                        rules={{ required: 'First name is required' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your first name"
                                placeholderTextColor="#FF8C42"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="words"
                            />
                        )}
                    />
                    {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
                </View>

                {/* Last Name Field */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Last Name</Text>
                    <Controller
                        control={control}
                        name="lastName"
                        rules={{ required: 'Last name is required' }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your last name"
                                placeholderTextColor="#FF8C42"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                autoCapitalize="words"
                            />
                        )}
                    />
                    {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}
                </View>

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
                            rules={{ 
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters'
                                }
                            }}
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

                {/* Confirm Password Field */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Confirm Password</Text>
                    <View style={styles.passwordContainer}>
                        <Controller
                            control={control}
                            name="confirmPassword"
                            rules={{ 
                                required: 'Please confirm your password',
                                validate: (value) => value === password || 'Passwords do not match'
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Confirm your password"
                                    placeholderTextColor="#FF8C42"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry={!showConfirmPassword}
                                />
                            )}
                        />
                        <TouchableOpacity
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={styles.eyeIcon}
                        >
                            <Text style={styles.eyeIconText}>👁️</Text>
                        </TouchableOpacity>
                    </View>
                    {errors.confirmPassword && (
                        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                    )}
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.signUpText}>Create Account</Text>
                </TouchableOpacity>

                {/* Divider */}
                <Text style={styles.dividerText}>OR SIGN UP WITH</Text>

                {/* Social */}
                <View style={styles.socialContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../../assets/images/google.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image source={require('../../../assets/images/facebook.png')} style={styles.socialIcon} />
                    </TouchableOpacity>
                </View>

                {/* Sign In Link */}
                <Text style={styles.signInText}>
                    Already have an account? <Text style={styles.link} onPress={onNavigateToSignIn}>Sign In</Text>
                </Text>
            </ScrollView>
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
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
        alignItems: 'center',
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
    signUpButton: {
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
    signUpText: {
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
    signInText: {
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

export default SignUpScreen; 