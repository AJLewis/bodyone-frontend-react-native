import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Animated } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../../theme/ICustomTheme';
import { useUser } from '../../../contexts/UserContext';

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
  const { theme } = useUser();
  const { colors } = theme as CustomTheme;
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
  <Text style={[styles.label, {color: colors.text}]}>{label}</Text>
  <TouchableOpacity onPress={handleToggle} style={[styles.toggleContainer, {borderColor: colors.lightFontFade}]}>
    <View style={[styles.toggle, {backgroundColor: isToggled ? colors.btnSecondary : 'transparent'}]}>
      <Animated.View style={[styles.handle, {backgroundColor: '#FFF', transform: [{ translateX: toggleAnim }]}]} />
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
    fontSize: 12,
    lineHeight: 21,
    marginRight: 10,
    flex: 1,
  },
  toggleContainer: {
    width: 50,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 1,
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
  handle: {
    width: 21,
    height: 21,
    borderRadius: 10.5,
  },
});
export default FormToggleField;