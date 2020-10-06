import { put, delay, takeEvery, takeLatest } from "redux-saga/effects";

import { IPayloadedAction, ITypedAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/common";
import { ApiPageResponse, Notification, PexelsPhoto, PexelsSearchParam } from "../models/common";
import { NotificationType } from "../common/data";
import { AxiosResponse } from "axios";
import { CommonApiClient } from "../services/commonApiClient";
import { guid } from "../common/functionality";

function* createNotifications(action: IPayloadedAction<{ messages: string[], type: NotificationType }> & ITypedAction) {
    for (let i = 0; i < action.payload.messages.length; i++) {
        const n = new Notification();
        n.guid = guid();
        n.type = action.payload.type;
        n.message = action.payload.messages[i];
        yield put(actionCreators.EnqueueNotification(n));
        yield put(actionCreators.DequeueNotificationAfterExpiration(n.guid));
    }
}

function* dequeueNotificationAfterExpiration(action: ITypedAction & IPayloadedAction<string>) {
    yield delay(4000);
    yield put (actionCreators.StartNotificationExpiration(action.payload));
    yield delay(1000);
    yield put(actionCreators.DequeueNotification(action.payload));
}

function* searchPexels(action: ITypedAction & IPayloadedAction<PexelsSearchParam>) {
    const res: AxiosResponse<ApiPageResponse<PexelsPhoto>> = yield CommonApiClient.searchPexels(action.payload);

    if (!res.data.errors.length) {
        yield put(actionCreators.SearchPexelsSucceeded(res.data));
    } else {
        yield put(actionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

export function* watchCommon() {
    yield takeEvery(actionTypes.CreateNotificationsRequested, createNotifications);
    yield takeEvery(actionTypes.DequeueNotificationAfterExpiration, dequeueNotificationAfterExpiration);
    yield takeLatest(actionTypes.SearchPexelsRequested, searchPexels);
}