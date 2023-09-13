import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {CustomTheme} from '../../../theme/ICustomTheme';
import {Picker} from '@react-native-picker/picker';
import { useUser } from '../../../contexts/UserContext';

interface FormDropdownFieldProps {
    label?: string;
    placeholder?: string;
    options?: {label: string; value: any}[];
    selectedOption?: any;
    onOptionSelect?: (option: any) => void;
}

export function FormDropdownField({
    label = 'Select an option',
    placeholder = 'Choose...',
    options = [],
    selectedOption: propSelectedOption,
    onOptionSelect,
}: FormDropdownFieldProps) {
  const { theme } = useUser();
  const { colors } = theme as CustomTheme;
    const [selectedOption, setSelectedOption] = useState(propSelectedOption);
    return (
      <View style={styles.root}>
          <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
          <View style={styles.container}>
              <View style={[styles.inputContainer, {backgroundColor: colors.fieldBackground}]}>
                  <Picker
                      selectedValue={selectedOption}
                      onValueChange={(itemValue) => {
                          setSelectedOption(itemValue);
                          onOptionSelect && onOptionSelect(itemValue);
                      }}
                      style={[styles.input, {color: colors.text}]}
                      dropdownIconColor={colors.text}
                  >
                      <Picker.Item
                          label={placeholder}
                          value={null}
                          color={colors.lightFontFade} // Set a placeholder color from the theme
                      />
                      {options.map((option, index) => (
                          <Picker.Item
                              key={index}
                              label={String(option.label)}
                              value={String(option.value)}
                              color={colors.text} // Set an option color from the theme
                          />
                      ))}
                  </Picker>
              </View>
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
      width: '100%',
  },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 6,
  },
  input: {
      fontSize: 14,
      padding: 10,
      flex: 1,
  },
  label: {
      fontSize: 12,
      lineHeight: 21,
      marginBottom: 5,
  },
});

export default FormDropdownField;
