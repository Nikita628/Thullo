import { combineReducers } from "redux";

import { AuthState, reducer as authReducer } from "./auth";
import { CommonState, reducer as commonReducer } from "./common";

export interface AppState {
    auth: AuthState;
    common: CommonState;
};

const rootReducer = combineReducers<AppState>({
    auth: authReducer,
    common: commonReducer,
});

export default rootReducer;