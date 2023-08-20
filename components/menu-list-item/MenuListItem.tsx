import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import IconComponent from '../icon/IconComponent'; // Update the path accordingly
import NavigateByPath from '../../utils/NavigateByPath';

type MenuListItemProps = {
  navigation: any;
  link: string,
  backgroundColor?: string;
  fontColor: string;
  text: string;
  iconName: any;
  library: any;
  hideHorizontalLine?: boolean;
};

export const MenuListItem: React.FC<MenuListItemProps> = ({
  navigation,
  link,
  backgroundColor,
  fontColor,
  text,
  iconName,
  library,
  hideHorizontalLine = false
}) => {
  return (
    <TouchableOpacity onPress={() => NavigateByPath(navigation, link)}>
      <View style={[styles.root, backgroundColor ? { backgroundColor } : {}]} >
        <IconComponent library={library} name={iconName} size={18} color={fontColor} style={styles.icon} />
        <Text style={[styles.text, { color: fontColor }]}>{text}</Text>
        {!backgroundColor && !hideHorizontalLine && <View style={styles.horizontalRule} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 17
  },
  icon: {
    width: 40,
    textAlign: 'center',
  },
  text: {
    marginLeft:10,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 16,
  },
  horizontalRule: {
    borderBottomColor: '#09324D',
    borderBottomWidth: 1,
    marginTop: 5,
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 0,
  },
});

export default MenuListItem;