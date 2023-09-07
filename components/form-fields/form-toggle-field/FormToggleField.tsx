import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../theme/ICustomTheme';

interface FormToggleFieldProps {
  label?: string;
  isToggled?: boolean;
  onToggle?: (toggled: boolean) => void;
}

export function FormToggleField({
  label = "Option",
  isToggled = false,
  onToggle,
}: FormToggleFieldProps) {
  const { colors } = useTheme() as CustomTheme;
  const toggleAnim = new Animated.Value(isToggled ? 23 : -1);

  const handleToggle = () => {
    Animated.timing(toggleAnim, {
      toValue: isToggled ? -1 : 23,
      duration: 200,
      useNativeDriver: false,
    }).start();

    onToggle && onToggle(!isToggled);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={handleToggle} style={styles.toggleContainer}>
        <View style={[styles.toggle, isToggled && styles.toggleActive]}>
          <Animated.View style={[styles.handle, { transform: [{ translateX: toggleAnim }] }]} />
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
  label: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 21,
    marginRight: 10,
  },
  toggleContainer: {
    width: 50,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1,
    borderColor: '#FFF',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  toggle: {
    flex: 1,
    borderRadius: 12.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  toggleActive: {
    borderRadius: 12.5,
    backgroundColor: '#96095E',
  },
  handle: {
    width: 21,
    height: 21,
    borderRadius: 10.5,
    backgroundColor: '#FFF',
  },
});

export default FormToggleField;