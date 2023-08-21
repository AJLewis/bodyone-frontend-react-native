import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../theme/ICustomTheme';
import { useUser } from '../../contexts/UserContext';

export interface ButtonProps {
  type: ButtonType;
  color?: ButtonColor;
  label?: string;
  onPress?: () => void;
  size?: ButtonSize,
  width?: ButtonWidth;
}

export enum ButtonSize {
  Large = 'Large',
  Default = 'Default',
  Small = 'Small',
}

export enum ButtonWidth {
  Full = 'Full',
  Content = 'Content',
}

export enum ButtonType {
  Fill = 'Fill',
  Outline = 'Outline',
  Selected = 'Selected',
  Disabled = 'Disabled',
}

export enum ButtonColor {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

export function Button({ type, color = ButtonColor.Primary, label, onPress, size = ButtonSize.Default, width = ButtonWidth.Full }: ButtonProps) {
  const { theme } = useUser();
  const { colors } = theme as CustomTheme;

  const buttonSizeStyles = {
    [ButtonSize.Large]: {
      container: { height: 60, paddingHorizontal:20 },
      label: { fontSize: 24 },
    },
    [ButtonSize.Default]: {
      container: { height: 56, paddingHorizontal:20 },
      label: { fontSize: 20 },
    },
    [ButtonSize.Small]: {
      container: { height: 40, paddingHorizontal:20 },
      label: { fontSize: 16 },
    },
  };

  const buttonWidthStyles = {
    [ButtonWidth.Full]: {
      width: '100%',
    },
    [ButtonWidth.Content]: {
      paddingHorizontal: 20,
    },
  };

  const buttonStyles = {
    container: [
      styles.buttonContainer,
      buttonSizeStyles[size].container,
      buttonWidthStyles[width],
      type === ButtonType.Outline && styles.buttonOutline,
      type === ButtonType.Fill && { backgroundColor: color === ButtonColor.Primary ? colors.btnPrimary : colors.btnSecondary },
      type === ButtonType.Selected && { backgroundColor: color === ButtonColor.Primary ? colors.btnPrimary : colors.btnSecondary },
      type === ButtonType.Disabled && { backgroundColor: colors.btnDisabled },
    ],
    label: [
      styles.label,
      buttonSizeStyles[size].label,
      type === ButtonType.Fill && { color: 'white' },
      type === ButtonType.Outline && { color: color === ButtonColor.Primary ? colors.btnPrimary : colors.btnSecondary },
      type === ButtonType.Disabled && { color: colors.btnDisabled },
    ],
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={buttonStyles.container} onPress={onPress}>
      <Text style={buttonStyles.label}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#098896', // This can be replaced with a theme color if needed
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 20,
    fontWeight: '400',
  },
});