import React from 'react';
import { useSelector } from "react-redux";

import { BaseProps, NotificationType } from '../../../common/data';
import { concatCssClasses } from '../../../common/functionality';
import { AppState } from '../../../state';
import css from './NotificationQueue.module.css';

interface NotificationQueueProps extends BaseProps {
}

const NotificationQueue = (props: NotificationQueueProps) => {
    const notifications = useSelector((state: AppState) => state.common.notifications);

    return (
        <div className={css.notificationQueue}>
            {
                notifications.map((n, i) => {
                    return (
                        <div key={i} className={concatCssClasses(css.notification, getNotificationClassName(n.type))}>
                            <h4>{n.type}</h4>
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

export default NotificationQueue;