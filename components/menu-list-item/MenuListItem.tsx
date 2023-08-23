import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import IconComponent from '../icon/IconComponent'; // Update the path accordingly
import NavigateByPath from '../../utils/NavigateByPath';
import { useUser } from '../../contexts/UserContext';
import { CustomTheme } from '../../theme/ICustomTheme';

type MenuListItemProps = {
  navigation: any;
  link?: string,
  backgroundColor?: string;
  fontColor: string;
  text: string;
  iconName: any;
  library: any;
  hideHorizontalLine?: boolean;
  dividerColor: string;
  onPress?: () => void;
};

export const MenuListItem: React.FC<MenuListItemProps> = ({
  navigation,
  link,
  backgroundColor,
  fontColor,
  text,
  iconName,
  library,
  hideHorizontalLine = false,
  dividerColor,
  onPress
}) => {
  const { theme } = useUser();
  const { colors } = theme as CustomTheme;
  return (
    <TouchableOpacity onPress={onPress && !link ? onPress : () => NavigateByPath(navigation, link as string)}>
      <View style={[styles.root, backgroundColor ? { backgroundColor } : {}]} >
        <View style={{...styles.iconContainer, backgroundColor: colors.primary}}>
          <IconComponent library={library} name={iconName} size={12} color={fontColor} style={styles.icon} />
        </View>
       
        <Text style={[styles.text, { color: fontColor }]}>{text}</Text>
        {!backgroundColor && !hideHorizontalLine && <View style={{...styles.horizontalRule, borderBottomColor: dividerColor}} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 35,
    paddingVertical: 9
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 30,
    height:30
  },
  icon: {
    width: 40,
    textAlign: 'center',
  },
  text: {
    marginTop:2,
    marginLeft:15,
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16,
  },
  horizontalRule: {
    borderBottomWidth: 1,
    marginTop: 5,
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 0,
  },
});

export default MenuListItem;