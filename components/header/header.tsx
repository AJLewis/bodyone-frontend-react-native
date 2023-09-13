import React, {useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Pressable,
    Alert,
    StatusBar,
    Platform,
    useColorScheme,
    Image,
    TouchableWithoutFeedback,
} from 'react-native';
import {CustomTheme} from '../../theme/ICustomTheme';
import IconWithCount from '../icon-with-count/icon-with-count';
import Logo from '../../assets/images/logo.png';
import NavigationMenuScreen, {
    NavigationMenuScreenRef,
} from '../../screens/navigation-menu-screen/NavigationMenuScreen';
import {INotification, useUser} from '../../contexts/UserContext';
import IconComponent from '../../components/icon/IconComponent';
import SlideMenuWithButtonNavigation from '../../templates/slide-in-with-button-navigation/SlideMenuWithButtonNavigation';
import NotificationsList, {
    NotificationListItem,
} from '../../components/notification-list/NotificationList';
import DynamicForm, {
    FormConfig,
} from '../../components/dynamic-form/DynamicForm';
import {useMenu} from '../../contexts/UseMenuContext';
import { useAppContext } from '../../contexts/UseAppContext';

const convertToNotification = (notif: INotification): NotificationListItem => {
    const date =
        typeof notif.date === 'string' ? new Date(notif.date) : notif.date;
    return {
        subject: notif.content,
        content: date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }),
        viewed: notif.viewed,
    };
};

const Header = () => {
    const {theme, messages, notifications} = useUser();
    const {colors} = theme as CustomTheme;
    const { setHeaderHeight } = useAppContext();
    const count =
        messages.filter((x) => x.viewed === false)?.length +
        notifications.filter((x) => x.viewed === false)?.length;

    const {
        isMenuVisible,
        setMenuVisible,
        isNotificationsMenuVisible,
        setNotificationsMenuVisible,
        isSettingsVisible,
        setSettingsVisible,
    } = useMenu();

    const handleHamburgerPress = () => {
        if (isNotificationsMenuVisible) {
            setNotificationsMenuVisible(false);
        }
        if (isSettingsVisible) {
            setSettingsVisible(false);
        }

        setMenuVisible((prevVisible) => !prevVisible);
    };

    const handleNotificationPress = () => {
        if (isMenuVisible) {
            setMenuVisible(false);
        }
        if (isSettingsVisible) {
            setSettingsVisible(false);
        }
        setNotificationsMenuVisible((prevVisible) => !prevVisible);
    };

    const handleSettingsPress = () => {
        if (isMenuVisible) {
            setMenuVisible(false);
        }
        if (isNotificationsMenuVisible) {
            setNotificationsMenuVisible(false);
        }
        setSettingsVisible(true);
    };


    return (
        <SafeAreaView>
            <View
                style={{
                    ...styles.headerContainer,
                    backgroundColor: colors.headerBackground,
                }}
                onLayout={(event) => {
                    const { height } = event.nativeEvent.layout;
                    setHeaderHeight(height);
                  }}>
                <View style={styles.inner}>
                    {/* Left Group: Hamburger Menu and Logo */}
                    <View style={styles.leftGroup}>
                        <IconComponent
                            library={'Feather'}
                            name={'menu'}
                            size={32}
                            onPress={handleHamburgerPress}
                            color={colors.text}
                        />
                        <View
                            style={{
                                ...styles.logo,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 20, // Added margin
                            }}
                        >
                            <Image
                                source={Logo}
                                style={{width: 100, height: 20}}
                            />
                        </View>
                    </View>

                    {/* Right Group: Cog and Notifications Icon */}
                    <View style={styles.rightGroup}>
                        <Pressable
                            style={{...styles.pressable}}
                            onPress={handleSettingsPress}
                        >
                            <IconComponent
                                library={'Feather'}
                                name={'sliders'}
                                size={22}
                                color={colors.text}
                                style={{marginRight: 8}} // Added margin
                            />
                        </Pressable>
                        <Pressable
                            style={{...styles.pressable}}
                            onPress={handleNotificationPress}
                        >
                            {/* Notification Icon */}
                            <IconWithCount
                                size={26}
                                iconLibrary={'Fontisto'}
                                iconName={'email'}
                                iconColor={colors.text}
                                circleColor={colors.greenBackground}
                                textColor={colors.text}
                                count={count}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {},
    inner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 0,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    leftGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    hamburgerMenu: {
        marginTop: 1,
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 55,
        marginTop: 4,
    },
    pressable: {
        padding: 5,
    },
});

export default Header;
