import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native';
import {login} from '../../services/api/AuthService';
import {CommonActions, useTheme} from '@react-navigation/native';
import {useNavigation} from 'expo-router';
import {
    Button,
    ButtonColor,
    ButtonSize,
    ButtonType,
    ButtonWidth,
} from '../../components/button/Button';
import {CustomTheme} from 'theme/ICustomTheme';
import {InputPrimary} from '../../components/input-primary/InputPrimary';
import Logo from '../../assets/images/logo.png';
import {TouchableOpacity} from 'react-native';
import {useUser} from '../../contexts/UserContext';
import {privateApi} from '../../services/api/ApiConfig';
import { checkAuthStatus } from '../../utils/AuthHelper';
import { useMenu } from '../../contexts/UseMenuContext';

// @ts-ignore
function LoginScreen() {
    console.log('login screen');
    const [username, setUsername] = useState('freddie_burns');
    const [password, setPassword] = useState('securePassword123');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const {colors} = useTheme() as CustomTheme;
    const [isLoading, setIsLoading] = useState(false);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const {theme, setUser, setTheme, setNotifications, setMessages} = useUser();
    const [status, setStatus] = useState("Preparing data");
    const {setSlideInNavigation} = useMenu();
    
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const fetchUserData = async (userId: string) => {
        try {
            console.log(userId)
            const response = await privateApi.get(`/user/${userId}`);
            if (response.data) {
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleLogin = async () => {
        setIsLoading(true);
        try {
          setStatus('Logging in, please wait...')
            const data = await login(username, password);
            console.log('data');
            console.log(data);
            if (data && data.userId) {
              await fetchUserData(data.userId);
              await checkAuthStatus(setStatus, setUser, setTheme, setMessages, setNotifications, setSlideInNavigation, goToAuth, goToTabs);
          }

        } catch (err: any) {
            console.log(err);
            setError(err);
        }
        setIsLoading(false);
    };

    const goToAuth = () => {
      navigation.dispatch(
          CommonActions.reset({
              index: 0,
              routes: [{name: 'auth'}],
          })
      );
  };


    const goToTabs = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'tabs'}],
            })
        );
    };

    return (
        <View style={styles.container}>
            {!keyboardVisible && ( // Conditionally render the logo based on isInputFocused
                <View style={styles.logoContainer}>
                    <Image
                        source={Logo}
                        style={{width: 260, height: 52}}
                    />
                </View>
            )}

            {isLoading ? (
                <>
                    <Text style={{...styles.status, color: colors.text}}>
                        {status}
                    </Text>
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator
                            size="large"
                            color="#0000ff"
                        />
                    </View>
                </>
            ) : (
                <>
                    <View style={styles.fieldsContainer}>
                        <View style={styles.usernameInput}>
                            <InputPrimary
                                placeholder="Username"
                                value={username}
                                onChangeText={setUsername}
                            />
                        </View>
                        <View style={styles.passwordInput}>
                            <InputPrimary
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                        {error && <Text>{error}</Text>}
                        <Text
                            style={{
                                ...styles.forgotPassword,
                                color: colors.btnPrimary,
                            }}
                        >
                            Forgotten Password?
                        </Text>
                        <View style={styles.loginBtn}>
                            <Button
                                label="Login"
                                type={ButtonType.Fill}
                                color={ButtonColor.Primary}
                                size={ButtonSize.Large}
                                width={ButtonWidth.Full}
                                onPress={handleLogin}
                            />
                        </View>
                        <View style={styles.signUpBtn}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('register')}
                            >
                                <Text
                                    style={{
                                        ...styles.needAnAccount,
                                        color: colors.btnPrimary,
                                    }}
                                >
                                    Need an account? Sign up for free
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 30,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    usernameInput: {
        marginBottom: 30,
    },
    passwordInput: {},
    fieldsContainer: {
        width: '95%',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    loginBtn: {
        width: '100%',
        paddingHorizontal: 20,
    },
    signUpBtn: {
        marginTop: 20,
    },
    forgotPassword: {
        paddingVertical: 25,
        fontWeight: 'bold',
        fontSize: 12,
    },
    status: {},
    needAnAccount: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LoginScreen;
