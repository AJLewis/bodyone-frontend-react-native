import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../theme/ICustomTheme';

interface FormCheckboxFieldProps {
  label?: string;
  isChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

export function FormCheckboxField({
  label = "Option",
  isChecked = false,
  onToggle,
}: FormCheckboxFieldProps) {
  const { colors } = useTheme() as CustomTheme;

  const handleToggle = () => {
    onToggle && onToggle(!isChecked);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={handleToggle} style={styles.container}>
        <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
          
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 28,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#96095E',
  },
  label: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 21,
    marginRight: 10,
  },
});

export default FormCheckboxField;
