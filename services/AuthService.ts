import { publicApi } from './ApiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (username: string, password: string) => {
  try {
    const response = await publicApi.post('/auth/login', { username, password });
    await AsyncStorage.setItem('jwt_token', response.data.token);
    return response.data;
  } catch (error: any) {
    throw error.response.data.msg;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('jwt_token');
};