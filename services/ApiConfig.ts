import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://localhost:5001/api';

const publicApi = axios.create({
  baseURL: `${BASE_URL}/public`,
});

const protectedApi = axios.create({
  baseURL: `${BASE_URL}/private`,
});

protectedApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { publicApi, protectedApi };