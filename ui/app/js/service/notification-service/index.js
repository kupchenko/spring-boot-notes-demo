import {message} from "antd";

export default class NotificationService {
    static notifyAfterResponse(messageContent, notification) {
        const key = notification.key;
        switch (notification.type) {
            case 'success': {
                message.success({content: messageContent, key, duration: 2});
                break;
            }
            case 'error': {
                message.error({content: messageContent, key, duration: 2});
                break;
            }
        }
    }
    static loading(messageContent, key) {
        message.loading({content: messageContent, key});
    }

}
