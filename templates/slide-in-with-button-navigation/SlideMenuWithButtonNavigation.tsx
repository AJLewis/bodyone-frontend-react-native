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
        const slideAnim = useRef(new Animated.Value(screenWidth)).current; // Start from the right
        const overlayOpacity = useRef(new Animated.Value(0)).current;
        const {theme} = useUser();
        const {colors} = theme as CustomTheme;
        const tabs = props.children.map((child, index) => ({
            label: child.tabName,
            onPress: () => handleTabPress(child.tabName),
        }));

        const [currentTab, setCurrentTab] = useState(props.activeTab);
        const [isTabPressed, setIsTabPressed] = useState(false);

        const initialActiveTabIndex = props.children.findIndex(
            (child) => child.tabName === props.activeTab
          );

        const [visibleTabs, setVisibleTabs] = useState<number[]>([initialActiveTabIndex]);

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

        const scrollViewRef = useRef<ScrollView>(null);

        const handleTabPress = (tabName: string) => {
            const index = props.children.findIndex(
                (child) => child.tabName === tabName
            );
            const currentIndex = props.children.findIndex(
                (child) => child.tabName === currentTab
            );
        
            setVisibleTabs([index, currentIndex]);

            setCurrentTab(tabName); // Set the current tab here
        setIsTabPressed(true);
            // Determine the direction of the swipe (left or right)
            const direction = index > currentIndex ? -1 : 1;
        
            // Instantly move to a position just off-screen in the determined direction
            scrollViewRef.current?.scrollTo({
                x: index * screenWidth + direction * screenWidth,
                animated: false,
            });
        
            // Use a timeout to then animate the scroll into the correct view
            setTimeout(() => {
                scrollViewRef.current?.scrollTo({
                    x: index * screenWidth,
                    animated: true,
                });
            }, 0);
        };
        
        const handleScroll = (event: any) => {        
            if (isTabPressed) return;

            const newTabIndex = Math.round(
                event.nativeEvent.contentOffset.x / screenWidth
            );
        
            const index = props.children.findIndex(
                (child) => child.tabName === props.children[newTabIndex].tabName
            );
            const currentIndex = props.children.findIndex(
                (child) => child.tabName === currentTab
            );
        
            setVisibleTabs(Array.from({ length: tabs.length }, (_, i) => i)); // Set all tabs to be visible on swipe
        
            if (!visibleTabs.includes(newTabIndex)) {
                return;
            }
        
            setCurrentTab(props.children[newTabIndex].tabName);
        };

        const handleScrollEnd = () => {
            setIsTabPressed(false);
            setVisibleTabs(Array.from({ length: tabs.length }, (_, i) => i));
        };

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
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        onMomentumScrollEnd={handleScrollEnd} 
                    >
                        {props.children.map((child, index) => (
                            <View
                                style={{flex: 1, width: screenWidth}}
                                key={index}
                            >
                                {visibleTabs.includes(index)
                                    ? child.component
                                    : null}
                            </View>
                        ))}
                    </ScrollView>
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
