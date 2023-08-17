import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

type IconWithCountProps = {
  iconName: any;
  iconColor: string;
  circleColor: string;
  textColor: string;
  count: number;
};

const IconWithCount: React.FC<IconWithCountProps> = ({
  iconName,
  iconColor,
  circleColor,
  textColor,
  count,
}) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={24} color={iconColor} />
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
    top: -3,
    right: -3,
    padding:3,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    maxHeight:20,
  },
  text: {
    marginTop:-1,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default IconWithCount;