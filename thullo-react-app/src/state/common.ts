import { NotificationType } from "../common/data";
import { Notification } from "../models/common";

export interface ITypedAction {
    type: string;
}

export interface IPayloadedAction<PayloadType = any> {
    payload: PayloadType;
}

export interface ICallbackAction<CallbackParamType = any> {
    callback: (param?: CallbackParamType) => void;
}

export const actionTypes = {
    CreateNotificationsRequested: "common/createNotificationsRequested",
    DequeueNotificationRequested: "common/dequeueNotificationRequested",
    EnqueueNotification: "common/enqueueNotification",
    DequeueNotification: "common/dequeueNotification",
};

export const actionCreators = {
    CreateNotificationsRequested: (messages: string[], type: NotificationType): IPayloadedAction<{ messages: string[], type: NotificationType }> & ITypedAction => ({
        type: actionTypes.CreateNotificationsRequested,
        payload: {
            messages,
            type
        },
    }),
    DequeueNotificationRequested: (): ITypedAction => ({
        type: actionTypes.DequeueNotificationRequested
    }),
    EnqueueNotification: (notification: Notification): IPayloadedAction<Notification> & ITypedAction => ({
        type: actionTypes.EnqueueNotification,
        payload: notification
    }),
    DequeueNotification: (): ITypedAction => ({
        type: actionTypes.DequeueNotification
    }),
};

export interface CommonState {
    notifications: Notification[];
}

const initialState: CommonState = {
    notifications: [],
};

export const reducer = (state: CommonState = initialState, action: ITypedAction & IPayloadedAction): CommonState => {
    switch (action.type) {
        case actionTypes.EnqueueNotification: {
            const newNotification = action.payload as Notification;
            return {
                ...state,
                notifications: [...state.notifications, newNotification],
            };
        }
        case actionTypes.DequeueNotification: {
            return {
                ...state,
                notifications: state.notifications.filter((_, i) => i > 0),
            };
        }
        default:
            return state;
    }
};
