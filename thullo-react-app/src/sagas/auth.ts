import { put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { SignInData, SignInResult, SignUpData } from "../models/auth";
import { AuthApiClient } from "../services/api/authApiClient";
import { IPayloadedAction, ITypedAction, ICallbackAction } from "../state/common";
import { actionTypes, actionCreators } from "../state/auth";
import { actionCreators as commonActionCreators } from "../state/common";
import { ApiResponse } from "../models/common";
import { constants, NotificationType } from "../common/data";

function* signUp(action: IPayloadedAction<SignUpData> & ICallbackAction & ITypedAction) {
    const res: AxiosResponse<ApiResponse<boolean>> = yield AuthApiClient.signUp(action.payload);

    if (res.data.item) {
        yield put(commonActionCreators.CreateNotificationsRequested(["Signed up successfully"], NotificationType.success));
        yield put(actionCreators.SignUpSucceeded());
        yield action.callback();
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* signIn(action: IPayloadedAction<SignInData> & ITypedAction) {
    const res: AxiosResponse<ApiResponse<SignInResult>> = yield AuthApiClient.signIn(action.payload);

    // TODO signout automatically after 55 minutes

    if (res.data.item) {
        yield localStorage.setItem(constants.localStorageTokenKey, res.data.item.token);
        yield localStorage.setItem(constants.localStorageUserKey, JSON.stringify(res.data.item.user));
        yield put(actionCreators.SignInSucceeded(res.data.item));
    } else {
        yield put(commonActionCreators.CreateNotificationsRequested(res.data.errors, NotificationType.error));
    }
}

function* signInFromLocalStorage(action: ITypedAction) {
    const token = localStorage.getItem(constants.localStorageTokenKey);
    const user = localStorage.getItem(constants.localStorageUserKey);

    // TODO if token is expired, signout
    
    if (token && user) {
        const signInResult = new SignInResult();
        signInResult.token = token;
        signInResult.user = JSON.parse(user);
        yield put(actionCreators.SignInSucceeded(signInResult));
    } else {
        yield put(actionCreators.SignInFromLocalStorageFailed());
    }
}

function* signOut(action: ITypedAction) {
    yield localStorage.removeItem(constants.localStorageTokenKey);
    yield localStorage.removeItem(constants.localStorageUserKey);
    yield window.location.reload();
}

export function* watchAuth() {
    yield takeLatest(actionTypes.SignUpRequested, signUp);
    yield takeLatest(actionTypes.SignInRequested, signIn);
    yield takeLatest(actionTypes.SignInFromLocalStorageRequested, signInFromLocalStorage);
    yield takeLatest(actionTypes.SignOutRequested, signOut);
}