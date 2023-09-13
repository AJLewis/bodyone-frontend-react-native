import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Modal, FlatList} from 'react-native';
import {useUser} from '../../../contexts/UserContext';
import {CustomTheme} from '../../../theme/ICustomTheme';
import {Picker} from '@react-native-picker/picker';

interface FormMultiselectFieldProps {
    label?: string;
    placeholder?: string;
    options?: {label: string; value: string}[];
    selectedOptions?: string[];
    onOptionsSelect?: (options: string[]) => void;
}

export function FormMultiselectField({
    label = 'Select options',
    placeholder = 'Choose...',
    options = [],
    selectedOptions: propSelectedOptions = [],
    onOptionsSelect,
}: FormMultiselectFieldProps) {
    const {theme} = useUser();
    const {colors} = theme as CustomTheme;
    const [selectedOptions, setSelectedOptions] = useState(propSelectedOptions);
    const [displayedValue, setDisplayedValue] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [tempSelectedOptions, setTempSelectedOptions] = useState<string[]>([]);
  
    useEffect(() => {
      onOptionsSelect && onOptionsSelect(selectedOptions);
      setDisplayedValue(selectedOptions.join(', '));
    }, [selectedOptions]);

    const handleOptionToggle = (value: string) => {
      setTempSelectedOptions((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
    };
  
    const handleModalClose = () => {
      setSelectedOptions(tempSelectedOptions);
      setIsModalVisible(false);
    };

    return (
      <View style={styles.root}>
          <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
          <View style={styles.container}>
              <TouchableOpacity
                  style={[styles.inputContainer, {backgroundColor: colors.fieldBackground}]}
                  onPress={() => setIsModalVisible(true)}
              >
                  <Text style={[styles.input, {color: colors.text}]}>
                      {displayedValue || placeholder}
                  </Text>
              </TouchableOpacity>
      
              <Modal
                  transparent={true}
                  visible={isModalVisible}
                  onRequestClose={handleModalClose}
                  animationType="fade" 
              >
                  <TouchableOpacity style={styles.modalOverlay} onPress={handleModalClose}>
                      <View style={{...styles.modalContent, backgroundColor: colors.fieldBackground}}>
                          <FlatList
                              data={options}
                              keyExtractor={(item) => item.value}
                              renderItem={({ item }) => (
                                  <TouchableOpacity style={styles.options} onPress={() => handleOptionToggle(item.value)}>
                                      <Text style={{...styles.option, color: tempSelectedOptions.includes(item.value) ? colors.btnSecondary : colors.text }}>
                                          {item.label}
                                      </Text>
                                  </TouchableOpacity>
                              )}
                          />
                      </View>
                  </TouchableOpacity>
              </Modal>
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
    height: 50
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    borderRadius: 10, 
    padding: 30, 
    lineHeight:15
  },
  options: {
    padding: 8,
  },
  option: {
    fontSize:16,
    textTransform: 'uppercase',
     fontWeight:'bold'
  }
});

export default FormMultiselectField;
