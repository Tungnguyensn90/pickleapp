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
    const [agreed, setAgreed] = useState(false);

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
        if (!agreed) {
            Alert.alert('You must agree to the terms before signing up.');
            return;
        }
        if (data.password !== data.confirmPassword) {
            Alert.alert('Passwords do not match.');
            return;
        }
        console.log(data);
        onAuthenticate();
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
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
                                placeholderTextColor="#999"
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
                                placeholderTextColor="#999"
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
                                placeholderTextColor="#999"
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
                                    placeholderTextColor="#999"
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
                            <Text>{showPassword ? '🙈' : '👁️'}</Text>
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
                                    placeholderTextColor="#999"
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
                            <Text>{showConfirmPassword ? '🙈' : '👁️'}</Text>
                        </TouchableOpacity>
                    </View>
                    {errors.confirmPassword && (
                        <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                    )}
                </View>

                {/* Checkbox */}
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={styles.checkbox}
                        onPress={() => setAgreed(!agreed)}
                    >
                        {agreed ? <Text style={styles.checkmark}>✔</Text> : null}
                    </TouchableOpacity>
                    <Text style={styles.checkboxText}>
                        I've read and agreed to <Text style={styles.link}>User Agreement</Text> and{' '}
                        <Text style={styles.link}>Privacy Policy</Text>
                    </Text>
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.signUpButton} onPress={handleSubmit(onSubmit)}>
                    <Text style={styles.signUpText}>Create Account</Text>
                </TouchableOpacity>

                {/* Divider */}
                <Text style={styles.dividerText}>or sign up with</Text>

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
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#F9FAF8',
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#004D40',
        marginBottom: 30,
    },
    inputGroup: {
        width: '100%',
        marginBottom: 12,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        color: '#333',
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 2,
        fontSize: 14,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    passwordInput: {
        flex: 1,
        padding: 14,
        fontSize: 14,
    },
    eyeIcon: {
        paddingHorizontal: 12,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
        width: '100%',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        marginTop: 4,
    },
    checkmark: {
        color: '#004D40',
        fontSize: 14,
    },
    checkboxText: {
        flex: 1,
        color: '#333',
        fontSize: 13,
    },
    link: {
        color: '#004D40',
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
    signUpButton: {
        backgroundColor: '#004D40',
        width: '100%',
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    signUpText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    dividerText: {
        color: '#777',
        marginBottom: 14,
        fontSize: 13,
    },
    socialContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 24,
    },
    socialButton: {
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 2,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 10,
    },
    socialIcon: {
        width: 36,
        height: 36,
        resizeMode: 'contain',
    },
    signInText: {
        fontSize: 13,
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
    },
});

export default SignUpScreen; 