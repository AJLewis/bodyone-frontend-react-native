import MenuHeader from '../../components/menu-header/MenuHeader';
import React, {useRef, useEffect, useState} from 'react';
import {
    View,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar,
} from 'react-native';
import {Avatar} from '../../assets/images/avatar.png';
import MenuListItem from '../../components/menu-list-item/MenuListItem';
import {useNavigation} from 'expo-router';
import {configApi} from '../../services/api/ApiConfig';
import {useUser} from '../../contexts/UserContext';
import {CustomTheme} from '../../theme/ICustomTheme';
import {CommonActions} from '@react-navigation/native';
import {logout} from '../../services/api/AuthService';
import {useMenu} from '../../contexts/UseMenuContext';
import {Button, ButtonSize, ButtonType} from '../../components/button/Button';
import { useAppContext } from '../../contexts/UseAppContext';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type NavigationMenuScreenProps = {
    onClose: () => void;
    user?: any;
};

export type NavigationMenuScreenRef = {
    animateMenuOut: () => void;
};

const NavigationMenuScreen = React.forwardRef<NavigationMenuScreenRef, NavigationMenuScreenProps>(
    ({onClose, user}, ref) => {
        const slideAnim = useRef(
            new Animated.Value(-screenWidth * 0.75)
        ).current;
        const overlayOpacity = useRef(new Animated.Value(0)).current;
        const {theme} = useUser();
        const {colors} = theme as CustomTheme;
        const navigation = useNavigation();
        const {slideInNavigation} = useMenu() as any;
        const {menuItems} = slideInNavigation;
        const { headerHeight } = useAppContext();
        const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight ? StatusBar.currentHeight : 20 : 0;
        const totalHeaderHeight = statusBarHeight && headerHeight ? statusBarHeight + headerHeight : 0;
        const openMenu = () => {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(overlayOpacity, {
                    toValue: 0.3,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start();
        };

        const animateMenuOut = () => {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -screenWidth * 0.75,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(overlayOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start(() => {
                onClose();
            });
        };

        React.useImperativeHandle(ref, () => ({
            animateMenuOut,
        }));

        useEffect(() => {
            openMenu();
        }, []);

        const goToAuth = () => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{name: 'auth'}],
                })
            );
        };

        const handleLogout = async () => {
            await logout();
            goToAuth();
        };

        return (
            <View style={{...styles.container, top: totalHeaderHeight}}>
                <TouchableOpacity
                    style={[styles.overlay, {opacity: overlayOpacity}]}
                    onPress={animateMenuOut}
                />
                <Animated.View
                    style={[
                        styles.menu,
                        {
                            transform: [{translateX: slideAnim}],
                            backgroundColor: colors.background,
                        },
                    ]}
                >
                    <MenuHeader
                        avatarUri="https://www.terrainhopperusa.com/wp-content/uploads/2019/01/avatar-man.png"
                        username={user.handle}
                        energy={user.points?.points}
                        level={4}
                    />

                    <ScrollView
                        style={styles.list}
                        
                    >
                        {menuItems.map((item: any) => (
                            <MenuListItem
                                key={item._id} // Assuming each item has a unique _id
                                navigation={navigation}
                                link={item.link ? item.link : null}
                                text={item.text}
                                fontColor={item.fontColor}
                                library={item.library}
                                iconName={item.iconName}
                                backgroundColor={'transparent'}
                                hideHorizontalLine={item.hideHorizontalLine}
                                dividerColor={colors.menuDividerColor}
                                onPress={item.onPress ? item.onPress : null}
                            />
                        ))}
                    </ScrollView>
                    <View style={styles.logoutButton}>
                        <Button
                            type={ButtonType.Fill}
                            color={colors.logoutBackground}
                            label="Logout"
                            onPress={handleLogout}
                            size={ButtonSize.Small}
                        />
                    </View>
                </Animated.View>
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)', // semi-transparent background
        zIndex: 9999,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: screenHeight,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    list: {
        marginTop: 30
    },
    menu: {
        width: screenWidth * 0.75,
        height: screenHeight, // give it a fixed height for now
    },
    logoutButton: {
        margin: 20,
    },
});

export default NavigationMenuScreen;
