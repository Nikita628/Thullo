import { put, takeEvery } from "redux-saga/effects";
import { SignUpData } from "../models/auth";
import { AuthApiClient } from "../services/authApiClient";
import { IRequestedAction } from "../state/common";

import { actionTypes, actionCreators } from "../state/auth";

function* signUp(action: IRequestedAction<SignUpData>) {
    const res = yield AuthApiClient.signUp(action.payload);

    // yield put(actionCreators.SignInFailed([]));
}

export function* watchAuth() {
    yield takeEvery(actionTypes.SignUpRequested, signUp);
}