import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native';
import {register} from '../../services/api/AuthService';
import {useNavigation} from 'expo-router';
import {Button, ButtonColor, ButtonType} from '../../components/button/Button';
import {CustomTheme} from 'theme/ICustomTheme';
import {InputPrimary} from '../../components/input-primary/InputPrimary';
import Logo from '../../assets/images/logo.png';
import {CommonActions, useTheme} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

function RegisterScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const {colors} = useTheme() as CustomTheme;
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            const token = false;
            // const token = await AsyncStorage.getItem('jwt_token');
            if (token) {
                goToTabs();
            }
            setIsLoading(false);
        };

        checkToken();
    }, []);

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

    const handleRegister = async () => {
        try {
            await register(email, email, password, firstName, lastName);
            navigation.navigate('tabs');
        } catch (err: any) {
            setError(err);
        }
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
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.container}>
                {!keyboardVisible && ( // Conditionally render the logo based on isInputFocused
                    <View style={styles.logoContainer}>
                        <Image
                            source={Logo}
                            style={{width: 210, height: 66}}
                        />
                    </View>
                )}
                <View style={styles.fieldsContainer}>
                    <View style={styles.nameInputContainer}>
                        <View style={styles.fistNameInputContainer}>
                            <InputPrimary
                                placeholder="First Name"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>
                        <View style={styles.lastNameInputContainer}>
                            <InputPrimary
                                placeholder="Last Name"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
                    </View>
                    <View style={styles.emailInput}>
                        <InputPrimary
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
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
                    <Button
                        label="Register"
                        type={ButtonType.Fill}
                        color={ButtonColor.Primary}
                        onPress={handleRegister}
                    />
                    <View style={styles.loginBtn}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('index')}
                        >
                            <Text
                                style={{
                                    ...styles.textLinks,
                                    color: colors.btnPrimary,
                                }}
                            >
                                Back to Login
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 30,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    nameInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    fistNameInputContainer: {
        flex: 1,
        overflow: 'hidden',
        marginLeft: 30,
        marginRight: 7.5, // Half of 15px to create a total gap of 15px between the two inputs
    },
    lastNameInputContainer: {
        flex: 1,
        marginLeft: 7.5, // Half of 15px to create a total gap of 15px between the two inputs
        marginRight: 30,
        overflow: 'hidden',
        maxWidth: '40%',
    },
    emailInput: {
        marginBottom: 30,
    },
    passwordInput: {
        marginBottom: 35,
    },
    fieldsContainer: {
        width: '95%',
        alignItems: 'center',
    },
    loginBtn: {
        marginTop: 20,
    },
    textLinks: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default RegisterScreen;

function setIsLoading(arg0: boolean) {
    throw new Error('Function not implemented.');
}
