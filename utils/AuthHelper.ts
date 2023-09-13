import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {privateApi, configApi} from '../services/api/ApiConfig';

interface DecodedToken {
    exp?: number;
    [key: string]: any; // This allows for other properties in the token
}

const isTokenExpired = (token: string): boolean => {
    const decoded = jwtDecode(token) as DecodedToken;
    if (decoded.exp && typeof decoded.exp === 'number') {
        const currentTime = Date.now() / 1000; // Convert to seconds
        return decoded.exp < currentTime;
    }
    return true; // Default to expired if we can't decode the token or if it doesn't have an expiration
};

export const checkAuthStatus = async (
    setStatus: (status: string) => void,
    setUser: (user: any) => void,
    setTheme: (theme: any) => void,
    setMessages: (messages: any) => void,
    setNotifications: (notifications: any) => void,
    setSlideInNavigation: (menu: any) => void,
    goToAuth: () => void,
    goToTabs: () => void
) => {
    const token = await AsyncStorage.getItem('jwt_token');
  const userId = await AsyncStorage.getItem('userId');
  const forceLogin = false;

  if (token && userId) {
    if (isTokenExpired(token) || forceLogin) {
      console.log('TOKEN EXPIRED !!!!!!!!!!!!!!');
      setStatus("Token expired");
      goToAuth();
      return;
    }

    let user;

    try {
      setStatus("Fetching user data");
      console.log(userId)
      const response = await privateApi.get(`/user/basic/${userId}`);
      user = response.data;
      console.log(user)
      setUser(user);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      goToAuth();
      return;
    }

    setStatus("Setting up...");

    const promises = [
      configApi.get(`/theme/${user.theme}`).then(response => {
        setTheme(response.data);
      }).catch(error => {
        console.error('Error fetching theme:', error);
      }),
      privateApi.post(`/message/user/${userId}`, {
        type: 'received', 
        limit: 20
      }).then(response => {
        setMessages(response.data);
      }).catch(error => {
        console.error('Error fetching message:', error);
      }),
      privateApi.get(`/notification/user/${userId}`).then(response => {
        setNotifications(response.data);
      }).catch(error => {
        console.error('Error fetching notification:', error);
      }),
      configApi.get(`/navigation-menu/slide-in-main-menu`).then(response => {
        setSlideInNavigation(response.data);
      }).catch(error => {
        console.error('Error fetching navigation-menu:', error);
      }),
    ];

    try {
      await Promise.all(promises);
      console.log('promises')
      goToTabs();
    } catch (error) {
      console.error('An error occurred:', error);
      goToAuth();
    }
  } else {
    goToAuth();
  }
};

