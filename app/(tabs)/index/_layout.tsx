import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text } from 'react-native';
import { Animated } from 'react-native';
import { Link, Slot, Stack } from 'expo-router';

import { useNavigation, useRoute } from '@react-navigation/native';

export default function TabOneScreen() {
    const [opacity] = useState(new Animated.Value(0));
    const navigation = useNavigation();
    const route = useRoute();
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('state', () => {
        console.log('Current route name:', route);
      });
  
      // Return the unsubscribe function to clean up the listener
      return unsubscribe;
    }, [navigation, route]);

    const fadeIn = () => {
      // Reset the opacity to 0
      opacity.setValue(0);

      Animated.timing(opacity, {
          toValue: 1,
          duration: 300, // Duration of the animation, can be adjusted
          useNativeDriver: true,
      }).start();
  };

    useFocusEffect(
      React.useCallback(() => {
          fadeIn();
          return () => {}; // Return a cleanup function if needed
      }, [])
  );

    return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="test" options={{ headerShown: false }} />
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