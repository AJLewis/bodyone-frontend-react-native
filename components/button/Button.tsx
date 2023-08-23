import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../theme/ICustomTheme';
import { useUser } from '../../contexts/UserContext';

export interface ButtonProps {
  type: ButtonType;
  color?: ButtonColor | string;
  label?: string;
  onPress?: () => void;
  size?: ButtonSize,
  width?: ButtonWidth;
  count?: number;
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

export function Button({ type, color = ButtonColor.Primary, label, onPress, size = ButtonSize.Default, width = ButtonWidth.Full, count }: ButtonProps) {
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
      type === ButtonType.Outline && {...styles.buttonOutline, borderColor: color === ButtonColor.Primary ? colors.btnPrimary : colors.btnSecondary },
      type === ButtonType.Fill && { backgroundColor: Object.values(ButtonColor).includes(color as ButtonColor) ? (color === ButtonColor.Primary ? colors.btnPrimary : colors.btnSecondary) : color },
      type === ButtonType.Selected && { backgroundColor: color === ButtonColor.Primary ? colors.btnPrimary : colors.btnSecondary },
      type === ButtonType.Disabled && { backgroundColor: colors.btnDisabled },
    ].filter(Boolean),
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
      {count && count > 0 && (
        <View style={[styles.circle, { backgroundColor: colors.greenBackground }]}>
          <Text style={[styles.countText, { color: 'white' }]}>{count}</Text>
        </View>
      )}
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
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 20,
    fontWeight: '400',
  },
  circle: {
    position: 'absolute',
    top: -7,
    right: 3,
    padding: 3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    maxHeight: 20,
    minWidth:20
  },
  countText: {
    marginTop: -1,
    fontSize: 12,
    fontWeight: 'bold',
  },
});