import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet, Image, Text} from 'react-native';
import jwtDecode from 'jwt-decode';
import {useNavigation} from 'expo-router';
import Logo from '../../assets/images/logo.png';
import {useUser} from '../../contexts/UserContext';
import {privateApi, configApi} from '../../services/api/ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import {useMenu} from '../../contexts/UseMenuContext';
import { CustomTheme } from '../../theme/ICustomTheme';
import { checkAuthStatus } from '../../utils/AuthHelper';

interface DecodedToken {
    exp?: number;
    [key: string]: any; // This allows for other properties in the token
}

function SplashScreen() {
    const navigation = useNavigation();
    const {theme, setUser, setTheme, setNotifications, setMessages} = useUser(); // Assuming you have a setTheme method in your UserContext
    const { colors } = theme as CustomTheme;
    const {setSlideInNavigation} = useMenu();
    const [status, setStatus] = useState("Preparing data");

    const isTokenExpired = (token: string): boolean => {
        const decoded = jwtDecode(token) as DecodedToken;
        if (decoded.exp && typeof decoded.exp === 'number') {
            const currentTime = Date.now() / 1000; // Convert to seconds
            return decoded.exp < currentTime;
        }
        return true; // Default to expired if we can't decode the token or if it doesn't have an expiration
    };

    useEffect(() => {
        checkAuthStatus(setStatus, setUser, setTheme, setMessages, setNotifications, setSlideInNavigation, goToAuth, goToTabs);
    }, [navigation, setUser, setTheme]);

    const goToTabs = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'tabs'}],
            })
        );
    };

    const goToAuth = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: 'auth'}],
            })
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={Logo}
                    style={{width: 260, height: 52}}
                />
            </View>
            <Text style={{...styles.status, color: colors.text}}>{status}</Text>
            <View style={styles.loaderContainer}>
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    status:{},
    logo: {
        width: 210,
        height: 66,
    },
});

export default SplashScreen;
