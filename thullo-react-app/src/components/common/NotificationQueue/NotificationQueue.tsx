import React from 'react';
import { useSelector } from "react-redux";
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
                            <h6>{n.type.toUpperCase()}</h6>
                            <p className="mb-0">{n.message}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}

const getNotificationClassName = (type: "error" | "success" | "warning") => {
    switch (type) {
        case "error": return css.notificationError;
        case "success": return css.notificationSuccess;
        case "warning": return css.notificationWarning;
        default: return "";
    }
}

export default NotificationQueue;