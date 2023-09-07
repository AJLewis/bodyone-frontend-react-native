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
import SlideInMenu, {SlideInMenuRef} from '../slidein-menu/SlideInMenu';
import {INotification, useUser} from '../../contexts/UserContext';
import IconComponent from '../../components/icon/IconComponent';
import SlideMenuWithButtonNavigation from '../../templates/slide-in-with-button-navigation/SlideMenuWithButtonNavigation';
import NotificationsList, {
    NotificationListItem,
} from '../../components/notification-list/NotificationList';
import DynamicForm, {
    FormConfig,
} from '../../components/dynamic-form/DynamicForm';

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

const formConfigObject: FormConfig = {
    name: 'UserProfileForm',
    fields: [
        {
            name: 'firstName',
            details: {
                type: 'input',
                label: 'First Name',
                placeholder: 'Enter your first name',
                inputType: 'text',
                groupLabel: 'Profile Information',
            },
            databaseTarget: {
                database: 'userDatabase',
                object: 'userProfile',
                property: 'firstName',
            },
        },
        {
            name: 'lastName',
            details: {
                type: 'input',
                label: 'Last Name',
                placeholder: 'Enter your last name',
                inputType: 'text',
                groupLabel: 'Profile Information',
            },
            databaseTarget: {
                database: 'userDatabase',
                object: 'userProfile',
                property: 'lastName',
            },
        },
        {
            name: 'email',
            details: {
                type: 'input',
                label: 'Email',
                placeholder: 'Enter your email',
                inputType: 'text',
                groupLabel: 'Profile Information',
            },
            databaseTarget: {
                database: 'userDatabase',
                object: 'userProfile',
                property: 'email',
            },
        },
        {
            name: 'dob',
            details: {
                type: 'group',
                label: 'Date of Birth',
                groupLabel: 'Profile Information',
                fields: [
                    {
                        name: 'dobDay',
                        details: {
                            type: 'dropdown',
                            label: 'Day',
                            placeholder: 'DD',
                            options: [
                                /*...*/
                            ],
                            columns: 3,
                            groupLabel: 'Profile Information',
                        },
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'dobDay',
                        },
                    },
                    {
                        name: 'dobMonth',
                        details: {
                            type: 'dropdown',
                            label: 'Month',
                            placeholder: 'MM',
                            options: [
                                /*...*/
                            ],
                            columns: 3,
                            groupLabel: 'Profile Information',
                        },
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'dobMonth',
                        },
                    },
                    {
                        name: 'dobYear',
                        details: {
                            type: 'input',
                            label: 'Year',
                            placeholder: 'YYYY',
                            inputType: 'number',
                            columns: 3,
                            groupLabel: 'Profile Information',
                        },
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userProfile',
                            property: 'dobYear',
                        },
                    },
                ],
            },
        },
        {
            name: 'profilePicture',
            details: {
                type: 'image',
                label: 'Profile Picture',
                mediaType: 'photo',
                groupLabel: 'Profile Information',
            },
            databaseTarget: {
                database: 'userDatabase',
                object: 'userProfile',
                property: 'profilePicture',
            },
        },
        {
            name: 'preferences',
            details: {
                type: 'group',
                label: 'Preferences',
                groupLabel: 'Preferences',
                fields: [
                    {
                        name: 'newsletterSubscription',
                        details: {
                            type: 'toggle',
                            label: 'Subscribe to Newsletter',
                            groupLabel: 'Preferences',
                        },
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userPreferences',
                            property: 'newsletterSubscription',
                        },
                    },
                    {
                        name: 'darkMode',
                        details: {
                            type: 'toggle',
                            label: 'Enable Dark Mode',
                            groupLabel: 'Preferences',
                        },
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userPreferences',
                            property: 'darkMode',
                        },
                    },
                ],
            },
        },
        {
            name: 'address',
            details: {
                type: 'group',
                label: 'Address',
                groupLabel: 'Contact Information',
                fields: [
                    {
                        name: 'street',
                        details: {
                            type: 'input',
                            label: 'Street',
                            placeholder: 'Enter your street address',
                            inputType: 'text',
                            groupLabel: 'Contact Information',
                        },
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userContact',
                            property: 'street',
                        },
                    },
                    {
                        name: 'city',
                        details: {
                            type: 'input',
                            label: 'City',
                            placeholder: 'Enter your city',
                            inputType: 'text',
                            groupLabel: 'Contact Information',
                        },
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userContact',
                            property: 'city',
                        },
                    },
                    {
                        name: 'state',
                        details: {
                            type: 'dropdown',
                            label: 'State',
                            placeholder: 'Select your state',
                            options: [
                                'Alabama', 'Alaska', //... (add all states)
                            ],
                            groupLabel: 'Contact Information',
                        },
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userContact',
                            property: 'state',
                        },
                    },
                    {
                        name: 'zipCode',
                        details: {
                            type: 'input',
                            label: 'Zip Code',
                            placeholder: 'Enter your zip code',
                            inputType: 'number',
                            groupLabel: 'Contact Information',
                        },
                        databaseTarget: {
                            database: 'userDatabase',
                            object: 'userContact',
                            property: 'zipCode',
                        },
                    },
                ],
            },
        },
        {
            name: 'phoneNumber',
            details: {
                type: 'input',
                label: 'Phone Number',
                placeholder: 'Enter your phone number',
                inputType: 'number',
                groupLabel: 'Contact Information',
            },
            databaseTarget: {
                database: 'userDatabase',
                object: 'userContact',
                property: 'phoneNumber',
            },
        },
        {
            name: 'hobbies',
            details: {
                type: 'multiselect',
                label: 'Hobbies/Interests',
                options: [
                    'Reading', 'Gaming', 'Traveling', 'Cooking', //... (add more options)
                ],
                groupLabel: 'Personal Information',
            },
            databaseTarget: {
                database: 'userDatabase',
                object: 'userPersonalInfo',
                property: 'hobbies',
            },
        },
    ],
};
const objects = {
    userDatabase: {
        userProfile: {},
    },
};

