import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import jwtDecode from 'jwt-decode';
import { useNavigation } from 'expo-router';
import Logo from '../../assets/images/largeLogo.png';
import { useUser } from '../../contexts/UserContext'; 
import { privateApi } from '../../services/api/ApiConfig'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';

interface DecodedToken {
  exp?: number;
  [key: string]: any; // This allows for other properties in the token
}

function SplashScreen() {
  const navigation = useNavigation();
  const { setUser } = useUser(); 

  const isTokenExpired = (token: string): boolean => {
    const decoded = jwtDecode(token) as DecodedToken;
    if (decoded.exp && typeof decoded.exp === 'number') {
      const currentTime = Date.now() / 1000; // Convert to seconds
      return decoded.exp < currentTime;
    }
    return true; // Default to expired if we can't decode the token or if it doesn't have an expiration
  };
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('jwt_token');
      const userId = await AsyncStorage.getItem('userId');
      const forceLogin = false;
      if (token && userId) {
        if (isTokenExpired(token) || forceLogin) {
          console.log('TOKEN EXPIRED !!!!!!!!!!!!!!');
          goToAuth();
          return;
        }

        // Fetch the user data using the privateApi
        try {
          
          console.log('FETCHING USER !!!!!!!!!!!!!!');
          const response = await privateApi.get(`/user/basic/${userId}`);
          const userData = response.data;
          setUser(userData); // Set the user data in the context
          goToTabs();
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          goToAuth();
        }
      } else {
        goToAuth();
      }
    };

    checkAuthStatus();
  }, [navigation, setUser]); 

  const goToTabs = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'tabs' },
        ],
      })
    );
  }

  const goToAuth = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'auth' },
        ],
      })
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={{ width: 210, height: 66 }} />
      </View>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
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
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 210,
    height: 66,
  },
});

export default SplashScreen;