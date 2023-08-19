import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import Logo from '../../assets/images/largeLogo.png';

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = await AsyncStorage.getItem('jwt_token');
      const userId = await AsyncStorage.getItem('userId');
      if (token && userId) {
        navigation.navigate('tabs');
      } else {
        navigation.navigate('(auth)');
      }
    };

    checkAuthStatus();
  }, [navigation]);

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