import FontAwesome from '@expo/vector-icons/FontAwesome';
import {ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import React, {useEffect, useRef} from 'react';
import {useColorScheme, View, Text, StatusBar, Platform} from 'react-native';
import {DarkTheme} from '../theme/dark-theme';
import {DefaultTheme} from '../theme/default-theme';
import Header from '../components/header/header';
import {UserProvider, useUser} from '../contexts/UserContext';
import {MenuProvider, useMenu} from '../contexts/UseMenuContext';
import NavigationMenuScreen from '../screens/navigation-menu-screen/NavigationMenuScreen';
import {NavigationMenuScreenRef} from '../screens/navigation-menu-screen/NavigationMenuScreen';
import MessagesMenuScreen from '../screens/messages-menu-screen/MessagesMenuScreen';
import SettingsMenuScreen from '../screens/settings-menu-screen/SettingsMenuScreen';
import { CustomTheme } from '../theme/ICustomTheme';
import { AppProvider } from '../contexts/UseAppContext';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'splash',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
        ...FontAwesome.font,
    });
    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <UserProvider>
            <MenuProvider>
                <RootLayoutNav />
            </MenuProvider>
        </UserProvider>
    );
}

function RootLayoutNav() {
    const {
        isMenuVisible,
        setMenuVisible,
        isNotificationsMenuVisible,
        setNotificationsMenuVisible,
        isSettingsVisible,
        setSettingsVisible,
    } = useMenu();
    const userFromContext = useUser().user;
    const {theme} = useUser();
    const {colors} = theme as CustomTheme;
    const colorScheme = useColorScheme();
    const slideMenuRef = useRef<NavigationMenuScreenRef>(null);

    const statusBarHeight =
        Platform.OS === 'android' ? StatusBar.currentHeight : 0;

    return (
        <AppProvider>
            <View
                style={{
                    paddingTop: statusBarHeight,
                    backgroundColor: colors.headerBackground,
                }}
            ></View>

            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <>
                    {isMenuVisible && (
                        <NavigationMenuScreen
                            user={userFromContext}
                            ref={slideMenuRef}
                            onClose={() => setMenuVisible(false)}
                        />
                    )}
                    {isNotificationsMenuVisible && <MessagesMenuScreen />}
                    {isSettingsVisible && <SettingsMenuScreen />}
                    <Stack>
                        <Stack.Screen
                            name="(splash)"
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="auth"
                            options={{
                                animation: 'fade',
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="tabs"
                            options={{
                                animation: 'fade',
                                header: () => <Header />,
                            }}
                        />
                        <Stack.Screen
                            name="modal"
                            options={{presentation: 'modal'}}
                        />
                    </Stack>
                </>
            </ThemeProvider>
        </AppProvider>
    );
}
