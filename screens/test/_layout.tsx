import React from 'react';
import { StyleSheet, Text, Pressable, Animated, View, useColorScheme } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../theme/ICustomTheme';
import NavigateByPath from '../../utils/NavigateByPath';

interface ReusableScreenProps {
    title: string;
    message: string;
    link: string;
}

const ReusableScreen: React.FC<ReusableScreenProps> = ({ title, message, link }) => {
    const navigation = useNavigation();
    const opacity = new Animated.Value(1);
    const colorScheme = useColorScheme();
    const { colors } = useTheme() as CustomTheme;


    return (
        <Animated.View style={{ ...styles.container, opacity: 1 }}>
            {/* @ts-ignore */}
            <Pressable onPress={() => NavigateByPath(navigation, link)}>
                <Text style={{...styles.title, color: colors.text}}>{title}</Text>
                <Text style={{color: colors.text}}>{message}</Text>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
});

export default ReusableScreen;