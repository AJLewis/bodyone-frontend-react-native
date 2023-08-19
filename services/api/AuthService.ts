import { publicApi } from './ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (username: string, password: string) => {
  try {
    console.log('logging in')
    const response = await publicApi.post('/auth/login', { username, password });
    if(response.data && response.data.token) {
      await AsyncStorage.setItem('jwt_token', response.data.token);
      await AsyncStorage.setItem('userId', response.data.userId);
      return response.data;
    }
  } catch (error: any) {
    console.log(error)
    throw error.response.data.msg;
  }
};

export const register = async (username: string, email: string, password: string, firstName: string, lastName: string) => {
  try {
    const response = await publicApi.post('/auth/register', {
      username,
      email,
      password,
      firstName,
      lastName
    });
    if(response) {
      await AsyncStorage.setItem('jwt_token', response.data.token);
      return response.data;
    }
  } catch (error: any) {
    throw error.response.data.msg;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('jwt_token');
};