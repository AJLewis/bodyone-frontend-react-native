import { NotificationListItem } from "../../components/notification-list/NotificationList";
import { INotification } from "../../contexts/UserContext";

  export const NotificationToNotification = (notif: INotification): NotificationListItem => {
    const date =
        typeof notif.date === 'string' ? new Date(notif.date) : notif.date;
    return {
        subject: notif.content,
        content: date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }),
        viewed: notif.viewed,
    };
};