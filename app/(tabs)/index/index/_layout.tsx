import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, Animated, View, Button } from 'react-native';
import ReusableScreen from '../../../screens/test/_layout';
import { Link, useFocusEffect, useNavigation } from 'expo-router';
import Home from '../../../screens/home/_layout';

export default function IndexIndex() {

    return (
            <Home />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
