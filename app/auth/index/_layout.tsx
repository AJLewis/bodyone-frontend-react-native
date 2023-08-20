import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated, View } from 'react-native';
import { useFocusEffect, useNavigation } from 'expo-router';
import LoginScreen from '../../../screens/login/LoginScreen';

export default function AddIndex() {
    const opacity = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        opacity.setValue(0); // Reset the opacity to 0 before starting the animation
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    useFocusEffect(
        React.useCallback(() => {
            fadeIn();
        }, [])
    );

    return (
        <Animated.View style={{ ...styles.container, opacity }}>
            <LoginScreen/> 
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});