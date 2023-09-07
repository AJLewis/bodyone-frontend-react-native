import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import IconComponent, {IconLibraryType} from '../icon/IconComponent';
import {useUser} from '../../contexts/UserContext';
import {CustomTheme} from '../../theme/ICustomTheme';
import { Pressable } from 'react-native/Libraries/Components/Pressable/Pressable';

type NotificationItemProps = {
    title: string;
    content: string;
    viewed: boolean;
    iconLibrary: IconLibraryType;
    iconName: any;
    onPress?: () => void;
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
    title,
    content,
    viewed,
    iconLibrary,
    iconName,
    onPress
}) => {
    const {theme} = useUser();
    const { colors } = theme as CustomTheme;

    const fontWeight = viewed ? '400' : '700';
    const bgColor = viewed ? colors.notificationBackgroundViewed : colors.notificationBackgroundUnviewed;
    const iconBgColor = viewed ? colors.notificationIconBackgroundViewed : colors.notificationIconBackgroundUnviewed;

    return (
      <TouchableOpacity style={[styles.root, { backgroundColor: bgColor }]} onPress={onPress}>
          <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
              <IconComponent name={iconName} library={iconLibrary} size={20} color="#FFF" />
          </View>
          <View style={styles.textContainer}>
              <Text style={[styles.title, { fontFamily: theme.fonts.primary, fontWeight: fontWeight }]}>{title}</Text>
              <Text numberOfLines={1} style={[styles.content, { fontFamily: theme.fonts.primary, fontWeight: fontWeight }]}>{content}</Text>
          </View>
          <View style={[styles.indicator, { backgroundColor: iconBgColor }]} />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 65,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    title: {
        color: '#FFF',
        fontFamily: 'Helvetica Neue',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 3,
    },
    content: {
        color: '#FFF',
        fontFamily: 'Helvetica Neue',
        fontSize: 12,
        paddingRight: 20,
        fontWeight: '700',
    },
    indicator: {
        width: 5,
        height: '100%',
    },
});
