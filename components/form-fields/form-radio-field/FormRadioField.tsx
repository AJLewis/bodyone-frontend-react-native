import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../theme/ICustomTheme';

interface FormRadioFieldProps {
  label?: string;
  isSelected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export function FormRadioField({
  label = "Option",
  isSelected = false,
  onSelect,
}: FormRadioFieldProps) {
  const { colors } = useTheme() as CustomTheme;

  const handleSelect = () => {
    onSelect && onSelect(!isSelected);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={handleSelect} style={styles.container}>
        <View style={[styles.radio, isSelected && styles.radioSelected]}>
          {isSelected && <View style={styles.innerCircle} />}
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
  radio: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 12.5, // Half of width/height to make it a circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#96095E',
  },
  innerCircle: {
    width: 15,
    height: 15,
    borderRadius: 7.5, // Half of width/height to make it a circle
    backgroundColor: '#96095E',
  },
  label: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 21,
    marginRight: 10,
  },
});

export default FormRadioField;