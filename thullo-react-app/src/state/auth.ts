import { Action } from "../common/data";
import { SignInData, SignInResult, SignUpData } from "../models/auth";
import { User } from "../models/user";
import { IFailedAction, ISucceededAction } from "./common";

export const actionTypes = {
    SignUpRequested: "auth/signUpRequested",
    SignUpSucceeded: "auth/signUpCompleted",
    SignUpFailed: "auth/signUpFailed",

    SignInRequested: "auth/signInRequested",
    SignInSucceeded: "auth/signInSucceeded",
    SignInFailed: "auth/signInFailed",
};

export const actionCreators = {
    SignUpRequested: (signUpData: SignUpData, callback: Action) => ({
        type: actionTypes.SignUpRequested,
        callback,
        payload: signUpData
    }),
    SignUpSucceeded: (isSignedUp: boolean) => ({
        type: actionTypes.SignUpSucceeded,
        payload: isSignedUp,
    }),
    SignUpFailed: (errors: string[]) => ({
        type: actionTypes.SignUpFailed,
        errors: errors,
    }),

    SignInRequested: (signInData: SignInData) => ({
        type: actionTypes.SignInRequested,
        payload: signInData,
    }),
    SignInSucceeded: (signInResult: SignInResult) => ({
        type: actionTypes.SignInSucceeded,
        payload: signInResult,
    }),
    SignInFailed: (errors: string[]) => ({
        type: actionTypes.SignInFailed,
        errors: errors,
    }),
};

export interface AuthState {
    isSignedIn: boolean;
    token: string;
    user: User;
    signInErrors: string[];
}

const initialState: AuthState = {
    isSignedIn: false,
    token: null,
    user: null,
    signInErrors: null,
};

export const reducer = (state: AuthState = initialState, action: ISucceededAction & IFailedAction): AuthState => {
    switch (action.type) {
        case actionTypes.SignInSucceeded: {
            const signInResult = action.payload as SignInResult;
            return {
                ...state,
                isSignedIn: true,
                token: signInResult.token,
                user: signInResult.user,
                signInErrors: null,
            }
        }
        default:
            return state;
    }
};
