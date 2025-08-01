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
    const [agreed, setAgreed] = useState(false);

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
        if (!agreed) {
            Alert.alert('You must agree to the terms before signing in.');
            return;
        }
        console.log(data);
        onAuthenticate();
    };

    return (
        <View style={styles.container}>
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
                        rules={{ required: 'Password is required' }}
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

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>

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

            {/* Sign In Button */}
            <TouchableOpacity style={styles.signInButton} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.signInText}>Sign in</Text>
            </TouchableOpacity>

            {/* Divider */}
            <Text style={styles.dividerText}>other way to sign in</Text>

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
    container: {
      flex: 1,
      backgroundColor: '#F9FAF8',
      paddingHorizontal: 24,
      paddingTop: 60,
      alignItems: 'center',
    },
    logo: {
      width: 160,
      height: 160,
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
    forgotPassword: {
      alignSelf: 'flex-end',
      marginBottom: 12,
    },
    forgotText: {
      fontSize: 13,
      color: '#333',
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
    signInButton: {
      backgroundColor: '#004D40',
      width: '100%',
      paddingVertical: 14,
      borderRadius: 30,
      alignItems: 'center',
      marginBottom: 20,
    },
    signInText: {
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
    createAccountText: {
      fontSize: 13,
      color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 4,
      },
});

export default LoginScreen;
