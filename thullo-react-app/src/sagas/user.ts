import { put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { IPayloadedAction, ITypedAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/user";
import { actionCreators as commonActionCreators } from "../state/common";
import { actionCreators as boardActionCreators } from "../state/board";
import { ApiPageResponse, ApiResponse } from "../models/common";
import { NotificationType } from "../common/data";
import { User, UserSearchParam } from "../models/user";
import { UserApiClient } from "../services/userApiClient";
import { Board } from "../models/board";
import { BoardApiClient } from "../services/boardApiClient";

function* searchUser(action: IPayloadedAction<{ searchParam: UserSearchParam, appendToExistingPage: boolean }> & ITypedAction) {
    const res: AxiosResponse<ApiPageResponse<User>> = yield UserApiClient.search(action.payload.searchParam);

    if (!res.data.errors.length) {
        yield put(actionCreators.UserSearchSucceeded(res.data, action.payload.appendToExistingPage));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* inviteToBoard(action: ITypedAction & IPayloadedAction<{userId: number, boardId: number}>) {
    const res: AxiosResponse<ApiResponse<boolean>> = yield UserApiClient.inviteToBoard(action.payload.userId, action.payload.boardId);

    if (!res.data.errors.length) {
        yield put(commonActionCreators.CreateNotificationsRequested(["User has been invited"], NotificationType.success));
        const boardRes: AxiosResponse<ApiResponse<Board>> = yield BoardApiClient.get(action.payload.boardId);
        yield put(boardActionCreators.GetBoardSucceeded(boardRes.data.item));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

export function* watchUser() {
    yield takeLatest(actionTypes.UserSearchRequested, searchUser);
    yield takeLatest(actionTypes.InviteToBoardRequested, inviteToBoard);
}