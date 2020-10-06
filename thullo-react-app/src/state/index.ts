import { combineReducers } from "redux";

import { AuthState, reducer as authReducer } from "./auth";
import { CommonState, reducer as commonReducer } from "./common";
import { BoardState, reducer as boardReducer } from "./board";
import { UserState, reducer as userReducer } from "./user";
import { BoardListState, reducer as boardListReducer } from "./boardList";

export interface AppState {
    auth: AuthState;
    common: CommonState;
    board: BoardState;
    user: UserState;
    boardList: BoardListState;
};

const rootReducer = combineReducers<AppState>({
    auth: authReducer,
    common: commonReducer,
    board: boardReducer,
    user: userReducer,
    boardList: boardListReducer,
});

export default rootReducer;