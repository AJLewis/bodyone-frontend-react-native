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
import NavigationMenuScreen, {NavigationMenuScreenRef} from '../../screens/navigation-menu-screen/NavigationMenuScreen';
import {INotification, useUser} from '../../contexts/UserContext';
import IconComponent from '../../components/icon/IconComponent';
import SlideMenuWithButtonNavigation from '../../templates/slide-in-with-button-navigation/SlideMenuWithButtonNavigation';
import NotificationsList, {
    NotificationListItem,
} from '../../components/notification-list/NotificationList';
import DynamicForm, {
    FormConfig,
} from '../../components/dynamic-form/DynamicForm';
import { useMenu } from '../../contexts/UseMenuContext';

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
    const slideMenuRef = useRef<NavigationMenuScreenRef>(null);
    const count = messages.filter((x) => x.viewed === false)?.length + notifications.filter((x) => x.viewed === false)?.length;
    const convertedNotifications: NotificationListItem[] = notifications.map( convertToNotification );
    const slideNotificationsMenuRef = useRef<{ closeMenu: () => void; } | null>(null);
    const { isMenuVisible, setMenuVisible, isNotificationsMenuVisible, setNotificationsMenuVisible, isSettingsVisible, setSettingsVisible } = useMenu();

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
        <SafeAreaView
            style={{
                ...styles.headerContainer,
                backgroundColor: colors.headerBackground,
            }}
        >         
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
                    <Pressable onPress={handleSettingsPress}>
                        <IconComponent
                            library={'MaterialCommunityIcons'}
                            name={'cog'}
                            size={24}
                            color={colors.text}
                            style={{marginRight: 18}} // Added margin
                        />
                    </Pressable>
                    <Pressable onPress={handleNotificationPress}>
                        {/* Notification Icon */}
                        <IconWithCount
                            iconLibrary={'FontAwesome'}
                            iconName={'envelope-o'}
                            iconColor={colors.text}
                            circleColor={colors.greenBackground}
                            textColor={colors.text}
                            count={count}
                        />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        height: 104,
    },
    inner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 0,
        padding: 15,
        paddingRight: 18,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
});

export default Header;
