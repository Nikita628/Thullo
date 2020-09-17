import { Action } from "../common/data";

export interface IRequestedAction<PayloadType = any, CallbackParamType = any> {
    type: string;
    payload: PayloadType;
    callback?: Action<CallbackParamType>;
}

export interface ISucceededAction<PayloadType = any>{
    type: string;
    payload: PayloadType;
}

export interface IFailedAction {
    type: string;
    errors: string[];
}
