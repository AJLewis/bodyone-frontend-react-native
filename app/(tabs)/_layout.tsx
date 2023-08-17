import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Link, Stack, Tabs, useNavigation} from 'expo-router';
import {AntDesign} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import { Pressable, View, useColorScheme, } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import Colors from '../../constants/Colors';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from 'theme/ICustomTheme';
import React from 'react';
import handleTabPress from '../utils/handle-tab-press';
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
    fontSize?: number;
}) {
    return (
        <FontAwesome
            size={props.fontSize ? props.fontSize : 23}
            style={{marginBottom: -10}}
            {...props}
        />
    );
}

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const { colors } = useTheme() as CustomTheme;
    NavigationBar.setVisibilityAsync('hidden');

  
    const navigation = useNavigation();
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarInactiveTintColor: 'white',
                    tabBarActiveTintColor: 'white',
                    tabBarActiveBackgroundColor: '#96095E',
                    tabBarStyle: {
                        height: 70,
                        justifyContent: 'center',
                        borderTopWidth:1,
                        borderTopColor: colors.tabBorder
                    },
                    tabBarLabelStyle: {
                        fontWeight: 'bold',
                        fontSize: 12,
                        color: 'white',
                        paddingBottom: 12,
                    },
                    headerStyle: {
                      backgroundColor: colors?.headerBackground,
                    }
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({color}) => (

                            <TabBarIcon
                                name="home"
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
                        headerShown: false
                    }}
                    listeners={({ route }) => ({
                        tabPress: (e:any) => {
                          e.preventDefault();
                          handleTabPress('index', navigation, ['index', 'test'], 'index', 'index');
                        },
                      })}
                />
                <Tabs.Screen
                    name="health"
                    options={{
                        title: 'Health',
                        tabBarIcon: ({color}) => (
                            <TabBarIcon
                                name="heartbeat"
                                color={color}
                            />
                        ),
                        headerShown: false
                    }}
                    listeners={({ route }) => ({
                        tabPress: (e:any) => {
                          e.preventDefault();
                          handleTabPress('health', navigation, ['index', 'test'], 'health', 'index');
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
                                        ? '#96095E'
                                        : '#098896',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                    paddingTop: 13,
                                })}
                            />
                        ),
                        headerShown: false
                    }}
                    listeners={({ route }) => ({
                        tabPress: (e:any) => {
                          e.preventDefault();
                          handleTabPress('add', navigation, ['index', 'test'], 'add', 'index');
                        },
                      })}
                />
                <Tabs.Screen
                    name="coach"
                    options={{
                        title: 'Coach',
                        tabBarIcon: ({color}) => (
                            <View style={{paddingTop: 8}}>
                                <Feather
                                    name="user"
                                    size={26}
                                    color={color}
                                />
                            </View>
                        ),
                        headerShown: false
                    }}
                    listeners={({ route }) => ({
                        tabPress: (e:any) => {
                          e.preventDefault();
                          handleTabPress('coach', navigation, ['index', 'test'], 'coach', 'index');
                        },
                      })}
                />
                <Tabs.Screen
                    name="more"
                    options={{
                        title: 'More',
                        tabBarIcon: ({color}) => (
                            <TabBarIcon
                                fontSize={30}
                                name="ellipsis-h"
                                color={color}
                            />
                        ),
                        headerShown: false
                    }}
                    listeners={({ route }) => ({
                        tabPress: (e:any) => {
                          e.preventDefault();
                          handleTabPress('more', navigation, ['index', 'test'], 'more', 'index');
                        },
                      })}
                />
            </Tabs>
        </>
    );
}
