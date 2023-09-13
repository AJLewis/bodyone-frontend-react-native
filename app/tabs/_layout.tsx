import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Stack, Tabs, useNavigation} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import {Pressable, View, useColorScheme} from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import Colors from '../../constants/Colors';
import {useTheme} from '@react-navigation/native';
import {CustomTheme} from 'theme/ICustomTheme';
import React from 'react';
import handleTabPress from '../../utils/HandleTabPress';
import {useUser} from '../../contexts/UserContext';
import IconComponent, { IconLibraryType } from '../../components/icon/IconComponent';
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: string;
    library: IconLibraryType;
    color: string;
    size?: number;
}) {
    return (
        <IconComponent
            size={props.size ? props.size : 23}
            style={{marginBottom: -10}}
            {...props}
        />
    );
}

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const {theme} = useUser();
    const {colors} = theme as CustomTheme;
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');

    const navigation = useNavigation();
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarInactiveTintColor: colors.text,
                    tabBarActiveTintColor: colors.text,
                    tabBarActiveBackgroundColor: colors.tabSelected,
                    tabBarStyle: {
                        height: 70,
                        justifyContent: 'center',
                        borderTopWidth: 1,
                        borderTopColor: colors.tabBorder,
                        backgroundColor: colors.tabsBackground,
                    },
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        fontSize: 12,
                        color: colors.text,
                        paddingBottom: 12,
                    },
                    headerStyle: {
                        backgroundColor: colors?.tabsBackground,
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({color}) => (
                            <TabBarIcon
                                name="home"
                                library='Octicons'
                                size={22}
                                color={color}
                            />
                        ),
                        headerRight: () => (
                            <Link
                                href="/modal"
                                asChild
                            >
                                <Pressable>
                                    {({pressed}) => (
                                        <FontAwesome
                                            name="info-circle"
                                            size={25}
                                            color={
                                                Colors[colorScheme ?? 'light']
                                                    .text
                                            }
                                            style={{
                                                marginRight: 15,
                                                opacity: pressed ? 0.5 : 1,
                                            }}
                                        />
                                    )}
                                </Pressable>
                            </Link>
                        ),
                        headerShown: false,
                    }}
                    listeners={() => ({
                        tabPress: (e: any) => {
                            e.preventDefault();
                            handleTabPress(
                                'index',
                                navigation,
                                ['index', 'test'],
                                'index',
                                'index'
                            );
                        },
                    })}
                />
                <Tabs.Screen
                    name="health"
                    options={{
                        title: 'Health',
                        tabBarIcon: ({color}) => (
                            <TabBarIcon
                                library='FontAwesome'
                                name="heartbeat"
                                color={color}
                                size={22}
                            />
                        ),
                        headerShown: false,
                    }}
                    listeners={() => ({
                        tabPress: (e: any) => {
                            e.preventDefault();
                            handleTabPress(
                                'health',
                                navigation,
                                ['index', 'test'],
                                'health',
                                'index'
                            );
                        },
                    })}
                />
                <Tabs.Screen
                    name="add"
                    options={{
                        title: '', // Remove the title
                        tabBarLabelStyle: {
                            paddingBottom: 0, // Override the paddingBottom for this specific tab
                        },
                        tabBarIcon: ({color, focused}) => (
                            <AntDesign
                                name="plus"
                                size={50}
                                color={color}
                            />
                        ),
                        tabBarButton: (props) => (
                            <Pressable
                                {...props}
                                style={({pressed}) => ({
                                    marginTop: -5,
                                    height: 75,
                                    borderTopLeftRadius: 5,
                                    borderTopRightRadius: 5,
                                    backgroundColor: props.accessibilityState
                                        ?.selected
                                        ? colors.tabSelected
                                        : colors.highlightedTab,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                    paddingTop: 13,
                                })}
                            />
                        ),
                        headerShown: false,
                    }}
                    listeners={() => ({
                        tabPress: (e: any) => {
                            e.preventDefault();
                            handleTabPress(
                                'add',
                                navigation,
                                ['index', 'test'],
                                'add',
                                'index'
                            );
                        },
                    })}
                />
                <Tabs.Screen
                    name="coach"
                    options={{
                        title: 'Coach',
                        tabBarIcon: ({color}) => (
                            <TabBarIcon
                                name="user"
                                library='Feather'
                                size={24}
                                color={color}
                            />
                        ),
                        headerShown: false,
                    }}
                    listeners={() => ({
                        tabPress: (e: any) => {
                            e.preventDefault();
                            handleTabPress(
                                'coach',
                                navigation,
                                ['index', 'test'],
                                'coach',
                                'index'
                            );
                        },
                    })}
                />
                <Tabs.Screen
                    name="more"
                    options={{
                        title: 'More',
                        tabBarIcon: ({color}) => (
                            <TabBarIcon
                            size={40}
                                library="MaterialIcons"
                                name="more-horiz"
                                color={color}
                            />
                        ),
                        headerShown: false,
                    }}
                    listeners={() => ({
                        tabPress: (e: any) => {
                            e.preventDefault();
                            handleTabPress(
                                'more',
                                navigation,
                                ['index', 'test'],
                                'more',
                                'index'
                            );
                        },
                    })}
                />
            </Tabs>
        </>
    );
}
