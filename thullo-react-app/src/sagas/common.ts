import { put, delay, takeEvery } from "redux-saga/effects";

import { IPayloadedAction, ITypedAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/common";
import { Notification } from "../models/common";
import { NotificationType } from "../common/data";

function* createNotifications(action: IPayloadedAction<{ messages: string[], type: NotificationType }> & ITypedAction) {
    for (let i = 0; i < action.payload.messages.length; i++) {
        const n = new Notification();
        n.type = action.payload.type;
        n.message = action.payload.messages[i];
        yield put(actionCreators.EnqueueNotification(n));
        yield put(actionCreators.DequeueNotificationRequested());
    }
}

function* dequeueNotification(action: ITypedAction) {
    yield delay(4000);
    yield put(actionCreators.DequeueNotification());
}

export function* watchCommon() {
    yield takeEvery(actionTypes.CreateNotificationsRequested, createNotifications);
    yield takeEvery(actionTypes.DequeueNotificationRequested, dequeueNotification);
}