import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import IconComponent from '../icon/IconComponent'; // Update the path accordingly

type PillProps = {
  iconName: any;
  text: string;
  textColor: string;
  backgroundColor: string;
  textSize: number;
  paddingVertical?: number,
  paddingHorizontal?: number,
  iconLibrary: 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome' | 'FontAwesome5' | 'Fontisto' | 'Foundation' | 'Ionicons' | 'MaterialCommunityIcons' | 'MaterialIcons' | 'Octicons' | 'SimpleLineIcons' | 'Zocial';
};

const Pill: React.FC<PillProps> = ({
  iconName,
  text,
  textColor,
  backgroundColor,
  textSize,
  iconLibrary,
  paddingVertical,
  paddingHorizontal
}) => {
  return (
    <View style={{...styles.container, backgroundColor: backgroundColor, paddingVertical: paddingVertical ? paddingVertical : 3, paddingHorizontal: paddingHorizontal ? paddingHorizontal : 5, }}>
      <IconComponent library={iconLibrary} name={iconName} size={textSize - 2} color={textColor} />
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
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 2,
    marginTop:-1
  },
});

export default Pill;