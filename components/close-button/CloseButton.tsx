import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useUser } from '../../contexts/UserContext';
import { CustomTheme } from '../../theme/ICustomTheme';
import IconComponent from '../icon/IconComponent'; // Update the path accordingly

type CloseButtonProps = {
  onPress?: () => void;
};

export const CloseButton: React.FC<CloseButtonProps> = ({ onPress }) => {
    const { theme } = useUser();
    const { colors } = theme as CustomTheme;

    return (
        <TouchableOpacity style={[styles.container, { borderColor: colors.btnPrimary }]} onPress={onPress}>
            <View style={styles.circle}>
                <IconComponent name="close" library="FontAwesome" size={22} color={colors.btnPrimary} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24, // Half of width/height to make it a circle
        borderWidth: 1,   // Border width for the circle
    },
    circle: {
        marginTop:-3,
        width: 22,
        height: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CloseButton;