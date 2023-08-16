import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';

type PillProps = {
  iconName: any;
  text: string;
  textColor: string;
  backgroundColor: string;
  textSize: number;
  iconLibrary: string
};

const Pill: React.FC<PillProps> = ({
  iconName,
  text,
  textColor,
  backgroundColor,
  textSize,
  iconLibrary,
}) => {
  
  const renderIcon = () => {
    switch (iconLibrary) {
      case 'FontAwesome':
        return <FontAwesome name={iconName} size={textSize} color={textColor} />;
      case 'SimpleLineIcons':
        return <SimpleLineIcons name={iconName} size={textSize} color={textColor} />;
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* @ts-ignore */}
      {renderIcon()}
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
    paddingHorizontal:5,
    paddingVertical:3,
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 2
  },
});

export default Pill;
