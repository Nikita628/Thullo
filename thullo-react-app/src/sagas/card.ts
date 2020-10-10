import { put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { IPayloadedAction, ITypedAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/card";
import { actionCreators as commonActionCreators } from "../state/common";
import { ApiResponse } from "../models/common";
import { NotificationType } from "../common/data";
import { CardApiClient } from "../services/cardApiClient";

function* moveCard(action: IPayloadedAction<{ cardId: number, futureListId: number }> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<boolean>> = yield CardApiClient.moveCard(action.payload.cardId, action.payload.futureListId);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Card has been moved"], NotificationType.success));
        yield put(actionCreators.MoveCardToListSucceeded(action.payload.cardId, action.payload.futureListId));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

export function* watchCard() {
    yield takeLatest(actionTypes.moveCardToList, moveCard);
}