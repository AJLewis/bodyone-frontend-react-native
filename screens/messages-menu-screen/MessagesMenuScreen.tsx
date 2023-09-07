import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import SlideMenuWithButtonNavigation from '../../templates/slide-in-with-button-navigation/SlideMenuWithButtonNavigation';
import { useMenu } from '../../contexts/UseMenuContext';
import NotificationsList, { NotificationListItem } from '../../components/notification-list/NotificationList';
import { useUser } from '../../contexts/UserContext';
import { NotificationToNotification } from '../../utils/converters/NotificationToNotification';

const MessagesMenuScreen = () => {
  const slideNotificationsMenuRef = useRef<{ closeMenu: () => void } | null>(null);
  const {setNotificationsMenuVisible} = useMenu();
  const { messages, notifications } = useUser();
  const handleMessagePress = () => {};
  const convertedNotifications: NotificationListItem[] = notifications?.map( NotificationToNotification );
  const handleNotificationPress = () => {};
  const messagesChildren = [
    {
        component: (
            <NotificationsList
                notifications={messages}
                onPress={handleMessagePress}
            />
        ),
        tabName: 'Messages',
    },
    {
        component: (
            <NotificationsList
                notifications={convertedNotifications}
                onPress={handleNotificationPress}
            />
        ),
        tabName: 'Notifications',
    }];

  return (
    <SlideMenuWithButtonNavigation
      ref={slideNotificationsMenuRef}
      activeTab="Messages"
      onClose={() => setNotificationsMenuVisible(false)}
      children={messagesChildren}
    />
  );
};

export default MessagesMenuScreen;