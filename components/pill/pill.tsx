import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconComponent from '../icon/IconComponent'; // Update the path accordingly

type PillProps = {
  iconName: any;
  text: string;
  textColor: string;
  backgroundColor: string;
  textSize: number;
  iconLibrary: 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'FontAwesome5' | 'Fontisto' | 'Foundation' | 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'Octicons' | 'SimpleLineIcons' | 'Zocial';
};

const Pill: React.FC<PillProps> = ({
  iconName,
  text,
  textColor,
  backgroundColor,
  textSize,
  iconLibrary,
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <IconComponent library={iconLibrary} name={iconName} size={textSize} color={textColor} />
      <Text style={[styles.text, { color: textColor, fontSize: textSize }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 2
  },
});

export default Pill;