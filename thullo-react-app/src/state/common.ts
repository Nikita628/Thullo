import { Action } from "../common/data";
import { Notification } from "../models/common";

export interface IRequestedAction<PayloadType = any, CallbackParamType = any> {
    type: string;
    payload?: PayloadType;
    callback?: Action<CallbackParamType>;
}

export interface ISucceededAction<PayloadType = any>{
    type: string;
    payload: PayloadType;
}

export interface IFailedAction {
    type: string;
    errors: string[];
}

export interface IChangeStateAction<PayloadType = any> {
    type: string;
    payload?: PayloadType;
}

export const actionTypes = {
    CreateNotificationsRequested: "common/createNotificationsRequested",
    DequeueNotificationRequested: "common/dequeueNotificationRequested",
    EnqueueNotification: "common/enqueueNotification",
    DequeueNotification: "common/dequeueNotification",
};

export const actionCreators = {
    CreateNotificationsRequested: (messages: string[], type: "error" | "success" | "warning"): IRequestedAction<{messages: string[], type: string}> => ({
        type: actionTypes.CreateNotificationsRequested,
        payload: {
            messages,
            type
        },
    }),
    DequeueNotificationRequested: (): IRequestedAction => ({
        type: actionTypes.DequeueNotificationRequested
    }),
    EnqueueNotification: (notification: Notification): IChangeStateAction<Notification> => ({
        type: actionTypes.EnqueueNotification,
        payload: notification
    }),
    DequeueNotification: (): IChangeStateAction => ({
        type: actionTypes.DequeueNotification
    }),
};

export interface CommonState {
    notifications: Notification[];
}

const initialState: CommonState = {
    notifications: [],
};

export const reducer = (state: CommonState = initialState, action: ISucceededAction & IFailedAction & IChangeStateAction): CommonState => {
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
                notifications: state.notifications.splice(0, 1),
            };
        }
        default:
            return state;
    }
};
