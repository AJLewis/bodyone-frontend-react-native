import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../theme/ICustomTheme';
import IconComponent from '../../icon/IconComponent';

interface FormMultiselectFieldProps {
  label?: string;
  placeholder?: string;
  options?: string[];
  selectedOptions?: string[];
  onOptionsSelect?: (options: string[]) => void;
}

export function FormMultiselectField({
  label = "Select options",
  placeholder = "Choose...",
  options = [],
  selectedOptions: propSelectedOptions = [],
  onOptionsSelect,
}: FormMultiselectFieldProps) {
  const { colors } = useTheme() as CustomTheme;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(propSelectedOptions);

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(prev => prev.filter(item => item !== option));
    } else {
      setSelectedOptions(prev => [...prev, option]);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.inputContainer}>
          <TextInput
            style={{ ...styles.input, color: colors.text }}
            placeholder={placeholder}
            placeholderTextColor={colors.text}
            value={selectedOptions.join(', ')}
            editable={false}
          />
          <View style={{ marginRight:10 }}>
            <IconComponent name="caretdown" library="AntDesign" size={16} color={colors.text} />
          </View>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.dropdown}>
            {options.map(option => (
              <TouchableOpacity key={option} onPress={() => {
                toggleOption(option);
                onOptionsSelect && onOptionsSelect(selectedOptions);
              }}>
                <Text style={styles.option}>
                  {selectedOptions.includes(option) ? '✓ ' : ''}
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 70,
  },
  container: {
    flex: 1,
    width: '100%'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.10)',
    borderRadius: 6,
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
  dropdown: {
    marginTop: 5,
    borderRadius: 6,
    zIndex: 999,
    backgroundColor: '#193141',
  },
  option: {
    padding: 10,
    color: '#FFF',
  },
});

export default FormMultiselectField;