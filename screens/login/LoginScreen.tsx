import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { login } from '../../services/api/AuthService';
import { CommonActions, useTheme } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { Button, ButtonColor, ButtonSize, ButtonType } from '../../components/button/Button';
import { CustomTheme } from 'theme/ICustomTheme';
import { InputPrimary } from '../../components/input-primary/InputPrimary';
import Logo from '../../assets/images/largeLogo.png';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../contexts/UserContext';
import { privateApi } from '../../services/api/ApiConfig';

// @ts-ignore
function LoginScreen() {
  const [username, setUsername] = useState('andy_lewis');
  const [password, setPassword] = useState('securePassword123');
  const [error, setError] = useState('');
  const navigation = useNavigation();
  const { colors } = useTheme() as CustomTheme;
  const [isLoading, setIsLoading] = useState(true);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { setUser } = useUser();


  useEffect(() => {
    const checkToken = async () => {
      // const token = false;
      const token = await AsyncStorage.getItem('jwt_token');
      const userId = await AsyncStorage.getItem('userId');
      if(token && userId) {
          await fetchUserData(userId);
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


  const fetchUserData = async (userId: string) => {
    try {
      const response = await privateApi.get(`/user/${userId}`);
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const data = await login(username, password);
      console.log(data)
      if (data && data.userId) {
        await fetchUserData(data.userId);
        goToTabs();
      }
    } catch (err: any) {
      console.log(err);
      setError(err);
    }
  };

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

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <>
            {!keyboardVisible && ( // Conditionally render the logo based on isInputFocused
              <View style={styles.logoContainer}>
                <Image source={Logo} style={{ width: 210, height: 66 }} />
              </View>
            )}
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
              <Text style={{ ...styles.forgotPassword, color: colors.btnPrimary }}>Forgotten Password?</Text>
              <Button label="Login" type={ButtonType.Fill} color={ButtonColor.Primary} size={ButtonSize.Large} onPress={handleLogin} />
              <View style={styles.signUpBtn}>
              <TouchableOpacity onPress={() => navigation.navigate('register')}>
                <Text style={{ ...styles.needAnAccount, color: colors.btnPrimary }}>Need an account? Sign up for free</Text>
              </TouchableOpacity>
              </View>
            </View>
          </>
        )}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  usernameInput: {
    marginBottom:30,
  },
  passwordInput: {
  },
  fieldsContainer: {
    width: '95%',
    alignItems: 'center',
  },
  signUpBtn: {
    marginTop: 20,
  },
  forgotPassword: {
    paddingVertical: 25,
    fontWeight: 'bold',
    fontSize: 12,
  },
  needAnAccount: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;