import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Pill from '../pill/Pill';
import {CustomTheme} from '../../theme/ICustomTheme';
import {CommonActions, useTheme} from '@react-navigation/native';
import {useUser} from '../../contexts/UserContext';
import {Button, ButtonColor, ButtonSize, ButtonType} from '../button/Button';
import {useNavigation} from 'expo-router';
import {logout} from '../../services/api/AuthService';
import MenuListItem from '../../components/menu-list-item/MenuListItem';

type MenuHeaderProps = {
    avatarUri: string;
    username: string;
    energy: number;
    level: number;
};

export const MenuHeader: React.FC<MenuHeaderProps> = ({
    avatarUri,
    username,
    energy,
    level,
}) => {
    const {theme} = useUser();
    const {colors} = theme as CustomTheme;
    const navigation = useNavigation();

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
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <View
                    style={{
                        ...styles.background,
                        backgroundColor: colors.headerBackground,
                    }}
                />
                <View style={styles.userInfo}>
                    <Image
                        source={{uri: avatarUri}}
                        style={styles.avatar}
                    />
                    <View style={styles.usernameAndPills}>
                        <Text style={[styles.username, {color: colors.text}]}>
                            {username}
                        </Text>
                        
                        <View style={styles.pillsContainer}>
                            <Pill
                                iconLibrary="SimpleLineIcons"
                                iconName="energy"
                                text={`${energy}`}
                                textColor={colors.text}
                                backgroundColor={colors.darkGold}
                                textSize={14}
                                paddingHorizontal={10}
                                paddingVertical={6}
                            />
                            <Pill
                                iconLibrary="Ionicons"
                                iconName="ios-ribbon" // Replace with the appropriate icon name for level
                                text={`${level}`}
                                textColor={colors.text}
                                backgroundColor={colors.greenBackground}
                                textSize={14}
                                paddingHorizontal={10}
                                paddingVertical={6}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 25,
        paddingTop: 10,
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 71,
        height: 71,
        borderRadius: 30.5,
        marginRight: 20,
    },
    usernameAndPills: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    username: {
        fontFamily: 'Roboto',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },
    pillsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    logoutButton: {
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    horizontalRule: {
      borderBottomWidth: 3,
      marginVertical: 5,
    },
});

export default MenuHeader;
