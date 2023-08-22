import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 5001
const BASE_URL = 'https://9924-91-196-221-208.ngrok.io';

//4001
const CONFIG_URL = 'https://d24d-91-196-221-208.ngrok.io';

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

function getSyncEndpoint(dataType: string, isConfigData: boolean = false): string {
  const baseURL = isConfigData ? CONFIG_URL : BASE_URL;
  return `${baseURL}/api/private/${dataType}/sync`;
}

export { publicApi, privateApi, configApi, getSyncEndpoint };