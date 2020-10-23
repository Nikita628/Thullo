import { SignInData, SignInResult, SignUpData } from "../models/auth";
import { User } from "../models/user";
import { ICallbackAction, IPayloadedAction, ITypedAction } from "./common";

export const actionTypes = {
    SignUpRequested: "auth/signUpRequested",
    SignUpSucceeded: "auth/signUpCompleted",
    SignUpFailed: "auth/signUpFailed",
    SignInRequested: "auth/signInRequested",
    SignInSucceeded: "auth/signInSucceeded",
    SignInFailed: "auth/signInFailed",
    SignInFromLocalStorageRequested: "auth/signInFromLocalStorageRequested",
    SignInFromLocalStorageFailed: "auth/signInFromLocalStorageFailed",
    SignOutRequested: "auth/signOutRequested",
    SignOutAfterTimeout: "auth/signOutAfterTimeout",
};

export const actionCreators = {
    SignUpRequested: (signUpData: SignUpData, callback: () => void): ITypedAction & ICallbackAction & IPayloadedAction<SignUpData> => ({
        type: actionTypes.SignUpRequested,
        callback,
        payload: signUpData
    }),
    SignUpSucceeded: (): ITypedAction => ({
        type: actionTypes.SignUpSucceeded,
    }),
    SignUpFailed: (errors: string[]): ITypedAction & IPayloadedAction<string[]> => ({
        type: actionTypes.SignUpFailed,
        payload: errors,
    }),

    SignInRequested: (signInData: SignInData): ITypedAction & IPayloadedAction<SignInData> => ({
        type: actionTypes.SignInRequested,
        payload: signInData,
    }),
    SignInSucceeded: (signInResult: SignInResult): ITypedAction & IPayloadedAction<SignInResult> => ({
        type: actionTypes.SignInSucceeded,
        payload: signInResult,
    }),
    SignInFailed: (errors: string[]): ITypedAction & IPayloadedAction<string[]> => ({
        type: actionTypes.SignInFailed,
        payload: errors,
    }),

    SignInFromLocalStorageRequested: (): ITypedAction => ({
        type: actionTypes.SignInFromLocalStorageRequested,
    }),
    SignInFromLocalStorageFailed: (): ITypedAction => ({
        type: actionTypes.SignInFromLocalStorageFailed,
    }),

    SignOutRequested: (): ITypedAction => ({
        type: actionTypes.SignOutRequested,
    }),
    SignOutAfterTimeout: (timeoutMs: number): ITypedAction & IPayloadedAction<number> => ({
        type: actionTypes.SignOutAfterTimeout,
        payload: timeoutMs,
    }),
};

export interface AuthState {
    hasFailedToSignInFromLocalStorage: boolean;
    isSignedIn: boolean;
    token: string;
    user: User;
    signInErrors: string[];
}

const initialState: AuthState = {
    hasFailedToSignInFromLocalStorage: false,
    isSignedIn: false,
    token: null,
    user: null,
    signInErrors: null,
};

export const reducer = (state: AuthState = initialState, action: ITypedAction & IPayloadedAction): AuthState => {
    switch (action.type) {
        case actionTypes.SignInSucceeded: {
            const signInResult = action.payload as SignInResult;
            return {
                ...state,
                isSignedIn: true,
                token: signInResult.token,
                user: signInResult.user,
                signInErrors: null,
            };
        }
        case actionTypes.SignInFromLocalStorageFailed: {
            return {
                ...state,
                hasFailedToSignInFromLocalStorage: true,
            };
        }
        case actionTypes.SignInFailed: {
            return {
                ...state,
                signInErrors: action.payload,
            }
        }
        default:
            return state;
    }
};
