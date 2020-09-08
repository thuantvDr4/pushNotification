import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform} from 'react-native';

class NotificationManager {
    configure = (onRegister, onOpenNotification, onNotification, senderID) => {
        // config
        PushNotification.configure({
            onRegister: function (token) {
                onRegister(token);
                console.log('[NotificationManager] onRegister token:', token);
            },
            // (required) Called when a remote is received or opened, or local notification is opened
            onNotification: function (notification) {
                console.log('[NotificationManager] onNotification:', notification);

                if (Platform.OS === 'ios') {
                    if (notification.data.openedInForeground) {
                        notification.userInteraction = true;
                    }
                } else {
                    notification.userInteraction = true;
                }

                if (notification.userInteraction) {
                    onOpenNotification(notification);
                } else {
                    onNotification(notification);
                }
                // process the notification
                // (required) Called when a remote is received or opened, or local notification is opened
                if (Platform.OS === 'ios') {
                    if (!notification.data.openedInForeground) {
                        notification.finish('backgroundFetchResultNoData');
                    }
                } else {
                    notification.finish('backgroundFetchResultNoData');
                }
            },
            // Android only: FCM sender ID
            senderID: 'YOUR GCM SENDER ID',
        });
    };

    // for Android
    _buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            autoCancel: true,
            largeIcon: options.largeIcon || 'ic_launcher',
            smallIcon: options.smallIcon || 'ic_launcher',
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || 'high',
            importance: options.importance || 'high',
            data: data,
        };
    };

    // for IOS
    _buildIOSNotification = (id, title, message, data = {}, options = {}) => {
        return {
            alertAction: options.alertAction || 'view',
            category: options.category || '',
            userInfo: {
                id: id,
                item: data,
            },
        };
    };

    // show Notification
    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /**..android only properties..*/
            ...this._buildAndroidNotification(id, title, message, data, options),

            /**..IOS only properties...*/
            ...this._buildIOSNotification(id, title, message, data, options),

            /**..android && IOS  properties..*/
            title: title || '',
            message: message || '',
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false, // if the notification was opened by the user
        });
    };

    //cancel all local notification
    cancelAllLocalNotification = () => {
        if (Platform.OS === 'ios') {
            PushNotificationIOS.removeAllDeliveredNotifications();
        } else {
            PushNotification.cancelAllLocalNotifications();
        }
    };

    //unregister
    unregister = () => {
        PushNotification.unregister();
    };

    //end
}

export const notificationManager = new NotificationManager();
