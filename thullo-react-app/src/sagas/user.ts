import { put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { IPayloadedAction, ITypedAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/user";
import { actionCreators as commonActionCreators } from "../state/common";
import { ApiPageResponse } from "../models/common";
import { NotificationType } from "../common/data";
import { User, UserSearchParam } from "../models/user";
import { UserApiClient } from "../services/userApiClient";

function* searchUser(action: IPayloadedAction<{ searchParam: UserSearchParam, appendToExistingPage: boolean }> & ITypedAction) {
    const res: AxiosResponse<ApiPageResponse<User>> = yield UserApiClient.search(action.payload.searchParam);

    if (!res.data.errors.length) {
        yield put(actionCreators.UserSearchSucceeded(res.data, action.payload.appendToExistingPage));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

export function* watchUser() {
    yield takeLatest(actionTypes.UserSearchRequested, searchUser);
}