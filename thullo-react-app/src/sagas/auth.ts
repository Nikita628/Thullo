import { put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { SignInData, SignInResult, SignUpData } from "../models/auth";
import { AuthApiClient } from "../services/authApiClient";
import { IRequestedAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/auth";
import { ApiResponse } from "../models/common";
import { constants } from "../common/data";

function* signUp(action: IRequestedAction<SignUpData>) {
    const res: AxiosResponse<ApiResponse<boolean>> = yield AuthApiClient.signUp(action.payload);

    if (res.data.item) {
        yield put(actionCreators.SignUpSucceeded());
        yield action.callback();
    } else {
        yield put(actionCreators.SignUpFailed(res.data.errors));
    }
}

function* signIn(action: IRequestedAction<SignInData>) {
    const res: AxiosResponse<ApiResponse<SignInResult>> = yield AuthApiClient.signIn(action.payload);

    if (res.data.item) {
        yield localStorage.setItem(constants.localStorageTokenKey, res.data.item.token);
        yield localStorage.setItem(constants.localStorageUserKey, JSON.stringify(res.data.item.user));
        yield put(actionCreators.SignInSucceeded(res.data.item));
    } else {
        yield put(actionCreators.SignInFailed(res.data.errors));
    }
}

function* signInFromLocalStorage(action: IRequestedAction) {
    const token = localStorage.getItem(constants.localStorageTokenKey);
    const user = localStorage.getItem(constants.localStorageUserKey);
    
    if (token && user) {
        const signInResult = new SignInResult();
        signInResult.token = token;
        signInResult.user = JSON.parse(user);
        yield put(actionCreators.SignInSucceeded(signInResult));
    } else {
        yield put(actionCreators.SignInFromLocalStorageFailed());
    }
}

function* signOut(action: IRequestedAction) {
    localStorage.removeItem(constants.localStorageTokenKey);
    localStorage.removeItem(constants.localStorageUserKey);
    window.location.reload();
}

export function* watchAuth() {
    yield takeLatest(actionTypes.SignUpRequested, signUp);
    yield takeLatest(actionTypes.SignInRequested, signIn);
    yield takeLatest(actionTypes.SignInFromLocalStorageRequested, signInFromLocalStorage);
    yield takeLatest(actionTypes.SignOutRequested, signOut);
}