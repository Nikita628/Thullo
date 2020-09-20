import { put, takeLatest, delay, takeEvery } from "redux-saga/effects";

import { IRequestedAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/common";
import { Notification } from "../models/common";

function* createNotifications(action: IRequestedAction<{ messages: string[], type: "error" | "success" | "warning" }>) {
    for (let i = 0; i < action.payload.messages.length; i++) {
        const n = new Notification();
        n.type = action.payload.type;
        n.message = action.payload.messages[i];
        yield put(actionCreators.EnqueueNotification(n));
        yield put(actionCreators.DequeueNotificationRequested());
    }
}

function* dequeueNotification(action: IRequestedAction) {
    yield delay(4000);
    yield put(actionCreators.DequeueNotification());
}

export function* watchCommon() {
    yield takeLatest(actionTypes.CreateNotificationsRequested, createNotifications);
    yield takeEvery(actionTypes.DequeueNotificationRequested, dequeueNotification);
}