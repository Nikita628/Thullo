import { put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { IPayloadedAction, ITypedAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/boardList";
import { actionCreators as commonActionCreators } from "../state/common";
import { ApiResponse } from "../models/common";
import { NotificationType } from "../common/data";
import { BoardList } from "../models/boardList";
import { BoardListApiClient } from "../services/boardListApiClient";

function* createList(action: ITypedAction & IPayloadedAction<BoardList>) {
    const res: AxiosResponse<ApiResponse<number>> = yield BoardListApiClient.create(action.payload);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["List has been created"], NotificationType.success));
        action.payload.id = res.data.item;
        yield put(actionCreators.CreateBoardListSucceeded(action.payload));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* updateListTitle(action: ITypedAction & IPayloadedAction<{ listId: number, title: string }>) {
    const res: AxiosResponse<ApiResponse<boolean>>
        = yield BoardListApiClient.updateTitle(action.payload.listId, action.payload.title);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["List title has been updated"], NotificationType.success));
        yield put(actionCreators.UpdateBoardListTitleSucceeded(action.payload.listId, action.payload.title));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* deleteList(action: ITypedAction & IPayloadedAction<{ listId: number }>) {
    const res: AxiosResponse<ApiResponse<boolean>>
        = yield BoardListApiClient.delete(action.payload.listId);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["List has been deleted"], NotificationType.success));
        yield put(actionCreators.DeleteBoardListSucceeded(action.payload.listId));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

export function* watchBoardList() {
    yield takeLatest(actionTypes.createBoardList, createList);
    yield takeLatest(actionTypes.updateBoardListTitle, updateListTitle);
    yield takeLatest(actionTypes.deleteBoardList, deleteList);
}