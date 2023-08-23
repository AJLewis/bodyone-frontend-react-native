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
import {SlideInMessages} from '../../components/slide-in-messages/SlideInMessages';
import {useUser} from '../../contexts/UserContext';
import {configApi} from '../../services/api/ApiConfig';
import IconComponent from '../../components/icon/IconComponent';

const Header = () => {
    const {theme, messages, notifications} = useUser();
    const userFromContext = useUser().user;
    const {colors} = theme as CustomTheme;
    const [isMenuVisible, setMenuVisible] = useState(false);
    const slideMenuRef = useRef<SlideInMenuRef>(null);
    const [isMessagesVisible, setMessagesVisible] = useState(false);
    const slideInMessagesRef = useRef<{ closeMessages: () => void } | null>(null);
    const count = messages.filter((x) => x.viewed === false)?.length + notifications.filter((x) => x.viewed === false)?.length 
    const handleHamburgerPress = () => {
        if (isMenuVisible) {
            slideMenuRef?.current?.animateMenuOut();
        } else {
            // If SlideInMessages is visible, close it first
            if (isMessagesVisible) {
                slideInMessagesRef.current?.closeMessages?.();
            }
            setMenuVisible(true);
        }
    };

    const handlePillPress = () => {
        console.log('pill pressed');
        // navigation.navigate('Energy');
    };

    const handleNotificationPress = () => {
        if (isMessagesVisible) {
            slideInMessagesRef.current?.closeMessages?.();
        } else {
            // If SlideInMenu is visible, close it first
            if (isMenuVisible) {
                slideMenuRef?.current?.animateMenuOut();
            }
            setMessagesVisible(true);
        }
    };

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
            {isMessagesVisible && (
                <SlideInMessages
                    ref={slideInMessagesRef}
                    activeTab="Messages"
                    onClose={() => setMessagesVisible(false)}
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
                        color={isMenuVisible ? colors.btnPrimary : colors.text}
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
                            iconColor={isMessagesVisible ? colors.btnPrimary : colors.text}
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
