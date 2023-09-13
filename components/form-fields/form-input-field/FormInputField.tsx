import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../theme/ICustomTheme';
import { useUser } from '../../../contexts/UserContext';

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

  const { theme } = useUser();
  const { colors } = theme as CustomTheme;
  const keyboardType = inputType === 'number' ? 'numeric' : 'default';

  return (
    <View style={styles.root}>
      <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
      <View style={styles.container}>
        <View style={[styles.inputContainer, {backgroundColor: colors.fieldBackground}]}>
          <TextInput
            style={[styles.input, {color: colors.text}]}
            placeholder={placeholder}
            placeholderTextColor={colors.lightFontFade}
            onChangeText={onChangeText}
            value={value?.toString()}
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
    borderRadius: 6,
    height: 46, 
  },
  input: {
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 10, 
    flex: 1, 
  },
  label: {
    fontSize: 12,
    lineHeight: 21, 
    marginBottom: 5, 
  },
});

export default FormInputField;