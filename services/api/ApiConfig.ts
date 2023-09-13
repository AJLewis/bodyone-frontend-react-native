import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 5001
const BASE_URL = 'https://28b5-188-241-144-72.ngrok.io';

//4001
const CONFIG_URL = 'https://9a8e-188-241-144-72.ngrok.io';

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


function getApiInstance(api: string) {
  const apiMap: { [key: string]: any } = {
    publicApi,
    privateApi,
    configApi,
  };

  return apiMap[api] || null;
}

export { publicApi, privateApi, configApi, getSyncEndpoint, getApiInstance };