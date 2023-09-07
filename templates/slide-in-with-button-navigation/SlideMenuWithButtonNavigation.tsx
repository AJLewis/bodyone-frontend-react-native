import React, {useRef, useEffect, useState} from 'react';
import {
    View,
    Animated,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Text,
} from 'react-native';
import {useUser} from '../../contexts/UserContext';
import {CustomTheme} from '../../theme/ICustomTheme';
import IconComponent from '../../components/icon/IconComponent';
import CloseButton from '../../components/close-button/CloseButton';
import {ButtonTabs} from '../../templates/button-tabs/ButtonTabs';
import {NotificationItem} from '../../components/notification-item/NotificationItem';
import {configApi, privateApi} from '../../services/api/ApiConfig';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

type TabContent = {
    component: React.ReactNode;
    tabName: string;
};

type SlideMenuWithButtonNavigationProps = {
    onClose: () => void;
    activeTab: string;
    children: TabContent[];
};

export const SlideMenuWithButtonNavigation = React.forwardRef(
    (props: SlideMenuWithButtonNavigationProps, ref: React.Ref<any>) => {
        console.log('Rendering Slide In Messages');
        const slideAnim = useRef(new Animated.Value(screenWidth)).current; // Start from the right
        const overlayOpacity = useRef(new Animated.Value(0)).current;
        const {theme, notifications, messages} = useUser();
        const userFromContext = useUser().user;
        const {colors} = theme as CustomTheme;

        const tabs = props.children.map((child, index) => ({
            label: child.tabName,
            onPress: () => setCurrentTab(child.tabName),
        }));

        const messagesCount = messages?.filter(
            (x) => x.viewed === false
        )?.length;
        const notificationsCount = notifications?.filter(
            (x) => x.viewed === false
        )?.length;

        const [currentTab, setCurrentTab] = useState(props.activeTab);

        const handleMessagePress = () => {};

        const handleNotificationPress = () => {};

        React.useImperativeHandle(ref, () => ({
            closeMenu,
        }));

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

        const closeMenu = () => {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: screenWidth,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(overlayOpacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: false,
                }),
            ]).start(() => {
                props.onClose();
            });
        };

        useEffect(() => {
          openMenu();
        }, []);

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.overlay, {opacity: overlayOpacity}]}
                    onPress={closeMenu}
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
                    <View
                        style={{
                            ...styles.header,
                            backgroundColor: colors.headerBackground,
                        }}
                    >
                        <ButtonTabs
                            activeTab={currentTab}
                            tabs={tabs}
                        />

<CloseButton onPress={closeMenu} />
                    </View>
                        {props.children.map((child, index) => {
                            if (currentTab === child.tabName) {
                                return (
                                    <View key={index}>{child.component}</View>
                                );
                            }
                            return null;
                        })}
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
        top: 102,
        bottom: 0,
        right: 0,
        zIndex: 9999,
    },
    overlay: {
        flex: 1,
        height: screenHeight,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    menu: {
        width: screenWidth, // Full width
        height: screenHeight,
    },
    emptyNotification: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
    },
    item: {
        marginTop: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
});

export default SlideMenuWithButtonNavigation;
