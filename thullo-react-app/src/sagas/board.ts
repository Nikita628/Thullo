import { put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { ICallbackAction, IPayloadedAction, ITypedAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/board";
import { actionCreators as commonActionCreators } from "../state/common";
import { ApiPageResponse, ApiResponse } from "../models/common";
import { NotificationType } from "../common/data";
import { Board, BoardSearchParam } from "../models/board";
import { BoardApiClient } from "../services/boardApiClient";

function* searchBoards(action: IPayloadedAction<{ param: BoardSearchParam, appendToExistingBoardPage: boolean }> & ITypedAction) {
    const res: AxiosResponse<ApiPageResponse<Board>> = yield BoardApiClient.search(action.payload.param);

    if (!res.data.errors.length) {
        yield put(actionCreators.SearchBoardSucceeded(res.data, action.payload.appendToExistingBoardPage));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* createBoard(action: ITypedAction & IPayloadedAction<Board> & ICallbackAction) {
    const res: AxiosResponse<ApiResponse<number>> = yield BoardApiClient.create(action.payload);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Board has been created"], NotificationType.success));
        action.callback();
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* getBoard(action: ITypedAction & IPayloadedAction<number>) {
    const res: AxiosResponse<ApiResponse<Board>> = yield BoardApiClient.get(action.payload);

    if (!res.data.errors.length) {
        yield put(actionCreators.GetBoardSucceeded(res.data.item));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* updateVisibility(action: ITypedAction & IPayloadedAction<{ boardId: number, isPrivate: boolean }>) {
    const res: AxiosResponse<ApiResponse<Board>>
        = yield BoardApiClient.updateVisibility(action.payload.boardId, action.payload.isPrivate);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Board visibility has been updated"], NotificationType.success));
        yield put(actionCreators.UpdateBoardVisibilitySucceeded(action.payload.isPrivate));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

export function* watchBoard() {
    yield takeLatest(actionTypes.searchBoardRequested, searchBoards);
    yield takeLatest(actionTypes.createBoardRequested, createBoard);
    yield takeLatest(actionTypes.getBoardRequested, getBoard);
    yield takeLatest(actionTypes.updateBoardVisibilityRequested, updateVisibility);
}