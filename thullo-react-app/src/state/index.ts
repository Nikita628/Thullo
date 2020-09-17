import { combineReducers } from "redux";

import { AuthState, reducer as authReducer } from "./auth";

export interface AppState {
    auth: AuthState;
};

const rootReducer = combineReducers<AppState>({
    auth: authReducer,
});

export default rootReducer;