import React, { useRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import ReusableScreen from '../../../../screens/test/_layout';
import { useFocusEffect } from 'expo-router';

export default function MoreIndex() {
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
            <ReusableScreen title="More - Home" message="Click to test navigation" link="test" /> 
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
