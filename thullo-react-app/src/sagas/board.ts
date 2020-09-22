import { put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { IPayloadedAction, ITypedAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/board";
import { actionCreators as commonActionCreators } from "../state/common";
import { ApiPageResponse } from "../models/common";
import { NotificationType } from "../common/data";
import { Board, BoardSearchParam } from "../models/board";
import { BoardApiClient } from "../services/boardApiClient";

function* searchBoards(action: IPayloadedAction<BoardSearchParam> & ITypedAction) {
    const res: AxiosResponse<ApiPageResponse<Board>> = yield BoardApiClient.search(action.payload);

    if (!res.data.errors.length) {
        yield put(actionCreators.SearchBoardSucceeded(res.data));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

export function* watchBoard() {
    yield takeLatest(actionTypes.searchBoardRequested, searchBoards);
}