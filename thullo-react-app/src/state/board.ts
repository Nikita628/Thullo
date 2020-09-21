import { Board, BoardSearchParam } from "../models/board";
import { ApiPageResponse } from "../models/common";
import { IPayloadedAction, ITypedAction } from "./common";

export const actionTypes = {
    searchBoardRequested: "board/searchBoardRequested",
    searchBoardSucceeded: "board/searchBoardSucceeded",
};

export const actionCreators = {
    SearchBoardRequested: (param: BoardSearchParam): IPayloadedAction<BoardSearchParam> & ITypedAction => ({
        type: actionTypes.searchBoardRequested,
        payload: param,
    }),
    SearchBoardSucceeded: (boards: ApiPageResponse<Board>): IPayloadedAction<ApiPageResponse<Board>> & ITypedAction => ({
        type: actionTypes.searchBoardSucceeded,
        payload: boards,
    }),
};

export interface BoardState {
    boardsPage: ApiPageResponse<Board>;
}

const initialState: BoardState = {
    boardsPage: null,
};

export const reducer = (state: BoardState = initialState, action: ITypedAction & IPayloadedAction): BoardState => {
    switch (action.type) {
        case actionTypes.searchBoardSucceeded: {
            return {
                ...state,
                boardsPage: action.payload
            };
        }
        default:
            return state;
    }
};
