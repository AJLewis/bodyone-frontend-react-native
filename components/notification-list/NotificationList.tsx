import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NotificationItem } from '../notification-item/NotificationItem';
import { INotification, useUser } from '../../contexts/UserContext';
import { CustomTheme } from 'theme/ICustomTheme';

export type NotificationListItem = {
    subject: string;
    content: any;
    viewed: boolean;
};

type NotificationsListProps = {
    notifications: NotificationListItem[];
    onPress?: () => void;
};

const NotificationsList: React.FC<NotificationsListProps> = ({ notifications, onPress }) => {
    const {theme} = useUser();
    const {colors} = theme as CustomTheme;
    
    return (
        <>
            {notifications && notifications.length > 0 ? (
                notifications.map((notifications, index) => (
                    <View style={styles.item} key={index}>
                        <NotificationItem
                            onPress={onPress}
                            title={notifications.subject}
                            content={notifications.content}
                            viewed={notifications.viewed}
                            iconLibrary={'FontAwesome'}
                            iconName={!notifications.viewed ? 'envelope' : 'envelope-open'}
                        />
                    </View>
                ))
            ) : (
                <View style={styles.emptyNotification}>
                    <Text style={{ color: colors.text }}>
                        No data to display
                    </Text>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    item: {
        marginTop: 5,
    },
    emptyNotification: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
    },
});

export default NotificationsList;