import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 5001
const BASE_URL = 'https://69d8-91-196-221-208.ngrok.io';

//4001
const CONFIG_URL = 'https://708c-91-196-221-208.ngrok.io';

const publicApi = axios.create({
  baseURL: `${BASE_URL}/api/public`,
});

const privateApi = axios.create({
  baseURL: `${BASE_URL}/api/private`,
});

const configApi = axios.create({
  baseURL: `${CONFIG_URL}/api/configuration`,
});

privateApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

configApi.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { publicApi, privateApi, configApi };