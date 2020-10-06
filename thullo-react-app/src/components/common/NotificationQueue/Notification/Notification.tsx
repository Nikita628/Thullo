import React from 'react';

import { NotificationType } from '../../../../common/data';
import { BaseProps } from '../../../../common/data';
import { concatCssClasses } from '../../../../common/functionality';
import css from './Notification.module.css';
import { Notification as NotificationModel } from '../../../../models/common';

interface NotificationProps extends BaseProps {
    notification: NotificationModel;
}

const Notification = (props: NotificationProps) => {
    const notificationCssClass = concatCssClasses(
        css.notification,
        getNotificationClassName(props.notification.type),
        props.notification.isExpiring ? css.expiring : null
    );

    return (
        <div key={props.notification.guid} className={notificationCssClass}>
            <h4>{props.notification.type}</h4>
            <p className="mb-0">{props.notification.message}</p>
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

export default Notification;