import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../theme/ICustomTheme';

interface FormInputFieldProps {
  label?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  inputType?: 'text' | 'number';
  secureTextEntry?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
}

export function FormInputField({
  label = "1 portions",
  placeholder = "Enter text",
  onChangeText,
  value,
  onFocus,
  onBlur,
  inputType = 'text',
  secureTextEntry = false,
  // ... other props
}: FormInputFieldProps) {
  const { colors } = useTheme() as CustomTheme;
  const keyboardType = inputType === 'number' ? 'numeric' : 'default';

  return (
    <View style={styles.root}>
    <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={{ ...styles.input, color: colors.text }}
          placeholder={placeholder}
          placeholderTextColor={colors.text}
          onChangeText={onChangeText}
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 67
  },
  container: {
    flex: 1,
    width: '100%'
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 6,
    height: 46, 
  },
  input: {
    fontSize: 14,
    padding: 10, 
    flex: 1, 
  },
  label: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 21, 
    marginBottom: 5, 
  },
});

export default FormInputField;