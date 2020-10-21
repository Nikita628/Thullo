import React from 'react';
import { useSelector } from "react-redux";

import { BaseProps } from '../../../common/data';
import { AppState } from '../../../state';
import Notification from "./Notification/Notification";
import css from './NotificationQueue.module.css';

interface NotificationQueueProps extends BaseProps {
}

const NotificationQueue = (props: NotificationQueueProps) => {
    const notifications = useSelector((state: AppState) => state.common.notifications);

    return (
        <div className={css.notificationQueue}>
            {notifications.map(n => <Notification key={n.guid} notification={n} />)}
        </div>
    );
}

export default NotificationQueue;