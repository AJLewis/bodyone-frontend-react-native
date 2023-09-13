import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import IconComponent from '../icon/IconComponent';

type IconWithCountProps = {
  iconName: any;
  iconLibrary: any
  iconColor: string;
  circleColor: string;
  textColor: string;
  count: number;
  size?: number;
};

const IconWithCount: React.FC<IconWithCountProps> = ({
  iconName,
  iconLibrary,
  iconColor,
  circleColor,
  textColor,
  count,
  size
}) => {
  return (
    <View style={styles.container}>
      <IconComponent
          library={iconLibrary}
          name={iconName}
          size={size ? size : 24}
          color={iconColor}
          style={styles.icon}
                    />
      {count > 0 && (
        <View style={[styles.circle, { backgroundColor: circleColor }]}>
          <Text style={[styles.text, { color: textColor }]}>{count}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    top: -4,
    right: -4,
    padding:3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    maxHeight:20,
    minWidth:20
  },
  icon: {
    marginRight: 5
  },
  text: {
    marginTop:-1,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default IconWithCount;