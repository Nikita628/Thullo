import { combineReducers } from "redux";

import { AuthState, reducer as authReducer } from "./auth";
import { CommonState, reducer as commonReducer } from "./common";
import { BoardState, reducer as boardReducer } from "./board";

export interface AppState {
    auth: AuthState;
    common: CommonState;
    board: BoardState;
};

const rootReducer = combineReducers<AppState>({
    auth: authReducer,
    common: commonReducer,
    board: boardReducer,
});

export default rootReducer;