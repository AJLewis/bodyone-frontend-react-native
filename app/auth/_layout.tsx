import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Stack} from 'expo-router';

export default function AuthScreens() {
    return (
        <Stack initialRouteName="login">
            <Stack.Screen
                name="index"
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="register"
                options={{headerShown: false}}
            />
        </Stack>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
