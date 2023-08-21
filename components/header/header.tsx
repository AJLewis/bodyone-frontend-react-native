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
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {CustomTheme} from '../../theme/ICustomTheme';
import Pill from '../pill/Pill';
import IconWithCount from '../icon-with-count/icon-with-count';
import Logo from '../../assets/images/logo.png';
import SlideInMenu, {SlideInMenuRef} from '../slidein-menu/SlideInMenu';
import {useUser} from '../../contexts/UserContext';
import {configApi} from '../../services/api/ApiConfig';
import IconComponent from '../../components/icon/IconComponent';


const Header = () => {
    const { theme } = useUser();
    const { colors } = theme as CustomTheme;
    const [isMenuVisible, setMenuVisible] = useState(false);
    const slideMenuRef = useRef<SlideInMenuRef>(null);
    const [menuItems, setMenuItems] = useState([]);

    const userFromContext = useUser().user;

    const handleHamburgerPress = () => {
        if (isMenuVisible) {
            slideMenuRef?.current?.animateMenuOut();
        } else {
            setMenuVisible(true);
        }
    };

    const handleCrownPress = () => {
        Alert.alert('Confirmation', 'Do you want to proceed?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
    };

    const handlePillPress = () => {
        console.log('pill pressed');
        // navigation.navigate('Energy');
    };

    const handleNotificationPress = () => {
        // Slide in the notificationsContainer from the right
    };

    useEffect(() => {
        8;
        // Fetch the navigation menu from the backend
        const fetchNavigationMenu = async () => {
            try {
                const response = await configApi.get(
                    `/navigation-menu/slide-in-main-menu`
                );
                if (response.data && response.data.menuItems) {
                    setMenuItems(response.data.menuItems);
                }
            } catch (error) {
                console.error('Error fetching navigation menu:', error);
            }
        };

        fetchNavigationMenu();
    }, []);

    return (
        <SafeAreaView
            style={{
                ...styles.headerContainer,
                backgroundColor: colors.headerBackground,
            }}
        >
            {isMenuVisible && (
                <SlideInMenu
                    menuItems={menuItems}
                    user={userFromContext}
                    ref={slideMenuRef}
                    onClose={() => setMenuVisible(false)}
                />
            )}
            <View style={styles.inner}>
                {/* Left Group: Hamburger Menu and Logo */}
                <View style={styles.leftGroup}>
                    <Feather
                        name="menu"
                        style={{...styles.hamburgerMenu, color: colors.text}}
                        size={32}
                        onPress={handleHamburgerPress}
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
                    <IconComponent
                        library={'MaterialCommunityIcons'}
                        name={'cog'}
                        size={24}
                        color={colors.text}
                        style={{marginRight: 18}} // Added margin
                    />
                    <Pressable onPress={handleNotificationPress}>
                        {/* Notification Icon */}
                        <IconWithCount
                            iconName="notifications"
                            iconColor={colors.text}
                            circleColor={colors.green}
                            textColor="white"
                            count={12}
                        />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        padding: 15,
        paddingRight: 18,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    inner: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 0,
        marginTop: 5,
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
