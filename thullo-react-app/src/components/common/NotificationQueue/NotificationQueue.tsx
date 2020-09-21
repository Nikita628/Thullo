import React from 'react';
import { useSelector } from "react-redux";

import { NotificationType } from '../../../common/data';
import { AppState } from '../../../state';
import css from './NotificationQueue.module.css';

interface NotificationQueueProps {

}

const NotificationQueue = (props: NotificationQueueProps) => {
    const notifications = useSelector((state: AppState) => state.common.notifications);

    return (
        <div className={css.notificationQueue}>
            {
                notifications.map((n, i) => {
                    return (
                        <div key={i} className={css.notification + " " + getNotificationClassName(n.type)}>
                            <h4>{getHeader(n.type)}</h4>
                            <p className="mb-0">{n.message}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}

const getNotificationClassName = (type: NotificationType) => {
    switch (type) {
        case NotificationType.error: return css.notificationError;
        case NotificationType.success: return css.notificationSuccess;
        case NotificationType.warning: return css.notificationWarning;
        default: return "";
    }
}

const getHeader = (type: NotificationType) => {
    switch (type) {
        case NotificationType.error: return "Error";
        case NotificationType.success: return "Success";
        case NotificationType.warning: return "Warning";
        default: return "";
    }
}

export default NotificationQueue;