const Header = () => {
    const {theme, messages, notifications} = useUser();
    const {colors} = theme as CustomTheme;
    const userFromContext = useUser().user;
    const [isMenuVisible, setMenuVisible] = useState(false);
    const slideMenuRef = useRef<SlideInMenuRef>(null);

    const [isMessagesVisible, setMessagesVisible] = useState(false);
    const slideInMessagesRef = useRef<{closeMessages: () => void} | null>(null);
    const count =
        messages.filter((x) => x.viewed === false)?.length +
        notifications.filter((x) => x.viewed === false)?.length;
    const convertedNotifications: NotificationListItem[] = notifications.map(
        convertToNotification
    );
    const [isNotificationsMenuVisible, setNotificationsMenuVisible] =
        useState(false);
    const slideNotificationsMenuRef = useRef<{
        closeMenu: () => void;
    } | null>(null);

    const [isSettingsVisible, setSettingsVisible] = useState(false);
    const settingsMenuRef = useRef<{closeMenu: () => void} | null>(null);

    const handleMessagePress = () => {};

    const handleHamburgerPress = () => {
        if (isMenuVisible) {
            slideMenuRef?.current?.animateMenuOut();
        } else {
            // If SlideInMessages is visible, close it first
            if (isMessagesVisible) {
                slideNotificationsMenuRef.current?.closeMenu?.();
            }
            if (isSettingsVisible) {
                settingsMenuRef.current?.closeMenu?.();
            }

            setMenuVisible(true);
        }
    };

    const handleNotificationPress = () => {
        if (isNotificationsMenuVisible) {
            slideNotificationsMenuRef?.current?.closeMenu();
        } else {
            if (isMenuVisible) {
                slideMenuRef.current?.animateMenuOut?.();
            }
            if (isSettingsVisible) {
                settingsMenuRef.current?.closeMenu?.();
            }

            setNotificationsMenuVisible(true);
        }
    };

    const handleSettingsPress = () => {
        if (isSettingsVisible) {
            settingsMenuRef?.current?.closeMenu();
        } else {
            if (isMenuVisible) {
                slideMenuRef.current?.animateMenuOut?.();
            }
            if (isNotificationsMenuVisible) {
                slideNotificationsMenuRef.current?.closeMenu?.();
            }

            setSettingsVisible(true);
        }
    };

    const messagesChildren = [
        {
            component: (
                <NotificationsList
                    notifications={messages}
                    onPress={handleMessagePress}
                />
            ),
            tabName: 'Messages',
        },
        {
            component: (
                <NotificationsList
                    notifications={convertedNotifications}
                    onPress={handleNotificationPress}
                />
            ),
            tabName: 'Notifications',
        },
    ];

    const settingsChildren = [
        {
            component: (
                <View style={{padding:20}}>
                    <DynamicForm
                        config={formConfigObject}
                        objects={objects}
                    />
                </View>
            ),
            tabName: 'Personal',
        },
        {
            component: (
                <View>
                    <Text>Settings</Text>
                </View>
            ),
            tabName: 'Settings',
        },
    ];

    return (
        <SafeAreaView
            style={{
                ...styles.headerContainer,
                backgroundColor: colors.headerBackground,
            }}
        >
            {isMenuVisible && (
                <SlideInMenu
                    user={userFromContext}
                    ref={slideMenuRef}
                    onClose={() => setMenuVisible(false)}
                />
            )}
            {isNotificationsMenuVisible && (
                <SlideMenuWithButtonNavigation
                    ref={slideNotificationsMenuRef}
                    activeTab="Messages"
                    onClose={() => setNotificationsMenuVisible(false)}
                    children={messagesChildren}
                />
            )}
            {isSettingsVisible && (
                <SlideMenuWithButtonNavigation
                    ref={settingsMenuRef}
                    activeTab="Personal"
                    onClose={() => setSettingsVisible(false)}
                    children={settingsChildren}
                />
            )}

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
