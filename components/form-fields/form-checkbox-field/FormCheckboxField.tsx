import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../theme/ICustomTheme';
import { useUser } from '../../../contexts/UserContext';

interface FormCheckboxFieldProps {
  label?: string;
  isChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

function FormCheckboxField({
  label = "Option",
  isChecked = false,
  onToggle,
}: FormCheckboxFieldProps) {

  const { theme } = useUser();
  const { colors } = theme as CustomTheme;

  const handleToggle = () => {
    console.log('isChecked', isChecked);
    onToggle && onToggle(!isChecked);
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={handleToggle} style={styles.container}>
      
      <View style={[
        styles.checkbox, 
        { borderColor: colors.lightFontFade }, 
        isChecked && { backgroundColor: colors.btnSecondary }
      ]} />
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingVertical:4,
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
  },
  container: {

    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    lineHeight: 21,
    marginLeft: 10,
  },
});

export default FormCheckboxField;