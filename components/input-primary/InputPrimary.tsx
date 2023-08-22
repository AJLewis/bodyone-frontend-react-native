import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../theme/ICustomTheme';
import { useUser } from '../../contexts/UserContext';

interface InputPrimaryProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  secureTextEntry?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  // ... add other TextInput props as needed
}

export function InputPrimary({
  placeholder = "Enter text",
  onChangeText,
  value,
  onFocus,
  onBlur,
  secureTextEntry = false,
  // ... other props
}: InputPrimaryProps) {
  const { colors } = useTheme() as CustomTheme;
  // const { them e } = useUser();
  // const { colors } = theme as CustomTheme;

  return (
    <View style={styles.root}>
      <TextInput
        style={{ ...styles.input, color: colors.text }}
        placeholder={placeholder}
        placeholderTextColor={colors.text}
        onChangeText={onChangeText}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        // ... other TextInput attributes
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 313,
    height: 48,
    borderBottomWidth: 1, // Material design often has an underline for input fields
    borderBottomColor: 'rgba(255, 255, 255, 0.75)', // You can replace this with a theme color if needed
  },
  input: {
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
  },
});

export default InputPrimary;