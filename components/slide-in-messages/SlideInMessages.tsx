// import React, {useRef, useEffect, useState} from 'react';
// import {
//     View,
//     Animated,
//     StyleSheet,
//     Dimensions,
//     TouchableOpacity,
//     ScrollView,
//     Text,
// } from 'react-native';
// import {INotification, useUser} from '../../contexts/UserContext';
// import {CustomTheme} from '../../theme/ICustomTheme';
// import IconComponent from '../icon/IconComponent';
// import CloseButton from '../close-button/CloseButton';
// import {ButtonTabs} from '../../templates/button-tabs/ButtonTabs';
// import {NotificationItem} from '../../components/notification-item/NotificationItem';
// import {configApi, privateApi} from '../../services/api/ApiConfig';
// import NotificationsList, { NotificationListItem } from '../../components/notification-list/NotificationList';

// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// type SlideInMessagesProps = {
//     onClose: () => void;
//     activeTab: string; // This will be either 'Messages' or 'Notifications'
// };

// const convertToNotification = (notif: INotification): NotificationListItem => {
//     const date = typeof notif.date === 'string' ? new Date(notif.date) : notif.date;
//     return {
//         subject: notif.content,
//         content: date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit',
//         }),
//         viewed: notif.viewed
//     };
// }

// export const SlideInMessages = React.forwardRef(
//     (props: SlideInMessagesProps, ref: React.Ref<any>) => {
//         console.log('Rendering Slide In Messages');
//         const slideAnim = useRef(new Animated.Value(screenWidth)).current; // Start from the right
//         const overlayOpacity = useRef(new Animated.Value(0)).current;
//         const {theme, notifications, messages} = useUser();
//         const {colors} = theme as CustomTheme;
//         const userFromContext = useUser().user;
//         const convertedNotifications: NotificationListItem[] = notifications.map(convertToNotification);
//         const messagesCount = messages?.filter(
//             (x) => x.viewed === false
//         )?.length;
//         const notificationsCount = notifications?.filter(
//             (x) => x.viewed === false
//         )?.length;

//         const [currentTab, setCurrentTab] = useState(props.activeTab);

//         const handleMessagePress = () => {};

//         const handleNotificationPress = () => {};

//         React.useImperativeHandle(ref, () => ({
//             closeMessages,
//         }));

//         const openMessages = () => {
//             Animated.parallel([
//                 Animated.timing(slideAnim, {
//                     toValue: 0,
//                     duration: 300,
//                     useNativeDriver: false,
//                 }),
//                 Animated.timing(overlayOpacity, {
//                     toValue: 0.3,
//                     duration: 300,
//                     useNativeDriver: false,
//                 }),
//             ]).start();
//         };

//         const closeMessages = () => {
//             Animated.parallel([
//                 Animated.timing(slideAnim, {
//                     toValue: screenWidth,
//                     duration: 300,
//                     useNativeDriver: false,
//                 }),
//                 Animated.timing(overlayOpacity, {
//                     toValue: 0,
//                     duration: 300,
//                     useNativeDriver: false,
//                 }),
//             ]).start(() => {
//                 props.onClose();
//             });
//         };

//         useEffect(() => {
//             openMessages();
//         }, []);

//         return (
//             <View style={styles.container}>
//                 <TouchableOpacity
//                     style={[styles.overlay, {opacity: overlayOpacity}]}
//                     onPress={closeMessages}
//                 />
//                 <Animated.View
//                     style={[
//                         styles.menu,
//                         {
//                             transform: [{translateX: slideAnim}],
//                             backgroundColor: colors.background,
//                         },
//                     ]}
//                 >
//                     <View
//                         style={{
//                             ...styles.header,
//                             backgroundColor: colors.headerBackground,
//                         }}
//                     >
//                         <ButtonTabs
//                             activeTab={currentTab}
//                             tabs={[
//                                 {
//                                     count: messagesCount,
//                                     label: 'Messages',
//                                     onPress: () => setCurrentTab('Messages'),
//                                 },
//                                 {
//                                     count: notificationsCount,
//                                     label: 'Notifications',
//                                     onPress: () =>
//                                         setCurrentTab('Notifications'),
//                                 },
//                             ]}
//                         />
//                     {currentTab === 'Messages' ? (
//                         <NotificationsList
//                             notifications={messages}
//                             colors={colors}
//                             onPress={handleMessagePress}
//                         />
//                     ) : (
//                         <NotificationsList 
//                         notifications={convertedNotifications} 
//                         colors={colors} 
//                         onPress={handleNotificationPress} 
//                     />
//                     )}
//                 </Animated.View>
//             </View>
//         );
//     }
// );

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         position: 'absolute',
//         left: 0,
//         top: 102,
//         bottom: 0,
//         right: 0,
//         zIndex: 9999,
//     },
//     overlay: {
//         flex: 1,
//         height: screenHeight,
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         bottom: 0,
//         right: 0,
//     },
//     menu: {
//         width: screenWidth, // Full width
//         height: screenHeight,
//     },
//     emptyNotification: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 12,
//     },
//     item: {
//         marginTop: 5,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 20,
//         paddingLeft: 20,
//         paddingTop: 10,
//         paddingBottom: 20,
//     },
// });

// export default SlideInMessages;
