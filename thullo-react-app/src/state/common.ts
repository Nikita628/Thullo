import { NotificationType } from "../common/data";
import { ApiPageResponse, ApiResponse, Notification, PexelsPhoto, PexelsSearchParam } from "../models/common";

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
    DequeueNotificationAfterExpiration: "common/dequeueNotificationAfterExpiration",
    EnqueueNotification: "common/enqueueNotification",
    DequeueNotification: "common/dequeueNotification",
    StartNotificationExpiration: "common/startNotificationExpiration",

    SearchPexelsRequested: "common/searchPexelsRequested",
    SearchPexelsSucceeded: "common/searchPexelsSucceeded",

    SetAppContext: "common/setAppContext",
};

export const actionCreators = {
    CreateNotificationsRequested: (messages: string[], type: NotificationType): IPayloadedAction<{ messages: string[], type: NotificationType }> & ITypedAction => ({
        type: actionTypes.CreateNotificationsRequested,
        payload: {
            messages,
            type
        },
    }),
    DequeueNotificationAfterExpiration: (notificationGuid: string): ITypedAction & IPayloadedAction<string> => ({
        type: actionTypes.DequeueNotificationAfterExpiration,
        payload: notificationGuid,
    }),
    EnqueueNotification: (notification: Notification): IPayloadedAction<Notification> & ITypedAction => ({
        type: actionTypes.EnqueueNotification,
        payload: notification
    }),
    DequeueNotification: (notificationGuid: string): ITypedAction & IPayloadedAction<string> => ({
        type: actionTypes.DequeueNotification,
        payload: notificationGuid,
    }),
    StartNotificationExpiration: (notificationGuid: string): ITypedAction & IPayloadedAction<string> => ({
        type: actionTypes.StartNotificationExpiration,
        payload: notificationGuid,
    }),

    SearchPexelsRequested: (param: PexelsSearchParam): ITypedAction & IPayloadedAction<PexelsSearchParam> => ({
        type: actionTypes.SearchPexelsRequested,
        payload: param,
    }),
    SearchPexelsSucceeded: (page: ApiPageResponse<PexelsPhoto>): ITypedAction & IPayloadedAction<ApiPageResponse<PexelsPhoto>> => ({
        type: actionTypes.SearchPexelsSucceeded,
        payload: page,
    }),

    SetAppContext: (context: "allBoards" | "boardDetails"): ITypedAction & IPayloadedAction<"allBoards" | "boardDetails"> => ({
        type: actionTypes.SetAppContext,
        payload: context,
    }),
};

export interface CommonState {
    notifications: Notification[];
    pexelsPhotosPage: ApiPageResponse<PexelsPhoto>;
    appContext: "allBoards" | "boardDetails";
}

const initialState: CommonState = {
    notifications: [],
    pexelsPhotosPage: null,
    appContext: null,
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
                notifications: state.notifications.filter(n => n.guid !== action.payload),
            };
        }
        case actionTypes.SearchPexelsSucceeded: {
            return {
                ...state,
                pexelsPhotosPage: action.payload,
            }
        }
        case actionTypes.SetAppContext: {
            return {
                ...state,
                appContext: action.payload
            }
        }
        case actionTypes.StartNotificationExpiration: {
            const notifications = state.notifications.map(n => {
                const updatedNotification = { ...n };
                if (updatedNotification.guid === action.payload) {
                    updatedNotification.isExpiring = true;
                }
                return updatedNotification;
            });
            return {
                ...state,
                notifications: notifications
            };
        }
        default:
            return state;
    }
};
